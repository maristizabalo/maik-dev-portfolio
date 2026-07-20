import type { Config } from "tailwindcss";

const withOpacity = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        md: "2rem",
        lg: "3rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        canvas: withOpacity("--bg-base"),
        "surface-1": withOpacity("--surface-1"),
        "surface-2": withOpacity("--surface-2"),
        ink: withOpacity("--text-primary"),
        muted: withOpacity("--text-secondary"),
        faint: withOpacity("--text-faint"),
        line: withOpacity("--border"),
        signal: withOpacity("--signal"),
        "signal-soft": withOpacity("--signal-soft"),
        "on-signal": withOpacity("--on-signal"),
        live: withOpacity("--live"),
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xs: "0.375rem",
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
      },
      zIndex: {
        base: "0",
        raised: "10",
        sticky: "20",
        nav: "40",
        overlay: "60",
        modal: "80",
        toast: "100",
        cursor: "120",
      },
      boxShadow: {
        "signal-glow": "0 0 40px -8px rgb(var(--signal) / 0.35)",
        "soft-1": "0 1px 2px rgb(var(--shadow) / 0.06), 0 4px 12px rgb(var(--shadow) / 0.08)",
        "soft-2": "0 2px 4px rgb(var(--shadow) / 0.08), 0 12px 32px rgb(var(--shadow) / 0.12)",
      },
      maxWidth: {
        prose: "68ch",
        content: "1440px",
      },
      transitionTimingFunction: {
        signal: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
