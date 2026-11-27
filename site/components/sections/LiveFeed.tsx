import { liveEvents, clients } from "@/content/home";

const tagTone: Record<string, string> = {
  identity: "text-signal border-signal/30",
  iam: "text-signal border-signal/30",
  cloud: "text-sky-300 border-sky-300/30",
  endpoint: "text-pulse border-pulse/30",
  mdr: "text-threat border-threat/30",
  soc: "text-threat border-threat/30",
  vuln: "text-alert border-alert/30",
  intel: "text-violet-300 border-violet-300/30",
  api: "text-alert border-alert/30",
  network: "text-pulse border-pulse/30",
  grc: "text-fog border-fog/30",
};

function Row({ reverse, duration }: { reverse?: boolean; duration: string }) {
  const items = reverse ? [...liveEvents].reverse() : liveEvents;
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <ul
        className={`flex shrink-0 gap-3 pr-3 ${reverse ? "marquee-reverse" : "marquee"} hover:[animation-play-state:paused]`}
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {[...items, ...items].map((e, i) => (
          <li key={i} aria-hidden={i >= items.length} className="glass flex shrink-0 items-center gap-3 rounded-full py-2 pl-3 pr-4">
            <span className="h-1.5 w-1.5 rounded-full bg-pulse shadow-[0_0_10px_var(--color-pulse)]" />
            <span className="whitespace-nowrap text-sm font-medium text-fog">{e.text}</span>
            <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${tagTone[e.tag] ?? "text-mist border-white/20"}`}>
              {e.tag}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LiveFeed() {
  return (
    <section aria-label="Live security events" className="relative space-y-3 border-y border-white/5 bg-abyss/60 py-8">
      <Row duration="70s" />
      <Row reverse duration="85s" />
    </section>
  );
}

export function Clients() {
  const names = clients.names;
  return (
    <section aria-labelledby="clients-title" className="py-20 sm:py-24">
      <h2 id="clients-title" className="mx-auto max-w-7xl px-4 text-center text-xs font-semibold uppercase tracking-[0.22em] text-mist sm:px-6">
        {clients.label}
      </h2>
      <div className="mt-10 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <ul className="marquee flex shrink-0 items-center gap-14 pr-14" style={{ ["--marquee-duration" as string]: "45s" }}>
          {[...names, ...names].map((n, i) => (
            <li key={i} aria-hidden={i >= names.length} className="whitespace-nowrap text-3xl font-bold tracking-tight text-white/35 transition-colors hover:text-white sm:text-4xl">
              {n}
            </li>
          ))}
        </ul>
      </div>
      <p className="mx-auto mt-10 max-w-7xl px-4 text-center text-sm text-mist sm:px-6">{clients.footnote}</p>
    </section>
  );
}
