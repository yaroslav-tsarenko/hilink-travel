import Image from 'next/image';
import type { ReactNode } from 'react';

export default function AuthLayout({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <section className="max-container padding-container grid gap-10 py-10 lg:grid-cols-2 lg:py-16">
      <div className="relative hidden overflow-hidden rounded-5xl lg:block">
        <Image src="/img-2.webp" alt="" fill sizes="50vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-green-90/90 to-transparent" />
        <div className="absolute bottom-0 p-12 text-white">
          <p className="bold-32">“Only with Hilink you will no longer get lost.”</p>
          <p className="regular-16 mt-3 text-gray-10">Join 198k adventurers planning their next trip.</p>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-md flex-col justify-center">
        <h1 className="bold-40">{title}</h1>
        <p className="regular-16 mb-8 mt-3 text-gray-30">{text}</p>
        {children}
      </div>
    </section>
  );
}
