"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "@phosphor-icons/react";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { scrollToSection } from "@/lib/lenis";
import { services } from "@/data/services";

export function Services() {
  const t = useTranslations();
  const locale = useLocale() as "es" | "en";

  return (
    <>
      <SectionHeader title={t("sections.services.title")} />
      <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {services.map((service) => (
          <StaggerItem key={service.id}>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="group flex h-full w-full flex-col items-start gap-4 bg-surface-1 p-8 text-left transition-colors hover:bg-surface-2"
            >
              <div className="flex w-full items-start justify-between gap-4">
                <h3 className="font-display text-xl font-semibold text-ink">
                  {service.title[locale]}
                </h3>
                <ArrowUpRight
                  size={20}
                  className="text-faint transition-colors group-hover:text-signal"
                />
              </div>
              <p className="text-pretty text-sm leading-relaxed text-muted">
                {service.description[locale]}
              </p>
              <p className="mt-auto text-sm text-muted">{service.forWhom[locale]}</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {service.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[0.7rem] text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </button>
          </StaggerItem>
        ))}
      </Stagger>
    </>
  );
}
