/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../../packages/ui/**/*.{js,jsx}',
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['corporate'],
  },
};
