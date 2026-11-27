"use client";

import { useRef } from "react";
import { approach } from "@/content/home";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

const STEP_TONE = ["text-signal", "text-alert", "text-threat", "text-pulse"] as const;
const STEP_BG = ["bg-signal", "bg-alert", "bg-threat", "bg-pulse"] as const;

export function Approach() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      // Desktop: pin and scroll the four steps horizontally.
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const track = el.querySelector<HTMLElement>("[data-track]");
        const bar = el.querySelector<HTMLElement>("[data-progress]");
        if (!track || !bar) return;
        const distance = () => track.scrollWidth - track.clientWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el.querySelector("[data-pin]"),
            start: "top top",
            end: () => `+=${distance() + window.innerHeight * 0.4}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
        tl.to(track.firstElementChild, { x: () => -distance(), ease: "none" }, 0).fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);

        gsap.utils.toArray<HTMLElement>("[data-step]", el).forEach((step) => {
          gsap.from(step.querySelectorAll("[data-step-in]"), {
            y: 40,
            opacity: 0,
            stagger: 0.08,
            ease: "expo.out",
            duration: 1,
            scrollTrigger: { trigger: step, containerAnimation: tl, start: "left 75%", once: true },
          });
        });
      });

      // Smaller screens: simple reveal per step.
      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        gsap.utils.toArray<HTMLElement>("[data-step]", el).forEach((step) => {
          gsap.from(step, { y: 40, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: step, start: "top 85%", once: true } });
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="platform" aria-labelledby="approach-title" className="relative bg-abyss">
      <div data-pin className="relative flex flex-col py-24 lg:h-[100svh] lg:justify-center lg:py-0">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <p className="eyebrow">{approach.eyebrow}</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <h2 id="approach-title" className="text-[clamp(2rem,4.4vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-balance">
              {approach.title}
            </h2>
            <p className="text-lg text-fog/85">{approach.body}</p>
          </div>
          <div className="mt-10 hidden h-px w-full bg-white/10 lg:block" aria-hidden="true">
            <div data-progress className="h-full origin-left bg-gradient-to-r from-signal via-alert to-pulse" />
          </div>
        </div>

        <div data-track className="mt-10 lg:mt-12 lg:overflow-hidden">
          <ol className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:flex-row lg:gap-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-[10vw]">
            {approach.steps.map((s, i) => (
              <li
                key={s.num}
                data-step
                className="relative flex shrink-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-panel to-abyss p-7 sm:p-9 lg:h-[46vh] lg:min-h-[360px] lg:w-[min(560px,42vw)]"
              >
                <div data-step-in className="flex items-center justify-between">
                  <span className={`text-sm font-semibold uppercase tracking-[0.2em] ${STEP_TONE[i]}`}>
                    {s.num} · {s.key}
                  </span>
                  <span className={`h-2 w-2 rounded-full ${STEP_BG[i]} shadow-[0_0_14px_currentColor] ${STEP_TONE[i]}`} aria-hidden="true" />
                </div>
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-4 text-[11rem] font-extrabold leading-none text-white/[0.04]">
                  {s.num}
                </span>
                <h3 data-step-in className="mt-auto pt-10 text-[clamp(1.6rem,2.6vw,2.4rem)] font-bold leading-tight tracking-tight">
                  {s.title}
                </h3>
                <p data-step-in className="mt-3 max-w-md text-[17px] leading-relaxed text-fog/80">
                  {s.body}
                </p>
                <ul data-step-in className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-fog">
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
