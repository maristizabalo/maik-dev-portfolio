"use client";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import LocaleSwitcher from "./LocaleSwitcher";
import Logo from "./brand/Logo";

const MobileNav = () => {
  const pathname = usePathname();
  const t = useTranslations("Nav");
  const locale = useLocale();

  const links = [
    { name: "home", path: `/${locale}` },
    { name: "services", path: `/${locale}/services` },
    { name: "resume", path: `/${locale}/resume` },
    { name: "work", path: `/${locale}/work` },
    { name: "contact", path: `/${locale}/contact` },
  ];

  return (
    <Sheet>
      <SheetTrigger className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white">
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent className="flex flex-col border-white/10 bg-[#070b18]/95 text-white backdrop-blur-2xl">
        <div className="mb-12 mt-16 flex items-center justify-between">
          <Link href={`/${locale}`}>
            <Logo />
          </Link>
          <LocaleSwitcher compact />
        </div>

        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <Link
              href={link.path}
              key={link.path}
              className={`${
                link.path === pathname ? "border-cyan/35 bg-cyan/10 text-cyan" : "border-white/10 text-white/75"
              } rounded-2xl border px-5 py-4 text-lg capitalize transition-all hover:border-cyan/30 hover:text-white`}
            >
              {t(`${link.name}`)}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
