import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Section } from "@/components/sections/Section";
import { Stack } from "@/components/sections/Stack";

export default async function StackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <div className="pt-16">
      <Section id="stack">
        <Stack />
      </Section>
    </div>
  );
}
