import { Link } from 'react-router-dom';
import { addToCart } from '../utils/cart';

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-3 h-3 ${i < full ? 'text-gold' : (i === full && hasHalf ? 'text-gold' : 'text-cream-deeper')}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group bg-white card-hover overflow-hidden flex flex-col">
      {/* Image container */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isBestSeller && (
            <span className="bg-gold text-charcoal font-sans text-[10px] font-bold tracking-widest uppercase px-2 py-1">
              Best Seller
            </span>
          )}
          {discount && (
            <span className="bg-charcoal text-white font-sans text-[10px] font-bold tracking-wider px-2 py-1">
              -{discount}%
            </span>
          )}
        </div>

        {/* Quick add overlay */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full bg-charcoal text-white font-sans text-xs tracking-widest uppercase py-3 hover:bg-gold hover:text-charcoal transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-charcoal-soft font-medium">
            {product.category} · {product.concentration}
          </span>
          <span className="font-sans text-[10px] text-charcoal-soft">{product.size}</span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-xl font-medium text-charcoal hover:text-gold transition-colors duration-200 mt-1 mb-2 leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Scent notes */}
        {product.scentNotes && (
          <p className="font-sans text-xs text-charcoal-soft leading-relaxed mb-3 flex-1">
            <span className="text-gold">♦</span> {product.scentNotes.top}
          </p>
        )}

        {/* Rating & reviews */}
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="font-sans text-xs text-charcoal-soft">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-cream-dark">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-xl text-charcoal font-medium">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="font-sans text-sm text-charcoal-soft line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Link
            to={`/product/${product.id}`}
            className="font-sans text-[10px] tracking-widest uppercase text-gold hover:text-gold-dark transition-colors duration-200 font-semibold"
          >
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

