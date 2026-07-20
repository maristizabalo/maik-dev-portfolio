"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      aria-hidden
      className="print-hide fixed inset-x-0 top-0 z-nav h-[2px] origin-left bg-signal"
      style={{ scaleX: progress }}
    />
  );
}
