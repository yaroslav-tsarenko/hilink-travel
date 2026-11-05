'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { FAQ } from '@/constants/content';

export default function FaqList({ items = FAQ }: { items?: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="flex flex-col gap-3">
      {items.map((f, i) => {
        const on = open === i;
        return (
          <li key={f.q} className={`card overflow-hidden transition ${on ? 'border-green-50 shadow-lg' : ''}`}>
            <button type="button" onClick={() => setOpen(on ? null : i)} aria-expanded={on} className="flexBetween w-full gap-4 px-6 py-5 text-left">
              <span className="bold-18">{f.q}</span>
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition duration-300 ${on ? 'rotate-45 bg-green-50 text-white' : 'bg-gray-5'}`}>
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                  <p className="regular-16 px-6 pb-6 text-gray-30">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
