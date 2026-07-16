"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COVER_SRC  = "/alexa-richard-wedding/closing-envelope-cover.webp";
const LETTER_SRC = "/alexa-richard-wedding/closing-envelope-letter.webp";
const FRONT_SRC  = "/alexa-richard-wedding/closing-envelope-front.webp";

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
      // Starts shifted down inside the front pocket, and slides up to reveal its content
      tl.fromTo(
        ".env-letter",
        { yPercent: 25 },
        { yPercent: -35, ease: "none", duration: 1 }
      );
    },
    { scope: sceneRef }
  );

  return (
    <section
      ref={sceneRef}
      className="relative h-screen w-full overflow-hidden select-none"
      style={{ backgroundColor: "#390000" }} // Matches the exact envelope background color
    >
      {/* 1. Envelope Back & Opened Flap Layer */}
      <img
        src={COVER_SRC}
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{ ...COVER_IMG, zIndex: 1 }}
      />

      {/* 2. Scroll-controlled Letter Card Layer */}
      <div
        className="env-letter"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
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

      {/* 3. Envelope Front Pocket Layer */}
      <img
        src={FRONT_SRC}
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{ ...COVER_IMG, zIndex: 3 }}
      />
    </section>
  );
}
