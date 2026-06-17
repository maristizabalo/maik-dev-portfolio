"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Circle, SendHorizonal, X } from "lucide-react";
import { slidePanel } from "@/lib/motion";
import { sendMaicolBotMessage } from "@/services/maicolBotClient";
import ChatMessage from "./ChatMessage";
import QuickQuestions from "./QuickQuestions";
import TypingIndicator from "./TypingIndicator";

const initialMessage =
  "Hola, soy Maicol Bot. Puedo contarte sobre la experiencia, proyectos, habilidades y disponibilidad de Maicol Aristizabal.";

const statusLabels = {
  idle: "Listo",
  connected: "Conectado",
  fallback: "Modo local",
  error: "Modo local",
};

const MaicolBotPanel = ({ onClose }) => {
  const locale = useLocale();
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: initialMessage,
    },
  ]);
  const [typing, setTyping] = useState(false);

  const ask = async (question) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || typing) return;

    setInput("");
    setMessages((current) => [...current, { role: "user", content: cleanQuestion }]);
    setTyping(true);

    try {
      const response = await sendMaicolBotMessage({ message: cleanQuestion, locale });
      setStatus(response.source === "local_fallback" ? "fallback" : "connected");
      setMessages((current) => [...current, { role: "bot", content: response.answer }]);
    } catch (error) {
      setStatus("error");
      setMessages((current) => [
        ...current,
        {
          role: "bot",
          content: "Estoy teniendo problemas para responder ahora mismo. Intenta con una pregunta rápida o vuelve a intentarlo en unos segundos.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    ask(input);
  };

  return (
    <motion.div
      variants={slidePanel}
      initial="hidden"
      animate="show"
      exit="exit"
      className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-[410px] overflow-hidden rounded-3xl border border-cyan/20 bg-[#071023]/92 shadow-violetGlow backdrop-blur-2xl"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-white">Maicol Bot</p>
          <motion.p layout className="mt-1 inline-flex items-center gap-2 text-xs text-cyan">
            <Circle className={`h-2.5 w-2.5 fill-current ${status === "fallback" || status === "error" ? "text-violet-300" : "text-emerald-300"}`} />
            {statusLabels[status]}
          </motion.p>
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

      <div className="space-y-3 border-t border-white/10 p-4">
        <QuickQuestions onSelect={ask} disabled={typing} />
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            disabled={typing}
            placeholder="Pregúntame sobre Maicol..."
            className="h-11 flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-cyan/40 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={typing || !input.trim()}
            className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-r from-violet to-cyan text-white shadow-glow transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-45"
            aria-label="Enviar mensaje"
          >
            <SendHorizonal className="h-4 w-4" />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default MaicolBotPanel;
