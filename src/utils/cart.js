const dispatchCartEvent = () => {
  window.dispatchEvent(new CustomEvent('cartUpdated'));
};

export const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  dispatchCartEvent();
};

export const removeFromCart = (productId) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const updatedCart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  dispatchCartEvent();
};

export const getCart = () => {
  return JSON.parse(localStorage.getItem('cart')) || [];
};

export const clearCart = () => {
  localStorage.removeItem('cart');
  dispatchCartEvent();
};
