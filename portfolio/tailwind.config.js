/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          // Fond quasi-noir, unique et statique (pas de gradient animé)
          ink: {
            DEFAULT: '#0a0a0a',
            soft: '#111113',
            line: 'rgba(255,255,255,0.08)',
          },
          // Carte claire (contraste fort avec le fond, seule zone "light" du site)
          paper: '#f4f1ea',
          // Accent primaire — indigo électrique
          accent: {
            DEFAULT: '#6d5bff',
            soft: '#a597ff',
            dim: '#4c3fcf',
            muted: 'rgba(109, 91, 255, 0.12)',
          },
          // Accent secondaire — violet électrique
          accent2: {
            DEFAULT: '#c084fc',
            soft: '#ddb3ff',
            dim: '#9d5fe0',
            muted: 'rgba(192, 132, 252, 0.12)',
          },
        },
        fontFamily: {
          display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
          body: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  