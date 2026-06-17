"use client";

import { motion } from "framer-motion";

const TypingIndicator = () => {
  return (
    <div className="flex w-fit items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          animate={{ opacity: [0.35, 1, 0.35], y: [0, -3, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.12 }}
          className="h-1.5 w-1.5 rounded-full bg-cyan"
        />
      ))}
    </div>
  );
};

export default TypingIndicator;
