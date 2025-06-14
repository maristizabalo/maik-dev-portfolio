"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";


const Nav = () => {
    const locale = useLocale()
    const pathname = usePathname();
    const t = useTranslations('Nav')
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
        <nav className="flex gap-8">
            {links.map((link, index) => {
                return (
                    <Link
                        href={link.path}
                        key={index}
                        className={`${
                            link.path === pathname && "text-accent dark:text-accent border-b-2 border-accent dark:border-accent"
                        } capitalize font-medium hover:text-accent dark:hover:text-accent transition-all`}
                    >
                        {t(`${link.name}`)}
                    </Link>
                )
            })}
        </nav>
    )
}

export default Nav