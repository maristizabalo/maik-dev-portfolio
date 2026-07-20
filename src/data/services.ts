import type { Service } from "@/types/content";

export const services: Service[] = [
  {
    id: "web-fullstack",
    title: { es: "Desarrollo Web & Full Stack", en: "Web & Full Stack Development" },
    description: {
      es: "Aplicaciones modernas, rápidas y escalables con frontend cuidado y backend sólido, de principio a fin.",
      en: "Modern, fast, scalable applications with a polished frontend and a solid backend, end to end.",
    },
    forWhom: {
      es: "Startups y empresas que necesitan construir o modernizar un producto digital.",
      en: "Startups and companies that need to build or modernize a digital product.",
    },
    stack: ["React", "Next.js", "Python", "Node.js", "Go"],
  },
  {
    id: "apis-integrations",
    title: { es: "APIs & Integraciones", en: "APIs & Integrations" },
    description: {
      es: "Conecto sistemas, diseño servicios confiables y automatizo procesos entre plataformas.",
      en: "I connect systems, design reliable services, and automate processes across platforms.",
    },
    forWhom: {
      es: "Equipos con sistemas que necesitan comunicarse o escalar sin fricción.",
      en: "Teams with systems that need to talk to each other or scale without friction.",
    },
    stack: ["REST APIs", "AWS", "GCP", "PostgreSQL", "Docker"],
  },
  {
    id: "dashboards-analytics",
    title: { es: "Dashboards & Analítica", en: "Dashboards & Analytics" },
    description: {
      es: "Transformo datos en interfaces claras para operar y decidir mejor, con métricas en tiempo real.",
      en: "I turn data into clear interfaces to operate and decide better, with real-time metrics.",
    },
    forWhom: {
      es: "Operaciones que necesitan visibilidad sobre sus datos y procesos.",
      en: "Operations teams that need visibility over their data and processes.",
    },
    stack: ["Next.js", "Svelte", "PostgreSQL", "Data Analysis"],
  },
  {
    id: "ai-automation",
    title: { es: "IA & Automatización", en: "AI & Automation" },
    description: {
      es: "Integro IA aplicada, agentes y flujos que reducen el trabajo manual y aceleran la operación.",
      en: "I integrate applied AI, agents, and workflows that reduce manual work and speed up operations.",
    },
    forWhom: {
      es: "Negocios que quieren automatizar tareas repetitivas o sumar IA a su producto.",
      en: "Businesses that want to automate repetitive tasks or add AI to their product.",
    },
    stack: ["LLM Integration", "Prompt Engineering", "OCR", "Python", "Automation"],
  },
];
