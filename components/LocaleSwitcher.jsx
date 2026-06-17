"use client";

import { useLocale } from "next-intl";
import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";

const LocaleSwitcher = ({ compact = false }) => {
  const locale = useLocale();
  const router = useRouter();

  const handleLocale = () => {
    router.replace(locale === "es" ? "/en" : "/es");
  };

  return (
    <button
      onClick={handleLocale}
      className={`${
        compact ? "h-12 w-12 px-0" : "h-11 px-4"
      } inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] text-xs font-semibold uppercase text-white/75 transition hover:border-cyan/35 hover:text-white`}
      aria-label="Cambiar idioma"
    >
      <Languages className="h-4 w-4" />
      {!compact && <span>{locale}</span>}
    </button>
  );
};

export default LocaleSwitcher;
