"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import MusicPlayer from "@/components/MusicPlayer";
import HeroSection from "@/components/HeroSection";
import DateScratchCard from "@/components/DateScratchCard";
import ScheduleTimeline from "@/components/ScheduleTimeline";
import VenueSection from "@/components/VenueSection";
import DressCodePalette from "@/components/DressCodePalette";
import RSVPForm from "@/components/RSVPForm";

export default function Home() {
  const [envelopeComplete, setEnvelopeComplete] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  return (
    <main className="relative min-h-screen bg-bg-primary overflow-x-hidden">
      {/* 1. Pre-load Envelope Intro (Locks scroll until opened) */}
      {!envelopeComplete && (
        <EnvelopeIntro
          onOpenComplete={() => setEnvelopeComplete(true)}
          onPlayMusic={() => setIsMusicPlaying(true)}
        />
      )}

      {/* 2. Floating audio controller */}
      {envelopeComplete && (
        <MusicPlayer isPlaying={isMusicPlaying} setIsPlaying={setIsMusicPlaying} />
      )}

      {/* 3. Main Landing Contents */}
      <div className={`transition-all duration-1000 ${envelopeComplete ? "opacity-100" : "opacity-0"}`}>
        
        {/* Hero Section */}
        <HeroSection />

        {/* Section 5: Warm Greeting card */}
        <section className="py-24 px-4 bg-bg-primary flex flex-col items-center select-text">
          <div className="w-full max-w-2xl text-center flex flex-col items-center">
            {/* Elegant opened envelope graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[280px] aspect-[1.1] mb-8 select-none"
            >
              {/* Card backing graphic */}
              <img
                src="https://static.tildacdn.net/tild3132-3666-4637-a562-616361623963/Old_Open_Envelope_PN.png"
                alt="Envelope"
                className="w-full h-full object-contain"
              />
              {/* Watercolor card overlapping graphic */}
              <img
                src="https://static.tildacdn.net/tild3935-3461-4137-b866-623466636431/Untitled_Project_9_2.png"
                alt="Card details"
                className="absolute inset-0 w-full h-full object-contain scale-[0.6] -translate-y-4"
              />
            </motion.div>

            {/* Greeting Text */}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3"
            >
              Dear friends and family,
            </motion.span>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif italic text-xl md:text-2xl text-text-primary leading-relaxed max-w-lg mb-8"
            >
              “As we get ready to say “I do,” we feel grateful for the wonderful people in our lives. Your support means the world to us, and we would be honored to have you with us as we begin our life together.”
            </motion.p>

            {/* Botanical decorative divider */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-24 aspect-[2] select-none"
            >
              <img
                src="https://static.tildacdn.net/tild6439-3462-4163-b432-363239323565/Group_63_2.png"
                alt="Botanical ornament divider"
                className="w-full h-full object-contain filter opacity-60"
              />
            </motion.div>
          </div>
        </section>

        {/* Date Scratch Reveal Card */}
        <DateScratchCard />

        {/* Schedule Timeline */}
        <ScheduleTimeline />

        {/* Wedding Venue & Maps */}
        <VenueSection />

        {/* Dress Code Specifications */}
        <DressCodePalette />

        {/* RSVP Form Attendance Submissions */}
        <RSVPForm />

        {/* Footer Section */}
        <footer className="py-24 px-4 bg-bg-secondary flex flex-col items-center select-text">
          <div className="w-full max-w-md text-center flex flex-col items-center">
            {/* Fine line divider */}
            <div className="w-16 h-[1px] bg-accent/20 mb-10" />

            <h3 className="font-serif italic text-3xl md:text-4xl text-accent font-medium leading-tight mb-4">
              Hope to see you there!
            </h3>

            <p className="font-serif text-2xl text-text-primary italic font-light tracking-wide">
              Alexa & Richard
            </p>

            <span className="text-[10px] uppercase tracking-[0.25em] text-text-secondary/50 font-semibold mt-16">
              © 2025 Alexa & Richard • All rights reserved
            </span>
          </div>
        </footer>

      </div>
    </main>
  );
}
