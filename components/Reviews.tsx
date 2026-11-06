'use client';

import { Star, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { Avatar } from './ui/Bits';

const POOL = [
  { name: 'Hanna B.', from: 'Stockholm', text: 'Well paced and properly guided. When the cloud came in on day two our guide had us on a bearing within a minute — nobody worried.', when: 'September 2026' },
  { name: 'Tom R.', from: 'Leeds', text: 'Exactly as described, including the river crossings. Food was far better than it had any right to be at the end of a long day.', when: 'August 2026' },
  { name: 'Aiko M.', from: 'Osaka', text: 'I was the least experienced in the group and never felt it. Rented the full kit and it was all in good condition.', when: 'August 2026' },
  { name: 'Luis P.', from: 'Valencia', text: 'Hard in the best way. Bring good boots, two pairs of dry socks and more snacks than you think.', when: 'July 2026' },
  { name: 'Grace O.', from: 'Dublin', text: 'Small group, quiet camps, and the guide knew the history of every valley. Booked my next trip on the bus home.', when: 'June 2026' },
];

export default function Reviews({ rating, total, seed }: { rating: number; total: number; seed: number }) {
  const [count, setCount] = useState(3);
  const [liked, setLiked] = useState<number[]>([]);
  const list = [...POOL.slice(seed % POOL.length), ...POOL.slice(0, seed % POOL.length)];
  const bars = [81, 14, 3, 1, 1];

  return (
    <div>
      <h2 className="t-h3">What walkers said</h2>
      <div className="mt-6 grid gap-8 border-y border-ink/15 py-6 sm:grid-cols-[180px_1fr]">
        <div>
          <p className="t-num font-serif text-[3.5rem] leading-none">{rating.toFixed(1)}</p>
          <p className="mt-2 flex gap-0.5 text-pine" aria-label={`${rating} out of 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
            ))}
          </p>
          <p className="t-num mt-2 text-[0.875rem] text-ink-soft">{total.toLocaleString('en-GB')} reviews</p>
        </div>
        <ul className="flex flex-col justify-center gap-2">
          {bars.map((b, i) => (
            <li key={i} className="t-num flex items-center gap-3 text-[0.8125rem]">
              <span className="w-3 text-ink-soft">{5 - i}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-sand-200">
                <span className="block h-full bg-pine" style={{ width: `${b}%` }} />
              </span>
              <span className="w-9 text-right text-ink-soft">{b}%</span>
            </li>
          ))}
        </ul>
      </div>
      <ul className="flex flex-col">
        {list.slice(0, count).map((r, i) => (
          <li key={r.name} className="border-b border-ink/10 py-6">
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-3">
                <Avatar name={r.name} size={40} tone="sand" />
                <span>
                  <span className="block font-semibold">{r.name}</span>
                  <span className="text-[0.8125rem] text-ink-soft">
                    {r.from} · walked {r.when}
                  </span>
                </span>
              </span>
              <span className="flex gap-0.5 text-pine" aria-label="5 out of 5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-current" aria-hidden />
                ))}
              </span>
            </div>
            <p className="mt-3 max-w-[64ch]">{r.text}</p>
            <button
              type="button"
              onClick={() => setLiked((l) => (l.includes(i) ? l.filter((x) => x !== i) : [...l, i]))}
              aria-pressed={liked.includes(i)}
              className={`mt-3 inline-flex items-center gap-2 rounded-[6px] px-2.5 py-1.5 text-[0.8125rem] font-medium transition ${liked.includes(i) ? 'bg-pine-tint text-pine' : 'text-ink-soft hover:bg-sand-200'}`}
            >
              <ThumbsUp className="h-4 w-4" aria-hidden /> {liked.includes(i) ? 'Marked helpful' : 'Helpful'}
            </button>
          </li>
        ))}
      </ul>
      {count < list.length && (
        <button type="button" onClick={() => setCount((c) => c + 2)} className="btn btn-outline mt-6">
          Show more reviews
        </button>
      )}
    </div>
  );
}
