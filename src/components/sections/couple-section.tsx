import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { JasmineTree } from "@/components/common/jasmine-tree";
import { COUPLE, PHOTOS } from "@/data/invitation";

export function CoupleSection() {
  return (
    <section
      id="couple"
      className="snap-section relative flex min-h-dvh flex-col items-center justify-center bg-linear-to-b from-[#FAF8F5] to-[#F5ECE2] px-6 pb-10 pt-20 overflow-hidden"
    >
      <JasmineTree />
      <SectionHeading
        badge="The Happy Couple"
        title="Mempelai Pengantin"
        subtitle='"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri..." (Ar-Rum: 21)'
      />

      <div className="w-full max-w-sm flex flex-col gap-4 mt-4">

        {/* Kartu Mempelai Wanita */}
        <Reveal variant="left">
          <div className="flex items-center gap-4 rounded-2xl border border-gold-300/40 bg-white/90 p-4 shadow-md backdrop-blur-sm">
            {/* Foto kiri */}
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gold-300/50 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Jannati Wulandhari"
                src={PHOTOS.bride}
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
            </div>
            {/* Info kanan */}
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-lg font-bold text-nude-900 leading-tight">
                {COUPLE.bride.name}
              </h3>
              <div className="my-1.5 h-px w-8 bg-gold-400/60" />
              <p className="text-[11px] text-gold-600 font-medium">Putri dari</p>
              <p className="text-[11px] text-nude-700 leading-snug">
                {COUPLE.bride.parents}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Separator & */}
        <Reveal variant="scale" delay={60}>
          <div className="flex items-center justify-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/50 bg-white shadow-md">
              <span className="font-display text-xl italic text-gold-600 leading-none">
                &amp;
              </span>
            </div>
          </div>
        </Reveal>

        {/* Kartu Mempelai Pria */}
        <Reveal variant="right" delay={120}>
          <div className="flex items-center gap-4 rounded-2xl border border-gold-300/40 bg-white/90 p-4 shadow-md backdrop-blur-sm">
            {/* Info kiri */}
            <div className="flex-1 min-w-0 text-right">
              <h3 className="font-serif text-lg font-bold text-nude-900 leading-tight">
                {COUPLE.groom.name}
              </h3>
              <div className="my-1.5 ml-auto h-px w-8 bg-gold-400/60" />
              <p className="text-[11px] text-gold-600 font-medium">Putra dari</p>
              <p className="text-[11px] text-nude-700 leading-snug">
                {COUPLE.groom.parents}
              </p>
            </div>
            {/* Foto kanan */}
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gold-300/50 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Moch. Jalal Adinegoro"
                src={PHOTOS.groom}
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>

      </div>

      <div className="mt-8 flex animate-bounce flex-col items-center text-xs text-nude-700 opacity-60">
        <span className="text-[10px] uppercase tracking-wider">Geser ke bawah</span>
        <ChevronDown className="h-4 w-4 text-gold-500" />
      </div>
    </section>
  );
}
