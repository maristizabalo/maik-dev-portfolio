"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label={t("theme.toggle")}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "rounded-full border border-line px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-muted transition-colors hover:text-ink",
        className,
      )}
    >
      <span className="dark:hidden">{t("theme.dark")}</span>
      <span className="hidden dark:inline">{t("theme.light")}</span>
    </button>
  );
}
