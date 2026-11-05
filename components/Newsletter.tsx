'use client';

import { Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useToast } from './ui/Toast';

export default function Newsletter() {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    setError('');
    setEmail('');
    toast({ title: 'You are on the list!', text: 'Fresh trails and camp deals every Friday.' });
  };

  return (
    <div className="flex flex-col items-start justify-between gap-6 rounded-5xl bg-green-10 p-8 md:flex-row md:items-center lg:p-12">
      <div>
        <h3 className="bold-32">Trail notes, every Friday</h3>
        <p className="regular-16 mt-2 text-gray-30">New camps, seasonal guides and member-only deals. No spam.</p>
      </div>
      <form onSubmit={submit} className="w-full md:w-auto" noValidate>
        <div className="flex w-full gap-2 rounded-full bg-white p-2 shadow-sm md:w-[420px]">
          <label htmlFor="newsletter" className="sr-only">Email</label>
          <input id="newsletter" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="min-w-0 flex-1 rounded-full px-4 outline-none" />
          <button type="submit" className="flexCenter gap-2 rounded-full bg-green-50 px-5 py-3 font-bold text-white transition hover:bg-green-60">
            Subscribe <Send className="h-4 w-4" />
          </button>
        </div>
        {error && <p className="regular-14 mt-2 pl-4 text-orange-50" role="alert">{error}</p>}
      </form>
    </div>
  );
}
