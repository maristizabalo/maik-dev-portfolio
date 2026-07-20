import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Section } from "@/components/sections/Section";
import { Certifications } from "@/components/sections/Certifications";

export default async function CertificationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <div className="pt-16">
      <Section id="certifications">
        <Certifications />
      </Section>
    </div>
  );
}
