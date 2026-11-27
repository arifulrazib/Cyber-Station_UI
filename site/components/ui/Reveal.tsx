"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Animate direct children one after another instead of the wrapper as a whole. */
  stagger?: number;
  y?: number;
  /** Play on mount (for above-the-fold content) instead of on scroll. */
  onLoad?: boolean;
  delay?: number;
}

/** Fades content up as it scrolls into view. Content is visible without JS. */
export function Reveal({ children, className, stagger, y = 32, onLoad = false, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const targets = stagger ? Array.from(el.children) : el;
        gsap.from(targets, {
          y,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          stagger: stagger ?? 0,
          delay,
          scrollTrigger: onLoad ? undefined : { trigger: el, start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
