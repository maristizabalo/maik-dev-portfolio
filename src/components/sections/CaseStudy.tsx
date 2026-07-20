"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, GithubLogo, ArrowSquareOut } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import type { Project, ProjectStatus } from "@/types/content";

const statusLabelKey: Record<ProjectStatus, string> = {
  public: "statusPublic",
  private: "statusPrivate",
  "in-progress": "statusInProgress",
};

export function CaseStudy({ project }: { project: Project }) {
  const t = useTranslations();
  const locale = useLocale() as "es" | "en";

  const blocks = [
    { key: "problem", value: project.problem[locale] },
    { key: "solution", value: project.solution[locale] },
    { key: "impact", value: project.impact[locale] },
  ];

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-signal"
        >
          <ArrowLeft size={16} />
          {t("nav.work")}
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-line px-3 py-1 font-mono text-xs uppercase tracking-wide text-muted">
            {t(`labels.${statusLabelKey[project.status]}`)}
          </span>
          <span className="font-mono text-xs text-faint">
            {project.category[locale]} · {project.year}
          </span>
        </div>

        <h1 className="mt-4 text-balance font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-tight">
          {project.name}
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
          {project.summary[locale]}
        </p>

        <div className="mt-8 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-surface-2 px-3 py-1 font-mono text-xs text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        {(project.links?.github || project.links?.demo) && (
          <div className="mt-6 flex flex-wrap gap-4">
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-signal"
              >
                <GithubLogo size={18} />
                GitHub
              </a>
            )}
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-signal"
              >
                <ArrowSquareOut size={18} />
                Demo
              </a>
            )}
          </div>
        )}

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {blocks.map((block, index) => (
            <Reveal
              key={block.key}
              delay={index * 0.08}
              className="border-t border-line pt-5"
            >
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-signal">
                {t(`labels.${block.key}`)}
              </p>
              <p className="mt-3 text-pretty leading-relaxed text-muted">
                {block.value}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
