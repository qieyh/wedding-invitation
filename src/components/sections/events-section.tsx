import { Calendar, Clock, GlassWater, Heart, MapPin, Navigation } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Countdown } from "@/components/common/countdown";
import { EVENT } from "@/data/invitation";

function EventDetail({ title, tag, time }: { title: string; tag: string; time: string }) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-nude-100 pb-2">
        <span className="flex items-center gap-1.5 font-serif text-sm font-bold text-nude-900">
          {title === "Akad Nikah" ? (
            <Heart className="h-4 w-4 fill-gold-300 text-gold-500" />
          ) : (
            <GlassWater className="h-4 w-4 text-gold-500" />
          )}
          {title}
        </span>
        <span className="rounded-full bg-gold-300/20 px-2 py-0.5 text-[10px] font-medium text-gold-700">
          {tag}
        </span>
      </div>
      <div className="mt-2.5 space-y-1.5 text-xs text-nude-800">
        <p className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 shrink-0 text-gold-600" />
          <span>{EVENT.marriedDateLabel}</span>
        </p>
        <p className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 shrink-0 text-gold-600" />
          <span>{time}</span>
        </p>
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" />
          <span>{EVENT.venue}</span>
        </p>
      </div>
    </>
  );
}

export function EventsSection() {
  return (
    <section className="snap-section flex min-h-dvh flex-col justify-center bg-linear-to-b from-[#F5ECE2] via-[#FAF8F5] to-[#F3EBE0] px-6 pb-6 pt-20">
      <SectionHeading
        badge="Waktu & Tempat"
        title="Rangkaian Acara"
        subtitle="Dengan penuh rasa syukur mengundang kehadiran Anda"
      />

      <Reveal variant="scale" className="mb-4 rounded-2xl border border-gold-300/60 bg-white/90 p-3 text-center shadow-lg backdrop-blur-md">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-gold-600">
          Menghitung Hari Bahagia
        </p>
        <Countdown />
      </Reveal>

      <Reveal variant="left" delay={60} className="mb-3 w-full rounded-2xl border border-gold-300/40 bg-white/90 p-3.5 shadow-md backdrop-blur-md">
        <EventDetail title={EVENT.akad.title} tag={EVENT.akad.tag} time={EVENT.akad.time} />
      </Reveal>

      <Reveal variant="right" delay={120} className="mb-3.5 w-full rounded-2xl border border-gold-300/40 bg-white/90 p-3.5 shadow-md backdrop-blur-md">
        <EventDetail
          title={EVENT.resepsi.title}
          tag={EVENT.resepsi.tag}
          time={EVENT.resepsi.time}
        />
      </Reveal>

      <Reveal variant="scale" delay={180}>
        <a
          href={EVENT.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-nude-800 py-3 text-xs font-medium uppercase tracking-wider text-gold-300 shadow-md transition-all hover:bg-nude-900 active:scale-95"
        >
          <Navigation className="h-4 w-4 text-gold-400" />
          Buka Petunjuk Arah (Google Maps)
        </a>
      </Reveal>
    </section>
  );
}