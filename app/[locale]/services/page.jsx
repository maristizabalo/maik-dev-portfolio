"use client";

import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const Services = () => {
  const t = useTranslations("Services");
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-10 xl:py-14">
      <div className="container mx-auto text-plum dark:text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.3, duration: 0.2, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8"
        >
          {[1, 2, 3, 4].map((index) => {
            return (
              <div
                key={index}
                className="group flex flex-1 flex-col justify-center gap-6 rounded-lg border border-pink-100 bg-white/75 p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl dark:border-white/10 dark:bg-white/5"
              >
                {/* top */}
                <div className="w-full flex justify-between items-center">
                  <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                    {t(`num0${index}`)}
                  </div>
                  <Link
                    href={t(`href0${index}`)}
                    className="w-[70px] h-[70px] rounded-full 
                              bg-petal dark:bg-white/10 
                              group-hover:bg-accent dark:group-hover:bg-accent 
                              transition-all duration-500 
                              flex justify-center items-center hover:-rotate-45"
                  >
                    <BsArrowDownRight className="bg-transparent text-3xl text-accent group-hover:text-white" />
                  </Link>
                </div>

                {/* title */}
                <h2
                  className="text-[42px] font-bold leading-none 
                            text-plum dark:text-white 
                            group-hover:text-accent dark:group-hover:text-accent 
                            transition-all duration-500"
                >
                  {t(`title0${index}`)}
                </h2>

                {/* description */}
                <p className="text-textSecLight dark:text-white/60">
                  {t(`description0${index}`)}
                </p>

                {/* border */}
                <div className="w-full border-b border-pink-100 dark:border-white/10"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
