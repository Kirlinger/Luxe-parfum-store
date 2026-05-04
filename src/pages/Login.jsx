import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/profile');
    } else {
      setError('Invalid email or password.');
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

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="luxury-label">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="luxury-input"
                />
              </div>
              <div>
                <label className="luxury-label">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="luxury-input"
                />
              </div>
              <button type="submit" className="btn-dark w-full text-center mt-2">
                Sign In
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="font-sans text-sm text-charcoal-soft">
                New to Luxe Parfum?{' '}
                <Link to="/register" className="text-gold hover:text-gold-dark transition-colors font-semibold">
                  Create an account
                </Link>
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-cream-dark text-center">
              <Link to="/" className="font-sans text-xs tracking-widest uppercase text-charcoal-soft hover:text-gold transition-colors">
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

