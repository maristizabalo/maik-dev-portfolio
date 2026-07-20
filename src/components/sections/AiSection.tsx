"use client";

import { useLocale, useTranslations } from "next-intl";
import { Sparkle, ArrowRight } from "@phosphor-icons/react";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ctaVariants } from "@/components/ui/cta";
import { openChat } from "@/lib/chat";
import { aiCapabilities } from "@/data/ai";

export function AiSection() {
  const t = useTranslations();
  const locale = useLocale() as "es" | "en";

  return (
    <>
      <SectionHeader
        kicker={t("sections.ai.kicker")}
        title={t("sections.ai.title")}
      />

      <div className="grid gap-8 lg:grid-cols-[0.55fr_0.45fr] lg:items-start">
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {aiCapabilities.map((capability) => (
            <StaggerItem
              key={capability.id}
              className="rounded-2xl border border-line bg-surface-1 p-5"
            >
              <h3 className="font-display text-base font-semibold text-ink">
                {capability.title[locale]}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {capability.description[locale]}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="relative overflow-hidden rounded-2xl border border-signal/25 bg-signal/5 p-8">
          <Sparkle size={28} weight="duotone" className="text-signal" />
          <p className="mt-5 text-pretty text-lg font-medium leading-relaxed text-ink">
            {locale === "es"
              ? "¿Quieres ver un asistente de IA en acción? Estás a un clic de hablar con uno."
              : "Want to see an AI assistant in action? You're one click away from talking to one."}
          </p>
          <button
            type="button"
            onClick={openChat}
            className={ctaVariants({ variant: "primary", className: "mt-6" })}
          >
            {t("labels.talkToAssistant")}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
