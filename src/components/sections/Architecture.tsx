"use client";

import { useLocale, useTranslations } from "next-intl";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { archLayers, archFlow } from "@/data/architecture";

export function Architecture() {
  const t = useTranslations();
  const locale = useLocale() as "es" | "en";

  return (
    <>
      <SectionHeader
        title={t("sections.architecture.title")}
        description={
          locale === "es"
            ? "Diseño sistemas por capas y elijo trade-offs conscientes en cada nivel. Saber elegir vale más que saber nombrar tecnologías."
            : "I design systems in layers and choose conscious trade-offs at each level. Knowing what to pick beats knowing what to name."
        }
      />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <Stagger className="space-y-3">
          {archLayers.map((layer) => (
            <StaggerItem key={layer.id}>
              <div className="rounded-xl border border-line bg-surface-1 p-5 transition-colors hover:border-signal/40">
                <h3 className="font-display text-base font-semibold text-ink">
                  {layer.title[locale]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {layer.description[locale]}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {layer.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[0.7rem] text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="rounded-2xl border border-line bg-surface-1 p-6 lg:sticky lg:top-28 lg:self-start">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-signal">
            {locale === "es"
              ? "Un caso real, de principio a fin"
              : "A real case, end to end"}
          </p>
          <div className="space-y-1">
            {archFlow.map((step, index) => (
              <Reveal key={step.order} delay={index * 0.08} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-signal/40 bg-signal/10 font-mono text-sm text-signal">
                    {step.order}
                  </span>
                  {index < archFlow.length - 1 && (
                    <span aria-hidden className="my-1 h-full min-h-[2rem] w-px bg-line" />
                  )}
                </div>
                <div className="pb-6">
                  <h4 className="font-medium text-ink">{step.title[locale]}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {step.description[locale]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
