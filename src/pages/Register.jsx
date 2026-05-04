import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (err) => {
    const code = err?.code || '';
    if (code === 'auth/email-already-in-use') {
      return 'An account with this email already exists.';
    }
    if (code === 'auth/weak-password') {
      return 'Password must be at least 6 characters.';
    }
    if (code === 'auth/invalid-email') {
      return 'Please enter a valid email address.';
    }
    if (code === 'auth/network-request-failed') {
      return 'Network error. Please check your connection and try again.';
    }
    return err?.message || 'Registration failed. Please try again.';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
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
              "url('https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-charcoal/70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
            <p className="section-subtitle mb-4">Join the maison</p>
            <h2 className="font-serif text-5xl font-light text-white mb-4">
              Begin Your Journey
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mb-6" />
            <p className="font-sans text-sm text-white/60 max-w-xs leading-relaxed">
              Become a Luxe Parfum member and enjoy exclusive access to new collections, early launches, and member-only gifts.
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12 py-32">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <p className="section-subtitle mb-3">New Member</p>
              <h1 className="font-serif text-4xl font-light text-charcoal mb-4">Create Account</h1>
              <div className="w-10 h-px bg-gold" />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 font-sans text-sm px-4 py-3 mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off" noValidate>
              <div>
                <label className="luxury-label" htmlFor="reg-name">
                  Full Name
                </label>
                <input
                  id="reg-name"
                  type="text"
                  required
                  placeholder="Phanol Louis"
                  className="luxury-input"
                  autoComplete="off"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="luxury-label" htmlFor="reg-email">
                  Email Address
                </label>
                <input
                  id="reg-email"
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
                <label className="luxury-label" htmlFor="reg-password">
                  Password
                </label>
                <input
                  id="reg-password"
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="luxury-input"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="font-sans text-xs text-charcoal-soft mt-2">Minimum 6 characters</p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-dark w-full text-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account…' : 'Create Account'}
              </button>
            </form>

            <p className="font-sans text-xs text-charcoal-soft text-center mt-5 leading-relaxed">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-gold hover:text-gold-dark">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-gold hover:text-gold-dark">Privacy Policy</a>.
            </p>

            <div className="mt-8 text-center">
              <p className="font-sans text-sm text-charcoal-soft">
                Already a member?{' '}
                <Link
                  to="/login"
                  className="text-gold hover:text-gold-dark transition-colors font-semibold"
                >
                  Sign in
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

export default Register;

