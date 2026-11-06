'use client';

import { useId, useRef, useState } from 'react';

type Props = {
  profile: number[];
  km: number;
  className?: string;
  tone?: 'paper' | 'pine';
  progress?: number;
  compact?: boolean;
};

const W = 600;

/** Elevation profile with axis labels and a hover readout (distance / altitude). */
export default function ElevationProfile({ profile, km, className = '', tone = 'paper', progress, compact = false }: Props) {
  const id = useId().replace(/:/g, '');
  const ref = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const H = compact ? 120 : 180;
  const pad = { l: compact ? 6 : 40, r: 8, t: 14, b: compact ? 8 : 26 };
  const min = Math.min(...profile);
  const max = Math.max(...profile);
  const span = Math.max(max - min, 60);
  const lo = Math.max(0, min - span * 0.25);
  const hi = max + span * 0.12;
  const x = (i: number) => pad.l + (i / (profile.length - 1)) * (W - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - (v - lo) / (hi - lo)) * (H - pad.t - pad.b);
  const line = profile.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
  const area = `${line} L${x(profile.length - 1)} ${H - pad.b} L${x(0)} ${H - pad.b} Z`;
  const dark = tone === 'pine';
  const ink = dark ? '#f8f3ea' : '#1b1a17';
  const stroke = dark ? '#f8f3ea' : '#1f3d2b';
  const ticks = [lo + (hi - lo) * 0.2, lo + (hi - lo) * 0.55, lo + (hi - lo) * 0.9].map((v) => Math.round(v / 50) * 50);

  const at = hover ?? (progress !== undefined ? progress * (profile.length - 1) : null);
  const readout = (() => {
    if (at === null) return null;
    const i0 = Math.floor(at);
    const i1 = Math.min(profile.length - 1, i0 + 1);
    const v = profile[i0] + (profile[i1] - profile[i0]) * (at - i0);
    return { px: pad.l + (at / (profile.length - 1)) * (W - pad.l - pad.r), py: y(v), m: Math.round(v), d: (at / (profile.length - 1)) * km };
  })();

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    const sx = ((e.clientX - box.left) / box.width) * W;
    const t = (sx - pad.l) / (W - pad.l - pad.r);
    setHover(Math.max(0, Math.min(1, t)) * (profile.length - 1));
  };

  return (
    <figure className={className}>
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full touch-none select-none"
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
        role="img"
        aria-label={`Elevation profile, ${km} km, lowest ${min} m, highest ${max} m`}
      >
        <defs>
          <linearGradient id={`ep-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={stroke} stopOpacity={dark ? 0.35 : 0.22} />
            <stop offset="1" stopColor={stroke} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {!compact &&
          ticks.map((t) => (
            <g key={t}>
              <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke={ink} strokeOpacity="0.12" strokeDasharray="2 4" />
              <text x={pad.l - 6} y={y(t) + 3.5} textAnchor="end" fontSize="10.5" fill={ink} fillOpacity="0.75" fontFamily="var(--font-inter)" className="t-num">
                {t}
              </text>
            </g>
          ))}
        <path d={area} fill={`url(#ep-${id})`} />
        <path d={line} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        {!compact && (
          <g fontSize="10.5" fill={ink} fillOpacity="0.75" fontFamily="var(--font-inter)">
            <text x={pad.l} y={H - 8}>0 km</text>
            <text x={(pad.l + W - pad.r) / 2} y={H - 8} textAnchor="middle">{Math.round(km / 2)} km</text>
            <text x={W - pad.r} y={H - 8} textAnchor="end">{km} km</text>
          </g>
        )}
        {readout && (
          <g>
            <line x1={readout.px} x2={readout.px} y1={pad.t} y2={H - pad.b} stroke="#e0632e" strokeWidth="1.2" />
            <circle cx={readout.px} cy={readout.py} r="4.5" fill="#e0632e" stroke={dark ? '#1f3d2b' : '#f8f3ea'} strokeWidth="2" />
          </g>
        )}
      </svg>
      {!compact && (
        <figcaption className={`mt-2 flex justify-between text-[0.8125rem] t-num ${dark ? 'text-sand-50/80' : 'text-ink-soft'}`} aria-live="polite">
          <span>{readout ? `${readout.d.toFixed(1)} km` : 'Hover to read the profile'}</span>
          <span>{readout ? `${readout.m} m` : `${min}–${max} m`}</span>
        </figcaption>
      )}
    </figure>
  );
}
