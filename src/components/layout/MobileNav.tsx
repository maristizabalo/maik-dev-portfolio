"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/config/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { easeSignal } from "@/lib/easings";

export function MobileNav() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={t("nav.menu")}
        onClick={() => setOpen(true)}
        className="inline-flex rounded-full border border-line p-2 text-ink lg:hidden"
      >
        <List size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-modal flex flex-col bg-canvas lg:hidden"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-5 py-5">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                Command Center
              </span>
              <button
                type="button"
                aria-label={t("nav.close")}
                onClick={() => setOpen(false)}
                className="rounded-full border border-line p-2 text-ink"
              >
                <X size={18} />
              </button>
            </div>

            <nav
              className="flex flex-1 flex-col justify-center gap-2 px-6"
              aria-label="Mobile"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.05 + index * 0.05,
                    duration: 0.5,
                    ease: easeSignal,
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block font-display text-3xl font-semibold text-ink transition-colors hover:text-signal"
                  >
                    {t(`nav.${item.labelKey}`)}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center justify-between px-6 py-8">
              <LocaleSwitcher />
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
