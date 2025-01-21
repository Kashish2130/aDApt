/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        grow: "grow 2s ease-out", // Existing grow animation
        scatter: "scatter 0.5s ease-in-out forwards", // New scatter animation
      },
      keyframes: {
        grow: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scatter: { // New scatter keyframes
          '0%': { opacity: '0', transform: 'translateY(20px) rotate(-10deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotate(0)' },
        },
      },
    },
  },
  plugins: [],
};
