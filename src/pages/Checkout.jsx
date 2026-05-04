import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Checkout = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem('cart');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 mt-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Order Placed!</h1>
          <p className="text-gray-600 mb-4">Thank you for your purchase. We will contact you shortly.</p>
          <button onClick={() => navigate('/')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Back to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <form onSubmit={handleSubmit} className="flex flex-col max-w-md">
          <input type="text" placeholder="Full Name" required className="mb-2 p-2 border rounded" />
          <input type="email" placeholder="Email" required className="mb-2 p-2 border rounded" />
          <input type="text" placeholder="Address" required className="mb-2 p-2 border rounded" />
          <input type="text" placeholder="Card Info" required className="mb-2 p-2 border rounded" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Place Order</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
