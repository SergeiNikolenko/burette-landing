"use client";

import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

const highlights = [
  { label: "Finder Quick Look", title: "A molecule. One press away.", image: "finder", href: "#quick-look-story", alt: "A fullerene open in Finder Quick Look" },
  { label: "Structure inspection", title: "Get closer to the binding site.", image: "selection", href: "#structure-story", alt: "Protein inspection in the Burette molecular viewer" },
  { label: "Molecular poses", title: "See how the poses differ.", image: "shot-sdf-poses", review: true, href: "/features#motion", alt: "Pose controls for an SDF file in Burette" },
  { label: "Trajectories", title: "Follow every movement.", image: "motion", href: "/features#motion", alt: "A molecular trajectory in Burette" },
  { label: "Chemical Space", title: "Find related molecules.", image: "space", href: "/features#chemical-space", alt: "Molecular similarity map and linked structures" },
];

export default function Highlights() {
  return <section className="home-highlights page-width" aria-labelledby="highlights-title">
    <header className="home-section-heading"><div><p className="section-label">A few things you can do</p><h2 id="highlights-title">Explore what’s inside.</h2></div><Link className="text-link" href="/features">Explore all features ↗</Link></header>
    <Carousel opts={{ align: "start", breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } } }} plugins={[WheelGesturesPlugin({ forceWheelAxis: "x" })]} aria-label="Burette highlights">
      <CarouselContent>
        {highlights.map(item => <CarouselItem key={item.label} className="home-highlight-slide"><Link href={item.href} className={`home-highlight-card${item.review ? " needs-capture-review" : ""}`}>
          <div className="home-highlight-copy"><p>{item.label}</p><h3>{item.title}</h3></div>
          <img src={`/assets/features/${item.image}.jpg`} alt={item.alt} width="1280" height="880" loading="lazy" />
          <span className="home-highlight-link">{item.review && <small>Review capture · </small>}Explore <span aria-hidden="true">↗</span></span>
        </Link></CarouselItem>)}
      </CarouselContent>
      <div className="study-controls"><CarouselPrevious /><CarouselNext /></div>
    </Carousel>
  </section>;
}
