import type { Locale } from "@/types/content";
import { contact } from "@/data/contact";
import { faq } from "./faq";

export function localFallbackAnswer(query: string, locale: Locale): string {
  const normalized = query.toLowerCase();
  let best: { score: number; answer: string } | null = null;

  for (const entry of faq) {
    const score = entry.keywords.reduce(
      (total, keyword) => total + (normalized.includes(keyword) ? 1 : 0),
      0,
    );
    if (score > 0 && (!best || score > best.score)) {
      best = { score, answer: entry.answer[locale] };
    }
  }

  if (best) return best.answer;

  return locale === "es"
    ? `Puedo contarte sobre la experiencia, proyectos, stack e IA de Maicol. ¿Qué te gustaría saber? También puedes escribirle a ${contact.email}.`
    : `I can tell you about Maicol's experience, projects, stack, and AI work. What would you like to know? You can also reach him at ${contact.email}.`;
}
