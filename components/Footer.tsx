import Link from 'next/link';
import { Phone, Mail, MessageCircle } from 'lucide-react';

// ─── data ─────────────────────────────────────────────────────────────────────

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

// Services layer — key editorial routes
const serviceLinks = [
  { name: 'Jolly Grant Airport Taxi',    href: '/services/jolly-grant-airport-taxi-service' },
  { name: 'Dehradun → Delhi',            href: '/services/dehradun-to-delhi-taxi-service' },
  { name: 'Haridwar → Kedarnath',        href: '/services/kedarnath-taxi-service' },
  { name: 'Dehradun → Mussoorie',        href: '/services/dehradun-to-mussoorie-taxi' },
  { name: 'Dehradun → Nainital',         href: '/services/nainital-taxi-service' },
  { name: 'Char Dham Yatra',             href: '/services/kedarnath-chardham-yatra' },
];

// Taxi programmatic layer — hub pages
const taxiHubLinks = [
  { name: 'Taxis from Delhi',       href: '/taxi/from/delhi' },
  { name: 'Taxis from Dehradun',    href: '/taxi/from/dehradun' },
  { name: 'Taxis from Rishikesh',   href: '/taxi/from/rishikesh' },
  { name: 'Taxis from Haridwar',    href: '/taxi/from/haridwar' },
  { name: 'All Routes',             href: '/taxi' },
];

// Keep legacy alias so existing JSX still compiles
const routeLinks = serviceLinks;

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
  { name: 'Why Choose Us', href: '/why-choose-us' },
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

