/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0D0D12",
        accent: "#4d90dcff",
        background: "#FAF8F5",
        dark: "#2A2A35"
      },
      fontFamily: {
        heading: ['"Inter"', 'sans-serif'],
        drama: ['"Ubuntu Mono"', 'monospace'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif']
      }
    },
  },
  plugins: [],
}

