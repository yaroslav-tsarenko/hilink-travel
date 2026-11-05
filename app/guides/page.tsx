import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import GuidesList from '@/components/GuidesList';

export const metadata: Metadata = { title: 'Trail guides', description: 'Tips, gear advice, destinations and safety guides from the Hilink team and community.' };

export default function GuidesPage() {
  return (
    <>
      <PageHeader eyebrow="Trail guides" title="Learn before you go" text="Practical advice from guides, cartographers and thousands of hikers in our community." crumbs={[{ label: 'Guides' }]} />
      <section className="max-container padding-container pb-24">
        <GuidesList />
      </section>
    </>
  );
}
