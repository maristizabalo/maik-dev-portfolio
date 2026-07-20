import type { Stat } from "@/types/content";

export const stats: Stat[] = [
  {
    id: "years",
    value: 6,
    prefix: "+",
    label: { es: "Años de experiencia", en: "Years of experience" },
    confirmed: true,
  },
  {
    id: "certified-hours",
    value: 899,
    suffix: "+",
    label: { es: "Horas certificadas", en: "Certified hours" },
    confirmed: true,
  },
  {
    id: "projects",
    value: 20,
    suffix: "+",
    label: { es: "Proyectos completados", en: "Projects completed" },
    confirmed: false,
  },
  {
    id: "technologies",
    value: 15,
    suffix: "+",
    label: { es: "Tecnologías dominadas", en: "Technologies mastered" },
    confirmed: false,
  },
  {
    id: "automations",
    value: 30,
    suffix: "+",
    label: { es: "Procesos automatizados", en: "Automated processes" },
    confirmed: false,
  },
  {
    id: "commits",
    value: 2500,
    suffix: "+",
    label: { es: "Commits y entregas", en: "Commits and deliveries" },
    confirmed: false,
  },
];
