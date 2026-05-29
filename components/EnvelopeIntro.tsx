"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MailOpen } from "lucide-react";

interface EnvelopeIntroProps {
  onOpenComplete: () => void;
  onPlayMusic: () => void;
}

export default function EnvelopeIntro({ onOpenComplete, onPlayMusic }: EnvelopeIntroProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Add no-scroll class to body when envelope is active
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    onPlayMusic();

    // After animation finishes, dismiss the envelope and allow scroll
    setTimeout(() => {
      setIsDismissed(true);
      document.body.classList.remove("no-scroll");
      onOpenComplete();
    }, 2800);
  };

  if (isDismissed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f7f3ed] overflow-hidden select-none">
      {/* Decorative botanical/watercolor background textures */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#52839c_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="relative w-full max-w-[600px] h-[500px] flex items-center justify-center px-4">
        {/* The Card Inside */}
        <motion.div
          initial={{ y: 0, scale: 0.9, opacity: 0.9 }}
          animate={
            isOpen
              ? {
                  y: -100,
                  scale: 1.15,
                  opacity: 1,
                  zIndex: 20,
                  transition: { delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                }
              : {}
          }
          className="absolute w-[80%] aspect-[1.3] bg-white rounded-md shadow-lg border border-border/40 p-6 flex flex-col items-center justify-center text-center z-10"
        >
          <motion.div
            animate={isOpen ? { opacity: 0, y: -20, transition: { duration: 0.5 } } : {}}
            className="flex flex-col items-center"
          >
            <span className="font-serif italic text-text-secondary text-lg mb-2">Dear friends and family</span>
            <div className="w-12 h-[1px] bg-accent/40 my-2" />
          </motion.div>

          <h1 className="font-serif text-3xl md:text-4xl text-accent font-medium leading-tight">
            Alexa & Richard
          </h1>
          <p className="font-serif italic text-text-secondary text-lg mt-2">
            Are getting married!
          </p>
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mt-4">
            September 14, 2025
          </span>
        </motion.div>

        {/* Envelope Outer Frame */}
        <div className="absolute w-[85%] aspect-[1.3] z-25 pointer-events-none" />

        {/* Envelope Flaps (Images from original Tilda page) */}
        {/* Left Flap */}
        <motion.img
          src="https://static.tildacdn.net/tild3636-6566-4132-b665-343766326335/Polygon_3.png"
          alt=""
          initial={{ x: 0, opacity: 1 }}
          animate={isOpen ? { x: -350, opacity: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } } : {}}
          className="absolute left-0 w-[55%] h-full object-fill z-24 pointer-events-none"
        />

        {/* Right Flap */}
        <motion.img
          src="https://static.tildacdn.net/tild6338-3733-4431-a363-306634383864/Polygon_4.png"
          alt=""
          initial={{ x: 0, opacity: 1 }}
          animate={isOpen ? { x: 350, opacity: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } } : {}}
          className="absolute right-0 w-[55%] h-full object-fill z-24 pointer-events-none"
        />

        {/* Bottom Flap */}
        <motion.img
          src="https://static.tildacdn.net/tild6262-6339-4933-b833-343039643037/Polygon_2_1.png"
          alt=""
          initial={{ y: 0, opacity: 1 }}
          animate={isOpen ? { y: 250, opacity: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } } : {}}
          className="absolute bottom-0 w-full h-[65%] object-fill z-23 pointer-events-none"
        />

        {/* Top Flap */}
        <motion.img
          src="https://static.tildacdn.net/tild3762-3738-4361-b134-333538333135/Polygon_1_3.png"
          alt=""
          initial={{ y: 0, opacity: 1, transformOrigin: "top" }}
          animate={isOpen ? { y: -250, scaleY: -0.5, opacity: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } } : {}}
          className="absolute top-0 w-full h-[55%] object-fill z-24 pointer-events-none"
        />

        {/* Click To Open Overlay Button */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.4 } }}
              onClick={handleOpen}
              className="absolute z-30 cursor-pointer flex flex-col items-center gap-3 active:scale-95 group transition-premium"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent text-white shadow-xl group-hover:bg-accent-hover group-hover:scale-110 active:scale-90 transition-premium">
                <MailOpen className="w-6 h-6 animate-bounce" />
              </div>
              <span className="font-serif italic text-lg text-text-primary px-6 py-2 bg-white/90 rounded-full shadow-md backdrop-blur-sm border border-border/20 tracking-wider">
                Click to open
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
