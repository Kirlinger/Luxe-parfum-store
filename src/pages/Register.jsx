import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === email)) {
      setError('An account with this email already exists.');
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    navigate('/profile');
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold mb-4">Register</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col max-w-sm">
          <input name="name" type="text" placeholder="Full Name" required className="mb-2 p-2 border rounded" />
          <input name="email" type="email" placeholder="Email" required className="mb-2 p-2 border rounded" />
          <input name="password" type="password" placeholder="Password" required minLength={6} className="mb-2 p-2 border rounded" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Register</button>
        </form>
        <p className="mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
