import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import ContactForm from '@/components/ContactForm';
import FaqList from '@/components/FaqList';
import { CONTACT } from '@/constants';

export const metadata: Metadata = { title: 'Contact', description: 'Questions about a trip, a private group or gear rental. We reply within one working day.' };

const CHANNELS = [
  { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: 'Office', value: CONTACT.base },
  { label: 'Hours', value: 'Mon–Fri, 08:00–17:00 CET' },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader label="Contact" title="Ask a guide" text="Not sure a route suits you, planning a private group, or looking for gear? Write to us. A guide answers, not a bot." crumbs={[{ label: 'Contact' }]} seed={59} />
      <section className="wrap section grid gap-12 lg:grid-cols-12">
        <dl className="flex flex-col lg:col-span-4">
          {CHANNELS.map((c) => (
            <div key={c.label} className="border-t border-ink/20 py-5 last:border-b">
              <dt className="t-label">{c.label}</dt>
              <dd className="mt-2 font-serif text-[1.375rem] leading-snug">
                {c.href ? (
                  <a href={c.href} className="underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                    {c.value}
                  </a>
                ) : (
                  c.value
                )}
              </dd>
            </div>
          ))}
        </dl>
        <div className="lg:col-span-8">
          <ContactForm />
        </div>
      </section>
      <section className="wrap grid gap-12 pb-20 lg:grid-cols-12 lg:pb-28">
        <div className="lg:col-span-4">
          <p className="t-label">Questions</p>
          <h2 className="t-h2 mt-4">Quick answers</h2>
        </div>
        <div className="lg:col-span-8">
          <FaqList />
        </div>
      </section>
    </>
  );
}
