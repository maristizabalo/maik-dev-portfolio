"use client";

import { useTranslations } from "next-intl";
import CountUp from "react-countup";


const Stats = () => {
    const t = useTranslations('Stats')

    const stats = [
        {
            num: 6,
            text: (t('years-experience'))
        },
        {
            num: 7,
            text: (t('projects-completed'))
        },
        {
            num: 5,
            text: (t('technologies-mastered'))
        },
        {
            num: 584,
            text: (t('code-commits'))
        }
    ]

    return (
        <section className="pt-4 pb-12 xl:pt-0 xl:pb-16">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6 max-w-[900px] mx-auto xl:max-w-none">
                    {stats.map((item, index) => {
                        return (
                            <div 
                            key={index}
                            className="flex items-center justify-center gap-4 rounded-lg border border-pink-100 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
                            >
                                <CountUp
                                    end={item.num}
                                    duration={5}
                                    delay={2}
                                    className="font-display text-4xl xl:text-5xl font-extrabold text-accent"
                                />
                                <p 
                                className={`${item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"} leading-snug text-textSecLight dark:text-white/70`}
                                >
                                    {item.text}
                                    </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Stats
