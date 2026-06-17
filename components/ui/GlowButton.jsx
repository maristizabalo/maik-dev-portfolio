"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const GlowButton = ({ href, children, icon: Icon = ArrowRight, variant = "primary", className = "", ...props }) => {
  const classes = cn(
    "group relative inline-flex h-12 items-center justify-center gap-3 overflow-hidden rounded-full px-6 text-sm font-semibold transition-colors",
    variant === "primary"
      ? "bg-gradient-to-r from-violet via-blue-500 to-cyan text-white shadow-glow"
      : "border border-white/12 bg-white/[0.03] text-white hover:border-cyan/40",
    className
  );

  const content = (
    <>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">{children}</span>
      {Icon && <Icon className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );

  if (href) {
    return (
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
        <Link href={href} className={classes} {...props}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={classes} {...props}>
      {content}
    </motion.button>
  );
};

export default GlowButton;
