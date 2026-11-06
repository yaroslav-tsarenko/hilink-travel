import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import JobsBoard from '@/components/JobsBoard';

export const metadata: Metadata = { title: 'Careers', description: 'Guiding, product and operations roles at Wildway.' };

export default function CareersPage() {
  return (
    <>
      <PageHeader label="Careers" title="Work on the trail, or for it" text="Seasonal guiding roles and year-round jobs in product and operations. Remote where the work allows it, outdoors where it does not." crumbs={[{ label: 'Careers' }]} seed={47} />
      <section className="wrap section">
        <JobsBoard />
      </section>
    </>
  );
}
