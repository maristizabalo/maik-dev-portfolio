import Link from "next/link";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

//Components
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import ThemeSwitcher from "./ThemeSwitcher";
import LocaleSwitcher from "./LocaleSwitcher";

const Header = () => {
    const t = useTranslations('Nav')

    return (
        <header className="py-5 xl:py-6 text-plum dark:text-white">
            <div className="container mx-auto flex justify-between items-center">
                {/* logo */}
                <Link href="/">
                    <h1 className="font-display text-4xl font-bold">
                        A Chiz <span className="text-accent dark:text-accent">.</span>
                    </h1>
                </Link>

                {/* desktop nav & hire me button*/}
                <div className="hidden xl:flex items-center gap-8">
                    <Nav />
                    <Link href="/contact">
                        <Button >{t('hire-me')}</Button>
                    </Link>
                    <ThemeSwitcher />
                    <LocaleSwitcher />
                </div>

                {/* mobile nav */}
                <div className="xl:hidden">
                    <MobileNav />
                </div>

            </div>
        </header>
    );
}

export default Header
