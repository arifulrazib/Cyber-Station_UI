"use client";

import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const ThreatGlobe = dynamic(() => import("./ThreatGlobe"), {
  ssr: false,
  loading: () => null,
});

/** Loads the WebGL globe only in the browser; reduced-motion visitors get the static glow only. */
export function GlobeLazy() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/20 blur-[120px]" />
      {!reduced && <ThreatGlobe />}
    </div>
  );
}
