"use client";

/**
 * SaveTheDate — scratch-to-reveal card, its own normal section right after
 * the Hero. No ScrollTrigger, no pin — it just scrolls into view like any
 * other section. Carries its own opaque gradient backdrop (below), so it
 * doesn't depend on anything behind it.
 *
 * Ring layer: "Save date after scratch" (petal heart RING on maroon),
 * feathered into the carpet below via a radial mask. Typo layer: title, the
 * date block inside the heart, venue address — same 9:16 canvas. Cover: a
 * canvas painted with the petal-FILLED heart (clipped to a heart path so its
 * pink backdrop never shows). Scratching erases it; past ~50% the rest
 * dissolves with confetti, leaving the date framed by the ring petals.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import confetti from "canvas-confetti";

const BG_SRC = "/alexa-richard-wedding/std-bg.webp";
const BRIDGE_SRC = "/alexa-richard-wedding/std-bridge.webp";
const AFTER_SRC = "/alexa-richard-wedding/std-after.webp";
const TYPO_SRC = "/alexa-richard-wedding/std-typo.webp";
const HEART_SRC = "/alexa-richard-wedding/std-heart.webp";

// Feathered ellipse over the heart region: the petal-ring artwork (maroon)
// dissolves into the carpet around it, so the section stays "on the carpet"
const RING_MASK =
  "radial-gradient(ellipse 68% 42% at 48% 51%, rgba(0,0,0,1) 52%, rgba(0,0,0,0) 92%)";

// Bridge layer feather: opaque at the very seam (top), dissolving into
// std-bg.webp beneath by ~85% of the bridge's own height
const BRIDGE_MASK =
  "linear-gradient(to bottom, #000 0%, #000 8%, rgba(0,0,0,0.85) 20%, " +
  "rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0) 85%)";

// Heart outline (360×380 space; path spans x 18–342, y 72–333)
const HEART_PATH =
  "M180,135 C180,108 216,72 261,72 C315,72 342,117 342,162 " +
  "C342,234 252,297 180,333 C108,297 18,234 18,162 " +
  "C18,117 45,72 99,72 C144,72 180,108 180,135 Z";

// Petal-ring bbox on the 9:16 artwork, inset so the cover sits INSIDE the
// ring (fractions of the rendered image rect)
const BOX = { x0: 0.096, x1: 0.870, y0: 0.301, y1: 0.721 };

// The filled-heart's own heart bbox on its 839×1875 canvas (fractions)
const SRC = { x0: 0.074, x1: 0.935, y0: 0.291, y1: 0.687 };

const COVER_IMG: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  userSelect: "none",
};

type Box = { left: number; top: number; width: number; height: number };

export default function SaveTheDate() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const heartImg = useRef<HTMLImageElement | null>(null);
  const drawing = useRef(false);
  const lastCheck = useRef(0);
  const [box, setBox] = useState<Box | null>(null);
  const [imgReady, setImgReady] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const revealedRef = useRef(false);

  // Position the scratch canvas over the ring-heart region using the same
  // cover-fit math the <img> layers get, so artwork stays registered.
  useEffect(() => {
    const measure = () => {
      const el = rootRef.current;
      if (!el) return;
      const W = el.clientWidth, H = el.clientHeight;
      const s = Math.max(W / 9, H / 16);
      const rw = 9 * s, rh = 16 * s;
      const ox = (W - rw) / 2, oy = (H - rh) / 2;
      setBox({
        left: ox + BOX.x0 * rw,
        top: oy + BOX.y0 * rh,
        width: (BOX.x1 - BOX.x0) * rw,
        height: (BOX.y1 - BOX.y0) * rh,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Load the filled-heart artwork once
  useEffect(() => {
    const img = new Image();
    img.src = HEART_SRC;
    img.onload = () => { heartImg.current = img; setImgReady(true); };
  }, []);

  // Paint (and repaint on resize) the clipped petal cover
  const paint = useCallback(() => {
    const c = canvasRef.current;
    const img = heartImg.current;
    if (!c || !img || !box || revealedRef.current) return;
    const dpr = window.devicePixelRatio || 1;
    c.width = box.width * dpr;
    c.height = box.height * dpr;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // Heart clip fitted to the canvas (path spans 18–342 × 72–333),
    // shrunk 4% so the clip edge cuts petals, never the pink backdrop
    const inset = 0.96;
    const sx = (box.width / 324) * inset;
    const sy = (box.height / 261) * inset;
    const tx = (box.width * (1 - inset)) / 2 - 18 * sx;
    const ty = (box.height * (1 - inset)) / 2 - 72 * sy;
    const path = new Path2D();
    path.addPath(
      new Path2D(HEART_PATH),
      new DOMMatrix([sx, 0, 0, sy, tx, ty])
    );
    ctx.save();
    ctx.clip(path);
    ctx.drawImage(
      img,
      SRC.x0 * img.naturalWidth,
      SRC.y0 * img.naturalHeight,
      (SRC.x1 - SRC.x0) * img.naturalWidth,
      (SRC.y1 - SRC.y0) * img.naturalHeight,
      0, 0, box.width, box.height
    );
    ctx.restore();
  }, [box]);

  useEffect(() => { paint(); }, [paint, imgReady]);

  const fireConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.45 },
      colors: ["#f5e6c8", "#c79a3a", "#8c1d2f", "#fff4d6"],
      scalar: 0.9,
    });
  };

  const reveal = () => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    setRevealed(true);
    fireConfetti();
    if (canvasRef.current) {
      gsap.to(canvasRef.current, { opacity: 0, duration: 0.9, ease: "power2.out" });
    }
    if (hintRef.current) {
      gsap.to(hintRef.current, { opacity: 0, duration: 0.5 });
    }
  };

  const checkReveal = useCallback(() => {
    const c = canvasRef.current;
    if (!c || revealedRef.current) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, c.width, c.height).data;
    let clear = 0, total = 0;
    for (let i = 3; i < data.length; i += 4 * 32) {
      total++;
      if (data[i] === 0) clear++;
    }
    if (clear / total > 0.5) reveal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scratchAt = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current;
    if (!c || !box) return;
    const rect = c.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, box.width * 0.07, 0, Math.PI * 2);
    ctx.fill();
  };

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (revealedRef.current) return;
    drawing.current = true;
    canvasRef.current?.setPointerCapture(e.pointerId);
    if (hintRef.current) gsap.to(hintRef.current, { opacity: 0, duration: 0.4 });
    scratchAt(e);
  };
  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || revealedRef.current) return;
    scratchAt(e);
    const now = Date.now();
    if (now - lastCheck.current > 250) {
      lastCheck.current = now;
      checkReveal();
    }
  };
  const onUp = () => {
    drawing.current = false;
    checkReveal();
  };

  return (
    <section
      ref={rootRef}
      className="relative h-screen w-full overflow-hidden select-none bg-transparent"
    >

      {/* Petal ring (what remains after scratching) — feathered into the
          card backdrop above */}
      <img src={AFTER_SRC} alt="" aria-hidden="true" draggable={false}
        style={{
          ...COVER_IMG, zIndex: 2,
          maskImage: RING_MASK, WebkitMaskImage: RING_MASK
        }} />

      {/* Save-the-date typography — date block sits inside the heart */}
      <img src={TYPO_SRC}
        alt="Save the date — Bhumika & Harshwardhan, 11th & 12th November 2026, 36 Fort, Balod Road, Koihapuri, Durg, Chhattisgarh"
        draggable={false}
        style={{ ...COVER_IMG, zIndex: 3 }} />

      {/* Scratch hint — sits on the petal cover, fades on first touch */}
      <p
        ref={hintRef}
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-[4] font-serif italic text-center"
        style={{
          top: "50%", color: "rgba(146,92,58,0.9)", fontSize: 15,
          letterSpacing: "0.06em", margin: 0, pointerEvents: "none",
          textShadow: "0 1px 2px rgba(255,255,255,0.6)"
        }}
      >
        gently scratch the heart
      </p>

      {/* Scratch cover — canvas confined to the heart region so the rest of
          the section still scrolls normally on touch devices */}
      {box && (
        <canvas
          ref={canvasRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
          style={{
            position: "absolute",
            left: box.left, top: box.top,
            width: box.width, height: box.height,
            zIndex: 3,
            touchAction: "none",
            cursor: revealed ? "default" : "pointer",
            pointerEvents: revealed ? "none" : "auto",
          }}
        />
      )}
    </section>
  );
}
