"use client";

import { useEffect, useRef } from "react";

export default function MolecularField({ className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const host = cv.parentElement;
    if (!host) return;
    // Measurement and visibility stay on the canvas's own wrapper, but the
    // cursor lens listens on the whole section: the wrapper sits behind the
    // copy, so pointer events over the headline and buttons never reach it.
    // pointermove bubbles, so the section sees every move across the hero.
    const pointerHost = cv.closest("section") ?? host;
    const ctx = cv.getContext("2d");

    // Skeletal geometry baked from RDKit once, so the hero needs no WASM at runtime:
    // atoms are [x, y] on a unit radius (y up) plus a symbol for heteroatoms only,
    // bonds are [atomA, atomB, order?] with order omitted for single bonds.
    const SHAPES = [
      { a: [[0.869,0.494],[0.457,0.494,"N"],[0.214,0.828],[-0.178,0.7,"N"],[-0.178,0.288],[0.214,0.16],[0.3,-0.243],[0.693,-0.371,"O"],[-0.006,-0.519,"N"],[0.079,-0.923],[-0.399,-0.392],[-0.705,-0.668,"O"],[-0.484,0.012,"N"],[-0.877,0.139]],
        b: [[0,1],[1,2],[2,3,2],[3,4],[4,5,2],[5,6],[6,7,2],[6,8],[8,9],[8,10],[10,11,2],[10,12],[12,13],[5,1],[12,4]] }, // caffeine
      { a: [[0.918,-0.397],[0.545,-0.397],[0.358,-0.72,"O"],[0.358,-0.075,"O"],[-0.014,-0.075],[-0.201,-0.397],[-0.574,-0.397],[-0.76,-0.075],[-0.574,0.248],[-0.201,0.248],[-0.014,0.571],[-0.201,0.894,"O"],[0.358,0.571,"O"]],
        b: [[0,1],[1,2,2],[1,3],[3,4],[4,5,2],[5,6],[6,7,2],[7,8],[8,9,2],[9,10],[10,11,2],[10,12],[9,4]] }, // aspirin
      { a: [[0.992,-0.125],[0.722,-0.125],[0.586,-0.359],[0.586,0.109],[0.316,0.109],[0.18,-0.125],[-0.09,-0.125],[-0.225,0.109],[-0.09,0.344],[0.18,0.344],[-0.496,0.109],[-0.631,0.344],[-0.631,-0.125],[-0.496,-0.359,"O"],[-0.902,-0.125,"O"]],
        b: [[0,1],[1,2],[1,3],[3,4],[4,5,2],[5,6],[6,7,2],[7,8],[8,9,2],[7,10],[10,11],[10,12],[12,13,2],[12,14],[9,4]] }, // ibuprofen
      { a: [[0.93,-0.367,"O"],[0.734,-0.028],[0.343,-0.028],[0.147,-0.367,"O"],[-0.245,-0.367],[-0.441,-0.707,"O"],[-0.441,-0.028],[-0.832,-0.028,"O"],[-0.245,0.311],[-0.441,0.65,"O"],[0.147,0.311],[0.343,0.65,"O"]],
        b: [[0,1],[2,1],[2,3],[3,4],[4,5],[4,6],[6,7],[6,8],[8,9],[8,10],[10,11],[10,2]] }, // glucose
      { a: [[0.962,-0.274,"N"],[0.646,-0.274],[0.488,0],[0.172,0],[0.014,-0.274],[-0.301,-0.274],[-0.459,0],[-0.775,0,"O"],[-0.301,0.274],[-0.459,0.547,"O"],[0.014,0.274]],
        b: [[0,1],[1,2],[2,3],[3,4,2],[4,5],[5,6,2],[6,7],[6,8],[8,9],[8,10,2],[10,3]] }, // dopamine
      { a: [[0.981,-0.195],[0.627,-0.195],[0.45,-0.501,"O"],[0.45,0.111,"N"],[0.096,0.111],[-0.08,-0.195],[-0.434,-0.195],[-0.611,0.111],[-0.965,0.111,"O"],[-0.434,0.418],[-0.08,0.418]],
        b: [[0,1],[1,2,2],[1,3],[3,4],[4,5,2],[5,6],[6,7,2],[7,8],[7,9],[9,10,2],[10,4]] }, // paracetamol
      { a: [[-0.397,-0.666],[0.013,-0.579,"N"],[0.325,-0.86],[0.689,-0.65],[0.601,-0.239],[0.184,-0.195],[-0.026,0.168],[0.184,0.532],[-0.026,0.895],[-0.446,0.895],[-0.656,0.532,"N"],[-0.446,0.168]],
        b: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7,2],[7,8],[8,9,2],[9,10],[10,11,2],[5,1],[11,6]] }, // nicotine
      { a: [[-0.694,-0.72,"N"],[-0.411,-0.628],[-0.349,-0.336],[-0.066,-0.244],[0.175,-0.42],[0.416,-0.244,"N"],[0.324,0.039],[0.473,0.297],[0.324,0.555],[0.026,0.555],[-0.123,0.813,"O"],[-0.123,0.297],[0.026,0.039]],
        b: [[0,1],[1,2],[2,3],[3,4,2],[4,5],[5,6],[6,7,2],[7,8],[8,9,2],[9,10],[9,11],[11,12,2],[12,3],[12,6]] }, // serotonin
      { a: [[-1,0.01,"N"],[-0.499,0.172],[-0.39,0.687,"N"],[0.111,0.85],[0.503,0.498,"N"],[0.393,-0.017],[0.703,-0.443,"N"],[0.393,-0.87],[-0.108,-0.707,"N"],[-0.108,-0.18]],
        b: [[0,1],[1,2,2],[2,3],[3,4,2],[4,5],[5,6],[6,7],[7,8,2],[8,9],[9,1],[9,5,2]] }, // adenine
      { a: [[0.949,0.154],[0.459,0.154,"N"],[0.369,0],[0.191,0],[-0.054,0.154],[-0.388,0.154],[-0.492,-0.164,"O"],[-0.221,-0.361],[-0.186,-0.693],[-0.457,-0.89,"O"],[0.119,-0.829],[0.39,-0.633],[0.355,-0.3],[0.246,0.177],[0.447,0.444],[0.113,0.444],[-0.054,0.733],[-0.388,0.733],[-0.556,0.444],[-0.89,0.444,"O"],[0.049,-0.164]],
        b: [[0,1],[1,2],[2,3],[4,3],[4,5],[5,6],[6,7],[7,8,2],[8,9],[8,10],[10,11,2],[11,12],[12,13],[14,13],[14,15],[15,16],[16,17,2],[17,18],[18,19],[12,20,2],[14,1],[15,4],[20,4],[18,5],[20,7]] }, // morphine
      { a: [[0.777,0.167],[0.624,0.029],[0.503,0.195],[0.306,0.132,"N"],[0.306,-0.075],[0.503,-0.138,"S"],[0.1,-0.075],[0.1,0.132],[-0.046,0.277,"O"],[-0.046,-0.22,"N"],[-0.245,-0.167],[-0.298,0.032,"O"],[-0.391,-0.313],[-0.59,-0.259],[-0.643,-0.06],[-0.842,-0.007],[-0.988,-0.153],[-0.935,-0.352],[-0.736,-0.405],[0.566,0.392],[0.428,0.545,"O"],[0.768,0.434,"O"],[0.777,-0.109]],
        b: [[0,1],[1,2],[2,3],[3,4],[4,5],[4,6],[6,7],[7,8,2],[6,9],[9,10],[10,11,2],[10,12],[12,13],[13,14,2],[14,15],[15,16,2],[16,17],[17,18,2],[2,19],[19,20,2],[19,21],[1,22],[5,1],[7,3],[18,13]] }, // penicillin G
      { a: [[-0.989,-0.146],[-0.851,-0.27],[-0.89,-0.452],[-0.675,-0.213],[-0.537,-0.337],[-0.36,-0.28],[-0.222,-0.404],[-0.261,-0.586],[-0.046,-0.347],[0.105,-0.456],[0.255,-0.347],[0.197,-0.17],[0.29,-0.009],[0.476,-0.009],[0.569,0.151],[0.476,0.312],[0.569,0.473],[0.476,0.634],[0.569,0.794,"O"],[0.29,0.634],[0.197,0.473],[0.29,0.312],[0.105,0.312],[0.197,0.151],[0.012,0.151],[-0.081,-0.009],[0.012,-0.17],[-0.173,-0.19]],
        b: [[0,1],[1,2],[1,3],[3,4],[4,5],[5,6],[6,7],[6,8],[8,9],[9,10],[11,10],[11,12],[12,13],[13,14],[14,15,2],[15,16],[16,17],[17,18],[17,19],[19,20],[20,21],[21,22],[21,23],[23,24],[24,25],[25,26],[26,27],[26,8],[26,11],[23,12],[21,15]] }, // cholesterol
      { a: [[1.0,0.0],[0.5,-0.866],[-0.5,-0.866],[-1.0,0.0],[-0.5,0.866],[0.5,0.866]],
        b: [[0,1],[1,2,2],[2,3],[3,4,2],[4,5],[5,0,2]] }, // benzene
      { a: [[0.967,-0.255,"N"],[0.786,-0.248],[0.69,-0.401,"N"],[0.509,-0.394],[0.425,-0.234,"N"],[0.521,-0.081],[0.702,-0.088],[0.764,0.082,"N"],[0.622,0.194],[0.472,0.093,"N"],[0.302,0.155],[0.151,0.055,"O"],[0.009,0.166],[-0.165,0.117],[-0.295,0.243,"O"],[-0.469,0.194,"P"],[-0.419,0.02,"O"],[-0.518,0.368,"O"],[-0.643,0.145,"O"],[-0.687,-0.031,"P"],[-0.863,0.014,"O"],[-0.512,-0.075,"O"],[-0.731,-0.206,"O"],[-0.602,-0.332,"P"],[-0.728,-0.462,"O"],[-0.476,-0.203,"O"],[-0.472,-0.458,"O"],[0.072,0.336],[-0.029,0.487,"O"],[0.252,0.329],[0.364,0.472,"O"]],
        b: [[0,1],[1,2],[2,3,2],[3,4],[4,5,2],[5,6],[6,7],[7,8,2],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,15],[15,16,2],[15,17],[15,18],[18,19],[19,20,2],[19,21],[19,22],[22,23],[23,24,2],[23,25],[23,26],[12,27],[27,28],[27,29],[29,30],[6,1,2],[29,10],[9,5]] }, // ATP
      { a: [[-0.999,-0.047],[-0.833,-0.179,"N"],[-0.637,-0.101],[-0.471,-0.232],[-0.275,-0.154],[-0.109,-0.285,"O"],[0.087,-0.207],[0.253,-0.338],[0.449,-0.26],[0.48,-0.051],[0.676,0.027],[0.873,0.105,"F"],[0.754,-0.17,"F"],[0.598,0.223,"F"],[0.314,0.08],[0.118,0.002],[-0.244,0.055],[-0.048,0.133],[-0.017,0.342],[-0.183,0.473],[-0.379,0.395],[-0.41,0.186]],
        b: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8,2],[8,9],[9,10],[10,11],[10,12],[10,13],[9,14,2],[14,15],[4,16],[16,17,2],[17,18],[18,19,2],[19,20],[20,21,2],[15,6,2],[21,16]] }, // fluoxetine
      { a: [[-0.994,0.114,"O"],[-0.639,0.156],[-0.425,-0.13],[-0.566,-0.458,"O"],[-0.071,-0.087],[0.171,-0.349,"O"],[0.495,-0.199],[0.807,-0.373,"O"],[0.453,0.155],[0.714,0.398,"O"],[0.103,0.224],[-0.047,0.548,"O"]],
        b: [[0,1],[1,2],[2,3],[2,4],[4,5],[5,6],[6,7,2],[6,8],[8,9],[8,10,2],[10,11],[10,4]] }, // ascorbic acid
      { a: [[-0.582,0.26],[-0.446,0.062],[-0.32,0.267],[-0.079,0.261],[0.036,0.049],[-0.09,-0.157],[0.025,-0.368],[0.266,-0.375],[0.392,-0.169],[0.633,-0.175],[0.759,0.03],[1.0,0.024,"O"],[0.644,0.242],[0.403,0.248],[0.277,0.043],[0.162,0.254],[-0.331,-0.15],[-0.496,-0.325],[-0.714,-0.221],[-0.683,0.018],[-0.857,0.183,"O"]],
        b: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9,2],[9,10],[10,11,2],[10,12],[12,13],[13,14],[14,15],[5,16],[16,17],[17,18],[18,19],[19,20],[16,1],[19,1],[14,4],[14,8]] }, // testosterone
      { a: [[-0.884,-0.051],[-0.603,0.067,"N"],[-0.374,-0.135],[-0.478,-0.421],[-0.282,-0.655],[0.019,-0.602],[0.215,-0.836,"Cl"],[0.123,-0.315],[-0.073,-0.082],[0.073,0.186],[-0.046,0.468,"N"],[-0.34,0.55],[-0.587,0.372],[-0.855,0.518,"O"],[0.377,0.171],[0.517,-0.1],[0.821,-0.116],[0.987,0.141],[0.848,0.412],[0.543,0.428]],
        b: [[0,1],[1,2],[2,3],[3,4,2],[4,5],[5,6],[5,7,2],[7,8],[8,9],[9,10,2],[10,11],[11,12],[12,13,2],[9,14],[14,15,2],[15,16],[16,17,2],[17,18],[18,19,2],[12,1],[19,14],[8,2,2]] } // diazepam
    ];

    // One shared plane: every molecule gets the same size band, weight and lag,
    // so the field reads as a calm pattern - nothing tiny in the distance and
    // nothing oversized flying at the camera.
    const LAYER = { size: 0.6, alpha: 0.9, line: 1.6, drift: 1, lag: 0.08, pull: 60 };

    let w = 0, h = 0, dpr = 1;
    let bondColor = "#14161c", baseAlpha = 0.26;

    // CPK element hues, tuned per theme: darkened for the light background,
    // lifted for the dark one, so labels stay legible instead of neon
    const CPK = {
      light: { N: "#2563eb", O: "#dc2626", S: "#b58a00", P: "#ea580c", F: "#059669", Cl: "#16a34a" },
      dark:  { N: "#7aa2ff", O: "#ff7b72", S: "#e3b341", P: "#ffa657", F: "#56d4a0", Cl: "#7ee787" }
    };
    let palette = CPK.light;

    const readTheme = () => {
      const css = getComputedStyle(document.documentElement);
      const bond = css.getPropertyValue("--mol-bond").trim();
      if (bond) bondColor = bond;
      const dark = document.documentElement.getAttribute("data-theme") === "dark";
      palette = dark ? CPK.dark : CPK.light;
      baseAlpha = dark ? 0.34 : 0.26;
    };

    const molecules = [];
    // deal shapes from a shuffled deck instead of rolling dice, so one seeding
    // shows the whole cast before anything repeats
    const deck = [];
    const nextShape = () => {
      if (!deck.length) {
        for (let i = 0; i < SHAPES.length; i++) deck.push(i);
        for (let i = deck.length - 1; i > 0; i--) {
          const j = (Math.random() * (i + 1)) | 0;
          const t = deck[i]; deck[i] = deck[j]; deck[j] = t;
        }
      }
      return SHAPES[deck.pop()];
    };
    const seed = () => {
      molecules.length = 0;
      const count = w < 700 ? 5 : w < 1100 ? 8 : 10;
      const base = Math.max(96, Math.min(190, w * 0.12)) * LAYER.size;
      // rejection sampling in pixels: neighbours must stay clear of each other's
      // drawn radius, so the pattern starts with barely any overlap
      const place = (fx, fy, scale) => {
        for (const other of molecules) {
          const min = (other.scale + scale) * base * 0.62;
          if (Math.hypot((other.fx - fx) * w, (other.fy - fy) * h) < min) return false;
        }
        return true;
      };
      for (let i = 0; i < count; i++) {
        const side = i % 2 ? 1 : -1; // alternate sides so neither gutter ends up empty
        const scale = 0.9 + Math.random() * 0.2;
        let fx = 0, fy = 0;
        for (let attempt = 0; attempt < 40; attempt++) {
          // pushed out of the middle: the headline column is masked out anyway,
          // and stratified vertically so no big empty band is left
          fx = 0.5 + side * (0.12 + Math.random() * 0.44);
          fy = (i + Math.random()) / count * 1.1 - 0.05;
          if (place(fx, fy, scale)) break;
        }
        molecules.push({
          layer: LAYER,
          shape: nextShape(),
          fx,
          fy,
          ox: 0, // px offset from the drift position, owned by the cursor spring
          oy: 0,
          vx: (Math.random() - 0.5) * 0.007,
          vy: (Math.random() - 0.5) * 0.005,
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.022,
          scale
        });
      }
    };

    const drawMolecule = (m, radius, alpha, lineWidth, x, y) => {
      const shape = m.shape;
      const labelSize = radius * 0.17;
      const withLabels = labelSize >= 8;
      const gap = withLabels ? labelSize * 0.72 : 0;
      const ax = (i) => shape.a[i][0] * radius;
      const ay = (i) => -shape.a[i][1] * radius;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(m.rot);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = bondColor;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      for (const bond of shape.b) {
        const x1 = ax(bond[0]), y1 = ay(bond[0]);
        const x2 = ax(bond[1]), y2 = ay(bond[1]);
        let dx = x2 - x1, dy = y2 - y1;
        const len = Math.hypot(dx, dy) || 1;
        dx /= len; dy /= len;
        const startGap = shape.a[bond[0]][2] ? gap : 0;
        const endGap = shape.a[bond[1]][2] ? gap : 0;
        const sx = x1 + dx * startGap, sy = y1 + dy * startGap;
        const ex = x2 - dx * endGap, ey = y2 - dy * endGap;
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        const order = bond[2] || 1;
        if (order > 1) {
          // offset the extra line towards the centre of the molecule, which lands ring
          // double bonds on the inside and keeps carbonyls looking hand-drawn
          let ox = -dy, oy = dx;
          const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
          if (ox * -mx + oy * -my < 0) { ox = -ox; oy = -oy; }
          const off = len * 0.17, trim = len * 0.15;
          ctx.moveTo(sx + ox * off + dx * trim, sy + oy * off + dy * trim);
          ctx.lineTo(ex + ox * off - dx * trim, ey + oy * off - dy * trim);
          if (order === 3) {
            ctx.moveTo(sx - ox * off + dx * trim, sy - oy * off + dy * trim);
            ctx.lineTo(ex - ox * off - dx * trim, ey - oy * off - dy * trim);
          }
        }
      }
      ctx.stroke();

      if (withLabels) {
        // whole pixels only: the browser caches parsed font strings, fractional sizes
        // would hand it a fresh string per molecule per frame
        ctx.font = '500 ' + Math.round(labelSize) + 'px "Geist Mono", ui-monospace, monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (let i = 0; i < shape.a.length; i++) {
          const element = shape.a[i][2];
          if (!element) continue;
          ctx.save();
          ctx.translate(ax(i), ay(i));
          ctx.rotate(-m.rot); // heteroatom labels stay upright while the molecule turns
          ctx.globalAlpha = Math.min(1, alpha * 1.3);
          ctx.fillStyle = palette[element] || bondColor;
          ctx.fillText(element, 0, 0);
          ctx.restore();
        }
      }
      ctx.restore();
    };

    // The cursor gathers molecules towards itself and brings them into focus as they
    // arrive; each plane is pulled by a different amount, so the depth stays readable.
    // Both falloffs are smoothstepped, which is what keeps the reach from reading as
    // a hard circle around the pointer.
    const lens = { x: 0, y: 0, tx: 0, ty: 0, power: 0, target: 0 };
    const falloff = (t) => t * t * (3 - 2 * t);

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      const radius = Math.max(96, Math.min(190, w * 0.12));
      const scrolled = window.scrollY || 0;
      const reach = Math.max(210, w * 0.17);
      for (const m of molecules) {
        const layer = m.layer;
        const size = radius * layer.size * m.scale;
        const margin = size * 1.5;
        const x = m.fx * w + m.ox;
        const y = m.fy * h + scrolled * layer.lag + m.oy;
        if (x < -margin || x > w + margin || y < -margin || y > h + margin) continue;
        let focus = 0;
        if (lens.power > 0.01) {
          const reached = 1 - Math.hypot(x - lens.x, y - lens.y) / reach;
          if (reached > 0) focus = falloff(reached) * lens.power;
        }
        const alpha = Math.min(1, baseAlpha * layer.alpha * (1 + 1.2 * focus));
        drawMolecule(m, size, alpha, layer.line * (1 + 0.18 * focus), x, y);
      }
    };

    let resizeRetry = 0;
    const resize = () => {
      // One retry slot, three callers: without this an earlier zero-rect chain is
      // orphaned and keeps re-arming forever, even after unmount.
      clearTimeout(resizeRetry);
      const rect = host.getBoundingClientRect();
      if (!rect.width || !rect.height) { resizeRetry = setTimeout(resize, 120); return; } // layout not ready yet
      w = rect.width; h = rect.height;
      // line art, not type, so 2x is wasted fill rate - and on a big display even 1.5x
      // is, hence a hard budget on how many pixels this canvas may repaint per frame
      dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(3.6e6 / (w * h))));
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!molecules.length) seed();
      render();
    };

    let raf = 0;
    let running = false, last = 0;
    const tick = (now) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
      last = now;
      const ease = Math.min(1, dt * 9);
      if (lens.power < 0.01) { lens.x = lens.tx; lens.y = lens.ty; } // no sweep on entry
      lens.x += (lens.tx - lens.x) * ease;
      lens.y += (lens.ty - lens.y) * ease;
      lens.power += (lens.target - lens.power) * Math.min(1, dt * 3.5);
      const scrolled = window.scrollY || 0;
      const grip = Math.max(400, w * 0.36);
      const spring = Math.min(1, dt * 3.2);
      for (const m of molecules) {
        m.fx += m.vx * dt;
        m.fy += m.vy * dt;
        m.rot += m.vr * dt;
        if (m.fx < -0.35) m.fx = 1.35; else if (m.fx > 1.35) m.fx = -0.35;
        if (m.fy < -0.35) m.fy = 1.35; else if (m.fy > 1.35) m.fy = -0.35;
        // drawn towards the cursor, but never past it, and only from within reach
        let towardsX = 0, towardsY = 0;
        if (lens.power > 0.01) {
          const dx = lens.x - (m.fx * w), dy = lens.y - (m.fy * h + scrolled * m.layer.lag);
          const distance = Math.hypot(dx, dy);
          if (distance > 1 && distance < grip) {
            const pull = Math.min(m.layer.pull * falloff(1 - distance / grip) * lens.power, distance * 0.55);
            towardsX = dx / distance * pull;
            towardsY = dy / distance * pull;
          }
        }
        m.ox += (towardsX - m.ox) * spring;
        m.oy += (towardsY - m.oy) * spring;
      }
      // gentle pairwise repulsion: drift and wrap-around can push neighbours
      // together over time, this eases them apart before they visibly overlap
      const clear = Math.max(96, Math.min(190, w * 0.12)) * LAYER.size;
      const ease2 = Math.min(1, dt * 1.6);
      for (let i = 0; i < molecules.length; i++) {
        const a = molecules[i];
        for (let j = i + 1; j < molecules.length; j++) {
          const b = molecules[j];
          let dx = (b.fx - a.fx) * w, dy = (b.fy - a.fy) * h;
          const min = (a.scale + b.scale) * clear * 0.6;
          const d = Math.hypot(dx, dy);
          if (d < 0.001 || d >= min) continue;
          const push = (min - d) / d * ease2 * 0.5;
          dx *= push; dy *= push;
          a.fx -= dx / w; a.fy -= dy / h;
          b.fx += dx / w; b.fy += dy / h;
        }
      }
      render();
      raf = requestAnimationFrame(tick);
    };
    const start = () => { if (running) return; running = true; last = 0; raf = requestAnimationFrame(tick); };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    readTheme();
    resize();
    const refreshTheme = () => { readTheme(); if (!running) render(); };

    // the theme flip only rewrites CSS custom properties, so the palette has to be
    // re-read here; the class component got that call from setTheme()
    const themeObserver = new MutationObserver(refreshTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    let ro = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(() => resize());
      ro.observe(host);
    } else {
      // else, not both: the observer already covers every resize, and running
      // them together reallocated the backing store twice per frame.
      window.addEventListener("resize", resize);
    }

    const onPointerMove = (e) => {
      if (e.pointerType === "touch") return; // no hover to speak of, so no lens
      const rect = host.getBoundingClientRect();
      lens.tx = e.clientX - rect.left;
      lens.ty = e.clientY - rect.top;
      lens.target = 1;
    };
    const onPointerLeave = () => { lens.target = 0; };

    // reduced motion: the static frame drawn by resize() is the whole show, so neither
    // the lens nor the loop is wired up until the preference says otherwise
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let io = null;
    let wired = false;
    const enableMotion = () => {
      if (wired) return;
      wired = true;
      pointerHost.addEventListener("pointermove", onPointerMove);
      pointerHost.addEventListener("pointerleave", onPointerLeave);

      if ("IntersectionObserver" in window) {
        io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) start(); else stop(); });
        io.observe(host);
      } else {
        start();
      }
    };
    const disableMotion = () => {
      wired = false;
      stop();
      pointerHost.removeEventListener("pointermove", onPointerMove);
      pointerHost.removeEventListener("pointerleave", onPointerLeave);
      if (io) { io.disconnect(); io = null; }
    };
    const onMotion = () => { if (motionQuery.matches) disableMotion(); else enableMotion(); };
    motionQuery.addEventListener("change", onMotion);
    if (!motionQuery.matches) enableMotion();

    return () => {
      clearTimeout(resizeRetry);
      motionQuery.removeEventListener("change", onMotion);
      disableMotion();
      themeObserver.disconnect();
      if (ro) ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
