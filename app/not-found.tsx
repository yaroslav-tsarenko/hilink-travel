import Image from 'next/image';
import Button from '@/components/Button';

export default function NotFound() {
  return (
    <section className="max-container padding-container flexCenter flex-col gap-6 py-24 text-center">
      <Image src="/hero.webp" alt="" width={360} height={290} className="opacity-80" />
      <p className="eyebrow">Error 404</p>
      <h1 className="bold-40 lg:bold-64">Looks like you got lost</h1>
      <p className="regular-18 max-w-lg text-gray-30">Even with offline maps this trail does not exist. Let&apos;s get you back to camp.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button title="Back home" variant="btn_green" href="/" />
        <Button title="Browse camps" variant="btn_outline" href="/camps" />
      </div>
    </section>
  );
}
