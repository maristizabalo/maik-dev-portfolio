import type { Certification, CertificationArea, Localized } from "@/types/content";

export const certifications: Certification[] = [
  {
    id: "tecnologo-adsi",
    title: {
      es: "Tecnólogo en Análisis y Desarrollo de Sistemas de Información",
      en: "Technologist in Information Systems Analysis and Development",
    },
    issuer: "SENA",
    year: 2022,
    hours: null,
    area: "development",
  },
  {
    id: "diplomado-desarrollo-software",
    title: {
      es: "Diplomado en Desarrollo de Software",
      en: "Diploma in Software Development",
    },
    issuer: "Universidad de Antioquia · MinTIC",
    year: 2022,
    hours: 200,
    area: "development",
  },
  {
    id: "diplomado-java",
    title: {
      es: "Diplomado en Programación Básica en Lenguaje Java",
      en: "Diploma in Basic Java Programming",
    },
    issuer: "MinTIC · Universidad de Antioquia",
    year: 2022,
    hours: 200,
    area: "backend",
  },
  {
    id: "diplomado-python",
    title: {
      es: "Diplomado en Fundamentos de Programación en Lenguaje Python",
      en: "Diploma in Python Programming Fundamentals",
    },
    issuer: "MinTIC",
    year: 2022,
    hours: 200,
    area: "backend",
  },
  {
    id: "curso-go",
    title: { es: "Curso de Go", en: "Go Course" },
    issuer: "Platzi",
    year: 2026,
    hours: 13,
    area: "backend",
  },
  {
    id: "python-control",
    title: {
      es: "Variables y Estructuras de Control en Python",
      en: "Variables and Control Structures in Python",
    },
    issuer: "SENA",
    year: 2022,
    hours: 48,
    area: "backend",
  },
  {
    id: "python-eda",
    title: {
      es: "Análisis Exploratorio de Datos en Python",
      en: "Exploratory Data Analysis in Python",
    },
    issuer: "SENA",
    year: 2022,
    hours: 48,
    area: "data",
  },
  {
    id: "xroad",
    title: {
      es: "Implementación de Escenarios de Interoperabilidad con X-Road",
      en: "Interoperability Scenarios with X-Road",
    },
    issuer: "SENA",
    year: 2022,
    hours: 48,
    area: "backend",
  },
  {
    id: "asesoria-tic",
    title: {
      es: "Asesoría para el Uso de las TIC en la Formación",
      en: "ICT for Education Advisory",
    },
    issuer: "SENA",
    year: 2022,
    hours: 40,
    area: "other",
  },
  {
    id: "autocad",
    title: { es: "AutoCAD 2D", en: "AutoCAD 2D" },
    issuer: "SENA",
    year: 2013,
    hours: 40,
    area: "other",
  },
  {
    id: "gobernanza-publica",
    title: { es: "Gobernanza Pública", en: "Public Governance" },
    issuer: "Alcaldía Mayor de Bogotá",
    year: 2022,
    hours: 30,
    area: "digital-gov",
  },
  {
    id: "gobierno-abierto",
    title: { es: "Gobierno Abierto de Bogotá", en: "Bogotá Open Government" },
    issuer: "Alcaldía Mayor de Bogotá",
    year: 2022,
    hours: 15,
    area: "digital-gov",
  },
  {
    id: "aws-digitech",
    title: { es: "AWS DigiTech", en: "AWS DigiTech" },
    issuer: "Universidad Distrital · Amazon Web Services",
    year: 2022,
    hours: null,
    area: "cloud",
  },
  {
    id: "sector-economico",
    title: {
      es: "Análisis del Sector Económico",
      en: "Economic Sector Analysis",
    },
    issuer: "SENA",
    year: 2013,
    hours: 2,
    area: "other",
  },
  {
    id: "ideas-innovadoras",
    title: { es: "Ideas Innovadoras", en: "Innovative Ideas" },
    issuer: "SENA",
    year: 2013,
    hours: 4,
    area: "other",
  },
  {
    id: "mentor-mision-tic",
    title: {
      es: "Participación como Mentor — Misión TIC",
      en: "Mentor — Misión TIC Program",
    },
    issuer: "Universidad de Antioquia",
    year: 2022,
    hours: 11,
    area: "development",
  },
];

export const totalCertifiedHours = certifications.reduce(
  (sum, cert) => sum + (cert.hours ?? 0),
  0,
);

export const certAreaLabels: Record<CertificationArea, Localized> = {
  development: { es: "Desarrollo", en: "Development" },
  backend: { es: "Backend", en: "Backend" },
  frontend: { es: "Frontend", en: "Frontend" },
  cloud: { es: "Cloud", en: "Cloud" },
  data: { es: "Datos", en: "Data" },
  ai: { es: "IA", en: "AI" },
  "digital-gov": { es: "Gobierno digital", en: "Digital gov" },
  other: { es: "Otros", en: "Other" },
};
