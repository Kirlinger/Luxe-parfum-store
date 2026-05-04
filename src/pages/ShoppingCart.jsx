import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';

const ShoppingCart = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const handleRemove = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        {cart.length > 0 ? (
          <>
            {cart.map(item => (
              <CartItem key={item.id} item={item} onRemove={handleRemove} />
            ))}
            <div className="mt-4 text-right">
              <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
              <Link to="/checkout" className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Proceed to Checkout
              </Link>
            </div>
          </>
        ) : (
          <p>Your cart is empty. <Link to="/products" className="text-blue-500 hover:underline">Continue shopping</Link></p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
