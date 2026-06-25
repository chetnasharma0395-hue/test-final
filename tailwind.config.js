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
          bg:      '#121212',
          surface: '#1A1A1A',
          text:    '#FFFFFF',
          navy:    '#0B1C3F',
          charcoal:'#2A2A2A',
        },
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
      },
      boxShadow: {
        'orange-glow': '0 0 25px -5px rgba(247, 148, 29, 0.4)',
        'glass':       '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        'dark':        '0 4px 24px 0 rgba(0, 0, 0, 0.6)',
      },
      fontFamily: {
        heading: ['var(--font-montserrat)', 'sans-serif'],
        sans:    ['var(--font-inter)', 'sans-serif'],
      },
      maxWidth: {
        page: '1500px',
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
      },
      animation: {
        'aurora-1': 'aurora-1 20s ease-in-out infinite',
        'aurora-2': 'aurora-2 24s ease-in-out infinite',
        'float':    'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
