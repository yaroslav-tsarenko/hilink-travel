'use client';

import { ArrowRight } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useToast } from './ui/Toast';

export default function Newsletter() {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setEmail('');
    toast({ title: 'You are on the list', text: 'The Trail Letter arrives on Fridays. (Demo — nothing was sent.)' });
  };

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <label htmlFor="newsletter" className="mb-2 block text-[0.8125rem] font-semibold text-sand-50/85">
        Email address
      </label>
      <div className="flex w-full gap-2 border-b border-sand-50/40 pb-2 focus-within:border-sand-50">
        <input
          id="newsletter"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'newsletter-error' : undefined}
          className="min-w-0 flex-1 bg-transparent py-2 text-[1.0625rem] text-sand-50 outline-none placeholder:text-sand-50/50"
        />
        <button type="submit" className="btn btn-ember shrink-0">
          Subscribe <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
      {error && (
        <p id="newsletter-error" className="mt-2 text-[0.8125rem] font-medium text-ember-tint" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
