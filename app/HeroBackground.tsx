"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

// Height of the band at the bottom of the hero kept clear for the scene; page.tsx uses the same clamp in CSS
export const SCENE_BAND = "clamp(220px, 38%, 380px)";
const sceneBand = (h: number) => Math.min(380, Math.max(220, h * 0.38));
const CONTROLS_STRIP = 120;

const BLUE = "59,130,246";
const SKY = "147,197,253";

type Ctx = CanvasRenderingContext2D;
type Painter = (ctx: Ctx, w: number, h: number, t: number) => void;

/* The "Empowering the Grid" diagram drawn as a living line-art landscape.
   Generation on the left, transmission across the middle with the SPFC on one circuit,
   homes and industry on the right. The SPFC keeps shifting power between the two circuits. */
type Pt = [number, number];
type Path = { pts: Pt[]; cum: number[]; len: number };

const WARM = "253,230,138";

function buildPath(start: Pt, segs: [Pt, number][]): Path {
  const pts: Pt[] = [start];
  let cur = start;
  for (const [b, sag] of segs) {
    const n = sag ? 16 : 4;
    for (let i = 1; i <= n; i++) {
      const p = i / n;
      pts.push([cur[0] + (b[0] - cur[0]) * p, cur[1] + (b[1] - cur[1]) * p + 4 * sag * p * (1 - p)]);
    }
    cur = b;
  }
  const cum = [0];
  for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  return { pts, cum, len: cum[cum.length - 1] };
}

function pointAt(path: Path, p: number): Pt {
  const d = Math.min(Math.max(p, 0), 1) * path.len;
  let i = 1;
  while (i < path.cum.length - 1 && path.cum[i] < d) i++;
  const seg = path.cum[i] - path.cum[i - 1] || 1;
  const f = (d - path.cum[i - 1]) / seg;
  const a = path.pts[i - 1], b = path.pts[i];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
}

