/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
        bricolage: ['"Bricolage Grotesque"', "sans-serif"],
        merriweather: ["Merriweather", "serif"],
        quicksand: ['"Quicksand"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
