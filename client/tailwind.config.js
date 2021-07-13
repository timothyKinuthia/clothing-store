const colors = require("tailwindcss/colors");

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'viaoda': "'Viaoda Libre', cursive",
        'garamond': "'Cormorant Garamond', serif",
        'monoton': "'Monoton', cursive",
        'ostt': "'Old Standard TT', serif",
        'poiret': "'Poiret One', cursive",
      },
      colors: {
        lightblue: colors.lightBlue,
        truegray: colors.trueGray,
        bluegray: colors.blueGray
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
