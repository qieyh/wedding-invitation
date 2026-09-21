import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { JasmineTree } from "@/components/common/jasmine-tree";
import { COUPLE, PHOTOS } from "@/data/invitation";

function BrideCard() {
  return (
    <Reveal variant="left" className="w-full">
      <div className="flex items-center gap-4 rounded-2xl border border-gold-300/40 bg-white/85 p-4 shadow-md backdrop-blur-sm transition-all hover:shadow-xl">
        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl border border-gold-300 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Jannati Wulandhari"
            src={PHOTOS.photo1}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-serif text-lg font-bold text-nude-900">{COUPLE.bride.name}</h3>
          <p className="mt-0.5 text-[11px] font-medium tracking-wide text-gold-600">
            Putri dari
          </p>
          <p className="text-[11px] leading-relaxed text-nude-700">{COUPLE.bride.parents}</p>
        </div>
      </div>
    </Reveal>
  );
}

function GroomCard() {
  return (
    <Reveal variant="right" delay={80} className="w-full">
      <div className="flex items-center gap-4 rounded-2xl border border-gold-300/40 bg-white/85 p-4 shadow-md backdrop-blur-sm transition-all hover:shadow-xl">
        <div className="flex-1 text-right">
          <h3 className="font-serif text-lg font-bold text-nude-900">{COUPLE.groom.name}</h3>
          <p className="mt-0.5 text-[11px] font-medium tracking-wide text-gold-600">
            Putra dari
          </p>
          <p className="text-[11px] leading-relaxed text-nude-700">{COUPLE.groom.parents}</p>
        </div>
        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl border border-gold-300 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Moch. Jalal Adinegoro"
            src={PHOTOS.photo2}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </Reveal>
  );
}

export function CoupleSection() {
  return (
    <section className="snap-section relative flex min-h-dvh flex-col items-center justify-center bg-linear-to-b from-[#FAF8F5] to-[#F5ECE2] px-6 pb-10 pt-20 overflow-hidden">
      <JasmineTree />
      <SectionHeading
        badge="The Happy Couple"
        title="Mempelai Pengantin"
        subtitle="“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri...” (Ar-Rum: 21)"
      />
      <BrideCard />
      <Reveal variant="scale" className="my-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/20 font-display text-xl italic text-gold-600 shadow-inner">
          &amp;
        </div>
      </Reveal>
      <GroomCard />
      <div className="mt-6 flex animate-bounce flex-col items-center text-xs text-nude-700 opacity-60">
        <span className="text-[10px] uppercase tracking-wider">Geser ke bawah</span>
        <ChevronDown className="h-4 w-4 text-gold-500" />
      </div>
    </section>
  );
}