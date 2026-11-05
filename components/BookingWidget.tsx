'use client';

import { CalendarDays, Loader2, Minus, PartyPopper, Plus, Users } from 'lucide-react';
import { useState } from 'react';
import type { Camp } from '@/constants/camps';
import Modal from './ui/Modal';

function Stepper({ label, value, set, min, max, icon }: { label: string; value: number; set: (n: number) => void; min: number; max: number; icon: React.ReactNode }) {
  return (
    <div className="flexBetween rounded-2xl border border-gray-10 px-4 py-3">
      <span className="flex items-center gap-2 text-[14px] font-semibold text-gray-50">
        {icon}
        {label}
      </span>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => set(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Decrease ${label}`} className="grid h-8 w-8 place-items-center rounded-full border border-gray-10 transition hover:border-green-50 disabled:opacity-40">
          <Minus className="h-4 w-4" />
        </button>
        <span className="bold-16 w-5 text-center tabular-nums" aria-live="polite">{value}</span>
        <button type="button" onClick={() => set(Math.min(max, value + 1))} disabled={value >= max} aria-label={`Increase ${label}`} className="grid h-8 w-8 place-items-center rounded-full border border-gray-10 transition hover:border-green-50 disabled:opacity-40">
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function BookingWidget({ camp }: { camp: Camp }) {
  const [date, setDate] = useState('');
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);
  const [gear, setGear] = useState(false);
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const tomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  };

  const spots = Math.ceil(guests / 2);
  const base = camp.price * nights * spots;
  const gearCost = gear ? 12 * nights * spots : 0;
  const total = base + gearCost;

  const reserve = () => {
    if (!date || date < tomorrow()) {
      setError(date ? 'Pick a date from tomorrow onwards' : 'Choose your arrival date');
      return;
    }
    setError('');
    setState('loading');
    window.setTimeout(() => {
      setCode(`HL-${camp.slug.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`);
      setState('done');
    }, 1100);
  };

  return (
    <div className="card sticky top-28 flex flex-col gap-4 p-6 shadow-xl">
      <p className="text-[14px] text-gray-30">
        <span className="bold-32 text-gray-90">${camp.price}</span> / night per tent spot
      </p>
      <label className="flex flex-col gap-2">
        <span className="flex items-center gap-2 text-[14px] font-semibold text-gray-50">
          <CalendarDays className="h-4 w-4" /> Arrival
        </span>
        <input type="date" onFocus={(e) => { e.currentTarget.min = tomorrow(); }} value={date} onChange={(e) => setDate(e.target.value)} className="input py-3" aria-invalid={Boolean(error)} />
      </label>
      <Stepper label="Nights" value={nights} set={setNights} min={1} max={14} icon={<CalendarDays className="h-4 w-4" />} />
      <Stepper label="Guests" value={guests} set={setGuests} min={1} max={8} icon={<Users className="h-4 w-4" />} />
      <label className="flex cursor-pointer items-center justify-between rounded-2xl bg-green-10 px-4 py-3">
        <span className="text-[14px] font-semibold">
          Rent full gear set <span className="text-gray-30">(+$12/night)</span>
        </span>
        <input type="checkbox" checked={gear} onChange={(e) => setGear(e.target.checked)} className="h-5 w-5 accent-green-50" />
      </label>

      <dl className="flex flex-col gap-2 border-t border-gray-10 pt-4 text-[14px]">
        <div className="flexBetween text-gray-50">
          <dt>${camp.price} × {nights} nights × {spots} spot{spots > 1 ? 's' : ''}</dt>
          <dd>${base}</dd>
        </div>
        {gear && (
          <div className="flexBetween text-gray-50">
            <dt>Gear rental</dt>
            <dd>${gearCost}</dd>
          </div>
        )}
        <div className="flexBetween text-gray-50">
          <dt>Hilink fee</dt>
          <dd className="font-bold text-green-50">Free</dd>
        </div>
        <div className="flexBetween bold-18 pt-2">
          <dt>Total</dt>
          <dd className="tabular-nums">${total}</dd>
        </div>
      </dl>

      {error && <p className="text-[14px] font-semibold text-orange-50" role="alert">{error}</p>}
      <button type="button" onClick={reserve} disabled={state === 'loading'} className="btn_green flexCenter gap-2 rounded-full border font-bold transition hover:bg-green-60 disabled:opacity-70">
        {state === 'loading' ? <><Loader2 className="h-5 w-5 animate-spin" /> Checking availability…</> : 'Reserve spot'}
      </button>
      <p className="text-center text-[12px] text-gray-30">You won&apos;t be charged yet · Free cancellation 48h before</p>

      <Modal open={state === 'done'} onClose={() => setState('idle')} label="Booking confirmed">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-green-10 text-green-50">
            <PartyPopper className="h-8 w-8" />
          </div>
          <h3 className="bold-32">You&apos;re going camping!</h3>
          <p className="regular-16 text-gray-30">
            {camp.name} · {nights} night{nights > 1 ? 's' : ''} · {guests} guest{guests > 1 ? 's' : ''} from {date}
          </p>
          <div className="w-full rounded-2xl border border-dashed border-green-50 bg-green-10 p-4">
            <p className="text-[12px] uppercase tracking-widest text-gray-30">Booking code</p>
            <p className="bold-20 tracking-widest text-green-60">{code}</p>
          </div>
          <p className="regular-14 text-gray-30">This is a demo — no real reservation was made.</p>
          <button type="button" onClick={() => setState('idle')} className="btn_green w-full rounded-full border font-bold">Done</button>
        </div>
      </Modal>
    </div>
  );
}
