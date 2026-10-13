/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'candy-pink': '#e040a0',
        'candy-cyan': '#00c2ff',
        'candy-yellow': '#ffd000',
        'candy-lime': '#10e28f',
        'candy-purple': '#9b51e0',
        'candy-orange': '#ff6b35',
        primary: '#e040a0',
        secondary: '#9b51e0',
        tertiary: '#00c2ff',
        background: '#fef7ff',
        'surface-pop': '#ffffff',
        'on-surface': '#2e1a28',
        'on-surface-variant': '#604868',
      },
      fontFamily: {
        headline: ["'Fredoka'", "'DM Sans'", 'sans-serif'],
        body: ["'DM Sans'", 'sans-serif'],
        display: ["'Fredoka'", 'cursive'],
      },
      boxShadow: {
        candy: '6px 6px 0px #2e1a28',
        'candy-lg': '8px 8px 0px #2e1a28',
        'candy-pink': '6px 6px 0px #e040a0',
        'candy-cyan': '6px 6px 0px #00c2ff',
        'candy-yellow': '6px 6px 0px #ffd000',
        'candy-lime': '6px 6px 0px #10e28f',
        'candy-purple': '6px 6px 0px #9b51e0',
      },
      animation: {
        wiggle: 'wiggle 2.5s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 4s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/container-queries')],
  safelist: ['scale-110'],
}