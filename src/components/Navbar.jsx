import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-black text-white p-4">
    <div className="container mx-auto flex justify-between">
      <Link to="/" className="font-bold">Luxe Parfum Store</Link>
      <div>
        <Link to="/products" className="mx-2">Products</Link>
        <Link to="/cart" className="mx-2">Cart</Link>
        <Link to="/login" className="mx-2">Login</Link>
        <Link to="/register" className="mx-2">Register</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
