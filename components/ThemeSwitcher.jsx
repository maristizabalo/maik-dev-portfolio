"use client";

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { CiLight, CiDark } from "react-icons/ci";

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null;
    }

    const handleTheme = () => {
        if (theme === "light") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }

    return (
        <div>
            <div className="relative flex items-center justify-center">
                <button
                    onClick={handleTheme}
                    className="relative inline-flex h-[44px] w-[50px] items-center justify-center rounded-full border border-pink-100 bg-white/80 p-3 text-plum shadow-sm transition duration-500 ease-in-out hover:border-accent dark:border-white/10 dark:bg-white/10 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                >
                    {theme === 'light' ? ( // Mostrar ícono del sol en modo light
                        <CiDark className="h-6 w-6" />
                    ) : (
                        <CiLight className="h-6 w-6" /> // Mostrar ícono de la luna en modo dark
                    )}
                </button>
            </div>
        </div>
    )
}

export default ThemeSwitcher
