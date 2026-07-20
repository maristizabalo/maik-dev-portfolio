import type { AiCapability } from "@/types/content";

export const aiCapabilities: AiCapability[] = [
  {
    id: "assistants",
    title: {
      es: "Bots y asistentes conversacionales",
      en: "Bots & conversational assistants",
    },
    description: {
      es: "Asistentes que responden en el idioma del usuario e integran datos reales del negocio.",
      en: "Assistants that reply in the user's language and integrate real business data.",
    },
  },
  {
    id: "llm",
    title: { es: "Integración de LLMs en producto", en: "LLMs integrated into product" },
    description: {
      es: "Conecto modelos de lenguaje a flujos reales con guardrails y control de costos.",
      en: "I connect language models to real flows with guardrails and cost control.",
    },
  },
  {
    id: "agents",
    title: { es: "Agentes y agentes de voz", en: "Agents & voice agents" },
    description: {
      es: "Automatización conversacional que ejecuta acciones, no solo responde.",
      en: "Conversational automation that takes actions, not just replies.",
    },
  },
  {
    id: "automation",
    title: { es: "Automatizaciones y workflows", en: "Automations & workflows" },
    description: {
      es: "Reduzco trabajo manual encadenando servicios, datos y decisiones.",
      en: "I cut manual work by chaining services, data, and decisions.",
    },
  },
  {
    id: "ocr",
    title: { es: "OCR y procesamiento de documentos", en: "OCR & document processing" },
    description: {
      es: "Extraigo y estructuro datos de documentos para usarlos en producto.",
      en: "I extract and structure data from documents to use in product.",
    },
  },
  {
    id: "rag",
    title: { es: "RAG y bases de conocimiento", en: "RAG & knowledge bases" },
    description: {
      es: "Recuperación de contexto para respuestas fundamentadas en datos propios.",
      en: "Context retrieval for answers grounded in your own data.",
    },
  },
];
