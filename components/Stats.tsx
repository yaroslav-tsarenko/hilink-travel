'use client';

import { animate, useInView } from 'motion/react';
import { useEffect, useRef } from 'react';

function Num({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const c = animate(0, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => (node.textContent = `${Math.round(v).toLocaleString('en')}${suffix}`) });
    return () => c.stop();
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

const STATS = [
  { to: 1200, suffix: '+', label: 'Partner camps' },
  { to: 198, suffix: 'k', label: 'Excellent reviews' },
  { to: 64, suffix: '', label: 'Countries' },
  { to: 2, suffix: 'M', label: 'Offline maps downloaded' },
];

export default function Stats() {
  return (
    <section className="max-container padding-container py-24">
      <ul className="grid grid-cols-2 gap-6 rounded-5xl bg-green-90 p-8 text-white lg:grid-cols-4 lg:p-14">
        {STATS.map((s) => (
          <li key={s.label} className="flex flex-col gap-2">
            <span className="bold-40 lg:bold-52 text-green-50 tabular-nums"><Num to={s.to} suffix={s.suffix} /></span>
            <span className="regular-16 text-gray-20">{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