function makeScene(): Painter {
  const VW = 1900, G = 300;
  const TOWERS = [880, 1060, 1240, 1420];
  const UP = G - 185, LOW = G - 150;
  // Substation buses at each end of the two parallel lines
  const BUS = G - 80;

  const gen = buildPath([140, G - 52], [
    [[410, G - 52], 4], [[520, G - 52], 4], [[652, G - 56], 3], [[688, G - 58], 0], [[700, BUS], 0], [[740, BUS], 0],
  ]);
  // Line A leaves the sending bus through the SPFC's series unit; line B is the uncontrolled parallel path
  const circuitA = buildPath([745, BUS], [
    [[745, G - 58], 0], [[800, G - 58], 0], [[840, LOW], 0],
    [[1020, LOW], 16], [[1200, LOW], 16], [[1380, LOW], 16], [[1460, LOW], 0], [[1505, BUS], 0],
  ]);
  const circuitB = buildPath([745, BUS], [
    [[790, BUS], 0], [[846, UP], 0], [[1026, UP], 16], [[1206, UP], 16], [[1386, UP], 16], [[1454, UP], 0], [[1520, BUS], 0],
  ]);
  const dist = buildPath([1590, BUS], [
    [[1612, G - 58], 0], [[1640, G - 58], 0], [[1680, G - 95], 0], [[1760, G - 95], 6], [[1840, G - 95], 6], [[1900, G - 95], 5],
  ]);

  const windows: Pt[] = [
    [1672, G - 22], [1692, G - 22], [1737, G - 22], [1757, G - 22],
    [1800, G - 26], [1818, G - 26], [1836, G - 26], [1854, G - 26], [1872, G - 26],
  ];

  return (ctx, w, h, t) => {
    // The scene lives in the band the page reserves below the hero text (see SCENE_BAND),
    // standing on a strip that holds the hero controls
    const band = sceneBand(h);
    const s = Math.min((band - CONTROLS_STRIP - 10) / 215, Math.max(w / VW, 0.6));
    const ox = VW * s <= w ? (w - VW * s) / 2 : Math.min(0, Math.max(w - VW * s, w / 2 - 860 * s));
    const groundY = h - CONTROLS_STRIP;
    ctx.save();
    ctx.translate(ox, groundY - G * s);
    ctx.scale(s, s);
    const lw = (px: number) => (ctx.lineWidth = px / s);
    const stroke = (rgb: string, a: number) => (ctx.strokeStyle = `rgba(${rgb},${a})`);
    const line = (x1: number, y1: number, x2: number, y2: number) => { ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); };
    const tracePath = (p: Path) => { ctx.beginPath(); p.pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); };

    // distant hills and ground
    ctx.fillStyle = `rgba(${BLUE},0.06)`;
    ctx.beginPath(); ctx.moveTo(-1000, G);
    for (let x = -1000; x <= VW + 1000; x += 40) ctx.lineTo(x, G - 55 - 30 * Math.sin(x / 260) - 18 * Math.sin(x / 97 + 1));
    ctx.lineTo(VW + 1000, G); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "rgba(5,11,30,0.55)"; ctx.fillRect(-2000, G, VW + 4000, 400);
    lw(1); stroke(BLUE, 0.4); ctx.beginPath(); line(-2000, G, VW + 2000, G); ctx.stroke();

    // nuclear cooling tower with steam
    lw(1.4); stroke(BLUE, 0.6); ctx.beginPath();
    ctx.moveTo(30, G); ctx.quadraticCurveTo(68, G - 95, 55, G - 160);
    ctx.moveTo(140, G); ctx.quadraticCurveTo(102, G - 95, 115, G - 160);
    line(55, G - 160, 115, G - 160);
    ctx.stroke();
    for (let i = 0; i < 6; i++) {
      const k = (t * 0.07 + i / 6) % 1;
      ctx.fillStyle = `rgba(${SKY},${0.16 * (1 - k)})`;
      ctx.beginPath(); ctx.arc(85 + k * 45, G - 168 - k * 110, 14 + k * 30, 0, Math.PI * 2); ctx.fill();
    }

    // hydro dam: reservoir, gravity dam with spillway, powerhouse and tailrace
    const surf = G - 80;
    const water = ctx.createLinearGradient(0, surf, 0, G);
    water.addColorStop(0, `rgba(${BLUE},0.32)`);
    water.addColorStop(1, `rgba(${BLUE},0.06)`);
    ctx.fillStyle = water;
    ctx.beginPath(); ctx.moveTo(168, surf); ctx.lineTo(262, surf); ctx.lineTo(262, G); ctx.lineTo(214, G); ctx.closePath(); ctx.fill();
    lw(1.2); stroke(BLUE, 0.5); ctx.beginPath(); line(160, surf - 6, 216, G); ctx.stroke();
    lw(1); stroke(SKY, 0.55); ctx.beginPath();
    for (let j = 0; j < 3; j++) {
      const y = surf + j * 10, x0 = 172 + j * 9;
      ctx.moveTo(x0, y);
      for (let x = x0; x <= 260; x += 4) ctx.lineTo(x, y + Math.sin(x / 7 - t * 1.6 + j * 2) * (1.4 - j * 0.35));
    }
    ctx.stroke();
    // intake tower standing in the reservoir
    lw(1.2); stroke(BLUE, 0.7); ctx.beginPath(); ctx.rect(242, G - 110, 9, 36); line(239, G - 110, 254, G - 110); ctx.stroke();

    // dam body
    const faceX = (y: number) => 276 + (330 - 276) * ((y - (G - 96)) / 82);
    ctx.fillStyle = "rgba(9,22,54,0.95)";
    ctx.beginPath();
    ctx.moveTo(262, G); ctx.lineTo(262, G - 96); ctx.lineTo(276, G - 96);
    ctx.quadraticCurveTo(292, G - 50, 330, G - 14); ctx.lineTo(340, G); ctx.closePath();
    ctx.fill();
    lw(1.6); stroke(BLUE, 0.8); ctx.stroke();
    lw(0.8); stroke(BLUE, 0.28); ctx.beginPath();
    for (let y = G - 82; y < G - 10; y += 14) line(263, y, faceX(y) - 6, y);
    ctx.stroke();
    // crest road railing
    lw(1); stroke(SKY, 0.5); ctx.beginPath(); line(258, G - 101, 280, G - 101);
    for (let x = 259; x <= 279; x += 5) line(x, G - 101, x, G - 96);
    ctx.stroke();
    // water sheeting down the spillway face
    ctx.setLineDash([5 / s, 6 / s]);
    for (let j = 0; j < 3; j++) {
      ctx.lineDashOffset = -t * (55 + j * 12) / s;
      stroke(SKY, 0.75 - j * 0.18); lw(1.4 - j * 0.3);
      ctx.beginPath(); ctx.moveTo(277 + j * 3, G - 95); ctx.quadraticCurveTo(294 + j * 3, G - 50, 332 + j * 3, G - 13); ctx.stroke();
    }
    ctx.setLineDash([]);
    // spray where the spillway meets the river
    for (let i = 0; i < 6; i++) {
      const k = (t * 0.6 + i / 6) % 1;
      ctx.fillStyle = `rgba(${SKY},${0.4 * (1 - k)})`;
      ctx.beginPath(); ctx.arc(334 + i * 3 + k * 8, G - 8 - k * 14, 1.5 + k * 3, 0, Math.PI * 2); ctx.fill();
    }

    // powerhouse at the foot of the dam, fed by a penstock
    lw(1); stroke(BLUE, 0.35); ctx.setLineDash([3 / s, 4 / s]);
    ctx.beginPath(); ctx.moveTo(262, G - 48); ctx.lineTo(346, G - 14); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = "rgba(9,22,54,0.95)"; ctx.fillRect(344, G - 26, 46, 26);
    lw(1.4); stroke(BLUE, 0.75); ctx.beginPath(); ctx.rect(344, G - 26, 46, 26); line(341, G - 26, 393, G - 26); ctx.stroke();
    [352, 364, 376].forEach((x, i) => {
      ctx.fillStyle = `rgba(${WARM},${0.55 + 0.3 * Math.sin(t * 0.9 + i)})`;
      ctx.fillRect(x, G - 19, 7, 7);
    });

    // tailrace flowing away downstream
    lw(1); stroke(SKY, 0.5); ctx.beginPath();
    for (let j = 0; j < 2; j++) {
      const y = G - 3 - j * 4;
      ctx.moveTo(340, y);
      for (let x = 340; x <= 420; x += 4) ctx.lineTo(x, y + Math.sin(x / 6 - t * 3 + j) * 1.2);
    }
    ctx.stroke();

    // wind turbines
    [[430, 150, 44, 0], [500, 120, 36, 1.3]].forEach(([x, ht, blade, off]) => {
      lw(1.4); stroke(BLUE, 0.6); ctx.beginPath();
      line(x - 4, G, x - 1.5, G - ht); line(x + 4, G, x + 1.5, G - ht); ctx.stroke();
      const a0 = t * 0.9 + off;
      stroke(SKY, 0.8); ctx.beginPath();
      for (let b = 0; b < 3; b++) {
        const a = a0 + (b * Math.PI * 2) / 3;
        line(x, G - ht, x + Math.cos(a) * blade, G - ht + Math.sin(a) * blade);
      }
      ctx.stroke();
      ctx.fillStyle = `rgba(${SKY},0.9)`; ctx.beginPath(); ctx.arc(x, G - ht, 3, 0, Math.PI * 2); ctx.fill();
    });

    // solar farm, with a light sweeping across the cells
    for (let i = 0; i < 3; i++) {
      const x = 550 + i * 28;
      const shine = Math.max(0, 1 - Math.abs(((t * 0.25) % 2) * 3 - i - 0.5));
      ctx.fillStyle = `rgba(${SKY},${0.08 + shine * 0.25})`;
      stroke(BLUE, 0.6); lw(1.2);
      ctx.beginPath(); ctx.moveTo(x, G - 10); ctx.lineTo(x + 22, G - 10); ctx.lineTo(x + 17, G - 30); ctx.lineTo(x - 5, G - 30); ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.beginPath(); line(x + 9, G - 10, x + 9, G); ctx.stroke();
    }

    // collector poles and step-up transformer
    lw(1.2); stroke(BLUE, 0.5); ctx.beginPath();
    [140, 410, 520].forEach(x => { line(x, G, x, G - 56); line(x - 8, G - 52, x + 8, G - 52); });
    ctx.stroke();
    const transformer = (x: number, wdt: number, highlight = 0) => {
      stroke(highlight ? SKY : BLUE, highlight ? 0.95 : 0.65); lw(highlight ? 1.8 : 1.4);
      ctx.beginPath();
      ctx.rect(x, G - 48, wdt, 48);
      for (let fx = x + 8; fx < x + wdt - 4; fx += 8) line(fx, G - 40, fx, G - 8);
      ctx.stroke();
    };
    transformer(640, 60);
    lw(1.4); stroke(BLUE, 0.65); ctx.beginPath(); [652, 675, 688].forEach(x => line(x, G - 48, x, G - 58)); ctx.stroke();

    // substation buses: sending end (left) and receiving end (right)
    const bus = (x0: number, x1: number) => {
      lw(1.2); stroke(BLUE, 0.6); ctx.beginPath(); line(x0 + 8, G, x0 + 8, BUS); line(x1 - 8, G, x1 - 8, BUS); ctx.stroke();
      lw(3); stroke(SKY, 0.55); ctx.beginPath(); line(x0, BUS, x1, BUS); ctx.stroke();
    };
    bus(692, 790);
    bus(1495, 1600);

    // transmission towers
    TOWERS.forEach(x => {
      lw(1.4); stroke(BLUE, 0.6); ctx.beginPath();
      line(x - 26, G, x - 6, G - 215); line(x + 26, G, x + 6, G - 215);
      line(x - 34, UP, x + 34, UP); line(x - 40, LOW, x + 40, LOW);
      const segs = 7;
      for (let i = 0; i < segs; i++) {
        const y0 = G - (215 * i) / segs, y1 = G - (215 * (i + 1)) / segs;
        const w0 = 26 - 20 * (i / segs), w1 = 26 - 20 * ((i + 1) / segs);
        line(x - w0, y0, x + w1, y1); line(x + w0, y0, x - w1, y1);
      }
      ctx.stroke();
    });

    // the SPFC pushes power into or out of line A; the rest of the transfer takes parallel line B
    const shareA = 0.5 + 0.3 * Math.sin(t * 0.35);
    const working = Math.abs(shareA - 0.5) / 0.3;
    lw(1.2 + shareA * 1.6); stroke(BLUE, 0.3 + shareA * 0.5); tracePath(circuitA);
    lw(1.2 + (1 - shareA) * 1.6); stroke(BLUE, 0.3 + (1 - shareA) * 0.5); tracePath(circuitB);
    lw(1.2); stroke(BLUE, 0.55); tracePath(gen); tracePath(dist);

    // SPFC at the sending substation: series unit in line A, exciter connected in shunt to the bus
    const glow = ctx.createRadialGradient(770, G - 30, 0, 770, G - 30, 95);
    glow.addColorStop(0, `rgba(${BLUE},${0.15 + working * 0.25})`);
    glow.addColorStop(1, `rgba(${BLUE},0)`);
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(770, G - 30, 95, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgba(7,19,48,0.9)"; ctx.fillRect(728, G - 48, 84, 48);
    transformer(728, 84, 1);
    ctx.beginPath(); line(745, G - 48, 745, G - 58); line(800, G - 48, 800, G - 58); ctx.stroke();
    lw(1.2); stroke(SKY, 0.7); ctx.setLineDash([4 / s, 4 / s]);
    ctx.beginPath(); line(770, BUS, 770, G - 48); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = `rgba(${SKY},0.9)`;
    ctx.font = `600 ${12 / s}px Inter, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText("SMART Power Flow Controller", 770, G + 20 / s);

    // step-down transformer and distribution
    transformer(1600, 50);
    lw(1.4); stroke(BLUE, 0.65); ctx.beginPath(); [1612, 1625, 1640].forEach(x => line(x, G - 48, x, G - 58)); ctx.stroke();
    lw(1.2); stroke(BLUE, 0.55); ctx.beginPath();
    [1680, 1760, 1840].forEach(x => { line(x, G, x, G - 98); line(x - 10, G - 95, x + 10, G - 95); });
    ctx.stroke();

    // homes and a factory
    lw(1.4); stroke(BLUE, 0.65); ctx.beginPath();
    [1660, 1725].forEach(x => {
      ctx.moveTo(x, G); ctx.lineTo(x, G - 35); ctx.lineTo(x + 22, G - 55); ctx.lineTo(x + 44, G - 35); ctx.lineTo(x + 44, G);
    });
    ctx.moveTo(1790, G); ctx.lineTo(1790, G - 40);
    for (let i = 0; i < 4; i++) { ctx.lineTo(1790 + i * 25, G - 62); ctx.lineTo(1815 + i * 25, G - 40); }
    ctx.lineTo(1890, G);
    line(1875, G - 40, 1875, G - 95); line(1885, G - 40, 1885, G - 95);
    ctx.stroke();
    for (let i = 0; i < 4; i++) {
      const k = (t * 0.06 + i / 4) % 1;
      ctx.fillStyle = `rgba(${SKY},${0.12 * (1 - k)})`;
      ctx.beginPath(); ctx.arc(1880 + k * 30, G - 102 - k * 60, 8 + k * 18, 0, Math.PI * 2); ctx.fill();
    }
    windows.forEach(([x, y], i) => {
      const lit = 0.55 + 0.35 * Math.sin(t * 0.7 + i * 1.9);
      ctx.fillStyle = `rgba(${WARM},${lit})`;
      ctx.fillRect(x - 5, y - 5, 10, 10);
    });

    // power pulses
    const pulses = (path: Path, n: number, speed: number, strength: number) => {
      for (let i = 0; i < n; i++) {
        const p = (t * speed + i / n) % 1;
        for (let j = 3; j >= 0; j--) {
          const [x, y] = pointAt(path, p - j * 0.006);
          const r = (j ? 3 : 7) * (0.6 + strength * 0.6);
          const g = ctx.createRadialGradient(x, y, 0, x, y, r);
          g.addColorStop(0, `rgba(${SKY},${(j ? 0.35 : 0.95) * (0.35 + strength * 0.65)})`);
          g.addColorStop(1, `rgba(${BLUE},0)`);
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
        }
      }
    };
    pulses(gen, 5, 0.09, 0.8);
    pulses(circuitA, 6, 0.06, shareA);
    pulses(circuitB, 6, 0.06, 1 - shareA);
    pulses(dist, 3, 0.11, 0.8);

    ctx.restore();
  };
}

const subscribeReducedMotion = (cb: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function HeroBackground({ paused }: { paused: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const painter = makeScene();
    // Reduced motion keeps the scene alive, just much slower
    const speed = reduced ? 0.2 : 1;
    let w = 0, h = 0, raf = 0, last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      painter(ctx, w, h, timeRef.current);
    };
    const frame = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      timeRef.current += dt * speed;
      draw();
      raf = requestAnimationFrame(frame);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    if (!paused) raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [paused, reduced]);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
}
