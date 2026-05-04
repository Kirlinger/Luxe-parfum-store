import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductForm from '../components/Admin/ProductForm';
import { products as initialProducts } from '../data/products';

const stats = [
  { label: 'Total Products', value: '12', icon: '◈' },
  { label: 'Orders Today', value: '8', icon: '◉' },
  { label: 'Revenue', value: '$2,418', icon: '◆' },
  { label: 'Customers', value: '341', icon: '◎' },
];

const AdminDashboard = () => {
  const [addedProducts, setAddedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  const handleAddProduct = (product) => {
    setAddedProducts((prev) => [...prev, { ...product, id: Date.now(), rating: 0, reviews: 0 }]);
  };

  const allProducts = [...initialProducts, ...addedProducts];

  return (
    <div className="bg-cream min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="bg-charcoal pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="section-subtitle mb-1">Luxe Parfum</p>
              <h1 className="font-serif text-4xl font-light text-white">Admin Dashboard</h1>
            </div>
            <Link to="/" className="btn-outline-gold text-sm">
              ← View Store
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats.map(({ label, value, icon }) => (
            <div key={label} className="bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gold text-2xl">{icon}</span>
                <span className="font-sans text-xs tracking-widest uppercase text-charcoal-soft">{label}</span>
              </div>
              <p className="font-serif text-3xl text-charcoal font-light">{value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-cream-deeper mb-10">
          {['overview', 'add product'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-sans text-xs tracking-[0.25em] uppercase px-8 py-4 transition-all duration-200 border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-gold text-charcoal font-semibold'
                  : 'border-transparent text-charcoal-soft hover:text-charcoal'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-charcoal">Product Catalogue</h2>
              <p className="font-sans text-xs text-charcoal-soft">{allProducts.length} products</p>
            </div>
            <div className="bg-white overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cream-dark">
                    <th className="font-sans text-[10px] tracking-widest uppercase text-charcoal-soft text-left px-6 py-4">Product</th>
                    <th className="font-sans text-[10px] tracking-widest uppercase text-charcoal-soft text-left px-6 py-4 hidden sm:table-cell">Category</th>
                    <th className="font-sans text-[10px] tracking-widest uppercase text-charcoal-soft text-left px-6 py-4 hidden md:table-cell">Rating</th>
                    <th className="font-sans text-[10px] tracking-widest uppercase text-charcoal-soft text-right px-6 py-4">Price</th>
                    <th className="font-sans text-[10px] tracking-widest uppercase text-charcoal-soft text-right px-6 py-4 hidden lg:table-cell">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allProducts.map((p) => (
                    <tr key={p.id} className="border-b border-cream-dark last:border-0 hover:bg-cream transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 flex-shrink-0 overflow-hidden">
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-sans text-sm font-medium text-charcoal">{p.name}</p>
                            {p.concentration && (
                              <p className="font-sans text-xs text-charcoal-soft">{p.concentration}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="font-sans text-xs tracking-widest uppercase text-charcoal-soft">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        {p.rating > 0 ? (
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-gold" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="font-sans text-xs text-charcoal">{p.rating}</span>
                          </div>
                        ) : (
                          <span className="font-sans text-xs text-charcoal-soft">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-serif text-base text-charcoal">${p.price.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4 text-right hidden lg:table-cell">
                        <span className={`font-sans text-[10px] tracking-widest uppercase px-3 py-1 ${
                          p.isBestSeller
                            ? 'bg-gold/10 text-gold-dark'
                            : 'bg-cream-dark text-charcoal-soft'
                        }`}>
                          {p.isBestSeller ? 'Best Seller' : 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'add product' && (
          <div className="max-w-2xl">
            <div className="mb-8">
              <h2 className="font-serif text-2xl text-charcoal mb-2">Add New Product</h2>
              <p className="font-sans text-sm text-charcoal-soft">
                Fill in the details below to add a new fragrance to your catalogue.
              </p>
            </div>
            <div className="bg-white p-8">
              <ProductForm onSubmit={handleAddProduct} />
            </div>
            {addedProducts.length > 0 && (
              <div className="mt-8">
                <h3 className="font-sans text-xs tracking-widest uppercase text-gold font-semibold mb-4">
                  Recently Added ({addedProducts.length})
                </h3>
                <div className="space-y-3">
                  {addedProducts.map((p) => (
                    <div key={p.id} className="bg-white px-6 py-4 flex items-center justify-between">
                      <div>
                        <p className="font-sans text-sm font-medium text-charcoal">{p.name}</p>
                        <p className="font-sans text-xs text-charcoal-soft">{p.category}</p>
                      </div>
                      <span className="font-serif text-lg text-charcoal">${p.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;

