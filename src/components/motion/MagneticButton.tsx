"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMagnetic } from "@/hooks/use-magnetic";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

export function MagneticButton({
  children,
  className,
  strength = 0.3,
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic(strength);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
}
