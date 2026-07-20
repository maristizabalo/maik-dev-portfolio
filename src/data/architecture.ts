import type { ArchLayer, ArchStep } from "@/types/content";

export const archLayers: ArchLayer[] = [
  {
    id: "frontend",
    title: { es: "Frontend", en: "Frontend" },
    description: {
      es: "Interfaces rápidas y accesibles con React, Next.js y Svelte.",
      en: "Fast, accessible interfaces with React, Next.js, and Svelte.",
    },
    tech: ["React", "Next.js", "Svelte", "Tailwind"],
  },
  {
    id: "api",
    title: { es: "APIs y servicios", en: "APIs & services" },
    description: {
      es: "Servicios REST en Python, Node y Go, con validación y autenticación.",
      en: "REST services in Python, Node, and Go, with validation and auth.",
    },
    tech: ["Python", "Go", "Node.js", "REST"],
  },
  {
    id: "data",
    title: { es: "Datos y caché", en: "Data & cache" },
    description: {
      es: "PostgreSQL, Oracle y MySQL, con índices y caché donde de verdad importa.",
      en: "PostgreSQL, Oracle, and MySQL, with indexes and caching where it truly matters.",
    },
    tech: ["PostgreSQL", "Oracle", "MySQL"],
  },
  {
    id: "messaging",
    title: { es: "Colas y mensajería", en: "Queues & messaging" },
    description: {
      es: "Procesamiento desacoplado con colas para escalar sin bloquear la operación.",
      en: "Decoupled processing with queues to scale without blocking operations.",
    },
    tech: ["AWS SQS", "AWS Lambda", "GCP Firestore"],
  },
  {
    id: "infra",
    title: { es: "Infraestructura y CI/CD", en: "Infrastructure & CI/CD" },
    description: {
      es: "Docker, Linux y despliegues automatizados con generación de releases.",
      en: "Docker, Linux, and automated deployments with release generation.",
    },
    tech: ["Docker", "Linux", "Caddy", "CI/CD"],
  },
  {
    id: "observability",
    title: { es: "Observabilidad y seguridad", en: "Observability & security" },
    description: {
      es: "Logs, métricas y buenas prácticas de seguridad de extremo a extremo.",
      en: "Logs, metrics, and end-to-end security best practices.",
    },
    tech: ["Logs", "Metrics", "JWT"],
  },
];

export const archFlow: ArchStep[] = [
  {
    order: 1,
    title: { es: "Petición del usuario", en: "User request" },
    description: {
      es: "La interfaz captura la intención y valida en el cliente.",
      en: "The interface captures intent and validates on the client.",
    },
  },
  {
    order: 2,
    title: { es: "API y autenticación", en: "API & auth" },
    description: {
      es: "El servicio valida, autentica y aplica las reglas de negocio.",
      en: "The service validates, authenticates, and applies business rules.",
    },
  },
  {
    order: 3,
    title: { es: "Datos y procesamiento", en: "Data & processing" },
    description: {
      es: "Lee y escribe en la base y delega el trabajo pesado a colas.",
      en: "Reads and writes to the database and offloads heavy work to queues.",
    },
  },
  {
    order: 4,
    title: { es: "Respuesta y telemetría", en: "Response & telemetry" },
    description: {
      es: "Devuelve la respuesta y registra métricas para observabilidad.",
      en: "Returns the response and records metrics for observability.",
    },
  },
];
