"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import EnvelopeReveal from "@/components/EnvelopeReveal";
import MusicPlayer from "@/components/MusicPlayer";
import HeroSection from "@/components/HeroSection";
import SaveTheDate from "@/components/SaveTheDate";
import EventsSection from "@/components/EventsSection";
import WeddingReceptionSection from "@/components/WeddingReceptionSection";
import PhotoSlider from "@/components/PhotoSlider";
import ScheduleTimeline from "@/components/ScheduleTimeline";
import VenueSection from "@/components/VenueSection";
import DressCodePalette from "@/components/DressCodePalette";
import RSVPForm from "@/components/RSVPForm";

// Reusable BH monogram mark
function MonogramBH({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="select-none">
      <circle cx="50" cy="50" r="46" fill="none" stroke="var(--color-gold)" strokeWidth="1.2" opacity="0.7" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-gold)" strokeWidth="0.6" opacity="0.4" strokeDasharray="2 3" />
      <text
        x="50"
        y="63"
        textAnchor="middle"
        className="text-gold-shimmer"
        fontSize="40"
        fontFamily="'Playfair Display', Georgia, serif"
        fontWeight="600"
        fill="var(--color-gold)"
      >
        BH
      </text>
    </svg>
  );
}

export default function Home() {
  const [envelopeComplete, setEnvelopeComplete] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const scrollToRSVP = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // Phone-format stage: on wide screens the experience renders in a
    // centered 9:16 column so the artwork never gets vertically cropped —
    // section seams (Main 3 → carpet) depend on top/bottom edges meeting.
    <main
      className="relative min-h-screen bg-bg-primary overflow-x-hidden mx-auto"
      style={{ maxWidth: "56.25vh", boxShadow: "0 0 80px rgba(0,0,0,0.55)" }}
    >
      {/* 1. Envelope intro (locks until opened) */}
      {!envelopeComplete && (
        <EnvelopeReveal
          onOpenComplete={() => setEnvelopeComplete(true)}
          onPlayMusic={() => setIsMusicPlaying(true)}
        />
      )}

      {/* 2. Floating audio controller */}
      {envelopeComplete && (
        <MusicPlayer isPlaying={isMusicPlaying} setIsPlaying={setIsMusicPlaying} />
      )}

      {/* 3. Main contents — keyed so entrance animations replay once the
             envelope opens instead of running invisibly behind it */}
      <div
        key={envelopeComplete ? "revealed" : "sealed"}
        className={`transition-all duration-1000 ${envelopeComplete ? "opacity-100" : "opacity-0"}`}
      >

        {/* Shared background container for Hero and Save the Date */}
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <img
              src="/alexa-richard-wedding/combined-first-page-bg.webp"
              alt=""
              aria-hidden="true"
              draggable={false}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
                userSelect: "none",
              }}
            />
          </div>
          
          <div className="relative z-10">
            {/* Hero — ambience and the couple, scrolls normally */}
            <HeroSection />

            {/* Save the Date — scratch the petal heart to reveal the date */}
            <SaveTheDate />
          </div>
        </div>

        {/* Haldi & Sangeet cards on the BH5 gradient */}
        <EventsSection />

        {/* Wedding & Reception cards — continues the same BH5 gradient */}
        <WeddingReceptionSection />

        {/* Warm greeting card */}
        <section className="py-24 px-4 bg-bg-primary flex flex-col items-center select-text">
          <div className="w-full max-w-2xl text-center flex flex-col items-center">
            <Reveal scale={0.9} rotate={-6} duration={0.8} className="mb-6 animate-float-soft">
              <MonogramBH size={88} />
            </Reveal>

            <Reveal
              delay={0.2}
              className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-4"
            >
              Dear friends and family,
            </Reveal>

            <Reveal
              y={15}
              duration={0.8}
              delay={0.3}
              className="font-serif italic text-xl md:text-2xl text-text-primary leading-relaxed max-w-lg mb-8"
            >
              &ldquo;As we prepare to begin this beautiful new chapter together, we feel
              grateful for the wonderful people in our lives. Your love and blessings mean
              the world to us, and we would be honoured to have you celebrate with us.&rdquo;
            </Reveal>

            <div className="ornament-divider w-40">
              <span className="text-lg">❀</span>
            </div>
          </div>
        </section>

        {/* Couple photo slider */}
        <PhotoSlider />

        {/* Wedding festivities timeline */}
        <ScheduleTimeline />

        {/* Venue */}
        <VenueSection />

        {/* Dress code */}
        <DressCodePalette />

        {/* RSVP */}
        <div id="rsvp">
          <RSVPForm />
        </div>

        {/* Closing section */}
        <footer
          className="py-28 px-4 flex flex-col items-center select-text relative overflow-hidden"
          style={{ background: "linear-gradient(180deg,#2a1408 0%,#1a0d05 100%)" }}
        >
          {/* faint glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 20%, rgba(230,150,40,0.18) 0%, transparent 60%)" }}
          />

          <div className="relative w-full max-w-md text-center flex flex-col items-center">
            <Reveal scale={0.85} duration={0.8} className="mb-8 animate-float-soft">
              <MonogramBH size={104} />
            </Reveal>

            <h3 className="font-display italic text-3xl md:text-4xl text-gold-shimmer font-medium leading-tight mb-3">
              Thank You
            </h3>

            <p className="font-serif italic text-lg text-amber-50/80 mb-2">
              We can&apos;t wait to celebrate with you.
            </p>

            <p className="font-display text-2xl text-amber-50/90 italic font-light tracking-wide mt-4">
              Harshwardhan &amp; Bhumika
            </p>

            <button
              onClick={scrollToRSVP}
              className="mt-10 px-8 py-3 rounded-full bg-gold text-[#2a1408] font-sans text-sm font-semibold hover:bg-gold-soft active:scale-95 shadow-lg transition-premium select-none"
            >
              RSVP Now
            </button>

            <div className="flex flex-col items-center gap-1 mt-10 text-amber-50/55 text-xs">
              <span className="uppercase tracking-[0.2em]">For any queries</span>
              <span className="font-light">contact us at +91 00000 00000</span>
            </div>

            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-50/30 font-semibold mt-12">
              © 2026 Harshwardhan &amp; Bhumika · Made with love
            </span>
          </div>
        </footer>

      </div>
    </main>
  );
}
