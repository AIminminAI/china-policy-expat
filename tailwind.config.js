/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        navy: {
          50: '#e8ecf3',
          100: '#c5cfe3',
          200: '#9fb0d1',
          300: '#7890bf',
          400: '#5a78b1',
          500: '#3c60a3',
          600: '#2d4f8e',
          700: '#1a365d',
          800: '#132a4a',
          900: '#0d1e36',
        },
        gold: {
          50: '#fdf8e8',
          100: '#f9edc4',
          200: '#f5e09c',
          300: '#f0d36f',
          400: '#e5c044',
          500: '#d69e2e',
          600: '#b8831f',
          700: '#9a6a16',
          800: '#7c5310',
          900: '#5e3d0b',
        },
      },
      fontFamily: {
        heading: ['Merriweather', 'Georgia', 'serif'],
        body: ['Source Sans 3', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
