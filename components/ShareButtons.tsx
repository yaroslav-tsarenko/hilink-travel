'use client';

import { Bookmark, Link2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from './ui/Toast';

export default function ShareButtons({ title }: { title: string }) {
  const toast = useToast();
  const [saved, setSaved] = useState(false);
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(window.location.href);
          } catch {}
          toast({ title: 'Link copied', text: title });
        }}
        className="chip"
      >
        <Link2 className="h-4 w-4" aria-hidden /> Copy link
      </button>
      <button
        type="button"
        aria-pressed={saved}
        onClick={() => {
          setSaved(!saved);
          toast({ title: saved ? 'Removed from reading list' : 'Saved to reading list' });
        }}
        className="chip"
      >
        <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} aria-hidden /> {saved ? 'Saved' : 'Save'}
      </button>
    </div>
  );
}
