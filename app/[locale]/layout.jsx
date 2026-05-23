import { Nunito, Playfair_Display } from "next/font/google";
import "./globals.css";
// components
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import StarsCanvas from "@/components/StarBackground";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import Providers from "@/components/Providers";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-nunito",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
});

export const metadata = {
  title: "A Chiz | Andrea Chizabas",
  description: "Portfolio de Andrea Chizabas",
  icons: {
    icon: '/maletin.png', // ubicado en la carpeta /public
  },
};

export default function RootLayout({ children }) {
  const locale = useLocale();
  const messages = useMessages();
  return (
    <html lang={locale}>
      <body className={`${nunito.variable} ${playfair.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <Providers
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
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
