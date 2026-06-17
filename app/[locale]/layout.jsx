import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
// components
import Header from "@/components/Header";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import Providers from "@/components/Providers";
import VisitTracker from "@/components/analytics/VisitTracker";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: '--font-jetbrainsMono'
});

export const metadata = {
  title: "Maicol Aristizabal | Full Stack Developer",
  description: "Desarrollador Full Stack especializado en plataformas web, dashboards, APIs, automatizacion e integraciones con IA.",
  icons: {
    icon: '/maletin.png', // ubicado en la carpeta /public
  },
};

export default function RootLayout({ children }) {
  const locale = useLocale();
  const messages = useMessages();
  return (
    <html lang={locale}>
      <body className={`${jetbrainsMono.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <Providers
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="relative min-h-screen px-4 pb-10 pt-24 xl:pl-[132px] xl:pr-6 xl:pt-6">
              <div className="soft-grid-bg pointer-events-none fixed inset-0 opacity-50" />
              <div className="noise-overlay pointer-events-none fixed inset-0" />
              {children}
            </main>
            <VisitTracker />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
