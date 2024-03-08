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
        'ayahColor':'black',
        'quranColor':'white',
        'ayah':'#e4eedc',
      },
      screens:{
        'nav': '920px',
        'nav2':'330px',
        'mobile': '450px',
        'fold':'300px',
        'fold2':'400px',
        'fold3':'600px',
      }
    },
  },
  plugins: [],
}

