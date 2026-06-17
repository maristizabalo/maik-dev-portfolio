export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export const floating = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
  },
};

export const glowPulse = {
  animate: {
    boxShadow: [
      "0 0 18px rgba(34, 211, 238, 0.22)",
      "0 0 38px rgba(139, 92, 246, 0.42)",
      "0 0 18px rgba(34, 211, 238, 0.22)",
    ],
    transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
  },
};

export const slidePanel = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: "easeOut" } },
  exit: { opacity: 0, y: 18, scale: 0.96, transition: { duration: 0.2, ease: "easeIn" } },
};
