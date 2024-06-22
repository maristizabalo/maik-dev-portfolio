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
        <header className="py-8 xl:py-12 dark:text-white">
            <div className="container mx-auto flex justify-between items-center">
                {/* logo */}
                <Link href="/">
                    <h1 className="text-4xl font-semibold">
                        Maicol <span className="text-accentLight dark:text-accent">.</span>
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