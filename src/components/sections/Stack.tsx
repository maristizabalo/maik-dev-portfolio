"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { SectionHeader } from "./SectionHeader";
import { FilterChip } from "@/components/ui/FilterChip";
import { stack, techCategories } from "@/data/stack";
import type { ProficiencyLevel, TechCategory } from "@/types/content";
import { easeSignal } from "@/lib/easings";
import { cn } from "@/lib/utils";

const levelWeight: Record<ProficiencyLevel, number> = {
  expert: 1,
  advanced: 0.82,
  proficient: 0.62,
  working: 0.42,
  familiar: 0.26,
};

export function Stack() {
  const t = useTranslations();
  const locale = useLocale() as "es" | "en";
  const [category, setCategory] = useState<TechCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stack.filter(
      (tech) =>
        (category === "all" || tech.category === category) &&
        (!q || tech.name.toLowerCase().includes(q)),
    );
  }, [category, query]);

  const active = stack.find((tech) => tech.id === selected) ?? null;

  return (
    <>
      <SectionHeader
        kicker={t("sections.stack.kicker")}
        title={t("sections.stack.title")}
      />

      <div className="mb-8 flex flex-col gap-5">
        <div className="flex items-center gap-3 rounded-full border border-line bg-surface-1 px-4 py-2.5 sm:max-w-xs">
          <MagnifyingGlass size={16} className="text-faint" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("labels.search")}
            aria-label={t("labels.search")}
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-faint"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterChip active={category === "all"} onClick={() => setCategory("all")}>
            {t("labels.all")}
          </FilterChip>
          {techCategories.map((item) => (
            <FilterChip
              key={item.id}
              active={category === item.id}
              onClick={() => setCategory(item.id)}
            >
              {item.label[locale]}
            </FilterChip>
          ))}
        </div>
      </div>

      {active && (
        <div className="mb-6 rounded-2xl border border-signal/25 bg-signal/5 p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-ink">
              {active.name}
            </h3>
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="text-muted transition-colors hover:text-ink"
            >
              <X size={16} />
            </button>
          </div>
          <p className="mt-2 font-mono text-xs text-muted">
            {t(`labels.${active.level}`)} · {active.years} {t("labels.years")} ·{" "}
            {active.projects.length} {t("labels.projects")}
          </p>
          {active.contexts.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {active.contexts.map((context) => (
                <span
                  key={context}
                  className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[0.7rem] text-muted"
                >
                  {context}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <motion.div
        layout
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
      >
        {filtered.map((tech) => (
          <motion.button
            layout
            key={tech.id}
            type="button"
            onClick={() => setSelected(tech.id === selected ? null : tech.id)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "flex flex-col gap-3 rounded-xl border p-4 text-left transition-colors",
              tech.id === selected
                ? "border-signal bg-signal/5"
                : "border-line bg-surface-1 hover:border-signal/40",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-ink">{tech.name}</span>
              <span className="font-mono text-[0.65rem] uppercase tracking-wide text-faint">
                {tech.years}
                {t("labels.years")}
              </span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-surface-2">
              <motion.div
                className="h-full rounded-full bg-signal"
                style={{ transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: levelWeight[tech.level] }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: easeSignal }}
              />
            </div>
            <span className="font-mono text-[0.65rem] uppercase tracking-wide text-muted">
              {t(`labels.${tech.level}`)}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </>
  );
}
