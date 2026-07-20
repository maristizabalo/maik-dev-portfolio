"use client";

import { motion, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { HeroBackground } from "./HeroBackground";
import { HeroMedia } from "./HeroMedia";
import { RoleRotator } from "./RoleRotator";
import { ScrollIndicator } from "./ScrollIndicator";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { usePointerParallax } from "@/hooks/use-pointer-parallax";
import { ctaVariants } from "@/components/ui/cta";
import { scrollToSection } from "@/lib/lenis";
import { profile } from "@/data/profile";

export function Hero() {
  const t = useTranslations();
  const locale = useLocale() as "es" | "en";
  const roles = t.raw("roles") as string[];
  const { x, y } = usePointerParallax(8);
  const bgX = useTransform(x, (v) => v * 1.4);
  const bgY = useTransform(y, (v) => v * 1.4);
  const mediaX = useTransform(x, (v) => v * -0.6);
  const mediaY = useTransform(y, (v) => v * -0.6);

  return (
    <section id="hero" className="relative min-h-[100dvh] overflow-hidden">
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 -z-10">
        <HeroBackground className="h-full w-full opacity-70" />
      </motion.div>

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[6%] top-[8%] h-[42vh] w-[42vw] rounded-full bg-signal/10 blur-[130px]" />
      </div>

      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-5 pb-20 pt-28 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:pt-32">
        <div>
          <Reveal y={16}>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-1/60 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
              </span>
              {t("hero.availability")}
            </span>
          </Reveal>

          <h1 className="mt-7 text-balance font-display text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-tight">
            <TextReveal text={profile.name} />
          </h1>

          <div className="mt-4 flex items-center gap-3 font-mono text-base uppercase tracking-[0.16em] text-signal md:text-lg">
            <span aria-hidden className="h-px w-8 bg-signal/50" />
            <RoleRotator roles={roles} />
          </div>

          <Reveal
            delay={0.15}
            className="mt-7 max-w-prose text-pretty text-base leading-relaxed text-muted md:text-lg"
          >
            {t("hero.valueProp")}
          </Reveal>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton className="inline-flex">
              <button
                type="button"
                onClick={() => scrollToSection("projects")}
                className={ctaVariants({ variant: "primary" })}
              >
                {t("hero.ctaProjects")}
              </button>
            </MagneticButton>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className={ctaVariants({ variant: "outline" })}
            >
              {t("hero.ctaContact")}
            </button>
            <a
              href={profile.cvUrl}
              download
              className={ctaVariants({ variant: "ghost" })}
            >
              {t("hero.ctaCv")}
            </a>
          </div>
        </div>

        <motion.div
          style={{ x: mediaX, y: mediaY }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <HeroMedia alt={profile.photo.alt[locale]} />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto flex max-w-content items-center justify-between px-5 md:px-8">
        <ScrollIndicator label={t("hero.scrollHint")} />
        <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.2em] text-faint md:block">
          {profile.location[locale]}
        </span>
      </div>
    </section>
  );
}
