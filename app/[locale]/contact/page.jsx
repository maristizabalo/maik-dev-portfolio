"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "(+57) 310 689 04 60",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "maristizabalo95@gmail.com",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Address",
    description: "Bogotá, Colombia",
  },
];

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const Contact = () => {
  const t = useTranslations("Contact");

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: 0.3,
          duration: 0.2,
          ease: "easeIn",
        },
      }}
      className="py-6"
    >
      <div className="dark:text-white container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px] ">
          {/* form */}
          <div className="xl:w-[54%] order-2 xl:order-none">
            <form className="flex flex-col gap-6 p-10 bg-primary dark:bg-[#27272c] rounded-xl">
              <h3 className="text-4xl text-accent">{t('title')}</h3>
              <p className="text-white dark:text-white/60">
                {t('description')}
              </p>
              {/* input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input type="firstname" placeholder={t('form-first-name')}/>
                <Input type="lastname" placeholder={t('form-last-name')} />
                <Input type="email" placeholder={t('form-email')} />
                <Input type="phone" placeholder={t('form-number')} />
              </div>

              {/* select */}
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('form-select-service')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{t('form-select-service')}</SelectLabel>
                    <SelectItem value="est">{t('form-service-web-development')}</SelectItem>
                    <SelectItem value="cst">{t('form-service-ml-ai')}</SelectItem>
                    <SelectItem value="mst">{t('form-service-data-analysis')}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* textarea */}
              <Textarea
                className="h-[200px]"
                placeholder={t('form-message')}
              />

              {/* btn */}
              <Button size="md" className="max-w-40">
                {t('form-submit')}
              </Button>
            </form>
          </div>

          {/* info */}
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => {
                return (
                  <li key={index} className="flex items-center gap-6">
                    <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-primary dark:bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                      <div className="text-[28px]">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 dark:text-white/60">
                        {item.title}
                      </p>
                      <h3 className="text-xl">{item.description}</h3>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
