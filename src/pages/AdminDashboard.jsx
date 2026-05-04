import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductForm from '../components/Admin/ProductForm';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (product) => {
    setProducts(prev => [...prev, { ...product, id: Date.now() }]);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <h2 className="text-xl font-bold mb-2">Add New Product</h2>
        <ProductForm onSubmit={handleAddProduct} />
        {products.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Added Products</h2>
            <ul className="space-y-2">
              {products.map(p => (
                <li key={p.id} className="border p-3 rounded">
                  <span className="font-semibold">{p.name}</span> — ${p.price.toFixed(2)} ({p.category})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
