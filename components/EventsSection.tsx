"use client";

/**
 * EventsSection — HALDI and SANGEET cards on the BH5 maroon gradient.
 * Pinned, scrubbed: the backdrop pushes in slowly while the two clipped
 * typo cards reveal in sequence (HALDI first, then SANGEET).
 */

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const BG_SRC   = "/alexa-richard-wedding/bh5-bg.webp";
const TYPO_SRC = "/alexa-richard-wedding/bh4-typo.webp";

const COVER_IMG: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  userSelect: "none",
};

export default function EventsSection() {
  const sceneRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Single pinned, scrubbed timeline (a second trigger on the same
      // pinned element would mis-compute its positions). Shorter pin +
      // near-immediate card start so HALDI appears right as the section
      // takes over, instead of after a long dead scroll.
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

      // Gentle continuous push-in on the backdrop for depth while pinned
      tl.fromTo(".ev-carpet", { scale: 1 }, { scale: 1.06, ease: "none", duration: 1 }, 0)
        // HALDI card first — starts almost immediately…
        .fromTo(
          ".typo-haldi",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, ease: "power1.out", duration: 0.30 },
          0.04
        )
        // …then SANGEET follows right after, well before the pin ends
        .fromTo(
          ".typo-sangeet",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, ease: "power1.out", duration: 0.30 },
          0.42
        );
    },
    { scope: sceneRef }
  );

  return (
    <section ref={sceneRef} className="relative h-screen w-full overflow-hidden select-none">
      {/* Deep maroon gradient backdrop — tonally continuous with the dark
          carpet edge the hero releases on above */}
      <img
        className="ev-carpet"
        src={BG_SRC}
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{ ...COVER_IMG, zIndex: 1 }}
      />

      {/* Event cards — same typo canvas rendered twice, clipped per card */}
      <div
        className="typo-haldi"
        style={{ position: "absolute", inset: 0, zIndex: 2,
          clipPath: "inset(0% 0% 48% 0%)", opacity: 0 }}
      >
        <img
          src={TYPO_SRC}
          alt="Haldi — golden traditions, brighter beginnings. 11 November 2026, 1:00 PM onwards"
          draggable={false}
          style={COVER_IMG}
        />
      </div>
      <div
        className="typo-sangeet"
        style={{ position: "absolute", inset: 0, zIndex: 2,
          clipPath: "inset(52% 0% 0% 0%)", opacity: 0 }}
      >
        <img
          src={TYPO_SRC}
          alt="Sangeet — a night of music, laughter and togetherness. 11 November 2026, 6:00 PM onwards"
          draggable={false}
          style={COVER_IMG}
        />
      </div>
    </section>
  );
}
