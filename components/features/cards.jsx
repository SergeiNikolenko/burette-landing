"use client";

import Demo from "./demo";
import { useEffect, useMemo, useState } from "react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function FeatureCards({ group }) {
  const plugins = useMemo(() => [WheelGesturesPlugin({ forceWheelAxis: "x" })], []);
  const [api, setApi] = useState(null);
  const [position, setPosition] = useState(1);
  const [pages, setPages] = useState(1);
  useEffect(() => {
    if (!api) return;
    const update = () => { setPosition(api.selectedScrollSnap() + 1); setPages(api.scrollSnapList().length); };
    update();
    api.on("select", update); api.on("reInit", update);
    return () => { api.off("select", update); api.off("reInit", update); };
  }, [api]);
  return <Carousel setApi={setApi} className="feature-cards" plugins={plugins} opts={{ align: "start", slidesToScroll: "auto", duration: 35, breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } } }} aria-label={`${group.title} features`}>
    <CarouselContent className="feature-cards-track">
      {group.features.map(feature => <CarouselItem key={feature.title} className="feature-card-item">
        <article className="feature-explainer">
          <div className="feature-explainer-copy"><h3>{feature.title}</h3><p>{feature.description}</p></div>
          {feature.video ? <div className="feature-capture"><div className="feature-capture-media"><Demo id={feature.video} title={feature.title} /></div><span>Review capture</span></div> : feature.screenshot ? <div className="feature-capture"><div className="feature-capture-media"><img src={feature.screenshot} alt="" width={feature.screenshotWidth || 1280} height={feature.screenshotHeight} loading="lazy" decoding="async" /></div><span>{feature.captureStatus === "replace" ? "Replace capture" : "Review capture"}</span></div>
            : <div className="feature-capture-pending" role="img" aria-label={`Screenshot needed: ${feature.title}`}><span className="capture-skeleton-window" aria-hidden="true"><i /><i /><i /></span><span>Screenshot needed</span></div>}
        </article>
      </CarouselItem>)}
    </CarouselContent>
    <div className="feature-cards-controls"><span className="feature-cards-position" aria-live="polite">{position} / {pages}</span><CarouselPrevious aria-label="Previous features" /><CarouselNext aria-label="Next features" /></div>
  </Carousel>;
}
