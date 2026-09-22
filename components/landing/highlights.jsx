"use client";

import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

const highlights = [
  { title: "Quick Look", image: "finder.jpg", href: "#quick-look-story", alt: "A fullerene open in Finder Quick Look" },
  { title: "Binding sites", image: "selection.jpg", href: "#structure-story", alt: "A ligand inside a protein binding site" },
  { title: "Molecular poses", image: "closeup-poses.png", href: "/features#motion", alt: "Eight molecular poses overlaid with All and Align" },
  { title: "Molecular motion", image: "shot-trajectory-playback.jpg", href: "/features#motion", alt: "A molecular trajectory in Burette" },
  { title: "Chemical Space", image: "space.jpg", href: "/features#chemical-space", alt: "Molecular similarity map and linked structures" },
];

export default function Highlights() {
  return <section id="highlights" className="home-highlights page-width" aria-labelledby="highlights-title">
    <header className="home-section-heading"><h2 id="highlights-title">See Burette in action.</h2><Link className="text-link" href="/features">All features ↗</Link></header>
    <Carousel opts={{ align: "start", slidesToScroll: "auto", breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } } }} plugins={[WheelGesturesPlugin({ forceWheelAxis: "x" })]} aria-label="Burette highlights">
      <CarouselContent>
        {highlights.map(item => <CarouselItem key={item.title} className="home-highlight-slide"><Link href={item.href} className="home-highlight-card">
          <div className="home-highlight-copy"><h3>{item.title}</h3></div>
          <img src={`/assets/features/${item.image}`} alt={item.alt} width="1280" height="880" loading="lazy" />
        </Link></CarouselItem>)}
      </CarouselContent>
      <div className="study-controls"><CarouselPrevious /><CarouselNext /></div>
    </Carousel>
  </section>;
}
