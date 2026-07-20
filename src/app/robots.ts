import type { MetadataRoute } from "next";
import { getConsolePath } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://mjaris.vercel.app";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [`/${getConsolePath()}`, "/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
