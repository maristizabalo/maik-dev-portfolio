"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownToLine, ArrowUpRight, Bot, CheckCircle2, Code2, Cpu, Database, Gauge, Rocket, Sparkles } from "lucide-react";
import { useLocale } from "next-intl";
import { experience } from "@/data/portfolio/experience";
import { profile } from "@/data/portfolio/profile";
import { projects } from "@/data/portfolio/projects";
import { services } from "@/data/portfolio/services";
import { skillGroups, skills } from "@/data/portfolio/skills";
import { stats } from "@/data/portfolio/stats";
import { fadeUp, floating, scaleIn, staggerContainer } from "@/lib/motion";
import Logo from "@/components/brand/Logo";
import GlassCard from "@/components/ui/GlassCard";
import GlowButton from "@/components/ui/GlowButton";
import GradientText from "@/components/ui/GradientText";
import MagneticButton from "@/components/motion/MagneticButton";
import Reveal from "@/components/motion/Reveal";
import StaggerContainer from "@/components/motion/StaggerContainer";
import MaicolBotButton from "@/components/chatbot/MaicolBotButton";

const badges = [
  { label: "Clean Code", className: "left-1 top-10", icon: Code2 },
  { label: "Performance", className: "right-0 top-24", icon: Gauge },
  { label: "Scalable", className: "bottom-16 left-7", icon: Database },
  { label: "UI/UX Focus", className: "bottom-24 right-8", icon: Sparkles },
  { label: "Innovation", className: "left-0 top-40", icon: Cpu },
];

const particles = Array.from({ length: 14 }, (_, index) => ({
  left: `${(index * 37) % 96}%`,
  top: `${(index * 53) % 88}%`,
  delay: index * 0.15,
}));

const statusStyles = {
  privado: "border-violet/30 bg-violet/10 text-violet-200",
  publico: "border-cyan/30 bg-cyan/10 text-cyan-100",
  "en desarrollo": "border-magenta/30 bg-magenta/10 text-fuchsia-100",
};

