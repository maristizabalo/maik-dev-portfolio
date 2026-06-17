"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { projects } from "@/data/portfolio/projects";
import { skills } from "@/data/portfolio/skills";
import { profile } from "@/data/portfolio/profile";
import { slidePanel } from "@/lib/motion";
import ChatMessage from "./ChatMessage";
import QuickQuestions from "./QuickQuestions";
import TypingIndicator from "./TypingIndicator";

const getAnswer = (question) => {
  const normalized = question.toLowerCase();

  if (normalized.includes("proyecto")) {
    return `Maicol ha trabajado en ${projects.map((project) => project.name).join(", ")}. Destacan dashboards, telecom, contabilidad, automatizacion, IA y backend cloud.`;
  }

  if (normalized.includes("tecnologia") || normalized.includes("stack")) {
    return `Trabaja principalmente con ${skills.slice(0, 12).join(", ")} y tambien con cloud, automatizacion, Asterisk, FreePBX, Issabel y CDR.`;
  }

  if (normalized.includes("backend")) {
    return "Si. Tiene experiencia en Python, PHP, Go, Node.js, bases de datos SQL, colas, APIs, integraciones cloud y servicios para dashboards operativos.";
  }

  if (normalized.includes("disponible")) {
    return profile.availability;
  }

  if (normalized.includes("cv")) {
    return "Puedes revisar la seccion de experiencia y contactar a Maicol para recibir el CV actualizado.";
  }

  return "Puedo ayudarte con experiencia, proyectos, habilidades, servicios, disponibilidad, contacto y forma de trabajo de Maicol Aristizabal.";
};

const MaicolBotPanel = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hola! Soy Maicol Bot. Preguntame sobre mi experiencia, proyectos, habilidades o disponibilidad.",
    },
  ]);
  const [typing, setTyping] = useState(false);

  const ask = (question) => {
    setMessages((current) => [...current, { role: "user", content: question }]);
    setTyping(true);
    window.setTimeout(() => {
      setMessages((current) => [...current, { role: "bot", content: getAnswer(question) }]);
      setTyping(false);
    }, 520);
  };

  return (
    <motion.div
      variants={slidePanel}
      initial="hidden"
      animate="show"
      exit="exit"
      className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-[390px] overflow-hidden rounded-3xl border border-cyan/20 bg-[#071023]/92 shadow-violetGlow backdrop-blur-2xl"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-white">Maicol Bot</p>
          <p className="text-xs text-cyan">Asistente del portafolio</p>
        </div>
        <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/70 hover:text-white">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex max-h-[430px] flex-col gap-3 overflow-y-auto p-4">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <ChatMessage key={`${message.role}-${index}`} role={message.role}>
              {message.content}
            </ChatMessage>
          ))}
        </AnimatePresence>
        {typing && <TypingIndicator />}
      </div>
      <div className="border-t border-white/10 p-4">
        <QuickQuestions onSelect={ask} />
      </div>
    </motion.div>
  );
};

export default MaicolBotPanel;
