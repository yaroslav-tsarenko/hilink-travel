import { Cloud, CloudRain, CloudSun, Sun } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const ICONS = [Sun, CloudSun, Cloud, CloudRain];

export default function Weather({ seed, elevation }: { seed: number; elevation: string }) {
  const base = 26 - Math.round(parseFloat(elevation) * 6);
  return (
    <div className="card p-6 lg:p-8">
      <div className="flexBetween mb-6">
        <h3 className="bold-20">5-day forecast</h3>
        <span className="regular-14 text-gray-30">at {elevation}</span>
      </div>
      <ul className="grid grid-cols-5 gap-2">
        {DAYS.map((d, i) => {
          const Icon = ICONS[(seed + i * 3) % ICONS.length];
          const t = base + (((seed + 1) * (i + 2)) % 7) - 3;
          return (
            <li key={d} className="flex flex-col items-center gap-2 rounded-2xl bg-gray-5 py-4 transition hover:-translate-y-1 hover:bg-green-10">
              <span className="text-[12px] font-bold text-gray-30">{d}</span>
              <Icon className="h-7 w-7 text-green-50" />
              <span className="bold-16">{t}°</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
