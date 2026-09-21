"use client";

import { useState } from "react";
import { Check, Copy, Gift } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/reveal";
import { JasmineTree } from "@/components/common/jasmine-tree";
import { COUPLE, GIFT_CARDS } from "@/data/invitation";

async function copyNumber(number: string) {
  try {
    await navigator.clipboard.writeText(number);
    return true;
  } catch {
    return false;
  }
}

function GiftBankRow({ bank, holder, number, color }: { bank: string; holder: string; number: string; color: string }) {
  const [copied, setCopied] = useState(false);
  const disabled = number.trim() === "";

  function handleCopy() {
    if (disabled) return;
    copyNumber(number).then((ok) => {
      if (!ok) return;
      setCopied(true);
      toast.success(`Nomor rekening ${bank} disalin`);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-nude-200 bg-nude-50 p-2.5">
      <div className="text-left">
        <span className={`block text-[10px] font-bold ${color}`}>{bank}</span>
        <span className="block font-mono text-xs font-semibold text-nude-900">
          {number || "Rekening menyusul"}
        </span>
        <span className="block text-[10px] text-nude-700">{holder}</span>
      </div>
      <Button
        type="button"
        variant="outline"
        size="xs"
        disabled={disabled}
        onClick={handleCopy}
        className="gap-1 border-gold-300 bg-white text-sm text-gold-700 transition-transform active:scale-95"
      >
        {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
        {copied ? "Tersalin!" : "Salin"}
      </Button>
    </div>
  );
}

export function GiftSection() {
  return (
    <section className="snap-section relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-linear-to-b from-[#F5EEE6] via-[#FAF8F5] to-[#EDE4D8] px-6 pb-10 pt-20 text-center">
      <JasmineTree />
      <Reveal variant="scale" className="w-full rounded-2xl border border-gold-300/50 bg-white/90 p-4 shadow-md backdrop-blur-md">
        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/20 text-gold-600">
          <Gift className="h-5 w-5" />
        </div>
        <h3 className="font-serif text-sm font-bold text-nude-900">
          Kado Digital (Tanda Kasih)
        </h3>
        <p className="mb-3 mt-1 text-[11px] text-nude-700">
          Bagi keluarga dan sahabat yang ingin memberikan tanda kasih secara
          cashless:
        </p>
        <div className="space-y-2">
          {GIFT_CARDS.map((g) => (
            <GiftBankRow key={g.bank} {...g} />
          ))}
        </div>
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
