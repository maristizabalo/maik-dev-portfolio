import type { Locale, ProjectStatus } from "@/types/content";
import { profile } from "@/data/profile";
import { contact } from "@/data/contact";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { stack } from "@/data/stack";
import { certifications, totalCertifiedHours } from "@/data/certifications";
import { services } from "@/data/services";
import { softSkills } from "./soft-skills";
import { faq } from "./faq";

const statusText: Record<ProjectStatus, Record<Locale, string>> = {
  public: { es: "público", en: "public" },
  private: { es: "privado", en: "private" },
  "in-progress": { es: "en desarrollo", en: "in progress" },
};

export function buildKnowledgeDocument(locale: Locale): string {
  const es = locale === "es";
  const lines: string[] = [];

  lines.push(`# ${profile.name} — ${profile.title}`);
  lines.push(
    `${profile.location[locale]}. ${profile.availability[locale]}. ${profile.yearsExperience}+ ${es ? "años de experiencia" : "years of experience"}.`,
  );
  lines.push(
    `${es ? "Contacto" : "Contact"}: ${contact.email}, WhatsApp ${contact.phoneDisplay}, ${contact.github}, ${contact.linkedin}.`,
  );
  lines.push(
    `${es ? "Idiomas" : "Languages"}: ${profile.languages
      .map((language) => `${language.name[locale]} (${language.level[locale]})`)
      .join(", ")}.`,
  );

  lines.push(`\n## ${es ? "Perfil" : "Profile"}`);
  lines.push(profile.bio.map((paragraph) => paragraph[locale]).join(" "));

  lines.push(`\n## ${es ? "Experiencia" : "Experience"}`);
  for (const item of experience) {
    lines.push(
      `- ${item.company} (${item.period[locale]}), ${item.role[locale]}: ${item.summary[locale]} ${item.highlights
        .map((highlight) => highlight[locale])
        .join(" ")} [${item.stack.join(", ")}]`,
    );
  }

  lines.push(`\n## ${es ? "Proyectos" : "Projects"}`);
  for (const project of projects) {
    lines.push(
      `- ${project.name} (${project.category[locale]}, ${statusText[project.status][locale]}): ${project.problem[locale]} ${project.solution[locale]} ${project.impact[locale]} [${project.stack.join(", ")}]`,
    );
  }

  lines.push(`\n## ${es ? "Stack (nivel honesto)" : "Stack (honest level)"}`);
  for (const tech of stack) {
    lines.push(
      `- ${tech.name}: ${tech.level}, ${tech.years} ${es ? "años" : "yrs"}, ${tech.contexts.join(", ")}`,
    );
  }

  lines.push(`\n## ${es ? "Formación" : "Training"} (${totalCertifiedHours}h)`);
  for (const cert of certifications) {
    lines.push(
      `- ${cert.title[locale]}, ${cert.issuer} (${cert.year})${cert.hours ? `, ${cert.hours}h` : ""}`,
    );
  }

  lines.push(`\n## ${es ? "Servicios" : "Services"}`);
  for (const service of services) {
    lines.push(`- ${service.title[locale]}: ${service.description[locale]}`);
  }

  lines.push(`\n## Soft skills`);
  lines.push(softSkills.map((skill) => skill.label[locale]).join(", ") + ".");

  lines.push(`\n## FAQ`);
  for (const entry of faq) {
    lines.push(`Q: ${entry.question[locale]}\nA: ${entry.answer[locale]}`);
  }

  return lines.join("\n");
}
