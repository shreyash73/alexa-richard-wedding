"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COVER_SRC = "/closing-envelope-cover.webp";
const LETTER_SRC = "/closing-envelope-letter.webp";
const FRONT_SRC = "/closing-envelope-front.webp";

const COVER_IMG: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  userSelect: "none",
};

export default function ClosingEnvelope() {
  const sceneRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Pinned ScrollTrigger for a seamless envelope slide out
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

      // Animate the letter sliding out from inside the pocket:
      // Starts tucked down inside the pocket (bottom clipped at the envelope
      // edge, top just peeking above the flap) and rises so the full message
      // lands in the clear zone above the pocket. End value keeps the card's
      // bottom edge behind the pocket's solid fold so it never floats free.
      tl.fromTo(
        ".env-letter",
        { yPercent: 14 },
        { yPercent: -8, ease: "none", duration: 1 }
      );
    },
    { scope: sceneRef }
  );

  return (
    <section
      ref={sceneRef}
      className="relative h-screen w-full overflow-hidden select-none bg-maroon"
    >
      {/* Shifts the whole envelope composition up so it reads as centered
          rather than pinned to the bottom of the screen */}
      <div style={{ position: "absolute", inset: 0, transform: "translateY(-20%)" }}>
        {/* 1. Envelope Back & Opened Flap Layer */}
        <img
          src={COVER_SRC}
          alt=""
          aria-hidden="true"
          draggable={false}
          style={{ ...COVER_IMG, zIndex: 1 }}
        />

        {/* 2. Scroll-controlled Letter Card Layer.
            The wrapper clips the card to the envelope's bottom edge (~99.4% of
            the frame) so the letter can never spill out below the envelope — it
            only ever emerges upward from inside the pocket. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            clipPath: "inset(0 0 0.6% 0)",
          }}
        >
          <div
            className="env-letter"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <img
              src={LETTER_SRC}
              alt="Dear family and friends, A journey of a thousand moments begins with one beautiful promise..."
              draggable={false}
              style={COVER_IMG}
            />
          </div>
        </div>

        {/* 3. Envelope Front Pocket Layer */}
        <img
          src={FRONT_SRC}
          alt=""
          aria-hidden="true"
          draggable={false}
          style={{ ...COVER_IMG, zIndex: 3 }}
        />
      </div>
    </section>
  );
}
