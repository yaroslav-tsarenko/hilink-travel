import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import PricingPlans from '@/components/PricingPlans';
import FaqList from '@/components/FaqList';

export const metadata: Metadata = { title: 'Membership', description: 'Book any trip for free, or become a member for offline route packs, member prices and free gear-rental days.' };

const PRICING_FAQ = [
  { q: 'Do I need a membership to book a trip?', a: 'No. Anyone can book any trip on the free Trailhead plan. Membership adds member prices, route packs and rental days for people who go out often.' },
  { q: 'How does the member price work?', a: 'The percentage comes off the trip price at booking. It cannot be combined with group discounts.' },
  { q: 'Can I cancel?', a: 'Yes, at any time. You keep the benefits until the end of the period you paid for.' },
  { q: 'What is a route pack?', a: 'GPX tracks, printable maps, water sources and bail-out points for a route, stored for offline use in the field app.' },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader label="Membership" title="Book for free. Join if you go often." text="Every trip can be booked without a membership. Members get better prices, offline route packs and free rental days." crumbs={[{ label: 'Membership' }]} seed={13} />
      <section className="wrap section">
        <PricingPlans />
      </section>
      <section className="wrap grid gap-12 pb-20 lg:grid-cols-12 lg:pb-28">
        <div className="lg:col-span-4">
          <p className="t-label">Questions</p>
          <h2 className="t-h2 mt-4">Good to know</h2>
        </div>
        <div className="lg:col-span-8">
          <FaqList items={PRICING_FAQ} />
        </div>
      </section>
    </>
  );
}
