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
const NAMES_SKY_SRC = "/alexa-richard-wedding/hero-names-sky.webp";

// Lantern layers — full-canvas cutouts sharing the hero's 9:16 frame, each
// holding one or two lanterns. Each of the 5 source images is reused twice
// (10 flying lanterns total) with its own horizontal lane, flight speed and
// phase so the sky reads as busy and no two lanterns move in lockstep.
const BASE_LANTERN_SRCS = [
  "/alexa-richard-wedding/lantern-1.webp",
  "/alexa-richard-wedding/lantern-2.webp",
  "/alexa-richard-wedding/lantern-3.webp",
  "/alexa-richard-wedding/lantern-4.webp",
  "/alexa-richard-wedding/lantern-5.webp",
];
const LANTERN_INSTANCES = [
  { src: BASE_LANTERN_SRCS[0], flight: 34, phase: 0.02, xShift: -16 },
  { src: BASE_LANTERN_SRCS[1], flight: 46, phase: 0.12, xShift: 12 },
  { src: BASE_LANTERN_SRCS[2], flight: 30, phase: 0.22, xShift: -7 },
  { src: BASE_LANTERN_SRCS[3], flight: 52, phase: 0.32, xShift: 18 },
  { src: BASE_LANTERN_SRCS[4], flight: 40, phase: 0.42, xShift: -20 },
  { src: BASE_LANTERN_SRCS[0], flight: 48, phase: 0.52, xShift: 9 },
  { src: BASE_LANTERN_SRCS[1], flight: 36, phase: 0.62, xShift: -11 },
  { src: BASE_LANTERN_SRCS[2], flight: 56, phase: 0.72, xShift: 20 },
  { src: BASE_LANTERN_SRCS[3], flight: 32, phase: 0.82, xShift: -4 },
  { src: BASE_LANTERN_SRCS[4], flight: 44, phase: 0.92, xShift: 14 },
];

// How long the blur + typo intro holds before dissolving to the sharp hero
const INTRO_HOLD = 2.25;

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
      // (offset into its own horizontal lane via xShift) and drifts slowly
      // up and off the top, then reappears there; negative delays start the
      // loops mid-flight so the sky is alive with lanterns immediately.
      gsap.utils.toArray<HTMLElement>(".hero-lantern").forEach((el, i) => {
        const { flight, phase, xShift } = LANTERN_INSTANCES[i];
        gsap.set(el, { xPercent: xShift });

        const tl = gsap.timeline({ repeat: -1, delay: -phase * flight });
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
          { yPercent: -75, duration: flight, ease: "none" },
          0
        );
        gsap.to(el, {
          xPercent: xShift + (i % 2 ? 1.8 : -1.8),
          rotation: i % 2 ? 2 : -2,
          duration: 3.2 + i * 0.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      // Sky names — fades in together with the sharp scene, sitting above
      // the lanterns so their flight path never covers the text
      gsap.to(".hero-names-sky", {
        opacity: 1, duration: 1.2, delay: INTRO_HOLD, ease: "power2.out",
      });
    },
    { scope: sceneRef }
  );

  return (
    <section ref={sceneRef} className="relative h-screen w-full overflow-hidden select-none bg-transparent">
      {/* Flying lanterns — above the shared backdrop, below the sky names
          and the blur intro, so their flight path never covers the text */}
      {LANTERN_INSTANCES.map((inst, i) => (
        <img
          key={`${inst.src}-${i}`}
          className="hero-lantern"
          src={inst.src}
          alt=""
          aria-hidden="true"
          draggable={false}
          style={{ ...COVER_IMG, zIndex: 1, pointerEvents: "none", willChange: "transform" }}
        />
      ))}

      {/* Sky names — BHUMIKA with HARSHWARDHAN, sitting above the flying
          lanterns so they pass behind the text, never over it */}
      <img
        className="hero-names-sky"
        src={NAMES_SKY_SRC}
        alt="Bhumika with Harshwardhan"
        draggable={false}
        style={{
          position: "absolute",
          left: "24.8%", top: "13.9%", width: "50.4%", height: "auto",
          zIndex: 3, opacity: 0, pointerEvents: "none", userSelect: "none",
        }}
      />

      {/* Blurred lantern backdrop — the intro screen right after the
          envelope opens; dissolves to reveal the sharp scene beneath */}
      <img
        className="hero-img"
        src={BG_SRC}
        alt="Sky lanterns rising over a candle-lit aisle"
        draggable={false}
        style={{ ...COVER_IMG, zIndex: 4 }}
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
          zIndex: 5, pointerEvents: "none", userSelect: "none",
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
