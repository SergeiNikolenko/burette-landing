"use client";

import Link from "next/link";
import Demo from "@/components/features/demo";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

const highlights = [
  { title: "Inspect a binding pocket.", video: "new-20260927-pocket", href: "/features#selection" },
  { title: "Compare molecular poses.", video: "new-20260927-poses", href: "/features#motion" },
  { title: "Explore Chemical Space.", video: "new-20260927-chemical-space", href: "/features#chemical-space" },
  { title: "Create molecular illustrations.", video: "new-20260927-xyzrender", href: "/features#integrations" },
];

export default function Highlights() {
  return <section id="highlights" className="home-highlights page-width" aria-labelledby="highlights-title">
    <header className="home-section-heading"><h2 id="highlights-title">See Burette in action.</h2><Link className="text-link" href="/features">All features ↗</Link></header>
    <Carousel opts={{ align: "start", slidesToScroll: "auto", breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } } }} plugins={[WheelGesturesPlugin({ forceWheelAxis: "x" })]} aria-label="Burette highlights">
      <CarouselContent>
        {highlights.map(item => <CarouselItem key={item.title} className="home-highlight-slide"><Link href={item.href} className="home-highlight-card">
          <div className="home-highlight-copy"><h3>{item.title}</h3></div>
          <Demo id={item.video} title={item.title} />
        </Link></CarouselItem>)}
      </CarouselContent>
      <div className="study-controls"><CarouselPrevious /><CarouselNext /></div>
    </Carousel>
  </section>;
}
