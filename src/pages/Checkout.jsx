import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const steps = ['Shipping', 'Payment', 'Confirm'];

const inputClass = "w-full bg-white border border-cream-deeper text-charcoal font-sans text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors duration-200 placeholder:text-charcoal-soft";
const labelClass = "block font-sans text-xs tracking-widest uppercase text-charcoal-soft mb-2 font-medium";

const Checkout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.removeItem('cart');
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="bg-cream min-h-screen">
        <Navbar />
        <div className="max-w-xl mx-auto px-4 sm:px-6 pt-40 pb-24 text-center">
          <div className="w-20 h-20 border-2 border-gold flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="section-subtitle mb-3">Order Placed</p>
          <h1 className="font-serif text-5xl font-light text-charcoal mb-4">Thank You</h1>
          <div className="w-12 h-px bg-gold mx-auto mb-6" />
          <p className="font-sans text-sm text-charcoal-soft leading-relaxed mb-10">
            Your order has been received and is being prepared with the utmost care. You will receive a confirmation email shortly. Thank you.
          </p>
          <button onClick={() => navigate('/')} className="btn-gold">
            Return Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="bg-charcoal pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-5xl font-light text-white mb-4">Checkout</h1>
          {/* Step progress */}
          <div className="flex items-center justify-center gap-4 mt-6">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 flex items-center justify-center font-sans text-xs font-bold transition-all ${
                    i <= step ? 'bg-gold text-charcoal' : 'bg-white/10 text-white/40'
                  }`}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span className={`font-sans text-xs tracking-widest uppercase ${
                    i === step ? 'text-gold' : i < step ? 'text-white/60' : 'text-white/30'
                  }`}>
                    {s}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-16 h-px ${i < step ? 'bg-gold' : 'bg-white/10'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {step === 0 && (
                <div>
                  <h2 className="font-serif text-2xl text-charcoal mb-8">Shipping Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className={labelClass}>First Name</label>
                      <input required placeholder="Michael" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Last Name</label>
                      <input required placeholder="Carter" className={inputClass} />
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className={labelClass}>Email Address</label>
                    <input type="email" required placeholder="michael@example.com" className={inputClass} />
                  </div>
                  <div className="mb-5">
                    <label className={labelClass}>Phone Number</label>
                    <input type="tel" required placeholder="+1 (555) 000-0000" className={inputClass} />
                  </div>
                  <div className="mb-5">
                    <label className={labelClass}>Street Address</label>
                    <input required placeholder="120 High Street" className={inputClass} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className={labelClass}>City</label>
                      <input required placeholder="Columbus" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>State</label>
                      <input required placeholder="Ohio" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>ZIP Code</label>
                      <input required placeholder="43215" className={inputClass} />
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="font-serif text-2xl text-charcoal mb-8">Payment Details</h2>
                  <div className="mb-5">
                    <label className={labelClass}>Cardholder Name</label>
                    <input required placeholder="Michael Carter" className={inputClass} />
                  </div>
                  <div className="mb-5">
                    <label className={labelClass}>Card Number</label>
                    <input required placeholder="•••• •••• •••• ••••" maxLength={19} className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Expiry Date</label>
                      <input required placeholder="MM / YY" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>CVV</label>
                      <input required placeholder="•••" maxLength={4} className={inputClass} />
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-3 text-charcoal-soft">
                    <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="font-sans text-xs">Your payment info is encrypted and secure</span>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="font-serif text-2xl text-charcoal mb-8">Order Confirmation</h2>
                  <div className="bg-white p-6 mb-6">
                    <h3 className="font-sans text-xs tracking-widest uppercase text-gold font-semibold mb-5">
                      Order Summary
                    </h3>
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between py-3 border-b border-cream-dark last:border-0">
                        <div>
                          <p className="font-sans text-sm font-medium text-charcoal">{item.name}</p>
                          <p className="font-sans text-xs text-charcoal-soft">Qty: {item.quantity || 1}</p>
                        </div>
                        <p className="font-sans text-sm text-charcoal">
                          ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white p-6">
                    <div className="flex justify-between mb-3">
                      <span className="font-sans text-sm text-charcoal-soft">Subtotal</span>
                      <span className="font-sans text-sm text-charcoal">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="font-sans text-sm text-charcoal-soft">Shipping</span>
                      <span className="font-sans text-sm text-green-600">{total > 150 ? 'Free' : '$15.00'}</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-cream-dark">
                      <span className="font-serif text-xl text-charcoal">Total</span>
                      <span className="font-serif text-xl text-charcoal">
                        ${(total + (total > 150 ? 0 : 15)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-10">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="btn-outline-gold"
                  >
                    ← Back
                  </button>
                )}
                <button type="submit" className="btn-dark flex-1">
                  {step < steps.length - 1 ? 'Continue →' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>

          {/* Mini cart summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 sticky top-28">
              <h3 className="font-sans text-xs tracking-widest uppercase text-gold font-semibold mb-6">
                Your Order ({cart.length})
              </h3>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-14 flex-shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-xs font-medium text-charcoal truncate">{item.name}</p>
                      <p className="font-sans text-xs text-charcoal-soft">×{item.quantity || 1}</p>
                      <p className="font-sans text-xs font-semibold text-charcoal mt-0.5">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-cream-dark flex justify-between">
                <span className="font-serif text-lg text-charcoal">Total</span>
                <span className="font-serif text-lg text-charcoal">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;

