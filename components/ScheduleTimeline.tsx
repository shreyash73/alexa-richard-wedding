"use client";

import { motion, Variants } from "framer-motion";
import { Clock, GlassWater, Landmark, Sparkles, Utensils, DoorOpen } from "lucide-react";

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: any;
}

const events: TimelineEvent[] = [
  {
    time: "16:30",
    title: "Opening of the doors",
    description: "Welcome guests and seating. Soft background instrumentals will set the mood.",
    icon: DoorOpen,
  },
  {
    time: "17:00",
    title: "Ceremony",
    description: "The exchange of vows and official union in the villa garden.",
    icon: Landmark,
  },
  {
    time: "18:00",
    title: "Cocktail and dancing time",
    description: "Raising a glass to the newly weds! Light refreshments, jazz tunes, and social hour.",
    icon: GlassWater,
  },
  {
    time: "20:00",
    title: "Dinner",
    description: "A candle-lit culinary feast of international and Mexican cuisines on the terrace.",
    icon: Utensils,
  },
  {
    time: "21:00",
    title: "Party and Open Bar",
    description: "Time to light up the dance floor! Professional DJ sets, signatures cocktails, and fun.",
    icon: Sparkles,
  },
  {
    time: "23:00",
    title: "End of the celebration",
    description: "A final grand farewell to our guests with sparkling lights.",
    icon: Clock,
  },
];

export default function ScheduleTimeline() {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="py-24 px-4 bg-bg-secondary flex flex-col items-center">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">
            The Big Day
          </span>
          <h2 className="font-serif italic text-4xl text-text-primary mt-2">
            Schedule of Events
          </h2>
        </div>

        {/* Vertical Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative pl-6 sm:pl-8 border-l border-accent/20 space-y-12 ml-2 sm:ml-6"
        >
          {events.map((event, idx) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative group select-text"
              >
                {/* Timeline node node indicator */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-accent flex items-center justify-center shadow-sm group-hover:bg-accent group-hover:text-white transition-premium z-10">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent group-hover:text-white transition-colors" />
                </div>

                {/* Event Card Content */}
                <div className="bg-white/60 hover:bg-white border border-border/40 hover:border-accent/15 p-6 rounded-lg shadow-sm hover:shadow-md transition-premium">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <span className="font-serif text-2xl font-semibold text-accent leading-none">
                      {event.time}
                    </span>
                    <h3 className="font-serif text-lg font-medium text-text-primary leading-tight sm:text-right">
                      {event.title}
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed font-light">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
