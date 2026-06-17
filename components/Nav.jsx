"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BriefcaseBusiness, Contact, Grid2X2, Home, Layers3, UserRound } from "lucide-react";

const Nav = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Nav");
  const links = [
    { name: "home", path: `/${locale}`, icon: Home },
    { name: "work", path: `/${locale}/work`, icon: BriefcaseBusiness },
    { name: "services", path: `/${locale}/services`, icon: Layers3 },
    { name: "stack", path: `/${locale}#stack`, icon: Grid2X2 },
    { name: "resume", path: `/${locale}/resume`, icon: UserRound },
    { name: "contact", path: `/${locale}/contact`, icon: Contact },
  ];

  return (
    <nav className="flex flex-col gap-3">
      {links.map((link) => {
        const Icon = link.icon;
        const active = link.path === pathname || (link.path.includes("#") && pathname === `/${locale}`);
        const label = link.name === "stack" ? "Stack" : t(`${link.name}`);

        return (
          <Link
            href={link.path}
            key={link.path}
            title={label}
            aria-label={label}
            className="group relative grid h-14 w-14 place-items-center rounded-2xl text-white/55 transition-colors hover:text-white"
          >
            {active && (
              <motion.span
                layoutId="active-sidebar-item"
                className="absolute inset-0 rounded-2xl border border-cyan/25 bg-cyan/10 shadow-glow"
              />
            )}
            <span className="absolute -right-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-violet opacity-0 shadow-violetGlow transition-opacity group-hover:opacity-100" />
            <Icon className="relative h-5 w-5" />
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
