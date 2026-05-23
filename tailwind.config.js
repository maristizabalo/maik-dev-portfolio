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
      primary: "var(--font-nunito)",
      display: "var(--font-display)",
    },
    extend: {
      colors: {
        primary: '#3B1732',
        bgDark: '#241020',
        bgLight: '#FFF5F9',
        textLight: "#3F2636",
        textSecLight: "#7D526B",
        surfaceLight: "#FFFFFF",
        surfaceDark: "#3B1732",
        petal: "#FFE4EF",
        blush: "#FFF0F6",
        plum: "#3B1732",
        mauve: "#8E4168",
        sage: "#8AA399",
        champagne: "#F9E4C8",
        accent: {
          DEFAULT: '#EC4899',
          hover: '#DB2777',
          soft: '#F9A8D4',
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
    },
  },
  plugins: [require("tailwindcss-animate"), nextui()],
}
