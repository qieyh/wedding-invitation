"use client";

import { Reveal } from "@/components/common/reveal";
import { COUPLE } from "@/data/invitation";

export function ClosingSection() {
  return (
    <div className="mt-6 flex flex-col items-center border-t border-gold-300/40 px-6 pb-10 pt-8 text-center">
      <Reveal variant="3d" className="flex flex-col items-center">
        <div className="mx-auto mb-3 h-px w-12 bg-gold-400" />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
          Ungkapan Terima Kasih
        </p>
        <p className="mx-auto mt-3 max-w-xs text-xs leading-relaxed text-nude-700">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu bagi kami
          berdua.
        </p>
      </Reveal>

    </div>
  );
}