import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserProfile = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('currentUser'))
  );
  const [orders] = useState([
    { id: '#LP-0081', date: 'Apr 28, 2025', status: 'Delivered', total: 189.00, items: ['Noir Absolu'] },
    { id: '#LP-0079', date: 'Mar 14, 2025', status: 'Delivered', total: 245.00, items: ['Soir de Jasmin'] },
  ]);

  useEffect(() => {
    if (!currentUser) navigate('/login');
  }, [currentUser, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/login');
  };

  if (!currentUser) return null;

  const initials = currentUser.name
    ? currentUser.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'LP';

  return (
    <div className="bg-cream min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="bg-charcoal pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gold flex items-center justify-center flex-shrink-0">
              <span className="font-serif text-2xl text-charcoal font-medium">{initials}</span>
            </div>
            <div>
              <p className="section-subtitle mb-1">My Account</p>
              <h1 className="font-serif text-4xl font-light text-white">{currentUser.name}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-8">
              <h2 className="font-sans text-xs tracking-[0.3em] uppercase font-semibold text-gold mb-6">
                Account Details
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="luxury-label">Name</p>
                  <p className="font-sans text-sm text-charcoal">{currentUser.name}</p>
                </div>
                <div>
                  <p className="luxury-label">Email</p>
                  <p className="font-sans text-sm text-charcoal">{currentUser.email}</p>
                </div>
                <div>
                  <p className="luxury-label">Member Since</p>
                  <p className="font-sans text-sm text-charcoal">2025</p>
                </div>
              </div>
            </div>
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
            <button
              onClick={handleLogout}
              className="w-full btn-outline-gold text-center"
            >
              Sign Out
            </button>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2">
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
                  <p className="font-serif text-xl text-charcoal-soft mb-4">No orders yet</p>
                  <Link to="/products" className="btn-gold">
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;

