import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Car, Users, Star, Phone, MessageCircle, ShieldCheck } from 'lucide-react';
import { innovaImages, travellerImages, sedanImages, ertigaImages } from '@/lib/fleet-images';

export const metadata: Metadata = {
  title: 'Fleet Gallery | Innova, Tempo Traveller & Sedans',
  description: 'View our well-maintained, deep-cleaned fleet of Innova Crysta, Tempo Travellers, and Swift Dzire cabs. See real photos of our Dehradun taxi service and happy guests.',
  alternates: { canonical: 'https://uttarakhand.cab/gallery' },
  openGraph: {
    title: 'Fleet Gallery | Innova, Tempo Traveller & Sedans',
    description: 'View our well-maintained, deep-cleaned fleet of Innova Crysta, Tempo Travellers, and Swift Dzire cabs. See real photos of our Dehradun taxi service and happy guests.',
    url: 'https://uttarakhand.cab/gallery',
    siteName: 'Uttarakhand Cab 24/7',
    type: 'website',
    images: [
      {
        url: 'https://uttarakhand.cab/images/og-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Uttarakhand Cab 24/7 - Premium Taxi Service',
      },
    ],
  },
};

// 4. Guest Assets
const guestTripImages = [
  { src: '/gallery/Guests/1000027673.webp', alt: 'Happy Travelers Uttarakhand Cab 24/7' },
  { src: '/gallery/Guests/1000028732.webp', alt: 'Guest Trip in Dehradun' },
  { src: '/gallery/Guests/1000124399.webp', alt: 'Customer Experience Uttarakhand Cab' },
  { src: '/gallery/Guests/1000124400.webp', alt: 'Safe Journey to Mussoorie' },
  { src: '/gallery/Guests/1751ddd6-7055-46d5-87ed-ad2a21fb3cbb.webp', alt: 'Trip Moment with Our Cab' },
  { src: '/gallery/Guests/1A2C77D1-D494-4D70-BBAC-50FEB1E8D47C.webp', alt: 'Verified Happy Customer' },
  { src: '/gallery/Guests/24dabbd1-2bb7-43dc-8117-781ece6f2d5b.webp', alt: 'Uttarakhand Cab 24/7 Guest' },
  { src: '/gallery/Guests/26acac37-ae3c-49be-a36c-c4f58f060f28.webp', alt: 'Family Tour Uttarakhand' },
  { src: '/gallery/Guests/406f1387-de75-4378-80af-b583b1ab409d.webp', alt: 'Reliable Driver Guest Experience' },
  { src: '/gallery/Guests/4af338d1-9529-4612-b23e-c99573c445b7.webp', alt: 'Comfortable Hill Trip' },
  { src: '/gallery/Guests/50ef4e30-1c26-4186-be27-42ec047705f3.webp', alt: 'Char Dham Yatra Guest Photo' },
  { src: '/gallery/Guests/75136231-2d8e-4526-bb16-a5c0197812c9.webp', alt: 'Professional Taxi Service Review' },
  { src: '/gallery/Guests/781ad00c-5a75-4e61-bbe1-a0bbe6d19140.webp', alt: 'Safe Travels with Uttarakhand Cab' },
  { src: '/gallery/Guests/84d5a6c2-2454-48ca-be3b-710b95af8a8e.webp', alt: 'Dehradun Airport Transfer Guest' },
  { src: '/gallery/Guests/8581e0de-c40d-47f3-972e-9b25f65392dc.webp', alt: 'Group Tour Experience' },
  { src: '/gallery/Guests/85ac72b5-c95c-4098-bb72-bcecec9c2bbd.webp', alt: 'Hill Station Cab Review' },
  { src: '/gallery/Guests/98e3cc83-d17e-4f73-948f-2f46183b8b2e.webp', alt: 'Reliable 24/7 Service Trip' },
  { src: '/gallery/Guests/C4591E4B-FD8D-4249-B272-5ED150923171.webp', alt: 'Happy Passenger Photo' },
  { src: '/gallery/Guests/IMG_7195.webp', alt: 'Uttarakhand Sightseeing Guest' },
  { src: '/gallery/Guests/fb4a5933-1e8d-41cf-979d-0c15b885fadc.webp', alt: 'Customer Memories Uttarakhand Cab' },
];

