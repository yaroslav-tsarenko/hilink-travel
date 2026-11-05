'use client';

import { Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useFavorites } from '@/lib/useFavorites';
import { useToast } from './Toast';

export default function FavoriteButton({ slug, name, className = '' }: { slug: string; name: string; className?: string }) {
  const { isFavorite, toggle } = useFavorites();
  const toast = useToast();
  const active = isFavorite(slug);
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.8 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
        toast({ title: active ? 'Removed from saved' : 'Saved to your camps', text: name });
      }}
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from saved` : `Save ${name}`}
      className={`grid h-11 w-11 place-items-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:scale-105 ${className}`}
    >
      <Heart className={`h-5 w-5 transition ${active ? 'fill-orange-50 text-orange-50' : 'text-gray-90'}`} />
    </motion.button>
  );
}
