import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { auth, db, isFirebaseConfigured } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

// ── localStorage helpers ─────────────────────────────────────────

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'luxe_parfum_salt');
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function getLocalUsers() {
  const stored = localStorage.getItem('luxe_users');
  if (stored) return JSON.parse(stored);

  // One-time migration from the old plain-text format
  const legacy = localStorage.getItem('users');
  if (legacy) {
    const migrated = JSON.parse(legacy).map((u) => ({
      ...u,
      uid: u.uid || crypto.randomUUID(),
    }));
    localStorage.setItem('luxe_users', JSON.stringify(migrated));
    return migrated;
  }
  return [];
}

function saveLocalUsers(users) {
  localStorage.setItem('luxe_users', JSON.stringify(users));
}

function getLocalSession() {
  try {
    return (
      JSON.parse(sessionStorage.getItem('luxe_session')) ||
      JSON.parse(localStorage.getItem('luxe_session')) ||
      null
    );
  } catch {
    return null;
  }
}

function setLocalSession(user, persist) {
  const session = {
    uid: user.uid,
    name: user.name,
    email: user.email,
    avatar: user.avatar || null,
    phone: user.phone || null,
    address: user.address || null,
    city: user.city || null,
    state: user.state || null,
    zip: user.zip || null,
    registeredAt: user.registeredAt || null,
  };
  sessionStorage.setItem('luxe_session', JSON.stringify(session));
  if (persist) {
    localStorage.setItem('luxe_session', JSON.stringify(session));
  } else {
    localStorage.removeItem('luxe_session');
  }
}

function clearLocalSession() {
  sessionStorage.removeItem('luxe_session');
  localStorage.removeItem('luxe_session');
  localStorage.removeItem('currentUser'); // clear legacy key
}

// ── Provider ────────────────────────────────────────────────────

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined); // undefined = still loading
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setCurrentUser(getLocalSession());
      setAuthLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const snap = await getDoc(doc(db, 'users', fbUser.uid));
          const profile = snap.exists() ? snap.data() : {};
          setCurrentUser({ uid: fbUser.uid, email: fbUser.email, ...profile });
        } catch {
          setCurrentUser({ uid: fbUser.uid, email: fbUser.email });
        }
      } else {
        setCurrentUser(null);
      }
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = useCallback(async (email, password, remember = false) => {
    if (isFirebaseConfigured) {
      await setPersistence(
        auth,
        remember ? browserLocalPersistence : browserSessionPersistence,
      );
      await signInWithEmailAndPassword(auth, email, password);
      // currentUser is set by onAuthStateChanged
    } else {
      const users = getLocalUsers();
      const hashed = await hashPassword(password);

      // Try new hashed format
      let match = users.find((u) => u.email === email && u.passwordHash === hashed);

      // Transparent migration from legacy plain-text storage
      if (!match) {
        const legacy = users.find((u) => u.email === email && u.password === password);
        if (legacy) {
          const idx = users.indexOf(legacy);
          users[idx] = { ...legacy, uid: legacy.uid || crypto.randomUUID(), passwordHash: hashed };
          delete users[idx].password;
          saveLocalUsers(users);
          match = users[idx];
        }
      }

      if (!match) throw new Error('Invalid email or password.');

      const { passwordHash: _h, password: _p, ...safeUser } = match;
      setLocalSession(safeUser, remember);
      setCurrentUser(safeUser);
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    if (isFirebaseConfigured) {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const profile = { name, email, registeredAt: new Date().toISOString() };
      await setDoc(doc(db, 'users', cred.user.uid), profile);
      // currentUser is set by onAuthStateChanged
    } else {
      const users = getLocalUsers();
      if (users.find((u) => u.email === email)) {
        throw new Error('An account with this email already exists.');
      }
      const passwordHash = await hashPassword(password);
      const newUser = {
        uid: crypto.randomUUID(),
        name,
        email,
        passwordHash,
        registeredAt: new Date().toISOString(),
      };
      users.push(newUser);
      saveLocalUsers(users);

      const { passwordHash: _h, ...safeUser } = newUser;
      setLocalSession(safeUser, false);
      setCurrentUser(safeUser);
    }
  }, []);

  const logout = useCallback(async () => {
    if (isFirebaseConfigured) {
      await signOut(auth);
    } else {
      clearLocalSession();
      setCurrentUser(null);
    }
  }, []);

  const updateUserProfile = useCallback(
    async (data) => {
      if (isFirebaseConfigured) {
        await updateDoc(doc(db, 'users', currentUser.uid), data);
        setCurrentUser((prev) => ({ ...prev, ...data }));
      } else {
        const users = getLocalUsers();
        const idx = users.findIndex((u) => u.uid === currentUser.uid);
        if (idx !== -1) {
          users[idx] = { ...users[idx], ...data };
          saveLocalUsers(users);
        }
        const updated = { ...currentUser, ...data };
        const isPersisted = Boolean(localStorage.getItem('luxe_session'));
        setLocalSession(updated, isPersisted);
        setCurrentUser(updated);
      }
    },
    [currentUser],
  );

  const changeUserPassword = useCallback(
    async (currentPassword, newPassword) => {
      if (isFirebaseConfigured) {
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          currentPassword,
        );
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updatePassword(auth.currentUser, newPassword);
      } else {
        const users = getLocalUsers();
        const idx = users.findIndex((u) => u.uid === currentUser.uid);
        if (idx === -1) throw new Error('User not found.');

        const hashed = await hashPassword(currentPassword);
        const storedHash = users[idx].passwordHash;
        const storedLegacy = users[idx].password;

        if (storedHash && storedHash !== hashed) {
          throw new Error('Current password is incorrect.');
        }
        if (!storedHash && storedLegacy !== currentPassword) {
          throw new Error('Current password is incorrect.');
        }
        if (newPassword.length < 6) {
          throw new Error('New password must be at least 6 characters.');
        }

        users[idx].passwordHash = await hashPassword(newPassword);
        delete users[idx].password;
        saveLocalUsers(users);
      }
    },
    [currentUser],
  );

  const value = {
    currentUser,
    authLoading,
    login,
    register,
    logout,
    updateUserProfile,
    changeUserPassword,
    isFirebaseMode: isFirebaseConfigured,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
