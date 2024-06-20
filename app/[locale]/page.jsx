import Photo from "@/components/Photo"
import Social from "@/components/Social"
import Stats from "@/components/Stats"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { FiDownload } from 'react-icons/fi'

const Home = () => {
  const t = useTranslations('Home')
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">{t('rol')}</span>
            <h1 className="h1 mb-6 dark:text-white">
              {t('greeting')} <br /> <span className="text-accentLight dark:text-accent">Maicol Aristizabal</span>
            </h1>
            <p className="max-w-[500px] mb-9 dark:text-white/80">
              {t('professional-profile')}
            </p>
            {/* button */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button
                variant="outline"
                size="lg"
                className="uppercase flex items-center gap-2"
              >
                <span>{t('button-cv')}</span>
                <FiDownload className="text-xl" />
              </Button>
              <div className="mb-8 xl:mb-0">
                <Social
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accentLight dark:border-accent rounded-full flex justify-center items-center text-accentLight dark:text-accent text-base hover:bg-accentLight dark:hover:bg-accent hover:text-white dark:hover:text-primary hover:transition-all duration-500"
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
    </section>
  )
}

export default Home