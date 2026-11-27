"use client";

import { useRef } from "react";
import { problem } from "@/content/home";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { Logo } from "@/components/Logo";

/** Scattered positions (percent of the stage) used only in the desktop scroll scene. */
const CARD_POS = [
  { left: "1%", top: "2%", rotate: -6 },
  { left: "36%", top: "0%", rotate: 4 },
  { left: "71%", top: "4%", rotate: -3 },
  { left: "14%", top: "48%", rotate: 5 },
  { left: "57%", top: "50%", rotate: -5 },
];
const NOISE_POS = [
  { left: "30%", top: "40%" },
  { left: "0%", top: "38%" },
  { left: "68%", top: "38%" },
  { left: "40%", top: "92%" },
  { left: "2%", top: "90%" },
  { left: "74%", top: "92%" },
  { left: "44%", top: "30%" },
];

export function Problem() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        el.dataset.stage = "on";
        const stage = el.querySelector<HTMLElement>("[data-stage-box]");
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]", el);
        const noise = gsap.utils.toArray<HTMLElement>("[data-noise]", el);
        const strikes = gsap.utils.toArray<HTMLElement>("[data-strike]", el);
        const resolve = el.querySelector<HTMLElement>("[data-resolve]");
        if (!stage || !resolve) return;

        const toCenter = (axis: "x" | "y") => (_: number, card: HTMLElement) => {
          const s = stage.getBoundingClientRect();
          const c = card.getBoundingClientRect();
          return axis === "x" ? s.left + s.width / 2 - (c.left + c.width / 2) : s.top + s.height / 2 - (c.top + c.height / 2);
        };

        gsap.set(cards, { rotation: (i: number) => CARD_POS[i]?.rotate ?? 0 });
        gsap.set(resolve, { autoAlpha: 0, scale: 0.85 });

        // Idle drift so the chaos feels alive before scrolling.
        const drift = gsap.to(noise, {
          y: () => gsap.utils.random(-14, 14),
          x: () => gsap.utils.random(-10, 10),
          duration: () => gsap.utils.random(2.5, 4),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.2,
        });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: el.querySelector("[data-pin]"),
            start: "top top",
            end: "+=1800",
            scrub: 0.8,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        tl.to(strikes, { scaleX: 1, duration: 0.6, stagger: 0.08 })
          .to(noise, { autoAlpha: 0.12, filter: "blur(2px)", duration: 0.5 }, "<0.3")
          .to(cards, { x: toCenter("x"), y: toCenter("y"), rotation: 0, scale: 0.55, duration: 1, stagger: 0.06 }, "+=0.1")
          .to(cards, { autoAlpha: 0, duration: 0.3 }, "-=0.35")
          .to(noise, { autoAlpha: 0, duration: 0.3 }, "<")
          .to(resolve, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "expo.out" }, "-=0.15");

        return () => {
          drift.kill();
          delete el.dataset.stage;
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="problem" aria-labelledby="problem-title" className="group relative">
      <div data-pin className="relative mx-auto flex max-w-7xl flex-col px-4 py-24 sm:px-6 lg:h-[100svh] lg:py-0 lg:pb-16 lg:pt-28">
        <div className="max-w-3xl">
          <p className="eyebrow">{problem.eyebrow}</p>
          <h2 id="problem-title" className="mt-5 text-[clamp(2rem,4.4vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-balance lg:text-[clamp(2rem,3.4vw,3rem)]">
            {problem.title}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-fog/85">{problem.body}</p>
        </div>

        <div data-stage-box className="relative mt-12 flex-1 group-data-[stage=on]:mb-10 group-data-[stage=on]:mt-8">
          <ul className="grid gap-4 sm:grid-cols-2 group-data-[stage=on]:contents">
            {problem.items.map((p, i) => (
              <li
                key={p.title}
                data-card
                style={{ ["--l" as string]: CARD_POS[i].left, ["--t" as string]: CARD_POS[i].top }}
                className="rounded-2xl border border-threat/25 bg-gradient-to-br from-threat/10 to-transparent p-5 group-data-[stage=on]:absolute group-data-[stage=on]:left-[var(--l)] group-data-[stage=on]:top-[var(--t)] group-data-[stage=on]:w-[27%] group-data-[stage=on]:p-4"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-threat">0{i + 1}</span>
                <h3 className="mt-2 text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fog/80">{p.body}</p>
              </li>
            ))}
          </ul>

          <ul className="mt-8 flex flex-wrap gap-2 group-data-[stage=on]:contents" aria-label="Common pain points">
            {problem.noise.map((n, i) => (
              <li
                key={n}
                data-noise
                style={{ ["--l" as string]: NOISE_POS[i].left, ["--t" as string]: NOISE_POS[i].top }}
                className="relative w-fit rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-mist group-data-[stage=on]:absolute group-data-[stage=on]:left-[var(--l)] group-data-[stage=on]:top-[var(--t)]"
              >
                {n}
                <span data-strike aria-hidden="true" className="absolute left-2 right-2 top-1/2 hidden h-px origin-left scale-x-0 bg-threat group-data-[stage=on]:block" />
              </li>
            ))}
          </ul>

          <div
            data-resolve
            className="mt-10 rounded-3xl border border-signal/30 bg-gradient-to-br from-signal/15 via-deep to-void p-8 shadow-[0_0_80px_-20px_var(--color-signal)] group-data-[stage=on]:absolute group-data-[stage=on]:left-1/2 group-data-[stage=on]:top-1/2 group-data-[stage=on]:mt-0 group-data-[stage=on]:w-[min(640px,70%)] group-data-[stage=on]:-translate-x-1/2 group-data-[stage=on]:-translate-y-1/2 sm:p-10"
          >
            <Logo />
            <p className="mt-6 text-[clamp(1.35rem,2.4vw,2rem)] font-bold leading-snug text-balance">{problem.resolve}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
