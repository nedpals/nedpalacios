module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'theme': { 
          DEFAULT: '#3AAED8', 
          '50': '#FAFDFE', 
          '100': '#E4F4FA', 
          '200': '#BAE3F1', 
          '300': '#8FD1E9', 
          '400': '#65C0E0', 
          '500': '#3AAED8', 
          '600': '#2592BA', 
          '700': '#1C7190', 
          '800': '#144F65', 
          '900': '#0C2E3A' 
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
