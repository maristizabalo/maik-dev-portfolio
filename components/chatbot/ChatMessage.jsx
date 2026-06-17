"use client";

import { motion } from "framer-motion";

const ChatMessage = ({ role, children }) => {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-gradient-to-r from-violet to-cyan text-white"
            : "border border-white/10 bg-white/[0.05] text-white/78"
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
