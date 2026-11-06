import { densify, hashString, pointAt, polyline, routePoints } from '@/lib/geo';
import { contours } from '@/lib/geo';

type Props = {
  slug: string;
  stages?: number[]; // km per stage, used for camp markers
  progress?: number; // 0..1, position of the walker marker
  className?: string;
  labels?: { start: string; end: string };
  tone?: 'paper' | 'pine';
};

const W = 480;
const H = 320;

/** Schematic route map: contour background, route line, camps, scale and north arrow. */
export default function RouteMap({ slug, stages = [], progress, className = '', labels, tone = 'paper' }: Props) {
  const seed = hashString(slug);
  const pts = densify(routePoints(seed, W, H));
  const d = polyline(pts);
  const total = stages.reduce((s, k) => s + k, 0) || 1;
  const camps = stages.slice(0, -1).map((_, i) => pointAt(pts, stages.slice(0, i + 1).reduce((s, k) => s + k, 0) / total));
  const start = pts[0];
  const end = pts[pts.length - 1];
  const me = progress !== undefined ? pointAt(pts, progress) : null;
  const dark = tone === 'pine';
  const lineColor = dark ? '#f8f3ea' : '#1f3d2b';
  const topoColor = dark ? 'rgba(248,243,234,0.16)' : 'rgba(31,61,43,0.18)';

  // Label placement: try spots around each anchor and take the first that keeps clear of every marker and of earlier labels.
  const markers: [number, number, number][] = [[start[0], start[1], 11], [end[0], end[1], 12], ...camps.map(([x, y]) => [x, y, 10] as [number, number, number])];
  if (me) markers.push([me[0], me[1], 17]);
  // the dashed route line counts as an obstacle too
  const lineObstacles: [number, number, number][] = pts.filter((_, i) => i % 2 === 0).map(([x, y]) => [x, y, 8]);
  const placed: { text: string; x: number; y: number; anchor: 'start' | 'end' | 'middle' }[] = [];
  if (labels) {
    const boxes: [number, number, number, number][] = [[W - 44, 10, W - 8, 58], [10, H - 40, 100, H - 8]];
    const place = (text: string, [px, py]: number[], r: number) => {
      const w = text.length * 6.6 + 4;
      const h = 13;
      const gap = r + 8;
      const cands: { x: number; y: number; anchor: 'start' | 'end' | 'middle' }[] = [
        { x: px + gap, y: py + 4, anchor: 'start' },
        { x: px - gap, y: py + 4, anchor: 'end' },
        { x: px, y: py - gap - 2, anchor: 'middle' },
        { x: px, y: py + gap + 11, anchor: 'middle' },
        { x: px + gap, y: py - gap, anchor: 'start' },
        { x: px - gap, y: py - gap, anchor: 'end' },
        { x: px + gap, y: py + gap + 8, anchor: 'start' },
        { x: px - gap, y: py + gap + 8, anchor: 'end' },
        { x: px + gap, y: py - gap - 8, anchor: 'start' },
        { x: px - gap, y: py - gap - 8, anchor: 'end' },
        { x: Math.max(10, px - w / 2 - 6), y: py - gap - 2, anchor: 'start' },
        { x: px - 8, y: py - gap - 2, anchor: 'start' },
        { x: px - 8, y: py + gap + 11, anchor: 'start' },
        { x: px + 8, y: py - gap - 2, anchor: 'end' },
        { x: px + 8, y: py + gap + 11, anchor: 'end' },
        { x: px, y: py - gap - 14, anchor: 'middle' },
        { x: px, y: py + gap + 24, anchor: 'middle' },
      ];
      const box = (c: (typeof cands)[number]): [number, number, number, number] => {
        const x0 = c.anchor === 'start' ? c.x : c.anchor === 'end' ? c.x - w : c.x - w / 2;
        return [x0, c.y - h + 3, x0 + w, c.y + 3];
      };
      const hits = (b: [number, number, number, number], o: [number, number, number, number]) => b[0] < o[2] && b[2] > o[0] && b[1] < o[3] && b[3] > o[1];
      const cost = (c: (typeof cands)[number]) => {
        const b = box(c);
        if (b[0] < 6 || b[2] > W - 6 || b[1] < 6 || b[3] > H - 6) return 1e6;
        let n = boxes.filter((o) => hits(b, o)).length * 1000;
        n += markers.filter(([mx, my, mr]) => hits(b, [mx - mr, my - mr, mx + mr, my + mr])).length * 100;
        n += lineObstacles.filter(([mx, my, mr]) => hits(b, [mx - mr, my - mr, mx + mr, my + mr])).length;
        return n + cands.indexOf(c) * 0.5;
      };
      const c = cands.reduce((best, k) => (cost(k) < cost(best) ? k : best), cands[0]);
      boxes.push(box(c));
      placed.push({ text, ...c });
    };
    place(labels.start, start, 7);
    place(labels.end, end, 8);
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label={labels ? `Route map from ${labels.start} to ${labels.end}` : 'Route map'}>
      <rect width={W} height={H} fill={dark ? '#1f3d2b' : '#f3ece0'} />
      <g fill="none" stroke={topoColor}>
        {contours(seed, W, H, { summits: 4, rings: 9, spacing: 15 }).map((p, i) => (
          <path key={i} d={p.d} strokeWidth={p.index ? 1.4 : 0.8} />
        ))}
      </g>
      {/* grid */}
      <g stroke={dark ? 'rgba(248,243,234,0.08)' : 'rgba(27,26,23,0.07)'} strokeWidth="1">
        {[1, 2, 3, 4, 5].map((i) => (
          <line key={`v${i}`} x1={(W / 6) * i} x2={(W / 6) * i} y1="0" y2={H} />
        ))}
        {[1, 2, 3].map((i) => (
          <line key={`h${i}`} y1={(H / 4) * i} y2={(H / 4) * i} x1="0" x2={W} />
        ))}
      </g>
      <path d={d} fill="none" stroke={dark ? 'rgba(17,36,24,0.6)' : 'rgba(248,243,234,0.9)'} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={lineColor} strokeWidth="2.4" strokeDasharray="7 5" strokeLinecap="round" />
      {camps.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M0 -7 L6.5 4.5 L-6.5 4.5 Z" fill={dark ? '#f8f3ea' : '#1f3d2b'} stroke={dark ? '#1f3d2b' : '#f3ece0'} strokeWidth="1.5" />
        </g>
      ))}
      <circle cx={start[0]} cy={start[1]} r="7" fill={dark ? '#1f3d2b' : '#f8f3ea'} stroke={lineColor} strokeWidth="2.5" />
      <g transform={`translate(${end[0]} ${end[1]})`}>
        <circle r="8" fill="#e0632e" stroke={dark ? '#1f3d2b' : '#f8f3ea'} strokeWidth="2.5" />
      </g>
      {me && (
        <g transform={`translate(${me[0]} ${me[1]})`}>
          <circle r="14" fill="#e0632e" opacity="0.22" />
          <circle r="5.5" fill="#e0632e" stroke={dark ? '#1f3d2b' : '#fff'} strokeWidth="2" />
        </g>
      )}
      {labels && (
        <g fontFamily="var(--font-inter)" fontSize="11" fontWeight="600" fill={dark ? '#f8f3ea' : '#1b1a17'}>
          {placed.map((l) => (
            <text key={l.text} x={l.x} y={l.y} textAnchor={l.anchor}>{l.text}</text>
          ))}
        </g>
      )}
      {/* north arrow */}
      <g transform={`translate(${W - 26} 30)`} fill={dark ? '#f8f3ea' : '#1b1a17'}>
        <path d="M0 -14 L6 6 L0 2 L-6 6 Z" />
        <text y="22" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="var(--font-inter)">N</text>
      </g>
      {/* scale bar */}
      <g transform={`translate(18 ${H - 20})`} fontFamily="var(--font-inter)" fontSize="10" fill={dark ? '#f8f3ea' : '#1b1a17'}>
        <rect width="40" height="4" fill={dark ? '#f8f3ea' : '#1b1a17'} />
        <rect x="40" width="40" height="4" fill="none" stroke={dark ? '#f8f3ea' : '#1b1a17'} />
        <text y="-5">0</text>
        <text x="80" y="-5" textAnchor="middle">5 km</text>
      </g>
    </svg>
  );
}
