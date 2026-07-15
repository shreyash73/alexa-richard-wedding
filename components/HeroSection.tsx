"use client";

/**
 * HeroSection — the opening frame. Ambience (lantern sky, empty aisle) →
 * the couple at the balcony crossfades in on mount and simply stays put.
 * No ScrollTrigger, no pin — this scrolls normally like any other section;
 * Save the Date is its own section right after (see SaveTheDate.tsx).
 */

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronDown } from "lucide-react";

const BG_SRC = "/alexa-richard-wedding/main-bg-blur.webp";
const NAMES_SRC = "/alexa-richard-wedding/main-names.webp";

const COVER_IMG: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  userSelect: "none",
};

export default function HeroSection() {
  const sceneRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Entrance: the ambience settles as the envelope's light fades away,
      // the blurred backdrop fades out to reveal the sharp couple,
      // then the names rise in — all mount-time, nothing tied to scroll.
      gsap.fromTo(
        ".hero-img",
        { scale: 1.06, opacity: 1 },
        { scale: 1.00, opacity: 0, duration: 1.4, delay: 0.6, ease: "power2.out" }
      );
      gsap.from(".hero-names-img", {
        opacity: 0, y: 26, duration: 1.6, delay: 0.45, ease: "power2.out",
      });
    },
    { scope: sceneRef }
  );

  return (
    <section ref={sceneRef} className="relative h-screen w-full overflow-hidden select-none bg-transparent">
      {/* Clean lantern backdrop — visible immediately after the envelope opens, then fades out */}
      <img
        className="hero-img"
        src={BG_SRC}
        alt="Sky lanterns rising over a candle-lit aisle"
        draggable={false}
        style={{ ...COVER_IMG, zIndex: 1 }}
      />

      {/* Names lockup — centred over the sunset glow. Centering lives on the
          wrapper so GSAP can animate the inner img's transform freely. */}
      <div
        className="hero-names-wrap"
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          // Lockup canvas has generous transparent padding — oversizing past
          // the viewport keeps the actual text comfortably on screen
          width: "min(140%, 760px)", zIndex: 5, pointerEvents: "none",
        }}
      >
        <img
          className="hero-names-img"
          src={NAMES_SRC}
          alt="Bhumika with Harshwardhan"
          draggable={false}
          style={{ width: "100%", height: "auto", display: "block", userSelect: "none" }}
        />
      </div>

      {/* Scroll cue */}
      <div
        className="hero-cue absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        style={{ color: "rgba(255,244,222,0.85)" }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
}
