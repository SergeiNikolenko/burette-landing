"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function FeatureCards({ group }) {
  return <Carousel className="feature-cards" opts={{ align: "start", breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } } }} aria-label={`${group.title} features`}>
    <CarouselContent className="feature-cards-track">
      {group.features.map(feature => <CarouselItem key={feature.title} className="feature-card-item">
        <article className="feature-explainer">
          {feature.screenshot ? <div className="feature-capture"><img src={feature.screenshot} alt="" width="1280" height={feature.screenshotHeight} loading="lazy" decoding="async" /><span>Review capture</span></div>
            : <div className="feature-capture-pending" role="img" aria-label={`Screenshot needed: ${feature.title}`}><span className="capture-skeleton-window" aria-hidden="true"><i /><i /><i /></span><span>Screenshot needed</span></div>}
          <div className="feature-explainer-copy"><h3>{feature.title}</h3><p>{feature.description}</p></div>
        </article>
      </CarouselItem>)}
    </CarouselContent>
    <div className="feature-cards-controls"><CarouselPrevious aria-label="Previous features" /><CarouselNext aria-label="Next features" /></div>
  </Carousel>;
}
