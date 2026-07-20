import type { ExperienceItem } from "@/types/content";

export const experience: ExperienceItem[] = [
  {
    id: "lemon-start",
    company: "Lemon Start",
    role: { es: "Senior Full Stack Developer", en: "Senior Full Stack Developer" },
    period: { es: "Actualidad", en: "Present" },
    location: { es: "Remoto", en: "Remote" },
    arc: "architecture",
    summary: {
      es: "Construcción de un sistema desde cero con Go en el backend y Svelte en el frontend, participando en toda la cadena hasta producción.",
      en: "Building a system from scratch with Go on the backend and Svelte on the frontend, owning the full chain to production.",
    },
    highlights: [
      {
        es: "Diseño de arquitectura e implementación end-to-end del producto.",
        en: "End-to-end architecture and product implementation.",
      },
      {
        es: "Configuración de CI/CD, generación de releases y despliegues a producción.",
        en: "CI/CD setup, release generation, and production deployments.",
      },
      {
        es: "Mantenimiento y evolución de sistemas existentes con foco en estabilidad y versionamiento.",
        en: "Maintenance and evolution of existing systems focused on stability and versioning.",
      },
    ],
    stack: ["Go", "Svelte", "Docker", "Caddy", "CI/CD", "Linux", "MySQL"],
    datesConfirmed: false,
  },
  {
    id: "izipay",
    company: "Izipay",
    role: { es: "Frontend Developer (Next.js)", en: "Frontend Developer (Next.js)" },
    period: { es: "Por confirmar", en: "To be confirmed" },
    location: { es: "Remoto", en: "Remote" },
    arc: "fullstack",
    summary: {
      es: "Desarrollo de módulos frontend con Next.js para un producto digital de alta exigencia, con foco en calidad y pruebas.",
      en: "Frontend module development with Next.js for a high-demand digital product, focused on quality and testing.",
    },
    highlights: [
      {
        es: "Componentes reutilizables y mantenibles con enfoque en escalabilidad.",
        en: "Reusable, maintainable components with a scalability focus.",
      },
      {
        es: "Pruebas unitarias y mejoras de cobertura orientadas a análisis con SonarQube.",
        en: "Unit tests and coverage improvements oriented to SonarQube analysis.",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Jest", "SonarQube"],
    datesConfirmed: false,
  },
  {
    id: "bien-company",
    company: "Bien Company",
    role: { es: "Backend PHP Developer (Freelance)", en: "Backend PHP Developer (Freelance)" },
    period: { es: "Ene 2026 — May 2026", en: "Jan 2026 — May 2026" },
    location: { es: "Remoto", en: "Remote" },
    arc: "backend",
    summary: {
      es: "Backend a medida en PHP para facturación electrónica y procesos administrativos, con integraciones cloud.",
      en: "Custom PHP backend for electronic invoicing and administrative processes, with cloud integrations.",
    },
    highlights: [
      {
        es: "Módulos de facturación electrónica, lotes y funcionalidades administrativas.",
        en: "Electronic invoicing modules, batch processing, and administrative features.",
      },
      {
        es: "Integración con AWS SQS y AWS Lambda para procesamiento desacoplado.",
        en: "Integration with AWS SQS and AWS Lambda for decoupled processing.",
      },
      {
        es: "Notificaciones en tiempo real con GCP Firestore y administración de MySQL.",
        en: "Real-time notifications with GCP Firestore and MySQL administration.",
      },
    ],
    stack: ["PHP", "MySQL", "AWS SQS", "AWS Lambda", "GCP Firestore"],
    datesConfirmed: true,
  },
  {
    id: "dadep",
    company: "DADEP",
    role: { es: "Desarrollador Full Stack (React / Python)", en: "Full Stack Developer (React / Python)" },
    period: { es: "Feb 2022 — Dic 2025", en: "Feb 2022 — Dec 2025" },
    location: { es: "Bogotá, Colombia", en: "Bogotá, Colombia" },
    arc: "fullstack",
    summary: {
      es: "Aplicaciones web institucionales con React y Next.js, y servicios backend con Python y Node bajo buenas prácticas.",
      en: "Institutional web applications with React and Next.js, plus backend services with Python and Node under solid practices.",
    },
    highlights: [
      {
        es: "Interfaces dinámicas, reutilizables y orientadas a escalabilidad con React y Next.js.",
        en: "Dynamic, reusable, scalability-oriented interfaces with React and Next.js.",
      },
      {
        es: "Servicios backend con Python (Django, Flask) y Node (Express).",
        en: "Backend services with Python (Django, Flask) and Node (Express).",
      },
      {
        es: "Gestión e integración de datos con PostgreSQL y Oracle.",
        en: "Data management and integration with PostgreSQL and Oracle.",
      },
    ],
    stack: ["React", "Next.js", "Python", "Django", "Flask", "Node.js", "PostgreSQL", "Oracle"],
    datesConfirmed: true,
  },
  {
    id: "raddar-studios",
    company: "Raddar Studios",
    role: { es: "Ingeniero de Desarrollo (Freelance)", en: "Development Engineer (Freelance)" },
    period: { es: "Mar 2023 — Jul 2023", en: "Mar 2023 — Jul 2023" },
    location: { es: "Remoto", en: "Remote" },
    arc: "fullstack",
    summary: {
      es: "Desarrollo web y móvil con React, Angular e Ionic, e integración de sistemas mediante APIs.",
      en: "Web and mobile development with React, Angular, and Ionic, plus system integration via APIs.",
    },
    highlights: [
      {
        es: "Interfaces web con React y Angular conectadas a servicios backend.",
        en: "Web interfaces with React and Angular connected to backend services.",
      },
      {
        es: "Desarrollo e integración de APIs y apps móviles híbridas con Ionic.",
        en: "API development and integration, and hybrid mobile apps with Ionic.",
      },
    ],
    stack: ["React", "Angular", "Ionic", "PHP", "MySQL", "REST APIs"],
    datesConfirmed: true,
  },
  {
    id: "invertaxi",
    company: "INVERTAXI",
    role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
    period: { es: "Nov 2020 — Feb 2022", en: "Nov 2020 — Feb 2022" },
    location: { es: "Remoto", en: "Remote" },
    arc: "ai",
    summary: {
      es: "Plataforma de revisión vehicular con React y un modelo de clasificación en Python, más una app móvil de seguridad.",
      en: "Vehicle inspection platform with React and a Python classification model, plus a mobile safety app.",
    },
    highlights: [
      {
        es: "Web en React que redujo hasta un 70% el tiempo de revisión manual de fallos vehiculares.",
        en: "React web app that cut manual vehicle-fault review time by up to 70%.",
      },
      {
        es: "Modelo de clasificación supervisado en Python para análisis de datos.",
        en: "Supervised classification model in Python for data analysis.",
      },
      {
        es: "Automatización de informes diarios y app móvil en Ionic con sensor de huella.",
        en: "Automated daily reports and an Ionic mobile app with a fingerprint sensor.",
      },
    ],
    stack: ["React", "Python", "Ionic", "SQL", "Data Analysis", "Automation"],
    datesConfirmed: true,
  },
];
