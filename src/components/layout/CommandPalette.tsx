"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { MagnifyingGlass, ArrowRight } from "@phosphor-icons/react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { navItems } from "@/config/navigation";
import { profile } from "@/data/profile";
import { contact } from "@/data/contact";
import { COMMAND_PALETTE_EVENT } from "@/lib/command-palette";
import { openChat } from "@/lib/chat";
import { easeSignal } from "@/lib/easings";
import { cn } from "@/lib/utils";

type Command = { id: string; label: string; group: string; run: () => void };

export function CommandPalette() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const { setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener(COMMAND_PALETTE_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(COMMAND_PALETTE_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const commands = useMemo<Command[]>(() => {
    const other = locale === "es" ? "en" : "es";
    const nav: Command[] = navItems.map((item) => ({
      id: `nav-${item.id}`,
      group: t("command.groupNav"),
      label: t(`nav.${item.labelKey}`),
      run: () => router.push(item.href),
    }));
    const actions: Command[] = [
      {
        id: "cv",
        group: t("command.groupActions"),
        label: t("command.downloadCv"),
        run: () => window.open(profile.cvUrl, "_blank"),
      },
      {
        id: "email",
        group: t("command.groupActions"),
        label: t("command.copyEmail"),
        run: () => void navigator.clipboard?.writeText(contact.email),
      },
      {
        id: "chat",
        group: t("command.groupActions"),
        label: t("command.openChat"),
        run: () => openChat(),
      },
    ];
    const settings: Command[] = [
      {
        id: "theme",
        group: t("command.groupSettings"),
        label: t("command.toggleTheme"),
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      {
        id: "lang",
        group: t("command.groupSettings"),
        label: t("command.switchLanguage"),
        run: () => router.replace(pathname, { locale: other }),
      },
    ];
    return [...nav, ...actions, ...settings];
  }, [t, router, pathname, locale, setTheme, resolvedTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((command) => command.label.toLowerCase().includes(q));
  }, [commands, query]);

  const groups = useMemo(() => {
    const map = new Map<string, Command[]>();
    for (const command of filtered) {
      const list = map.get(command.group) ?? [];
      list.push(command);
      map.set(command.group, list);
    }
    return Array.from(map, ([group, items]) => ({ group, items }));
  }, [filtered]);

  const runActive = () => {
    const command = filtered[active];
    if (command) {
      command.run();
      close();
    }
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((value) => Math.min(value + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((value) => Math.max(value - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      runActive();
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(next) => (next ? setOpen(true) : close())}>
      <Dialog.Portal forceMount>
        <AnimatePresence>
          {open && (
            <>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-modal bg-canvas/70 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </Dialog.Overlay>
              <Dialog.Content asChild forceMount>
                <motion.div
                  className="fixed left-1/2 top-[16%] z-modal w-[min(92vw,560px)] -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-surface-1 shadow-soft-2"
                  initial={{ opacity: 0, y: -12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: easeSignal }}
                  onKeyDown={onKeyDown}
                >
                  <Dialog.Title className="sr-only">
                    {t("command.open")}
                  </Dialog.Title>
                  <div className="flex items-center gap-3 border-b border-line px-4">
                    <MagnifyingGlass size={18} className="text-faint" />
                    <input
                      autoFocus
                      value={query}
                      onChange={(event) => {
                        setQuery(event.target.value);
                        setActive(0);
                      }}
                      placeholder={t("command.placeholder")}
                      className="w-full bg-transparent py-4 text-sm text-ink outline-none placeholder:text-faint"
                    />
                  </div>
                  <div className="max-h-[50vh] overflow-y-auto p-2">
                    {filtered.length === 0 && (
                      <p className="px-3 py-6 text-center text-sm text-faint">
                        {t("command.empty")}
                      </p>
                    )}
                    {groups.map((section) => (
                      <div key={section.group} className="mb-1">
                        <p className="px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">
                          {section.group}
                        </p>
                        {section.items.map((command) => {
                          const index = filtered.indexOf(command);
                          const isActive = index === active;
                          return (
                            <button
                              key={command.id}
                              type="button"
                              onMouseEnter={() => setActive(index)}
                              onClick={() => {
                                command.run();
                                close();
                              }}
                              className={cn(
                                "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                                isActive ? "bg-signal/10 text-ink" : "text-muted",
                              )}
                            >
                              {command.label}
                              <ArrowRight
                                size={14}
                                className={isActive ? "text-signal" : "text-transparent"}
                              />
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </Dialog.Content>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
