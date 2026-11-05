'use client';

import { NAV_LINKS } from '@/constants';
import { AnimatePresence, motion } from 'motion/react';
import { Heart, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFavorites } from '@/lib/useFavorites';
import Button from './Button';

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { favorites } = useFavorites();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
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

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/85 shadow-[0_1px_0_#EEEEEE] backdrop-blur-md' : 'bg-transparent'}`}>
      <nav className="flexBetween max-container padding-container relative py-5" aria-label="Main">
        <Link href="/" onClick={() => setOpen(false)} aria-label="Hilink home">
          <Image src="/hilink-logo.svg" alt="Hilink" width={74} height={29} priority />
        </Link>

        <ul className="hidden h-full gap-10 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                className={`regular-16 group relative flexCenter pb-1.5 transition-colors hover:text-gray-90 ${isActive(link.href) ? 'font-[700] text-gray-90' : 'text-gray-50'}`}
              >
                {link.label}
                <span className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-green-50 transition-all duration-300 ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <Link href="/favorites" className="relative rounded-full p-3 text-gray-50 transition hover:bg-green-10 hover:text-green-50" aria-label={`Saved camps (${favorites.length})`}>
            <Heart className="h-5 w-5" />
            {favorites.length > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-orange-50 px-1 text-[11px] font-bold text-white">{favorites.length}</span>}
          </Link>
          <Button title="Login" icon="/user.svg" variant="btn_dark_green" href="/login" />
        </div>

        <button type="button" className="rounded-full p-1 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
          <Image src="/menu.svg" alt="" width={32} height={32} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 bg-black/40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.aside
              className="absolute right-0 top-0 flex h-full w-[min(86vw,360px)] flex-col bg-white p-6 shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flexBetween mb-10">
                <Image src="/hilink-logo.svg" alt="Hilink" width={74} height={29} />
                <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-full p-2 hover:bg-gray-10">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {[...NAV_LINKS, { href: '/guides', key: 'guides', label: 'Trail guides' }, { href: '/community', key: 'community', label: 'Community' }, { href: '/favorites', key: 'fav', label: `Saved camps (${favorites.length})` }].map((link, i) => (
                  <motion.li key={link.key} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1 }}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`bold-18 block rounded-2xl px-4 py-3 transition ${isActive(link.href) ? 'bg-green-10 text-green-50' : 'hover:bg-gray-5'}`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3">
                <Button title="Login" icon="/user.svg" variant="btn_dark_green" href="/login" full />
                <Button title="Download App" variant="btn_green" href="/app" full />
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
