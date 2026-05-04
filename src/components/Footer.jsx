import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaPinterestP, FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal, FaCcApplePay } from 'react-icons/fa';
import { FaTiktok, FaXTwitter, FaGooglePay } from 'react-icons/fa6';

const socialLinks = [
  { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: FaFacebookF, label: 'Facebook', href: 'https://facebook.com' },
  { icon: FaPinterestP, label: 'Pinterest', href: 'https://pinterest.com' },
  { icon: FaTiktok, label: 'TikTok', href: 'https://tiktok.com' },
  { icon: FaXTwitter, label: 'X (Twitter)', href: 'https://x.com' },
];

const paymentIcons = [
  { icon: FaCcVisa, label: 'Visa' },
  { icon: FaCcMastercard, label: 'Mastercard' },
  { icon: FaCcAmex, label: 'American Express' },
  { icon: FaCcPaypal, label: 'PayPal' },
  { icon: FaCcApplePay, label: 'Apple Pay' },
  { icon: FaGooglePay, label: 'Google Pay' },
];

const Footer = () => (
  <footer className="bg-charcoal text-white">
    {/* Top bar - newsletter */}
    <div className="border-b border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="section-subtitle mb-3">Stay in the know</p>
        <h3 className="font-serif text-3xl font-light text-white mb-6">
          Subscribe to Our Newsletter
        </h3>
        <form
          className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-charcoal-light border border-white/20 text-white text-sm px-5 py-3 focus:outline-none focus:border-gold placeholder:text-white/40 font-sans"
          />
          <button
            type="submit"
            className="bg-gold text-charcoal font-sans font-semibold text-xs tracking-widest uppercase px-6 py-3 hover:bg-gold-dark transition-colors duration-200 whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>

    {/* Main footer */}
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <span className="font-serif text-xl tracking-[0.15em] text-white">LUXE PARFUM</span>
              <br />
              <span className="text-[9px] tracking-[0.4em] uppercase text-gold font-sans">Maison de Parfumerie</span>
            </Link>
            <p className="font-sans text-sm text-white/50 leading-relaxed">
              Crafting exceptional fragrances since 1987. Each bottle is a story waiting to be worn.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-6 font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Collection' },
                { to: '/cart', label: 'Shopping Cart' },
                { to: '/login', label: 'My Account' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-sans text-sm text-white/50 hover:text-gold transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-6 font-semibold">Contact</h4>
            <ul className="space-y-3">
              <li className="font-sans text-sm text-white/50">
                120 High Street<br />Columbus, OH 43215
              </li>
              <li>
                <a href="mailto:hello@luxeparfum.com" className="font-sans text-sm text-white/50 hover:text-gold transition-colors duration-200">
                  hello@luxeparfum.com
                </a>
              </li>
              <li>
                <a href="tel:+16145550198" className="font-sans text-sm text-white/50 hover:text-gold transition-colors duration-200">
                  +1 (614) 555-0198
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Payment */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-6 font-semibold">Follow Us</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold hover:shadow-[0_0_8px_rgba(184,148,84,0.4)] transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            <div className="mt-8">
              <p className="font-sans text-xs tracking-widest uppercase text-gold mb-4 font-semibold">We Accept</p>
              <div className="flex flex-wrap gap-2">
                {paymentIcons.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    aria-label={label}
                    title={label}
                    className="text-white/40 hover:text-white/70 transition-colors duration-200"
                  >
                    <Icon size={36} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-white/10 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-sans text-xs text-white/30 tracking-wide">
          &copy; {new Date().getFullYear()} Luxe Parfum. All rights reserved.
        </p>
        <div className="flex space-x-6">
          {['Privacy Policy', 'Terms of Service', 'Shipping Policy'].map((item) => (
            <a key={item} href="#" className="font-sans text-xs text-white/30 hover:text-gold transition-colors duration-200">
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

