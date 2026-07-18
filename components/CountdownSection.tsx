"use client";

/**
 * CountdownSection — live countdown to the wedding festivities
 * (11 November 2026, IST). Sits between the event cards and the venue,
 * on the same deep maroon so the run of sections stays tonally continuous.
 */

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";

const TARGET = new Date("2026-11-11T00:00:00+05:30").getTime();

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function remaining(): Parts {
  const ms = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

export default function CountdownSection() {
  // Rendered only after mount so server and client markup never disagree
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(remaining());
    const id = setInterval(() => setParts(remaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const tiles = [
    { value: parts?.days, label: "Days" },
    { value: parts?.hours, label: "Hours" },
    { value: parts?.minutes, label: "Minutes" },
    { value: parts?.seconds, label: "Seconds" },
  ];

  return (
    <section
      className="py-24 px-4 flex flex-col items-center text-center select-none"
      style={{ backgroundColor: "#390000" }} // Matches Venue / PhotoSlider backdrop
    >
      <div className="w-full max-w-md flex flex-col items-center">
        <Reveal y={18} duration={0.8}>
          <span className="text-xs uppercase tracking-[0.28em] text-[#e3c984] font-semibold">
            Save Every Second
          </span>
          <h2
            className="text-[#e3c984] text-[40px] leading-tight mt-2"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            The Countdown Begins
          </h2>
          <div className="ornament-divider mt-4 mx-auto max-w-xs text-[#e3c984]">
            <span className="text-lg">❀</span>
          </div>
        </Reveal>

        <Reveal y={26} duration={0.9} delay={0.2} className="w-full mt-10">
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 w-full">
            {tiles.map((t) => (
              <div
                key={t.label}
                className="flex flex-col items-center rounded-2xl border border-[#e3c984]/35 py-4 sm:py-5"
                style={{ background: "rgba(227, 201, 132, 0.07)" }}
              >
                <span
                  className="font-display text-3xl sm:text-4xl text-white/95 tabular-nums"
                  suppressHydrationWarning
                >
                  {t.value !== undefined && t.value !== null
                    ? String(t.value).padStart(2, "0")
                    : "--"}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#e3c984]/90 font-semibold mt-1.5">
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal duration={0.8} delay={0.35}>
          <p className="font-serif italic text-white/70 text-base mt-8">
            until the celebrations begin — 11 November 2026
          </p>
        </Reveal>
      </div>
    </section>
  );
}
