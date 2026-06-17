import "@/app/[locale]/globals.css";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export default function PrivateVisitsLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${jetbrainsMono.variable} bg-primary text-white`}>
        <div className="soft-grid-bg pointer-events-none fixed inset-0 opacity-50" />
        <div className="noise-overlay pointer-events-none fixed inset-0" />
        {children}
      </body>
    </html>
  );
}
