import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find((u) => u.email === email)) {
      setError('An account with this email already exists.');
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    navigate('/profile');
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

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="luxury-label">Full Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Michael Carter"
                  className="luxury-input"
                />
              </div>
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
                  minLength={6}
                  className="luxury-input"
                />
                <p className="font-sans text-xs text-charcoal-soft mt-2">Minimum 6 characters</p>
              </div>
              <button type="submit" className="btn-dark w-full text-center mt-2">
                Create Account
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
                <Link to="/login" className="text-gold hover:text-gold-dark transition-colors font-semibold">
                  Sign in
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

export default Register;

