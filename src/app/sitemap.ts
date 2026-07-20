import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://mjaris.vercel.app";
  const paths = [
    "",
    "/work",
    "/stack",
    "/experience",
    "/ai",
    "/architecture",
    "/services",
    "/resume",
    "/certifications",
    "/contact",
    ...projects.map((project) => `/work/${project.slug}`),
  ];

  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of paths) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: now,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((code) => [code, `${base}/${code}${path}`]),
          ),
        },
      });
    }
  }

  return entries;
}
