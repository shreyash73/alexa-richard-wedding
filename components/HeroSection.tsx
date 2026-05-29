"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-bg-secondary select-none">
      {/* Background Video Loop */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105 filter saturate-[0.85] contrast-[1.05]"
      >
        <source
          src="https://www.dropbox.com/scl/fi/oeriu20lkuahfyshf99za/Italian_villa_terrace_202604231419.MP4?rlkey=0f7q5catjho2qmgfn2j3b9i6f&st=c5mnzsl1&raw=1"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/80 font-serif italic text-xl md:text-2xl mb-4 tracking-wider"
        >
          Are getting married!
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-white font-serif text-5xl sm:text-7xl md:text-8xl italic font-light leading-[1.1] mb-6 drop-shadow-sm select-text"
        >
          Alexa & Richard
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
          className="w-24 h-[1px] bg-white/60 mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/90 font-sans text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold"
        >
          Save The Date ✦ September 14, 2025
        </motion.p>
      </div>

      {/* Animated Scroll Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-white/60 gap-1"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </motion.div>
    </section>
  );
}
