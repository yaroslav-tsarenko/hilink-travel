'use client';

import { NAV_LINKS } from '@/constants';
import { AnimatePresence, motion } from 'motion/react';
import { Bookmark, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFavorites } from '@/lib/useFavorites';
import Logo from './ui/Logo';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { favorites } = useFavorites();
  const overlay = pathname === '/' && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => pathname.startsWith(href);
  const text = overlay ? 'text-sand-50' : 'text-ink';

  return (
    <header
      className={`${pathname === '/' ? 'fixed' : 'sticky'} inset-x-0 top-0 z-50 transition-colors duration-300 ${
        overlay ? 'bg-transparent' : 'border-b border-ink/10 bg-sand/95 backdrop-blur-[6px]'
      }`}
    >
      <nav className={`wrap flex h-[72px] items-center justify-between gap-6 ${text}`} aria-label="Main">
        <Link href="/" onClick={() => setOpen(false)} aria-label="Wildway home" className="shrink-0">
          <Logo tone={overlay ? 'light' : 'dark'} />
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative whitespace-nowrap rounded-[6px] px-2.5 py-2 text-[0.875rem] font-medium transition-colors xl:px-3.5 xl:text-[0.9375rem] ${
                    overlay ? 'hover:bg-sand-50/15' : 'hover:bg-sand-200'
                  } ${active ? 'after:absolute after:inset-x-2.5 xl:after:inset-x-3.5 after:-bottom-[1px] after:h-[2px] after:bg-ember' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/favorites"
            className={`relative inline-flex items-center gap-2 rounded-[6px] px-3 py-2 text-[0.9375rem] font-medium ${overlay ? 'hover:bg-sand-50/15' : 'hover:bg-sand-200'}`}
            aria-label={`Saved trips (${favorites.length})`}
          >
            <Bookmark className="h-[18px] w-[18px]" aria-hidden />
            <span className="t-num">{favorites.length}</span>
          </Link>
          <Link href="/login" className={`hidden whitespace-nowrap rounded-[6px] px-3.5 py-2 xl:inline-block text-[0.9375rem] font-medium ${overlay ? 'hover:bg-sand-50/15' : 'hover:bg-sand-200'}`}>
            Log in
          </Link>
          <Link href="/camps" className={`btn ${overlay ? 'btn-light' : 'btn-primary'}`}>
            Find a trip
          </Link>
        </div>

        <button type="button" className="-mr-2 grid h-11 w-11 place-items-center rounded-[6px] lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
          <Menu className="h-6 w-6" aria-hidden />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 bg-ink/50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.aside
              className="absolute right-0 top-0 flex h-[100dvh] w-[min(88vw,380px)] flex-col bg-sand p-6 text-ink"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              aria-label="Menu"
            >
              <div className="mb-8 flex items-center justify-between">
                <Logo />
                <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="-mr-2 grid h-11 w-11 place-items-center rounded-[6px] hover:bg-sand-200">
                  <X className="h-6 w-6" aria-hidden />
                </button>
              </div>
              <ul className="flex flex-col border-t border-ink/15">
                {[...NAV_LINKS, { href: '/community', label: 'Community' }, { href: '/favorites', label: `Saved trips (${favorites.length})` }].map((link) => (
                  <li key={link.href} className="border-b border-ink/15">
                    <Link href={link.href} onClick={() => setOpen(false)} className={`flex items-center justify-between py-4 font-serif text-[1.5rem] ${isActive(link.href) ? 'text-pine' : ''}`}>
                      {link.label}
                      {isActive(link.href) && <span className="h-2 w-2 rounded-full bg-ember" aria-hidden />}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto grid gap-3 pt-6">
                <Link href="/camps" onClick={() => setOpen(false)} className="btn btn-primary btn-lg">
                  Find a trip
                </Link>
                <Link href="/login" onClick={() => setOpen(false)} className="btn btn-outline btn-lg">
                  Log in
                </Link>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
