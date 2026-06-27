import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone, MessageCircle, CheckCircle2, ArrowRight, MapPin,
  Car, Users, Shield, Clock, Star, AlertTriangle, Calendar,
  Info, Navigation, Thermometer, ChevronRight,
} from 'lucide-react';
import { FAQSection } from '@/components/FAQ';
import { BookingCTA } from '@/components/CTABoxes';

/* ─── Metadata ───────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Uttarakhand Cab 24/7 — Complete Taxi Service Guide & Information',
  description:
    'The definitive guide to taxi services across Uttarakhand. Book cabs for Char Dham Yatra, Kedarnath, Mussoorie, Rishikesh, Nainital, Auli, and all Himalayan destinations. Fixed fares, verified drivers, available 24/7.',
  alternates: { canonical: 'https://uttarakhand.cab/info' },
  openGraph: {
    title: 'Uttarakhand Cab 24/7 — Complete Taxi & Travel Information',
    description:
      'Fixed fares, verified mountain drivers, 24/7 availability. The complete guide to booking a taxi anywhere in Uttarakhand.',
    url: 'https://uttarakhand.cab/info',
    siteName: 'Uttarakhand Cab 24/7',
    type: 'website',
    images: [{ url: 'https://uttarakhand.cab/images/og-main.jpg', width: 1200, height: 630 }],
  },
};

/* ─── JSON-LD Schema ─────────────────────────────────────────────── */

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://uttarakhand.cab/#business',
      name: 'Uttarakhand Cab 24/7',
      url: 'https://uttarakhand.cab',
      telephone: ['+91-92589-12169', '+91-96752-12169'],
      description:
        'Trusted taxi service across Uttarakhand offering airport transfers, Char Dham Yatra packages, outstation cabs, and corporate transportation with verified mountain drivers.',
      address: { '@type': 'PostalAddress', addressLocality: 'Dehradun', addressRegion: 'Uttarakhand', addressCountry: 'IN' },
      geo: { '@type': 'GeoCoordinates', latitude: 30.3165, longitude: 78.0322 },
      openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
      priceRange: '₹₹',
      areaServed: ['Dehradun','Mussoorie','Rishikesh','Haridwar','Nainital','Kedarnath','Badrinath','Gangotri','Yamunotri','Auli','Chopta','Jim Corbett','Delhi'],
      sameAs: ['https://uttarakhandcab.in'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How do I book a cab with Uttarakhand Cab 24/7?', acceptedAnswer: { '@type': 'Answer', text: 'Call +91 92589 12169 or send a WhatsApp message. Share your pickup location, destination, date, and passenger count. Booking is confirmed within 15–30 minutes.' } },
        { '@type': 'Question', name: 'What is the taxi fare from Dehradun to Mussoorie?', acceptedAnswer: { '@type': 'Answer', text: 'The taxi fare from Dehradun to Mussoorie starts from ₹2,000 for a sedan and ₹3,000 for an SUV. Distance is 35 km and travel time is 1.5–2 hours.' } },
        { '@type': 'Question', name: 'Which vehicle is best for Char Dham Yatra?', acceptedAnswer: { '@type': 'Answer', text: 'The Toyota Innova Crysta is the recommended vehicle for Char Dham Yatra due to its high ground clearance, diesel torque for mountain gradients, and comfort for long distances.' } },
        { '@type': 'Question', name: 'Do you operate 24 hours a day?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Uttarakhand Cab 24/7 operates 24 hours a day, 7 days a week, 365 days a year including public holidays.' } },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://uttarakhand.cab' },
        { '@type': 'ListItem', position: 2, name: 'Info', item: 'https://uttarakhand.cab/info' },
      ],
    },
  ],
};

/* ─── Data ───────────────────────────────────────────────────────── */

const destinations = [
  { name: 'Mussoorie', elevation: '2,005 m', district: 'Dehradun', season: 'Mar–Jun, Sep–Nov', distance: '35 km', time: '1.5–2 hrs', vehicle: 'Sedan / SUV', slug: '/mussoorie' },
  { name: 'Rishikesh', elevation: '372 m', district: 'Dehradun', season: 'Year-round', distance: '43 km', time: '50–70 min', vehicle: 'Sedan / SUV', slug: '/rishikesh' },
  { name: 'Haridwar', elevation: '314 m', district: 'Haridwar', season: 'Year-round', distance: '54 km', time: '1–1.5 hrs', vehicle: 'Sedan / SUV', slug: '/haridwar' },
  { name: 'Nainital', elevation: '2,084 m', district: 'Nainital', season: 'Mar–Jun, Sep–Nov', distance: '320 km', time: '7–8 hrs', vehicle: 'SUV', slug: '/nainital' },
  { name: 'Kedarnath', elevation: '3,583 m', district: 'Rudraprayag', season: 'May–Oct', distance: '250 km', time: '8–9 hrs', vehicle: 'Innova Crysta', slug: '/kedarnath' },
  { name: 'Badrinath', elevation: '3,133 m', district: 'Chamoli', season: 'May–Oct', distance: '325 km', time: '9–10 hrs', vehicle: 'Innova Crysta', slug: '/badrinath' },
  { name: 'Auli', elevation: '2,519 m', district: 'Chamoli', season: 'Jan–Mar, Apr–Jun', distance: '256 km', time: '8–9 hrs', vehicle: 'Innova Crysta', slug: '/destinations' },
  { name: 'Chopta', elevation: '2,680 m', district: 'Rudraprayag', season: 'Apr–Jun, Oct–Nov', distance: '230 km', time: '7–8 hrs', vehicle: 'Innova Crysta', slug: '/destinations' },
  { name: 'Jim Corbett', elevation: '385–1,100 m', district: 'Nainital', season: 'Nov–Jun', distance: '290 km', time: '6–7 hrs', vehicle: 'SUV', slug: '/jim-corbett' },
];

