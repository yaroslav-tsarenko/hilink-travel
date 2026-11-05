'use client';

import Image from 'next/image';
import { Star, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

const POOL = [
  { name: 'Maya L.', avatar: '/person-2.png', text: 'Beautiful spot and super well organised. The offline map guided us perfectly even in fog.', when: '2 weeks ago' },
  { name: 'Rizky P.', avatar: '/person-3.png', text: 'Exactly as described. Clean facilities and friendly hosts. Will definitely come back in autumn.', when: '1 month ago' },
  { name: 'Dewi A.', avatar: '/person-4.png', text: 'Came with two kids, felt safe the whole time. Sunsets were incredible.', when: '1 month ago' },
  { name: 'Samsul U.', avatar: '/person-1.png', text: 'Challenging in the best way. Bring good boots and more snacks than you think.', when: '2 months ago' },
  { name: 'Ana K.', avatar: '/person-2.png', text: 'Booked last minute through the app, everything worked smoothly.', when: '3 months ago' },
];

export default function Reviews({ rating, total, seed }: { rating: number; total: number; seed: number }) {
  const [count, setCount] = useState(3);
  const [liked, setLiked] = useState<number[]>([]);
  const list = [...POOL.slice(seed % POOL.length), ...POOL.slice(0, seed % POOL.length)];
  const bars = [78, 15, 5, 1, 1];

  return (
    <div>
      <h2 className="bold-32 mb-6">Reviews</h2>
      <div className="card mb-6 grid gap-6 p-6 sm:grid-cols-[160px_1fr] lg:p-8">
        <div className="flex flex-col items-center justify-center">
          <span className="bold-52">{rating}</span>
          <span className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-50 text-yellow-50" />)}</span>
          <span className="regular-14 mt-1 text-gray-30">{total.toLocaleString('en')} reviews</span>
        </div>
        <ul className="flex flex-col gap-2">
          {bars.map((b, i) => (
            <li key={i} className="flex items-center gap-3 text-[14px]">
              <span className="w-3 font-semibold">{5 - i}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-gray-10">
                <span className="block h-full rounded-full bg-green-50" style={{ width: `${b}%` }} />
              </span>
              <span className="w-10 text-right text-gray-30">{b}%</span>
            </li>
          ))}
        </ul>
      </div>
      <ul className="flex flex-col gap-4">
        {list.slice(0, count).map((r, i) => (
          <li key={r.name + i} className="card p-6">
            <div className="flexBetween mb-3">
              <span className="flex items-center gap-3">
                <Image src={r.avatar} alt="" width={40} height={40} className="rounded-full" />
                <span>
                  <span className="bold-16 block">{r.name}</span>
                  <span className="regular-14 text-gray-30">{r.when}</span>
                </span>
              </span>
              <span className="flex gap-0.5">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-yellow-50 text-yellow-50" />)}</span>
            </div>
            <p className="regular-16 text-gray-50">{r.text}</p>
            <button type="button" onClick={() => setLiked((l) => (l.includes(i) ? l.filter((x) => x !== i) : [...l, i]))} aria-pressed={liked.includes(i)} className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-bold transition ${liked.includes(i) ? 'bg-green-10 text-green-60' : 'text-gray-30 hover:bg-gray-5'}`}>
              <ThumbsUp className="h-4 w-4" /> Helpful {liked.includes(i) ? '· thanks!' : ''}
            </button>
          </li>
        ))}
      </ul>
      {count < list.length && (
        <button type="button" onClick={() => setCount((c) => c + 2)} className="btn_outline mt-6 rounded-full border font-bold">Show more reviews</button>
      )}
    </div>
  );
}
