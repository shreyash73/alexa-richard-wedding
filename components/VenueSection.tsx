"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MapPin, Navigation } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MAP_URL = "https://maps.google.com/?q=36+Fort,+Balod+Road,+Koihapuri,+Durg,+Chhattisgarh";

export default function VenueSection() {
  const sceneRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Seq entry animations using ScrollTrigger
      const triggerOpts = {
        trigger: sceneRef.current,
        start: "top 80%",
      };

      gsap.fromTo(
        ".venue-title",
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", scrollTrigger: triggerOpts }
      );

      gsap.fromTo(
        ".venue-subtitle",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.2, delay: 0.25, ease: "power3.out", scrollTrigger: triggerOpts }
      );

      gsap.fromTo(
        ".venue-address",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.45, ease: "power3.out", scrollTrigger: triggerOpts }
      );

      gsap.fromTo(
        ".venue-btn",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.0, delay: 0.65, ease: "power3.out", scrollTrigger: triggerOpts }
      );

      gsap.fromTo(
        ".venue-card",
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, delay: 0.85, ease: "back.out(1.5)", scrollTrigger: triggerOpts }
      );
    },
    { scope: sceneRef }
  );

  return (
    <section
      ref={sceneRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-28 px-4 text-center select-none"
      style={{ backgroundColor: "#390000" }} // Exact deep maroon sampled from mockup
    >
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Title */}
        <h2 className="venue-title font-serif text-[21px] tracking-[0.25em] text-[#e3c984] uppercase font-semibold mb-2">
          THE LOCATION
        </h2>

        {/* Subtitle in elegant script font */}
        <h3
          className="venue-subtitle text-[#e3c984] text-[42px] leading-tight mb-8"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Celebration Venue
        </h3>

        {/* Address text */}
        <p className="venue-address font-serif text-white/90 text-[19px] leading-[1.6] tracking-wide mb-8">
          36 Fort, Balod Road,<br />
          Koihapuri, Durg,<br />
          Chhattisgarh
        </p>

        {/* Get directions pill button */}
        <a
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="venue-btn inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#e3c984] text-[#390000] font-sans text-sm font-semibold hover:scale-[1.03] active:scale-[0.97] transition-premium shadow-md mb-10 cursor-pointer select-none"
        >
          <Navigation
            className="w-3.5 h-3.5 fill-[#390000] stroke-[#390000]"
            style={{ transform: "rotate(45deg)" }}
          />
          Get Directions
        </a>

        {/* View on Map card */}
        <a
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="venue-card relative w-full max-w-[340px] aspect-[1.1] rounded-3xl border-2 border-[#b8860b]/60 flex flex-col items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-premium shadow-lg cursor-pointer select-none"
          style={{ backgroundColor: "rgba(227, 201, 132, 0.92)" }} // Warm gold/tan background
        >
          {/* Inner inset border line */}
          <div className="absolute inset-3 border border-[#b8860b]/30 rounded-[20px] pointer-events-none" />

          {/* Map Pin icon */}
          <MapPin className="w-12 h-12 text-[#b5402f] mb-1" strokeWidth={1.5} />

          {/* View on Map text */}
          <span
            className="font-serif italic text-3xl font-semibold"
            style={{ color: "#390000" }}
          >
            View on Map
          </span>
        </a>
      </div>
    </section>
  );
}
