import type { Locale } from "@/types/content";
import { profile } from "@/data/profile";
import { contact } from "@/data/contact";
import { stack } from "@/data/stack";

export function buildJsonLd(locale: Locale, base: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: profile.name,
        jobTitle: profile.role[locale],
        url: `${base}/${locale}`,
        image: `${base}${profile.photo.src}`,
        email: contact.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Manizales",
          addressRegion: "Caldas",
          addressCountry: "CO",
        },
        sameAs: [contact.github, contact.linkedin],
        knowsAbout: stack.slice(0, 20).map((tech) => tech.name),
      },
      {
        "@type": "WebSite",
        name: "Maicol Aristizábal",
        url: base,
        inLanguage: locale,
      },
      {
        "@type": "ProfilePage",
        url: `${base}/${locale}`,
        name: profile.name,
      },
    ],
  };
}
