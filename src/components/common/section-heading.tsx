import { Reveal } from "@/components/common/reveal";

interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ badge, title, subtitle }: SectionHeadingProps) {
  return (
    <Reveal variant="3d" className="mb-6 text-center">
      <span className="inline-block rounded-full border border-gold-400/20 bg-gold-300/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-600">
        {badge}
      </span>
      <h2 className="mt-3 font-serif text-2xl font-semibold text-nude-900">{title}</h2>
      {subtitle ? <p className="mt-1 text-xs italic text-nude-700">{subtitle}</p> : null}
    </Reveal>
  );
}