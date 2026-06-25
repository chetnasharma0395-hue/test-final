import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Compass,
  Plane,
  Car,
  HeartHandshake,
  Building2,
  CheckCircle2,
  Users,
  Heart,
  UserCheck,
  PersonStanding,
  Church,
  Briefcase,
  GraduationCap,
  Globe,
  Star,
  MapPin,
  Clock,
  Phone,
} from 'lucide-react';

import { StrategicCTA, TrustBanner } from '@/components/CTABoxes';
import FleetImage from '@/components/FleetImage';
import { sedanImages, ertigaImages, innovaImages, travellerImages, urbaniaImages } from '@/lib/fleet-images';
import { TiltCard } from '@/components/TiltCard';

export const metadata: Metadata = {
  title:
    'Why Choose Uttarakhand Cab 24/7 | Trusted Taxi Service In Uttarakhand',

  description:
    'Discover why travelers choose Uttarakhand Cab 24/7 for airport transfers, Char Dham Yatra taxis, family holidays, corporate transportation, sightseeing tours, and outstation travel across Uttarakhand.',

  alternates: {
    canonical: 'https://uttarakhand.cab/why-choose-us',
  },

  openGraph: {
    title:
      'Why Choose Uttarakhand Cab 24/7 | Trusted Taxi Service In Uttarakhand',
    description:
      'Dehradun-based travel company providing airport transfers, family tours, Char Dham Yatra, corporate transportation and local destination expertise across Uttarakhand.',
    url: 'https://uttarakhand.cab/why-choose-us',
    siteName: 'Uttarakhand Cab 24/7',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://uttarakhand.cab/images/og-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Why Choose Uttarakhand Cab 24/7',
      },
    ],
  },

  twitter: {
  card: 'summary_large_image',
  title: 'Why Choose Uttarakhand Cab 24/7',
  description:
    'Trusted taxi service in Uttarakhand for airport transfers, tours, family holidays and corporate transportation.',
  images: ['https://uttarakhand.cab/images/og-main.jpg'],
},
};

