import { profile } from "@/data/portfolio/profile";
import { projects } from "@/data/portfolio/projects";
import { services } from "@/data/portfolio/services";
import { skills } from "@/data/portfolio/skills";

const OUT_OF_SCOPE_RESPONSE =
  "Solo puedo ayudarte con información sobre Maicol Aristizabal, su experiencia, proyectos, habilidades y servicios profesionales.";

const allowedTerms = [
  "maicol",
  "aristizabal",
  "experiencia",
  "proyecto",
  "proyectos",
  "habilidad",
  "habilidades",
  "stack",
  "servicio",
  "servicios",
  "disponibilidad",
  "contacto",
  "cv",
  "backend",
  "frontend",
  "full stack",
  "tecnologia",
  "tecnologías",
  "tecnologia",
];

const isAllowed = (message) => {
  const normalized = message.toLowerCase();
  return allowedTerms.some((term) => normalized.includes(term));
};

export const getMaicolBotFallbackAnswer = ({ message }) => {
  const normalized = message.toLowerCase();

  if (!isAllowed(message)) {
    return {
      answer: OUT_OF_SCOPE_RESPONSE,
      allowed: false,
      source: "local_fallback",
    };
  }

  if (normalized.includes("proyecto")) {
    return {
      answer: `Maicol ha trabajado en proyectos como ${projects.map((project) => project.name).join(", ")}. Hay experiencia en dashboards, telecomunicaciones, sistemas contables, automatización, IA aplicada y backend cloud.`,
      allowed: true,
      source: "local_fallback",
    };
  }

  if (normalized.includes("backend")) {
    return {
      answer: "Sí. Maicol tiene experiencia en backend con Python, PHP, Go, Node.js, bases de datos SQL, colas, APIs, integraciones cloud y servicios para dashboards operativos.",
      allowed: true,
      source: "local_fallback",
    };
  }

  if (normalized.includes("tecnolog") || normalized.includes("stack") || normalized.includes("habilidad")) {
    return {
      answer: `Trabaja principalmente con ${skills.slice(0, 14).join(", ")} y también con IA aplicada, automatización, Asterisk, FreePBX, Issabel y CDR.`,
      allowed: true,
      source: "local_fallback",
    };
  }

  if (normalized.includes("servicio")) {
    return {
      answer: `Puede apoyar en ${services.map((service) => service.title).join(", ")}. El foco es construir soluciones útiles, escalables y conectadas con necesidades reales del negocio.`,
      allowed: true,
      source: "local_fallback",
    };
  }

  if (normalized.includes("disponible") || normalized.includes("contacto") || normalized.includes("cv")) {
    return {
      answer: `${profile.availability}. Para contacto puedes escribir a ${profile.email}; también puedes revisar la sección de experiencia para contexto profesional y CV actualizado.`,
      allowed: true,
      source: "local_fallback",
    };
  }

  return {
    answer: "Puedo contarte sobre la experiencia, proyectos, habilidades, servicios, disponibilidad y forma de trabajo de Maicol Aristizabal.",
    allowed: true,
    source: "local_fallback",
  };
};
