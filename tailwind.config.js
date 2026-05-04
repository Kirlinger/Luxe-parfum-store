/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A96E',
          light: '#E8D5B0',
          dark: '#A07B40',
          bright: '#D4AF37',
        },
        charcoal: {
          DEFAULT: '#1a1a1a',
          light: '#2d2d2d',
          medium: '#444444',
          soft: '#666666',
        },
        cream: {
          DEFAULT: '#F8F4EE',
          dark: '#EDE7DC',
          deeper: '#DDD5C8',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Montserrat"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A96E 0%, #D4AF37 50%, #A07B40 100%)',
        'dark-gradient': 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      },
      boxShadow: {
        'gold': '0 4px 24px rgba(201, 169, 110, 0.3)',
        'gold-lg': '0 8px 40px rgba(201, 169, 110, 0.4)',
        'luxury': '0 20px 60px rgba(0,0,0,0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
};
