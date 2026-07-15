"use client";

/**
 * EnvelopeReveal — full-screen envelope opening built from the couple's
 * artwork: "Open 2" (envelope body + interior) as the base layer and
 * "Open 1" (transparent flap cutout with the BH wax seal) as a 3D flap
 * hinged at the top edge. Tap anywhere → flap peels back → the scene
 * dissolves into light → the site.
 *
 * Both images share one 9:16 canvas, so identical full-screen
 * object-fit:cover rendering keeps them pixel-registered at any viewport.
 * On phone aspect ratios the image height fits exactly, putting the flap
 * hinge (canvas top) at the screen top edge.
 */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const BODY_SRC  = "/alexa-richard-wedding/envelope-body.webp";
const FLAP_SRC  = "/alexa-richard-wedding/envelope-flap.webp";
const LIGHT_SRC = "/alexa-richard-wedding/envelope-light.webp";

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
  const ready = loadedCount >= 2; // body + flap decoded

  const overlayRef = useRef<HTMLDivElement>(null);
  const sceneRef   = useRef<HTMLDivElement>(null);
  const flapRef    = useRef<HTMLDivElement>(null);
  const lightRef   = useRef<HTMLImageElement>(null);
  const bloomRef   = useRef<HTMLDivElement>(null);
  const mainTlRef  = useRef<gsap.core.Timeline | null>(null);
  const idleTlRef  = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => { setMounted(true); }, []);

  // Fade the scene in once the artwork has decoded (no half-loaded pop-in)
  useEffect(() => {
    if (!ready) return;
    gsap.to(sceneRef.current, { opacity: 1, duration: 0.35, ease: "power1.out" });
  }, [ready]);

  // Idle breathing — the flap tip hovers slightly toward the viewer and
  // settles; real paper never lies perfectly flat.
  useEffect(() => {
    if (!mounted || !ready) return;
    gsap.set(flapRef.current, { rotationX: 2.5 });
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(flapRef.current, { rotationX: 5, duration: 2.4, ease: "sine.inOut" });
    idleTlRef.current = tl;
    return () => { tl.kill(); };
  }, [mounted, ready]);

  useEffect(() => {
    if (!mounted) return;
    gsap.set(bloomRef.current, { opacity: 0 });
    gsap.set(lightRef.current, { opacity: 0, scale: 0.75, transformOrigin: "50% 38%" });

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        onOpenComplete();
        onPlayMusic?.();
      },
    });

    // Phase 1: press — the flap flattens under the finger
    tl.to(flapRef.current, { rotationX: 0.6, duration: 0.14, ease: "power2.out" });

    // Phase 2: the flap peels up slowly, light pouring out of the opening
    tl.to(flapRef.current,
        { rotationX: -115, duration: 2.30, ease: "power2.inOut" },
        "+=0.06")
      .to(lightRef.current,
        { opacity: 1, duration: 1.40, ease: "power1.in" },
        "<+0.30")
      .to(lightRef.current,
        { scale: 1.12, duration: 2.00, ease: "power1.out" },
        "<");

    // Phase 3: dissolve into light (takes over as the flap nears fully open)
    tl.to(bloomRef.current,
        { opacity: 1, duration: 0.90, ease: "power1.in" },
        "-=0.75");

    // Phase 4: overlay fades → main page
    tl.to(overlayRef.current,
        { opacity: 0, duration: 0.80, ease: "power2.inOut" },
        "+=0.12");

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
        {/* ── Envelope body + interior (what the lifting flap reveals) ────── */}
        <img
          src={BODY_SRC}
          alt=""
          draggable={false}
          onLoad={() => setLoadedCount((n) => n + 1)}
          onError={() => setLoadedCount((n) => n + 1)}
          style={{ ...COVER_IMG, zIndex: 1 }}
        />

        {/* ── Light spilling out of the envelope mouth (behind the flap) ──── */}
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
    </div>
  );
}
