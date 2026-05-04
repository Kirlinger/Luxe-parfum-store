import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';

const ShoppingCart = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="bg-cream min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="bg-charcoal pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-5xl font-light text-white">Shopping Cart</h1>
          <div className="w-16 h-px bg-gold mx-auto mt-4" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between border-b border-cream-deeper pb-4 mb-2">
                <h2 className="font-sans text-xs tracking-[0.3em] uppercase font-semibold text-charcoal-soft">
                  {cart.length} Item{cart.length !== 1 ? 's' : ''}
                </h2>
                <Link to="/products" className="font-sans text-xs tracking-widest uppercase text-gold hover:text-gold-dark transition-colors">
                  Continue Shopping
                </Link>
              </div>
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemove}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 sticky top-28">
                <h2 className="font-serif text-2xl text-charcoal mb-6">Order Summary</h2>
                <div className="space-y-4 border-b border-cream-dark pb-6 mb-6">
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-charcoal-soft">Subtotal</span>
                    <span className="font-sans text-sm text-charcoal">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-charcoal-soft">Shipping</span>
                    <span className={`font-sans text-sm ${shipping === 0 ? 'text-green-600' : 'text-charcoal'}`}>
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {subtotal < 150 && (
                    <p className="font-sans text-xs text-charcoal-soft">
                      Add ${(150 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                </div>
                <div className="flex justify-between mb-8">
                  <span className="font-serif text-xl text-charcoal">Total</span>
                  <span className="font-serif text-xl text-charcoal">${total.toFixed(2)}</span>
                </div>
                <Link to="/checkout" className="btn-dark block text-center w-full">
                  Proceed to Checkout
                </Link>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="font-sans text-xs text-charcoal-soft">Secure & encrypted checkout</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-24">
            <svg className="w-20 h-20 text-gold/30 mx-auto mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="font-serif text-3xl text-charcoal mb-3">Your cart is empty</p>
            <p className="font-sans text-sm text-charcoal-soft mb-8">
              Discover our collection of luxury fragrances
            </p>
            <Link to="/products" className="btn-gold">
              Explore Collection
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ShoppingCart;

