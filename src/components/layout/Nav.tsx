"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useTranslations } from "next-intl";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/config/navigation";
import { scrollToTop } from "@/lib/lenis";
import { openCommandPalette } from "@/lib/command-palette";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

export function Nav() {
  const t = useTranslations();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  return (
    <header className="fixed inset-x-0 top-0 z-nav px-4 py-3 md:px-6">
      <div
        className={cn(
          "mx-auto flex max-w-content items-center justify-between gap-4 rounded-full px-4 transition-all duration-300 ease-signal md:px-5",
          scrolled
            ? "border border-line bg-surface-1/80 py-2 shadow-soft-1 backdrop-blur-xl"
            : "border border-transparent py-2.5",
        )}
      >
        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-ink"
        >
          <span className="h-2 w-2 rounded-full bg-signal" />
          Maicol <span className="text-faint">·</span>
          <span className="hidden sm:inline">Command Center</span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-ink"
            >
              {t(`nav.${item.labelKey}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label={t("command.open")}
            className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:text-ink md:inline-flex"
          >
            <MagnifyingGlass size={14} />
            <kbd className="rounded bg-surface-2 px-1.5 py-0.5 text-[0.65rem]">
              ⌘K
            </kbd>
          </button>
          <LocaleSwitcher className="hidden sm:flex" />
          <ThemeToggle className="hidden sm:inline-flex" />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