const Home = () => {
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const featuredProjects = projects.slice(0, 4);
  const topSkills = skills.slice(0, 14);

  return (
    <div className="relative z-10 mx-auto max-w-[1440px] space-y-5">
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid min-h-[680px] grid-cols-1 gap-5 xl:grid-cols-[1fr_0.9fr]"
      >
        <GlassCard className="command-panel flex flex-col justify-center p-6 md:p-10">
          <motion.div variants={fadeUp} className="mb-7 inline-flex w-fit items-center gap-3 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
            Disponible para trabajos freelance
          </motion.div>

          <motion.p variants={fadeUp} className="text-lg text-white/85">
            Hola, soy
          </motion.p>
          <motion.h1 variants={fadeUp} className="h1 mt-2 max-w-4xl text-white">
            Maicol Aristizabal<span className="text-violet">.</span>
          </motion.h1>
          <motion.h2 variants={fadeUp} className="mt-4 text-xl font-semibold md:text-2xl">
            <GradientText>Desarrollador Full Stack & Ingeniero de Soluciones_</GradientText>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base leading-8 text-white/62 md:text-lg">
            Construyo aplicaciones web modernas, dashboards, APIs, automatizaciones e integraciones con IA que resuelven problemas reales de negocio.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton>
              <GlowButton href={`/${locale}/work`}>Ver mis proyectos</GlowButton>
            </MagneticButton>
            <GlowButton href={`/${locale}/resume`} icon={ArrowDownToLine} variant="secondary">
              Descargar CV
            </GlowButton>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-9">
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-white/40">Tecnologias que uso</p>
            <div className="flex flex-wrap gap-2">
              {topSkills.map((skill) => (
                <span key={skill} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/70">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </GlassCard>

        <GlassCard className="relative min-h-[520px] overflow-hidden p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_34rem)]" />
          {particles.map((particle) => (
            <motion.span
              key={`${particle.left}-${particle.top}`}
              animate={prefersReducedMotion ? undefined : { opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.25, 0.8] }}
              transition={{ duration: 3.2, repeat: Infinity, delay: particle.delay }}
              className="absolute hidden h-1 w-1 rounded-full bg-cyan md:block"
              style={{ left: particle.left, top: particle.top }}
            />
          ))}
          <motion.div
            animate={prefersReducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/20"
          />
          <motion.div
            animate={prefersReducedMotion ? undefined : { rotate: -360 }}
            transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-[460px] w-[260px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[50%] border border-violet/25"
          />
          <motion.div variants={scaleIn} className="absolute left-1/2 top-1/2 grid h-48 w-48 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[40px] border border-cyan/25 bg-white/[0.04] shadow-glow backdrop-blur-xl">
            <Logo compact />
          </motion.div>
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.label}
                variants={floating}
                animate="animate"
                transition={{ delay: index * 0.2 }}
                className={`absolute ${badge.className} hidden items-center gap-2 rounded-xl border border-white/10 bg-[#0b1022]/80 px-3 py-2 text-[11px] font-semibold uppercase text-white/75 shadow-glow backdrop-blur md:flex`}
              >
                <Icon className="h-3.5 w-3.5 text-cyan" />
                {badge.label}
              </motion.div>
            );
          })}
        </GlassCard>
      </motion.section>

      <StaggerContainer className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => (
          <motion.div variants={fadeUp} key={stat.label}>
            <GlassCard className="flex items-center gap-4 p-5">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan/10 text-cyan">
                <Rocket className="h-5 w-5" />
              </span>
              <div>
                <p className="gradient-text text-3xl font-bold">{stat.value}</p>
                <p className="text-xs text-white/48">{stat.label}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </StaggerContainer>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.2fr_0.8fr_0.52fr]">
        <Reveal>
          <GlassCard className="p-5">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Proyectos destacados</h3>
              <a href={`/${locale}/work`} className="inline-flex items-center gap-2 text-xs text-cyan">
                Ver todos <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {featuredProjects.map((project) => (
                <a href={`/${locale}/work#${project.slug}`} key={project.slug} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:-translate-y-1 hover:border-cyan/30 hover:shadow-glow">
                  <div className="mb-4 h-28 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-cyan/12 via-violet/10 to-magenta/10">
                    <div className="flex h-full items-end justify-between p-4 transition-transform duration-500 group-hover:scale-105">
                      <span className="text-2xl font-bold text-white">{project.name}</span>
                      <ArrowUpRight className="h-5 w-5 text-cyan" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-white">{project.category}</p>
                    <span className={`rounded-full border px-2 py-1 text-[10px] uppercase ${statusStyles[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/58">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((item) => (
                      <span key={item} className="rounded-full bg-white/[0.05] px-2 py-1 text-[10px] text-white/55">
                        {item}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </GlassCard>
        </Reveal>

        <Reveal>
          <GlassCard className="p-5">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Lo que hago</h3>
              <a href={`/${locale}/services`} className="text-xs text-cyan">Servicios</a>
            </div>
            <div className="space-y-3">
              {services.map((service) => (
                <div key={service.title} className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition hover:border-violet/30">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan/10 text-cyan transition group-hover:bg-violet/20 group-hover:text-violet-200">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{service.title}</p>
                    <p className="text-xs leading-5 text-white/52">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>

        <Reveal>
          <GlassCard className="p-5">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border border-violet/40 bg-white/5">
                <Image src="/assets/perfil.png" alt="Maicol Aristizabal" fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Sobre mi</p>
                <p className="text-xs leading-5 text-white/55">Apasionado por crear plataformas utiles, escalables y con una interfaz cuidada.</p>
              </div>
            </div>
            <GlowButton href={`/${locale}/contact`} className="mt-6 w-full">
              Conocer mas
            </GlowButton>
          </GlassCard>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[0.95fr_0.75fr_0.55fr]">
        <Reveal>
          <GlassCard id="stack" className="p-5">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-white">Stack principal</h3>
            <div className="flex flex-wrap gap-2">
              {skillGroups.map((group) => (
                <div key={group.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="mb-2 text-xs font-semibold text-cyan">{group.label}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-full bg-white/[0.05] px-2 py-1 text-[10px] text-white/58">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>

        <Reveal>
          <GlassCard className="p-5">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-white">Experiencia profesional</h3>
            <div className="space-y-4">
              {experience.map((item) => (
                <div key={`${item.period}-${item.company}`} className="relative border-l border-cyan/20 pl-5">
                  <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-cyan shadow-glow" />
                  <p className="text-xs text-white/45">{item.period}</p>
                  <p className="text-sm font-semibold text-cyan">{item.role}</p>
                  <p className="text-xs text-white/55">{item.company} - {item.location}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>

        <Reveal>
          <GlassCard className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Disponibilidad</h3>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold text-emerald-300">Disponible</span>
            </div>
            <p className="text-sm leading-7 text-white/58">{profile.availability}.</p>
            <GlowButton href={`/${locale}/contact`} className="mt-6 w-full">
              Hablemos de tu proyecto
            </GlowButton>
          </GlassCard>
        </Reveal>
      </div>

      <Reveal>
        <GlassCard className="flex flex-col items-start justify-between gap-5 p-5 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan via-violet to-magenta">
              <Bot className="h-7 w-7" />
            </span>
            <div>
              <p className="text-lg font-semibold text-white">Maicol Bot</p>
              <p className="text-sm text-white/55">Teaser del asistente para consultar experiencia, proyectos, habilidades y disponibilidad.</p>
            </div>
          </div>
          <span className="rounded-full border border-cyan/20 bg-cyan/10 px-4 py-2 text-xs font-semibold text-cyan">UI lista, API en preparacion</span>
        </GlassCard>
      </Reveal>

      <MaicolBotButton />
    </div>
  );
};

export default Home;
