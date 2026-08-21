"use client";

import { useEffect, useRef } from "react";

export default function SkyCanvas({ className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const host = cv.parentElement;
    if (!host) return;
    let gl = null;
    try {
      gl = cv.getContext("webgl", { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: "low-power" });
    } catch (e) { gl = null; }
    if (!gl) return; // the blurred blobs stay as the fallback

    const VERT = "attribute vec2 a_pos;void main(){gl_Position=vec4(a_pos,0.0,1.0);}";
    // Each cloud is an asymmetric envelope (dome on top, flat base) filled with
    // domain-warped billow noise. A second density sample above the pixel stands in
    // for real light transport, which is what makes the tops read as lit.
    const FRAG = [
      "precision highp float;",
      "uniform vec2 u_res; uniform float u_time; uniform float u_count;",
      "uniform vec3 u_cloud; uniform vec3 u_skyTop; uniform vec3 u_skyBottom;",
      "const mat2 R = mat2(0.80,0.60,-0.60,0.80);",
      "float hash(vec2 p){ return fract(sin(dot(p, vec2(41.31,289.17))) * 26737.367); }",
      "float vnoise(vec2 p){",
      "  vec2 i = floor(p); vec2 f = fract(p); f = f*f*(3.0-2.0*f);",
      "  float a = hash(i), b = hash(i+vec2(1.0,0.0)), c = hash(i+vec2(0.0,1.0)), d = hash(i+vec2(1.0,1.0));",
      "  return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);",
      "}",
      "float fbm(vec2 p){ float s=0.0, a=0.5; for(int i=0;i<4;i++){ s+=a*vnoise(p); p=R*p*2.03+19.19; a*=0.5; } return s; }",
      "float billow(vec2 p){ float s=0.0, a=0.5; for(int i=0;i<5;i++){ s+=a*(1.0-abs(2.0*vnoise(p)-1.0)); p=R*p*2.11+13.37; a*=0.5; } return s; }",
      "float cloudDensity(vec2 p, vec2 c, vec2 r, float seed, float t){",
      "  vec2 q = p - c;",
      "  float ry = q.y > 0.0 ? r.y : r.y * 0.42;",
      "  float env = 1.0 - length(vec2(q.x / r.x, q.y / ry));",
      "  if (env < -0.35) return 0.0;",
      "  vec2 dp = q * (2.4 / r.x) + seed;",
      "  dp += 0.6 * vec2(fbm(dp*1.4 + t*0.04), fbm(dp*1.4 + 7.7 - t*0.03));",
      "  float detail = billow(dp*1.6);",
      "  return env + (detail - 0.62) * 0.62;",
      "}",
      "vec3 shadeCloud(vec3 color, vec3 sky, vec2 p, vec2 c, vec2 r, float seed, float t, float dist){",
      "  float d = cloudDensity(p, c, r, seed, t);",
      "  if (d < 0.02) return color;",
      "  float dUp = cloudDensity(p + vec2(0.0, r.y*0.55), c, r, seed, t);",
      "  float occl = clamp((dUp - d) * 1.1 + d * 0.55, 0.0, 1.0);",
      "  vec3 lit = u_cloud * 1.04;",
      "  vec3 shadow = mix(u_cloud * 0.60, sky, 0.38);",
      "  vec3 cloudCol = mix(lit, shadow, occl * 0.85);",
      "  float alpha = smoothstep(0.02, 0.38, d);",
      "  float rim = smoothstep(0.02, 0.14, d) * (1.0 - smoothstep(0.14, 0.40, d));",
      "  cloudCol += rim * 0.10;",
      "  cloudCol = mix(cloudCol, sky, dist * 0.35);",
      "  alpha *= mix(1.0, 0.8, dist);",
      "  return mix(color, cloudCol, alpha);",
      "}",
      "vec3 cloudPass(vec3 color, vec3 sky, vec2 p, float aspect, float t, float spd, float phase, float y, vec2 r, float seed, float dist){",
      "  float cx = mix(-r.x - 0.25, aspect + r.x + 0.25, fract(t*spd + phase));",
      "  float cy = y + sin(t*0.05 + phase*6.2831) * 0.012;",
      "  return shadeCloud(color, sky, p, vec2(cx, cy), r, seed, t, dist);",
      "}",
      "void main(){",
      "  vec2 uv = gl_FragCoord.xy / u_res;",
      "  float aspect = u_res.x / u_res.y;",
      "  vec2 p = vec2(uv.x * aspect, uv.y);",
      "  float t = u_time;",
      "  vec3 sky = mix(u_skyBottom, u_skyTop, uv.y);",
      "  vec3 color = sky;",
      "  color = mix(color, u_skyBottom * 1.06, smoothstep(0.35, 0.0, uv.y) * 0.5);",
      "  vec2 sunPos = vec2(aspect * 0.78, 0.92);",
      "  float sunDist = length(p - sunPos);",
      "  color += vec3(1.0,0.95,0.82) * exp(-sunDist*sunDist*5.0) * 0.28;",
      "  float cirrusBand = smoothstep(0.55,0.8,uv.y) * (1.0 - smoothstep(0.9,1.0,uv.y));",
      "  if (cirrusBand > 0.01) {",
      "    float streak = fbm(vec2(p.x*1.6 - t*0.006, p.y*12.0));",
      "    color = mix(color, u_cloud*0.98, smoothstep(0.52,0.78,streak) * cirrusBand * 0.35);",
      "  }",
      "  if (u_count > 5.5) color = cloudPass(color, sky, p, aspect, t, 0.006, 0.10, 0.84, vec2(0.20,0.10), 43.7, 1.0);",
      "  if (u_count > 4.5) color = cloudPass(color, sky, p, aspect, t, 0.008, 0.62, 0.73, vec2(0.24,0.12), 71.3, 0.85);",
      "  if (u_count > 3.5) color = cloudPass(color, sky, p, aspect, t, 0.011, 0.33, 0.60, vec2(0.34,0.16), 17.3, 0.55);",
      "  if (u_count > 2.5) color = cloudPass(color, sky, p, aspect, t, 0.013, 0.80, 0.47, vec2(0.30,0.15), 29.9, 0.45);",
      "  if (u_count > 1.5) color = cloudPass(color, sky, p, aspect, t, 0.016, 0.05, 0.35, vec2(0.46,0.20), 91.1, 0.15);",
      "  color = cloudPass(color, sky, p, aspect, t, 0.020, 0.48, 0.20, vec2(0.56,0.24), 57.2, 0.0);",
      "  gl_FragColor = vec4(color, 1.0);",
      "}"
    ].join("\n");

    const compile = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src); gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) { gl.deleteShader(sh); return null; }
      return sh;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT), fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs);
    gl.bindAttribLocation(prog, 0, "a_pos"); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const loc = {
      res: gl.getUniformLocation(prog, "u_res"),
      time: gl.getUniformLocation(prog, "u_time"),
      count: gl.getUniformLocation(prog, "u_count"),
      cloud: gl.getUniformLocation(prog, "u_cloud"),
      skyTop: gl.getUniformLocation(prog, "u_skyTop"),
      skyBottom: gl.getUniformLocation(prog, "u_skyBottom")
    };

    const rgb = (value) => {
      const v = String(value || "").trim();
      if (v.charAt(0) === "#") {
        const hex = v.length === 4
          ? v[1] + v[1] + v[2] + v[2] + v[3] + v[3]
          : v.slice(1, 7);
        const n = parseInt(hex, 16);
        return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
      }
      const parts = v.match(/[\d.]+/g);
      return parts && parts.length >= 3
        ? [parts[0] / 255, parts[1] / 255, parts[2] / 255]
        : [0.5, 0.5, 0.5];
    };
    const readPalette = () => {
      const s = getComputedStyle(document.documentElement);
      const cloud = rgb(s.getPropertyValue("--sky-cloud"));
      const top = rgb(s.getPropertyValue("--sky-top"));
      const bottom = rgb(s.getPropertyValue("--sky-bottom"));
      gl.useProgram(prog);
      gl.uniform3f(loc.cloud, cloud[0], cloud[1], cloud[2]);
      gl.uniform3f(loc.skyTop, top[0], top[1], top[2]);
      gl.uniform3f(loc.skyBottom, bottom[0], bottom[1], bottom[2]);
    };

    let skyRetry = 0;
    let w = 0, h = 0;
    const resize = () => {
      const rect = host.getBoundingClientRect();
      if (!rect.width || !rect.height) { skyRetry = setTimeout(resize, 120); return; }
      w = rect.width; h = rect.height;
      // five octaves of billow noise per cloud pass is the most expensive thing on the
      // page, so the shader gets a fixed pixel budget rather than the display's full DPR
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(1.6e6 / (w * h)));
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      gl.viewport(0, 0, cv.width, cv.height);
      gl.useProgram(prog);
      gl.uniform2f(loc.res, cv.width, cv.height);
      gl.uniform1f(loc.count, w < 700 ? 4 : 5);
      draw(0);
    };

    const SPEED = 0.28, FRAME = 1000 / 30; // the drift is slow enough that 30fps reads identically
    const t0 = performance.now();
    const draw = (elapsed) => {
      gl.useProgram(prog);
      gl.uniform1f(loc.time, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motionQuery.matches;

    let raf = 0;
    let running = false, lastFrame = 0;
    const tick = (now) => {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      if (now - lastFrame < FRAME) return;
      lastFrame = now;
      draw((now - t0) / 1000 * SPEED);
    };
    const start = () => {
      if (running || reduced || document.hidden) return;
      running = true; lastFrame = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    readPalette();
    resize();
    host.setAttribute("data-sky", "gl");
    const refreshPalette = () => { readPalette(); if (!running) draw((performance.now() - t0) / 1000 * SPEED); };

    // the theme flip only rewrites CSS custom properties, so the shader has to be told
    // to re-read them; the class component got that call from setTheme()
    const themeObserver = new MutationObserver(refreshPalette);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // the program, buffers and uniforms die with the context and this does not
    // rebuild them, so a lost context degrades to the blurred blobs for good
    const onContextLost = (e) => {
      e.preventDefault();
      stop();
      host.removeAttribute("data-sky");
    };
    cv.addEventListener("webglcontextlost", onContextLost);

    let ro = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(() => resize());
      ro.observe(host);
    } else {
      window.addEventListener("resize", resize);
    }

    // reduced motion: the frame painted by resize() is the whole show, so none of the
    // animation wiring exists until the preference says otherwise
    let visible = false;
    let io = null;
    let onSkyVis = null;
    const enableMotion = () => {
      if (onSkyVis) return;
      onSkyVis = () => { if (document.hidden) stop(); else if (visible) start(); };
      document.addEventListener("visibilitychange", onSkyVis);

      if ("IntersectionObserver" in window) {
        io = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (entry.isIntersecting) start(); else stop();
        });
        io.observe(host);
      } else {
        visible = true;
        start();
      }
    };
    const disableMotion = () => {
      stop();
      if (onSkyVis) { document.removeEventListener("visibilitychange", onSkyVis); onSkyVis = null; }
      if (io) { io.disconnect(); io = null; }
      visible = false;
    };
    const onMotion = () => {
      reduced = motionQuery.matches;
      if (reduced) disableMotion(); else enableMotion();
    };
    motionQuery.addEventListener("change", onMotion);
    if (!reduced) enableMotion();

    return () => {
      clearTimeout(skyRetry);
      motionQuery.removeEventListener("change", onMotion);
      disableMotion();
      themeObserver.disconnect();
      cv.removeEventListener("webglcontextlost", onContextLost);
      if (ro) ro.disconnect(); else window.removeEventListener("resize", resize);
      host.removeAttribute("data-sky");
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
