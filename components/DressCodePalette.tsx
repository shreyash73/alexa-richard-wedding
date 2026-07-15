"use client";

import Reveal from "@/components/Reveal";

export default function DressCodePalette() {
  const circles = [
    { bg: "#e69a1f", label: "Marigold" },
    { bg: "#b5402f", label: "Terracotta" },
    { bg: "#7a1f2b", label: "Deep Maroon" },
    { bg: "#c79a3a", label: "Antique Gold" },
    { bg: "#7e8b52", label: "Sage" },
  ];

  return (
    <section className="py-24 px-4 bg-bg-secondary flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">
            The Aesthetic
          </span>
          <h2 className="font-display italic text-4xl md:text-5xl text-text-primary mt-2">
            Dress Code
          </h2>
          <div className="ornament-divider mt-5 mx-auto max-w-xs">
            <span className="text-lg">✦</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center w-full max-w-2xl bg-white/70 hover:bg-white border border-gold/20 rounded-2xl p-8 sm:p-12 shadow-sm transition-premium select-text">
          <p className="text-center text-sm text-text-secondary leading-relaxed font-light mb-10 max-w-md">
            We would be delighted to see you dressed in festive Indian attire. Let these warm, vibrant tones inspire your outfits across the celebrations:
          </p>

          {/* Color swatches */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 mb-10 select-none">
            {circles.map((swatch, idx) => (
              <Reveal key={idx} scale={0.6} duration={0.5} delay={idx * 0.08}>
                {/* hover lift lives on the child so it doesn't fight the
                    entrance transform GSAP leaves on the wrapper */}
                <div className="flex flex-col items-center gap-2 transition-transform duration-300 hover:scale-110 hover:-translate-y-1">
                  <div
                    className="w-12 h-12 rounded-full shadow-md border-2 border-white"
                    style={{ backgroundColor: swatch.bg, boxShadow: `0 4px 14px ${swatch.bg}55` }}
                  />
                  <span className="text-[10px] uppercase tracking-wider text-text-secondary font-medium">
                    {swatch.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="w-full h-[1px] bg-gold/25 mb-8" />

          {/* Guidelines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <h4 className="font-display italic text-xl font-medium text-accent mb-2">
                For Ladies
              </h4>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
                Sarees, lehengas, or anarkalis in bright festive hues. Bright florals for the Haldi, and your finest silks and jewellery for the Wedding & Reception.
              </p>
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <h4 className="font-display italic text-xl font-medium text-accent mb-2">
                For Gentlemen
              </h4>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
                Kurtas and sherwanis in warm tones. Keep it light and colourful for the daytime functions, and go regal for the evening celebrations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
