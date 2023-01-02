/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../../packages/ui/**/*.{js,jsx}',
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      maxHeight: {
        'text-limit': 'calc(var(--max-lines) * 1em * var(--line-height))',
      },
      lineHeight: {
        'text-limit': 'var(--line-height)',
      },
      height: {
        'before-text-limit': 'calc(1em * var(--line-height))',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['corporate'],
  },
};