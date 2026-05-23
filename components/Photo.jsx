"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import imgPerfil from "../public/assets/andrea.png"

const Photo = () => {
  return (
    <div className="relative mx-auto h-[360px] w-[300px] xl:h-[540px] xl:w-[430px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { delay: 0.5, duration: 0.35, ease: "easeOut" },
        }}
        className="absolute inset-x-4 bottom-2 top-8 rounded-full bg-gradient-to-br from-petal via-accent-soft to-champagne shadow-[0_28px_90px_rgba(236,72,153,0.28)] dark:from-white/10 dark:via-accent/25 dark:to-white/5"
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.8, duration: 0.35, ease: "easeOut" },
        }}
        className="absolute inset-0 overflow-hidden rounded-full border border-white/80 bg-white/40 shadow-xl dark:border-white/10 dark:bg-white/5"
      >
        <Image
          src={imgPerfil}
          priority
          quality={100}
          fill
          alt="Andrea Chizabas"
          className="scale-[1.5] object-contain object-bottom drop-shadow-2xl xl:scale-[1.42]"
        />
      </motion.div>

      <motion.svg
        className="pointer-events-none absolute inset-[-10px] h-[380px] w-[320px] xl:inset-[-16px] xl:h-[572px] xl:w-[462px]"
        fill="transparent"
        viewBox="0 0 506 606"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.ellipse
          cx="253"
          cy="303"
          rx="236"
          ry="286"
          stroke="#EC4899"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ strokeDasharray: "24 10 0 0" }}
          animate={{
            strokeDasharray: ["18 120 28 30", "20 32 110 74", "8 260 22 24"],
            rotate: [0, 360],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.svg>
    </div>
  )
}

export default Photo
