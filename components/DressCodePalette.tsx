"use client";

import { motion } from "framer-motion";

export default function DressCodePalette() {
  const circles = [
    { bg: "#f2cac9", label: "Pastel Pink" },
    { bg: "#d2dfe6", label: "Soft Blue" },
    { bg: "#ede5cc", label: "Sandy Beige" },
    { bg: "#dfc48e", label: "Warm Gold" },
    { bg: "#c4d3dc", label: "Muted Grey" },
  ];

  return (
    <section className="py-24 px-4 bg-bg-secondary flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">
            The Aesthetic
          </span>
          <h2 className="font-serif italic text-4xl text-text-primary mt-2">
            Dress Code
          </h2>
        </div>

        {/* Content Details */}
        <div className="flex flex-col items-center w-full max-w-2xl bg-white/60 hover:bg-white border border-border/30 rounded-2xl p-8 sm:p-12 shadow-sm transition-premium select-text">
          <p className="text-center text-sm text-text-secondary leading-relaxed font-light mb-8 max-w-md">
            We would be very happy if your outfit is in the colours of the wedding theme. Please use the palette below as your guide:
          </p>

          {/* Color Circles Image from Original */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[280px] aspect-[4.5] flex items-center justify-center mb-10 select-none"
          >
            <img
              src="https://static.tildacdn.net/tild3164-6534-4234-b037-396637343432/Group_23_6.png"
              alt="Wedding Theme Colors"
              className="w-full h-auto object-contain filter saturate-[0.95]"
            />
          </motion.div>

          {/* Interactive CSS Color Swatch Rows */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10 select-none">
            {circles.map((swatch, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className="w-8 h-8 rounded-full shadow-inner border border-black/5"
                  style={{ backgroundColor: swatch.bg }}
                />
                <span className="text-[10px] uppercase tracking-wider text-text-secondary font-light">
                  {swatch.label}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="w-full h-[1px] bg-border/60 mb-8" />

          {/* Dress Guidelines Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
            {/* Ladies */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <h4 className="font-serif italic text-xl font-medium text-accent mb-2">
                For Ladies
              </h4>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
                Elegant summer dresses in pastel tones. We recommend bringing a hat and sunglasses for outdoor comfort during the cocktail hour.
              </p>
            </div>

            {/* Gentlemen */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <h4 className="font-serif italic text-xl font-medium text-accent mb-2">
                For Gentlemen
              </h4>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
                Suits or shirts in classic shades. Grey, blue, brown, and beige are perfect choices for the outdoor setting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
