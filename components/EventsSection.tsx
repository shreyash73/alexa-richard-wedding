"use client";

/**
 * EventsSection — HALDI, SANGEET, WEDDING and RECEPTION cards, one per
 * screen, on the shared BH5 maroon gradient. Each scene is pinned and
 * scrubbed: the backdrop pushes in slowly while its single card reveals.
 * The push-in carries across scenes (1 → 1.24 in steps) so the four pins
 * read as one continuous dolly through the same frame.
 */

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const BG_SRC = "/bh5-bg.webp";

const EVENTS = [
  {
    key: "haldi",
    src: "/event-haldi.webp",
    alt: "Haldi — a morning of turmeric, laughter, sunshine, and blessings as we begin our celebrations in hues of yellow. Dress code: shades of yellow, ivory & orange. 11 November 2026, 1:00 PM onwards",
  },
  {
    key: "sangeet",
    src: "/event-sangeet.webp",
    alt: "Sangeet — an evening where music, dance, & unforgettable memories take center stage. Dress code: festive glamour — dark jewel tones, metallics & cocktail wear. 11 November 2026, 6:00 PM onwards",
  },
  {
    key: "wedding",
    src: "/event-wedding.webp",
    alt: "Wedding — two hearts, two families, and two journeys become one. Dress code: traditional elegance — Indian ethnic wear in rich, graceful. 12 November 2026, 10:00 AM onwards",
  },
  {
    key: "reception",
    src: "/event-reception.webp",
    alt: "Reception — an evening to meet the newlyweds, share your blessings, capture lasting memories, & enjoy a delightful dinner. Dress code: formal elegance — Indian or Western evening attire. 12 November 2026, 8:00 PM onwards",
  },
];

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
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".ev-scene").forEach((scene, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scene,
            start: "top top",
            end: "+=70%",
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
          },
        });

        // Continuous push-in handed from scene to scene (1 → 1.24)
        tl.fromTo(
          scene.querySelector(".ev-bg"),
          { scale: 1 + i * 0.06 },
          { scale: 1.06 + i * 0.06, ease: "none", duration: 1 },
          0
        ).fromTo(
          // Card reveals right as its scene takes over — no dead scroll
          scene.querySelector(".ev-card"),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, ease: "power1.out", duration: 0.25 },
          0
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef}>
      {EVENTS.map((ev) => (
        <section
          key={ev.key}
          className="ev-scene relative h-screen w-full overflow-hidden select-none"
        >
          {/* Deep maroon gradient backdrop — tonally continuous with the dark
              carpet edge the hero releases on above */}
          <img
            className="ev-bg"
            src={BG_SRC}
            alt=""
            aria-hidden="true"
            draggable={false}
            style={{ ...COVER_IMG, zIndex: 1 }}
          />

          {/* Single event card, centered */}
          <div
            className="ev-card absolute inset-0 z-[2] flex items-center justify-center"
            style={{ opacity: 0 }}
          >
            <img
              src={ev.src}
              alt={ev.alt}
              draggable={false}
              className="w-[78%] max-h-[86%] object-contain"
            />
          </div>
        </section>
      ))}
    </div>
  );
}
