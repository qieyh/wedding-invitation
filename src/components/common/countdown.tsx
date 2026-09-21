"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/data/invitation";

interface CountdownState {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const ZERO: CountdownState = { days: "00", hours: "00", minutes: "00", seconds: "00" };

function pad(value: number): string {
  return value < 10 ? `0${value}` : String(value);
}

export function Countdown() {
  const [time, setTime] = useState<CountdownState>(ZERO);

  useEffect(() => {
    function update() {
      const distance = EVENT.countdownUTC - Date.now();
      if (distance <= 0) {
        setTime(ZERO);
        return;
      }
      setTime({
        days: pad(Math.floor(distance / (1000 * 60 * 60 * 24))),
        hours: pad(Math.floor((distance / (1000 * 60 * 60)) % 24)),
        minutes: pad(Math.floor((distance / (1000 * 60)) % 60)),
        seconds: pad(Math.floor((distance / 1000) % 60)),
      });
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const cells: { value: string; label: string }[] = [
    { value: time.days, label: "Hari" },
    { value: time.hours, label: "Jam" },
    { value: time.minutes, label: "Menit" },
    { value: time.seconds, label: "Detik" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {cells.map((cell) => (
        <div key={cell.label} className="rounded-xl border border-nude-200 bg-nude-50 p-2 text-center">
          <span className="block font-serif text-lg font-bold text-nude-900 tabular-nums">
            {cell.value}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-nude-700">{cell.label}</span>
        </div>
      ))}
    </div>
  );
}