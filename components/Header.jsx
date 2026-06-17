"use client";

import Link from "next/link";
import { Send } from "lucide-react";
import { useLocale } from "next-intl";
import Logo from "./brand/Logo";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import LocaleSwitcher from "./LocaleSwitcher";
import GlowButton from "./ui/GlowButton";

const Header = () => {
  const locale = useLocale();

  return (
    <>
      <aside className="fixed left-4 top-4 z-40 hidden h-[calc(100vh-2rem)] w-[88px] flex-col items-center justify-between rounded-3xl border border-white/10 bg-[#070b18]/70 px-3 py-5 shadow-2xl backdrop-blur-2xl xl:flex">
        <Link href={`/${locale}`} aria-label="Ir al inicio">
          <Logo compact />
        </Link>
        <Nav />
        <LocaleSwitcher compact />
      </aside>

      <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-[#050816]/78 px-4 py-3 backdrop-blur-xl xl:left-[112px] xl:border-b-0 xl:bg-transparent">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <div className="xl:hidden">
            <Link href={`/${locale}`} aria-label="Ir al inicio">
              <Logo />
            </Link>
          </div>
          <div className="hidden xl:block" />
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <GlowButton href={`/${locale}/contact`} icon={Send}>
                Hablemos
              </GlowButton>
            </div>
            <div className="xl:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
