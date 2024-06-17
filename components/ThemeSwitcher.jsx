"use client";

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { CiLight, CiDark } from "react-icons/ci";
import { Switch } from '@nextui-org/react';

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
            <Switch
                defaultSelected
                size='lg'
                color='primary'
                onClick={handleTheme}
                startContent={<CiLight />}
                endContent={<CiDark />}
            >
            </Switch>
        </div>
    )
}

export default ThemeSwitcher