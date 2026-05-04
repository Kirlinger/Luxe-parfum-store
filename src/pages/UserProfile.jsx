import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const inputClass =
  'w-full bg-white border border-cream-deeper text-charcoal font-sans text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors duration-200 placeholder:text-charcoal-soft';
const labelClass =
  'block font-sans text-xs tracking-widest uppercase text-charcoal-soft mb-2 font-medium';

const UserProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { currentUser, authLoading, logout, updateUserProfile, changeUserPassword } = useAuth();

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' });

  useEffect(() => {
    if (!authLoading && !currentUser) {
      navigate('/login');
      return;
    }
  }, [currentUser, authLoading, navigate]);

  useEffect(() => {
    if (currentUser) {
      setEditForm({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || '',
        city: currentUser.city || '',
        state: currentUser.state || '',
        zip: currentUser.zip || '',
      });
    }
  }, [currentUser]);

  const notify = (msg) => {
    setSaveMsg(msg);
    setTimeout(() => setSaveMsg(''), 3500);
  };

  const handlePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        await updateUserProfile({ avatar: reader.result });
        notify('Profile picture updated.');
      } catch {
        notify('Failed to update profile picture.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ ...editForm });
      setIsEditing(false);
      notify('Profile updated successfully.');
    } catch {
      notify('Failed to save profile. Please try again.');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwdError('');
    if (passwordForm.next !== passwordForm.confirm) {
      setPwdError('New passwords do not match.');
      return;
    }
    try {
      await changeUserPassword(passwordForm.current, passwordForm.next);
      setPasswordForm({ current: '', next: '', confirm: '' });
      notify('Password changed successfully.');
    } catch (err) {
      setPwdError(err?.message || 'Failed to change password.');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (authLoading || !currentUser) return null;

  const initials = currentUser.name
    ? currentUser.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'LP';

  const formattedDate = currentUser.registeredAt
    ? new Date(currentUser.registeredAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Founding Member';

  const orders = JSON.parse(localStorage.getItem(`orders_${currentUser.email}`)) || [];

  const tabs = [
    { id: 'profile', label: 'My Profile' },
    { id: 'orders', label: 'Order History' },
    { id: 'security', label: 'Security' },
  ];

  return (
    <div className="bg-cream min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="bg-charcoal pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            {/* Avatar with upload */}
            <div className="relative flex-shrink-0">
              <div
                className="w-20 h-20 bg-gold flex items-center justify-center overflow-hidden cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                title="Click to change photo"
              >
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-serif text-3xl text-charcoal font-medium">{initials}</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-7 h-7 bg-gold flex items-center justify-center text-charcoal hover:bg-gold-dark transition-colors"
                title="Upload photo"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePictureUpload}
              />
            </div>

            <div>
              <p className="section-subtitle mb-1">My Account</p>
              <h1 className="font-serif text-4xl font-light text-white">{currentUser.name}</h1>
              <p className="font-sans text-xs text-white/40 mt-1">Member Since: {formattedDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success banner */}
      {saveMsg && (
        <div className="bg-green-50 border-b border-green-200 text-green-700 font-sans text-sm text-center py-3 px-4">
          {saveMsg}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Tab navigation */}
            <div className="bg-white p-2">
              {tabs.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full text-left px-5 py-3 font-sans text-sm transition-colors duration-200 ${
                    activeTab === id
                      ? 'bg-gold/10 text-gold font-semibold border-l-2 border-gold'
                      : 'text-charcoal-soft hover:text-charcoal border-l-2 border-transparent'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Quick Links */}
            <div className="bg-white p-8">
              <h2 className="font-sans text-xs tracking-[0.3em] uppercase font-semibold text-gold mb-6">
                Quick Links
              </h2>
              <nav className="space-y-3">
                {[
                  { to: '/products', label: 'Browse Collection' },
                  { to: '/cart', label: 'Shopping Cart' },
                  { to: '/admin', label: 'Admin Dashboard' },
                ].map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className="block font-sans text-sm text-charcoal-soft hover:text-gold transition-colors duration-200"
                  >
                    {label} →
                  </Link>
                ))}
              </nav>
            </div>

            <button onClick={handleLogout} className="w-full btn-outline-gold text-center">
              Sign Out
            </button>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2">

            {/* ── Profile Tab ── */}
            {activeTab === 'profile' && (
              <div className="bg-white p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-serif text-2xl text-charcoal">Profile Information</h2>
                  {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="btn-outline-gold text-sm">
                      Edit Profile
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleSaveProfile} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="sm:col-span-2">
                        <label className={labelClass}>Full Name</label>
                        <input
                          required
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Email Address</label>
                        <input
                          type="email"
                          required
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Phone Number</label>
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          placeholder="+1 (614) 555-0000"
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Street Address</label>
                      <input
                        value={editForm.address}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        placeholder="120 High Street"
                        className={inputClass}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className={labelClass}>City</label>
                        <input
                          value={editForm.city}
                          onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                          placeholder="Columbus"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>State</label>
                        <input
                          value={editForm.state}
                          onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                          placeholder="OH"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>ZIP Code</label>
                        <input
                          value={editForm.zip}
                          onChange={(e) => setEditForm({ ...editForm, zip: e.target.value })}
                          placeholder="43215"
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 pt-2">
                      <button type="submit" className="btn-dark">Save Changes</button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="btn-outline-gold"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-0">
                    {[
                      { label: 'Full Name', value: currentUser.name },
                      { label: 'Email Address', value: currentUser.email },
                      { label: 'Phone Number', value: currentUser.phone || '—' },
                      { label: 'Street Address', value: currentUser.address || '—' },
                      {
                        label: 'City / State / ZIP',
                        value:
                          [currentUser.city, currentUser.state, currentUser.zip]
                            .filter(Boolean)
                            .join(', ') || '—',
                      },
                      { label: 'Member Since', value: formattedDate },
                    ].map(({ label, value }) => (
                      <div key={label} className="border-b border-cream-dark py-5 last:border-0">
                        <p className="luxury-label">{label}</p>
                        <p className="font-sans text-sm text-charcoal mt-1">{value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Orders Tab ── */}
            {activeTab === 'orders' && (
              <div className="bg-white p-8">
                <h2 className="font-serif text-2xl text-charcoal mb-8">Order History</h2>
                {orders.length > 0 ? (
                  <div className="space-y-5">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-cream-dark p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="font-sans font-semibold text-sm text-charcoal">{order.id}</p>
                            <p className="font-sans text-xs text-charcoal-soft mt-1">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <span className="inline-block bg-green-50 text-green-700 font-sans text-xs tracking-wider uppercase px-3 py-1">
                              {order.status}
                            </span>
                            <p className="font-serif text-lg text-charcoal mt-1">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="border-t border-cream-dark pt-4">
                          <p className="font-sans text-xs text-charcoal-soft">
                            Items: {order.items.join(', ')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="font-serif text-xl text-charcoal-soft mb-4">You have no orders yet.</p>
                    <Link to="/products" className="btn-gold">
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* ── Security Tab ── */}
            {activeTab === 'security' && (
              <div className="bg-white p-8">
                <h2 className="font-serif text-2xl text-charcoal mb-8">Change Password</h2>
                {pwdError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 font-sans text-sm px-4 py-3 mb-6">
                    {pwdError}
                  </div>
                )}
                <form onSubmit={handlePasswordChange} className="space-y-5 max-w-md">
                  <div>
                    <label className={labelClass}>Current Password</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.current}
                      onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                      placeholder="••••••••"
                      className={inputClass}
                      autoComplete="current-password"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>New Password</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={passwordForm.next}
                      onChange={(e) => setPasswordForm({ ...passwordForm, next: e.target.value })}
                      placeholder="••••••••"
                      className={inputClass}
                      autoComplete="new-password"
                    />
                    <p className="font-sans text-xs text-charcoal-soft mt-2">Minimum 6 characters</p>
                  </div>
                  <div>
                    <label className={labelClass}>Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.confirm}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                      placeholder="••••••••"
                      className={inputClass}
                      autoComplete="new-password"
                    />
                  </div>
                  <button type="submit" className="btn-dark">
                    Update Password
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;

