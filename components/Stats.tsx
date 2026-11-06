'use client';

import { animate, useInView } from 'motion/react';
import { useEffect, useRef } from 'react';

function Num({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const c = animate(0, to, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => (node.textContent = `${Math.round(v).toLocaleString('en-GB')}${suffix}`) });
    return () => c.stop();
  }, [inView, to, suffix]);
  return (
    <span ref={ref}>
      {to.toLocaleString('en-GB')}
      {suffix}
    </span>
  );
}

const STATS = [
  { to: 10, label: 'Regions on four continents' },
  { to: 46, label: 'Certified local guides' },
  { to: 3140, label: 'Nights out last season' },
  { to: 8, label: 'Walkers per group, on average' },
];

export default function Stats({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const light = tone === 'light';
  return (
    <dl className={`grid grid-cols-2 border-t lg:grid-cols-4 ${light ? 'border-sand-50/25' : 'border-ink/20'}`}>
      {STATS.map((s, i) => (
        <div key={s.label} className={`flex flex-col-reverse justify-end py-7 pr-4 ${i % 2 ? 'pl-5 lg:pl-6' : 'lg:pl-6'} ${i ? `border-l ${light ? 'border-sand-50/25' : 'border-ink/20'}` : ''} ${i === 2 ? 'max-lg:border-l-0 max-lg:pl-0' : ''} ${i >= 2 ? `max-lg:border-t ${light ? 'max-lg:border-sand-50/25' : 'max-lg:border-ink/20'}` : ''} first:pl-0`}>
          <dt className={`mt-3 text-[0.9375rem] ${light ? 'text-sand-50/80' : 'text-ink-soft'}`}>{s.label}</dt>
          <dd className={`t-num font-serif text-[clamp(2.5rem,5vw,4rem)] font-[350] leading-none ${light ? 'text-sand-50' : 'text-pine'}`}>
            <Num to={s.to} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
