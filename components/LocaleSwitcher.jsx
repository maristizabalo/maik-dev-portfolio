"use client";

import { useState, useEffect, useTransition } from 'react';
// import { CiLight, CiDark } from "react-icons/ci";
import { Switch } from '@nextui-org/react';
import { useLocale } from 'next-intl';

const LocaleSwitcher = () => {
    const locale = useLocale()
    const [startTransition] = useTransition();
    const handleLanguage = () => {
        if (locale === "en") {
            startTransition(() => {
                
            })
        } else if(locale === "es"){
            setTheme("light")
        }
    }

    return (
        <div>
            <Switch
                defaultSelected
                size='lg'
                color='primary'
                onClick={handleLanguage}
                startContent={<CiLight />}
                endContent={<CiDark />}
            >
            </Switch>
        </div>
    )
}

export default LocaleSwitcher