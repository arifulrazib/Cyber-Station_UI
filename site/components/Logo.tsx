/** Text wordmark stand-in. Swap for the official SVG logo when available. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
        <path d="M16 2 4 7v8c0 7.5 5.1 13.4 12 15 6.9-1.6 12-7.5 12-15V7L16 2Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-signal" />
        <path d="m11 16 3.5 3.5L21 13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-pulse" />
      </svg>
      <span className="text-lg font-extrabold tracking-tight">
        CYBER<span className="text-signal">STATION</span>
      </span>
    </span>
  );
}
