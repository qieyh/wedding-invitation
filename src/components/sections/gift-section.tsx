"use client";

import { useState } from "react";
import { Check, Copy, Gift, Wifi } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/reveal";
import { JasmineTree } from "@/components/common/jasmine-tree";
import { BRI_CARD, COUPLE } from "@/data/invitation";

async function copyNumber(number: string) {
  try {
    await navigator.clipboard.writeText(number);
    return true;
  } catch {
    return false;
  }
}

function CardChip() {
  return (
    <svg
      viewBox="0 0 40 30"
      className="h-7 w-9 rounded-sm text-white/80"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="38"
        height="28"
        rx="4"
        className="fill-amber-300/90"
      />
      <path
        d="M1 11h38M1 19h38M12 1v28M28 1v28"
        className="stroke-amber-600/70"
        strokeWidth="2"
      />
      <rect
        x="7"
        y="7"
        width="26"
        height="16"
        rx="3"
        className="stroke-amber-600/50"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function BriCard() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    copyNumber(BRI_CARD.rawNumber).then((ok) => {
      if (!ok) return;
      setCopied(true);
      toast.success("Nomor rekening BRI disalin");
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#0063C1] via-[#004A9A] to-[#002B5C] p-5 text-left text-white shadow-lg shadow-blue-900/30">
        <div className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 left-8 h-44 w-44 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/30" />

        <div className="relative flex items-start justify-between">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">
              Bank
            </div>
            <div className="mt-0.5 font-serif text-2xl font-bold leading-none tracking-wider">
              BRI
            </div>
          </div>
          <Wifi className="h-5 w-5 rotate-90 text-white/70" />
        </div>

        <div className="relative mt-5 flex items-center gap-3">
          <CardChip />
          <div className="h-px flex-1 bg-linear-to-r from-white/30 via-white/10 to-transparent" />
        </div>

        <div className="relative mt-5 font-mono text-lg font-semibold tracking-[0.12em] text-white/95 sm:text-xl">
          {BRI_CARD.number}
        </div>

        <div className="relative mt-6 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[9px] uppercase tracking-widest text-white/60">
              Atas Nama
            </div>
            <div className="mt-0.5 truncate text-[11px] font-semibold uppercase tracking-wide text-white">
              {BRI_CARD.holder}
            </div>
          </div>
          <div className="shrink-0 rounded-md bg-white/10 px-2 py-1 text-[9px] font-bold tracking-widest text-white/80">
            DEBIT
          </div>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="mt-4 w-full gap-1.5 border-gold-300 bg-white text-sm text-gold-700 transition-transform active:scale-95"
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-600" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        {copied ? "Nomor tersalin!" : "Salin Nomor Rekening"}
      </Button>
    </div>
  );
}

export function GiftSection() {
  return (
    <section
      id="gift"
      className="snap-section relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-linear-to-b from-[#F5EEE6] via-[#FAF8F5] to-[#EDE4D8] px-6 pb-10 pt-20 text-center"
    >
      <JasmineTree />
      <Reveal variant="scale" className="w-full rounded-2xl border border-gold-300/50 bg-white/90 p-4 shadow-md backdrop-blur-md">
        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/20 text-gold-600">
          <Gift className="h-5 w-5" />
        </div>
        <h3 className="font-serif text-sm font-bold text-nude-900">
          Kado Digital (Tanda Kasih)
        </h3>
        <p className="mb-4 mt-1 text-[11px] text-nude-700">
          Bagi keluarga dan sahabat yang ingin memberikan tanda kasih secara
          cashless:
        </p>
        <BriCard />
      </Reveal>

      <Reveal variant="3d" className="mt-12">
        <p className="text-xs italic text-nude-700">Kami yang berbahagia,</p>
        <h3 className="mt-1 font-serif text-2xl font-bold tracking-wide text-nude-900">
          {COUPLE.bride.nickname} &amp; {COUPLE.groom.nickname}
        </h3>
        <p className="mt-1 text-[10px] uppercase tracking-widest text-gold-600">
          Beserta Keluarga Besar
        </p>
        <div className="mt-12 text-[9px] text-nude-400">
          Crafted with ♥ for Mobile Wedding Experience
        </div>
      </Reveal>
    </section>
  );
}