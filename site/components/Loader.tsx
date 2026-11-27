"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

const SEEN_KEY = "cs-intro-seen";

/**
 * Short visual intro (~1.3s): the shield draws itself, then the curtain lifts.
 * The page renders underneath from the first byte, so it never blocks content or SEO.
 * Skipped for reduced-motion visitors and on repeat views in the same session.
 */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      let seen = false;
      try {
        seen = sessionStorage.getItem(SEEN_KEY) === "1";
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* storage unavailable — just play it */
      }
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (seen) return setDone(true);
        const tl = gsap.timeline({ onComplete: () => setDone(true) });
        tl.fromTo(".ld-shield", { strokeDashoffset: 120 }, { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" })
          .fromTo(".ld-check", { strokeDashoffset: 20 }, { strokeDashoffset: 0, duration: 0.3, ease: "power2.out" }, "-=0.15")
          .to(".ld-scan", { yPercent: 100, duration: 0.5, ease: "power2.in" }, "-=0.1")
          .to(root.current, { yPercent: -100, duration: 0.7, ease: "expo.inOut" }, "-=0.2");
      });
      mm.add("(prefers-reduced-motion: reduce)", () => setDone(true));
      return () => mm.revert();
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100] flex items-center justify-center bg-void" aria-hidden="true">
      <div className="grid-bg absolute inset-0" />
      <svg viewBox="0 0 32 32" className="relative h-20 w-20">
        <path className="ld-shield" d="M16 2 4 7v8c0 7.5 5.1 13.4 12 15 6.9-1.6 12-7.5 12-15V7L16 2Z" fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="120" strokeDashoffset="120" />
        <path className="ld-check" d="m11 16 3.5 3.5L21 13" fill="none" stroke="#34d399" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="20" strokeDashoffset="20" />
      </svg>
      <div className="ld-scan absolute inset-x-0 top-0 h-full -translate-y-full bg-gradient-to-b from-transparent via-signal/10 to-signal/30" />
    </div>
  );
}