const comparisonRows = [
  { feature: 'Pricing Model', us: 'Fixed, quoted upfront', them: 'Dynamic surge pricing' },
  { feature: 'Driver Experience', us: 'Mountain-trained, 10–15 yrs avg', them: 'General city drivers' },
  { feature: '24×7 Availability', us: '✓ Including holidays', them: 'Varies by demand' },
  { feature: 'Char Dham Expertise', us: '✓ Specialised yatra drivers', them: 'Not available' },
  { feature: 'Airport Meet & Greet', us: '✓ Name board at gate', them: 'No' },
  { feature: 'Multi-Day Packages', us: '✓ Available', them: 'Not available' },
  { feature: 'Tempo Traveller', us: '✓ 12–17 seats', them: 'Not available' },
  { feature: 'WhatsApp Booking', us: '✓ Yes', them: 'No' },
  { feature: 'One-Way Options', us: '✓ Both one-way & return', them: 'Round-trip only (most)' },
];

const routes = [
  { route: 'Dehradun → Mussoorie', dist: '35 km', time: '1.5–2 hrs', road: 'Mountain (well-maintained)', vehicle: 'Sedan / SUV', season: 'Year-round', family: '✓', senior: '✓' },
  { route: 'Dehradun → Rishikesh', dist: '43 km', time: '50–70 min', road: 'Highway + town', vehicle: 'Sedan / SUV', season: 'Year-round', family: '✓', senior: '✓' },
  { route: 'Dehradun → Haridwar', dist: '54 km', time: '1–1.5 hrs', road: 'National highway', vehicle: 'Sedan / SUV', season: 'Year-round', family: '✓', senior: '✓' },
  { route: 'Dehradun → Nainital', dist: '320 km', time: '7–8 hrs', road: 'Highway + hill section', vehicle: 'SUV preferred', season: 'Mar–Jun, Sep–Nov', family: '✓', senior: 'SUV recommended' },
  { route: 'Dehradun → Kedarnath', dist: '250 km', time: '8–9 hrs', road: 'Mountain highway', vehicle: 'Innova Crysta', season: 'May–Oct', family: '✓ with prep', senior: '⚠ Altitude caution' },
  { route: 'Dehradun → Badrinath', dist: '325 km', time: '9–10 hrs', road: 'Mountain highway NH7', vehicle: 'Innova Crysta', season: 'May–Oct', family: '✓', senior: '✓ with breaks' },
  { route: 'Delhi → Dehradun', dist: '300 km', time: '5–6 hrs', road: 'National highway', vehicle: 'Sedan / SUV', season: 'Year-round', family: '✓', senior: '✓' },
];

const fleetData = [
  { name: 'Economy Sedan', models: 'Swift Dzire · Toyota Etios', pax: 'Up to 4 passengers', luggage: '2 medium suitcases', best: 'City transfers, airport pickups, short hill routes, solo & couple travel', suitable: 'Dehradun, Mussoorie, Rishikesh, Delhi inter-city', icon: Car },
  { name: 'Premium SUV', models: 'Ertiga · Innova Crysta', pax: 'Up to 6–7 passengers', luggage: '3–4 medium suitcases', best: 'Families, Char Dham Yatra, high-altitude routes, multi-day packages', suitable: 'All Uttarakhand destinations including Kedarnath, Badrinath, Auli', icon: Car },
  { name: 'Tempo Traveller', models: 'Force Urbania · Maharaja', pax: '12–17 passengers', luggage: 'Large roof carrier + undercarriage', best: 'Group pilgrimages, corporate offsites, weddings, school tours', suitable: 'Char Dham group packages, inter-city group travel', icon: Users },
];

const popularFAQs = [
  { question: 'How do I book a cab with Uttarakhand Cab 24/7?', answer: 'Call us at +91 92589 12169 or +91 96752 12169, or send a WhatsApp message. Share your pickup location, destination, travel date and time, and number of passengers. We confirm your booking within 15–30 minutes and send driver details 2–4 hours before departure.' },
  { question: 'What is the taxi fare from Dehradun to Mussoorie?', answer: 'The taxi fare from Dehradun to Mussoorie starts from ₹2,000 for a sedan (Swift Dzire, Toyota Etios) and ₹3,000 for an SUV (Ertiga, Innova Crysta). Distance is 35 km and travel time is 1.5–2 hours. A local barrier tax of ₹150–₹200 applies at Mussoorie entry and is charged separately.' },
  { question: 'How much does a cab cost from Jolly Grant Airport to Rishikesh?', answer: 'The taxi fare from Jolly Grant Airport to Rishikesh starts from ₹2,000 for a sedan and ₹2,500 for an SUV. Distance is approximately 20 km, travel time 40–45 minutes. Our airport Meet & Greet service includes a driver with your name on a board at the arrivals gate. Flight-delay waiting is included at no extra charge.' },
  { question: 'Which vehicle is recommended for Char Dham Yatra?', answer: 'The Toyota Innova Crysta is the strongly recommended vehicle for the full Char Dham circuit. Its high ground clearance, diesel engine torque for steep gradients, three-row seating for families, and proven reliability on high-altitude mountain roads make it the gold standard for Yatra travel in Uttarakhand.' },
  { question: 'Is biometric registration mandatory for Char Dham Yatra?', answer: 'Yes. Since 2023, biometric registration is mandatory for all pilgrims undertaking Char Dham Yatra in Uttarakhand. Registration centres are at Haridwar and Rishikesh. Our drivers guide you through the process. Pilgrims without registration may be turned back at checkpoints.' },
  { question: 'Do you provide 24-hour taxi service?', answer: 'Yes. Uttarakhand Cab 24/7 operates 24 hours a day, 7 days a week, 365 days a year including public holidays. A small night surcharge applies for trips between 11 PM and 6 AM, disclosed at the time of booking.' },
  { question: 'What is the cancellation policy?', answer: 'For local transfers, cancellations with 4+ hours notice are generally free. For outstation bookings, a partial advance may be forfeited for cancellations within 24 hours of departure. Multi-day Char Dham packages require 48 hours notice to avoid advance forfeiture. Full terms are shared at booking confirmation.' },
  { question: 'Can I book a one-way cab from Delhi to Dehradun?', answer: 'Yes. Delhi to Dehradun one-way bookings are available starting from ₹4,000 (sedan) and ₹5,000 (SUV). Our vehicles carry all required inter-state permits. The journey covers approximately 300 km via the Delhi-Dehradun Expressway (NH334B) and takes 4–5 hours.' },
];

