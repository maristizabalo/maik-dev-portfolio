import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { profile } from "@/data/profile";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();
  const roles = t.raw("roles") as string[];

  return (
    <main className="relative min-h-[100dvh] overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-12%] h-[55vh] w-[80vw] -translate-x-1/2 rounded-full bg-signal/10 blur-[130px]" />
      </div>

      <header className="mx-auto flex max-w-content items-center justify-between px-5 py-6 md:px-8">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Maicol <span className="text-signal">·</span> Command Center
        </span>
        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </header>

      <section className="mx-auto flex max-w-content flex-col justify-center px-5 pb-24 pt-14 md:px-8 md:pt-20">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface-1/60 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
          </span>
          {t("hero.availability")}
        </span>

        <h1 className="mt-8 max-w-4xl text-balance font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
          {profile.name}
        </h1>

        <p className="mt-5 font-mono text-sm uppercase tracking-[0.18em] text-signal md:text-base">
          {roles[0]}
        </p>

        <p className="mt-6 max-w-prose text-pretty text-base leading-relaxed text-muted md:text-lg">
          {t("hero.valueProp")}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/work"
            className="rounded-full bg-signal px-6 py-3 text-sm font-medium text-on-signal transition-transform duration-200 ease-signal hover:-translate-y-0.5"
          >
            {t("hero.ctaProjects")}
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-signal hover:text-signal"
          >
            {t("hero.ctaContact")}
          </Link>
          <a
            href={profile.cvUrl}
            className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-signal hover:text-signal"
          >
            {t("hero.ctaCv")}
          </a>
        </div>

        <p className="mt-16 font-mono text-xs uppercase tracking-[0.2em] text-faint">
          {t("hero.scrollHint")}
        </p>
      </section>
    </main>
  );
}
