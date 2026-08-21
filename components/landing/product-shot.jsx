import { cn } from "@/lib/utils";
import ThemedImage from "./themed-image";

// A framed window rather than a picture fading into the page. The title bar and
// the mono document label are what make a screenshot read as "this is the
// product"; a mask gradient dissolving the bottom edge reads as "this image
// failed to load". The crop ends hard on purpose - a hard edge says the content
// continues, a soft one says it ran out.
export default function ProductShot({
  light,
  dark,
  alt,
  title,
  meta,
  width,
  height,
  ratio = "16 / 9",
  priority = false,
  className,
  sizes,
}) {
  return (
    <figure
      className={cn(
        "border-input bg-muted overflow-hidden rounded-lg border shadow-[var(--shadow-card)]",
        className,
      )}
    >
      {title ? (
        <div className="border-input bg-card flex h-11 items-center justify-between gap-4 border-b px-4 text-[11px] leading-none">
          <span className="text-nav inline-flex min-w-0 items-center gap-2 font-medium">
            <span
              className="bg-brand size-2 shrink-0 rounded-full shadow-[0_0_0_3px_color-mix(in_srgb,var(--brand)_20%,transparent)]"
              aria-hidden="true"
            />
            <span className="truncate">{title}</span>
          </span>
          {meta ? (
            <span className="text-mono hidden shrink-0 font-mono text-[11px] tracking-[0.01em] sm:block">
              {meta}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="overflow-hidden" style={{ aspectRatio: ratio }}>
        <ThemedImage
          light={light}
          dark={dark}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className="size-full object-cover object-top"
        />
      </div>
    </figure>
  );
}
