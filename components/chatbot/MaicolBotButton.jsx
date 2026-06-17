"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot } from "lucide-react";
import { glowPulse } from "@/lib/motion";
import MaicolBotPanel from "./MaicolBotPanel";

const MaicolBotButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div variants={glowPulse} animate="animate" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="fixed bottom-5 right-5 z-50">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex items-center gap-3 rounded-full border border-cyan/30 bg-[#08142b]/90 px-4 py-3 text-white shadow-glow backdrop-blur-xl"
        >
          <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-cyan via-violet to-magenta">
            <Bot className="h-6 w-6" />
          </span>
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-sm font-semibold">Maicol Bot</span>
            <span className="block text-[11px] text-white/55">Pregúntame lo que quieras</span>
          </span>
        </button>
      </motion.div>
      <AnimatePresence>{open && <MaicolBotPanel onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
};

export default MaicolBotButton;
