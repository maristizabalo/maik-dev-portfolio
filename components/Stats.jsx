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
        <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
            <div className="container mx-auto">
                <div className="flex flex-wrap gap-6 max-w-[80vh] mx-auto xl:max-w-none">
                    {stats.map((item, index) => {
                        return (
                            <div 
                            key={index}
                            className="flex-1 flex gap-4 items-center justify-center xl:justify-start"
                            >
                                <CountUp
                                    end={item.num}
                                    duration={5}
                                    delay={2}
                                    className="text-4xl xl:text-6xl font-extrabold dark:text-white"
                                />
                                <p 
                                className={`${item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"} leading-snug dark:text-white/80`}
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