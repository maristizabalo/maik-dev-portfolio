"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const MagneticButton = ({ children, className = "" }) => {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 14, mass: 0.25 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 14, mass: 0.25 });
  const [active, setActive] = useState(false);

  const handleMove = (event) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
  };

  const handleLeave = () => {
    setActive(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={handleLeave}
      className={className}
      data-active={active}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
