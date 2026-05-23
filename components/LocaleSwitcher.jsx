"use client"
import { useLocale } from 'next-intl'
import Image from 'next/image'
import eeuu from '../public/assets/eeuu.png'
import espana from '../public/assets/espana.png'
import { useRouter } from 'next/navigation'


const LocaleSwitcher = () => {
    const locale = useLocale();
    const router = useRouter();
    
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
                    className="relative inline-flex h-[44px] w-[50px] items-center justify-center rounded-full border border-pink-100 bg-white/80 p-3 text-plum shadow-sm transition duration-500 ease-in-out hover:border-accent dark:border-white/10 dark:bg-white/10 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
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
