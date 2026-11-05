type Palette = { sky: [string, string]; sun: string; layers: [string, string, string]; shape: 'peaks' | 'dunes' | 'lake' | 'forest' };

const PALETTES: Palette[] = [
  { sky: ['#FDE7C7', '#F7B98B'], sun: '#FFF4D6', layers: ['#9BC89F', '#4E9A62', '#1F5E36'], shape: 'forest' },
  { sky: ['#D9EEF7', '#9FD0E8'], sun: '#FFFFFF', layers: ['#9AB8C9', '#5E8BA3', '#2E5B4A'], shape: 'lake' },
  { sky: ['#FFE3D3', '#F29E7E'], sun: '#FFF0E0', layers: ['#B58C86', '#7A5A63', '#3D3346'], shape: 'peaks' },
  { sky: ['#FFE8C2', '#FFB26B'], sun: '#FFF6E0', layers: ['#F0A065', '#D2693C', '#8C3B22'], shape: 'dunes' },
  { sky: ['#CDE7F0', '#7FB6D1'], sun: '#FFFFFF', layers: ['#6E9CB3', '#3B6F8C', '#163C52'], shape: 'lake' },
  { sky: ['#EEF3F8', '#C4D3E2'], sun: '#FFFFFF', layers: ['#E6EEF5', '#A9BDD1', '#5F7C99'], shape: 'peaks' },
  { sky: ['#E7F4D9', '#B9DE9E'], sun: '#FFFBE6', layers: ['#7FBF7B', '#3F8F4F', '#1D4E2C'], shape: 'forest' },
  { sky: ['#E0E7FF', '#A5B4FC'], sun: '#FFF7ED', layers: ['#8E9AD6', '#55619E', '#2A3163'], shape: 'peaks' },
  { sky: ['#FFD9B8', '#F78F5B'], sun: '#FFEBD1', layers: ['#E9915C', '#B65C36', '#6E2F1C'], shape: 'dunes' },
  { sky: ['#E3F2FD', '#B3D7F2'], sun: '#FFFFFF', layers: ['#DCEBF7', '#8FB3D3', '#3E6A92'], shape: 'peaks' },
];

const SHAPES: Record<Palette['shape'], [string, string, string]> = {
  peaks: [
    'M0 170 L60 110 L110 150 L170 80 L230 140 L290 95 L350 135 L400 100 L400 260 L0 260 Z',
    'M0 200 L50 160 L120 190 L190 130 L260 185 L320 150 L400 180 L400 260 L0 260 Z',
    'M0 225 L80 200 L160 220 L240 195 L320 215 L400 200 L400 260 L0 260 Z',
  ],
  dunes: [
    'M0 160 C80 120 140 170 220 140 C300 110 350 150 400 130 L400 260 L0 260 Z',
    'M0 195 C70 165 150 205 230 180 C310 155 360 190 400 175 L400 260 L0 260 Z',
    'M0 225 C90 205 170 235 260 215 C330 200 370 220 400 212 L400 260 L0 260 Z',
  ],
  lake: [
    'M0 150 L70 95 L120 130 L190 70 L250 125 L320 85 L400 135 L400 260 L0 260 Z',
    'M0 180 L60 150 L130 175 L200 140 L270 172 L340 150 L400 170 L400 260 L0 260 Z',
    'M0 205 L400 205 L400 260 L0 260 Z',
  ],
  forest: [
    'M0 160 L50 130 L100 150 L160 115 L220 145 L290 120 L350 140 L400 125 L400 260 L0 260 Z',
    'M0 190 Q100 160 200 185 T400 175 L400 260 L0 260 Z',
    'M0 220 Q120 200 220 218 T400 210 L400 260 L0 260 Z',
  ],
};

function Trees({ color }: { color: string }) {
  const xs = [18, 46, 70, 300, 330, 362, 388];
  return (
    <g fill={color}>
      {xs.map((x, i) => {
        const h = 34 + ((i * 13) % 18);
        const base = 232 - (i % 3) * 4;
        return <path key={x} d={`M${x} ${base - h} L${x + 12} ${base} L${x - 12} ${base} Z`} />;
      })}
    </g>
  );
}

export default function Landscape({ palette = 0, className = '', title }: { palette?: number; className?: string; title?: string }) {
  const p = PALETTES[palette % PALETTES.length];
  const [a, b, c] = SHAPES[p.shape];
  const id = `ls-${palette}`;
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.sky[1]} />
          <stop offset="1" stopColor={p.sky[0]} />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${id}-sky)`} />
      <circle cx="300" cy="70" r="30" fill={p.sun} opacity="0.9" />
      <path d={a} fill={p.layers[0]} />
      <path d={b} fill={p.layers[1]} />
      {p.shape === 'lake' && <rect y="205" width="400" height="55" fill={p.sky[1]} opacity="0.55" />}
      <path d={c} fill={p.layers[2]} opacity={p.shape === 'lake' ? 0.35 : 1} />
      {p.shape === 'forest' && <Trees color={p.layers[2]} />}
    </svg>
  );
}
