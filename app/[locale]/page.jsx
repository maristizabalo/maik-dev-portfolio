"use client"

import Photo from "@/components/Photo"
import Social from "@/components/Social"
import Stats from "@/components/Stats"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { FiDownload } from 'react-icons/fi'
import { motion } from "framer-motion";

const Home = () => {
  const t = useTranslations('Home')
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition:
        {
          delay: 0.3,
          duration: 0.2,
          ease: "easeIn"
        },
      }}
      className="relative h-full overflow-hidden"
      >
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-16 xl:pt-10 xl:pb-16">
          {/* text */}
          <div className="order-2 max-w-[620px] text-center xl:order-none xl:text-left">
            <span className="mb-4 inline-flex rounded-full border border-pink-100 bg-white/70 px-4 py-1 text-sm font-semibold text-mauve shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-accent-soft">
              A Chiz
            </span>
            <span className="block text-lg text-textSecLight dark:text-white/75">{t('rol')}</span>
            <h1 className="h1 mb-6 text-plum dark:text-white">
              {t('greeting')} <br /> <span className="text-accent dark:text-accent">Andrea Chizabas</span>
            </h1>
            <p className="mx-auto mb-9 max-w-[540px] text-textSecLight dark:text-white/75 xl:mx-0">
              {t('professional-profile')}
            </p>
            {/* button */}
            <div className="flex flex-col items-center gap-8 xl:flex-row">
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2 uppercase"
              >
                <span>{t('button-cv')}</span>
                <FiDownload className="text-xl" />
              </Button>
              <div className="mb-8 xl:mb-0">
                <Social
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base bg-white/60 dark:bg-white/5 hover:bg-accent dark:hover:bg-accent hover:text-white hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* photo */}
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </motion.section>
  )
}

export default Home
