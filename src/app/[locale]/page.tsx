import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Hero } from "@/components/sections/hero/Hero";
import { Section } from "@/components/sections/Section";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Stack } from "@/components/sections/Stack";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Architecture } from "@/components/sections/Architecture";
import { AiSection } from "@/components/sections/AiSection";
import { Certifications } from "@/components/sections/Certifications";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Section id="stats" className="py-16 md:py-20">
        <Stats />
      </Section>
      <Section id="about">
        <About />
      </Section>
      <Section id="stack">
        <Stack />
      </Section>
      <Section id="experience">
        <Experience />
      </Section>
      <Section id="projects">
        <Projects />
      </Section>
      <Section id="architecture">
        <Architecture />
      </Section>
      <Section id="ai">
        <AiSection />
      </Section>
      <Section id="certifications">
        <Certifications />
      </Section>
      <Section id="services">
        <Services />
      </Section>
      <Section id="contact">
        <Contact />
      </Section>
    </>
  );
}
