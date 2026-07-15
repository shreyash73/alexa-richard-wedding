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
    const audio = new Audio("/alexa-richard-wedding/forever-between-flowers.mp3");
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
        <div className="flex items-end gap-[3px] h-5 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-border/40 transition-premium">
          <span className="w-[3px] bg-accent rounded-full animate-[pulse_0.8s_infinite_alternate]" style={{ height: "40%", animationDelay: "0.1s" }} />
          <span className="w-[3px] bg-accent rounded-full animate-[pulse_0.8s_infinite_alternate]" style={{ height: "100%", animationDelay: "0.3s" }} />
          <span className="w-[3px] bg-accent rounded-full animate-[pulse_0.8s_infinite_alternate]" style={{ height: "60%", animationDelay: "0.2s" }} />
          <span className="w-[3px] bg-accent rounded-full animate-[pulse_0.8s_infinite_alternate]" style={{ height: "80%", animationDelay: "0.4s" }} />
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
