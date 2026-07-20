"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function About() {
  const t = useTranslations();
  const locale = useLocale() as "es" | "en";

  return (
    <>
      <SectionHeader
        kicker={t("sections.about.kicker")}
        title={t("sections.about.title")}
      />
      <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface-2 ring-1 ring-line">
            <Image
              src="/assets/frente.png"
              alt={profile.photo.alt[locale]}
              fill
              sizes="(max-width: 1024px) 80vw, 40vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas/50 to-transparent" />
          </div>
        </Reveal>

        <div className="flex flex-col justify-center gap-6 border-l border-line pl-6 md:pl-8">
          {profile.bio.map((paragraph, index) => (
            <Reveal
              key={paragraph.es}
              delay={index * 0.08}
              className={cn(
                "text-pretty text-lg leading-relaxed",
                index === 0 ? "text-ink" : "text-muted",
              )}
            >
              {paragraph[locale]}
            </Reveal>
          ))}

          <Reveal delay={0.3} className="flex flex-wrap gap-2 pt-2">
            {profile.languages.map((language) => (
              <span
                key={language.name.es}
                className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted"
              >
                {language.name[locale]} · {language.level[locale]}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </>
  );
}
