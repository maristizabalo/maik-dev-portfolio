import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "lemonvox",
    name: "LemonVox",
    category: { es: "Dashboard de telecomunicaciones", en: "Telecom dashboard" },
    status: "private",
    year: "2025",
    company: "Lemon Start",
    featured: true,
    summary: {
      es: "Panel de operación para llamadas, grabaciones y CDR sobre Asterisk, FreePBX e Issabel.",
      en: "Operations panel for calls, recordings, and CDR on top of Asterisk, FreePBX, and Issabel.",
    },
    problem: {
      es: "Los equipos operativos necesitaban trazabilidad y métricas de llamadas dispersas entre varios sistemas de telefonía.",
      en: "Operations teams needed call traceability and metrics scattered across several telephony systems.",
    },
    solution: {
      es: "Backend en Go que consolida CDR y eventos, con un frontend en Svelte para monitoreo en tiempo real, servido tras Caddy y contenedores Docker.",
      en: "A Go backend that consolidates CDR and events, with a Svelte frontend for real-time monitoring, served behind Caddy and Docker containers.",
    },
    impact: {
      es: "Centraliza la trazabilidad y las métricas de llamadas para operar con una sola fuente de verdad.",
      en: "Centralizes call traceability and metrics so teams operate from a single source of truth.",
    },
    stack: ["Go", "Svelte", "Docker", "Caddy", "MySQL", "Asterisk", "FreePBX", "Issabel", "CDR"],
  },
  {
    slug: "dadep",
    name: "DADEP",
    category: { es: "Plataforma institucional", en: "Institutional platform" },
    status: "private",
    year: "2025",
    company: "DADEP",
    featured: true,
    summary: {
      es: "Aplicaciones web institucionales con React, Next.js y servicios backend en Python y Node.",
      en: "Institutional web applications with React, Next.js, and backend services in Python and Node.",
    },
    problem: {
      es: "Procesos institucionales que requerían interfaces modernas y servicios confiables sobre bases de datos empresariales.",
      en: "Institutional processes that needed modern interfaces and reliable services over enterprise databases.",
    },
    solution: {
      es: "Frontend escalable en React y Next.js, servicios en Django, Flask y Express, e integración de datos con PostgreSQL y Oracle.",
      en: "Scalable React and Next.js frontend, services in Django, Flask, and Express, and data integration with PostgreSQL and Oracle.",
    },
    impact: {
      es: "Soporta procesos digitales con un stack moderno e infraestructura cloud.",
      en: "Supports digital processes with a modern stack and cloud infrastructure.",
    },
    stack: ["React", "Next.js", "Python", "Django", "Flask", "Node.js", "PostgreSQL", "Oracle", "AWS"],
  },
  {
    slug: "invertaxi",
    name: "INVERTAXI",
    category: { es: "Revisión vehicular", en: "Vehicle inspection" },
    status: "in-progress",
    year: "2022",
    company: "INVERTAXI",
    featured: true,
    summary: {
      es: "Plataforma de revisión de fallos vehiculares con automatización y un modelo de clasificación en Python.",
      en: "Vehicle-fault inspection platform with automation and a Python classification model.",
    },
    problem: {
      es: "La revisión manual de fallos vehiculares era lenta y difícil de auditar.",
      en: "Manual review of vehicle faults was slow and hard to audit.",
    },
    solution: {
      es: "Web en React para la operación, un modelo supervisado en Python para clasificar fallos y automatización de informes diarios.",
      en: "A React web app for operations, a supervised Python model to classify faults, and automated daily reports.",
    },
    impact: {
      es: "Redujo hasta un 70% el tiempo de revisión manual de fallos vehiculares.",
      en: "Cut manual vehicle-fault review time by up to 70%.",
    },
    stack: ["React", "Python", "Ionic", "SQL", "Data Analysis", "Automation"],
  },
  {
    slug: "bien-company",
    name: "Bien Company",
    category: { es: "Backend cloud", en: "Cloud backend" },
    status: "private",
    year: "2026",
    company: "Bien Company",
    featured: false,
    summary: {
      es: "Backend en PHP para facturación electrónica con integraciones cloud desacopladas.",
      en: "PHP backend for electronic invoicing with decoupled cloud integrations.",
    },
    problem: {
      es: "Procesos administrativos y de facturación que necesitaban escalar sin bloquear la operación.",
      en: "Administrative and invoicing processes that needed to scale without blocking operations.",
    },
    solution: {
      es: "Módulos a medida en PHP, procesamiento desacoplado con AWS SQS y Lambda, y notificaciones en tiempo real con GCP Firestore.",
      en: "Custom PHP modules, decoupled processing with AWS SQS and Lambda, and real-time notifications with GCP Firestore.",
    },
    impact: {
      es: "Procesamiento escalable y notificaciones en tiempo real para flujos administrativos.",
      en: "Scalable processing and real-time notifications for administrative flows.",
    },
    stack: ["PHP", "MySQL", "AWS SQS", "AWS Lambda", "GCP Firestore"],
  },
  {
    slug: "smartvip",
    name: "SmartVIP",
    category: { es: "Sistema contable", en: "Accounting system" },
    status: "private",
    year: "2023",
    featured: false,
    summary: {
      es: "Módulo contable para comprobantes, ventas, notas crédito y reportes internos.",
      en: "Accounting module for vouchers, sales, credit notes, and internal reports.",
    },
    problem: {
      es: "El control financiero requería consistencia entre transacciones y reportes confiables.",
      en: "Financial control required transaction consistency and reliable reporting.",
    },
    solution: {
      es: "Módulos en PHP sobre MySQL con consultas SQL optimizadas para comprobantes y reportes.",
      en: "PHP modules on MySQL with optimized SQL queries for vouchers and reports.",
    },
    impact: {
      es: "Mejora el control financiero y la consistencia de las transacciones comerciales.",
      en: "Improves financial control and the consistency of commercial transactions.",
    },
    stack: ["PHP", "MySQL", "SQL"],
  },
  {
    slug: "kroco",
    name: "Kroco",
    category: { es: "Torneos + IA", en: "Tournaments + AI" },
    status: "in-progress",
    year: "2024",
    featured: false,
    summary: {
      es: "Plataforma de torneos con un agente de voz e inteligencia artificial aplicada.",
      en: "Tournaments platform with a voice agent and applied artificial intelligence.",
    },
    problem: {
      es: "Crear experiencias competitivas que integren automatización conversacional.",
      en: "Create competitive experiences that integrate conversational automation.",
    },
    solution: {
      es: "Frontend en Svelte, backend en Go y un agente de voz que automatiza interacciones.",
      en: "Svelte frontend, Go backend, and a voice agent that automates interactions.",
    },
    impact: {
      es: "Combina competición y automatización conversacional en una sola experiencia.",
      en: "Combines competition and conversational automation in a single experience.",
    },
    stack: ["Svelte", "Go", "Voice Agent", "AI"],
  },
];
