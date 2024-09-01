/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pridi: ['Pridi', 'serif'],
        antiquas: ['Modern Antiqua', 'sans-serif'],
      },
    },
  },
  plugins: [],
}