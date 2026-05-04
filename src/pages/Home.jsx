import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const testimonials = [
  {
    id: 1,
    name: "Stevenson Pierre",
    role: "Watch Collector, New York",
    text: "Luxe Parfum is the only house that truly understands what luxury means. Noir Absolu has become my signature scent.",
    rating: 5,
  },
  {
    id: 2,
    name: "Jean Wilner",
    role: "Executive, Chicago",
    text: "Oud Royale is exceptional — complex, dignified, and utterly unique. Worth every penny and more.",
    rating: 5,
  },
  {
    id: 3,
    name: "Stanley Toussaint",
    role: "Creative Director, Los Angeles",
    text: "Soir de Jasmin stopped me in my tracks at a gallery opening. Three people asked what I was wearing.",
    rating: 5,
  },
];

const whyChooseUs = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: "Artisan Craftsmanship",
    desc: "Each fragrance is handcrafted by master perfumers with decades of expertise in New York and Los Angeles.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Certified Authentic",
    desc: "Every bottle carries our certificate of authenticity. You receive only genuine, pure-grade ingredients.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Discreet Packaging",
    desc: "Your order arrives in a signature black box with gold ribbon — perfect as a gift or a treat for yourself.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: "Secure Payment",
    desc: "Shop with confidence. All transactions are encrypted and protected by industry-leading security.",
  },
];

const bestSellersBgs = [
  'https://images.pexels.com/photos/34882894/pexels-photo-34882894.jpeg?auto=compress&cs=tinysrgb&w=1200',   // Dior Sauvage
  'https://github.com/user-attachments/assets/23187be4-1238-49e1-8270-58c63298889d',                         // Bleu de Chanel
  'https://github.com/user-attachments/assets/9bb85de7-29c7-4c78-8fb5-ba1ebb78e56c',                         // Armani Stronger With You
  'https://github.com/user-attachments/assets/9bcf87c5-a357-4359-ad34-b37d7222564b',                         // Tom Ford Tobacco Vanille
  'https://images.pexels.com/photos/8516275/pexels-photo-8516275.jpeg?auto=compress&cs=tinysrgb&w=1200',     // Versace Eros
];

