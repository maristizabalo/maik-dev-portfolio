"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={cn("flex items-center gap-1 font-mono text-[0.7rem] uppercase", className)}>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          aria-current={loc === locale ? "true" : undefined}
          onClick={() => router.replace(pathname, { locale: loc })}
          className={cn(
            "rounded px-1.5 py-1 tracking-[0.15em] transition-colors",
            loc === locale ? "text-signal" : "text-muted hover:text-ink",
          )}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
