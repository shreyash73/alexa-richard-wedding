"use client";

import Reveal from "@/components/Reveal";
import { Camera } from "lucide-react";

// Placeholder slides — swap `src` for real photographs when shared.
type Slide = { caption: string; tone: string };

const SLIDES: Slide[] = [
  { caption: "The proposal", tone: "linear-gradient(150deg,#f6d9a8,#e3a05a)" },
  { caption: "First look", tone: "linear-gradient(150deg,#f3c2b0,#c97a63)" },
  { caption: "Together", tone: "linear-gradient(150deg,#e8d7a0,#bf9a4a)" },
  { caption: "Our journey", tone: "linear-gradient(150deg,#dcc59a,#a98b52)" },
  { caption: "Engagement", tone: "linear-gradient(150deg,#f0c9a6,#cf8d5a)" },
  { caption: "Forever", tone: "linear-gradient(150deg,#eccfa9,#c79a3a)" },
];

// Duplicated once so the marquee can loop seamlessly at -50%.
const LOOP_SLIDES = [...SLIDES, ...SLIDES];

export default function PhotoSlider() {
  return (
    <section
      className="py-24 px-4 flex flex-col items-center overflow-hidden"
      style={{ backgroundColor: "#390000" }} // Matches the Venue Section and envelope backgrounds
    >
      <div className="w-full max-w-5xl">
        {/* Header */}
        <Reveal y={18} duration={0.8} className="text-center mb-12 px-4">
          <span className="text-xs uppercase tracking-[0.28em] text-[#e3c984] font-semibold">
            Moments
          </span>
          <h2 className="font-display italic text-4xl md:text-5xl text-white/90 mt-2">
            Our Story in Pictures
          </h2>
          <div className="ornament-divider mt-5 mx-auto max-w-xs text-[#e3c984]">
            <span className="text-lg">❀</span>
          </div>
        </Reveal>

        {/* Auto-sliding gallery track */}
        <div
          className="group relative w-full overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
            maskImage:
              "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        >
          <div className="flex gap-4 sm:gap-5 w-max animate-[marquee-slide_26s_linear_infinite] group-hover:[animation-play-state:paused]">
            {LOOP_SLIDES.map((slide, i) => (
              <figure
                key={i}
                className="group/tile relative overflow-hidden rounded-xl shadow-md border border-gold/20 shrink-0 w-56 sm:w-72 aspect-[3/4]"
                style={{ background: slide.tone }}
              >
                {/* Placeholder content — replace with <img> when photos arrive */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/85 select-none">
                  <Camera className="w-7 h-7 mb-2 opacity-70" strokeWidth={1.3} />
                  <span className="font-display italic text-lg drop-shadow-sm">{slide.caption}</span>
                </div>
                {/* Sheen sweep on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover/tile:translate-x-full transition-transform duration-[1100ms] ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                {/* Inset frame */}
                <div className="absolute inset-3 border border-white/25 rounded-lg pointer-events-none" />
              </figure>
            ))}
          </div>
        </div>

        <Reveal
          duration={0.8}
          delay={0.3}
          className="font-serif italic text-white/70 text-center text-base mt-10"
        >
          Every picture tells a part of our story — we can&apos;t wait to add you to it.
        </Reveal>
      </div>
    </section>
  );
}
