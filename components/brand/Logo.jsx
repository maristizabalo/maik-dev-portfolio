"use client";

import { motion } from "framer-motion";

const Logo = ({ compact = false }) => {
  return (
    <div className="flex items-center gap-3">
      <motion.div
        whileHover={{ scale: 1.04, rotate: -2 }}
        className="relative grid h-14 w-14 place-items-center rounded-2xl border border-cyan/25 bg-white/[0.03] shadow-glow"
      >
        <span className="absolute inset-2 rounded-xl bg-gradient-to-br from-cyan/25 via-violet/20 to-magenta/25 blur-md" />
        <span className="relative text-3xl font-black leading-none gradient-text orbital-glow">M</span>
      </motion.div>
      {!compact && (
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">Maicol</p>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">Command Center</p>
        </div>
      )}
    </div>
  );
};

export default Logo;
