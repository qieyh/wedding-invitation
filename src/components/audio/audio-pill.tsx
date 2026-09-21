"use client";

import { Disc3, Music2, Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/components/audio/audio-provider";

export function AudioPill() {
  const { isPlaying, toggle } = useAudio();

  return (
    <button
      type="button"
      onClick={toggle}
      className="absolute right-3 top-5 z-50 flex cursor-pointer items-center gap-2 rounded-full border border-gold-400/40 bg-white/80 px-3.5 py-2 text-left shadow-lg backdrop-blur-md transition-all active:scale-95"
      aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
    >
      <span
        className={`relative flex h-5 w-5 items-center justify-center rounded-full border border-gold-400 text-gold-500 ${
          isPlaying ? "animate-spin" : ""
        }`}
        style={{ animationDuration: "4s" }}
      >
        <span className="animate-spin-slow absolute -inset-1 rounded-full border-[1.5px] border-dashed border-gold-400/70" />
        <Disc3 className="h-3.5 w-3.5" />
      </span>
      <span className="text-[11px] font-medium tracking-wide text-nude-700">
        {isPlaying ? (
          <span className="flex items-center gap-1">
            <Music2 className="h-3 w-3" /> Memutar
          </span>
        ) : (
          "Dijeda"
        )}
      </span>
      <span className="ml-0.5 text-gold-500">
        {isPlaying ? (
          <Volume2 className="h-4 w-4" />
        ) : (
          <VolumeX className="h-4 w-4" />
        )}
      </span>
    </button>
  );
}