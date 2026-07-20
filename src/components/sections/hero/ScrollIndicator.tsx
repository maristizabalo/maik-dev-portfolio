"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ScrollIndicator({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-faint">
        {label}
      </span>
      <span className="relative block h-10 w-px overflow-hidden bg-line/60">
        {!reduce && (
          <motion.span
            className="absolute inset-x-0 top-0 block h-4 bg-signal"
            animate={{ y: ["-120%", "260%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </span>
    </div>
  );
}
