import { cta, footer } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Logo } from "@/components/Logo";

export function Cta() {
  return (
    <section id="contact" aria-labelledby="cta-title" className="relative isolate overflow-hidden py-28 sm:py-40">
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/20 blur-[130px]" />
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="eyebrow">{cta.eyebrow}</p>
        <SplitHeading id="cta-title" text={cta.title} className="mt-6 text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-balance" />
        <p className="mx-auto mt-6 max-w-2xl text-lg text-fog/85">{cta.body}</p>
        <div className="mt-10 flex justify-center">
          <Button href={`mailto:${footer.contact.email}`}>{cta.button}</Button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-abyss">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-mist">{footer.tagline}</p>
        </div>
        {footer.columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-fog">{col.heading}</h2>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#top" className="text-[15px] text-mist transition-colors hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-fog">{footer.contact.heading}</h2>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li><a className="text-mist hover:text-white" href={`mailto:${footer.contact.email}`}>{footer.contact.email}</a></li>
            <li><a className="text-mist hover:text-white" href={`tel:${footer.contact.phone.replace(/\s/g, "")}`}>{footer.contact.phone}</a></li>
            <li><a className="text-mist hover:text-white" href={`https://${footer.contact.web}`}>{footer.contact.web}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-xs text-mist sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <p>{footer.legal}</p>
          <ul className="flex flex-wrap gap-2">
            {footer.badges.map((b) => (
              <li key={b} className="rounded-full border border-white/10 px-3 py-1 font-semibold">{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
