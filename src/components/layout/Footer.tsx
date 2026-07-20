"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { footerNav } from "@/config/navigation";
import { profile } from "@/data/profile";
import { contact } from "@/data/contact";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale() as "es" | "en";
  const year = new Date().getFullYear();

  const socials = [
    { label: "GitHub", href: contact.github, Icon: GithubLogo, external: true },
    { label: "LinkedIn", href: contact.linkedin, Icon: LinkedinLogo, external: true },
    { label: "Email", href: `mailto:${contact.email}`, Icon: EnvelopeSimple, external: false },
    {
      label: "WhatsApp",
      href: `https://wa.me/${contact.whatsapp}`,
      Icon: WhatsappLogo,
      external: true,
    },
  ];

  return (
    <footer className="relative border-t border-line bg-surface-1/40">
      <div className="mx-auto max-w-content px-5 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-display text-xl font-semibold tracking-tight"
            >
              {profile.name}
            </button>
            <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-muted">
              {t("footer.tagline")}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted">
              <span className="h-2 w-2 rounded-full bg-live" />
              {t("footer.availability")}
            </span>
          </div>

          <nav aria-label={t("footer.navTitle")}>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-faint">
              {t("footer.navTitle")}
            </p>
            <ul className="space-y-2.5">
              {footerNav.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-signal"
                  >
                    {t(`nav.${item.labelKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-faint">
              {t("footer.socialTitle")}
            </p>
            <ul className="space-y-2.5">
              {socials.map(({ label, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-signal"
                  >
                    <Icon size={18} weight="duotone" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 font-mono text-xs text-faint sm:flex-row sm:items-center">
          <span>
            © {year} {profile.name}. {t("footer.rights")}
          </span>
          <span className="uppercase tracking-[0.16em]">
            Command Center · {profile.location[locale].split(",")[0]}
          </span>
        </div>
      </div>
    </footer>
  );
}
