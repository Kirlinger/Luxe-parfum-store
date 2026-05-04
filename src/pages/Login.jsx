import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/profile');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col max-w-sm">
          <input name="email" type="email" placeholder="Email" required className="mb-2 p-2 border rounded" />
          <input name="password" type="password" placeholder="Password" required className="mb-2 p-2 border rounded" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
        </form>
        <p className="mt-4">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
