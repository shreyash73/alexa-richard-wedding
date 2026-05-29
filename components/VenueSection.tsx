"use client";

import { motion } from "framer-motion";
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
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center md:items-start text-center md:text-left select-text"
          >
            <h3 className="font-serif italic text-3xl font-medium text-accent mb-3">
              Villa Borghese
            </h3>
            
            <div className="flex items-center gap-2 text-text-secondary text-base mb-6 font-light">
              <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
              <span>Address: Puerto Vallarta, MX</span>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed font-light mb-8 max-w-sm">
              Nestled along the golden sands and beautiful waters of Puerto Vallarta, Villa Borghese offers a private sanctuary with ocean breezes, gorgeous gardens, and stunning sunset views.
            </p>

            {/* Clickable Map Link */}
            <a
              href="https://maps.google.com/?q=Villa+Borghese+Puerto+Vallarta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-sans text-sm font-medium hover:bg-accent-hover active:scale-95 shadow-md shadow-accent/15 hover:shadow-lg transition-premium select-none"
            >
              <Navigation className="w-4 h-4 fill-current" />
              Get Directions
            </a>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-xl aspect-[4/3] w-full shadow-md border border-border/20 group"
          >
            <img
              src="https://static.tildacdn.net/tild3361-3537-4334-b532-323531306235/8cdb6addd9fcedfeb54b.jpg"
              alt="Villa Borghese"
              className="w-full h-full object-cover transition-premium group-hover:scale-105"
            />
            {/* Visual aesthetic corner borders */}
            <div className="absolute inset-4 border border-white/20 pointer-events-none rounded-lg" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
