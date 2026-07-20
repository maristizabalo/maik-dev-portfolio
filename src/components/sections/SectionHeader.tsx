"use client";

import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  kicker,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      {kicker && (
        <Reveal y={10}>
          <span
            className={cn(
              "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-signal",
              align === "center" && "justify-center",
            )}
          >
            <span aria-hidden className="h-px w-6 bg-signal/50" />
            {kicker}
          </span>
        </Reveal>
      )}
      <h2 className="mt-4 max-w-3xl text-balance font-display text-[clamp(1.9rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight">
        <TextReveal text={title} />
      </h2>
      {description && (
        <Reveal
          y={12}
          delay={0.1}
          className={cn(
            "mt-5 max-w-prose text-pretty text-base leading-relaxed text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </Reveal>
      )}
    </div>
  );
}
