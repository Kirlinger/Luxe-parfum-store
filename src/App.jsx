import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<ShoppingCart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
};

export default App;
