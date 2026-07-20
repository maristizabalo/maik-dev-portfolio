"use client";

import { useRef } from "react";
import { useInView as useFramerInView } from "framer-motion";

type InViewOptions = {
  once?: boolean;
  amount?: number | "some" | "all";
};

export function useInView<T extends Element = HTMLDivElement>(
  options: InViewOptions = {},
) {
  const ref = useRef<T>(null);
  const inView = useFramerInView(ref, {
    once: options.once ?? true,
    amount: options.amount ?? 0.3,
  });

  return { ref, inView } as const;
}
