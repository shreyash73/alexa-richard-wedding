"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function DateScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 320, height: 200 });

  // Handle responsive canvas resizing
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCanvasSize({
          width: Math.floor(rect.width),
          height: Math.floor(rect.height),
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Initialize canvas painting
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set high-DPI scaling for clear graphics
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasSize.width * dpr;
    canvas.height = canvasSize.height * dpr;
    ctx.scale(dpr, dpr);

    canvas.style.width = `${canvasSize.width}px`;
    canvas.style.height = `${canvasSize.height}px`;

    // Fill with a gorgeous metallic gold gradient
    const gradient = ctx.createLinearGradient(0, 0, canvasSize.width, canvasSize.height);
    gradient.addColorStop(0, "#dfc48e");
    gradient.addColorStop(0.5, "#ede5cc");
    gradient.addColorStop(1, "#c8aa78");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    // Draw luxury noise / brush texture effect
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * canvasSize.width;
      const y = Math.random() * canvasSize.height;
      const r = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add thin double borders
    ctx.strokeStyle = "rgba(26, 25, 22, 0.15)";
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, canvasSize.width - 20, canvasSize.height - 20);
    ctx.strokeRect(14, 14, canvasSize.width - 28, canvasSize.height - 28);

    // Draw typography placeholder text on the gold surface
    ctx.fillStyle = "#1a1916";
    ctx.font = 'italic 16px "Cormorant Garamond", Georgia, serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦ Scratch to reveal the date ✦", canvasSize.width / 2, canvasSize.height / 2);
  }, [canvasSize]);

  // Check how much percentage of the canvas is scratched
  const checkScratchPercentage = (ctx: CanvasRenderingContext2D) => {
    const width = canvasSize.width;
    const height = canvasSize.height;
    // Downsample the imageData readout for efficiency
    const step = 4; // Check every 4th pixel
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    let totalPixels = 0;
    let clearedPixels = 0;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const index = (y * width + x) * 4;
        const alpha = data[index + 3];
        totalPixels++;
        if (alpha === 0) {
          clearedPixels++;
        }
      }
    }

    const percentage = clearedPixels / totalPixels;
    if (percentage > 0.45 && !isRevealed) {
      triggerReveal();
    }
  };

  const triggerReveal = () => {
    setIsRevealed(true);
    // Explode gorgeous, romantic gold and pastel confetti
    const colors = ["#dfc48e", "#52839c", "#f2cac9", "#ffffff"];
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
    });
  };

  // Draw circle clearing on user move actions
  const draw = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage(ctx);
  };

  // Mouse & Touch events handlers
  const handleMouseDown = () => setIsDrawing(true);
  const handleMouseUp = () => setIsDrawing(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    draw(e.clientX, e.clientY);
  };

  const handleTouchStart = () => setIsDrawing(true);
  const handleTouchEnd = () => setIsDrawing(false);

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || e.touches.length === 0) return;
    const touch = e.touches[0];
    draw(touch.clientX, touch.clientY);
  };

  return (
    <section className="py-24 px-4 bg-bg-primary flex flex-col items-center select-none">
      <div className="w-full max-w-md text-center">
        {/* Title */}
        <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">
          You're invited!
        </span>
        <h2 className="font-serif italic text-4xl text-text-primary mt-2 mb-8">
          The Date
        </h2>

        {/* Outer scratch-box card */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[1.7] max-w-[400px] mx-auto bg-bg-secondary rounded-lg shadow-sm border border-border flex items-center justify-center p-8 select-none"
        >
          {/* Unlocked date display inside */}
          <div className="flex items-center justify-around w-full text-text-primary">
            {/* Day */}
            <div className="flex flex-col items-center">
              <span className="font-serif italic text-5xl md:text-6xl font-medium text-accent">
                14
              </span>
              <span className="text-[10px] uppercase tracking-widest text-text-secondary mt-1">
                Day
              </span>
            </div>

            <div className="h-10 w-[1px] bg-border" />

            {/* Month */}
            <div className="flex flex-col items-center">
              <span className="font-serif italic text-3xl md:text-4xl font-medium text-text-primary">
                Sept
              </span>
              <span className="text-[10px] uppercase tracking-widest text-text-secondary mt-1">
                Month
              </span>
            </div>

            <div className="h-10 w-[1px] bg-border" />

            {/* Year */}
            <div className="flex flex-col items-center">
              <span className="font-serif italic text-3xl md:text-4xl font-medium text-text-primary">
                2025
              </span>
              <span className="text-[10px] uppercase tracking-widest text-text-secondary mt-1">
                Year
              </span>
            </div>
          </div>

          {/* Interactive scratch canvas overlay */}
          <AnimatePresence>
            {!isRevealed && (
              <motion.canvas
                ref={canvasRef}
                exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.6, ease: "easeInOut" } }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
                className="absolute inset-0 z-10 w-full h-full rounded-lg shadow-inner scratch-canvas"
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
