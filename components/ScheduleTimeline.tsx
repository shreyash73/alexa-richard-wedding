"use client";

import Reveal from "@/components/Reveal";
import { Sparkles, Music, Heart, GlassWater } from "lucide-react";

interface TimelineEvent {
  day: string;
  date: string;
  time: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
}

const events: TimelineEvent[] = [
  {
    day: "Day One",
    date: "11th November",
    time: "Morning",
    title: "Haldi",
    description:
      "A joyful morning ceremony where turmeric is lovingly applied to the bride and groom — blessings, laughter, and marigold all around.",
    icon: Sparkles,
    tone: "#e69a1f",
  },
  {
    day: "Day One",
    date: "11th November",
    time: "Evening",
    title: "Sangeet",
    description:
      "An evening of music, dance, and celebration as both families come together to sing, perform, and dance the night away.",
    icon: Music,
    tone: "#b5402f",
  },
  {
    day: "Day Two",
    date: "12th November",
    time: "Morning",
    title: "Wedding",
    description:
      "The sacred pheras and exchange of vows around the holy fire as Harshwardhan & Bhumika begin their journey together.",
    icon: Heart,
    tone: "#7a1f2b",
  },
  {
    day: "Day Two",
    date: "12th November",
    time: "Evening",
    title: "Reception",
    description:
      "A grand evening of feasting, toasts, and revelry to celebrate the newlyweds with all our beloved family and friends.",
    icon: GlassWater,
    tone: "#7e8b52",
  },
];

export default function ScheduleTimeline() {
  return (
    <section className="py-24 px-4 bg-bg-secondary flex flex-col items-center">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">
            The Celebrations
          </span>
          <h2 className="font-display italic text-4xl md:text-5xl text-text-primary mt-2">
            Wedding Festivities
          </h2>
          <div className="ornament-divider mt-5 mx-auto max-w-xs">
            <span className="text-lg">✦</span>
          </div>
        </div>

        {/* Vertical Timeline — each entry reveals as it scrolls into view */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-gold/30 space-y-12 ml-2 sm:ml-6">
          {events.map((event, idx) => {
            const Icon = event.icon;
            return (
              <Reveal
                key={idx}
                y={30}
                duration={0.8}
                delay={idx * 0.12}
                className="relative group select-text"
              >
                {/* Timeline node */}
                <div
                  className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 flex items-center justify-center shadow-sm transition-premium z-10"
                  style={{ borderColor: event.tone, color: event.tone }}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                {/* Card */}
                <div
                  className="bg-white/70 hover:bg-white border border-gold/15 p-6 rounded-xl shadow-sm hover:shadow-md transition-premium"
                  style={{ borderLeftWidth: 3, borderLeftColor: event.tone }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <span
                      className="font-display italic text-2xl font-semibold leading-none"
                      style={{ color: event.tone }}
                    >
                      {event.title}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-text-secondary font-semibold sm:text-right">
                      {event.date} · {event.time}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed font-light mt-2">
                    {event.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
