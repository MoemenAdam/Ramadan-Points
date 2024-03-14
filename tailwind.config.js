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
        'white':'#EAEAEA',
        'white2': '#EAEAEA99',
        'black':'#101010',
        'black2':'#171717',
        'profile': '#343020',
        'profile2': '#9B7D24',
        
      },
      screens:{
        'big': '1250px',
        'nav': '920px',
        'nav2':'330px',
        'mobile': '450px',
        'fold':'300px',
        'fold2':'400px',
        'fold3':'650px',
        'sm':'820px',
      }
    },
  },
  plugins: [],
}

