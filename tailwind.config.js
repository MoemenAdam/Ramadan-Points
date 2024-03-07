/** @type {import('tailwindcss').Config} */
export default {
  content:  [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#304E64',
        'secondary': '#F4CE14',
        'black':'#0E190F',
        'white':'#F2F2F2',
        'ayah':'#e4eedc',
      },
      screens:{
        'nav': '920px',
        'mobile': '450px',
        'fold':'300px',
        'fold2':'400px',
        'fold3':'600px',
      }
    },
  },
  plugins: [],
}

