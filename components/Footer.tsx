'use client';

import Link from 'next/link';
import { Phone, Mail, MessageCircle } from 'lucide-react';

const fleetLinks = [
  { name: 'All Vehicles',     href: '/fleet' },
  { name: 'Sedan',            href: '/fleet/sedan' },
  { name: 'Ertiga',           href: '/fleet/ertiga' },
  { name: 'Innova Crysta',    href: '/fleet/innova-crysta' },
  { name: 'Tempo Traveller',  href: '/fleet/tempo-traveller' },
  { name: 'Force Urbania',    href: '/fleet/force-urbania' },
];

const exploreLinks = [
  { name: 'Taxi Rates 2026', href: '/taxi-rates' },
  { name: 'Tour Packages',   href: '/tour-packages' },
  { name: 'Fleet Gallery',   href: '/gallery' },
  { name: 'Travel Blog',     href: '/blog' },
];

const serviceLinks = [
  { name: 'Jolly Grant Airport Taxi',    href: '/services/jolly-grant-airport-taxi-service' },
  { name: 'Dehradun → Delhi',            href: '/services/dehradun-to-delhi-taxi-service' },
  { name: 'Haridwar → Kedarnath',        href: '/haridwar-to-kedarnath' },
  { name: 'Dehradun → Mussoorie',        href: '/services/dehradun-to-mussoorie-taxi' },
  { name: 'Dehradun → Nainital',         href: '/services/nainital-taxi-service' },
  { name: 'Char Dham Yatra',             href: '/services/kedarnath-chardham-yatra' },
];

const taxiHubLinks = [
  { name: 'Taxis from Delhi',       href: '/taxi/from/delhi' },
  { name: 'Taxis from Dehradun',    href: '/taxi/from/dehradun' },
  { name: 'Taxis from Rishikesh',   href: '/taxi/from/rishikesh' },
  { name: 'Taxis from Haridwar',    href: '/taxi/from/haridwar' },
  { name: 'All Routes',             href: '/taxi' },
];

const destinationLinks = [
  { name: 'Dehradun City',     href: '/dehradun' },
  { name: 'Mussoorie',         href: '/mussoorie' },
  { name: 'Rishikesh',         href: '/rishikesh' },
  { name: 'Haridwar',          href: '/haridwar' },
  { name: 'Nainital',          href: '/nainital' },
  { name: 'Jim Corbett',       href: '/jim-corbett' },
  { name: 'Valley of Flowers', href: '/valley-of-flowers' },
  { name: 'Kedarnath Yatra',   href: '/kedarnath' },
  { name: 'Badrinath Yatra',   href: '/badrinath' },
  { name: 'Char Dham Yatra',   href: '/char-dham' },
];

const companyLinks = [
  { name: 'About Us',      href: '/about' },
  { name: 'Why Trust Us', href: '/why-trust-us' },
  { name: 'Travel Guide',  href: '/travel-guide' },
  { name: 'Contact Us',    href: '/contact' },
];

const legalLinks = [
  { label: 'Distance Guide',       href: '/distance-guide' },
  { label: 'Privacy Policy',       href: '/privacy-policy' },
  { label: 'Terms',                href: '/terms-of-service' },
  { label: 'Cancellation Policy',  href: '/cancellation-policy' },
  { label: 'Resources',            href: '/info' },
];

function FooterCol({ heading, links }: { heading: string; links: { name: string; href: string }[] }) {
  return (
    <nav aria-label={`${heading} navigation`}>
      <h3
        className="font-black uppercase text-[9px] tracking-[0.18em] mb-5"
        style={{ color: 'rgba(247,148,29,0.55)' }}
      >
        {heading}
      </h3>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-[13px] font-medium transition-colors duration-150"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.9)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)')}
            >
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      aria-label="Site footer"
      style={{
        background: '#060606',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none animate-blob-1"
        style={{
          width: 500,
          height: 400,
          background: 'radial-gradient(ellipse at center, rgba(247,148,29,0.10) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="absolute top-0 left-0 pointer-events-none animate-blob-2"
        style={{
          width: 350,
          height: 300,
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-page mx-auto px-6 sm:px-8 lg:px-10 pt-16 pb-10">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 mb-14">

          {/* BRAND BLOCK */}
          <div className="lg:col-span-2 flex flex-col gap-6 pr-0 lg:pr-10">
            <div>
              <h2
                className="font-heading font-black text-2xl uppercase tracking-tighter leading-none mb-3"
                style={{ color: '#F7941D' }}
              >
                Uttarakhand
                <br />
                Cab 24/7
              </h2>
              <p className="text-xs font-light leading-relaxed max-w-[220px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Your premium travel partner in the Himalayas — local expertise, guaranteed reliability.
              </p>
            </div>

            <ul className="space-y-3" aria-label="Contact details">
              <li className="flex items-start gap-3">
                <Phone className="w-3.5 h-3.5 mt-[3px] shrink-0" style={{ color: '#F7941D' }} aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+919258912169"
                    className="text-xs font-semibold transition-colors"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#F7941D')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.75)')}
                  >
                    +91 92589 12169
                  </a>
                  <a
                    href="tel:+919675212169"
                    className="text-xs font-semibold transition-colors"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#F7941D')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.75)')}
                  >
                    +91 96752 12169
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: '#F7941D' }} aria-hidden="true" />
                <a
                  href="mailto:uttarakhandcab247@gmail.com"
                  className="text-xs transition-colors truncate"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#F7941D')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.45)')}
                >
                  uttarakhandcab247@gmail.com
                </a>
              </li>
            </ul>

            <a
              href="https://wa.me/919258912169"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 w-fit px-5 py-2.5 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #F7941D, #D97E10)',
                boxShadow: '0 0 20px rgba(247,148,29,0.25)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 32px rgba(247,148,29,0.4)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 20px rgba(247,148,29,0.25)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              }}
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              WhatsApp Booking
            </a>
          </div>

          {/* LINK COLUMNS */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-6 gap-8">
            <FooterCol heading="Fleet" links={fleetLinks} />
            <FooterCol heading="Explore" links={exploreLinks} />
            <FooterCol heading="Routes" links={serviceLinks} />
            <FooterCol heading="Book by City" links={taxiHubLinks} />
            <FooterCol heading="Destinations" links={destinationLinks} />
            <FooterCol heading="Company" links={companyLinks} />
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="section-divider mb-8" />
        <div className="flex flex-col items-center gap-4">
          <p
            className="text-[10px] md:text-[11px] font-semibold tracking-wide text-center leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            © {new Date().getFullYear()} Uttarakhand Cab 24/7
            <span className="mx-2" style={{ color: 'rgba(247,148,29,0.2)' }} aria-hidden="true">•</span>
            Trusted Travel Partner
            <span className="mx-2" style={{ color: 'rgba(247,148,29,0.2)' }} aria-hidden="true">•</span>
            Powered By The Local Experts
          </p>

          <nav aria-label="Legal and policy links">
            <ul className="flex flex-wrap items-center justify-center max-w-2xl mx-auto">
              {legalLinks.map((link, i) => (
                <li key={link.href} className="flex items-center">
                  <Link
                    href={link.href}
                    className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest px-4 py-3 inline-block transition-colors duration-150"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#F7941D')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.35)')}
                  >
                    {link.label}
                  </Link>
                  {i < legalLinks.length - 1 && (
                    <span className="w-px h-3 shrink-0" style={{ background: 'rgba(255,255,255,0.08)' }} aria-hidden="true" />
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

      </div>
    </footer>
  );
}
