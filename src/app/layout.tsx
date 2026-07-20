import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://mjaris.vercel.app"),
  title: {
    default: "Maicol Aristizábal — Senior Full Stack Developer",
    template: "%s — Maicol Aristizábal",
  },
  description:
    "Ingeniero Full Stack con más de 6 años construyendo backend, frontend e integraciones con IA.",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F6F8" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0E14" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
