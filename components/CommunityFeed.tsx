'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { Heart, ImagePlus, MessageCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { GROUPS, POSTS, type GroupId, type Post } from '@/constants/content';
import { Avatar } from './ui/Bits';
import { useToast } from './ui/Toast';

const ALL = [{ id: 'all' as const, label: 'All reports' }, ...GROUPS];

export default function CommunityFeed() {
  const params = useSearchParams();
  const router = useRouter();
  const toast = useToast();
  const raw = params.get('group');
  const group: GroupId | 'all' = GROUPS.some((g) => g.id === raw) ? (raw as GroupId) : 'all';
  const [posts, setPosts] = useState<Post[]>(POSTS);
  const [liked, setLiked] = useState<number[]>([]);
  const [draft, setDraft] = useState('');

  const list = posts.filter((p) => group === 'all' || p.group === group);

  const publish = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    const p: Post = { id: Date.now(), group: group === 'all' ? 'long-trails' : group, author: 'You', camp: 'Your last trip', text: draft.trim(), likes: 0, comments: 0, time: 'now' };
    setPosts((all) => [p, ...all]);
    setDraft('');
    toast({ title: 'Trip report posted', text: 'Visible only to you in this demo.' });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <aside className="lg:col-span-3" aria-label="Groups">
        <div className="lg:sticky lg:top-[100px]">
          <p className="field-label">Groups</p>
          <ul className="mt-3 flex gap-2 overflow-x-auto pb-2 hide-scrollbar lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-ink/15">
            {ALL.map((g) => (
              <li key={g.id} className="lg:border-b lg:border-ink/15">
                <button
                  type="button"
                  aria-pressed={group === g.id}
                  onClick={() => router.replace(g.id === 'all' ? '/community' : `/community?group=${g.id}`, { scroll: false })}
                  className="chip lg:flex lg:w-full lg:justify-between lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:py-3 lg:text-[1rem] lg:aria-pressed:bg-transparent lg:aria-pressed:font-semibold lg:aria-pressed:text-pine"
                >
                  {g.label}
                  <span className="t-num hidden text-[0.8125rem] text-ink-soft lg:inline">{g.id === 'all' ? posts.length : posts.filter((p) => p.group === g.id).length}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="flex flex-col gap-8 lg:col-span-9 xl:col-span-8">
        <form onSubmit={publish} className="rounded-card border border-line bg-sand-50 p-5">
          <label htmlFor="report" className="field-label">
            Share a trip report
          </label>
          <textarea id="report" value={draft} onChange={(e) => setDraft(e.target.value)} rows={3} placeholder="Where did you go, what surprised you, what would you pack differently?" className="field mt-2 resize-none bg-sand" />
          <div className="mt-3 flex items-center justify-between">
            <button type="button" onClick={() => toast({ title: 'Photo upload', text: 'Not available in this demo.' })} className="inline-flex items-center gap-2 text-[0.875rem] font-medium text-ink-soft hover:text-ink">
              <ImagePlus className="h-5 w-5" aria-hidden /> Add photo
            </button>
            <button type="submit" disabled={!draft.trim()} className="btn btn-primary">
              Post report
            </button>
          </div>
        </form>

        <ul className="flex flex-col gap-10">
          <AnimatePresence initial={false}>
            {list.map((p) => {
              const on = liked.includes(p.id);
              return (
                <motion.li key={p.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="border-t border-ink/15 pt-6">
                  <div className="flex items-center gap-3">
                    <Avatar name={p.author} size={42} tone="sand" />
                    <div>
                      <p className="font-semibold">{p.author}</p>
                      <p className="text-[0.8125rem] text-ink-soft">
                        {p.camp} · {GROUPS.find((g) => g.id === p.group)?.label} · {p.time}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 max-w-[64ch] font-serif text-[1.25rem] leading-[1.45]">{p.text}</p>
                  {p.photo && (
                    <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-card">
                      <Image src={p.photo} alt={`Photo from ${p.camp}`} fill sizes="(max-width: 1024px) 92vw, 760px" className="object-cover" />
                    </div>
                  )}
                  <div className="mt-3 flex gap-1">
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => setLiked((l) => (on ? l.filter((x) => x !== p.id) : [...l, p.id]))}
                      className={`t-num inline-flex items-center gap-2 rounded-[6px] px-3 py-2 text-[0.875rem] font-medium transition ${on ? 'bg-ember-tint text-ember-ink' : 'text-ink-soft hover:bg-sand-200'}`}
                    >
                      <Heart className={`h-[18px] w-[18px] ${on ? 'fill-current' : ''}`} aria-hidden /> {p.likes + (on ? 1 : 0)}
                      <span className="sr-only">likes</span>
                    </button>
                    <button type="button" onClick={() => toast({ title: 'Comments', text: 'Comments are not part of this demo.' })} className="t-num inline-flex items-center gap-2 rounded-[6px] px-3 py-2 text-[0.875rem] font-medium text-ink-soft hover:bg-sand-200">
                      <MessageCircle className="h-[18px] w-[18px]" aria-hidden /> {p.comments}
                      <span className="sr-only">comments</span>
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
