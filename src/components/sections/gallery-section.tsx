"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, X } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { JasmineTree } from "@/components/common/jasmine-tree";
import { PHOTOS } from "@/data/invitation";

const PHOTO_LIST = [
  { src: PHOTOS.photo1, alt: "Prewedding 1" },
  { src: PHOTOS.photo2, alt: "Prewedding 2" },
  { src: PHOTOS.photo3, alt: "Prewedding 3" },
  { src: PHOTOS.photo4, alt: "Prewedding 4" },
];

export function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null);

  function prev() {
    setSelected((i) => (i === null ? null : (i + PHOTO_LIST.length - 1) % PHOTO_LIST.length));
  }

  function next() {
    setSelected((i) => (i === null ? null : (i + 1) % PHOTO_LIST.length));
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    if (selected !== null) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected]);

  return (
    <section
      id="gallery"
      className="snap-section relative flex min-h-dvh flex-col justify-center overflow-hidden bg-nude-50 px-6 pb-8 pt-20"
    >
      <JasmineTree />
      <SectionHeading
        badge="Memories of Love"
        title="Galeri Bahagia"
        subtitle="Momen berharga perjalanan cinta kami"
      />

      <div className="mb-4 grid grid-cols-2 gap-3">
        <Reveal variant="left" className="col-span-2">
          <button
            type="button"
            onClick={() => setSelected(0)}
            className="relative block h-44 w-full cursor-zoom-in overflow-hidden rounded-2xl border border-gold-300/40 shadow-lg"
            aria-label={`Lihat ${PHOTO_LIST[0].alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={PHOTO_LIST[0].alt}
              src={PHOTO_LIST[0].src}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 flex items-end bg-linear-to-t from-nude-900/50 via-transparent to-transparent p-3">
              <span className="font-serif text-xs italic text-white">
                &ldquo;Dua jiwa menyatu dalam satu ikrar&rdquo;
              </span>
            </div>
          </button>
        </Reveal>

        <Reveal variant="right" className="col-span-2">
          <button
            type="button"
            onClick={() => setSelected(1)}
            className="relative block h-44 w-full cursor-zoom-in overflow-hidden rounded-2xl border border-gold-300/40 shadow-lg"
            aria-label={`Lihat ${PHOTO_LIST[1].alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={PHOTO_LIST[1].alt}
              src={PHOTO_LIST[1].src}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </button>
        </Reveal>

        <Reveal variant="left">
          <button
            type="button"
            onClick={() => setSelected(2)}
            className="block h-32 w-full cursor-zoom-in overflow-hidden rounded-xl border border-gold-300/40 shadow-md"
            aria-label={`Lihat ${PHOTO_LIST[2].alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={PHOTO_LIST[2].alt}
              src={PHOTO_LIST[2].src}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </button>
        </Reveal>

        <Reveal variant="right">
          <button
            type="button"
            onClick={() => setSelected(3)}
            className="block h-32 w-full cursor-zoom-in overflow-hidden rounded-xl border border-gold-300/40 shadow-md"
            aria-label={`Lihat ${PHOTO_LIST[3].alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={PHOTO_LIST[3].alt}
              src={PHOTO_LIST[3].src}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </button>
        </Reveal>
      </div>

      <Reveal variant="scale" className="rounded-2xl border border-nude-200 bg-white p-4 text-center shadow-sm">
        <Quote className="mx-auto mb-1 h-5 w-5 text-gold-400 opacity-70" />
        <p className="font-display text-sm italic leading-relaxed text-nude-800">
          &ldquo;Cinta bukan tentang mencari orang yang sempurna, melainkan belajar melihat
          orang yang tidak sempurna dengan cara yang sempurna.&rdquo;
        </p>
      </Reveal>

      {selected !== null ? (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-nude-900/85 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold-300/40 bg-white/90 text-nude-800 shadow-lg transition-all active:scale-95"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gold-300/40 bg-white/90 text-nude-800 shadow-lg transition-all active:scale-95"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={PHOTO_LIST[selected].alt}
            src={PHOTO_LIST[selected].src}
            className="max-h-[82dvh] max-w-full rounded-xl border border-gold-300/50 object-contain shadow-2xl"
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gold-300/40 bg-white/90 text-nude-800 shadow-lg transition-all active:scale-95"
            aria-label="Foto berikutnya"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      ) : null}
    </section>
  );
}