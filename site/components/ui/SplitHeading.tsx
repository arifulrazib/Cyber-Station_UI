"use client";

import { useRef, type ElementType } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

interface SplitHeadingProps {
  as?: ElementType;
  text: string;
  className?: string;
  /** "load" animates on mount, "scroll" when the heading enters the viewport. */
  trigger?: "load" | "scroll";
  delay?: number;
  id?: string;
}

/** Heading that reveals line by line. The full text is always in the DOM for SEO and screen readers. */
export function SplitHeading({ as: Tag = "h2", text, className, trigger = "scroll", delay = 0, id }: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(el, { type: "lines,words", mask: "lines", aria: "auto" });
        gsap.from(split.words, {
          yPercent: 110,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.04,
          delay,
          scrollTrigger: trigger === "scroll" ? { trigger: el, start: "top 85%", once: true } : undefined,
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {text}
    </Tag>
  );
}
