/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,tsx,ts}'],
  theme: {
    extend: {
      colors: {
        'kakao-yellow': '#FAE100',
        'dopameme-bg': '#0F0F0F',
        'menubar-highlight': '#3B3B3B',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
