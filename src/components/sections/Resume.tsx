"use client";

import { useLocale, useTranslations } from "next-intl";
import { Printer, DownloadSimple } from "@phosphor-icons/react";
import { ctaVariants } from "@/components/ui/cta";
import { profile } from "@/data/profile";
import { contact } from "@/data/contact";
import { experience } from "@/data/experience";
import { certifications, totalCertifiedHours } from "@/data/certifications";
import { stack, techCategories } from "@/data/stack";

export function Resume() {
  const t = useTranslations();
  const locale = useLocale() as "es" | "en";
  const topCerts = certifications.filter(
    (cert) => cert.hours !== null && cert.hours >= 40,
  );

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <div className="print-hide mb-10 flex flex-wrap gap-3">
        <a href={profile.cvUrl} download className={ctaVariants({ variant: "primary" })}>
          <DownloadSimple size={16} />
          {t("contactActions.downloadCv")}
        </a>
        <button
          type="button"
          onClick={() => window.print()}
          className={ctaVariants({ variant: "outline" })}
        >
          <Printer size={16} />
          {locale === "es" ? "Imprimir" : "Print"}
        </button>
      </div>

      <header className="border-b border-line pb-6">
        <h1 className="font-display text-4xl font-semibold tracking-tight">
          {profile.name}
        </h1>
        <p className="mt-1 text-lg text-muted">{profile.title}</p>
        <p className="mt-3 font-mono text-xs text-muted">
          {contact.email} · {contact.phoneDisplay} · {profile.location[locale]}
        </p>
        <p className="font-mono text-xs text-muted">
          {contact.github} · {contact.linkedin}
        </p>
      </header>

      <section className="mt-8">
        <p className="leading-relaxed text-muted">{profile.headline[locale]}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-signal">
          {t("nav.experience")}
        </h2>
        <div className="mt-4 space-y-6">
          {experience.map((item) => (
            <div key={item.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold text-ink">
                  {item.company} — {item.role[locale]}
                </h3>
                <span className="shrink-0 font-mono text-xs text-muted">
                  {item.period[locale]}
                </span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {item.summary[locale]}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-signal">
          {t("nav.stack")}
        </h2>
        <div className="mt-4 space-y-2">
          {techCategories.map((category) => {
            const items = stack.filter((tech) => tech.category === category.id);
            if (items.length === 0) return null;
            return (
              <p key={category.id} className="text-sm text-muted">
                <span className="font-medium text-ink">
                  {category.label[locale]}:{" "}
                </span>
                {items.map((tech) => tech.name).join(", ")}
              </p>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-signal">
          {t("nav.certifications")} · {totalCertifiedHours}h
        </h2>
        <div className="mt-4 space-y-2">
          {topCerts.map((cert) => (
            <div
              key={cert.id}
              className="flex flex-wrap items-baseline justify-between gap-x-4"
            >
              <span className="text-sm text-ink">{cert.title[locale]}</span>
              <span className="shrink-0 font-mono text-xs text-muted">
                {cert.issuer} · {cert.year}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-signal">
          {locale === "es" ? "Idiomas" : "Languages"}
        </h2>
        <p className="mt-3 text-sm text-muted">
          {profile.languages
            .map((language) => `${language.name[locale]} (${language.level[locale]})`)
            .join(" · ")}
        </p>
      </section>
    </div>
  );
}
