"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";
import { easeSignal } from "@/lib/easings";

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const reduce = useReducedMotion();
  const locale = useLocale();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;

    const format = (n: number) =>
      `${prefix}${new Intl.NumberFormat(locale).format(Math.round(n))}${suffix}`;

    if (reduce) {
      node.textContent = format(value);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: easeSignal,
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });

    return () => controls.stop();
  }, [inView, reduce, value, prefix, suffix, duration, locale]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {new Intl.NumberFormat(locale).format(value)}
      {suffix}
    </span>
  );
}
