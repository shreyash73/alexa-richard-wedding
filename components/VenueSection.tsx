"use client";

import Reveal from "@/components/Reveal";
import { MapPin, Navigation } from "lucide-react";

export default function VenueSection() {
  return (
    <section className="py-24 px-4 bg-bg-primary flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">
            The Location
          </span>
          <h2 className="font-serif italic text-4xl text-text-primary mt-2">
            Wedding Venue
          </h2>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full bg-bg-secondary/40 border border-border/30 rounded-2xl p-6 sm:p-10 shadow-sm">
          {/* Text content side */}
          <Reveal
            x={-30}
            duration={0.8}
            className="flex flex-col items-center md:items-start text-center md:text-left select-text"
          >
            <h3 className="font-display italic text-3xl font-medium text-accent mb-3">
              The Grand Banquet
            </h3>

            <div className="flex items-center gap-2 text-text-secondary text-base mb-6 font-light">
              <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
              <span>Address: To be announced</span>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed font-light mb-8 max-w-sm">
              Set amidst lush gardens and warm festive lights, our venue offers a graceful setting for every celebration — from the bright morning Haldi to the grand Reception evening. Detailed directions will be shared soon.
            </p>

            {/* Clickable Map Link */}
            <a
              href="https://maps.google.com/?q=wedding+venue"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-sans text-sm font-medium hover:bg-accent-hover active:scale-95 shadow-md shadow-accent/15 hover:shadow-lg transition-premium select-none"
            >
              <Navigation className="w-4 h-4 fill-current" />
              Get Directions
            </a>
          </Reveal>

          {/* Image side */}
          <Reveal
            scale={0.98}
            duration={0.8}
            className="relative overflow-hidden rounded-xl aspect-[4/3] w-full shadow-md border border-gold/20 group flex items-center justify-center"
            style={{ background: "linear-gradient(150deg,#f3c87f,#d98a3f)" }}
          >
            <div className="flex flex-col items-center text-white/90 select-none">
              <MapPin className="w-9 h-9 mb-2 opacity-80" strokeWidth={1.3} />
              <span className="font-display italic text-2xl drop-shadow-sm">Venue Map</span>
              <span className="text-[11px] uppercase tracking-[0.2em] mt-1 opacity-80">Coming soon</span>
            </div>
            {/* Visual aesthetic corner borders */}
            <div className="absolute inset-4 border border-white/25 pointer-events-none rounded-lg" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
