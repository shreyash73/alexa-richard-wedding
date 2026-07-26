"use client";

import { useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function MusicPlayer({ isPlaying, setIsPlaying }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    const audio = new Audio("/forever-between-flowers.mp3");
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.log("Audio autoplay prevented or failed:", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, setIsPlaying]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className="fixed bottom-6 z-50 flex items-center gap-3"
      // Hug the 9:16 stage's right edge on wide screens, 1.5rem on phones
      style={{ right: "max(1.5rem, calc(50vw - 28.125vh + 1.5rem))" }}
    >
      {/* Visualizer bars */}
      {isPlaying && (
        <div className="flex items-end gap-[3px] h-5 px-3 py-1.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-border/40 transition-premium">
          <span className="w-[3px] h-full bg-accent rounded-full origin-bottom animate-sound-wave" style={{ animationDelay: "0.1s", animationDuration: "0.75s" }} />
          <span className="w-[3px] h-full bg-accent rounded-full origin-bottom animate-sound-wave" style={{ animationDelay: "0.3s", animationDuration: "0.55s" }} />
          <span className="w-[3px] h-full bg-accent rounded-full origin-bottom animate-sound-wave" style={{ animationDelay: "0.0s", animationDuration: "0.85s" }} />
          <span className="w-[3px] h-full bg-accent rounded-full origin-bottom animate-sound-wave" style={{ animationDelay: "0.2s", animationDuration: "0.65s" }} />
        </div>
      )}

      {/* Floating control button */}
      <button
        onClick={togglePlayback}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-accent border border-border shadow-md hover:shadow-lg hover:scale-105 hover:bg-bg-secondary active:scale-95 transition-premium focus:outline-none"
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 text-text-secondary" />
        )}
      </button>
    </div>
  );
}
