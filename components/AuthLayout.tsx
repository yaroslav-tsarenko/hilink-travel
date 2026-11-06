import Image from 'next/image';
import type { ReactNode } from 'react';

export default function AuthLayout({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <section className="wrap grid gap-12 py-10 lg:min-h-[calc(100svh-72px)] lg:grid-cols-12 lg:items-stretch lg:py-12">
      <div className="relative hidden overflow-hidden rounded-card lg:col-span-6 lg:block">
        <Image src="/photos/auth.webp" alt="A green tent on a grassy slope with a hiker resting beside it under a cloudy sky" fill sizes="50vw" priority className="object-cover object-[30%_50%]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(17,36,24,0.8)_0%,rgba(17,36,24,0)_55%)]" />
        <figure className="absolute bottom-0 p-10 text-sand-50 xl:p-12">
          <blockquote className="max-w-[24ch] font-serif text-[2rem] italic leading-[1.15]">“The best camp is the one you leave with nothing to show you were there.”</blockquote>
          <figcaption className="mt-4 text-[0.9375rem] text-sand-50/80">Mikkel Strand, lead guide</figcaption>
        </figure>
      </div>
      <div className="mx-auto flex w-full max-w-[440px] flex-col justify-center lg:col-span-5 lg:col-start-8">
        <h1 className="t-h1">{title}</h1>
        <p className="t-lead mb-10 mt-4">{text}</p>
        {children}
      </div>
    </section>
  );
}
