/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { 
        'poppins' : ['Poppins', 'sans-seri']
      },
    },
    screens: {
      'sm': '300px',
      // => @media (min-width: 300px) { ... }

      'md': '500px',
      // => @media (min-width: 1080px) { ... }

      'lg': '1080px',
      // => @media (min-width: 1370px) { ... }
    },
  },
  plugins: [],
}