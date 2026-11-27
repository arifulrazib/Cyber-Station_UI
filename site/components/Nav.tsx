"use client";

import { useEffect, useId, useState } from "react";
import { nav, hero } from "@/content/home";
import { Logo } from "./Logo";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || open ? "border-b border-white/10 bg-void/70 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20">
        <a href="#top" aria-label="CyberStation home">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="rounded-full px-3 py-2 text-sm font-medium text-fog transition-colors hover:bg-white/5 hover:text-white">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#contact" className="hidden min-h-10 items-center rounded-full border border-white/15 px-4 text-sm font-semibold transition-colors hover:border-signal hover:text-signal sm:inline-flex">
            {hero.secondaryCta}
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-0.5 w-5 bg-white transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 w-5 bg-white transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>

      <div id={menuId} hidden={!open} className="border-t border-white/10 bg-void/95 px-4 pb-8 pt-4 backdrop-blur-xl lg:hidden">
        <ul className="flex flex-col">
          {nav.map((item) => (
            <li key={item.label}>
              <a href={item.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-white/5 text-lg font-semibold">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" onClick={() => setOpen(false)} className="mt-6 flex min-h-12 items-center justify-center rounded-full bg-signal font-semibold text-void">
          {hero.secondaryCta}
        </a>
      </div>
    </header>
  );
}