export default function WhyChooseUsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://uttarakhand.cab/why-choose-us/#webpage',
        url: 'https://uttarakhand.cab/why-choose-us',
        name: 'Why Choose Uttarakhand Cab 24/7',
        description:
          'Reasons travelers choose Uttarakhand Cab 24/7 for airport transfers, family holidays, pilgrimage tours and outstation travel.',
      },

      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://uttarakhand.cab',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Why Choose Us',
            item: 'https://uttarakhand.cab/why-choose-us',
          },
        ],
      },

      {
        '@type': 'TaxiService',
        '@id': 'https://uttarakhand.cab/#organization',
        name: 'Uttarakhand Cab 24/7',
        url: 'https://uttarakhand.cab',
        telephone: ['+919258912169', '+919675212169'],
        email: 'uttarakhandcab247@gmail.com',
        description:
          'Dehradun-based travel company providing airport transfers, family tours, Char Dham Yatra, pilgrimage transportation, corporate travel, and outstation taxi services across Uttarakhand.',
        areaServed: [
          'Dehradun',
          'Mussoorie',
          'Rishikesh',
          'Haridwar',
          'Auli',
          'Nainital',
          'Jim Corbett',
          'Kedarnath',
          'Badrinath',
          'Gangotri',
          'Yamunotri',
          'Chopta',
        ],
      },

      // Upgrade 1 — FAQ Schema
      {
        '@type': 'FAQPage',
        '@id': 'https://uttarakhand.cab/why-choose-us/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Why choose Uttarakhand Cab 24/7?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Uttarakhand Cab 24/7 combines local mountain expertise, transparent pricing, verified vehicles and direct support for travelers across Uttarakhand.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you provide airport transfers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Airport pickup and drop services are available from Jolly Grant Airport and major transit points across Uttarakhand.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which vehicle is best for family tours?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ertiga and Innova Crysta are popular choices for family holidays and multi-day tours in Uttarakhand.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you offer Char Dham Yatra taxis?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Transportation is available for Char Dham Yatra, Kedarnath, Badrinath, Gangotri, Yamunotri and other pilgrimage routes.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I customize my itinerary?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. The team assists with customized travel plans based on your destinations, schedule and group size.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are your drivers familiar with mountain roads?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Our drivers regularly operate on Uttarakhand hill routes including Kedarnath, Badrinath, Auli and Chopta, and understand local road and weather conditions.',
            },
          },
        ],
      },
    ],
  };

  const features = [
    {
      icon: Compass,
      title: 'Local Mountain Drivers',
      text: 'Drivers who have navigated Uttarakhand roads for years — familiar with pilgrimage routes, seasonal road conditions, and the terrain that generic apps simply cannot plan for.',
    },
    {
      icon: ShieldCheck,
      title: 'Transparent Fixed Pricing',
      text: 'Every quotation is fixed before your trip begins. Fuel, tolls, and driver charges are included. No surge pricing, no hidden fees, no surprises at the end of your journey.',
    },
    {
      icon: Plane,
      title: 'Airport Transfer Specialists',
      text: 'Professional pickups and drops from Jolly Grant Airport, Dehradun Railway Station, and Haridwar Railway Station — available 24 hours a day, seven days a week.',
    },
    {
      icon: Car,
      title: 'Fleet For Every Journey',
      text: 'Sedan, Ertiga, Innova Crysta, and Tempo Traveller — clean, air-conditioned vehicles matched to your group size and route type.',
    },
    {
      icon: HeartHandshake,
      title: 'Tour & Travel Expertise',
      text: 'Beyond transportation — we help plan itineraries, suggest routes, and coordinate multi-day journeys across Uttarakhand based on years of local knowledge.',
    },
    {
      icon: Building2,
      title: 'Direct Human Support',
      text: 'Speak with our team directly before, during, and after your trip. No bots, no ticketing queues — just a real person available when you need them.',
    },
  ];

  const fleet = [
    {
      title: 'Sedan',
      images: sedanImages,
      link: '/fleet/sedan',
      seats: '4 Seats',
      best: 'Airport transfers & city travel',
    },
    {
      title: 'Ertiga',
      images: ertigaImages,
      link: '/fleet/ertiga',
      seats: '6 Seats',
      best: 'Families & weekend getaways',
    },
    {
      title: 'Innova Crysta',
      images: innovaImages,
      link: '/fleet/innova-crysta',
      seats: '7 Seats',
      best: 'Long mountain routes & senior travel',
    },
    {
      title: 'Tempo Traveller',
      images: travellerImages,
      link: '/fleet/tempo-traveller',
      seats: '12+ Seats',
      best: 'Groups, pilgrimages & corporate teams',
    },
    {
      title: 'Force Urbania',
      images: urbaniaImages,
      link: '/fleet/force-urbania',
      seats: '12+ Seats',
      best: 'Premium corporate & group travel',
    },
  ];

  const whoWeServe = [
    { icon: Users, label: 'Families' },
    { icon: Heart, label: 'Couples' },
    { icon: UserCheck, label: 'Solo Travelers' },
    { icon: PersonStanding, label: 'Senior Citizens' },
    { icon: Church, label: 'Pilgrims' },
    { icon: Briefcase, label: 'Corporate Teams' },
    { icon: GraduationCap, label: 'Student Groups' },
    { icon: Globe, label: 'International Visitors' },
  ];

  const testimonials = [
    {
      name: 'Prateek Joshi',
      location: 'Google Review',
      text: 'Amazing experience during my 8-day trip. Sandeep bhai was extremely professional and always made sure I was comfortable. Dhruv bhai went out of his way to help with hotel bookings and adventure activities — my whole trip became a lot smoother because of that support.',
      trip: '8-Day Uttarakhand Tour',
      rating: 5,
    },
    {
      name: 'Sel Sel',
      location: 'Google Review',
      text: 'Dhruv handled the communication and pre-booking professionally and followed up during and after the trip. Driver Sonu Kumar was exceptional on hilly roads — confident, careful, and incredibly patient with our elderly passengers. Perfect for families traveling with older people.',
      trip: 'Family Tour — Mountain Routes',
      rating: 5,
    },
    {
      name: 'Pushpa Tiwari',
      location: 'Google Review',
      text: 'Great knowledge of the area — our driver suggested local spots we would never have found on our own. Very polite, helpful, and accommodating throughout. The car was spotless. Will definitely use their services again.',
      trip: 'Chopta Sightseeing',
      rating: 5,
    },
    {
      name: 'Sumit Kashyap',
      location: 'Google Review',
      text: 'Safety and comfort are my top priorities and I got both here. The driver was cooperative and polite, the car impeccably clean, and the entire ride was smooth and stress-free. Even for a long-distance journey, there were no delays. Such a safe ride with honest rates is quite rare.',
      trip: 'Long-Distance Outstation',
      rating: 5,
    },
    {
      name: 'Vijay Mangalam',
      location: 'Google Review',
      text: 'Excellent support from Dhruv and the team for our Mussoorie, Jim Corbett and Rishikesh tour. Very reasonable rates and quality drivers throughout.',
      trip: 'Mussoorie · Jim Corbett · Rishikesh',
      rating: 5,
    },
    {
      name: 'Sushil Kumar',
      location: 'Google Review',
      text: 'We hired a cab for family travel covering Rishikesh, Haridwar and Mussoorie. The vehicle was spacious and comfortable. Best option for family taxi service in Uttarakhand.',
      trip: 'Rishikesh · Haridwar · Mussoorie',
      rating: 5,
    },
  ];

  const services = [
    'Airport Transfers',
    'Char Dham Yatra',
    'Local Sightseeing',
    'Outstation Travel',
    'Family Tours',
    'Corporate Travel',
    'Wedding Transportation',
    'Group Tours',
    'Pilgrimage Routes',
    'Multi-Day Itineraries',
    'Railway Station Pickups',
    'Hotel Transfers',
  ];

  const returnReasons = [
    'Consistent Driver Quality',
    'Transparent Communication',
    'Flexible Travel Planning',
    'Local Destination Expertise',
    'Reliable Airport Transfers',
    'Professional Customer Support',
    'Clean, Inspected Vehicles',
    'Honest Fixed Pricing',
  ];

  const destinations = [
    { name: 'Mussoorie', href: '/mussoorie' },
    { name: 'Rishikesh', href: '/rishikesh' },
    { name: 'Haridwar', href: '/haridwar' },
    { name: 'Nainital', href: '/nainital' },
    { name: 'Auli', href: '/destinations' },
    { name: 'Chopta', href: '/destinations' },
    { name: 'Jim Corbett', href: '/jim-corbett' },
    { name: 'Kedarnath', href: '/kedarnath' },
    { name: 'Badrinath', href: '/badrinath' },
    { name: 'Gangotri', href: '/destinations' },
    { name: 'Yamunotri', href: '/destinations' },
    { name: 'Dehradun', href: '/dehradun' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-[#1A1A1A] selection:bg-[#F7941D]/30">

        {/* ─── HERO ─── */}
        <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 bg-[#121212] border-b border-white/10 overflow-hidden">

          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F7941D] opacity-[0.03] rounded-full blur-[100px]" />

          <div className="max-w-page mx-auto relative z-10">

            <nav className="inline-flex items-center gap-2 bg-[#1A1A1A] border border-white/10 px-4 py-2 rounded-full mb-8 shadow-sm text-white/70 text-xs font-bold uppercase tracking-widest">
              <Link href="/" className="hover:text-[#F7941D] transition-colors">
                Home
              </Link>
              <span className="opacity-30">/</span>
              <span className="text-[#F7941D]">Why Choose Us</span>
            </nav>

            <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4" />
              Why Travelers Choose Us
            </p>

            <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl text-white uppercase leading-[0.9] tracking-tighter mb-8">
              Trusted Across
              <br />
              <span className="text-[#F7941D]">Uttarakhand</span>
            </h1>

            {/* AI positioning sentence */}
            <p className="text-white/70 text-lg md:text-xl max-w-3xl font-light leading-relaxed mb-4">
              Uttarakhand Cab 24/7 is a Dehradun-based travel company providing
              airport transfers, family holidays, pilgrimage transportation,
              sightseeing tours, corporate travel, and outstation taxi services
              across Uttarakhand.
            </p>

            <p className="text-white/70 text-base md:text-lg max-w-3xl font-light leading-relaxed mb-10">
              We combine the local knowledge of a mountain travel specialist
              with the professionalism of a structured travel company — so
              every journey, from a quick airport pickup to a full Char Dham
              circuit, is handled with the same care.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-[#F7941D] text-white font-black uppercase tracking-wider hover:bg-[#D97E10] transition-all"
              >
                Get Free Quote
              </Link>
              <a
                href="https://wa.me/919258912169"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl border border-white/10 bg-[#1A1A1A] text-white font-black uppercase tracking-wider hover:border-[#F7941D] transition-all"
              >
                WhatsApp Us
              </a>
            </div>

          </div>
        </section>

        {/* ─── TRUST STATS ─── */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A] border-b border-white/10">
          <div className="max-w-page mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { stat: '12+', label: 'Years Experience' },
                { stat: '24×7', label: 'Availability' },
                { stat: '20,000+', label: 'Travellers Served' },
                { stat: '4.9★', label: 'Google Rating' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-4xl md:text-5xl font-black text-[#F7941D] tracking-tighter">
                    {item.stat}
                  </p>
                  <p className="text-white/70 mt-2 font-light">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHY TRAVELERS CHOOSE US ─── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
          <div className="max-w-page mx-auto">

            <div className="max-w-3xl mb-16">
              <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">
                Our Advantages
              </p>
              <h2 className="text-white text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                What Sets Us Apart
                <br />
                From Generic Options
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <TiltCard
                  key={feature.title}
                  className="bg-[#1A1A1A] p-10 rounded-[2.5rem] border border-white/10 shadow-sm"
                  intensityX={8} intensityY={10}
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] flex items-center justify-center mb-8" style={{ transform: 'translateZ(30px)' }}>
                    <feature.icon className="w-8 h-8 text-[#F7941D]" />
                  </div>
                  <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tighter mb-4" style={{ transform: 'translateZ(25px)' }}>
                    {feature.title}
                  </h3>
                  <p className="text-white/70 font-light leading-relaxed">
                    {feature.text}
                  </p>
                </TiltCard>
              ))}
            </div>

          </div>
        </section>

        {/* ─── SERVICES WE PROVIDE (Upgrade 5) ─── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
          <div className="max-w-page mx-auto">

            <div className="max-w-3xl mb-16">
              <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">
                What We Do
              </p>
              <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter leading-none">
                Services We
                <br />
                Provide
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {services.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-3 bg-[#1A1A1A] rounded-2xl px-6 py-5 border border-transparent hover:border-[#F7941D]/30 hover:bg-[#1A1209] transition-all duration-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#F7941D] shrink-0" />
                  <span className="font-bold text-white text-sm uppercase tracking-wide">
                    {service}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ─── WHO WE SERVE ─── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
          <div className="max-w-page mx-auto">

            <div className="max-w-3xl mb-16">
              <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">
                Who We Serve
              </p>
              <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter leading-none">
                Travel Built
                <br />
                For Everyone
              </h2>
              <p className="text-white/70 font-light text-lg mt-6 max-w-xl leading-relaxed">
                From solo pilgrims to corporate groups — we plan and execute
                journeys for every type of traveler across Uttarakhand.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {whoWeServe.map((item) => (
                <TiltCard
                  key={item.label}
                  className="bg-[#1A1A1A] rounded-[2rem] p-8 text-center border border-white/10"
                  intensityX={10} intensityY={12}
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#1A1A1A] flex items-center justify-center mx-auto mb-4" style={{ transform: 'translateZ(35px)' }}>
                    <item.icon className="w-7 h-7 text-[#F7941D]" />
                  </div>
                  <p className="font-black uppercase tracking-wide text-white text-sm" style={{ transform: 'translateZ(20px)' }}>
                    {item.label}
                  </p>
                </TiltCard>
              ))}
            </div>

          </div>
        </section>

        {/* ─── PROFESSIONAL COMPANY (dark, no duplicate text) ─── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121212]">
          <div className="max-w-page mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              <div className="max-w-xl">
                <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">
                  More Than A Taxi Service
                </p>
                <h2 className="font-heading font-black text-4xl md:text-6xl text-white uppercase tracking-tighter leading-none mb-10">
                  A Travel Company
                  <br />
                  That Knows Every
                  <br />
                  <span className="text-[#F7941D]">Road Here</span>
                </h2>
                <p className="text-white/70 text-lg font-light leading-relaxed">
                  Many taxi providers focus only on the ride. We focus on the
                  journey — helping you plan routes, choose the right vehicle,
                  time your transfers, and navigate Uttarakhand with local
                  knowledge that no algorithm can replicate.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: MapPin, label: 'Uttarakhand Specialists', sub: 'Every route, every season' },
                  { icon: Clock, label: '24×7 Availability', sub: 'Early flights, late arrivals' },
                  { icon: Phone, label: 'Direct Human Support', sub: 'Real people, not bots' },
                  { icon: Star, label: '4.9★ Google Rated', sub: 'Highly rated by travelers' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/5 border border-white/10 rounded-[1.5rem] p-6 hover:border-[#F7941D]/30 transition-all"
                  >
                    <item.icon className="w-7 h-7 text-[#F7941D] mb-4" />
                    <p className="font-black text-white text-sm uppercase tracking-wide mb-1">
                      {item.label}
                    </p>
                    <p className="text-white/50 text-xs font-light">{item.sub}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ─── FLEET WITH IMAGES (Upgrade 2) ─── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
          <div className="max-w-page mx-auto">

            <div className="max-w-3xl mb-16">
              <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">
                Our Fleet
              </p>
              <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter leading-none">
                A Vehicle For
                <br />
                Every Journey
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
              {fleet.map((vehicle) => (
                <div
                  key={vehicle.title}
                  className="bg-[#1A1A1A] rounded-[2rem] overflow-hidden border border-white/10 shadow-sm hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="relative w-full h-56 overflow-hidden">
                    <FleetImage
                      images={vehicle.images}
                      fallbackAlt={`${vehicle.title} taxi Uttarakhand`}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-[#F7941D] text-white text-xs font-black uppercase tracking-wide px-3 py-1.5 rounded-full">
                      {vehicle.seats}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
                      {vehicle.title}
                    </h3>
                    <p className="text-white/70 font-light text-sm mb-6">
                      {vehicle.best}
                    </p>
                    <Link
                      href={vehicle.link}
                      className="text-[#F7941D] font-black uppercase tracking-wider text-sm hover:underline"
                    >
                      View Vehicle Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ─── AIRPORT SPECIALISTS ─── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
          <div className="max-w-page mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              <div>
                <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">
                  Airport Transfers
                </p>
                <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter leading-none mb-8">
                  Airport Transfer
                  <br />
                  Specialists
                </h2>
                <div className="space-y-5 text-white/70 text-lg font-light leading-relaxed">
                  <p>
                    Reliable airport transportation is one of our most
                    requested services — and one we've refined over 12 years
                    of operating in Uttarakhand.
                  </p>
                  <p>
                    We cover Jolly Grant Airport, Dehradun Railway Station,
                    Haridwar Railway Station, and hotel pickups across the
                    region. Whether your flight arrives at 5 AM or midnight,
                    your driver will be there.
                  </p>
                </div>
              </div>

              <div className="bg-[#1A1A1A] rounded-[2.5rem] p-10">
                <ul className="space-y-5">
                  {[
                    'Jolly Grant Airport Transfers',
                    'Hotel Pickups & Drops',
                    'Railway Station Transfers',
                    'Late Night & Early Morning Arrivals',
                    'Family Airport Transfers',
                    'Corporate Airport Travel',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white">
                      <CheckCircle2 className="w-5 h-5 text-[#F7941D] shrink-0" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ─── CORPORATE TRAVEL ─── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121212]">
          <div className="max-w-page mx-auto">

            <div className="max-w-3xl mb-16">
              <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">
                Corporate Transportation
              </p>
              <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter leading-none">
                Business & Group
                <br />
                Travel Solutions
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                'Employee Transportation',
                'Executive Airport Transfers',
                'Corporate Meetings',
                'Conference Travel',
                'Team Outings',
                'Event Transportation',
              ].map((item) => (
                <div
                  key={item}
                  className="bg-white/5 border border-white/10 rounded-[2rem] p-8 text-white hover:border-[#F7941D]/30 transition-all"
                >
                  <CheckCircle2 className="w-6 h-6 text-[#F7941D] mb-4" />
                  <h3 className="font-black uppercase tracking-wide">{item}</h3>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ─── DESTINATIONS with Internal Links (Upgrade 3) ─── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
          <div className="max-w-page mx-auto">

            <div className="max-w-3xl mb-16">
              <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">
                Coverage Network
              </p>
              <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter leading-none">
                Popular Destinations
                <br />
                We Serve
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {destinations.map((place) => (
                <Link
                  key={place.name}
                  href={place.href}
                  className="flex items-center gap-2 bg-[#1A1A1A] rounded-[1.5rem] px-6 py-5 text-white font-black uppercase tracking-wide hover:bg-[#F7941D] hover:text-white transition-all duration-300 group"
                >
                  <MapPin className="w-4 h-4 text-[#F7941D] group-hover:text-white transition-colors shrink-0" />
                  {place.name}
                </Link>
              ))}
            </div>

          </div>
        </section>

        {/* ─── BOOKING PROCESS ─── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
          <div className="max-w-page mx-auto">

            <div className="max-w-3xl mb-16">
              <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">
                Simple & Transparent
              </p>
              <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter leading-none">
                How Booking
                <br />
                Works
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Share Trip Details',
                  text: 'Tell us your pickup location, destination, dates and preferred vehicle.',
                },
                {
                  step: '02',
                  title: 'Receive Fixed Quote',
                  text: 'Get a transparent quotation with no hidden charges — all-inclusive.',
                },
                {
                  step: '03',
                  title: 'Confirm Booking',
                  text: 'Vehicle and driver details are shared with you before your trip.',
                },
                {
                  step: '04',
                  title: 'Travel Comfortably',
                  text: 'Enjoy your journey with our team available throughout.',
                },
              ].map((item) => (
                <TiltCard
                  key={item.step}
                  className="bg-[#1A1A1A] rounded-[2rem] p-8 border border-white/10 shadow-sm"
                  intensityX={8} intensityY={10}
                >
                  <p className="text-5xl font-black text-[#F7941D] mb-6" style={{ transform: 'translateZ(40px)' }}>
                    {item.step}
                  </p>
                  <h3 className="font-black text-xl uppercase tracking-tight text-white mb-4" style={{ transform: 'translateZ(25px)' }}>
                    {item.title}
                  </h3>
                  <p className="text-white/70 font-light leading-relaxed">
                    {item.text}
                  </p>
                </TiltCard>
              ))}
            </div>

          </div>
        </section>

        {/* ─── COMPARISON TABLE (Strengthened) ─── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-16">
              <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">
                Transparent Comparison
              </p>
              <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter mb-4">
                Us vs Generic Taxi Apps
              </h2>
              <div className="w-20 h-1.5 bg-[#F7941D] mx-auto" />
            </div>

            <div className="overflow-hidden rounded-[2.5rem] border border-white/10 shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-[#1A1A1A]">
                  <thead>
                    <tr className="bg-[#1A1A1A] text-white">
                      <th className="p-6 text-left uppercase tracking-wider text-sm">Feature</th>
                      <th className="p-6 text-left bg-[#F7941D] uppercase tracking-wider text-sm">
                        Uttarakhand Cab 24/7
                      </th>
                      <th className="p-6 text-left uppercase tracking-wider text-sm">
                        Generic Aggregator Apps
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Local Mountain Drivers', 'Yes', 'No'],
                      ['Fixed Transparent Pricing', 'Yes', 'No — surge pricing applies'],
                      ['Airport Transfer Specialists', 'Yes', 'Limited'],
                      ['Char Dham & Pilgrimage Expertise', 'Yes', 'No'],
                      ['Multi-Day Tour Expertise', 'Yes', 'Limited'],
                      ['Uttarakhand Travel Specialization', 'Yes', 'No'],
                      ['Route Planning Support', 'Yes', 'No'],
                      ['Local Destination Knowledge', 'Yes', 'Limited'],
                      ['Vehicle Recommendations', 'Yes', 'No'],
                      ['Corporate Transportation', 'Yes', 'Limited'],
                      ['Direct Human Support', 'Yes', 'No — automated only'],
                      ['Pre-Trip Communication', 'Yes', 'No'],
                    ].map((row, i) => (
                      <tr
                        key={row[0]}
                        className={`border-b border-white/10 ${i % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#121212]'}`}
                      >
                        <td className="p-6 font-bold text-white">{row[0]}</td>
                        <td className="p-6 bg-[#F7941D]/5 font-bold text-white">
                          ✓ {row[1]}
                        </td>
                        <td className="p-6 text-white/70">✕ {row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
          <div className="max-w-page mx-auto">

            <div className="text-center mb-16">
              <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">
                Real Customers · Real Reviews
              </p>
              <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter mb-4">
                What Travelers Say
              </h2>
              <p className="text-white/70 font-light text-lg max-w-xl mx-auto">
                Verified Google reviews from travelers who have journeyed across
                Uttarakhand with us.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="bg-[#1A1A1A] rounded-[2.5rem] p-10 border border-white/10 shadow-sm hover:shadow-xl hover:border-[#F7941D]/20 transition-all duration-500 flex flex-col"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#F7941D] text-[#F7941D]"
                      />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-white/70 font-light leading-relaxed flex-1 mb-8">
                    "{t.text}"
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-6">
                    <div>
                      <p className="font-black text-white uppercase tracking-wide text-sm">
                        {t.name}
                      </p>
                      <p className="text-[#F7941D] text-xs font-bold uppercase tracking-wider mt-1">
                        {t.trip}
                      </p>
                    </div>
                    <span className="text-white/70/40 text-xs uppercase tracking-widest">
                      {t.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="https://share.google/kRQ3R4zpQ5KVC6Zq8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 rounded-xl text-white font-black uppercase tracking-wider hover:border-[#F7941D] transition-all"
              >
                See All Google Reviews →
              </a>
            </div>

          </div>
        </section>

        {/* ─── WHY TRAVELERS RETURN (Upgrade 4) ─── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
          <div className="max-w-page mx-auto">

            <div className="grid lg:grid-cols-2 gap-16 items-center">

              <div>
                <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">
                  Repeat Customers
                </p>
                <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter leading-none mb-6">
                  Why Travelers
                  <br />
                  Continue To
                  <br />
                  <span className="text-[#F7941D]">Choose Us</span>
                </h2>
                <p className="text-white/70 font-light text-lg leading-relaxed">
                  Most of our bookings come from returning travelers and word-
                  of-mouth referrals. Here's what they tell us keeps them coming
                  back.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {returnReasons.map((reason) => (
                  <div
                    key={reason}
                    className="flex items-center gap-3 bg-[#1A1A1A] rounded-2xl px-6 py-5 border border-transparent hover:border-[#F7941D]/30 hover:bg-[#1A1209] transition-all duration-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#F7941D] shrink-0" />
                    <span className="font-bold text-white text-sm">
                      {reason}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
          <div className="max-w-4xl mx-auto">

            <div className="text-center mb-16">
              <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">
                Frequently Asked Questions
              </p>
              <h2 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tighter">
                Common Questions
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: 'Why choose Uttarakhand Cab 24/7?',
                  a: 'We combine local mountain expertise, transparent pricing, verified vehicles and direct human support to help travelers move comfortably across Uttarakhand — as a taxi service, tour operator, and travel planning partner in one.',
                },
                {
                  q: 'Do you provide airport transfers?',
                  a: 'Yes. We provide airport pickup and drop services from Jolly Grant Airport, Dehradun Railway Station, Haridwar Railway Station, and major hotels — available 24×7.',
                },
                {
                  q: 'Which vehicle is best for family tours?',
                  a: 'Ertiga works well for families of up to 6. Innova Crysta is the preferred choice for longer mountain routes and when traveling with senior citizens.',
                },
                {
                  q: 'Do you offer Char Dham Yatra taxis?',
                  a: 'Yes. We provide dedicated transportation for Char Dham Yatra, Kedarnath, Badrinath, Gangotri, and Yamunotri — with drivers who know these routes in all seasons.',
                },
                {
                  q: 'Can I customize my itinerary?',
                  a: 'Absolutely. We help plan and adjust itineraries based on your destinations, travel dates, group size, and preferences. Route planning support is part of what we offer.',
                },
                {
                  q: 'Are your drivers familiar with mountain roads?',
                  a: 'Yes. Our drivers operate regularly on Uttarakhand hill routes including Kedarnath passes, Auli snowfields, Chopta meadows, and the Char Dham circuit across all seasons.',
                },
                {
                  q: 'Do you provide Tempo Travellers?',
                  a: 'Yes. Tempo Travellers seating 12 to 17 passengers are available for group tours, large pilgrimages, corporate offsite travel, and college student groups.',
                },
                {
                  q: 'Is support available 24×7?',
                  a: 'Yes. Our team is available throughout the day and night — for new bookings, trip updates, or any assistance during your journey.',
                },
              ].map((faq) => (
                <div
                  key={faq.q}
                  className="bg-[#1A1A1A] rounded-[2rem] p-8 border border-white/10 shadow-sm"
                >
                  <h3 className="font-black text-white text-xl mb-4">
                    {faq.q}
                  </h3>
                  <p className="text-white/70 font-light leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ─── TRUST BANNER ─── */}
        <section className="px-4 py-12 bg-[#1A1A1A]">
          <div className="max-w-page mx-auto">
            <TrustBanner />
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121212] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#F7941D] opacity-[0.06] blur-[120px]" />

          <div className="max-w-page mx-auto relative z-10">
            <div className="max-w-3xl">
              <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">
                Ready To Travel?
              </p>
              <h2 className="font-heading font-black text-4xl md:text-6xl text-white uppercase tracking-tighter leading-none mb-8">
                Ready To Explore
                <br />
                Uttarakhand?
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl">
                Whether you need an airport transfer, Char Dham taxi, family
                holiday vehicle, sightseeing cab or corporate transportation —
                our team is available 24 hours a day, 7 days a week.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+919258912169"
                  className="px-8 py-4 bg-[#F7941D] rounded-xl text-white font-black uppercase tracking-wider hover:bg-[#D97E10] transition-all"
                >
                  Call Now
                </a>
                <a
                  href="https://wa.me/919675212169"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#25D366] rounded-xl text-white font-black uppercase tracking-wider"
                >
                  WhatsApp Us
                </a>
                <Link
                  href="/contact"
                  className="px-8 py-4 border border-white/20 rounded-xl text-white font-black uppercase tracking-wider hover:bg-white/10 transition-all"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── STRATEGIC CTA ─── */}
        <section className="px-4 sm:px-6 lg:px-8 pb-32 bg-[#1A1A1A]">
          <div className="max-w-page mx-auto">
            <StrategicCTA
              heading="Travel With Confidence"
              subtext="Experience the difference of traveling with a Dehradun-based travel company backed by 12 years of local expertise across Uttarakhand."
            />
          </div>
        </section>

      </main>
    </>
  );
}
