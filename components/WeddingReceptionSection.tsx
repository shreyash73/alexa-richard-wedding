"use client";

/**
 * WeddingReceptionSection — WEDDING and RECEPTION cards, continuing straight
 * on from EventsSection's BH5 gradient. Same background image as the Haldi/
 * Sangeet section, so there is no seam to match — the backdrop's push-in
 * picks up exactly where that section's left off (scale 1.06 → 1.12) so the
 * two pinned scenes read as one uninterrupted dolly through the same frame.
 */

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const BG_SRC   = "/alexa-richard-wedding/bh5-bg.webp";
const TYPO_SRC = "/alexa-richard-wedding/bh5-typo.webp";

const COVER_IMG: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  userSelect: "none",
};

export default function WeddingReceptionSection() {
  const sceneRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "top top",
          end: "+=130%",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Picks up the push-in where EventsSection left off (1.06) so the
      // shared background never visibly "resets" at the section boundary
      tl.fromTo(".wr-bg", { scale: 1.06 }, { scale: 1.12, ease: "none", duration: 1 }, 0)
        // WEDDING card first — near-immediate, same cadence as Haldi/Sangeet
        .fromTo(
          ".typo-wedding",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, ease: "power1.out", duration: 0.30 },
          0.04
        )
        // …then RECEPTION follows
        .fromTo(
          ".typo-reception",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, ease: "power1.out", duration: 0.30 },
          0.42
        );
    },
    { scope: sceneRef }
  );

  return (
    <section ref={sceneRef} className="relative h-screen w-full overflow-hidden select-none">
      {/* Same BH5 gradient as the Haldi/Sangeet section — continuous, not a
          new backdrop */}
      <img
        className="wr-bg"
        src={BG_SRC}
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{ ...COVER_IMG, zIndex: 1 }}
      />

      {/* Event cards — same typo canvas rendered twice, clipped per card */}
      <div
        className="typo-wedding"
        style={{ position: "absolute", inset: 0, zIndex: 2,
          clipPath: "inset(0% 0% 56% 0%)", opacity: 0 }}
      >
        <img
          src={TYPO_SRC}
          alt="Wedding — the day we say forever. 12 November 2026, 10:00 AM onwards"
          draggable={false}
          style={COVER_IMG}
        />
      </div>
      <div
        className="typo-reception"
        style={{ position: "absolute", inset: 0, zIndex: 2,
          clipPath: "inset(46% 0% 0% 0%)", opacity: 0 }}
      >
        <img
          src={TYPO_SRC}
          alt="Reception — a beautiful ending to a perfect beginning. 12 November 2026, 8:00 PM onwards"
          draggable={false}
          style={COVER_IMG}
        />
      </div>
    </section>
  );
}