const Home = () => {
  const [visibleSection, setVisibleSection] = useState({});
  const [bgIndex, setBgIndex] = useState(0);
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bestSellersBgs.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSection((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-observe]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-cream">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1547887538-047f0b77c06f?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/30" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="max-w-2xl">
            <p className="section-subtitle mb-6 animate-fade-in">Maison de Parfumerie · Est. 1987</p>
            <h1 className="font-serif text-6xl md:text-8xl font-light text-white leading-none mb-6 animate-slide-up">
              The Art of
              <br />
              <span className="text-gradient-gold italic">Extraordinary</span>
              <br />
              Fragrance
            </h1>
            <p className="font-sans text-base text-white/60 leading-relaxed mb-10 max-w-lg">
              Discover a world where each drop tells a story. Our master perfumers craft singular olfactory experiences from the world&apos;s rarest ingredients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="btn-gold">
                Explore Collection
              </Link>
              <Link to="/products" className="btn-outline-gold">
                Our Best Sellers
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/40">Scroll</span>
          <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Trust / Value Cards ── */}
      <section
        id="trust"
        data-observe
        className={`bg-charcoal py-14 transition-all duration-700 ${visibleSection.trust ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              {
                label: 'Premium Fragrances',
                sub: 'Authentic luxury scents',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                label: 'Curated Collection',
                sub: 'Handpicked by experts',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
                    <path d="M12 2C8 8 5 11 5 15a7 7 0 0014 0c0-4-3-7-7-13z" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                label: 'Fast U.S. Shipping',
                sub: 'Swift & discreet delivery',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
                    <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" strokeLinejoin="round" strokeLinecap="round" />
                    <circle cx="5.5" cy="18.5" r="1.5" />
                    <circle cx="18.5" cy="18.5" r="1.5" />
                  </svg>
                ),
              },
              {
                label: 'Luxury Experience',
                sub: 'Elevated from first click',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
                    <path d="M2 7l5 5 5-9 5 9 5-5" strokeLinejoin="round" strokeLinecap="round" />
                    <path d="M4 20h16" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                label: 'Secure Checkout',
                sub: 'Encrypted & protected',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 018 0v4" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                label: 'Exclusive Scents',
                sub: 'Hard-to-find rarities',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                label: 'Handpicked Perfumes',
                sub: 'Quality over quantity',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
                    <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                label: 'Modern Elegance',
                sub: 'Timeless refined style',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
                    <path d="M3 17L7 7l5 8 4-5 5 7" strokeLinejoin="round" strokeLinecap="round" />
                    <circle cx="12" cy="5" r="2" />
                  </svg>
                ),
              },
            ].map(({ label, sub, icon }) => (
              <div
                key={label}
                className="group flex flex-col items-center text-center p-6 border border-white/5 hover:border-gold/40 transition-all duration-400 hover:scale-[1.03]"
                style={{ background: 'linear-gradient(160deg, #1e1e1e 0%, #161310 100%)', boxShadow: '0 2px 16px rgba(0,0,0,0.3)' }}
              >
                <span className="text-gold/70 group-hover:text-gold transition-colors duration-300 mb-3">{icon}</span>
                <p className="font-serif text-sm text-white font-light tracking-wide mb-1">{label}</p>
                <p className="font-sans text-[10px] tracking-widest uppercase text-white/35 group-hover:text-white/55 transition-colors duration-300">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section
        id="featured"
        data-observe
        className={`py-24 transition-all duration-700 ${visibleSection.featured ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">Curated for you</p>
            <h2 className="section-title mb-4">Featured Collection</h2>
            <div className="divider-gold" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products" className="btn-outline-gold">
              View Full Collection
            </Link>
          </div>
        </div>
      </section>

      {/* ── Best Sellers Banner ── */}
      <section className="relative py-24 overflow-hidden">
        {/* Fade slideshow backgrounds */}
        {bestSellersBgs.map((url, i) => (
          <div
            key={url}
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${url}')`,
              opacity: i === bgIndex ? 1 : 0,
              filter: 'blur(6px)',
              transform: 'scale(1.08)',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-charcoal/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">Most loved</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-4">Best Sellers</h2>
            <div className="w-16 h-px bg-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section
        id="about"
        data-observe
        className={`py-24 bg-charcoal transition-all duration-700 ${visibleSection.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=800&q=80"
                alt="Luxury perfume atelier"
                className="w-full h-64 sm:h-80 lg:h-[540px] object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div
                className="absolute -bottom-6 -right-6 w-48 h-48 hidden lg:flex items-center justify-center overflow-hidden transition-transform duration-700 hover:scale-105"
                style={{
                  background: 'linear-gradient(145deg, #111 0%, #1e1a14 60%, #111 100%)',
                  border: '1px solid rgba(201,169,110,0.45)',
                  boxShadow: '0 0 28px rgba(201,169,110,0.18), inset 0 0 18px rgba(201,169,110,0.07)',
                }}
              >
                {/* Luxury brand mark — inline SVG */}
                <svg
                  viewBox="0 0 192 192"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                  aria-label="Luxe Parfum brand mark"
                >
                  {/* Radial glow */}
                  <defs>
                    <radialGradient id="lglow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="lgrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E8D5B0" />
                      <stop offset="50%" stopColor="#C9A96E" />
                      <stop offset="100%" stopColor="#A07B40" />
                    </linearGradient>
                  </defs>
                  {/* Background glow */}
                  <circle cx="96" cy="96" r="88" fill="url(#lglow)" />
                  {/* Outer decorative ring */}
                  <circle cx="96" cy="96" r="78" fill="none" stroke="url(#lgrad)" strokeWidth="0.6" strokeDasharray="3 5" />
                  {/* Inner decorative ring */}
                  <circle cx="96" cy="96" r="66" fill="none" stroke="#C9A96E" strokeWidth="0.4" opacity="0.5" />
                  {/* Horizontal rules */}
                  <line x1="18" y1="96" x2="55" y2="96" stroke="url(#lgrad)" strokeWidth="0.8" />
                  <line x1="137" y1="96" x2="174" y2="96" stroke="url(#lgrad)" strokeWidth="0.8" />
                  {/* Diamond accent left */}
                  <polygon points="51,96 55,92 59,96 55,100" fill="#C9A96E" opacity="0.8" />
                  {/* Diamond accent right */}
                  <polygon points="133,96 137,92 141,96 137,100" fill="#C9A96E" opacity="0.8" />
                  {/* Monogram "LP" */}
                  <text
                    x="96"
                    y="108"
                    textAnchor="middle"
                    fontFamily="Georgia, serif"
                    fontSize="42"
                    fontWeight="300"
                    letterSpacing="6"
                    fill="url(#lgrad)"
                  >
                    LP
                  </text>
                  {/* Wordmark beneath */}
                  <text
                    x="96"
                    y="128"
                    textAnchor="middle"
                    fontFamily="'Montserrat', sans-serif"
                    fontSize="7"
                    fontWeight="400"
                    letterSpacing="5"
                    fill="#C9A96E"
                    opacity="0.75"
                  >
                    LUXE PARFUM
                  </text>
                  {/* Top ornament */}
                  <line x1="79" y1="62" x2="113" y2="62" stroke="#C9A96E" strokeWidth="0.5" opacity="0.6" />
                  <circle cx="96" cy="58" r="2.5" fill="none" stroke="#C9A96E" strokeWidth="0.7" opacity="0.7" />
                  <circle cx="96" cy="58" r="1" fill="#C9A96E" opacity="0.6" />
                </svg>
              </div>
            </div>
            <div>
              <p className="section-subtitle mb-4">Our Story</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                A Legacy of Olfactory Excellence
              </h2>
              <div className="w-12 h-px bg-gold mb-6" />
              <p className="font-sans text-sm text-white/60 leading-relaxed mb-5">
                Since 1987, Luxe Parfum has been synonymous with the highest standards of luxury perfumery. Born from a vision to democratize niche luxury, our house sources only the finest ingredients — Bulgarian roses, Cambodian oud, Indian sandalwood, and Egyptian jasmine.
              </p>
              <p className="font-sans text-sm text-white/60 leading-relaxed mb-8">
                Each fragrance is a meticulously composed olfactory poem. We believe that a truly great perfume changes how you experience the world — and how the world experiences you.
              </p>
              <Link to="/products" className="btn-gold">
                Discover Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section
        id="why"
        data-observe
        className={`py-24 transition-all duration-700 ${visibleSection.why ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">Why us</p>
            <h2 className="section-title mb-4">The Luxe Difference</h2>
            <div className="divider-gold" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map(({ icon, title, desc }) => (
              <div key={title} className="text-center group">
                <div className="w-16 h-16 border border-gold/40 flex items-center justify-center mx-auto mb-5 text-gold group-hover:bg-gold group-hover:text-charcoal transition-all duration-300">
                  {icon}
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-3">{title}</h3>
                <p className="font-sans text-sm text-charcoal-soft leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">What our clients say</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-4">Testimonials</h2>
            <div className="w-16 h-px bg-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(({ id, name, role, text, rating }) => (
              <div key={id} className="bg-charcoal-light p-8 relative">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-serif text-lg text-white/80 italic leading-relaxed mb-6">&ldquo;{text}&rdquo;</p>
                <div className="border-t border-white/10 pt-5">
                  <p className="font-sans font-semibold text-sm text-white">{name}</p>
                  <p className="font-sans text-xs text-white/40 mt-1">{role}</p>
                </div>
                <div className="absolute top-8 right-8 text-gold/20 font-serif text-6xl leading-none">&ldquo;</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="section-subtitle mb-3">Get in touch</p>
              <h2 className="section-title mb-4">Contact Us</h2>
              <div className="w-12 h-px bg-gold mb-6" />
              <p className="font-sans text-sm text-charcoal-soft leading-relaxed mb-8">
                Whether you need guidance finding your perfect scent, have a question about an order, or wish to enquire about bespoke fragrance creation — our team is at your disposal.
              </p>
              <div className="space-y-5">
                {[
                  { label: 'Email', value: 'hello@luxeparfum.com' },
                  { label: 'Phone', value: '+1 (614) 555-0198' },
                  { label: 'Address', value: '120 High Street, Columbus, OH 43215' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-4">
                    <span className="font-sans text-xs tracking-widest uppercase text-gold font-semibold w-20 pt-0.5">{label}</span>
                    <span className="font-sans text-sm text-charcoal-soft">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="luxury-label">First Name</label>
                  <input className="luxury-input" placeholder="Phanol" />
                </div>
                <div>
                  <label className="luxury-label">Last Name</label>
                  <input className="luxury-input" placeholder="Louis" />
                </div>
              </div>
              <div>
                <label className="luxury-label">Email</label>
                <input type="email" className="luxury-input" placeholder="hello@example.com" />
              </div>
              <div>
                <label className="luxury-label">Message</label>
                <textarea className="luxury-input h-32 resize-none" placeholder="Tell us how we can help..." />
              </div>
              <button type="submit" className="btn-dark w-full text-center">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

