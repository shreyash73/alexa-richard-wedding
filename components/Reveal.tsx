"use client";

/**
 * Reveal — scroll-triggered entrance wrapper (replaces framer-motion's
 * `initial` / `whileInView` pattern with GSAP ScrollTrigger).
 *
 * Wrap any element:
 *   <Reveal y={30} delay={0.2}><h2>…</h2></Reveal>
 *
 * The from-state is described by props (y/x/scale/rotate); Reveal animates
 * to the identity transform + opacity 1 the first time the wrapper enters
 * the viewport.
 */

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Reveal({
  children,
  className,
  style,
  y = 0,
  x = 0,
  scale = 1,
  rotate = 0,
  duration = 0.8,
  delay = 0,
  ease = "power3.out",
  start = "top 88%",
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  y?: number;
  x?: number;
  scale?: number;
  rotate?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y, x, scale, rotate },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotate: 0,
          duration,
          delay,
          ease,
          scrollTrigger: { trigger: ref.current, start, once: true },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className} style={{ opacity: 0, ...style }}>
      {children}
    </div>
  );
}
