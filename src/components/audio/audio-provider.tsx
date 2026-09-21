"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { AUDIO_SRC } from "@/data/invitation";

interface AudioContextValue {
  isPlaying: boolean;
  toggle: () => void;
  start: () => void;
}

const AudioContext = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio.play().then(
      () => setIsPlaying(true),
      (err) => console.log("Audio autoplay restriction:", err)
    );
  }, []);

  const start = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.paused) return;
    audio.play().then(
      () => setIsPlaying(true),
      (err) => console.log("Audio autoplay restriction:", err)
    );
  }, []);

  return (
    <AudioContext.Provider value={{ isPlaying, toggle, start }}>
      {children}
      <audio ref={audioRef} loop preload="none">
        <source src={AUDIO_SRC} type="audio/mp3" />
      </audio>
    </AudioContext.Provider>
  );
}

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}