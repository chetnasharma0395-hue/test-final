'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, MessageCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/tour-packages', label: 'Packages' },
  { href: '/taxi-rates', label: 'Rates 2026' },
  { href: '/blog', label: 'Blog' },
  { href: '/taxi', label: 'Book Taxi' },
];

const vehicleLinks = [
  { href: '/fleet', label: 'All Vehicles' },
  { href: '/fleet/sedan', label: 'Sedan' },
  { href: '/fleet/ertiga', label: 'Ertiga' },
  { href: '/fleet/innova-crysta', label: 'Innova Crysta' },
  { href: '/fleet/tempo-traveller', label: 'Tempo Traveller' },
  { href: '/fleet/force-urbania', label: 'Force Urbania' },
];

export function Navbar() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vehiclesOpen, setVehiclesOpen] = useState(false);
  const [mobileVehiclesOpen, setMobileVehiclesOpen] = useState(false);
  const vehiclesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isVehiclesActive = pathname?.startsWith('/fleet') ?? false;

  useEffect(() => {
    const handleScroll = () => setIsNavVisible(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (vehiclesRef.current && !vehiclesRef.current.contains(event.target as Node)) {
        setVehiclesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileMenuOpen(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVehiclesOpen(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileVehiclesOpen(false);
  }, [pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      isNavVisible ? 'bg-[#121212]/95 backdrop-blur-md py-3 border-b border-white/5' : 'bg-transparent py-6 md:py-8'
    }`}>
      <div className="max-w-page mx-auto px-6 sm:px-8 lg:px-10 flex items-center justify-between gap-4">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image src="/images/IMG_7580.png" alt="Uttarakhand Cab Logo" width={70} height={50} priority fetchPriority="high" sizes="(max-width: 640px) 40px, (max-width: 1280px) 48px, 56px" className="h-10 sm:h-12 xl:h-14 w-auto object-contain" />
          <div className="flex flex-col">
            <div className="font-black text-sm xl:text-lg uppercase leading-none text-white">
              Uttarakhand Cab <span className="text-[#F7941D]">24/7</span>
            </div>
            <span className="text-[7px] xl:text-[9px] font-black uppercase tracking-[0.2em] opacity-60 text-white">Trusted Travel Partner</span>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden xl:flex items-center gap-6">
          {navLinks.map((link, i) => (
            <span key={link.href} className="contents">
              <Link href={link.href} className="text-[11px] font-black uppercase tracking-widest text-white hover:text-[#F7941D] transition-all relative group">
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#F7941D] transition-all ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
              {i === 1 && (
                <div ref={vehiclesRef} className="relative">
                  <button
                    onClick={() => setVehiclesOpen((v) => !v)}
                    className="flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-white hover:text-[#F7941D] transition-all relative group"
                    aria-expanded={vehiclesOpen}
                    aria-haspopup="true"
                  >
                    Vehicles
                    <ChevronDown className={`w-3 h-3 transition-transform ${vehiclesOpen ? 'rotate-180' : ''}`} />
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#F7941D] transition-all ${isVehiclesActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </button>
                  <AnimatePresence>
                    {vehiclesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute top-full left-0 mt-3 w-56 bg-[#1A1A1A] rounded-2xl shadow-2xl border border-white/10 overflow-hidden py-2 z-[120]"
                      >
                        {vehicleLinks.map((v) => (
                          <Link
                            key={v.href}
                            href={v.href}
                            onClick={() => setVehiclesOpen(false)}
                            className={`block px-5 py-3 text-xs font-black uppercase tracking-widest transition-colors ${
                              pathname === v.href ? 'text-[#F7941D] bg-[#F7941D]/5' : 'text-white/80 hover:text-[#F7941D] hover:bg-white/5'
                            }`}
                          >
                            {v.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+919258912169" className="px-5 py-2.5 rounded-xl font-black text-xs uppercase border-2 border-white/20 text-white hover:bg-white/5 hover:border-white/40 transition-all">Call Now</a>
          <a href="https://wa.me/919258912169" className="px-5 py-2.5 bg-[#F7941D] text-white rounded-xl font-black text-xs uppercase shadow-lg hover:bg-[#D97E10] transition-all">WhatsApp</a>
        </div>

        {/* MOBILE TRIGGER */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-lg text-white transition-colors"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu-panel"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-panel"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 bg-[#121212] border-t border-white/10 shadow-2xl xl:hidden z-[105]"
          >
            <div className="px-8 py-10 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <span key={link.href} className="contents">
                  <Link
                    href={link.href}
                    className={`text-2xl font-black uppercase tracking-tighter transition-colors ${
                      pathname === link.href ? 'text-[#F7941D]' : 'text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                  {i === 1 && (
                    <div>
                      <button
                        onClick={() => setMobileVehiclesOpen((v) => !v)}
                        className={`flex items-center justify-between w-full text-2xl font-black uppercase tracking-tighter transition-colors ${
                          isVehiclesActive ? 'text-[#F7941D]' : 'text-white'
                        }`}
                        aria-expanded={mobileVehiclesOpen}
                      >
                        Vehicles
                        <ChevronDown className={`w-5 h-5 transition-transform ${mobileVehiclesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileVehiclesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-4 pt-4 pl-4 border-l-2 border-[#F7941D]/20">
                              {vehicleLinks.map((v) => (
                                <Link
                                  key={v.href}
                                  href={v.href}
                                  className={`text-base font-bold uppercase tracking-wide transition-colors ${
                                    pathname === v.href ? 'text-[#F7941D]' : 'text-white/70'
                                  }`}
                                >
                                  {v.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </span>
              ))}
              <div className="pt-6 flex flex-col gap-4">
                <a href="tel:+919258912169" className="w-full text-center py-5 bg-[#1A1A1A] border border-white/10 text-white font-black rounded-2xl uppercase tracking-widest text-xs flex items-center justify-center gap-3">
                  <Phone size={18} /> Call Driver
                </a>
                <a href="https://wa.me/919258912169" className="w-full text-center py-5 bg-[#F7941D] text-white font-black rounded-2xl uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl">
                  <MessageCircle size={18} /> WhatsApp Booking
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
