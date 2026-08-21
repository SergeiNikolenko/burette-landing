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

    const sync = () => {
      const wantsDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      // Leave the <picture> alone whenever it already resolves correctly, so the
      // common path stays at one request.
      if (wantsDark === systemDark) {
        img.removeAttribute("data-forced");
        return;
      }
      // Override with the AVIF too, otherwise flipping the theme by hand would
      // quietly downgrade to the PNG that is 8x larger.
      const wanted = (wantsDark ? dark : light).replace(/\.png$/, ".avif");
      if (img.getAttribute("src") !== wanted) {
        img.setAttribute("src", wanted);
        img.setAttribute("data-forced", "");
      }
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
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
