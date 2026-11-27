import { stats } from "@/content/home";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

export function Stats() {
  return (
    <section aria-label="CyberStation at a glance" className="border-y border-white/5 py-16 sm:py-20">
      <Reveal stagger={0.06} className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/5 px-0 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-void p-6 sm:p-8">
            <p className="text-[clamp(2.2rem,4vw,3.2rem)] font-extrabold leading-none tracking-tight">
              {s.literal ? <span>{s.literal}</span> : <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />}
            </p>
            <p className="mt-3 text-sm text-mist">{s.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