// ─── component ────────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer
      className="bg-[#121212] text-white relative overflow-hidden border-t border-white/10"
      aria-label="Site footer"
    >
      {/* Ambient glows */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F7941D] opacity-[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-blue-500 opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-page mx-auto px-6 sm:px-8 lg:px-10 pt-14 pb-10">

        {/* ── MAIN GRID ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 mb-14">

          {/* BRAND BLOCK */}
          <div className="lg:col-span-2 flex flex-col gap-6 pr-0 lg:pr-12">

            {/* Wordmark + tagline */}
            <div>
              <h2 className="font-heading font-black text-2xl text-[#F7941D] uppercase tracking-tighter leading-none mb-3">
                Uttarakhand
                <br />
                Cab 24/7
              </h2>
              <p className="text-white/65 text-xs font-light leading-relaxed max-w-[220px]">
                Your premium travel partner in the Himalayas — local expertise, guaranteed reliability.
              </p>
            </div>

            {/* Contact */}
            <ul className="space-y-3" aria-label="Contact details">
              <li className="flex items-start gap-3">
                <Phone className="w-3.5 h-3.5 text-[#F7941D] mt-[2px] shrink-0" aria-hidden="true" />
                <div className="flex flex-col gap-1.5">
                  <a
                    href="tel:+919258912169"
                    className="text-white/80 text-xs font-semibold hover:text-[#F7941D] transition-colors py-2 inline-block min-h-[44px] flex items-center"
                  >
                    +91 92589 12169
                  </a>
                  <a
                    href="tel:+919675212169"
                    className="text-white/80 text-xs font-semibold hover:text-[#F7941D] transition-colors py-2 inline-block min-h-[44px] flex items-center"
                  >
                    +91 96752 12169
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-3.5 h-3.5 text-[#F7941D] shrink-0" aria-hidden="true" />
                <a
                  href="mailto:uttarakhandcab247@gmail.com"
                  className="text-white/65 text-xs hover:text-[#F7941D] transition-colors truncate"
                >
                  uttarakhandcab247@gmail.com
                </a>
              </li>
            </ul>

            {/* Compact WhatsApp CTA — single conversion point in the footer */}
            <a
              href="https://wa.me/919258912169"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2 w-fit
                px-5 py-2.5
                bg-[#F7941D] hover:bg-[#D97E10]
                text-white text-[10px] font-black uppercase tracking-widest
                rounded-xl transition-colors
              "
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              WhatsApp Booking
            </a>
          </div>

          {/* LINK COLUMNS */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-6 gap-8">

            {/* Fleet */}
            <nav aria-label="Fleet navigation">
              <h3 className="font-black uppercase tracking-widest text-[10px] mb-5 text-[#F7941D]/75">
                Fleet
              </h3>
              <ul className="space-y-3">
                {fleetLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-white/70 text-xs hover:text-white transition-colors py-1 inline-block"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Explore */}
            <nav aria-label="Explore navigation">
              <h3 className="font-black uppercase tracking-widest text-[10px] mb-5 text-[#F7941D]/75">
                Explore
              </h3>
              <ul className="space-y-3">
                {exploreLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-white/70 text-xs hover:text-white transition-colors py-1 inline-block"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Routes — Services layer */}
            <nav aria-label="Popular routes navigation">
              <h3 className="font-black uppercase tracking-widest text-[10px] mb-5 text-[#F7941D]/75">
                Routes
              </h3>
              <ul className="space-y-3">
                {serviceLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-white/70 text-xs hover:text-white transition-colors py-1 inline-block"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Taxi Hub Layer */}
            <nav aria-label="Taxi hubs navigation">
              <h3 className="font-black uppercase tracking-widest text-[10px] mb-5 text-[#F7941D]/75">
                Book by City
              </h3>
              <ul className="space-y-3">
                {taxiHubLinks.map((l) => (
                  <li key={l.name}>
                    <Link href={l.href} className="text-white/70 hover:text-white text-sm font-light transition-colors py-1 inline-block">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Destinations */}
            <nav aria-label="Destinations navigation">
              <h3 className="font-black uppercase tracking-widest text-[10px] mb-5 text-[#F7941D]/75">
                Destinations
              </h3>
              <ul className="space-y-3">
                {destinationLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-white/70 text-xs hover:text-white transition-colors py-1 inline-block"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Company */}
            <nav aria-label="Company navigation">
              <h3 className="font-black uppercase tracking-widest text-[10px] mb-5 text-[#F7941D]/75">
                Company
              </h3>
              <ul className="space-y-3">
                {companyLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-white/70 text-xs hover:text-white transition-colors py-1 inline-block"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

          </div>
        </div>

        {/* ── BOTTOM BAR ────────────────────────────────────────────────────── */}
        {/*
          Stack layout — always centered, no flex-row fighting on wrap:
            1. copyright text
            2. legal links (inline separators live inside each <li>
               so no orphaned pipe ever starts a new wrapped line)
        */}
        <div className="border-t border-white/10 pt-8 pb-1 flex flex-col items-center gap-4">

          {/* Copyright */}
          <p className="text-white/65 text-[10px] md:text-[11px] font-semibold tracking-wide text-center leading-relaxed">
            © {new Date().getFullYear()} Uttarakhand Cab 24/7
            <span className="mx-2 text-[#F7941D]/25" aria-hidden="true">•</span>
            Trusted Travel Partner
            
            <span className="mx-2 text-[#F7941D]/25" aria-hidden="true">•</span>
            Powered By The Local Experts
          </p>

          {/* Legal links */}
          <nav aria-label="Legal and policy links">
            <ul className="flex flex-wrap items-center justify-center max-w-2xl mx-auto">
              {legalLinks.map((link, i) => (
                <li key={link.href} className="flex items-center">
                  <Link
                    href={link.href}
                    className="
                      text-white/70 text-[10px] md:text-[11px]
                      font-black uppercase tracking-widest
                      hover:text-[#F7941D] transition-colors
                      px-4 py-3 inline-block
                    "
                  >
                    {link.label}
                  </Link>
                  {i < legalLinks.length - 1 && (
                    <span className="w-px h-3 bg-white/10 shrink-0" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ul>
          </nav>

        </div>
        {/* ── END BOTTOM BAR ────────────────────────────────────────────────── */}

      </div>
    </footer>
  );
}
