import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = { title: 'Privacy' };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      sections={[
        { h: 'What we collect', p: 'The details you give us when you book or create an account, the trips you request, and basic analytics about how the site is used. The field app records your position only while a route is open, and keeps it on the device.' },
        { h: 'How we use it', p: 'To arrange your trip, match you with a guide, send route packs and forecasts, and improve the service. We do not sell personal data.' },
        { h: 'Who we share it with', p: 'Your guide, and where a permit is issued in your name, the park authority. Nobody else, unless the law requires it.' },
        { h: 'Your choices', p: 'You can download or delete your data at any time from your account, or by writing to us.' },
        { h: 'Cookies and storage', p: 'This site uses only local storage, to remember saved trips and packing lists on your device. No tracking cookies.' },
      ]}
    />
  );
}
