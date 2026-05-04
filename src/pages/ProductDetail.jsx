import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { products } from '../data/products';
import { addToCart } from '../utils/cart';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 mt-8">
          <p>Product not found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <img src={product.image} alt={product.name} className="w-1/2 rounded mb-4" />
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="font-bold text-lg mb-4">${product.price.toFixed(2)}</p>
        <div className="flex gap-4">
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Add to Cart
          </button>
          <a
            href={`https://wa.me/?text=I%20want%20to%20purchase%20${encodeURIComponent(product.name)}!`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Order via WhatsApp
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
