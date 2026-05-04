import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

const categories = ['All', 'Men', 'Women', 'Unisex'];

const ProductListing = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  const applyFilters = (query, category, sort) => {
    let result = [...products];

    if (query) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category !== 'All') {
      result = result.filter((p) => p.category === category);
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  };

  const handleSearch = (q) => {
    setSearchQuery(q);
    applyFilters(q, activeCategory, sortBy);
  };

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    applyFilters(searchQuery, cat, sortBy);
  };

  const handleSort = (sort) => {
    setSortBy(sort);
    applyFilters(searchQuery, activeCategory, sort);
  };

  return (
    <div className="bg-cream min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="bg-charcoal pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-subtitle mb-3">Explore</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-white mb-4">
            Our Collection
          </h1>
          <div className="w-16 h-px bg-gold mx-auto" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters row */}
        <div className="flex flex-col md:flex-row gap-5 mb-10">
          {/* Search */}
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`font-sans text-xs tracking-widest uppercase px-5 py-3 transition-all duration-200 border ${
                  activeCategory === cat
                    ? 'bg-charcoal text-white border-charcoal'
                    : 'bg-white text-charcoal-soft border-cream-deeper hover:border-gold hover:text-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="bg-white border border-cream-deeper text-charcoal font-sans text-xs tracking-widest uppercase px-5 py-3 focus:outline-none focus:border-gold cursor-pointer"
          >
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Results count */}
        <p className="font-sans text-xs tracking-widest uppercase text-charcoal-soft mb-8">
          {filteredProducts.length} Fragrance{filteredProducts.length !== 1 ? 's' : ''}
        </p>

        {/* Product grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <svg className="w-16 h-16 text-gold/30 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-serif text-2xl text-charcoal-soft mb-3">No fragrances found</p>
            <p className="font-sans text-sm text-charcoal-soft mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => { handleSearch(''); handleCategory('All'); }}
              className="btn-outline-gold"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductListing;

