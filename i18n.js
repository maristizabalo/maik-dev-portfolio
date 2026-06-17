import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales = ["es", "en"];
export const defaultLocale = "es";

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = locales.includes(requestedLocale) ? requestedLocale : defaultLocale;

  if (!locales.includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
