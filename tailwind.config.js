/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'twitter-blue': '#1D9BF0',
        'twitter-dark': '#15202B',
        'twitter-darker': '#0E1419',
        'twitter-gray': '#536471',
        'twitter-lightGray': '#E7E7E8',
      },
    },
  },
  plugins: [],
}
