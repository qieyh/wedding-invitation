import { BookOpen, Quote } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { JasmineTree } from "@/components/common/jasmine-tree";
import { VERSES } from "@/data/invitation";

export function VersesSection() {
  return (
    <section
      id="verses"
      className="snap-section relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-linear-to-b from-[#FAF8F5] via-[#F7F2E9] to-[#F1E8DC] px-6 pb-10 pt-20 text-center"
    >
      <JasmineTree />

      <div className="my-auto flex w-full flex-col items-center">
        <Reveal variant="scale">
          <span className="font-serif text-sm italic text-gold-600">
            {VERSES.bismillah}
          </span>
        </Reveal>

        <Reveal variant="scale" delay={60} className="mt-3 w-full max-w-88">
          <div className="rounded-3xl border border-gold-300/40 bg-white/85 px-6 py-8 shadow-lg backdrop-blur-md">
            <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-gold-300/50 bg-gold-400/20 text-gold-600">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="mx-auto mb-3 h-px w-12 bg-gold-400/70" />
            <Quote className="mx-auto mb-2 h-5 w-5 text-gold-400/70" />
            <p className="text-[13px] leading-7 text-nude-800">
              {VERSES.translation}
            </p>
            <p className="mt-4 font-serif text-xs font-bold uppercase tracking-widest text-gold-600">
              {VERSES.source}
            </p>
          </div>
        </Reveal>

        <Reveal variant="3d" delay={120} className="mt-5 max-w-xs">
          <p className="text-[11px] italic leading-relaxed text-nude-700">
            {VERSES.greeting} &bull; {VERSES.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}