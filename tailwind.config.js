/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        walnut: '#2c1a0e',
        caramel: '#8b6340',
        linen: '#c4a882',
        'warm-cream': '#f5ede0',
        'ivory-white': '#fdf6ec',
      },
      fontFamily: {
        heading: ['Playfair', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}