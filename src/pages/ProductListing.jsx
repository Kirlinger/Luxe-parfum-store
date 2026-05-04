import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

const ProductListing = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (query) => {
    setFilteredProducts(products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    ));
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-black mt-4 mb-8">Products</h1>
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductListing;
