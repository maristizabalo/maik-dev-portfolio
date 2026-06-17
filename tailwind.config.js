const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "968px",
      xl: "1200px",
    },
    fontFamily: {
      primary: "var(--font-jetbrainsMono)",
    },
    extend: {
      colors: {
        primary: '#050816',
        bgDark: '#050816',
        ink: '#070A18',
        panel: 'rgba(12, 18, 38, 0.72)',
        line: 'rgba(148, 163, 184, 0.18)',
        cyan: '#22D3EE',
        violet: '#8B5CF6',
        magenta: '#D946EF',
        bgLight: '#EAEAEA',
        textLight: "#222222",
        textSecLight: "#555555",
        accent: {
          DEFAULT: '#00E0FF',
          hover: '#00BFDA',
        }
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        glow: "0 0 36px rgba(34, 211, 238, 0.24)",
        violetGlow: "0 0 42px rgba(139, 92, 246, 0.28)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), nextui()],
}
