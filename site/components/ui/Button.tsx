import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: ReactNode;
}

const base =
  "group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-[15px] font-semibold transition-[transform,background-color,border-color,color] duration-300 ease-[var(--ease-expo)] active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-signal text-void hover:bg-white",
  ghost: "border border-white/15 text-white hover:border-signal hover:text-signal",
};

export function Button({ variant = "primary", className = "", children, ...rest }: ButtonProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <span className="relative z-10">{children}</span>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 5l7 7-7 7" />
      </svg>
    </a>
  );
}
