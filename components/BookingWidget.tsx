'use client';

import { Loader2, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import type { Camp } from '@/constants/camps';
import Modal from './ui/Modal';
import { eur } from './ui/Bits';

const GEAR_PER_NIGHT = 14;

function Stepper({ label, hint, value, set, min, max }: { label: string; hint?: string; value: number; set: (n: number) => void; min: number; max: number }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-ink/10 py-3.5">
      <span>
        <span className="block text-[0.9375rem] font-medium">{label}</span>
        {hint && <span className="text-[0.8125rem] text-ink-soft">{hint}</span>}
      </span>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => set(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Fewer ${label.toLowerCase()}`} className="grid h-9 w-9 place-items-center rounded-full border border-line transition hover:border-ink disabled:opacity-35">
          <Minus className="h-4 w-4" aria-hidden />
        </button>
        <span className="t-num w-6 text-center font-serif text-[1.25rem]" aria-live="polite">
          {value}
        </span>
        <button type="button" onClick={() => set(Math.min(max, value + 1))} disabled={value >= max} aria-label={`More ${label.toLowerCase()}`} className="grid h-9 w-9 place-items-center rounded-full border border-line transition hover:border-ink disabled:opacity-35">
          <Plus className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}

const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
};

export default function BookingWidget({ camp }: { camp: Camp }) {
  const [date, setDate] = useState('');
  const [nights, setNights] = useState(Math.max(1, camp.days - 1));
  const [guests, setGuests] = useState(2);
  const [gear, setGear] = useState(false);
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const base = camp.price * nights * guests;
  const gearCost = gear ? GEAR_PER_NIGHT * nights * guests : 0;
  const total = base + gearCost;

  const reserve = () => {
    if (!date || date < tomorrow()) {
      setError(date ? 'Choose a start date from tomorrow onwards' : 'Choose a start date');
      return;
    }
    setError('');
    setState('loading');
    window.setTimeout(() => {
      setCode(`WW-${camp.slug.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`);
      setState('done');
    }, 1000);
  };

  const pretty = date ? new Date(`${date}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

  return (
    <div className="rounded-card border border-line bg-sand-50 p-6 shadow-card lg:sticky lg:top-[96px]">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-ink-soft">
          <span className="t-num font-serif text-[2.25rem] leading-none text-ink">{eur(camp.price)}</span> <span className="text-[0.875rem]">per walker, per night</span>
        </p>
      </div>
      <p className="mt-2 text-[0.8125rem] text-ink-soft">
        {camp.spotsLeft} of {camp.groupMax} places left on the next departure
      </p>

      <label className="mt-5 block">
        <span className="field-label">Start date</span>
        <input
          type="date"
          onFocus={(e) => {
            e.currentTarget.min = tomorrow();
          }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`field mt-2 ${error ? 'border-ember-ink' : ''}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'booking-error' : undefined}
        />
      </label>
      {error && (
        <p id="booking-error" className="field-error mt-2" role="alert">
          {error}
        </p>
      )}

      <div className="mt-2">
        <Stepper label="Nights" hint={`Route plan: ${camp.days - 1 || 1}`} value={nights} set={setNights} min={1} max={14} />
        <Stepper label="Walkers" hint={`Group of up to ${camp.groupMax}`} value={guests} set={setGuests} min={1} max={camp.groupMax} />
        <label className="flex cursor-pointer items-center justify-between gap-4 border-b border-ink/10 py-3.5">
          <span>
            <span className="block text-[0.9375rem] font-medium">Rent a full kit</span>
            <span className="text-[0.8125rem] text-ink-soft">Tent share, bag, mat, pack · {eur(GEAR_PER_NIGHT)} a night</span>
          </span>
          <input type="checkbox" checked={gear} onChange={(e) => setGear(e.target.checked)} className="h-5 w-5 accent-pine" />
        </label>
      </div>

      <dl className="t-num mt-4 flex flex-col gap-2 text-[0.9375rem]">
        <div className="flex justify-between text-ink-soft">
          <dt>
            {eur(camp.price)} × {nights} {nights === 1 ? 'night' : 'nights'} × {guests} {guests === 1 ? 'walker' : 'walkers'}
          </dt>
          <dd>{eur(base)}</dd>
        </div>
        {gear && (
          <div className="flex justify-between text-ink-soft">
            <dt>Kit rental</dt>
            <dd>{eur(gearCost)}</dd>
          </div>
        )}
        <div className="flex justify-between text-ink-soft">
          <dt>Permits and park fees</dt>
          <dd>Included</dd>
        </div>
        <div className="mt-2 flex items-baseline justify-between border-t border-ink/15 pt-3">
          <dt className="font-semibold">Total</dt>
          <dd className="font-serif text-[1.75rem] leading-none">{eur(total)}</dd>
        </div>
      </dl>

      <button type="button" onClick={reserve} disabled={state === 'loading'} className="btn btn-primary btn-lg mt-5 w-full">
        {state === 'loading' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Checking places
          </>
        ) : (
          'Request to book'
        )}
      </button>
      <p className="mt-3 text-center text-[0.8125rem] text-ink-soft">No payment now. Free cancellation up to 30 days before.</p>

      <Modal open={state === 'done'} onClose={() => setState('idle')} label="Booking request received">
        <p className="t-label">Request received</p>
        <h3 className="t-h3 mt-4">You are on the list for {camp.name}.</h3>
        <p className="mt-3 text-ink-soft">
          {guests} {guests === 1 ? 'walker' : 'walkers'}, {nights} {nights === 1 ? 'night' : 'nights'}, starting {pretty}. {camp.guide} will be in touch about kit and fitness.
        </p>
        <div className="mt-6 rounded-[8px] border border-dashed border-pine/50 bg-pine-tint/50 p-4">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">Reference</p>
          <p className="t-num mt-1 font-serif text-[1.5rem] tracking-[0.06em] text-pine">{code}</p>
        </div>
        <p className="mt-4 text-[0.8125rem] text-ink-soft">Demo only. No reservation was made and nothing was charged.</p>
        <button type="button" onClick={() => setState('idle')} className="btn btn-primary btn-lg mt-6 w-full">
          Done
        </button>
      </Modal>
    </div>
  );
}
