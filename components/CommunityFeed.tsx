'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { Heart, ImagePlus, MessageCircle, Send } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { POSTS, type Post } from '@/constants/content';
import Landscape from './ui/Landscape';
import { useToast } from './ui/Toast';

const GROUPS = [
  { id: 'all', label: 'All stories' },
  { id: 'climbing', label: 'Climbing xixixi' },
  { id: 'hiking', label: 'Hiking hilink' },
  { id: 'kinthill', label: 'Hilink kinthill' },
] as const;

export default function CommunityFeed() {
  const params = useSearchParams();
  const router = useRouter();
  const toast = useToast();
  const group = (params.get('group') ?? 'all') as (typeof GROUPS)[number]['id'];
  const [posts, setPosts] = useState<Post[]>(POSTS);
  const [liked, setLiked] = useState<number[]>([]);
  const [draft, setDraft] = useState('');

  const list = posts.filter((p) => group === 'all' || p.group === group);

  const publish = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    const p: Post = { id: Date.now(), group: group === 'all' ? 'hiking' : group, author: 'You', avatar: '/person-1.png', camp: 'Somewhere wild', text: draft.trim(), likes: 0, comments: 0, palette: Math.floor(Math.random() * 10), time: 'now' };
    setPosts((all) => [p, ...all]);
    setDraft('');
    toast({ title: 'Story shared!', text: 'Only visible to you in this demo.' });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <p className="eyebrow mb-4">Groups</p>
        <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
          {GROUPS.map((g) => (
            <li key={g.id}>
              <button type="button" onClick={() => router.replace(g.id === 'all' ? '/community' : `/community?group=${g.id}`, { scroll: false })} className={`w-full whitespace-nowrap rounded-2xl px-4 py-3 text-left font-semibold transition ${group === g.id ? 'bg-green-50 text-white' : 'hover:bg-gray-5'}`}>
                {g.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className="flex flex-col gap-6">
        <form onSubmit={publish} className="card flex flex-col gap-4 p-5">
          <div className="flex gap-4">
            <Image src="/person-1.png" alt="" width={44} height={44} className="h-11 w-11 rounded-full" />
            <label className="flex-1">
              <span className="sr-only">Share your story</span>
              <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={2} placeholder="Share a story from your last trip…" className="w-full resize-none rounded-2xl bg-gray-5 px-4 py-3 outline-none focus:ring-2 focus:ring-green-50/30" />
            </label>
          </div>
          <div className="flexBetween">
            <button type="button" onClick={() => toast({ title: 'Photo upload', text: 'Coming soon in the app.' })} className="flex items-center gap-2 text-[14px] font-semibold text-gray-30 hover:text-green-50">
              <ImagePlus className="h-5 w-5" /> Add photo
            </button>
            <button type="submit" disabled={!draft.trim()} className="flex items-center gap-2 rounded-full bg-green-50 px-5 py-2.5 font-bold text-white transition hover:bg-green-60 disabled:opacity-40">
              Share <Send className="h-4 w-4" />
            </button>
          </div>
        </form>

        <ul className="flex flex-col gap-6">
          <AnimatePresence initial={false}>
            {list.map((p) => {
              const on = liked.includes(p.id);
              return (
                <motion.li key={p.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="card overflow-hidden">
                  <div className="flex items-center gap-3 p-5">
                    <Image src={p.avatar} alt="" width={44} height={44} className="rounded-full" />
                    <div>
                      <p className="bold-16">{p.author}</p>
                      <p className="regular-14 text-gray-30">at {p.camp} · {p.time}</p>
                    </div>
                  </div>
                  <p className="regular-16 px-5 pb-4">{p.text}</p>
                  <Landscape palette={p.palette} className="aspect-[16/8] w-full" />
                  <div className="flex gap-2 p-3">
                    <motion.button type="button" whileTap={{ scale: 0.85 }} aria-pressed={on} onClick={() => setLiked((l) => (on ? l.filter((x) => x !== p.id) : [...l, p.id]))} className={`flex items-center gap-2 rounded-full px-4 py-2 font-semibold transition ${on ? 'bg-orange-10 text-orange-50' : 'text-gray-50 hover:bg-gray-5'}`}>
                      <Heart className={`h-5 w-5 ${on ? 'fill-orange-50' : ''}`} /> {p.likes + (on ? 1 : 0)}
                    </motion.button>
                    <button type="button" onClick={() => toast({ title: 'Comments', text: 'Open the Hilink app to join the conversation.' })} className="flex items-center gap-2 rounded-full px-4 py-2 font-semibold text-gray-50 hover:bg-gray-5">
                      <MessageCircle className="h-5 w-5" /> {p.comments}
                    </button>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
