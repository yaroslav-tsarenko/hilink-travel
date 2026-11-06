import { Cloud, CloudDrizzle, CloudSun, Sun, Wind } from 'lucide-react';
import { rng } from '@/lib/geo';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const KINDS = [
  { icon: Sun, label: 'Clear' },
  { icon: CloudSun, label: 'Broken cloud' },
  { icon: Cloud, label: 'Overcast' },
  { icon: CloudDrizzle, label: 'Showers' },
];

/** Five-day mountain forecast strip. Values are generated from a seed: demo data. */
export default function Weather({ seed, altitude, base = 14, tone = 'paper', className = '' }: { seed: number; altitude: number; base?: number; tone?: 'paper' | 'pine'; className?: string }) {
  const r = rng(seed + 3);
  const top = Math.round(base - altitude / 160);
  const dark = tone === 'pine';
  const days = DAYS.map((d) => {
    const k = KINDS[Math.floor(r() * KINDS.length)];
    const hi = top + Math.round(r() * 6 - 2);
    const lo = hi - 5 - Math.round(r() * 5);
    const wind = 8 + Math.round(r() * 30);
    return { d, ...k, hi, lo, wind };
  });

  return (
    <div className={className}>
      <div className={`mb-3 flex items-baseline justify-between text-[0.8125rem] ${dark ? 'text-sand-50/80' : 'text-ink-soft'}`}>
        <span className="font-semibold uppercase tracking-[0.12em]">Forecast at {altitude.toLocaleString('en-GB')} m</span>
        <span>Demo data</span>
      </div>
      <ul className={`grid grid-cols-5 overflow-hidden rounded-[8px] border ${dark ? 'border-sand-50/20' : 'border-line bg-sand-50'}`}>
        {days.map(({ d, icon: Icon, label, hi, lo, wind }, i) => (
          <li key={d} className={`flex flex-col items-center gap-1.5 px-1 py-3.5 text-center ${i ? (dark ? 'border-l border-sand-50/20' : 'border-l border-line') : ''}`}>
            <span className={`text-[0.75rem] font-semibold ${dark ? 'text-sand-50/80' : 'text-ink-soft'}`}>{d}</span>
            <Icon className={`h-6 w-6 ${dark ? 'text-sand-50' : 'text-pine'}`} strokeWidth={1.6} aria-label={label} />
            <span className={`t-num text-[0.9375rem] font-semibold ${dark ? 'text-sand-50' : ''}`}>
              {hi}° <span className={`font-normal ${dark ? 'text-sand-50/70' : 'text-ink-mute'}`}>{lo}°</span>
            </span>
            <span className={`t-num flex items-center gap-1 text-[0.75rem] ${dark ? 'text-sand-50/75' : 'text-ink-soft'}`}>
              <Wind className="h-3 w-3" aria-hidden />
              {wind}
              <span className="sr-only">km/h wind</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
