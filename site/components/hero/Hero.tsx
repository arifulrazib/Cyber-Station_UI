import { hero } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlobeLazy } from "./GlobeLazy";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate min-h-[100svh] overflow-hidden pt-24 lg:pt-28">
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-void" />

      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 sm:px-6 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[1.05fr_1fr]">
        <div className="relative z-10 py-8 lg:py-0">
          <Reveal onLoad stagger={0.08} className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">{hero.eyebrow}</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-pulse/30 bg-pulse/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-pulse">
              <span className="h-1.5 w-1.5 animate-[blink_1.4s_ease-in-out_infinite] rounded-full bg-pulse" />
              {hero.badge}
            </span>
          </Reveal>

          <SplitHeading
            as="h1"
            id="hero-title"
            trigger="load"
            delay={0.15}
            text={hero.title}
            className="mt-6 max-w-[15ch] text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-balance"
          />

          <Reveal onLoad delay={0.5} className="mt-6 max-w-xl">
            <p className="text-lg leading-relaxed text-fog/90 text-pretty">{hero.body}</p>
          </Reveal>

          <Reveal onLoad delay={0.65} stagger={0.08} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact">{hero.cta}</Button>
            <Button href="#contact" variant="ghost">
              {hero.secondaryCta}
            </Button>
          </Reveal>
        </div>

        <div className="relative -mx-4 h-[52vh] min-h-[340px] sm:mx-0 lg:h-[min(80vh,760px)]">
          <GlobeLazy />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <Reveal onLoad delay={0.8} stagger={0.05}>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-sm text-mist">
            {hero.trust.map((item, i) => (
              <li key={item} className="flex items-center gap-2">
                {i === 0 && <span className="tracking-[0.1em] text-alert" aria-hidden="true">★★★★★</span>}
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
