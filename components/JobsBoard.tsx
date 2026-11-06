'use client';

import { ArrowRight } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { JOBS } from '@/constants/content';
import Modal from './ui/Modal';
import { useToast } from './ui/Toast';

export default function JobsBoard() {
  const toast = useToast();
  const teams = ['All', ...Array.from(new Set(JOBS.map((j) => j.team)))];
  const [team, setTeam] = useState('All');
  const [apply, setApply] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const list = JOBS.filter((j) => team === 'All' || j.team === team);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email address');
      return;
    }
    toast({ title: 'Application received', text: `${apply}. Demo only — nothing was sent.` });
    setApply(null);
    setEmail('');
    setError('');
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by team">
        {teams.map((t) => (
          <button key={t} type="button" onClick={() => setTeam(t)} aria-pressed={team === t} className="chip">
            {t}
          </button>
        ))}
      </div>
      <ul className="border-t border-ink/20">
        {list.map((j) => (
          <li key={j.title} className="grid gap-4 border-b border-ink/20 py-7 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <h3 className="font-serif text-[1.5rem] leading-tight">{j.title}</h3>
              <p className="mt-2 max-w-[56ch] text-ink-soft">{j.text}</p>
            </div>
            <p className="text-[0.9375rem] text-ink-soft md:col-span-3">
              {j.location}
              <br />
              {j.team} · {j.type}
            </p>
            <div className="md:col-span-2 md:text-right">
              <button type="button" onClick={() => setApply(j.title)} className="btn btn-outline">
                Apply <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Modal open={Boolean(apply)} onClose={() => setApply(null)} label="Apply for this role">
        <form onSubmit={submit} noValidate className="flex flex-col gap-5">
          <div>
            <p className="t-label">Apply</p>
            <h3 className="t-h3 mt-3 pr-8">{apply}</h3>
          </div>
          <label className="flex flex-col gap-2">
            <span className="field-label">Email</span>
            <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="field" aria-invalid={Boolean(error)} />
            {error && (
              <span className="field-error" role="alert">
                {error}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-2">
            <span className="field-label">
              A few lines about you <span className="font-normal text-ink-soft">(optional)</span>
            </span>
            <textarea rows={4} className="field resize-none" />
          </label>
          <button type="submit" className="btn btn-primary btn-lg">
            Send application
          </button>
        </form>
      </Modal>
    </div>
  );
}
