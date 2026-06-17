"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

const DEDUPE_SECONDS = 30;

const VisitTracker = () => {
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    if (!pathname || typeof window === "undefined") return;

    const key = `maicol-analytics:${pathname}`;
    const now = Date.now();
    const lastTrackedAt = Number(window.sessionStorage.getItem(key) || 0);

    if (lastTrackedAt && now - lastTrackedAt < DEDUPE_SECONDS * 1000) {
      return;
    }

    window.sessionStorage.setItem(key, String(now));

    const payload = {
      path: pathname,
      locale,
      referrer: document.referrer || null,
    };

    const send = () => {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(send, { timeout: 2000 });
      return;
    }

    window.setTimeout(send, 0);
  }, [locale, pathname]);

  return null;
};

export default VisitTracker;
