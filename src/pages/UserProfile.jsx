import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserProfile = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  if (!currentUser) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 mt-8">
          <p>You are not logged in. <Link to="/login" className="text-blue-500 hover:underline">Login here</Link></p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold mb-4">User Profile</h1>
        <p className="mb-2"><span className="font-semibold">Name:</span> {currentUser.name}</p>
        <p className="mb-4"><span className="font-semibold">Email:</span> {currentUser.email}</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
