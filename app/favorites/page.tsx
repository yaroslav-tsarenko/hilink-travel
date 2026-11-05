import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FavoritesList from '@/components/FavoritesList';

export const metadata: Metadata = { title: 'Saved camps', robots: { index: false } };

export default function FavoritesPage() {
  return (
    <>
      <PageHeader eyebrow="Your list" title="Saved camps" text="Camps you have hearted. Saved on this device." crumbs={[{ label: 'Saved camps' }]} />
      <section className="max-container padding-container pb-24"><FavoritesList /></section>
    </>
  );
}
