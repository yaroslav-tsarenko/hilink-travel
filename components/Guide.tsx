'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Reveal from './ui/Reveal';

const Guide = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [minutes, setMinutes] = useState(48);

  useEffect(() => {
    if (!inView) return;
    const t = window.setInterval(() => setMinutes((m) => (m <= 12 ? 48 : m - 1)), 900);
    return () => window.clearInterval(t);
  }, [inView]);

  const progress = (48 - minutes) / 36;

  return (
    <section className="flexCenter flex-col">
      <div className="padding-container max-container w-full pb-24">
        <Image src="/camp.svg" alt="" width={50} height={50} />
        <p className="uppercase regular-18 -mt-1 mb-3 text-green-50">We are here for you</p>
        <div className="flex flex-wrap justify-between gap-5 lg:gap-10">
          <Reveal>
            <h2 className="bold-40 lg:bold-64 xl:max-w-[390px]">Guide You to Easy Path</h2>
          </Reveal>
          <Reveal delay={0.1} className="xl:max-w-[520px]">
            <p className="regular-16 text-gray-30">
              Only with the hilink application you will no longer get lost and get lost again, because we already support offline maps when there is no internet connection in the field. Invite your friends, relatives and friends to have fun in the wilderness through the valley and reach the top of the mountain
            </p>
            <Link href="/guides" className="mt-6 inline-flex items-center gap-2 font-bold text-green-50 transition hover:gap-3">
              Read our trail guides <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>

      <div ref={ref} className="flexCenter max-container relative w-full">
        <Image src="/boat.webp" alt="Kayak on a calm lake" width={1512} height={576} className="w-full object-cover object-center 2xl:rounded-5xl" />

        <motion.div
          className="absolute flex gap-3 rounded-3xl border bg-white py-8 pl-5 pr-7 shadow-md md:left-[5%] lg:top-20"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-4">
            <Image src="/meter.svg" alt="" width={16} height={158} className="h-full w-auto" />
            <motion.span className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-green-50 ring-4 ring-green-50/25" animate={{ top: `${8 + progress * 80}%` }} transition={{ duration: 0.8 }} />
          </div>
          <div className="flexBetween flex-col">
            <div className="flex w-full flex-col">
              <div className="flexBetween w-full gap-6">
                <p className="regular-16 text-gray-20">Destination</p>
                <p className="bold-16 tabular-nums text-green-50">{minutes} min</p>
              </div>
              <Link href="/camps/aguas-calientes" className="bold-20 mt-2 hover:text-green-50">Aguas Calientes</Link>
            </div>
            <div className="flex w-full flex-col">
              <p className="regular-16 text-gray-20">Start track</p>
              <h4 className="bold-20 mt-2 whitespace-nowrap">Wonorejo Pasuruan</h4>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Guide;
