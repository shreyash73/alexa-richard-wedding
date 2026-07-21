"use client";

import Reveal from "@/components/Reveal";

// caption is used only as the image alt text — no visible overlay
type Slide = { caption: string; src: string };

const SLIDES: Slide[] = [
  { caption: "The proposal", src: "/alexa-richard-wedding/couple-1.webp" },
  { caption: "First look", src: "/alexa-richard-wedding/couple-2.webp" },
  { caption: "Together", src: "/alexa-richard-wedding/couple-3.webp" },
  { caption: "Our journey", src: "/alexa-richard-wedding/couple-4.webp" },
  { caption: "Engagement", src: "/alexa-richard-wedding/couple-5.webp" },
  { caption: "Forever", src: "/alexa-richard-wedding/couple-6.webp" },
  { caption: "Always", src: "/alexa-richard-wedding/couple-8.webp" },
];

// Duplicated once so the marquee can loop seamlessly at -50%.
const LOOP_SLIDES = [...SLIDES, ...SLIDES];

export default function PhotoSlider() {
  return (
    <section
      className="py-24 px-4 flex flex-col items-center overflow-hidden bg-maroon"
    >
      <div className="w-full max-w-5xl">
        {/* Header */}
        <Reveal y={18} duration={0.8} className="text-center mb-12 px-4">
          <h2 className="font-display italic text-5xl md:text-6xl text-white/90">
            Moments
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
              >
                <img
                  src={slide.src}
                  alt={slide.caption}
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover select-none"
                />
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
