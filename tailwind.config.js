/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          lightest: '#FAF7F2',
          light:    '#F5EFE4',
          mid:      '#EDE1CC',
          dark:     '#D9C8A8',
        },
        gold: {
          light: '#F0D060',
          mid:   '#D4AF37',
          dark:  '#A07828',
          shine: '#FFE680',
        },
        forest: {
          light: '#8AAD6A',
          mid:   '#4E7A30',
          dark:  '#2D5016',
        },
        crimson: {
          light: '#C9605A',
          mid:   '#A83228',
          dark:  '#7A1A10',
        },
        ink: {
          dark:  '#3A2410',
          mid:   '#6B4C2A',
          light: '#9A7650',
        },
      },
      fontFamily: {
        lato:      ['Lato', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        playfair:  ['"Playfair Display"', 'serif'],
        vibes:     ['"Great Vibes"', 'cursive'],
      },
      animation: {
        'fade-in-up':   'fadeInUp 1.2s ease both',
        'gold-shimmer': 'goldShimmer 3s linear infinite',
        'pulse-slow':   'pulse 2.5s ease-in-out infinite',
        'bounce-arrow': 'bounceArrow 1.4s ease-in-out infinite',
        'float-petal':  'floatPetal linear infinite',
        'ripple-ring':  'rippleRing 1.2s ease-out infinite',
        'bounce-pin':   'bounce 2s ease-in-out infinite',
        'fade-hint':    'fadeHint 3s ease 2s forwards',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        goldShimmer: {
          '0%':   { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        bounceArrow: {
          '0%, 100%': { transform: 'rotate(45deg) translateY(0)',   opacity: '0.5' },
          '50%':      { transform: 'rotate(45deg) translateY(5px)', opacity: '1' },
        },
        floatPetal: {
          '0%':   { transform: 'translateY(-20px) rotate(0deg)',   opacity: '0' },
          '10%':  { opacity: '0.7' },
          '90%':  { opacity: '0.5' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
        rippleRing: {
          '0%':   { opacity: '0.6', transform: 'scale(0.85)' },
          '100%': { opacity: '0',   transform: 'scale(1.2)' },
        },
        fadeHint: {
          '0%':  { opacity: '0' },
          '30%': { opacity: '1' },
          '70%': { opacity: '1' },
          '100%':{ opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
