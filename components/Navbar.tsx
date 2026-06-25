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
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vehiclesOpen, setVehiclesOpen] = useState(false);
  const [mobileVehiclesOpen, setMobileVehiclesOpen] = useState(false);
  const vehiclesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isVehiclesActive = pathname?.startsWith('/fleet') ?? false;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
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
    setMobileMenuOpen(false);
    setVehiclesOpen(false);
    setMobileVehiclesOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'py-3 border-b border-white/[0.06]'
          : 'py-5 md:py-7'
      }`}
      style={
        scrolled
          ? {
              background: 'rgba(10,10,10,0.88)',
              backdropFilter: 'blur(22px)',
              WebkitBackdropFilter: 'blur(22px)',
              boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
            }
          : { background: 'transparent' }
      }
    >
      <div className="max-w-page mx-auto px-6 sm:px-8 lg:px-10 flex items-center justify-between gap-4">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div
            className="flex items-center justify-center rounded-xl transition-all duration-300 group-hover:shadow-[0_0_18px_rgba(247,148,29,0.35)]"
            style={{
              width: 38,
              height: 38,
              background: 'linear-gradient(135deg, #F7941D, #D97E10)',
              boxShadow: '0 0 14px rgba(247,148,29,0.3)',
              flexShrink: 0,
            }}
          >
            <Image
              src="/images/IMG_7580.png"
              alt="Uttarakhand Cab Logo"
              width={28}
              height={20}
              priority
              fetchPriority="high"
              className="w-auto object-contain"
              style={{ height: 22 }}
            />
          </div>
          <div className="flex flex-col">
            <div className="font-black text-sm xl:text-[15px] uppercase leading-none text-white tracking-tight">
              Uttarakhand Cab <span className="text-[#F7941D]">24/7</span>
            </div>
            <span className="text-[7px] xl:text-[8px] font-bold uppercase tracking-[0.2em] opacity-40 text-white mt-[3px]">
              Trusted Travel Partner
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden xl:flex items-center gap-7">
          {navLinks.map((link, i) => (
            <span key={link.href} className="contents">
              <Link
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
              {i === 1 && (
                <div ref={vehiclesRef} className="relative">
                  <button
                    onClick={() => setVehiclesOpen((v) => !v)}
                    className={`nav-link flex items-center gap-1 ${isVehiclesActive ? 'active' : ''}`}
                    aria-expanded={vehiclesOpen}
                    aria-haspopup="true"
                  >
                    Vehicles
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${vehiclesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {vehiclesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute top-full left-0 mt-4 w-52 rounded-2xl overflow-hidden py-2 z-[120]"
                        style={{
                          background: 'rgba(14,14,14,0.96)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255,255,255,0.09)',
                          boxShadow: '0 20px 48px rgba(0,0,0,0.5)',
                        }}
                      >
                        {vehicleLinks.map((v) => (
                          <Link
                            key={v.href}
                            href={v.href}
                            onClick={() => setVehiclesOpen(false)}
                            className={`block px-5 py-3 text-[11px] font-bold uppercase tracking-widest transition-all duration-150 ${
                              pathname === v.href
                                ? 'text-[#F7941D] bg-[#F7941D]/8'
                                : 'text-white/70 hover:text-[#F7941D] hover:bg-white/5'
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

        {/* DESKTOP CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+919258912169"
            className="btn-ghost px-5 py-2.5 text-[11px]"
          >
            Call Now
          </a>
          <a
            href="https://wa.me/919258912169"
            className="btn-primary px-5 py-2.5 text-[11px]"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>
        </div>

        {/* MOBILE TRIGGER */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-lg text-white transition-colors hover:bg-white/8"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu-panel"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 xl:hidden z-[105]"
            style={{
              background: 'rgba(10,10,10,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 20px 48px rgba(0,0,0,0.5)',
            }}
          >
            <div className="px-8 py-10 flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <span key={link.href} className="contents">
                  <Link
                    href={link.href}
                    className={`text-2xl font-black uppercase tracking-tighter transition-colors ${
                      pathname === link.href ? 'text-[#F7941D]' : 'text-white/90'
                    }`}
                  >
                    {link.label}
                  </Link>
                  {i === 1 && (
                    <div>
                      <button
                        onClick={() => setMobileVehiclesOpen((v) => !v)}
                        className={`flex items-center justify-between w-full text-2xl font-black uppercase tracking-tighter transition-colors ${
                          isVehiclesActive ? 'text-[#F7941D]' : 'text-white/90'
                        }`}
                        aria-expanded={mobileVehiclesOpen}
                      >
                        Vehicles
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${mobileVehiclesOpen ? 'rotate-180' : ''}`}
                        />
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
                            <div className="flex flex-col gap-4 pt-4 pl-4 border-l border-[#F7941D]/25 mt-2">
                              {vehicleLinks.map((v) => (
                                <Link
                                  key={v.href}
                                  href={v.href}
                                  className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                                    pathname === v.href ? 'text-[#F7941D]' : 'text-white/55'
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

              <div className="pt-6 flex flex-col gap-3 border-t border-white/[0.07] mt-2">
                <a
                  href="tel:+919258912169"
                  className="w-full text-center py-4 text-white font-black rounded-2xl uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <Phone size={16} /> Call Driver
                </a>
                <a
                  href="https://wa.me/919258912169"
                  className="w-full text-center py-4 text-white font-black rounded-2xl uppercase tracking-widest text-xs flex items-center justify-center gap-3"
                  style={{
                    background: 'linear-gradient(135deg, #F7941D, #D97E10)',
                    boxShadow: '0 0 24px rgba(247,148,29,0.3)',
                  }}
                >
                  <MessageCircle size={16} /> WhatsApp Booking
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
