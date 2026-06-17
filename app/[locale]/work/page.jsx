"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Lock, Rocket } from "lucide-react";
import { projects } from "@/data/portfolio/projects";
import GlassCard from "@/components/ui/GlassCard";
import GlowButton from "@/components/ui/GlowButton";
import Reveal from "@/components/motion/Reveal";
import StaggerContainer from "@/components/motion/StaggerContainer";
import { fadeUp } from "@/lib/motion";

const statusStyles = {
  privado: "border-violet/30 bg-violet/10 text-violet-200",
  publico: "border-cyan/30 bg-cyan/10 text-cyan-100",
  "en desarrollo": "border-magenta/30 bg-magenta/10 text-fuchsia-100",
};

const Work = () => {
  return (
    <div className="relative z-10 mx-auto max-w-[1440px] space-y-5">
      <Reveal>
        <GlassCard className="command-panel p-6 md:p-10">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan">Project systems</p>
            <h1 className="h2 text-white">Proyectos reales con foco en producto, datos e integraciones.</h1>
            <p className="mt-5 text-base leading-8 text-white/58">
              Una seleccion de plataformas, dashboards, sistemas contables, backend cloud y experiencias con IA. Las paginas detalle quedan listas para evolucionar en la siguiente fase.
            </p>
          </div>
        </GlassCard>
      </Reveal>

      <StaggerContainer className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article variants={fadeUp} id={project.slug} key={project.slug}>
            <GlassCard className="group flex h-full flex-col overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-glow">
              <div className="relative mb-5 h-44 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-cyan/12 via-violet/10 to-magenta/10">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent,rgba(255,255,255,0.08),transparent)] opacity-0 transition group-hover:opacity-100" />
                <div className="flex h-full flex-col justify-between p-5 transition-transform duration-500 group-hover:scale-105">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-white/60">
                      0{index + 1}
                    </span>
                    <Rocket className="h-5 w-5 text-cyan" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">{project.name}</p>
                    <p className="text-sm text-cyan">{project.category}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className={`rounded-full border px-3 py-1 text-[10px] uppercase ${statusStyles[project.status]}`}>
                  {project.status}
                </span>
                <span className="inline-flex items-center gap-2 text-xs text-white/45">
                  <Lock className="h-3.5 w-3.5" />
                  Detalle pronto
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/62">{project.description}</p>
              <p className="mt-4 text-sm leading-7 text-white/78">
                <span className="text-cyan">Impacto:</span> {project.impact}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-xs text-white/58">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-6">
                <GlowButton href={`#${project.slug}`} variant="secondary" icon={ArrowUpRight}>
                  Ver proyecto
                </GlowButton>
              </div>
            </GlassCard>
          </motion.article>
        ))}
      </StaggerContainer>
    </div>
  );
};

export default Work;
