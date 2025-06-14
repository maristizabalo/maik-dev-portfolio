"use client"
import { useLocale } from 'next-intl'
import Image from 'next/image'
import eeuu from '../public/assets/eeuu.png'
import espana from '../public/assets/espana.png'
import { useTheme } from 'next-themes'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'


const LocaleSwitcher = () => {
    const locale = useLocale();
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    
    const handleLocale = () => {
        if(locale==="es"){
                router.replace('/en')
        }else{
                router.replace('/es')
        }
    }

    return (
        <div>
            <div className="relative flex items-center justify-center">
                <button
                    onClick={handleLocale}
                    className="relative inline-flex items-center justify-center rounded-full transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    style={{
                        backgroundColor: theme === 'light' ? '#fff' : '#333', // Fondo según el modo
                        color: theme === 'light' ? '#333' : '#fff', // Color del ícono
                        padding: '12px', // Ajuste el padding para que se vea bien
                        width: '50px', // Ancho del botón
                        height: '44px', // Alto del botón
                    }}
                >
                    {locale === 'es' ? (
                        <Image src={espana} alt="España" width={44} height={44} />
                    ) : (
                        <Image src={eeuu} alt="Estados Unidos" width={44} height={44} />
                    )}
                </button>
            </div>
        </div>
    )
}

export default LocaleSwitcher