import { soc } from "@/content/home";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";

const STATUS_TONE: Record<string, string> = {
  Contained: "text-pulse border-pulse/30 bg-pulse/10",
  Triaged: "text-alert border-alert/30 bg-alert/10",
  Auto: "text-signal border-signal/30 bg-signal/10",
};

/** Decorative radar sweep with blips; pure CSS so it costs almost nothing. */
function Radar() {
  const blips = [
    { left: "62%", top: "28%", tone: "bg-threat", delay: "0.4s" },
    { left: "30%", top: "60%", tone: "bg-alert", delay: "1.6s" },
    { left: "70%", top: "66%", tone: "bg-pulse", delay: "2.6s" },
  ];
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[420px]">
      {[100, 72, 44, 18].map((s) => (
        <div key={s} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/15" style={{ width: `${s}%`, height: `${s}%` }} />
      ))}
      <div className="absolute inset-0 m-auto h-px w-full bg-signal/10" />
      <div className="absolute inset-0 m-auto h-full w-px bg-signal/10" />
      <div className="absolute inset-0 animate-[scan_4s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,rgb(56_189_248/0.45)_360deg)]" />
      {blips.map((b) => (
        <span key={b.left} className={`absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 animate-[blink_2s_ease-in-out_infinite] rounded-full ${b.tone} shadow-[0_0_16px_currentColor]`} style={{ left: b.left, top: b.top, animationDelay: b.delay }} />
      ))}
    </div>
  );
}

export function Soc() {
  return (
    <section id="soc" aria-labelledby="soc-title" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-signal/10 blur-[140px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="eyebrow">{soc.eyebrow}</p>
        <SplitHeading id="soc-title" text={soc.title} className="mt-5 max-w-3xl text-[clamp(2rem,4.4vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-balance" />

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-center">
          <Reveal className="glass rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-sm font-semibold text-fog">{soc.console}</span>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-pulse">
                <span className="h-1.5 w-1.5 animate-[blink_1.4s_ease-in-out_infinite] rounded-full bg-pulse" />
                {soc.live}
              </span>
            </div>
            <div className="grid gap-6 py-6 sm:grid-cols-[1fr_1.1fr] sm:items-center">
              <Radar />
              <ul className="space-y-3">
                {soc.events.map((e) => (
                  <li key={e.title} className="rounded-2xl border border-white/10 bg-void/60 p-4">
                    <p className="font-semibold leading-snug">{e.title}</p>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <span className="text-xs text-mist">{e.meta}</span>
                      <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${STATUS_TONE[e.status]}`}>{e.status}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-white/10">
              {soc.metrics.map((m) => (
                <div key={m.label} className="flex flex-col-reverse bg-abyss p-4 text-center">
                  <dt className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-mist">{m.label}</dt>
                  <dd className="text-2xl font-extrabold text-signal sm:text-3xl">{m.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-fog/85">{soc.body}</p>
            </Reveal>
            <Reveal stagger={0.06} className="mt-8 grid gap-3 sm:grid-cols-2">
              {soc.features.map((f) => (
                <div key={f.title} className="rounded-2xl border border-white/10 p-5 transition-colors hover:border-signal/40 hover:bg-signal/[0.04]">
                  <h3 className="font-bold">{f.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-mist">{f.body}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
