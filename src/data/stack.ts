import type { Tech, TechCategory } from "@/types/content";

export const techCategories: { id: TechCategory; label: { es: string; en: string } }[] = [
  { id: "frontend", label: { es: "Frontend", en: "Frontend" } },
  { id: "backend", label: { es: "Backend", en: "Backend" } },
  { id: "databases", label: { es: "Bases de datos", en: "Databases" } },
  { id: "cloud", label: { es: "Cloud", en: "Cloud" } },
  { id: "devops", label: { es: "DevOps", en: "DevOps" } },
  { id: "testing", label: { es: "Testing", en: "Testing" } },
  { id: "ai", label: { es: "IA", en: "AI" } },
  { id: "automation", label: { es: "Automatización", en: "Automation" } },
  { id: "architecture", label: { es: "Arquitectura", en: "Architecture" } },
];

export const stack: Tech[] = [
  { id: "react", name: "React", category: "frontend", level: "expert", years: 6, projects: ["dadep", "invertaxi"], contexts: ["DADEP", "INVERTAXI", "Raddar Studios"] },
  { id: "nextjs", name: "Next.js", category: "frontend", level: "expert", years: 5, projects: ["dadep"], contexts: ["DADEP", "Izipay"] },
  { id: "typescript", name: "TypeScript", category: "frontend", level: "advanced", years: 4, projects: ["dadep"], contexts: ["DADEP", "Izipay"] },
  { id: "javascript", name: "JavaScript", category: "frontend", level: "expert", years: 6, projects: ["dadep", "invertaxi"], contexts: ["Todos los proyectos"] },
  { id: "tailwind", name: "Tailwind CSS", category: "frontend", level: "advanced", years: 3, projects: ["dadep"], contexts: ["DADEP"] },
  { id: "svelte", name: "Svelte", category: "frontend", level: "proficient", years: 2, projects: ["lemonvox", "kroco"], contexts: ["Lemon Start", "Kroco"] },
  { id: "angular", name: "Angular", category: "frontend", level: "working", years: 1, projects: [], contexts: ["Raddar Studios"] },
  { id: "ionic", name: "Ionic", category: "frontend", level: "working", years: 2, projects: ["invertaxi"], contexts: ["INVERTAXI", "Raddar Studios"] },

  { id: "python", name: "Python", category: "backend", level: "expert", years: 6, projects: ["dadep", "invertaxi"], contexts: ["DADEP", "INVERTAXI"] },
  { id: "django", name: "Django", category: "backend", level: "advanced", years: 4, projects: ["dadep"], contexts: ["DADEP"] },
  { id: "flask", name: "Flask", category: "backend", level: "advanced", years: 4, projects: ["dadep"], contexts: ["DADEP"] },
  { id: "nodejs", name: "Node.js", category: "backend", level: "advanced", years: 4, projects: ["dadep"], contexts: ["DADEP"] },
  { id: "express", name: "Express", category: "backend", level: "proficient", years: 3, projects: ["dadep"], contexts: ["DADEP"] },
  { id: "php", name: "PHP", category: "backend", level: "advanced", years: 4, projects: ["smartvip", "bien-company"], contexts: ["SmartVIP", "Bien Company", "Raddar Studios"] },
  { id: "go", name: "Go", category: "backend", level: "proficient", years: 2, projects: ["lemonvox", "kroco"], contexts: ["Lemon Start", "Kroco"] },
  { id: "rest", name: "REST APIs", category: "backend", level: "expert", years: 6, projects: ["dadep", "bien-company"], contexts: ["Múltiples proyectos"] },
  { id: "asterisk", name: "Asterisk", category: "backend", level: "working", years: 1, projects: ["lemonvox"], contexts: ["LemonVox"] },

  { id: "postgres", name: "PostgreSQL", category: "databases", level: "advanced", years: 5, projects: ["dadep"], contexts: ["DADEP"] },
  { id: "mysql", name: "MySQL", category: "databases", level: "advanced", years: 5, projects: ["lemonvox", "smartvip", "bien-company"], contexts: ["Lemon Start", "SmartVIP", "Bien Company"] },
  { id: "oracle", name: "Oracle", category: "databases", level: "proficient", years: 3, projects: ["dadep"], contexts: ["DADEP"] },
  { id: "firestore", name: "GCP Firestore", category: "databases", level: "working", years: 1, projects: ["bien-company"], contexts: ["Bien Company"] },

  { id: "aws", name: "AWS", category: "cloud", level: "proficient", years: 2, projects: ["bien-company", "dadep"], contexts: ["Bien Company (SQS, Lambda)", "DADEP"] },
  { id: "gcp", name: "GCP", category: "cloud", level: "working", years: 1, projects: ["bien-company"], contexts: ["Bien Company (Firestore)"] },

  { id: "docker", name: "Docker", category: "devops", level: "proficient", years: 3, projects: ["lemonvox"], contexts: ["Lemon Start"] },
  { id: "linux", name: "Linux", category: "devops", level: "advanced", years: 5, projects: ["lemonvox"], contexts: ["Lemon Start"] },
  { id: "git", name: "Git / GitHub", category: "devops", level: "expert", years: 6, projects: [], contexts: ["Todos los proyectos"] },
  { id: "cicd", name: "CI/CD", category: "devops", level: "proficient", years: 2, projects: ["lemonvox"], contexts: ["Lemon Start"] },
  { id: "caddy", name: "Caddy", category: "devops", level: "working", years: 1, projects: ["lemonvox"], contexts: ["LemonVox"] },

  { id: "jest", name: "Jest", category: "testing", level: "proficient", years: 3, projects: [], contexts: ["Izipay"] },
  { id: "pytest", name: "Pytest", category: "testing", level: "working", years: 2, projects: [], contexts: ["DADEP"] },
  { id: "sonarqube", name: "SonarQube", category: "testing", level: "working", years: 2, projects: [], contexts: ["Izipay"] },

  { id: "llm", name: "LLM Integration", category: "ai", level: "proficient", years: 2, projects: ["kroco"], contexts: ["Kroco", "Asistentes conversacionales"] },
  { id: "prompt", name: "Prompt Engineering", category: "ai", level: "proficient", years: 2, projects: [], contexts: ["Producto"] },
  { id: "ocr", name: "OCR", category: "ai", level: "working", years: 1, projects: [], contexts: ["Procesamiento de documentos"] },
  { id: "voice-agents", name: "Voice Agents", category: "ai", level: "working", years: 1, projects: ["kroco"], contexts: ["Kroco"] },

  { id: "automation", name: "Process Automation", category: "automation", level: "advanced", years: 4, projects: ["invertaxi"], contexts: ["INVERTAXI"] },
  { id: "workflows", name: "Workflows", category: "automation", level: "proficient", years: 3, projects: [], contexts: ["Integraciones"] },

  { id: "system-design", name: "System Design", category: "architecture", level: "advanced", years: 4, projects: ["lemonvox", "dadep"], contexts: ["Lemon Start", "DADEP"] },
  { id: "microservices", name: "Microservices", category: "architecture", level: "working", years: 2, projects: ["bien-company"], contexts: ["Bien Company"] },
];
