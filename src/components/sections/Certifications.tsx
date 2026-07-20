"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { FilterChip } from "@/components/ui/FilterChip";
import {
  certifications,
  totalCertifiedHours,
  certAreaLabels,
} from "@/data/certifications";
import type { CertificationArea } from "@/types/content";

export function Certifications() {
  const t = useTranslations();
  const locale = useLocale() as "es" | "en";
  const [area, setArea] = useState<CertificationArea | "all">("all");

  const areas = useMemo(
    () => Array.from(new Set(certifications.map((cert) => cert.area))),
    [],
  );
  const filtered =
    area === "all"
      ? certifications
      : certifications.filter((cert) => cert.area === area);

  return (
    <>
      <SectionHeader title={t("sections.certifications.title")} />

      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-5xl font-semibold text-signal md:text-6xl">
            <AnimatedCounter value={totalCertifiedHours} className="font-mono-num" />
          </span>
          <span className="text-sm text-muted">{t("labels.certifiedHours")}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterChip active={area === "all"} onClick={() => setArea("all")}>
            {t("labels.all")}
          </FilterChip>
          {areas.map((value) => (
            <FilterChip
              key={value}
              active={area === value}
              onClick={() => setArea(value)}
            >
              {certAreaLabels[value][locale]}
            </FilterChip>
          ))}
        </div>
      </div>

      <motion.div layout className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cert) => (
          <motion.div
            layout
            key={cert.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl border border-line bg-surface-1 p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-medium leading-snug text-ink">
                {cert.title[locale]}
              </h3>
              {cert.hours !== null && (
                <span className="shrink-0 font-mono text-xs text-signal">
                  {cert.hours}h
                </span>
              )}
            </div>
            <p className="mt-3 font-mono text-xs text-muted">
              {cert.issuer} · {cert.year}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
