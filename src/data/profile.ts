import type { Profile } from "@/types/content";

export const profile: Profile = {
  name: "Maicol Aristizábal",
  firstName: "Maicol",
  title: "Senior Full Stack Developer · React/Next.js + Python Backend",
  role: {
    es: "Senior Full Stack Developer",
    en: "Senior Full Stack Developer",
  },
  location: {
    es: "Manizales, Caldas, Colombia",
    en: "Manizales, Caldas, Colombia",
  },
  yearsExperience: 6,
  headline: {
    es: "Diseño y construyo sistemas completos: backend, frontend, cloud e IA aplicada. De la arquitectura al despliegue en producción.",
    en: "I design and build complete systems: backend, frontend, cloud, and applied AI. From architecture to production deployment.",
  },
  bio: [
    {
      es: "Empecé desarrollando para la web y fui creciendo hacia el full stack: primero interfaces con React, luego servicios backend con Python, Node y PHP, hasta llegar a la arquitectura de sistemas y la IA aplicada.",
      en: "I started building for the web and grew into full stack: first React interfaces, then backend services with Python, Node, and PHP, all the way to systems architecture and applied AI.",
    },
    {
      es: "Hoy construyo productos completos de principio a fin: diseño la arquitectura, levanto el backend y las APIs, cuido el frontend y automatizo lo que se pueda con IA, integraciones y flujos.",
      en: "Today I build complete products end to end: I design the architecture, stand up the backend and APIs, craft the frontend, and automate what I can with AI, integrations, and workflows.",
    },
    {
      es: "Mi ventaja es esa combinación: entiendo el negocio, el dato y la interfaz al mismo tiempo, así que puedo llevar una idea desde el diagrama hasta el despliegue en producción.",
      en: "My edge is that combination: I understand the business, the data, and the interface at once, so I can take an idea from the diagram to production deployment.",
    },
  ],
  availability: {
    es: "Disponible para proyectos freelance y de largo plazo",
    en: "Available for freelance and long-term projects",
  },
  languages: [
    { name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" } },
    { name: { es: "Inglés", en: "English" }, level: { es: "Intermedio", en: "Intermediate" } },
  ],
  photo: {
    src: "/assets/perfil.png",
    alt: {
      es: "Retrato de Maicol Aristizábal",
      en: "Portrait of Maicol Aristizábal",
    },
  },
  cvUrl: "/cv/maicol-aristizabal-es.pdf",
  portfolioUrl: "https://mjaris.vercel.app",
};
