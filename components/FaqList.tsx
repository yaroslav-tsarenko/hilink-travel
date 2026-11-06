'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useId, useState } from 'react';
import { FAQ } from '@/constants/content';

export default function FaqList({ items = FAQ }: { items?: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <ul className="border-t border-ink/20">
      {items.map((f, i) => {
        const on = open === i;
        return (
          <li key={f.q} className="border-b border-ink/20">
            <h3>
              <button type="button" onClick={() => setOpen(on ? null : i)} aria-expanded={on} aria-controls={`${id}-${i}`} className="flex w-full items-center justify-between gap-6 py-5 text-left">
                <span className="font-serif text-[1.25rem] leading-snug lg:text-[1.375rem]">{f.q}</span>
                <Plus className={`h-5 w-5 shrink-0 text-pine transition-transform duration-300 ${on ? 'rotate-45' : ''}`} aria-hidden />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div id={`${id}-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} className="overflow-hidden">
                  <p className="max-w-[64ch] pb-6 text-ink-soft">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
