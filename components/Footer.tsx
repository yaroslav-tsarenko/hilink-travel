import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Newsletter from './Newsletter';

const Footer = () => {
  return (
    <footer className="flexCenter mb-16 mt-10">
      <div className="padding-container max-container flex w-full flex-col gap-14">
        <Newsletter />
        <div className="flex flex-col items-start justify-center gap-[8%] md:flex-row">
          <Link href="/" className="mb-10" aria-label="Hilink home">
            <Image src="/hilink-logo.svg" alt="Hilink" width={74} height={29} />
          </Link>

          <div className="flex flex-wrap gap-10 sm:justify-between md:flex-1">
            {FOOTER_LINKS.map((column) => (
              <FooterColumn title={column.title} key={column.title}>
                <ul className="regular-14 flex flex-col gap-4 text-gray-30">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="transition hover:text-green-50">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            ))}

            <FooterColumn title={FOOTER_CONTACT_INFO.title}>
              {FOOTER_CONTACT_INFO.links.map((link) => (
                <a href={link.href} key={link.label} className="regular-14 flex gap-4 text-gray-30 md:flex-col lg:flex-row">
                  <span className="whitespace-nowrap">{link.label}:</span>
                  <span className="medium-14 whitespace-nowrap text-blue-70 hover:text-green-50">{link.value}</span>
                </a>
              ))}
            </FooterColumn>

            <FooterColumn title={SOCIALS.title}>
              <ul className="flex gap-4">
                {SOCIALS.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} aria-label={link.label} className="block transition hover:-translate-y-1" {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      <Image src={link.icon} alt="" width={24} height={24} />
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </div>
        </div>

        <div className="border bg-gray-20" />
        <div className="regular-14 flex flex-col items-center justify-between gap-3 text-gray-30 sm:flex-row">
          <p>{new Date().getFullYear()} Hilink | All rights reserved</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-green-50">Privacy</Link>
            <Link href="/terms" className="hover:text-green-50">Terms</Link>
            <Link href="/contact" className="hover:text-green-50">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="flex flex-col gap-5">
    <h4 className="bold-18 whitespace-nowrap">{title}</h4>
    {children}
  </div>
);

export default Footer;
