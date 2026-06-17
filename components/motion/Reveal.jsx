"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const Reveal = ({ children, className = "", delay = 0, as = "div" }) => {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      variants={prefersReducedMotion ? undefined : fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
