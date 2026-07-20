"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { experience } from "@/data/experience";

export function Experience() {
  const t = useTranslations();
  const locale = useLocale() as "es" | "en";
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.65", "end 0.5"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      <SectionHeader
        kicker={t("sections.experience.kicker")}
        title={t("sections.experience.title")}
      />

      <div ref={ref} className="relative pl-8 md:pl-12">
        <div
          aria-hidden
          className="absolute left-2 top-2 h-[calc(100%-1rem)] w-px bg-line md:left-3"
        />
        <motion.div
          aria-hidden
          className="absolute left-2 top-2 h-[calc(100%-1rem)] w-px origin-top bg-signal md:left-3"
          style={{ scaleY: lineScale }}
        />

        <div className="space-y-12">
          {experience.map((item) => (
            <Reveal key={item.id} className="relative">
              <span
                aria-hidden
                className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border-2 border-signal bg-canvas md:-left-[2.35rem]"
              />
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-signal">
                {item.period[locale]}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                {item.company}{" "}
                <span className="text-muted">— {item.role[locale]}</span>
              </h3>
              <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted">
                {item.summary[locale]}
              </p>
              <ul className="mt-4 space-y-2">
                {item.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex gap-2.5 text-sm leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-signal"
                    />
                    {highlight[locale]}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[0.7rem] text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
