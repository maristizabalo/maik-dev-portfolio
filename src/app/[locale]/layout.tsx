import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { Space_Grotesk, Geist, JetBrains_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { LoadingScreen } from "@/components/experience/LoadingScreen";
import { ChatMount } from "@/components/chat/ChatMount";
import { Analytics } from "@/components/analytics/Analytics";
import { cn } from "@/lib/utils";
import { buildJsonLd } from "@/lib/seo/json-ld";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://mjaris.vercel.app";
  return {
    title: { default: t("title"), template: "%s — Maicol Aristizábal" },
    description: t("description"),
    alternates: {
      canonical: `${base}/${locale}`,
      languages: {
        es: `${base}/es`,
        en: `${base}/en`,
        "x-default": `${base}/es`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${base}/${locale}`,
      siteName: "Maicol Aristizábal",
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://mjaris.vercel.app";
  const jsonLd = buildJsonLd(locale, base);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(display.variable, sans.variable, mono.variable)}
    >
      <body className="min-h-[100dvh] bg-canvas text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <SmoothScroll>
              <LoadingScreen />
              <ScrollProgress />
              <Nav />
              <main id="main">{children}</main>
              <Footer />
              <CommandPalette />
              <ChatMount />
              <Analytics />
            </SmoothScroll>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
