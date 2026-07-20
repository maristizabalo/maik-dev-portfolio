"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "@phosphor-icons/react";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TiltCard } from "@/components/motion/TiltCard";
import { Link } from "@/i18n/navigation";
import { projects } from "@/data/projects";
import type { ProjectStatus } from "@/types/content";

const statusLabelKey: Record<ProjectStatus, string> = {
  public: "statusPublic",
  private: "statusPrivate",
  "in-progress": "statusInProgress",
};

export function Projects() {
  const t = useTranslations();
  const locale = useLocale() as "es" | "en";

  return (
    <>
      <SectionHeader
        kicker={t("sections.projects.kicker")}
        title={t("sections.projects.title")}
      />

      <Stagger className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <StaggerItem key={project.slug} className="h-full">
            <TiltCard className="h-full" max={5}>
              <Link
                href={`/work/${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-1 transition-colors hover:border-signal/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-br from-signal/15 via-transparent to-transparent"
                  />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-4xl font-semibold text-ink/10">
                      {project.name}
                    </span>
                  </div>
                  <span className="absolute left-4 top-4 rounded-full border border-line bg-canvas/70 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wide text-muted backdrop-blur">
                    {t(`labels.${statusLabelKey[project.status]}`)}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink">
                        {project.name}
                      </h3>
                      <p className="mt-1 font-mono text-xs text-muted">
                        {project.category[locale]}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="text-faint transition-colors group-hover:text-signal"
                    />
                  </div>

                  <p className="mt-4 text-pretty text-sm leading-relaxed text-muted">
                    {project.summary[locale]}
                  </p>
                  <p className="mt-3 text-sm font-medium text-signal">
                    {project.impact[locale]}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                    {project.stack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[0.7rem] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </>
  );
}
