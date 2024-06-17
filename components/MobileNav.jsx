"use client";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci"
import { useLocale, useTranslations } from "next-intl";
import ThemeSwitcher from "./ThemeSwitcher";


const MobileNav = () => {
  const pathname = usePathname();
  const t = useTranslations('Nav');
  const locale = useLocale();

  const links = [
    {
        name: "home",
        path: `/${locale}`,
    },
    {
        name: "services",
        path: `/${locale}/services`,
    },
    {
        name: "resume",
        path: `/${locale}/resume`,
    },
    {
        name: "work",
        path: `/${locale}/work`,
    },
    {
        name: "contact",
        path: `/${locale}/contact`,
    },
]

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        {/* logo */}
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href="/">
            <h1 className="text-4xl font-semibold">
              Mj
              <span className="text-accent">.</span>
            </h1>
          </Link>
          <ThemeSwitcher />
        </div>

        {/* nav */}
        <nav className="flex flex-col justify-center items-center gap-8">
          {links.map((link, index) => {
            return <Link
              href={link.path}
              key={index}
              className={`${link.path === pathname &&
                "text-accent border-b-2 border-accent"
                } text-xl capitalize hover:text-accent transition-all`}>
              {t(`${link.name}`)}
            </Link>
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav