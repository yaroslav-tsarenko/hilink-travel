'use client';

import { ArrowRight, Briefcase, MapPin } from 'lucide-react';
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
      setError('Enter a valid email');
      return;
    }
    toast({ title: 'Application received', text: `${apply} · we will be in touch (demo)` });
    setApply(null);
    setEmail('');
    setError('');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {teams.map((t) => (
          <button key={t} type="button" onClick={() => setTeam(t)} aria-pressed={team === t} className={`chip ${team === t ? 'chip-active' : ''}`}>{t}</button>
        ))}
      </div>
      <ul className="flex flex-col gap-4">
        {list.map((j) => (
          <li key={j.title} className="card group flex flex-col gap-4 p-6 transition hover:border-green-50 hover:shadow-lg md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="bold-20">{j.title}</h3>
              <p className="regular-14 mt-1 text-gray-30">{j.text}</p>
              <p className="mt-3 flex flex-wrap gap-4 text-[13px] font-semibold text-gray-50">
                <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {j.team} · {j.type}</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {j.location}</span>
              </p>
            </div>
            <button type="button" onClick={() => setApply(j.title)} className="flex shrink-0 items-center gap-2 rounded-full bg-green-90 px-6 py-3 font-bold text-white transition group-hover:bg-green-50">
              Apply <ArrowRight className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
      <Modal open={Boolean(apply)} onClose={() => setApply(null)} label="Apply for job">
        <form onSubmit={submit} noValidate className="flex flex-col gap-4">
          <p className="eyebrow">Apply</p>
          <h3 className="bold-24">{apply}</h3>
          <label className="flex flex-col gap-2">
            <span className="text-[14px] font-semibold">Your email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" aria-invalid={Boolean(error)} />
            {error && <span className="text-[13px] font-semibold text-orange-50" role="alert">{error}</span>}
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[14px] font-semibold">Why Hilink? <span className="font-normal text-gray-30">(optional)</span></span>
            <textarea rows={3} className="input resize-none" />
          </label>
          <button type="submit" className="btn_green rounded-full border font-bold">Send application</button>
        </form>
      </Modal>
    </div>
  );
}
