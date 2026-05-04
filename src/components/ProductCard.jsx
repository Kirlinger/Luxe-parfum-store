import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div className="border rounded overflow-hidden shadow-lg">
    <img className="w-full h-48 object-cover" src={product.image} alt={product.name} />
    <div className="p-4">
      <h2 className="font-bold text-lg">{product.name}</h2>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <p className="font-bold">${product.price.toFixed(2)}</p>
      <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline">View Details</Link>
    </div>
  </div>
);

export default ProductCard;
