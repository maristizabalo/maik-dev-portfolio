import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Section } from "@/components/sections/Section";
import { Contact } from "@/components/sections/Contact";
import { ContactForm } from "@/components/sections/ContactForm";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <div className="pt-16">
      <Section id="contact">
        <Contact />
        <div className="mt-16 border-t border-line pt-16">
          <ContactForm />
        </div>
      </Section>
    </div>
  );
}
