"use client";

import Demo from "./demo";
import ThemedImage from "../landing/themed-image";
import { useEffect, useMemo, useState } from "react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

function FeatureCard({ feature }) {
  return <article className="feature-explainer">
    <div className="feature-explainer-copy"><h3>{feature.title}</h3><p>{feature.description}</p></div>
    {feature.mediaPending ? <div className="feature-recording-pending"><p>Video walkthrough coming soon.</p><a href={feature.docs}>Explore the agent tools ↗</a></div> : <div className="feature-capture"><div className="feature-capture-media">
      {feature.video ? <Demo id={feature.video} title={feature.title} /> : feature.screenshotDark
        ? <ThemedImage light={feature.screenshot} dark={feature.screenshotDark} alt="" width={feature.screenshotWidth || 1280} height={feature.screenshotHeight} />
        : <img src={feature.screenshot} alt="" width={feature.screenshotWidth || 1280} height={feature.screenshotHeight} loading="lazy" decoding="async" />}
    </div></div>}
  </article>;
}

export default function FeatureCards({ group }) {
  const videos = group.features.filter(feature => feature.video || feature.mediaPending);
  const screenshots = group.features.filter(feature => !feature.video && !feature.mediaPending);
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
  return <>
    {videos.length > 0 && <div className="feature-video-grid" aria-label={`${group.title} videos`}>
      {videos.map(feature => <FeatureCard key={feature.title} feature={feature} />)}
    </div>}
    {screenshots.length > 0 && (screenshots.length <= 2
      ? <div className="feature-still-grid">{screenshots.map(feature => <FeatureCard key={feature.title} feature={feature} />)}</div>
      : <Carousel setApi={setApi} className="feature-cards" plugins={plugins} opts={{ align: "start", slidesToScroll: "auto", duration: 35, breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } } }} aria-label={`${group.title} features`}>
        <CarouselContent className="feature-cards-track">
          {screenshots.map(feature => <CarouselItem key={feature.title} className="feature-card-item"><FeatureCard feature={feature} /></CarouselItem>)}
        </CarouselContent>
        <div className="feature-cards-controls"><span className="feature-cards-position" aria-live="polite">{position} / {pages}</span><CarouselPrevious aria-label="Previous features" /><CarouselNext aria-label="Next features" /></div>
      </Carousel>)}
  </>;
}
