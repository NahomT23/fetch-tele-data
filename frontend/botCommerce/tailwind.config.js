export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        typing: {
          'from': { width: '0%' },
          'to': { width: '100%' },
        },
      },
      animation: {
        typing: 'typing 5s linear', 
      },
      fontFamily: {
        baskervville: ['"Baskervville SC"', 'serif'],
      },
    },
  },
  plugins: [],
}
