"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useParallax } from "@/hooks/use-parallax";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  distance?: number;
};

export function Parallax({ children, className, distance = 80 }: ParallaxProps) {
  const reduce = useReducedMotion();
  const { ref, y } = useParallax(distance);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