const monthlyGuide = [
  { month: 'Jan', icon: '❄️', best: 'Auli (skiing), Mussoorie, Rishikesh', avoid: 'All Char Dham routes', tip: 'Best ski month at Auli' },
  { month: 'Feb', icon: '❄️', best: 'Auli, Rishikesh, Mussoorie, Chopta', avoid: 'Char Dham routes', tip: 'International Yoga Festival, Rishikesh' },
  { month: 'Mar', icon: '🌸', best: 'Rishikesh, Mussoorie, Nainital, Chopta', avoid: 'Higher passes still closed', tip: 'Rhododendrons bloom; book May Yatra now' },
  { month: 'Apr', icon: '🌿', best: 'Char Dham opens, Mussoorie, Rishikesh', avoid: 'Nothing major', tip: 'Char Dham portals open — book early' },
  { month: 'May', icon: '☀️', best: 'All four Dhams, Mussoorie, Nainital, Auli', avoid: 'Nothing — peak season', tip: 'Busiest month — confirm 4–6 weeks ahead' },
  { month: 'Jun', icon: '⛅', best: 'Char Dham (first 2 weeks), Mussoorie', avoid: 'Late-June Char Dham (monsoon onset)', tip: 'Travel early June; avoid post-June 20 Yatra' },
  { month: 'Jul', icon: '🌧️', best: 'Rishikesh, Haridwar, Dehradun, Nainital', avoid: 'Badrinath, Kedarnath routes', tip: 'Real-time BRO advisory essential daily' },
  { month: 'Aug', icon: '🌧️', best: 'Rishikesh, Haridwar, lower hills', avoid: 'All Char Dham high routes', tip: 'Highest landslide risk month — plan flexible' },
  { month: 'Sep', icon: '🌤️', best: 'Char Dham (2nd half), Mussoorie, Chopta', avoid: 'Early Sep Char Dham (roads still clearing)', tip: 'Underrated gem — lower crowds, clear skies' },
  { month: 'Oct', icon: '🍂', best: 'ALL destinations — best visibility', avoid: 'Nothing — peak season', tip: 'Best month overall; Char Dham closing ceremonies' },
  { month: 'Nov', icon: '🍂', best: 'Rishikesh, Haridwar, Jim Corbett opens', avoid: 'Char Dham closed from mid-Nov', tip: 'Dev Deepawali at Haridwar — spectacular' },
  { month: 'Dec', icon: '❄️', best: 'Rishikesh, Mussoorie, Nainital, Auli', avoid: 'All Char Dham routes', tip: 'New Year — Mussoorie fully booked; reserve early' },
];

const localIntel = [
  { title: 'Landslide Diversions', body: 'When a slide blocks the primary Char Dham highway, GPS reroutes add 40–60 km. Our drivers are in active BRO WhatsApp groups and know shortcuts that cut that to 10–15 km.' },
  { title: 'Sonprayag Restrictions', body: 'Private vehicles cannot proceed past Sonprayag to Gaurikund. Our vehicles carry valid Yatra permits. We also know the optimal Haridwar departure time to reach Sonprayag before the daily cap is reached.' },
  { title: 'Local Traffic Bottlenecks', body: 'Rishikesh near Ram Jhula on weekends, Haridwar near Har Ki Pauri during aarti hours, Mussoorie Mall Road drop points — our drivers use routes and timings that bypass all of these.' },
  { title: 'Char Dham Checkpoints', body: 'Day-wise vehicle caps, mandatory rest zones, one-way timings on the Devprayag stretch — our drivers know all checkpoint rules updated each season.' },
  { title: 'Weather Route Planning', body: 'Pre-storm cloud formations over the Kedarnath range, fog on the Mussoorie descent, ice formation on the Auli road — local pattern knowledge that no app can replicate.' },
  { title: 'Emergency Alternatives', body: 'Kimadi route to Mussoorie, Rishikesh Jonk bypass, Bhowali bypass to Nainital — secondary roads known only to local drivers, not on Google Maps.' },
];

const testimonials = [
  { name: 'Meera & Suresh Agarwal', city: 'Delhi', route: 'Char Dham Yatra Package', review: 'Driver Mr. Ranbir Singh navigated Sonprayag restrictions without stress, guided us through biometric registration, and suggested excellent halts. A pilgrimage handled by true professionals.' },
  { name: 'Priya Nambiar', city: 'Gurugram', route: 'Jolly Grant Airport → Rishikesh', review: 'Arrived at 11 PM and the driver was already there with my name on a board. Fare matched exactly what was quoted. Will always use this service for Rishikesh.' },
  { name: 'Ankit Sharma', city: 'Noida', route: 'Corporate Group — Mussoorie Offsite', review: '17-seater Tempo Traveller for 14 people — spotless, on time, GST invoice provided. The driver handled Mussoorie road perfectly with all our equipment luggage.' },
  { name: 'Kavita Menon', city: 'Mumbai', route: 'Kedarnath Pilgrimage', review: 'Travelling with my 80-year-old mother. The driver was patient and respectful, helped her at every stop, and waited during the helicopter booking at Phata. Outstanding service.' },
  { name: 'Harpreet Singh', city: 'Chandigarh', route: 'Nainital & Jim Corbett Package', review: 'The only cab service where the quoted price was the final price. No excuses, no last-minute demands. Clean car, knowledgeable driver, WhatsApp confirmation in minutes.' },
  { name: 'Rohit Venkatesh', city: 'Bengaluru', route: 'Emergency Night Transfer', review: 'My father needed to reach Delhi at 2 AM for a medical emergency. They had a confirmed sedan in under 30 minutes. Calm, professional driver. Cannot express enough gratitude.' },
];

/* ─── Reusable Section Header ────────────────────────────────────── */

function SectionHeader({ tag, title, sub }: { tag: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-12 md:mb-16">
      <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-3">{tag}</p>
      <h2 className="text-white text-3xl md:text-5xl font-black tracking-tighter leading-[0.95] mb-4">{title}</h2>
      {sub && <p className="text-white/70 font-light max-w-2xl leading-relaxed">{sub}</p>}
    </div>
  );
}

