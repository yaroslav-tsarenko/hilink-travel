// Small deterministic geometry helpers for the hand-drawn map pieces:
// topographic contours, a wandering route line and points along it.

export type Pt = [number, number];

export function rng(seed: number) {
  let a = seed * 2654435761 + 1013904223;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n: number) => Math.round(n * 10) / 10;

/** Catmull-Rom spline through points, emitted as cubic Béziers. */
export function smooth(points: Pt[], closed = false): string {
  if (points.length < 2) return '';
  const p = closed ? [points[points.length - 1], ...points, points[0], points[1]] : [points[0], ...points, points[points.length - 1]];
  let d = `M${f(p[1][0])} ${f(p[1][1])}`;
  for (let i = 1; i < p.length - 2; i++) {
    const [x0, y0] = p[i - 1];
    const [x1, y1] = p[i];
    const [x2, y2] = p[i + 1];
    const [x3, y3] = p[i + 2];
    d += ` C${f(x1 + (x2 - x0) / 6)} ${f(y1 + (y2 - y0) / 6)} ${f(x2 - (x3 - x1) / 6)} ${f(y2 - (y3 - y1) / 6)} ${f(x2)} ${f(y2)}`;
  }
  return closed ? `${d} Z` : d;
}

/** Concentric, slightly irregular closed contours around a few summits. */
export function contours(seed: number, w: number, h: number, opts: { summits?: number; rings?: number; spacing?: number } = {}) {
  const r = rng(seed);
  const summits = opts.summits ?? 3;
  const rings = opts.rings ?? 9;
  const spacing = opts.spacing ?? Math.min(w, h) / 16;
  const paths: { d: string; index: boolean }[] = [];
  for (let s = 0; s < summits; s++) {
    const cx = w * (0.12 + r() * 0.76);
    const cy = h * (0.12 + r() * 0.76);
    const ph = [r() * 6.28, r() * 6.28, r() * 6.28];
    const amp = [0.12 + r() * 0.12, 0.06 + r() * 0.08, 0.03 + r() * 0.05];
    const stretch = 0.75 + r() * 0.6;
    const n = rings - Math.floor(r() * 3);
    for (let k = 1; k <= n; k++) {
      const base = k * spacing * (1 + s * 0.15);
      const pts: Pt[] = [];
      const N = 28;
      for (let i = 0; i < N; i++) {
        const t = (i / N) * Math.PI * 2;
        const wobble = 1 + amp[0] * Math.sin(2 * t + ph[0] + k * 0.08) + amp[1] * Math.sin(3 * t + ph[1] - k * 0.05) + amp[2] * Math.sin(5 * t + ph[2]);
        const rad = base * wobble;
        pts.push([cx + Math.cos(t) * rad * stretch, cy + Math.sin(t) * rad]);
      }
      paths.push({ d: smooth(pts, true), index: k % 4 === 0 });
    }
  }
  return paths;
}

/** A route that wanders from the lower left towards the upper right. */
export function routePoints(seed: number, w: number, h: number, count = 9): Pt[] {
  const r = rng(seed + 97);
  const pts: Pt[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const x = w * (0.1 + t * 0.8) + (r() - 0.5) * w * 0.08;
    const y = h * (0.78 - t * 0.56) + (r() - 0.5) * h * 0.3;
    pts.push([x, y]);
  }
  return pts;
}

/** Point at fraction t (0..1) of the polyline length. */
export function pointAt(points: Pt[], t: number): Pt {
  const seg: number[] = [];
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const l = Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
    seg.push(l);
    total += l;
  }
  let target = Math.max(0, Math.min(1, t)) * total;
  for (let i = 0; i < seg.length; i++) {
    if (target <= seg[i]) {
      const k = seg[i] ? target / seg[i] : 0;
      return [points[i][0] + (points[i + 1][0] - points[i][0]) * k, points[i][1] + (points[i + 1][1] - points[i][1]) * k];
    }
    target -= seg[i];
  }
  return points[points.length - 1];
}

export function hashString(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** Sample a Catmull-Rom spline through the points so markers sit exactly on the drawn line. */
export function densify(points: Pt[], perSegment = 14): Pt[] {
  const p = [points[0], ...points, points[points.length - 1]];
  const out: Pt[] = [];
  for (let i = 1; i < p.length - 2; i++) {
    const [p0, p1, p2, p3] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
    for (let s = 0; s < perSegment; s++) {
      const t = s / perSegment;
      const t2 = t * t;
      const t3 = t2 * t;
      const c = (a: number, b: number, c2: number, d: number) => 0.5 * (2 * b + (-a + c2) * t + (2 * a - 5 * b + 4 * c2 - d) * t2 + (-a + 3 * b - 3 * c2 + d) * t3);
      out.push([c(p0[0], p1[0], p2[0], p3[0]), c(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(points[points.length - 1]);
  return out;
}

export function polyline(points: Pt[]) {
  return points.map((p, i) => `${i ? 'L' : 'M'}${f(p[0])} ${f(p[1])}`).join(' ');
}
