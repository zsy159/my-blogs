/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        gold: '#d4a853',
        'gold-light': '#e0c060',
        'gold-bg': 'rgba(212, 168, 83, 0.15)',
        'gold-bg-active': 'rgba(212, 168, 83, 0.25)',
        charcoal: 'rgba(255, 255, 255, 0.08)',
        'status-green': '#22c55e',
      },
    },
  },
  plugins: [],
}
