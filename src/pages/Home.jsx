import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Home = () => (
  <div>
    <Navbar />
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-black mt-4 mb-8">Welcome to Luxe Parfum Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

export default Home;
