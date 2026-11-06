'use client';

import { Bookmark } from 'lucide-react';
import { useFavorites } from '@/lib/useFavorites';
import { useToast } from './Toast';

export default function FavoriteButton({ slug, name, className = '', variant = 'overlay' }: { slug: string; name: string; className?: string; variant?: 'overlay' | 'inline' }) {
  const { isFavorite, toggle } = useFavorites();
  const toast = useToast();
  const active = isFavorite(slug);
  const base =
    variant === 'overlay'
      ? `grid h-10 w-10 place-items-center rounded-full transition ${active ? 'bg-ember text-ink' : 'bg-sand-50/95 text-ink hover:bg-white'}`
      : `btn ${active ? 'bg-ember text-ink hover:bg-[#ea7444]' : 'btn-outline'}`;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
        toast({ title: active ? 'Removed from saved trips' : 'Saved to your trips', text: name });
      }}
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from saved trips` : `Save ${name}`}
      className={`${base} ${className}`}
    >
      <Bookmark className={`h-[18px] w-[18px] ${active ? 'fill-current' : ''}`} aria-hidden />
      {variant === 'inline' && <span>{active ? 'Saved' : 'Save trip'}</span>}
    </button>
  );
}
