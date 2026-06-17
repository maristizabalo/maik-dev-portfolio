"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer } from "@/lib/motion";

const StaggerContainer = ({ children, className = "", as = "div" }) => {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      variants={prefersReducedMotion ? undefined : staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.16 }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};

export default StaggerContainer;
