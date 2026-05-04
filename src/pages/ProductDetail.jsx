import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { products } from '../data/products';
import { addToCart } from '../utils/cart';

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-gold' : 'text-cream-deeper'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
    <span className="font-sans text-sm text-charcoal-soft ml-1">{rating}</span>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [added, setAdded] = useState(false);
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 3);

  if (!product) {
    return (
      <div className="bg-cream min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24 text-center">
          <p className="font-serif text-3xl text-charcoal-soft mb-4">Product not found</p>
          <Link to="/products" className="btn-outline-gold">Back to Collection</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="bg-cream min-h-screen">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-charcoal pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-3 font-sans text-xs tracking-widest uppercase">
            <Link to="/" className="text-white/40 hover:text-gold transition-colors">Home</Link>
            <span className="text-white/20">›</span>
            <Link to="/products" className="text-white/40 hover:text-gold transition-colors">Collection</Link>
            <span className="text-white/20">›</span>
            <span className="text-gold">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden bg-cream-dark">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.isBestSeller && (
              <div className="absolute top-4 left-4 bg-gold text-charcoal font-sans text-[10px] font-bold tracking-widest uppercase px-3 py-1.5">
                Best Seller
              </div>
            )}
            {discount && (
              <div className="absolute top-4 right-4 bg-charcoal text-white font-sans text-xs font-bold px-3 py-1.5">
                -{discount}% OFF
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            <div className="mb-4">
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-2">
                {product.category} · {product.concentration}
              </p>
              <h1 className="font-serif text-5xl font-light text-charcoal leading-tight mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={product.rating} />
                <span className="font-sans text-xs text-charcoal-soft">
                  {product.reviews} reviews
                </span>
              </div>
              <div className="w-12 h-px bg-gold mb-6" />
            </div>

            <p className="font-sans text-sm text-charcoal-soft leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Scent notes */}
            {product.scentNotes && (
              <div className="bg-white p-6 mb-8 border-l-2 border-gold">
                <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-4">
                  Scent Pyramid
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Top Notes', value: product.scentNotes.top },
                    { label: 'Heart Notes', value: product.scentNotes.middle },
                    { label: 'Base Notes', value: product.scentNotes.base },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-4">
                      <span className="font-sans text-xs font-semibold uppercase tracking-wider text-charcoal-soft w-28 flex-shrink-0">
                        {label}
                      </span>
                      <span className="font-sans text-sm text-charcoal">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Details */}
            <div className="flex gap-6 mb-8">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-widest text-charcoal-soft mb-1">Size</p>
                <p className="font-sans text-sm font-semibold text-charcoal">{product.size}</p>
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-widest text-charcoal-soft mb-1">Concentration</p>
                <p className="font-sans text-sm font-semibold text-charcoal">{product.concentration}</p>
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-widest text-charcoal-soft mb-1">Category</p>
                <p className="font-sans text-sm font-semibold text-charcoal">{product.category}</p>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-serif text-4xl text-charcoal font-light">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="font-sans text-lg text-charcoal-soft line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {discount && (
                <span className="font-sans text-sm text-gold font-semibold">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className={`flex-1 font-sans font-semibold text-xs tracking-widest uppercase px-8 py-4 transition-all duration-300 ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-charcoal text-white hover:bg-charcoal-light'
                }`}
              >
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
              <a
                href={`https://wa.me/?text=I%20want%20to%20order%20${encodeURIComponent(product.name)}%20from%20Luxe%20Parfum`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] text-white font-sans font-semibold text-xs tracking-widest uppercase px-8 py-4 flex items-center justify-center gap-2 hover:bg-[#1fbd5a] transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Order
              </a>
            </div>

            <div className="flex items-center gap-2 text-charcoal-soft">
              <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="font-sans text-xs">Free shipping on orders over $150 · 30-day returns</span>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <div className="text-center mb-12">
              <p className="section-subtitle mb-3">You may also like</p>
              <h2 className="section-title mb-4">Related Fragrances</h2>
              <div className="divider-gold" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group block">
                  <div className="aspect-square overflow-hidden mb-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="font-serif text-lg text-charcoal group-hover:text-gold transition-colors">{p.name}</p>
                  <p className="font-sans text-sm text-charcoal-soft">${p.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;

