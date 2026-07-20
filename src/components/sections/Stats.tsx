"use client";

import { useLocale } from "next-intl";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { Reveal } from "@/components/motion/Reveal";
import { stats } from "@/data/stats";

export function Stats() {
  const locale = useLocale() as "es" | "en";

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
      {stats.map((stat, index) => (
        <Reveal key={stat.id} delay={index * 0.05}>
          <div className="border-l border-line pl-4">
            <p className="font-display text-4xl font-semibold text-ink md:text-5xl">
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="font-mono-num"
              />
            </p>
            <p className="mt-2 text-xs leading-snug text-muted">
              {stat.label[locale]}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
