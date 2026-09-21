"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { MailOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COUPLE, DEFAULT_GUEST, EVENT, PHOTOS } from "@/data/invitation";
import { useAudio } from "@/components/audio/audio-provider";

function FloralCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 5C25 45 60 90 145 140"
        stroke="#AA820A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />
      <path
        d="M5 25C40 60 70 85 130 115"
        stroke="#D4AF37"
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.3"
      />
      <circle cx="35" cy="40" r="10" fill="#E8D7C3" fillOpacity="0.6" />
      <circle cx="35" cy="40" r="6" fill="#D4AF37" fillOpacity="0.4" />
      <circle cx="35" cy="40" r="2.5" fill="#AA820A" fillOpacity="0.8" />
      <circle cx="85" cy="90" r="12" fill="#E8D7C3" fillOpacity="0.6" />
      <circle cx="85" cy="90" r="7" fill="#D4AF37" fillOpacity="0.45" />
      <circle cx="85" cy="90" r="3" fill="#AA820A" fillOpacity="0.8" />
      <path
        d="M20 20C28 12 40 16 38 26C35 34 24 30 20 20Z"
        fill="#C5A869"
        fillOpacity="0.45"
      />
      <path
        d="M50 55C62 46 72 52 68 62C63 70 52 66 50 55Z"
        fill="#D4AF37"
        fillOpacity="0.4"
      />
      <path
        d="M70 70C82 62 90 70 85 80C80 87 72 82 70 70Z"
        fill="#AA820A"
        fillOpacity="0.35"
      />
      <circle cx="25" cy="12" r="2" fill="#AA820A" fillOpacity="0.6" />
      <circle cx="58" cy="42" r="2.5" fill="#D4AF37" fillOpacity="0.6" />
      <circle cx="100" cy="85" r="2" fill="#AA820A" fillOpacity="0.6" />
      <circle cx="145" cy="120" r="2.5" fill="#D4AF37" fillOpacity="0.6" />
    </svg>
  );
}

function CoverContent() {
  const searchParams = useSearchParams();
  const { start } = useAudio();
  const [opened, setOpened] = useState(false);

  const rawGuest = searchParams.get("to");
  const guestName = rawGuest
    ? decodeURIComponent(rawGuest).replace(/\+/g, " ")
    : DEFAULT_GUEST;

  function open() {
    if (opened) return;
    setOpened(true);
    start();
  }

  return (
    <div
      className={`cover-overlay absolute inset-0 z-40 flex items-center justify-center overflow-hidden bg-white ${
        opened ? "opened" : ""
      }`}
      aria-hidden={opened}
    >
      {/* Left Gate Door with Gold Trim & Corner Flora */}
      <div className="gate-door-left pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 overflow-hidden border-r border-gold-300/40 bg-linear-to-br from-[#FAF6F0] via-[#F4EDE2] to-[#ECE1D3] shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-gold-400 to-transparent opacity-80" />
        <div className="absolute -left-2 -top-2 h-40 w-40 animate-sway-right">
          <FloralCorner className="h-full w-full" />
        </div>
        <div className="absolute -bottom-2 -left-2 h-40 w-40 animate-sway-left scale-y-[-1]">
          <FloralCorner className="h-full w-full" />
        </div>
      </div>

      {/* Right Gate Door with Gold Trim & Corner Flora */}
      <div className="gate-door-right pointer-events-none absolute inset-y-0 right-0 z-10 w-1/2 overflow-hidden border-l border-gold-300/40 bg-linear-to-bl from-[#FAF6F0] via-[#F4EDE2] to-[#ECE1D3] shadow-2xl">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-gold-400 to-transparent opacity-80" />
        <div className="absolute -right-2 -top-2 h-40 w-40 animate-sway-right scale-x-[-1]">
          <FloralCorner className="h-full w-full" />
        </div>
        <div className="absolute -bottom-2 -right-2 h-40 w-40 animate-sway-left scale-x-[-1] scale-y-[-1]">
          <FloralCorner className="h-full w-full" />
        </div>
      </div>

      {/* Central Content */}
      <div className="cover-center-content relative z-20 flex h-full w-full max-w-107.5 flex-col items-center justify-between p-6 text-center">
        <div className="pt-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-nude-700">
            The Wedding Celebration Of
          </p>
          <div className="mx-auto my-3 h-px w-12 bg-gold-400 opacity-70" />
        </div>

        <div className="my-auto flex flex-col items-center">
          <div className="relative h-52 w-52 animate-glow rounded-full border border-gold-400/40 p-2">
            <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Mempelai Wulan & Adi"
                src={PHOTOS.photo1}
                className="h-full w-full object-cover brightness-[0.97] transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-nude-900/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-gold-300 bg-white/95 px-4 py-1 font-serif text-[10px] uppercase tracking-widest text-gold-600 shadow-sm">
              Save The Date
            </div>
          </div>

          <h1 className="mt-5 font-serif text-3xl tracking-wide text-nude-900 md:text-4xl">
            {COUPLE.bride.nickname}{" "}
            <span className="font-display italic text-gold-500">&amp;</span>{" "}
            {COUPLE.groom.nickname}
          </h1>
          <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.2em] text-nude-700">
            {EVENT.marriedDateLabel}
          </p>

          <div className="mt-5 max-w-70 rounded-2xl border border-nude-200/90 bg-white/75 px-5 py-3 shadow-sm backdrop-blur-sm">
            <p className="text-[11px] font-light text-nude-700">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <p className="mt-0.5 font-serif text-sm font-semibold tracking-wide text-nude-900">
              {guestName}
            </p>
            <p className="mt-0.5 text-[10px] italic text-nude-700/80">
              *Mohon maaf bila ada kesalahan penulisan nama/gelar
            </p>
          </div>
        </div>

        <div className="w-full max-w-75 pb-8">
          <Button
            type="button"
            onClick={open}
            size="lg"
            className="relative h-auto w-full overflow-hidden rounded-full bg-linear-to-r from-[#AA820A] via-[#D4AF37] to-[#AA820A] px-6 py-3.5 text-xs font-medium uppercase tracking-widest text-white shadow-lg shadow-gold-500/25 transition-transform hover:from-[#AA820A] hover:via-[#D4AF37] hover:to-[#AA820A] active:scale-95"
          >
            <span className="pointer-events-none absolute inset-0 shimmer" />
            <span className="flex items-center justify-center gap-2">
              <MailOpen className="h-4 w-4" />
              Buka Undangan
            </span>
          </Button>
          <p className="mt-3 flex items-center justify-center gap-1 text-[10px] text-nude-700">
            <Sparkles className="h-3 w-3 text-gold-500" />
            Sentuh untuk membuka &amp; mengaktifkan musik
          </p>
        </div>
      </div>
    </div>
  );
}

export function CoverScreen() {
  return <CoverContent />;
}