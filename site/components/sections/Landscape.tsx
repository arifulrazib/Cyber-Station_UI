import { landscape } from "@/content/home";
import { CountUp } from "@/components/ui/CountUp";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Landscape() {
  return (
    <section aria-labelledby="landscape-title" className="bg-abyss py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">{landscape.eyebrow}</p>
            <SplitHeading id="landscape-title" text={landscape.title} className="mt-5 text-[clamp(2rem,4.4vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-balance" />
          </div>
          <p className="text-lg text-fog/85">{landscape.body}</p>
        </div>

        <Reveal stagger={0.08} className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {landscape.items.map((t) => (
            <article key={t.source} className="group flex flex-col bg-abyss p-7 transition-colors hover:bg-deep sm:p-8">
              <p className="bg-gradient-to-b from-white to-threat bg-clip-text text-[clamp(2.8rem,5vw,4.2rem)] font-extrabold leading-none tracking-tight text-transparent">
                <CountUp value={t.value} suffix={t.suffix} />
              </p>
              <p className="mt-5 text-[15px] leading-relaxed text-fog/85">{t.body}</p>
              <p className="mt-auto pt-6 text-xs font-semibold uppercase tracking-[0.14em] text-mist">{t.source}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
