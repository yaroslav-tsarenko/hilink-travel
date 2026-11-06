export function LogoMark({ className = '', tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  const bg = tone === 'light' ? '#f8f3ea' : '#1f3d2b';
  const fg = tone === 'light' ? '#1f3d2b' : '#f8f3ea';
  // A "W" drawn as two ridgelines with a low sun: the brand mark.
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="7" fill={bg} />
      <circle cx="22.5" cy="10" r="2.6" fill="#e0632e" />
      <path d="M5.5 11.5 10.5 22.5 16 14 21.5 22.5 26.5 13" fill="none" stroke={fg} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Logo({ className = '', tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${tone === 'light' ? 'text-sand-50' : 'text-pine'} ${className}`}>
      <LogoMark className="h-8 w-8" tone={tone} />
      <span className="font-serif text-[1.5rem] font-[500] leading-none tracking-[-0.02em]" style={{ fontVariationSettings: '"opsz" 48' }}>
        Wildway
      </span>
    </span>
  );
}
