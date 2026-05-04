import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (err) => {
    const code = err?.code || '';
    if (
      code === 'auth/user-not-found' ||
      code === 'auth/wrong-password' ||
      code === 'auth/invalid-credential' ||
      code === 'auth/invalid-email'
    ) {
      return 'Invalid email or password.';
    }
    if (code === 'auth/too-many-requests') {
      return 'Too many failed attempts. Please try again later.';
    }
    if (code === 'auth/network-request-failed') {
      return 'Network error. Please check your connection and try again.';
    }
    return err?.message || 'Sign in failed. Please try again.';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password, remember);
      navigate('/profile');
    } catch (err) {
      setPassword('');
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream min-h-screen">
      <Navbar />
      <div className="min-h-screen flex">
        {/* Left: Image */}
        <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1615529489791-3aca47c5e22c?auto=format&fit=crop&w=1000&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-charcoal/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
            <p className="section-subtitle mb-4">Welcome back</p>
            <h2 className="font-serif text-5xl font-light text-white mb-4">
              Your Scent Awaits
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mb-6" />
            <p className="font-sans text-sm text-white/60 max-w-xs leading-relaxed">
              Sign in to access your account, view past orders, and explore exclusive member offers.
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12 py-32">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <p className="section-subtitle mb-3">Member Access</p>
              <h1 className="font-serif text-4xl font-light text-charcoal mb-4">Sign In</h1>
              <div className="w-10 h-px bg-gold" />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 font-sans text-sm px-4 py-3 mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off" noValidate>
              <div>
                <label className="luxury-label" htmlFor="login-email">
                  Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="luxury-input"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="luxury-label" htmlFor="login-password">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="luxury-input"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 cursor-pointer accent-gold"
                />
                <label
                  htmlFor="remember-me"
                  className="font-sans text-xs tracking-widest uppercase text-charcoal-soft cursor-pointer select-none"
                >
                  Remember Me
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-dark w-full text-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing In…' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="font-sans text-sm text-charcoal-soft">
                New to Luxe Parfum?{' '}
                <Link
                  to="/register"
                  className="text-gold hover:text-gold-dark transition-colors font-semibold"
                >
                  Create an account
                </Link>
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-cream-dark text-center">
              <Link
                to="/"
                className="font-sans text-xs tracking-widest uppercase text-charcoal-soft hover:text-gold transition-colors"
              >
                ← Return to Store
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

