"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  EnvelopeSimple,
  WhatsappLogo,
  LinkedinLogo,
  GithubLogo,
  DownloadSimple,
  Copy,
  Check,
} from "@phosphor-icons/react";
import { SectionHeader } from "./SectionHeader";
import { ctaVariants } from "@/components/ui/cta";
import { contact } from "@/data/contact";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function Contact() {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(t("contactActions.emailSubject"))}`;
  const whatsapp = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(t("contactActions.whatsappMessage"))}`;

  const channels = [
    { label: t("contactActions.email"), value: contact.email, href: mailto, Icon: EnvelopeSimple, external: false },
    { label: t("contactActions.whatsapp"), value: contact.phoneDisplay, href: whatsapp, Icon: WhatsappLogo, external: true },
    { label: t("contactActions.linkedin"), value: "/in/maicol-aristizabal", href: contact.linkedin, Icon: LinkedinLogo, external: true },
    { label: t("contactActions.github"), value: "@maristizabalo", href: contact.github, Icon: GithubLogo, external: true },
  ];

  return (
    <>
      <SectionHeader
        kicker={t("sections.contact.kicker")}
        title={t("sections.contact.title")}
        description={t("contactActions.intro")}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {channels.map(({ label, value, href, Icon, external }) => (
          <a
            key={label}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex items-center gap-4 rounded-2xl border border-line bg-surface-1 p-5 transition-colors hover:border-signal/40"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-2 text-signal transition-colors group-hover:bg-signal/10">
              <Icon size={22} weight="duotone" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-ink">{label}</span>
              <span className="block truncate font-mono text-xs text-muted">
                {value}
              </span>
            </span>
          </a>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href={profile.cvUrl} download className={ctaVariants({ variant: "primary" })}>
          <DownloadSimple size={16} />
          {t("contactActions.downloadCv")}
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className={cn(ctaVariants({ variant: "outline" }), copied && "border-signal text-signal")}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? t("common.copied") : t("contactActions.copyEmail")}
        </button>
      </div>
    </>
  );
}
