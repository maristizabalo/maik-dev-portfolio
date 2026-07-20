"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeSignal } from "@/lib/easings";

type RoleRotatorProps = {
  roles: string[];
  className?: string;
  interval?: number;
};

export function RoleRotator({
  roles,
  className,
  interval = 2200,
}: RoleRotatorProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || roles.length <= 1) return;
    const id = window.setInterval(
      () => setIndex((prev) => (prev + 1) % roles.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [reduce, roles.length, interval]);

  const longest = roles.reduce((a, b) => (b.length > a.length ? b : a), "");
  const current = roles[index] ?? roles[0] ?? "";

  return (
    <span className={cn("relative inline-grid align-baseline", className)}>
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        {longest}
      </span>
      <span className="col-start-1 row-start-1 block overflow-hidden">
        {reduce ? (
          <span>{current}</span>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={index}
              className="block will-change-transform"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-110%", opacity: 0 }}
              transition={{ duration: 0.5, ease: easeSignal }}
            >
              {current}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
    </span>
  );
}
