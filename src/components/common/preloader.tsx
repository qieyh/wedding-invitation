"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const hide = setTimeout(() => setHidden(true), 900);
    const remove = setTimeout(() => setGone(true), 1400);
    return () => {
      clearTimeout(hide);
      clearTimeout(remove);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className={`absolute inset-0 z-[70] flex flex-col items-center justify-center bg-[#FAF8F5] transition-opacity duration-500 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={hidden}
    >
      <div className="relative flex h-20 w-20 items-center justify-center">
        <span className="animate-spin-slow absolute inset-0 rounded-full border-[1.5px] border-dashed border-gold-400/70" />
        <span className="absolute inset-2 rounded-full border border-gold-300/40" />
        <span className="font-serif text-xl font-semibold tracking-widest text-gold-600">
          W&amp;A
        </span>
      </div>
    </div>
  );
}