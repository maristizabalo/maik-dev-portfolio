import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
// components
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import StarsCanvas from "@/components/StarBackground";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import Providers from "@/components/Providers";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: '--font-jetbrainsMono'
});

export const metadata = {
  title: "Mj Aristizabal",
  description: "My portfolio",
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
            {/* <StairTransition /> */}
            {/* <StarsCanvas /> */}
            {/* <PageTransition> */}
              {children}
            {/* </PageTransition> */}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