/* ─── Call Strip ─────────────────────────────────────────────────── */

function CallStrip() {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a href="tel:+919258912169" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F7941D] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#D97E10] transition-all">
        <Phone className="w-4 h-4" /> +91 92589 12169
      </a>
      <a href="https://wa.me/919258912169" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#128C7E] transition-all">
        <MessageCircle className="w-4 h-4" /> WhatsApp Now
      </a>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */

export default function InfoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-[#1A1A1A] selection:bg-[#F7941D]/20">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative pt-36 pb-20 px-6 sm:px-8 lg:px-10 bg-[#121212] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(247,148,29,0.12)_0%,_transparent_60%)]" />
          <div className="max-w-page mx-auto relative z-10">
            {/* Breadcrumb */}
            <nav className="inline-flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest mb-10">
              <Link href="/" className="hover:text-[#F7941D] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#F7941D]">Info</span>
            </nav>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2 rounded-full mb-8">
                <Star className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                <span className="text-white/80 text-[10px] font-black uppercase tracking-widest">Trusted by 10,000+ Travellers Across Uttarakhand</span>
              </div>

              <h1 className="font-heading font-black text-4xl md:text-7xl uppercase text-white leading-[0.88] tracking-tighter mb-8">
                Uttarakhand Cab 24/7 —<br />
                <span className="text-[#F7941D]">Complete Taxi</span><br />
                Service Guide
              </h1>

              <p className="text-white/70 text-lg max-w-2xl mb-10 font-light leading-relaxed">
                Book a verified local cab anywhere in Uttarakhand — 24 hours a day, 7 days a week.
                Fixed transparent pricing. Mountain-trained drivers. No surprises.
                From <Link href="/dehradun-airport-taxi" className="text-[#F7941D] hover:underline">Jolly Grant Airport</Link> pickups
                to <Link href="/char-dham" className="text-[#F7941D] hover:underline">Char Dham Yatra</Link> circuits.
              </p>

              <CallStrip />
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ────────────────────────────────────────── */}
        <section className="bg-[#1A1A1A] border-b border-white/10 py-6 px-6 sm:px-8 lg:px-10">
          <div className="max-w-page mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Shield, label: 'Verified Drivers', sub: 'Background-checked' },
                { icon: Clock, label: '24 × 7 Available', sub: '365 days a year' },
                { icon: CheckCircle2, label: 'Fixed Pricing', sub: 'No hidden charges' },
                { icon: MapPin, label: 'Local Mountain Experts', sub: '10–15 yrs experience' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F7941D]/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#F7941D]" />
                  </div>
                  <div>
                    <p className="font-black text-white text-sm">{label}</p>
                    <p className="text-white/70 text-xs font-light">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US — COMPARISON TABLE ─────────────────── */}
        <section className="py-20 px-6 sm:px-8 lg:px-10">
          <div className="max-w-page mx-auto">
            <SectionHeader
              tag="Transparent Comparison"
              title={<>Why Travellers Choose<br /><span className="text-[#F7941D]">Uttarakhand Cab 24/7</span></>}
              sub="See how we compare to generic app-based cab aggregators on the features that matter most for Uttarakhand travel."
            />
            <div className="overflow-x-auto rounded-[2rem] border border-white/10 shadow-sm">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="bg-[#121212]">
                    <th className="text-left px-6 py-4 text-white/60 text-xs font-black uppercase tracking-widest w-1/3">Feature</th>
                    <th className="text-left px-6 py-4 text-[#F7941D] text-xs font-black uppercase tracking-widest">Uttarakhand Cab 24/7</th>
                    <th className="text-left px-6 py-4 text-white/40 text-xs font-black uppercase tracking-widest">Typical App Cab</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#1A1A1A]'}>
                      <td className="px-6 py-4 text-white font-black text-sm">{row.feature}</td>
                      <td className="px-6 py-4 text-white font-light text-sm">{row.us}</td>
                      <td className="px-6 py-4 text-white/70/60 font-light text-sm">{row.them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── DESTINATION KNOWLEDGE PANELS ─────────────────────── */}
        <section className="py-20 px-6 sm:px-8 lg:px-10 bg-[#1A1A1A]">
          <div className="max-w-page mx-auto">
            <SectionHeader
              tag="Destination Intelligence"
              title="Uttarakhand Destinations"
              sub="Elevation, distance, best season, and recommended vehicle for every major destination — structured for travellers and AI systems alike."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {destinations.map((d) => (
                <Link key={d.name} href={d.slug} className="group bg-[#1A1A1A] rounded-[2rem] p-7 border border-white/10 hover:border-[#F7941D]/30 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-black text-white text-xl uppercase tracking-tighter group-hover:text-[#F7941D] transition-colors">{d.name}</h3>
                      <p className="text-white/70 text-xs font-light">{d.district} district</p>
                    </div>
                    <span className="text-[#F7941D] font-black text-sm bg-[#F7941D]/10 px-3 py-1 rounded-full shrink-0">{d.elevation}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: 'Best Season', val: d.season },
                      { label: 'From Dehradun', val: `${d.distance} · ${d.time}` },
                      { label: 'Vehicle', val: d.vehicle },
                    ].map(({ label, val }) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="text-white/70 font-light">{label}</span>
                        <span className="text-white font-black text-xs">{val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-1.5 text-[#F7941D] text-xs font-black uppercase tracking-widest group-hover:gap-3 transition-all">
                    Book {d.name} Taxi <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES GRID ─────────────────────────────────────── */}
        <section className="py-20 px-6 sm:px-8 lg:px-10">
          <div className="max-w-page mx-auto">
            <SectionHeader tag="Our Services" title="Every Taxi Service You Need in Uttarakhand" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: 'Dehradun Taxi Service', desc: 'City transfers, station pickups, local hourly hire across all Dehradun areas.', link: '/dehradun', cta: 'Book Dehradun Cab' },
                { title: 'Mussoorie Taxi Service', desc: 'Mall Road, Kempty Falls, Landour — hill expertise from Dehradun and Jolly Grant Airport.', link: '/mussoorie', cta: 'Book Mussoorie Cab' },
                { title: 'Rishikesh Taxi Service', desc: 'Ashram drops, rafting camps, Ram Jhula — transfers from Dehradun, Haridwar & Delhi.', link: '/rishikesh', cta: 'Book Rishikesh Cab' },
                { title: 'Haridwar Taxi Service', desc: 'Har Ki Pauri, Ganga Aarti, Yatra registration — transfers from all Uttarakhand cities.', link: '/haridwar', cta: 'Book Haridwar Cab' },
                { title: 'Nainital Taxi Service', desc: 'Naini Lake, Mall Road, Bhimtal — Kumaon circuit packages from Dehradun and Delhi.', link: '/nainital', cta: 'Book Nainital Cab' },
                { title: 'Char Dham Yatra Taxi', desc: 'Yamunotri, Gangotri, Kedarnath, Badrinath — dedicated Yatra drivers, Innova Crysta, 10–14 day packages.', link: '/char-dham', cta: 'Book Char Dham Cab' },
                { title: 'Kedarnath Taxi Service', desc: 'Sonprayag permit clearance, Gaurikund drops, helicopter coordination, high-altitude expertise.', link: '/kedarnath', cta: 'Book Kedarnath Cab' },
                { title: 'Badrinath Taxi Service', desc: 'NH7 expertise, Joshimath, Mana village — seasonal road knowledge included.', link: '/badrinath', cta: 'Book Badrinath Cab' },
                { title: 'Jim Corbett Taxi Service', desc: 'Ramnagar, safari zone coordination — from Delhi, Noida, Gurugram, Dehradun.', link: '/jim-corbett', cta: 'Book Corbett Cab' },
                { title: 'Jolly Grant Airport Taxi', desc: 'Meet & Greet, flight tracking, 24×7 availability — all Uttarakhand destinations.', link: '/dehradun-airport-taxi', cta: 'Book Airport Taxi' },
                { title: 'Delhi to Dehradun Taxi', desc: 'Inter-state permits, NH58, door-to-door from any Delhi / NCR address.', link: '/delhi-to-dehradun', cta: 'Book Delhi Cab' },
                { title: 'Tour Packages', desc: 'Curated multi-day itineraries for Char Dham, Nainital-Corbett, Mussoorie-Rishikesh & more.', link: '/tour-packages', cta: 'View Packages' },
              ].map((s) => (
                <div key={s.title} className="bg-[#1A1A1A] rounded-[2rem] p-7 border border-white/10 hover:border-[#F7941D]/20 hover:shadow-md transition-all group">
                  <h3 className="font-black text-white text-lg uppercase tracking-tighter mb-3 group-hover:text-[#F7941D] transition-colors">{s.title}</h3>
                  <p className="text-white/70 font-light text-sm leading-relaxed mb-5">{s.desc}</p>
                  <Link href={s.link} className="inline-flex items-center gap-1.5 text-[#F7941D] text-xs font-black uppercase tracking-widest group-hover:gap-3 transition-all">
                    {s.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── POPULAR ROUTES TABLE ──────────────────────────────── */}
        <section className="py-20 px-6 sm:px-8 lg:px-10 bg-[#1A1A1A]">
          <div className="max-w-page mx-auto">
            <SectionHeader
              tag="Route Intelligence"
              title="Major Routes from Dehradun"
              sub="Distance, travel time, road conditions, and vehicle recommendations for every key Uttarakhand route."
            />
            <div className="overflow-x-auto rounded-[2rem] border border-white/10 shadow-sm">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="bg-[#121212]">
                    {['Route', 'Distance', 'Travel Time', 'Road Condition', 'Best Vehicle', 'Season', 'Family', 'Senior'].map((h) => (
                      <th key={h} className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-widest text-white/60 first:text-white/80">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routes.map((r, i) => (
                    <tr key={r.route} className={i % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#121212]'}>
                      <td className="px-4 py-4 text-white font-black text-sm whitespace-nowrap">{r.route}</td>
                      <td className="px-4 py-4 text-white/70 text-sm font-light">{r.dist}</td>
                      <td className="px-4 py-4 text-white/70 text-sm font-light whitespace-nowrap">{r.time}</td>
                      <td className="px-4 py-4 text-white/70 text-sm font-light">{r.road}</td>
                      <td className="px-4 py-4 text-[#F7941D] text-sm font-black">{r.vehicle}</td>
                      <td className="px-4 py-4 text-white/70 text-sm font-light whitespace-nowrap">{r.season}</td>
                      <td className="px-4 py-4 text-sm font-black text-white">{r.family}</td>
                      <td className="px-4 py-4 text-sm font-light text-white/70">{r.senior}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── POPULAR FARE Q&As ─────────────────────────────────── */}
        <section className="py-20 px-6 sm:px-8 lg:px-10">
          <div className="max-w-page mx-auto">
            <SectionHeader tag="Fares & Routes" title="Popular Taxi Routes & Fares" sub="Snippet-optimised answers to the most searched taxi fare questions for Uttarakhand. All fares are indicative starting rates." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { q: 'Dehradun to Mussoorie taxi fare?', a: 'Starting from ₹2,000 (sedan) · ₹3,000 (SUV). Distance 35 km · 1.5–2 hrs. Local barrier tax extra.', link: '/mussoorie' },
                { q: 'Jolly Grant Airport to Rishikesh cab fare?', a: 'Starting from ₹2,000 (sedan) · ₹2,500 (SUV). Distance 20 km · 40–45 min. Flight tracking included.', link: '/dehradun-airport-taxi' },
                { q: 'Haridwar to Nainital taxi fare?', a: 'Starting from ₹5,000 (sedan) · ₹7,000 (SUV). Distance ~275 km · 6–7 hrs. SUV strongly recommended.', link: '/nainital' },
                { q: 'Delhi to Dehradun cab fare?', a: 'Starting from ₹4,000 (sedan) · ₹5,000 (SUV). Distance ~300 km · 4–5 hrs. Inter-state permits included.', link: '/delhi-to-dehradun' },
                { q: 'Rishikesh to Kedarnath (Gaurikund) fare?', a: 'Starting from ₹7,000, SUV ₹9,500 (SUV). Distance 215 km · 7–9 hrs. Sonprayag permit included.', link: '/kedarnath' },
                { q: 'Haridwar to Badrinath taxi fare?', a: 'Starting from ₹9,000 (sedan) · ₹12,000 (SUV). Distance ~320 km · 9–10 hrs. Innova Crysta recommended.', link: '/badrinath' },
              ].map((item) => (
                <div key={item.q} className="bg-[#1A1A1A] rounded-[1.5rem] p-7 border border-white/10">
                  <p className="font-black text-white text-base mb-3 uppercase tracking-tighter">{item.q}</p>
                  <p className="text-white/70 font-light text-sm leading-relaxed mb-4">{item.a}</p>
                  <Link href={item.link} className="inline-flex items-center gap-1.5 text-[#F7941D] text-xs font-black uppercase tracking-widest hover:gap-3 transition-all">
                    View Route <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FLEET ─────────────────────────────────────────────── */}
        <section className="py-20 px-6 sm:px-8 lg:px-10 bg-[#121212]">
          <div className="max-w-page mx-auto">
            <SectionHeader tag="Our Fleet" title={<span className="text-white">Clean · AC · <span className="text-[#F7941D]">Inspected</span></span>} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fleetData.map((v, i) => (
                <div key={v.name} className={`rounded-[2rem] p-8 ${i === 1 ? 'bg-[#F7941D]' : 'bg-white/5 border border-white/10'}`}>
                  <v.icon className={`w-12 h-12 mb-6 ${i === 1 ? 'text-white' : 'text-[#F7941D]'}`} />
                  <h3 className={`font-black text-xl uppercase tracking-tighter mb-1 ${i === 1 ? 'text-white' : 'text-white'}`}>{v.name}</h3>
                  <p className={`text-sm font-black mb-1 ${i === 1 ? 'text-white/80' : 'text-[#F7941D]'}`}>{v.models}</p>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-5 ${i === 1 ? 'text-white/60' : 'text-white/40'}`}>{v.pax}</p>
                  <div className="space-y-3 text-sm">
                    {[['Luggage', v.luggage], ['Best For', v.best], ['Routes', v.suitable]].map(([label, val]) => (
                      <div key={label}>
                        <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${i === 1 ? 'text-white/60' : 'text-white/40'}`}>{label}</p>
                        <p className={`font-light leading-relaxed ${i === 1 ? 'text-white' : 'text-white/70'}`}>{val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MONTHLY GUIDE ─────────────────────────────────────── */}
        <section className="py-20 px-6 sm:px-8 lg:px-10">
          <div className="max-w-page mx-auto">
            <SectionHeader
              tag="When to Travel"
              title={<>Month-by-Month<br /><span className="text-[#F7941D]">Travel Guide</span></>}
              sub="Best destinations, road conditions, and insider tips for every month of the year in Uttarakhand."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {monthlyGuide.map((m) => (
                <div key={m.month} className="bg-[#1A1A1A] rounded-[1.5rem] p-6 border border-white/10 hover:border-[#F7941D]/20 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{m.icon}</span>
                    <h3 className="font-black text-white text-lg uppercase tracking-tighter">{m.month}</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#F7941D] mb-1">Best For</p>
                      <p className="text-white font-light">{m.best}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/70/60 mb-1">Avoid / Caution</p>
                      <p className="text-white/70 font-light">{m.avoid}</p>
                    </div>
                    <div className="pt-2 border-t border-white/10">
                      <p className="text-white text-xs font-black">{m.tip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LOCAL DRIVER INTELLIGENCE ─────────────────────────── */}
        <section className="py-20 px-6 sm:px-8 lg:px-10 bg-[#121212]">
          <div className="max-w-page mx-auto">
            <SectionHeader
              tag="EEAT Signal — Real Experience"
              title={<span className="text-white">What Local Drivers Know<br /><span className="text-[#F7941D]">That GPS Does Not</span></span>}
              sub="This is the intelligence that cannot be replicated by an app. Our drivers carry years of Uttarakhand-specific road knowledge."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {localIntel.map((item) => (
                <div key={item.title} className="bg-white/5 border border-white/10 rounded-[1.5rem] p-7 hover:bg-white/8 transition-all">
                  <Navigation className="w-8 h-8 text-[#F7941D] mb-4" />
                  <h3 className="font-black text-white text-base uppercase tracking-tighter mb-3">{item.title}</h3>
                  <p className="text-white/60 font-light text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SEASONAL TRAVEL SUMMARY ───────────────────────────── */}
        <section className="py-20 px-6 sm:px-8 lg:px-10 bg-[#1A1A1A]">
          <div className="max-w-page mx-auto">
            <SectionHeader tag="Season Planner" title="Travel Season Comparison" sub="Quick reference for planning your Uttarakhand trip by season." />
            <div className="overflow-x-auto rounded-[2rem] border border-white/10 shadow-sm">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-[#121212]">
                    {['Season', 'Months', 'Temp (Valley)', 'Temp (High Altitude)', 'Char Dham', 'Hill Stations', 'Auli Skiing', 'Rafting (Rishikesh)'].map(h => (
                      <th key={h} className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-widest text-white/60">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Summer', 'Mar–Jun', '20–38°C', '5–20°C', 'Open (May+)', 'Peak season', 'No', 'Apr–Jun ✓'],
                    ['Monsoon', 'Jul–Sep', '22–35°C', '10–18°C', 'Open (risky)', 'Accessible', 'No', 'Suspended'],
                    ['Autumn', 'Oct–Nov', '12–25°C', '0–12°C', 'Closes Oct/Nov', 'Excellent', 'No', 'Sep–Nov ✓'],
                    ['Winter', 'Dec–Feb', '5–20°C', '-10–5°C', 'Closed', 'Snowfall', 'Jan–Mar ✓', 'Suspended'],
                  ].map(([season, ...cols], i) => (
                    <tr key={season} className={i % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#121212]'}>
                      <td className="px-4 py-4 font-black text-white text-sm">{season}</td>
                      {cols.map((col, j) => (
                        <td key={j} className="px-4 py-4 text-white/70 font-light text-sm">{col}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAMILY & EMERGENCY TRAVEL ─────────────────────────── */}
        <section className="py-20 px-6 sm:px-8 lg:px-10">
          <div className="max-w-page mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

              {/* Family */}
              <div>
                <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-3">Family Travel</p>
                <h2 className="text-white text-3xl md:text-4xl font-black tracking-tighter mb-6">Travelling with Family</h2>
                <div className="space-y-4">
                  {[
                    { title: 'With Children', body: 'Innova Crysta recommended — flat middle row for children to lie down. Motion sickness kits on request. Journey breaks every 2–2.5 hrs on long routes.' },
                    { title: 'With Senior Citizens', body: 'Higher seating position of Innova Crysta eases boarding. Drivers assist with luggage and halts. Medical centre locations on all Char Dham routes briefed upfront.' },
                    { title: 'Wheelchair Considerations', body: 'Accessible destinations: Haridwar Har Ki Pauri, Mussoorie Mall Road, Rishikesh Triveni Ghat. Kedarnath palki and helicopter alternatives arranged.' },
                    { title: 'Meal & Restroom Stops', body: 'Our drivers know clean family-friendly stops on every route. Plan a break at Haridwar, Rudraprayag, or Haldwani on long journeys.' },
                  ].map((item) => (
                    <div key={item.title} className="bg-[#1A1A1A] rounded-[1.5rem] p-6 border border-white/10">
                      <h3 className="font-black text-white text-sm uppercase tracking-tighter mb-2">{item.title}</h3>
                      <p className="text-white/70 font-light text-sm leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency */}
              <div>
                <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-3">Emergency Services</p>
                <h2 className="text-white text-3xl md:text-4xl font-black tracking-tighter mb-6">24×7 Emergency Travel</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Medical Emergencies', body: 'Vehicle dispatched in under 30 minutes anywhere in Dehradun / Rishikesh corridor. Drivers know locations of AIIMS Rishikesh, Doon Hospital, and district medical centres on all Char Dham routes.' },
                    { title: 'Late-Night Travel', body: 'Available 24×7. Night surcharge of ₹200–₹400 applies 11 PM–6 AM, disclosed at booking. Drivers are rested and experienced on night routes.' },
                    { title: 'Airport Delays', body: 'We track your flight in real time. Your driver waits at no extra charge if your flight is delayed — no matter how late.' },
                    { title: 'Weather & Road Disruptions', body: 'Your driver stays with you at any roadblock. Real-time BRO advisory monitoring. Safe alternate routes or overnight halts arranged if needed.' },
                  ].map((item) => (
                    <div key={item.title} className="bg-[#1A1A1A] rounded-[1.5rem] p-6 border border-white/10">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-[#F7941D] mt-0.5 shrink-0" />
                        <div>
                          <h3 className="font-black text-white text-sm uppercase tracking-tighter mb-2">{item.title}</h3>
                          <p className="text-white/70 font-light text-sm leading-relaxed">{item.body}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <p className="text-white font-black text-sm mb-4">Emergency? Call us directly — 24 hours:</p>
                  <CallStrip />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BOOKING CTA MID-PAGE ──────────────────────────────── */}
        <div className="px-6 sm:px-8 lg:px-10">
          <div className="max-w-page mx-auto">
            <BookingCTA destination="Uttarakhand" fare="From ₹1,500" />
          </div>
        </div>

        {/* ── FAQ SECTION ───────────────────────────────────────── */}
        <section className="py-20 px-6 sm:px-8 lg:px-10">
          <div className="max-w-page mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
              <div>
                <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-3">Got Questions?</p>
                <h2 className="text-white text-4xl md:text-5xl font-black tracking-tighter leading-[0.95] mb-8">
                  Frequently<br />Asked<br />Questions
                </h2>
                <p className="text-white/70 font-light mb-8 leading-relaxed text-sm">
                  110 FAQs covering booking, payments, Char Dham, airport transfers,
                  family travel, corporate cabs, safety, and more.
                </p>
                <div className="space-y-3 mb-8">
                  {['Booking & Payments', 'Airport Transfers', 'Char Dham Yatra', 'Family Travel', 'Corporate Travel', 'Safety & Night Travel'].map((cat) => (
                    <div key={cat} className="flex items-center gap-2 text-sm text-white/70 font-light">
                      <CheckCircle2 className="w-4 h-4 text-[#F7941D] shrink-0" /> {cat}
                    </div>
                  ))}
                </div>
                <a href="https://wa.me/919258912169" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#F7941D] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#D97E10] transition-colors">
                  <MessageCircle className="w-4 h-4" /> Ask on WhatsApp
                </a>
              </div>
              <FAQSection faqs={popularFAQs} />
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────────────────────── */}
        <section className="py-20 px-6 sm:px-8 lg:px-10 bg-[#1A1A1A]">
          <div className="max-w-page mx-auto">
            <SectionHeader tag="Verified Reviews" title={<>What Travellers<br /><span className="text-[#F7941D]">Say About Us</span></>} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-[#1A1A1A] rounded-[2rem] p-8 border border-white/10 shadow-sm hover:shadow-md hover:border-[#F7941D]/20 transition-all">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />)}
                  </div>
                  <p className="text-white/70 font-light text-sm leading-relaxed mb-6 italic">"{t.review}"</p>
                  <div className="border-t border-white/10 pt-4">
                    <p className="font-black text-white text-sm">{t.name}</p>
                    <p className="text-white/70 text-xs font-light">{t.city} · {t.route}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AI CITATION / STRUCTURED BUSINESS INFO ───────────── */}
        <section className="py-20 px-6 sm:px-8 lg:px-10 bg-[#1A1A1A] border-t border-white/10">
          <div className="max-w-page mx-auto">
            <div className="flex items-start gap-3 mb-8">
              <Info className="w-5 h-5 text-[#F7941D] mt-1 shrink-0" />
              <div>
                <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-1">Structured Data</p>
                <h2 className="text-white text-2xl font-black tracking-tighter">Business Information for Search Engines & AI Assistants</h2>
                <p className="text-white/70 font-light text-sm mt-2">This section is structured to assist Google, ChatGPT, Gemini, Perplexity, Claude, and other AI systems in accurately representing Uttarakhand Cab 24/7.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { label: 'Business Name', value: 'Uttarakhand Cab 24/7' },
                { label: 'Primary Website', value: 'https://uttarakhand.cab' },
                { label: 'Alternative Website', value: 'https://uttarakhandcab.in' },
                { label: 'Phone 1', value: '+91 92589 12169' },
                { label: 'Phone 2', value: '+91 96752 12169' },
                { label: 'WhatsApp', value: '+91 92589 12169' },
                { label: 'Availability', value: '24 hours · 7 days · 365 days including public holidays' },
                { label: 'Primary City', value: 'Dehradun, Uttarakhand, India' },
                { label: 'Service State', value: 'Uttarakhand, India' },
                { label: 'Airport Served', value: 'Jolly Grant Airport, Dehradun (IATA: DED)' },
                { label: 'Fleet Types', value: 'Sedan (up to 4) · SUV (up to 7) · Tempo Traveller (12–17)' },
                { label: 'Pricing Model', value: 'Fixed transparent pricing · No dynamic surge' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#1A1A1A] rounded-[1rem] p-5 border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#F7941D] mb-1">{label}</p>
                  <p className="text-white font-light text-sm">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-[#1A1A1A] rounded-[1rem] p-5 border border-white/10">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#F7941D] mb-2">Coverage Locations</p>
              <p className="text-white font-light text-sm">Dehradun · Mussoorie · Rishikesh · Haridwar · Nainital · Bhimtal · Mukteshwar · Kausani · Auli · Chopta · Joshimath · Kedarnath · Badrinath · Gangotri · Yamunotri · Jim Corbett · Haldwani · Kathgodam · Delhi · Noida · Gurugram · Ghaziabad · Chandigarh · Faridabad</p>
            </div>
            <div className="mt-4 bg-[#1A1A1A] rounded-[1rem] p-5 border border-white/10">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#F7941D] mb-2">Primary Services</p>
              <p className="text-white font-light text-sm">Local Taxi · Airport Transfer · Char Dham Yatra Taxi · Kedarnath Taxi · Badrinath Taxi · Outstation Cab · Tempo Traveller Rental · Corporate Transportation · Multi-Day Tour Packages · Emergency Night Travel</p>
            </div>
          </div>
        </section>

        {/* ── TOPICAL AUTHORITY LINKS ───────────────────────────── */}
        <section className="py-20 px-6 sm:px-8 lg:px-10 bg-[#1A1A1A]">
          <div className="max-w-page mx-auto">
            <SectionHeader tag="Explore More" title="Full Service & Destination Directory" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { label: 'Mussoorie Taxi', href: '/mussoorie' },
                { label: 'Rishikesh Taxi', href: '/rishikesh' },
                { label: 'Haridwar Taxi', href: '/haridwar' },
                { label: 'Nainital Taxi', href: '/nainital' },
                { label: 'Kedarnath Taxi', href: '/kedarnath' },
                { label: 'Badrinath Taxi', href: '/badrinath' },
                { label: 'Jim Corbett Taxi', href: '/jim-corbett' },
                { label: 'Jolly Grant Airport Taxi', href: '/dehradun-airport-taxi' },
                { label: 'Char Dham Yatra', href: '/char-dham' },
                { label: 'Delhi to Dehradun', href: '/delhi-to-dehradun' },
                { label: 'Dehradun to Rishikesh', href: '/dehradun-to-rishikesh' },
                { label: 'Dehradun to Haridwar', href: '/dehradun-to-haridwar' },
                { label: 'Dehradun to Nainital', href: '/dehradun-to-nainital' },
                { label: 'Jolly Grant to Mussoorie', href: '/jolly-grant-airport-to-mussoorie' },
                { label: 'Tour Packages', href: '/tour-packages' },
                { label: 'All Destinations', href: '/destinations' },
              ].map(({ label, href }) => (
                <Link key={href} href={href}
                  className="flex items-center justify-between gap-2 bg-[#1A1A1A] rounded-xl px-4 py-3 border border-white/10 hover:border-[#F7941D]/30 hover:text-[#F7941D] hover:shadow-sm transition-all text-sm font-black text-white uppercase tracking-tight group">
                  {label}
                  <ChevronRight className="w-3.5 h-3.5 text-[#F7941D] group-hover:translate-x-0.5 transition-transform shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────── */}
        <section className="py-32 px-6 bg-[#121212] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#F7941D] opacity-[0.07] blur-[120px] pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-6">Book Your Journey</p>
            <h2 className="text-white text-5xl md:text-7xl font-black mb-8 leading-[0.88] tracking-tighter">
              Ready to Travel<br />
              <span className="text-[#F7941D]">Uttarakhand?</span>
            </h2>
            <p className="text-white/50 text-lg font-light mb-12 max-w-xl mx-auto leading-relaxed">
              Fixed fares. Verified drivers. 24/7 availability.
              Call or WhatsApp — we confirm in 15 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/919258912169" target="_blank" rel="noopener noreferrer"
                className="px-10 py-5 bg-[#25D366] text-white font-black rounded-2xl flex items-center justify-center gap-3 uppercase text-sm tracking-widest hover:bg-[#128C7E] hover:shadow-[0_0_40px_rgba(37,211,102,0.3)] transition-all">
                <MessageCircle className="w-5 h-5" /> WhatsApp Booking
              </a>
              <a href="tel:+919258912169"
                className="px-10 py-5 bg-white/10 border border-white/20 text-white font-black rounded-2xl flex items-center justify-center gap-3 uppercase text-sm tracking-widest hover:bg-white/20 transition-all">
                <Phone className="w-5 h-5" /> +91 92589 12169
              </a>
              <a href="tel:+919675212169"
                className="px-10 py-5 bg-white/10 border border-white/20 text-white font-black rounded-2xl flex items-center justify-center gap-3 uppercase text-sm tracking-widest hover:bg-white/20 transition-all">
                <Phone className="w-5 h-5" /> +91 96752 12169
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