export default function GalleryPage() {
  return (
    <main className="bg-[#1A1A1A] min-h-screen">
      
      {/* 1. SHOWROOM HERO SECTION */}
      <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A] overflow-hidden">
        {/* Subtle Orange Showroom Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F7941D] opacity-10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-page mx-auto relative z-10 text-center">
          <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Uttarakhand Cab 24/7 Showroom</p>
          <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl text-white uppercase tracking-tighter mb-6 leading-[0.9]">
            Our <span className="text-[#F7941D]">Premium Fleet</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto font-light text-lg mb-8">
            Experience reliable travel with our well-maintained, deep-cleaned vehicles. View real photos of our fleet and the guests who travel with us.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/50 text-[10px] font-black uppercase tracking-widest">
             <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#F7941D]" /> Mechanically Inspected</span>
             <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#F7941D]" /> Sanitized Interiors</span>
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-32">
        
        {/* Innova Section */}
        <section id="innova">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                 <Car className="w-4 h-4" /> SUV Class
              </p>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                Toyota <span className="text-[#F7941D]">Innova Crysta</span> Fleet
              </h2>
            </div>
            <p className="text-white/70 font-light md:text-right max-w-xs text-sm">Perfect for Char Dham Yatra and family trips across the Himalayas.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {innovaImages.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-[1.5rem] bg-[#1A1A1A] shadow-sm border border-white/10 aspect-[4/3] cursor-pointer">
                <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 50vw, 25vw" />
                {/* Glassmorphic Caption Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#1E1F20]/90 via-[#1E1F20]/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <p className="text-white text-[10px] font-bold uppercase tracking-widest leading-tight">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tempo Traveller Section */}
        <section id="traveller">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                 <Users className="w-4 h-4" /> Large Groups
              </p>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                Group <span className="text-[#F7941D]">Tempo Traveller</span> Fleet
              </h2>
            </div>
            <p className="text-white/70 font-light md:text-right max-w-xs text-sm">Spacious 12 to 17-seater vehicles designed for ultimate group comfort.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {travellerImages.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-[1.5rem] bg-[#1A1A1A] shadow-sm border border-white/10 aspect-[4/3] cursor-pointer">
                <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#1E1F20]/90 via-[#1E1F20]/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <p className="text-white text-[10px] font-bold uppercase tracking-widest leading-tight">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sedan Section */}
        <section id="sedan">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                 <Car className="w-4 h-4" /> Economy Class
              </p>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                Economy <span className="text-[#F7941D]">Swift Dzire / Aura</span> Fleet
              </h2>
            </div>
            <p className="text-white/70 font-light md:text-right max-w-xs text-sm">Budget-friendly, highly comfortable rides for couples and small families.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {sedanImages.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-[1.5rem] bg-[#1A1A1A] shadow-sm border border-white/10 aspect-[4/3] cursor-pointer">
                <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#1E1F20]/90 via-[#1E1F20]/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <p className="text-white text-[10px] font-bold uppercase tracking-widest leading-tight">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ertiga Section */}
        <section id="ertiga">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                 <Car className="w-4 h-4" /> MPV Class
              </p>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                Maruti <span className="text-[#F7941D]">Ertiga</span> Fleet
              </h2>
            </div>
            <p className="text-white/70 font-light md:text-right max-w-xs text-sm">Spacious 6-seater MPVs, ideal for families and weekend getaways.</p>
          </div>

          {ertigaImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {ertigaImages.map((image, index) => (
                <div key={index} className="group relative overflow-hidden rounded-[1.5rem] bg-[#1A1A1A] shadow-sm border border-white/10 aspect-[4/3] cursor-pointer">
                  <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 50vw, 25vw" />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#1E1F20]/90 via-[#1E1F20]/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <p className="text-white text-[10px] font-bold uppercase tracking-widest leading-tight">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 rounded-[1.5rem] border-2 border-dashed border-white/15 bg-[#1A1A1A] py-16 text-gray-400">
              <Car className="w-10 h-10" />
              <p className="text-xs font-black uppercase tracking-widest">Ertiga photos coming soon</p>
            </div>
          )}
        </section>

        {/* Guests Section */}
        <section>
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                 <Star className="w-4 h-4" /> Hall of Fame
              </p>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                Verified <span className="text-[#F7941D]">Guest Experiences</span>
              </h2>
            </div>
            <p className="text-white/70 font-light md:text-right max-w-xs text-sm">Real smiles from our incredible 50,000+ happy customers.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {guestTripImages.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-[1.5rem] bg-[#1A1A1A] shadow-sm border border-white/10 aspect-[4/3] cursor-pointer">
                <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#1E1F20]/90 via-[#1E1F20]/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <p className="text-white text-[10px] font-bold uppercase tracking-widest leading-tight">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner (Deep Space Aesthetic) */}
        <div className="relative bg-[#1A1A1A] rounded-[3rem] p-12 md:p-20 text-center text-white overflow-hidden shadow-2xl border border-[#333537]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#F7941D] rounded-full opacity-10 blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter leading-none">
              Ready to <br className="hidden sm:block"/> <span className="text-[#F7941D]">Book Your Ride</span>?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="tel:+919258912169" className="bg-[#1A1A1A] text-white font-black py-4 px-10 rounded-xl uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-[#F7941D] hover:text-white transition-all">
                <Phone className="w-4 h-4" /> Call Now
              </Link>
              <Link href="https://wa.me/919258912169" className="bg-[#25D366] text-white font-black py-4 px-10 rounded-xl uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-[#128C7E] hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
