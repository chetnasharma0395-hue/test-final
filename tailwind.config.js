/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange:  '#F7941D',
          dark:    '#D97E10',
          bg:      '#0a0a0a',
          surface: '#111111',
          text:    '#FFFFFF',
          navy:    '#0B1C3F',
          charcoal:'#1e1e1e',
        },
      },
      backgroundImage: {
        'glass-gradient':  'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
        'orange-gradient': 'linear-gradient(135deg, #F7941D 0%, #D97E10 100%)',
        'dot-grid':        'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-grid': '28px 28px',
      },
      boxShadow: {
        'orange-glow':  '0 0 28px -4px rgba(247,148,29,0.40)',
        'orange-glow-lg': '0 0 48px -4px rgba(247,148,29,0.45)',
        'glass':        '0 8px 32px 0 rgba(0,0,0,0.40)',
        'dark':         '0 4px 24px 0 rgba(0,0,0,0.60)',
        'card-hover':   '0 24px 56px rgba(0,0,0,0.45), 0 0 0 1px rgba(247,148,29,0.12)',
        'carousel':     '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(247,148,29,0.10)',
      },
      fontFamily: {
        heading: ['var(--font-montserrat)', 'sans-serif'],
        sans:    ['var(--font-inter)', 'sans-serif'],
      },
      maxWidth: {
        page: '1500px',
      },
      borderRadius: {
        '2.5xl': '20px',
        '3xl':   '24px',
        '4xl':   '32px',
      },
      keyframes: {
        'aurora-1': {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '33%':      { transform: 'translate3d(50px,-35px,0)' },
          '66%':      { transform: 'translate3d(-25px,25px,0)' },
        },
        'aurora-2': {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '33%':      { transform: 'translate3d(-40px,40px,0)' },
          '66%':      { transform: 'translate3d(30px,-15px,0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        'blob-1': {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%':      { transform: 'translate(40px,-25px) scale(1.04)' },
          '66%':      { transform: 'translate(-20px,20px) scale(0.97)' },
        },
        'blob-2': {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%':      { transform: 'translate(-35px,35px) scale(1.03)' },
          '66%':      { transform: 'translate(25px,-15px) scale(0.96)' },
        },
        'shimmer-stat': {
          '0%':   { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      animation: {
        'aurora-1':     'aurora-1 20s ease-in-out infinite',
        'aurora-2':     'aurora-2 24s ease-in-out infinite',
        'float':        'float 4s ease-in-out infinite',
        'blob-1':       'blob-1 10s ease-in-out infinite',
        'blob-2':       'blob-2 13s ease-in-out infinite',
        'shimmer':      'shimmer-stat 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
