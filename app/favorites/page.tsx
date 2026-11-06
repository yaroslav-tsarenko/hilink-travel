import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FavoritesList from '@/components/FavoritesList';

export const metadata: Metadata = { title: 'Saved trips', robots: { index: false } };

export default function FavoritesPage() {
  return (
    <>
      <PageHeader label="Your list" title="Saved trips" text="Routes you have bookmarked. Stored on this device only." crumbs={[{ label: 'Saved trips' }]} seed={61} />
      <section className="wrap section">
        <FavoritesList />
      </section>
    </>
  );
}
