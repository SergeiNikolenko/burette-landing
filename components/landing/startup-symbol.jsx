"use client";

import { useEffect, useId, useRef } from "react";

// Matches Burette's startup symbol and click response from PR #709.
export default function StartupSymbol({ disabled }) {
  const id = useId().replaceAll(":", "");
  const root = useRef(null);
  const animations = useRef([]);
  useEffect(() => () => animations.current.forEach(animation => animation.cancel()), []);
  const spin = () => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rotation = root.current.querySelector(".startup-rotation");
    const response = root.current.querySelector(".startup-response");
    const transform = getComputedStyle(rotation).transform;
    const currentResponse = getComputedStyle(response).transform;
    const matrix = new DOMMatrix(transform === "none" ? undefined : transform);
    const angle = Math.atan2(matrix.b, matrix.a) * 180 / Math.PI;
    animations.current.forEach(animation => animation.cancel());
    animations.current = [
      rotation.animate([{ transform: `rotate(${angle}deg)` }, { transform: `rotate(${angle + 360}deg)` }], { duration: 1350, easing: "cubic-bezier(.16,.75,.18,1)", fill: "forwards" }),
      response.animate([{ transform: currentResponse, offset: 0 }, { transform: "translateY(-5px) scale(1.09)", offset: .22 }, { transform: "translateY(1px) scale(.99)", offset: .7 }, { transform: "translateY(0) scale(1)", offset: 1 }], { duration: 1000, easing: "cubic-bezier(.22,.7,.3,1)" }),
    ];
  };
  return <button ref={root} className="startup-symbol" type="button" aria-label="Spin Burette symbol" disabled={disabled} onClick={spin}>
    <span className="startup-lift"><span className="startup-response">
      <svg viewBox="0 0 128 128" aria-hidden="true">
        <defs>
          <filter id={`${id}-matte`} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  .4 .4 .4 0 -.12" /></filter>
          <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="128" height="128"><g className="startup-tilt"><g className="startup-rotation"><image href="/assets/boot-mark.png" width="128" height="128" filter={`url(#${id}-matte)`} /></g></g></mask>
          <linearGradient id={`${id}-light`} gradientUnits="userSpaceOnUse" x1="-50" y1="-50" x2="50" y2="50"><stop stopColor="currentColor" stopOpacity="0" /><stop offset=".5" stopColor="currentColor" stopOpacity=".8" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient>
        </defs>
        <g mask={`url(#${id}-mask)`}><rect className="startup-base" width="128" height="128" /><rect className="startup-wave" x="-256" y="-256" width="640" height="640" fill={`url(#${id}-light)`} /></g>
      </svg>
    </span></span>
  </button>;
}
