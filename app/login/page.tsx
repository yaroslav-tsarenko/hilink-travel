import type { Metadata } from 'next';
import { Suspense } from 'react';
import AuthForm from '@/components/AuthForm';
import AuthLayout from '@/components/AuthLayout';

export const metadata: Metadata = { title: 'Log in', robots: { index: false } };

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome back" text="Log in to see your trips, saved camps and offline maps.">
      <Suspense><AuthForm mode="login" /></Suspense>
    </AuthLayout>
  );
}
