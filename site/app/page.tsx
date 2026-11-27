import { SmoothScroll } from "@/components/SmoothScroll";
import { Loader } from "@/components/Loader";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/hero/Hero";
import { LiveFeed, Clients } from "@/components/sections/LiveFeed";
import { Problem } from "@/components/sections/Problem";
import { Approach } from "@/components/sections/Approach";
import { Stats } from "@/components/sections/Stats";
import { Soc } from "@/components/sections/Soc";
import { Landscape } from "@/components/sections/Landscape";
import { Cta, Footer } from "@/components/sections/Cta";

export default function HomePage() {
  return (
    <SmoothScroll>
      <a href="#main" className="sr-only z-[200] rounded-full bg-signal px-4 py-2 font-semibold text-void focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <Loader />
      <Nav />
      <main id="main">
        <Hero />
        <LiveFeed />
        <Clients />
        <Problem />
        <Approach />
        <Stats />
        <Soc />
        <Landscape />
        <Cta />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
