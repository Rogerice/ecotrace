/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { forest: '#0b3b2b', mint: '#ccf3b5', canvas: '#f6f8f5' },
      fontFamily: { sans: ['DM Sans', 'system-ui', 'sans-serif'], display: ['Manrope','DM Sans','sans-serif'] }
    }
  }, plugins: []
}
