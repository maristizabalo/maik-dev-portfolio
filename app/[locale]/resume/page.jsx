"use client";

import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaFigma,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaPhp,
  FaVuejs,
} from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs } from "react-icons/si";

//skills data
const skills = {
  skillList: [
    {
      icon: <FaHtml5 />,
      name: "html 5",
    },
    {
      icon: <FaCss3 />,
      name: "css 3",
    },
    {
      icon: <FaPhp />,
      name: "php",
    },
    {
      icon: <FaJs />,
      name: "Javascript",
    },
    {
      icon: <FaReact />,
      name: "react.js",
    },
    {
      icon: <FaVuejs />,
      name: "vue.js",
    },
    {
      icon: <FaPython />,
      name: "python",
    },
    {
      icon: <SiNextdotjs />,
      name: "next.js",
    },
    {
      icon: <SiTailwindcss />,
      name: "tailwind css",
    },
    {
      icon: <FaNodeJs />,
      name: "node.js",
    },
    {
      icon: <FaDocker />,
      name: "docker",
    },
  ],
};

const about = {
  title: "About me",
  description: "Esta es una breve descripcion mia",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Maicol Aristizabal",
    },
    {
      fieldName: "Phone",
      fieldValue: "(+57) 310 689 04 60",
    },
    {
      fieldName: "Experience",
      fieldValue: "5+ Years",
    },
    {
      fieldName: "Nationality",
      fieldValue: "Colombian",
    },
    {
      fieldName: "Nationality",
      fieldValue: "Colombian",
    },
    {
      fieldName: "Email",
      fieldValue: "maristizabalo95@gmail.com",
    },
    {
      fieldName: "Freelance",
      fieldValue: "Available",
    },
    {
      fieldName: "Languages",
      fieldValue: "Spanish, English",
    },
  ],
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const Resume = () => {
  const t = useTranslations("Resume");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.3, duration: 0.2, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto dark:text-white">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experience">{t("experience")}</TabsTrigger>
            <TabsTrigger value="education">{t("education")}</TabsTrigger>
            <TabsTrigger value="skills">{t("skills")}</TabsTrigger>
            <TabsTrigger value="about">{t("about-me")}</TabsTrigger>
          </TabsList>

          {/* content */}
          <div className="min-h-[70vh] w-full">
            {/* experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{t("experience-title")}</h3>
                <p className="max-w-[600px] text-gray-800 dark:text-white/60 mx-auto xl:mx-0">
                  {t("experience-description")}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {[1, 2, 3].map((index) => (
                      <li
                        key={index}
                        className="bg-primary dark:bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                      >
                        <span className="text-accent dark:text-accent">
                          {t(`experienceTime0${index}`)}
                        </span>
                        <h3 className="text-white text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                          {t(`experiencePosition0${index}`)}
                        </h3>
                        <div className="flex items-center gap-3">
                          {/* dot */}
                          <span className="w-[6px] h-[6px] rounded-full bg-accent dark:bg-accent"></span>
                          <p className="text-white/60">
                            {t(`experienceCompany0${index}`)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* education */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{t("education-title")}</h3>
                <p className="max-w-[600px] text-gray-800 dark:text-white/60 mx-auto xl:mx-0">
                  {t("education-description")}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {[1, 2, 3].map((index) => (
                      <li
                        key={index}
                        className="bg-primary dark:bg-[#232329] h-[250px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                      >
                        <span className="text-accent dark:text-accent">
                          {t(`educationTime0${index}`)}
                        </span>
                        <h3 className="text-white text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                          {t(`educationDegree0${index}`)}
                        </h3>
                        <div className="flex items-center gap-3">
                          {/* dot */}
                          <span className="w-[6px] h-[6px] rounded-full bg-accent dark:bg-accent"></span>
                          <p className="text-white/60">
                            {t(`educationUniversity0${index}`)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* skills */}
            <TabsContent value="skills" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{t("skills-title")}</h3>
                <p className="max-w-[600px] text-gray-800 dark:text-white/60 mx-auto xl:mx-0">
                  {t("skills-description")}
                </p>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                  {skills.skillList.map((skill, index) => {
                    return (
                      <li key={index}>
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger className="w-full h-[150px] bg-primary dark:bg-[#232329] rounded-xl flex justify-center items-center group">
                              <div className="text-6xl text-white group-hover:text-accent dark:group-hover:text-accent transition-all duration-500">
                                {skill.icon}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="capitalize">
                              <p>{skill.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>

            {/* about */}
            <TabsContent
              value="about"
              className="w-full text-center xl:text-left"
            >
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{t("about-me-title")}</h3>
                <p className="max-w-[600px] text-gray-800 dark:text-white/60 mx-auto xl:mx-0">
                  {t("about-me-description")}
                </p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                  {[1, 2, 3, 4, 5, 6, 7].map((index) => {
                    <li
                      key={index}
                      className="flex items-center justify-center xl:justify-start gap-4"
                    >
                      <span className="text-gray-800 dark:text-white/60">
                        {t(`profileTitle0${index}`)}
                      </span>
                      <span className="text-xl">
                        {t(`profileValue0${index}`)}
                      </span>
                    </li>;
                  })}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
