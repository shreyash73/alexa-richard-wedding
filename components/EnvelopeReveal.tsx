"use client";

/**
 * EnvelopeReveal — full-screen envelope opening built from the couple's
 * "Open 4" artwork:
 *   "Open 4v"   — the composed closed envelope, the first screen
 *   "Open 4-1"  — transparent flap cutout with the BH wax seal, the
 *                 3D piece that peels open (hinged at the top edge)
 *   "Open 4-2"  — first stage of the light effect revealed underneath
 *   "Open 4-2.1"— second, fully blanched stage the scene builds to
 * Tap anywhere → the closed art dissolves into the lit envelope as the
 * flap peels back, light bleeding out of the mouth as it lifts → a bright
 * flash as it fully opens → the site.
 *
 * All images share one 9:16 canvas, so identical full-screen
 * object-fit:cover rendering keeps them pixel-registered at any viewport.
 * On phone aspect ratios the image height fits exactly, putting the flap
 * hinge (canvas top) at the screen top edge.
 */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CLOSED_SRC = "/alexa-richard-wedding/envelope-closed.webp";
const BODY_SRC   = "/alexa-richard-wedding/envelope-body.webp";
const FLAP_SRC   = "/alexa-richard-wedding/envelope-flap.webp";
const LIGHT_SRC  = "/alexa-richard-wedding/envelope-light.webp";

const COVER_IMG: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  userSelect: "none",
};

interface EnvelopeRevealProps {
  onOpenComplete: () => void;
  onPlayMusic?: () => void;
}

