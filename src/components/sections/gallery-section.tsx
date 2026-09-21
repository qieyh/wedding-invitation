import { Quote } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { JasmineTree } from "@/components/common/jasmine-tree";
import { PHOTOS } from "@/data/invitation";

export function GallerySection() {
  return (
    <section className="snap-section relative flex min-h-dvh flex-col justify-center overflow-hidden bg-nude-50 px-6 pb-8 pt-20">
      <JasmineTree />
      <SectionHeading
        badge="Memories of Love"
        title="Galeri Bahagia"
        subtitle="Momen berharga perjalanan cinta kami"
      />

      <div className="mb-4 grid grid-cols-2 gap-3">
        <Reveal variant="left" className="col-span-2">
          <div className="relative h-44 overflow-hidden rounded-2xl border border-gold-300/40 shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Prewedding 1"
              src={PHOTOS.photo1}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-end bg-linear-to-t from-nude-900/50 via-transparent to-transparent p-3">
              <span className="font-serif text-xs italic text-white">
                &ldquo;Dua jiwa menyatu dalam satu ikrar&rdquo;
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal variant="right" className="col-span-2">
          <div className="relative h-44 overflow-hidden rounded-2xl border border-gold-300/40 shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Prewedding 2"
              src={PHOTOS.photo2}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal variant="left">
          <div className="h-32 overflow-hidden rounded-xl border border-gold-300/40 shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Prewedding 3"
              src={PHOTOS.photo3}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal variant="right">
          <div className="h-32 overflow-hidden rounded-xl border border-gold-300/40 shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Prewedding 4"
              src={PHOTOS.photo4}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>

      <Reveal variant="scale" className="rounded-2xl border border-nude-200 bg-white p-4 text-center shadow-sm">
        <Quote className="mx-auto mb-1 h-5 w-5 text-gold-400 opacity-70" />
        <p className="font-display text-sm italic leading-relaxed text-nude-800">
          &ldquo;Cinta bukan tentang mencari orang yang sempurna, melainkan belajar melihat
          orang yang tidak sempurna dengan cara yang sempurna.&rdquo;
        </p>
      </Reveal>
    </section>
  );
}