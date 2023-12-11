/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: "#1f6c5c",
        customGreenD: "#145245",
      },
      width: {
        '98': '98%',
      },
    },
  },
  plugins: [],
}
