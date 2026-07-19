"use client";

/**
 * InvitationSection — the formal invitation artwork, full screen, between
 * Save the Date and the photo slider. The art carries its own deep maroon,
 * so the section reads as continuous with the sections around it.
 */

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const INVITATION_SRC = "/alexa-richard-wedding/invitation.webp";

export default function InvitationSection() {
  const sceneRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Gentle rise + settle as the invitation scrolls into view
      gsap.fromTo(
        ".invitation-art",
        { opacity: 0, y: 36, scale: 1.03 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: sceneRef.current, start: "top 75%" },
        }
      );
    },
    { scope: sceneRef }
  );

  return (
    <section
      ref={sceneRef}
      className="relative h-screen w-full overflow-hidden select-none"
      style={{ backgroundColor: "#390000" }} // Matches the surrounding maroon while loading
    >
      <img
        className="invitation-art"
        src={INVITATION_SRC}
        alt="With hearts full of joy and gratitude, Mr Hansraj Vaidya warmly invites you to join us in celebrating the wedding of his beloved daughter Bhumika Vaidya with Harshwardhan Pagare, beloved son of Mr Ravindra Pagare & Dr Savita Nikale"
        draggable={false}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          userSelect: "none",
        }}
      />
    </section>
  );
}
