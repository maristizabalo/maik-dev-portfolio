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
                    className="relative inline-flex items-center justify-center rounded-full transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    style={{
                        backgroundColor: theme === 'light' ? '#fff' : '#333', // Fondo según el modo
                        color: theme === 'light' ? '#333' : '#fff', // Color del ícono
                        padding: '12px', // Ajuste el padding para que se vea bien
                        width: '50px', // Ancho del botón
                        height: '44px', // Alto del botón
                    }}
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