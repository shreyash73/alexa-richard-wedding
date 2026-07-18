"use client";

/**
 * HeroSection — the opening frame. Right after the envelope, a soft intro
 * moment: the blurred lantern backdrop with the couple's typo centred on
 * it, held for a breath — then both dissolve to reveal the sharp scene
 * and the names lockup rises in. No ScrollTrigger, no pin — this scrolls
 * normally; Save the Date is its own section right after (SaveTheDate.tsx).
 */

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronDown } from "lucide-react";

const BG_SRC = "/alexa-richard-wedding/main-bg-blur.webp";
const INTRO_TYPO_SRC = "/alexa-richard-wedding/intro-typo.webp";

// Lantern layers — full-canvas cutouts sharing the hero's 9:16 frame, each
// holding one or two lanterns so they can drift independently
const LANTERN_SRCS = [
  "/alexa-richard-wedding/lantern-1.webp",
  "/alexa-richard-wedding/lantern-2.webp",
  "/alexa-richard-wedding/lantern-3.webp",
  "/alexa-richard-wedding/lantern-4.webp",
  "/alexa-richard-wedding/lantern-5.webp",
];
// Per-layer flight time (s) and phase (fraction of the cycle) so the sky
// never empties or syncs
const LANTERN_FLIGHT = [44, 52, 38, 58, 48];
const LANTERN_PHASE  = [0.1, 0.5, 0.3, 0.7, 0.9];

// How long the blur + typo intro holds before dissolving to the sharp hero
const INTRO_HOLD = 1;

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
      // Entrance: the blurred backdrop arrives with the intro typo centred
      // on it, holds for a breath, then both dissolve — the sharp couple
      // emerges and the names lockup rises in. All mount-time.
      gsap.from(".hero-intro-typo", {
        opacity: 0, y: 22, duration: 1.1, delay: 0.25, ease: "power2.out",
      });
      gsap.fromTo(
        ".hero-img",
        { scale: 1.06, opacity: 1 },
        { scale: 1.00, opacity: 0, duration: 1.5, delay: INTRO_HOLD, ease: "power2.inOut" }
      );
      gsap.to(".hero-intro-typo", {
        opacity: 0, duration: 0.9, delay: INTRO_HOLD, ease: "power1.inOut",
      });
      gsap.from(".hero-cue", {
        opacity: 0, duration: 1.0, delay: INTRO_HOLD + 1.0, ease: "power1.out",
      });

      // Lanterns fly up — each layer fades in at its designed mid-sky spot
      // and drifts slowly up and off the top, then reappears there; negative
      // delays start the loops mid-flight so the sky is alive immediately.
      gsap.utils.toArray<HTMLElement>(".hero-lantern").forEach((el, i) => {
        const tl = gsap.timeline({
          repeat: -1,
          delay: -LANTERN_PHASE[i] * LANTERN_FLIGHT[i],
        });
        tl.fromTo(
          el,
          { opacity: 0 },
          { opacity: 1, duration: 3, ease: "power1.out" },
          0
        ).fromTo(
          el,
          { yPercent: 0 },
          // -75% is just past off-screen for every lantern position — a
          // shorter cycle keeps more lanterns in view at once
          { yPercent: -75, duration: LANTERN_FLIGHT[i], ease: "none" },
          0
        );
        gsap.to(el, {
          xPercent: i % 2 ? 1.8 : -1.8,
          rotation: i % 2 ? 2 : -2,
          duration: 3.2 + i * 0.7,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    },
    { scope: sceneRef }
  );

  return (
    <section ref={sceneRef} className="relative h-screen w-full overflow-hidden select-none bg-transparent">
      {/* Flying lanterns — above the (lantern-free) shared backdrop, below
          the blur intro */}
      {LANTERN_SRCS.map((src) => (
        <img
          key={src}
          className="hero-lantern"
          src={src}
          alt=""
          aria-hidden="true"
          draggable={false}
          style={{ ...COVER_IMG, zIndex: 1, pointerEvents: "none", willChange: "transform" }}
        />
      ))}

      {/* Blurred lantern backdrop — the intro screen right after the
          envelope opens; dissolves to reveal the sharp scene beneath */}
      <img
        className="hero-img"
        src={BG_SRC}
        alt="Sky lanterns rising over a candle-lit aisle"
        draggable={false}
        style={{ ...COVER_IMG, zIndex: 2 }}
      />

      {/* Intro typo — BHUMIKA ♥ HARSHWARDHAN, centred on the blur screen;
          fades away together with it */}
      <img
        className="hero-intro-typo"
        src={INTRO_TYPO_SRC}
        alt="Bhumika and Harshwardhan"
        draggable={false}
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(72%, 420px)", height: "auto",
          zIndex: 2, pointerEvents: "none", userSelect: "none",
        }}
      />

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
