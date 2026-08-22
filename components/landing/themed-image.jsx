"use client";

import { useEffect, useRef } from "react";

// The old markup put both theme variants in the DOM and hid one with
// `display: none`. That does not stop a download - both files were fetched on
// every visit, which in the hero alone meant ~600 KB spent on an image nobody
// would see, in the most contended part of the loading waterfall.
//
// <picture> with a prefers-color-scheme source fetches exactly one, and does it
// with a real src in the server HTML so the image stays LCP-eligible. The one
// case it cannot express is a manual override of the system theme, so the effect
// below repairs that after mount - and only then does a second file get fetched.
export default function ThemedImage({
  light,
  dark,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const img = ref.current;
    if (!img) return;

    const picture = img.parentElement;
    const sources = picture ? [...picture.querySelectorAll("source")] : [];

    const sync = () => {
      const wantsDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      if (wantsDark === systemDark) {
        // The picture already resolves correctly, so put back anything we
        // rewrote and leave the common path at a single request.
        for (const source of sources) {
          const original = source.dataset.srcset;
          if (original === undefined) continue;
          source.setAttribute("srcset", original);
          delete source.dataset.srcset;
        }
        if (img.hasAttribute("data-forced")) {
          img.setAttribute("src", light);
          img.removeAttribute("data-forced");
        }
        return;
      }

      // Setting img.src alone does nothing here: source selection happens before
      // the img is consulted, so a still-matching <source> keeps winning and the
      // picture stays on the system theme. Rewriting each source's srcSet moves
      // the whole picture instead - and the img keeps a PNG, so a browser
      // without AVIF still has something it can decode.
      const wantedPng = wantsDark ? dark : light;
      const wantedAvif = wantedPng.replace(/\.png$/, ".avif");
      for (const source of sources) {
        if (source.dataset.srcset === undefined) {
          source.dataset.srcset = source.getAttribute("srcset") ?? "";
        }
        source.setAttribute(
          "srcset",
          source.getAttribute("type") === "image/avif" ? wantedAvif : wantedPng,
        );
      }
      if (img.getAttribute("src") !== wantedPng) {
        img.setAttribute("src", wantedPng);
      }
      img.setAttribute("data-forced", "");
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    // The system theme can change while a manual choice is stored, and that
    // fires no data-theme mutation, so the override would silently go stale.
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", sync);
    };
  }, [light, dark]);

  // Source order is significant: the browser takes the FIRST source whose type
  // and media both match, and it does not fall back on a failed load. So every
  // .png here must have a sibling .avif on disk - scripts/check-site.mjs enforces
  // that, because a missing one is a broken image rather than a slow one.
  const avif = (src) => src.replace(/\.png$/, ".avif");

  return (
    <picture>
      <source
        srcSet={avif(dark)}
        type="image/avif"
        media="(prefers-color-scheme: dark)"
      />
      <source srcSet={dark} media="(prefers-color-scheme: dark)" />
      <source srcSet={avif(light)} type="image/avif" />
      <img
        ref={ref}
        src={light}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={className}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
