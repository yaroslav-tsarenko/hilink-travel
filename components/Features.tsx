import { FEATURES } from '@/constants';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from './ui/Reveal';

const Features = () => {
  return (
    <section className="flex-col flexCenter overflow-hidden bg-feature-bg bg-center bg-no-repeat py-24">
      <div className="max-container padding-container relative flex w-full justify-end">
        <div className="flex flex-1 lg:min-h-[900px]">
          <Image src="/phone.webp" alt="Hilink app on a phone" width={440} height={1000} className="feature-phone animate-float" />
        </div>

        <div className="z-20 flex w-full flex-col lg:w-[60%]">
          <div className="relative">
            <Image src="/camp.svg" alt="" width={50} height={50} className="absolute left-[-5px] top-[-28px] w-10 lg:w-[50px]" />
            <h2 className="bold-40 lg:bold-64">Our Features</h2>
          </div>
          <ul className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-20">
            {FEATURES.map((feature, i) => (
              <li key={feature.title}>
                <Reveal delay={(i % 2) * 0.1}>
                  <Link href={feature.href} className="group flex w-full flex-1 flex-col items-start">
                    <div className={`rounded-full p-4 transition duration-500 group-hover:rotate-[-10deg] group-hover:scale-110 lg:p-7 ${feature.variant === 'orange' ? 'bg-orange-50' : 'bg-green-50'}`}>
                      <Image src={feature.icon} alt="" width={28} height={28} />
                    </div>
                    <h3 className="bold-20 lg:bold-32 mt-5 flex items-start gap-2 capitalize transition group-hover:text-green-50">
                      {feature.title}
                      <ArrowUpRight className="mt-1 h-6 w-6 shrink-0 opacity-0 transition group-hover:opacity-100" />
                    </h3>
                    <p className="regular-16 mt-5 bg-white/80 text-gray-30 lg:mt-[30px] lg:bg-none">{feature.description}</p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Features;
