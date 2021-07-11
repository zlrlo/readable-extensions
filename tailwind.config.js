// tailwind.config.js
module.exports = {
  purge: [],
  purge: ['./apps/readable-extensions/src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
