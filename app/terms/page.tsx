import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = { title: 'Terms of Service' };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      sections={[
        { h: 'Using Hilink', p: 'Hilink provides maps, planning tools and booking access for outdoor activities. You are responsible for your own safety and preparation in the field.' },
        { h: 'Bookings', p: 'Bookings are agreements between you and the camp. Cancellation terms are shown before you confirm.' },
        { h: 'Subscriptions', p: 'Paid plans renew automatically until cancelled. You can cancel anytime and keep access until the end of the period.' },
        { h: 'Community content', p: 'Be kind, share accurate information and respect other members and the places you visit.' },
      ]}
    />
  );
}
