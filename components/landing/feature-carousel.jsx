"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import LazyVideo from "./lazy-video";
import ThemedImage from "./themed-image";
import LiveScene from "./live-scene";
import { featureStories } from "./feature-stories";

export default function FeatureCarousel() {
  const returnFocus = useRef(null);
  const [selected, setSelected] = useState(null);
  return <div className="feature-gallery">
    <div className="page-width gallery-heading"><p className="section-label">More of Burette</p><h2>There’s more to explore.</h2><p>Choose a card for a closer look.</p></div>
    <Carousel className="detail-studies page-width" opts={{ align: "start", breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } } }} plugins={[WheelGesturesPlugin({ forceWheelAxis: "x" })]} aria-label="Explore Burette features">
      <CarouselContent className="study-track">
        {featureStories.map((item, index) => <CarouselItem className="feature-card-slide" key={item.id} aria-label={`${index + 1} of ${featureStories.length}`}>
          <button className="feature-card" onClick={event => { returnFocus.current = event.currentTarget; setSelected(item); }} aria-label={`Explore ${item.category.toLowerCase()}`}>
            <span className="feature-card-copy"><span>{item.category}</span><strong>{item.title}</strong></span>
            {item.image ? <ThemedImage light={`/assets/${item.image}-light.png`} dark={`/assets/${item.image}-dark.png`} alt="" width={1804} height={1262} className="feature-card-image" sizes="(max-width: 600px) 85vw, 400px" /> : <img src={item.poster} alt="" className="feature-card-image" loading="lazy" />}
            <span className="feature-card-open" aria-hidden="true">+</span>
          </button>
        </CarouselItem>)}
      </CarouselContent>
      <div className="study-controls"><CarouselPrevious /><CarouselNext /></div>
    </Carousel>
    <Dialog open={!!selected} onOpenChange={open => { if (!open) setSelected(null); }}>
      <DialogContent className="landing feature-story-dialog" onCloseAutoFocus={event => { event.preventDefault(); returnFocus.current?.focus({ preventScroll: true }); }}>
        {selected && <><header><p className="section-label">{selected.category}</p><DialogTitle>{selected.title}</DialogTitle><DialogDescription>{selected.description}</DialogDescription></header>
          {selected.scene ? <LiveScene autoLoad scene={selected.scene} label={selected.category} light={selected.image && `/assets/${selected.image}-light.png`} dark={selected.image && `/assets/${selected.image}-dark.png`} />
            : selected.video ? <LazyVideo src={selected.video} poster={selected.poster} label={selected.description} width={1280} height={978} />
            : <ThemedImage light={`/assets/${selected.image}-light.png`} dark={`/assets/${selected.image}-dark.png`} alt={selected.description} width={1804} height={1262} className="feature-story-image" sizes="90vw" />}
          <Link className="text-link" href={selected.docs}>Read the guide ↗</Link></>}
      </DialogContent>
    </Dialog>
  </div>;
}
