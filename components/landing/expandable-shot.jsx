"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ThemedImage from "./themed-image";
import { cn } from "@/lib/utils";

// Keep screenshots unobstructed; the dialog supplies keyboard access and Escape.
export default function ExpandableShot({
  light,
  dark,
  alt,
  title,
  width,
  height,
  ratio = "16 / 9",
  priority = false,
  sizes,
  className,
}) {
  const [open, setOpen] = useState(false);

  const frame = (
    <figure
      className={cn(
        "product-shot bg-muted overflow-hidden rounded-lg",
        className,
      )}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: ratio }}>
        <ThemedImage
          light={light}
          dark={dark}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className="size-full object-contain"
        />
      </div>
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
        className="screenshot-dialog font-sans bg-card border-0 w-[min(96vw,1500px)] max-w-none gap-0 overflow-hidden rounded-lg p-0 sm:max-w-none"
      >
        <DialogTitle className="sr-only">
          {title ?? "Burette screenshot"}
        </DialogTitle>

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
