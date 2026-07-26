"use client";

/**
 * CountdownSection — live countdown to the wedding festivities
 * (11 November 2026, IST). Sits between the event cards and the venue.
 *
 * Features an ambient, continuous golden glitter & bokeh particle canvas background
 * inspired by `glitters.mp4`, with particles floating upward, twinkling, and swaying softly.
 */

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";

const TARGET = new Date("2026-11-11T00:00:00+05:30").getTime();

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function remaining(): Parts {
  const ms = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  radius: number;
  speed: number;
  swayAmp: number;
  swaySpeed: number;
  phase: number;
  type: "spark" | "glitter" | "bokeh";
  opacity: number;
  baseOpacity: number;
  twinkleSpeed: number;
  color: string;
}

export default function CountdownSection() {
  const [parts, setParts] = useState<Parts | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Timer countdown hook
  useEffect(() => {
    setParts(remaining());
    const id = setInterval(() => setParts(remaining()), 1000);
    return () => clearInterval(id);
  }, []);

  // Continuous Golden Glitter & Bokeh Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const createParticle = (initY?: number): Particle => {
      const rand = Math.random();
      let type: "spark" | "glitter" | "bokeh" = "glitter";
      let radius = 2 + Math.random() * 4;
      let baseOpacity = 0.5 + Math.random() * 0.4;
      let speed = 0.4 + Math.random() * 0.7;

      if (rand < 0.35) {
        // Tiny crisp spark
        type = "spark";
        radius = 1 + Math.random() * 2.2;
        baseOpacity = 0.7 + Math.random() * 0.3;
        speed = 0.6 + Math.random() * 0.9;
      } else if (rand > 0.82) {
        // Large soft bokeh orb
        type = "bokeh";
        radius = 10 + Math.random() * 16;
        baseOpacity = 0.15 + Math.random() * 0.25;
        speed = 0.25 + Math.random() * 0.45;
      }

      const colors = [
        "255, 246, 218", // bright white gold
        "240, 212, 136", // soft gold
        "227, 201, 132", // warm gold
        "255, 215, 0",   // rich gold
        "255, 236, 179", // champagne
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const x = Math.random() * (width || 400);
      const y = initY !== undefined ? initY : (height || 600) + radius + 10;

      return {
        x,
        y,
        baseX: x,
        radius,
        speed,
        swayAmp: 10 + Math.random() * 30,
        swaySpeed: 0.008 + Math.random() * 0.015,
        phase: Math.random() * Math.PI * 2,
        type,
        opacity: baseOpacity,
        baseOpacity,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        color,
      };
    };

    let particles: Particle[] = [];

    const handleResize = () => {
      if (!sectionRef.current || !canvas) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Re-populate particles spanning the height initially
      const count = Math.min(80, Math.floor((width * height) / 6000));
      particles = Array.from({ length: count }, () =>
        createParticle(Math.random() * height)
      );
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    if (sectionRef.current) {
      resizeObserver.observe(sectionRef.current);
    }

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        if (!prefersReducedMotion) {
          // Ascend upward
          p.y -= p.speed;
          // Soft horizontal sway
          p.x = p.baseX + Math.sin(time * p.swaySpeed + p.phase) * p.swayAmp;

          // Twinkle / pulse opacity
          const twinkle = Math.sin(time * p.twinkleSpeed + p.phase);
          if (p.type === "spark") {
            p.opacity = p.baseOpacity * (0.4 + 0.6 * Math.abs(twinkle));
          } else {
            p.opacity = p.baseOpacity * (0.7 + 0.3 * twinkle);
          }

          // Reset particle to bottom when it exits top
          if (p.y < -p.radius * 2) {
            particles[i] = createParticle(height + p.radius + 10);
          }
        }

        // Draw particle based on type
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));

        if (p.type === "bokeh") {
          // Soft blurred orb
          const gradient = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, p.radius
          );
          gradient.addColorStop(0, `rgba(${p.color}, 0.8)`);
          gradient.addColorStop(0.5, `rgba(${p.color}, 0.3)`);
          gradient.addColorStop(1, `rgba(${p.color}, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "spark") {
          // Crisp sparkling spec with cross glow
          const grad = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, p.radius * 2.5
          );
          grad.addColorStop(0, "rgba(255, 255, 255, 1)");
          grad.addColorStop(0.3, `rgba(${p.color}, 0.9)`);
          grad.addColorStop(1, `rgba(${p.color}, 0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Standard glitter particle
          const grad = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, p.radius
          );
          grad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
          grad.addColorStop(0.4, `rgba(${p.color}, 0.85)`);
          grad.addColorStop(1, `rgba(${p.color}, 0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, []);

  const tiles = [
    { value: parts?.days, label: "Days" },
    { value: parts?.hours, label: "Hours" },
    { value: parts?.minutes, label: "Minutes" },
    { value: parts?.seconds, label: "Seconds" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 px-4 flex flex-col items-center text-center select-none bg-maroon"
    >
      {/* Warm golden ambient light source in the background matching glitters.mp4 */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(227, 201, 132, 0.18) 0%, rgba(200, 154, 58, 0.08) 45%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* HTML5 Canvas continuous floating glitter & bokeh animation */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-10 w-full h-full"
        aria-hidden="true"
      />

      {/* Content layout on top of the glitter animation */}
      <div className="relative z-20 w-full max-w-md flex flex-col items-center">
        <Reveal y={18} duration={0.8}>
          <h2
            className="text-[#e3c984] text-[40px] leading-tight drop-shadow-[0_2px_10px_rgba(227,201,132,0.3)]"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            The Countdown Begins
          </h2>
          <div className="ornament-divider mt-4 mx-auto max-w-xs text-[#e3c984]">
            <span className="text-lg">❀</span>
          </div>
        </Reveal>

        <Reveal y={26} duration={0.9} delay={0.2} className="w-full mt-10">
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 w-full">
            {tiles.map((t) => (
              <div
                key={t.label}
                className="flex flex-col items-center rounded-2xl border border-[#e3c984]/35 py-4 sm:py-5 backdrop-blur-xs transition-transform duration-300 hover:scale-105"
                style={{
                  background: "rgba(227, 201, 132, 0.08)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2), inset 0 0 15px rgba(227, 201, 132, 0.05)",
                }}
              >
                <span
                  className="font-display text-3xl sm:text-4xl text-white/95 tabular-nums drop-shadow-sm"
                  suppressHydrationWarning
                >
                  {t.value !== undefined && t.value !== null
                    ? String(t.value).padStart(2, "0")
                    : "--"}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#e3c984]/90 font-semibold mt-1.5">
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal duration={0.8} delay={0.35}>
          <p className="font-serif italic text-white/75 text-base mt-8 drop-shadow-sm">
            until the celebrations begin — 11 November 2026
          </p>
        </Reveal>
      </div>
    </section>
  );
}