export default function EnvelopeReveal({ onOpenComplete, onPlayMusic }: EnvelopeRevealProps) {
  const [mounted, setMounted] = useState(false);
  const [triggered, setTriggered] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const ready = loadedCount >= 2; // closed art + flap decoded

  const overlayRef = useRef<HTMLDivElement>(null);
  const sceneRef   = useRef<HTMLDivElement>(null);
  const closedRef  = useRef<HTMLImageElement>(null);
  const flapRef    = useRef<HTMLDivElement>(null);
  const lightRef   = useRef<HTMLImageElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);
  const flashRef   = useRef<HTMLDivElement>(null);
  const bloomRef   = useRef<HTMLDivElement>(null);
  const mainTlRef  = useRef<gsap.core.Timeline | null>(null);
  const idleTlRef  = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => { setMounted(true); }, []);

  // Fade the scene in once the artwork has decoded (no half-loaded pop-in)
  useEffect(() => {
    if (!ready) return;
    gsap.to(sceneRef.current, { opacity: 1, duration: 0.35, ease: "power1.out" });
  }, [ready]);

  // Idle breathing — the closed envelope swells almost imperceptibly, like
  // paper catching candlelight; real stationery never sits perfectly still.
  useEffect(() => {
    if (!mounted || !ready) return;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(closedRef.current, { scale: 1.012, duration: 2.6, ease: "sine.inOut" });
    idleTlRef.current = tl;
    return () => { tl.kill(); };
  }, [mounted, ready]);

  useEffect(() => {
    if (!mounted) return;
    gsap.set(bloomRef.current, { opacity: 0 });
    gsap.set(flashRef.current, { opacity: 0 });
    gsap.set(glowRef.current, { opacity: 0, scale: 0.55, transformOrigin: "50% 35%" });
    // Light stages are full-frame artwork sharing one canvas — they must
    // never scale, or their baked text drifts against each other
    gsap.set(lightRef.current, { opacity: 0 });
    // The flap starts hidden behind the composed closed art, already in place
    gsap.set(flapRef.current, { opacity: 0 });

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        onOpenComplete();
        onPlayMusic?.();
      },
    });

    // Phase 1: the closed artwork dissolves into the lit envelope (4-2)
    // while the real flap takes over from the baked one, perfectly aligned
    tl.set(flapRef.current, { opacity: 1 })
      .to(closedRef.current, { opacity: 0, duration: 0.55, ease: "power1.inOut" });

    // Phase 1.5: the wax seal releases — a quick rock outward before the peel
    tl.to(flapRef.current, { rotationX: 3, duration: 0.15, ease: "back.out(2.5)" }, "-=0.15");

    // Phase 2: the flap peels up slowly — light bleeds out of the widening
    // mouth (glow grows from behind the flap) while the envelope itself
    // brightens through the 4-2 → 4-2.1 stages
    tl.to(flapRef.current,
        { rotationX: -115, duration: 2.30, ease: "power2.inOut" },
        "+=0.06")
      .to(glowRef.current,
        { opacity: 0.9, scale: 1.35, duration: 1.70, ease: "power1.in" },
        "<+0.45")
      .to(lightRef.current,
        { opacity: 1, duration: 1.30, ease: "power1.in" },
        "<+0.25");

    // Phase 3: the flash — a sharp burst of white the instant the envelope
    // finishes opening, riding on the warm bloom underneath
    tl.to(bloomRef.current,
        { opacity: 1, duration: 0.70, ease: "power1.in" },
        "-=0.55")
      .to(flashRef.current,
        { opacity: 1, duration: 0.16, ease: "power4.in" },
        "-=0.10")
      .to(flashRef.current,
        { opacity: 0, duration: 0.85, ease: "power2.out" });

    // Phase 4: overlay fades → main page (starts under the settling flash)
    tl.to(overlayRef.current,
        { opacity: 0, duration: 0.80, ease: "power2.inOut" },
        "-=0.70");

    mainTlRef.current = tl;
    return () => { tl.kill(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  const handleTap = () => {
    if (triggered || !ready) return;
    setTriggered(true);
    idleTlRef.current?.kill();
    mainTlRef.current?.play();
  };

  if (!mounted) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleTap}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleTap(); }}
      role="button"
      tabIndex={0}
      aria-label="Open invitation"
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        // Match the page's centered 9:16 stage on wide screens
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(100vw, 56.25vh)",
        zIndex: 9999,
        // Paper tone shown while the artwork loads
        background: "#efe9dd",
        overflow: "hidden",
        perspective: "1400px",
        perspectiveOrigin: "50% 6%",
        cursor: triggered ? "default" : "pointer",
        outline: "none",
      }}
    >
      <div ref={sceneRef} style={{ position: "absolute", inset: 0, opacity: 0 }}>
        {/* ── Light stage 1 (4-2) — revealed as the closed art dissolves ──── */}
        <img
          src={BODY_SRC}
          alt=""
          draggable={false}
          style={{ ...COVER_IMG, zIndex: 1 }}
        />

        {/* ── Light stage 2 (4-2.1) — the scene bleaches toward this ──────── */}
        <img
          ref={lightRef}
          src={LIGHT_SRC}
          alt=""
          aria-hidden="true"
          draggable={false}
          style={{
            ...COVER_IMG,
            zIndex: 2,
            opacity: 0,
            pointerEvents: "none",
          }}
        />

        {/* ── Light bleed — warm glow seeping out of the envelope mouth as
               the flap lifts (under the flap, over the envelope art) ──────── */}
        <div
          ref={glowRef}
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0, zIndex: 2,
            opacity: 0, pointerEvents: "none",
            background:
              "radial-gradient(85% 60% at 50% 35%, rgba(255,250,235,0.95) 0%, rgba(255,244,220,0.55) 45%, rgba(255,240,210,0) 75%)",
          }}
        />

        {/* ── Flap — hinged at the top edge of the canvas/screen ──────────── */}
        <div
          ref={flapRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            transformOrigin: "50% 0%",
            transformStyle: "preserve-3d",
            pointerEvents: "none",
          }}
        >
          {/* Front face — drop-shadow follows the cutout's alpha silhouette */}
          <img
            src={FLAP_SRC}
            alt=""
            draggable={false}
            onLoad={() => setLoadedCount((n) => n + 1)}
            onError={() => setLoadedCount((n) => n + 1)}
            style={{
              ...COVER_IMG,
              backfaceVisibility: "hidden",
              filter: "drop-shadow(0 8px 18px rgba(70,45,18,0.35))",
            }}
          />
          {/* Back face — unlit inside of the flap, seen past 90° */}
          <img
            src={FLAP_SRC}
            alt=""
            draggable={false}
            style={{
              ...COVER_IMG,
              transform: "rotateX(180deg)",
              backfaceVisibility: "hidden",
              filter: "brightness(0.82)",
            }}
          />
        </div>

        {/* ── Closed envelope (4v) — the first screen, on top of everything;
               dissolves on tap to hand off to the animated layers ─────────── */}
        <img
          ref={closedRef}
          src={CLOSED_SRC}
          alt=""
          draggable={false}
          onLoad={() => setLoadedCount((n) => n + 1)}
          onError={() => setLoadedCount((n) => n + 1)}
          style={{ ...COVER_IMG, zIndex: 4, pointerEvents: "none" }}
        />
      </div>

      {/* ── Light bloom — the envelope dissolves into this on opening ─────── */}
      <div
        ref={bloomRef}
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 40,
          opacity: 0, pointerEvents: "none",
          background:
            "radial-gradient(120% 90% at 50% 45%, #fffdf6 0%, #fbf4e6 55%, #f2e8d3 100%)",
        }}
      />

      {/* ── Flash — sharp white burst the moment the envelope opens ───────── */}
      <div
        ref={flashRef}
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 50,
          opacity: 0, pointerEvents: "none",
          background: "#ffffff",
        }}
      />
    </div>
  );
}
