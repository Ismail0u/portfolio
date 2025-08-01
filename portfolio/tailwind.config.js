/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // <-- important !
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          primary: ['Poppins', 'sans-serif'],
        }
      },
    },
    plugins: [],
  }
  