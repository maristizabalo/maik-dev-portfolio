import type { FaqEntry } from "@/types/content";

export const faq: FaqEntry[] = [
  {
    id: "why-hire",
    keywords: ["contratar", "hire", "por qué", "why"],
    question: { es: "¿Por qué contratar a Maicol?", en: "Why hire Maicol?" },
    answer: {
      es: "Porque combina backend, frontend e IA con criterio de arquitectura. Ha construido productos completos de principio a fin en organizaciones públicas y privadas, con foco en soluciones que generan valor real.",
      en: "Because he combines backend, frontend, and AI with architectural judgment. He has built complete products end to end for public and private organizations, focused on solutions that create real value.",
    },
  },
  {
    id: "python",
    keywords: ["python", "django", "flask"],
    question: { es: "¿Qué experiencia tiene en Python?", en: "How much Python experience does he have?" },
    answer: {
      es: "Python es una de sus fortalezas: más de 6 años usándolo con Django y Flask para servicios backend, APIs, automatizaciones y un modelo de clasificación supervisado en INVERTAXI.",
      en: "Python is one of his strengths: 6+ years with Django and Flask for backend services, APIs, automations, and a supervised classification model at INVERTAXI.",
    },
  },
  {
    id: "ai-projects",
    keywords: ["ia", "ai", "inteligencia", "bots", "agentes", "llm"],
    question: { es: "¿Qué proyectos ha hecho con IA?", en: "What AI projects has he built?" },
    answer: {
      es: "Ha trabajado en asistentes conversacionales, agentes de voz (Kroco), automatizaciones con LLMs, OCR y procesamiento de documentos. El asistente de este sitio es un ejemplo en vivo.",
      en: "He has built conversational assistants, voice agents (Kroco), LLM automations, OCR, and document processing. The assistant on this site is a live example.",
    },
  },
  {
    id: "architecture",
    keywords: ["arquitectura", "architecture", "escalable", "scalable", "microservicios", "microservices"],
    question: { es: "¿Cómo diseña arquitecturas escalables?", en: "How does he design scalable architectures?" },
    answer: {
      es: "Diseña por capas (frontend, APIs, datos, colas, infraestructura) y desacopla el trabajo pesado con colas como AWS SQS y Lambda. Prioriza elegir trade-offs conscientes sobre acumular tecnologías.",
      en: "He designs in layers (frontend, APIs, data, queues, infrastructure) and decouples heavy work with queues like AWS SQS and Lambda. He prioritizes conscious trade-offs over piling up technologies.",
    },
  },
  {
    id: "aws",
    keywords: ["aws", "cloud", "gcp", "lambda", "sqs"],
    question: { es: "¿Tiene experiencia con AWS?", en: "Does he have AWS experience?" },
    answer: {
      es: "Sí, a nivel práctico: en Bien Company integró AWS SQS y Lambda para procesamiento desacoplado, y GCP Firestore para notificaciones en tiempo real. También cuenta con formación AWS DigiTech.",
      en: "Yes, at a practical level: at Bien Company he integrated AWS SQS and Lambda for decoupled processing, and GCP Firestore for real-time notifications. He also completed AWS DigiTech training.",
    },
  },
  {
    id: "backend",
    keywords: ["backend", "servidor", "server"],
    question: { es: "¿Qué tan fuerte es en backend?", en: "How strong is he at backend?" },
    answer: {
      es: "Muy sólido: Python (Django, Flask), Node (Express), PHP y Go, con APIs REST, autenticación, integraciones y bases de datos SQL como PostgreSQL, Oracle y MySQL.",
      en: "Very solid: Python (Django, Flask), Node (Express), PHP, and Go, with REST APIs, authentication, integrations, and SQL databases like PostgreSQL, Oracle, and MySQL.",
    },
  },
  {
    id: "complex",
    keywords: ["complejo", "complex", "difícil", "hardest"],
    question: { es: "¿Cuál fue su proyecto más complejo?", en: "What was his most complex project?" },
    answer: {
      es: "LemonVox: un sistema de telecomunicaciones en Go y Svelte que consolida CDR y eventos de varios sistemas de telefonía (Asterisk, FreePBX, Issabel) para monitoreo en tiempo real, con despliegue en contenedores.",
      en: "LemonVox: a telecom system in Go and Svelte that consolidates CDR and events from several telephony systems (Asterisk, FreePBX, Issabel) for real-time monitoring, deployed in containers.",
    },
  },
  {
    id: "containers",
    keywords: ["docker", "contenedores", "containers", "devops"],
    question: { es: "¿Cuánto tiempo lleva con contenedores?", en: "How long has he worked with containers?" },
    answer: {
      es: "Alrededor de 3 años con Docker y Linux, incluyendo CI/CD, generación de releases y despliegues a producción en proyectos como LemonVox.",
      en: "Around 3 years with Docker and Linux, including CI/CD, release generation, and production deployments in projects like LemonVox.",
    },
  },
  {
    id: "availability",
    keywords: ["disponible", "available", "modalidad", "remoto", "remote", "freelance"],
    question: { es: "¿Está disponible? ¿En qué modalidad?", en: "Is he available? In what mode?" },
    answer: {
      es: "Está disponible para proyectos freelance y de largo plazo, con preferencia por trabajo remoto. Para hablar de un proyecto puedes escribirle por correo o WhatsApp.",
      en: "He is available for freelance and long-term projects, preferring remote work. To discuss a project you can reach him by email or WhatsApp.",
    },
  },
  {
    id: "react-angular",
    keywords: ["react", "angular", "frontend", "next"],
    question: { es: "Compara su experiencia en React vs Angular", en: "Compare his React vs Angular experience" },
    answer: {
      es: "React (y Next.js) es su especialidad, con más de 6 años y presencia en casi todos sus proyectos. Angular lo ha usado de forma puntual en Raddar Studios, a nivel práctico pero no como foco principal.",
      en: "React (and Next.js) is his specialty, with 6+ years across nearly all his projects. He has used Angular occasionally at Raddar Studios, at a working level but not as a main focus.",
    },
  },
];
