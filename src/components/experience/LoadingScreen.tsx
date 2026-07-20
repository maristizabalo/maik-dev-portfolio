"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { profile } from "@/data/profile";
import { easeSignal } from "@/lib/easings";

const STORAGE_KEY = "intro-seen";

export function LoadingScreen() {
  const t = useTranslations();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* storage may be blocked */
    }
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* storage may be blocked */
    }
    const timer = window.setTimeout(dismiss, seen || reduce ? 0 : 1500);
    const onKey = () => dismiss();
    window.addEventListener("keydown", onKey, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [reduce, dismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-toast grid cursor-pointer place-items-center bg-canvas"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: easeSignal }}
          onClick={dismiss}
        >
          <div className="flex flex-col items-center gap-5" aria-live="polite">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-signal">
              {t("loading.status")}
            </span>
            <span className="font-display text-2xl font-semibold text-ink">
              {profile.name}
            </span>
            {!reduce && (
              <motion.span
                className="block h-px w-40 origin-left bg-signal"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
