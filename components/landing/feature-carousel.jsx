"use client";

import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LazyVideo from "./lazy-video";
import ThemedImage from "./themed-image";

export default function FeatureCarousel() {
  return (
    <Carousel
      className="detail-studies page-width"
      opts={{
        align: "start",
        breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } },
      }}
      plugins={[WheelGesturesPlugin({ forceWheelAxis: "x" })]}
      aria-label="More ways to explore with Burette"
    >
      <CarouselContent className="study-track">
        <CarouselItem className="study-slide" aria-label="1 of 3">
          <article>
            <LazyVideo
              src="/assets/lasso.mp4"
              poster="/assets/lasso-poster.jpg"
              label="Draw a lasso in Burette to select residues and ligands in the molecular viewport"
              width={1280}
              height={978}
            />
            <h3>Select it where you see it.</h3>
            <p>
              Draw around a pocket or ligand. Use the selection for
              measurements, isolation, and export.
            </p>
          </article>
        </CarouselItem>
        <CarouselItem className="study-slide" aria-label="2 of 3">
          <article>
            <ThemedImage
              light="/assets/second-light.png"
              dark="/assets/second-dark.png"
              alt="Trajectory playback and frame controls in Burette"
              width={1804}
              height={1262}
              className="study-image"
              sizes="(min-width: 900px) 700px, 85vw"
            />
            <h3>Follow every frame.</h3>
            <p>
              Play a molecular trajectory, pause on a moment, and step through
              the structure frame by frame.
            </p>
          </article>
        </CarouselItem>
        <CarouselItem className="study-slide" aria-label="3 of 3">
          <article>
            <ThemedImage
              light="/assets/xyzr-light.png"
              dark="/assets/xyzr-dark.png"
              alt="Molecular illustration rendered with the optional xyzrender engine"
              width={1804}
              height={1262}
              className="study-image"
              sizes="(min-width: 900px) 700px, 85vw"
            />
            <h3>Give your structure a new view.</h3>
            <p>
              Create vector artwork with the optional xyzrender engine, ready
              for a figure or presentation.
            </p>
          </article>
        </CarouselItem>
      </CarouselContent>
      <div className="study-controls">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
