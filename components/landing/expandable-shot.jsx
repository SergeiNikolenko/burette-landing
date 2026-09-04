"use client";

import { useState } from "react";
import { Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ThemedImage from "./themed-image";
import { cn } from "@/lib/utils";

// Burette's screenshots are dense product UI - file lists, molecule grids, Mol*
// chrome - and at card width none of it is readable, so a card that cannot be
// opened is decoration. The static page had a hand-rolled #lightbox for exactly
// this and the React port dropped it; this restores the behaviour on the shadcn
// Dialog instead, which brings the focus trap, Escape, scroll lock and the
// dialog role that the old one only partly had.
export default function ExpandableShot({
  light,
  dark,
  alt,
  title,
  meta,
  width,
  height,
  priority = false,
  sizes,
  className,
}) {
  const [open, setOpen] = useState(false);

  const frame = (
    <figure
      className={cn(
        "border-input bg-muted overflow-hidden rounded-lg border shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <div className="relative overflow-hidden" >
        <ThemedImage
          light={light}
          dark={dark}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className="h-auto w-full"
        />
        {/* Cards without a title bar have nowhere to put the affordance, so it
            floats over the image instead - otherwise nothing tells you the
            screenshot opens. */}
        {(
          <span
            aria-hidden="true"
            className="bg-card/85 text-nav border-input pointer-events-none absolute top-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] opacity-100 backdrop-blur sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100"
          >
            <Maximize2 className="size-3" />
            <span className="hidden sm:inline">Enlarge</span>
          </span>
        )}
      </div>
      {title ? (
        <figcaption className="border-border bg-card flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t px-4 py-3 text-xs">
          <span className="text-foreground font-medium">{title}</span>
          {meta ? <span className="text-muted-foreground">{meta}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* A real button, so Enter and Space work and screen readers announce
            what opening it will do - the old lightbox bolted role and tabindex
            onto an <img> from JS, which meant no keyboard access at all when
            that script failed to run. */}
        <button
          type="button"
          className="group focus-visible:ring-ring block w-full cursor-zoom-in text-left focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {frame}
          <span className="sr-only">Enlarge: {alt}</span>
        </button>
      </DialogTrigger>

      <DialogContent
        showCloseButton
        className="bg-card border-input w-[min(96vw,1500px)] max-w-none gap-0 overflow-hidden rounded-lg p-0 sm:max-w-none"
      >
        <div className="border-input bg-card flex items-center justify-between gap-4 border-b px-4 py-3">
          <DialogTitle className="text-foreground inline-flex min-w-0 items-center gap-2 text-[13px] font-medium">
            <span
              className="bg-brand size-2 shrink-0 rounded-full"
              aria-hidden="true"
            />
            <span className="truncate">{title ?? "Burette"}</span>
          </DialogTitle>
          {meta ? (
            <span className="text-mono hidden shrink-0 font-mono text-[11px] sm:block">
              {meta}
            </span>
          ) : null}
        </div>

        <DialogDescription className="sr-only">{alt}</DialogDescription>

        {/* No crop here: the point of opening it is to see the whole frame. */}
        <div className="bg-muted max-h-[82vh] overflow-auto">
          <ThemedImage
            light={light}
            dark={dark}
            alt={alt}
            width={width}
            height={height}
            className="h-auto w-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
