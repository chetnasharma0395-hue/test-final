'use client';

import { Star, Quote } from 'lucide-react';
import { CardCarousel } from './CardCarousel';

const reviews = [
  {
    name: 'Rahul Sharma',
    location: 'Delhi',
    rating: 5,
    date: 'March 2025',
    text: 'Booked for our Char Dham Yatra — driver Suresh ji was exceptional. Knew every route through Kedarnath and Badrinath perfectly, even in bad weather. Fixed fare, no surprises. Will book again for next year.',
    trip: 'Char Dham Yatra',
  },
  {
    name: 'Priya Mehta',
    location: 'Mumbai',
    rating: 5,
    date: 'February 2025',
    text: 'Used Uttarakhand Cab 24/7 for Jolly Grant Airport pickup and then a full day trip to Mussoorie. Cab was clean, driver was on time and very professional. Transparent pricing — exactly what was quoted.',
    trip: 'Airport + Mussoorie',
  },
  {
    name: 'Amit Verma',
    location: 'Noida',
    rating: 5,
    date: 'January 2025',
    text: 'Family trip to Rishikesh and Haridwar. The driver knew all the ghats and ashrams perfectly. Very safe driving on mountain roads. Kids were comfortable throughout. Highly recommended for family travel.',
    trip: 'Rishikesh & Haridwar',
  },
  {
    name: 'Sunita Gupta',
    location: 'Chandigarh',
    rating: 5,
    date: 'December 2024',
    text: 'Went for Kedarnath yatra during winter. Roads were tricky but our driver handled it brilliantly. He waited patiently at Gaurikund during our trek. Very reasonable rates for such a long trip.',
    trip: 'Kedarnath Yatra',
  },
  {
    name: 'Vikram Singh',
    location: 'Dehradun',
    rating: 5,
    date: 'November 2024',
    text: 'Regular customer for corporate travel between Dehradun and Delhi. Always on time, clean SUV, experienced drivers. The WhatsApp booking is very convenient. Best cab service in Uttarakhand.',
    trip: 'Dehradun to Delhi',
  },
  {
    name: 'Anjali Rawat',
    location: 'Haridwar',
    rating: 5,
    date: 'October 2024',
    text: 'Booked for Nainital trip with my parents. The driver was patient with elderly passengers and knew shortcuts to avoid traffic near Kathgodam. Excellent service throughout the journey.',
    trip: 'Haridwar to Nainital',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-[#1A1A1A] overflow-hidden">
      <div className="max-w-page mx-auto px-6 sm:px-8 lg:px-10">

        {/* ── Heading ──────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <p className="text-[#F7941D] text-xs font-semibold uppercase tracking-widest mb-4">
            Real Customers · Real Reviews
          </p>
          <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight leading-none mb-5">
            What Travellers Say
          </h2>
          <p className="text-white/70 font-light max-w-lg mx-auto leading-relaxed">
            Over 2,000 five-star reviews on Google. Verified travellers sharing
            their real Uttarakhand journeys with us.
          </p>
        </div>

        {/* ── Review Carousel ──────────────────────────────────────── */}
        <div className="mb-16">
          <CardCarousel
            items={reviews}
            getKey={(_, i) => `review-${i}`}
            cardWidth={380}
            cardGap={24}
            ariaLabel="Customer reviews carousel — use arrow keys to navigate"
            renderCard={(review, isActive) => (
              <div
                className="bg-[#1A1A1A] rounded-[2rem] p-7 flex flex-col gap-5 border h-full"
                style={{
                  borderColor: isActive ? 'rgba(247,148,29,0.25)' : 'rgba(255,255,255,0.08)',
                  boxShadow: isActive ? '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(247,148,29,0.10)' : 'none',
                  minHeight: 360,
                }}
              >
                {/* Stars + Quote icon */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-[#F7941D] text-[#F7941D]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#F7941D] opacity-25" />
                </div>

                {/* Review body */}
                <p className="text-white/70 text-sm leading-relaxed flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Trip tag */}
                <span className="inline-flex w-fit items-center bg-[#1A1209] text-[#F7941D] text-[9px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">
                  {review.trip}
                </span>

                {/* Reviewer row */}
                <div className="flex items-center justify-between pt-4 border-t border-white/8">
                  <div>
                    <p className="font-extrabold text-white text-sm tracking-tight">{review.name}</p>
                    <p className="text-white/70 text-xs font-light mt-0.5">{review.location} · {review.date}</p>
                  </div>
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-label="Google review">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
              </div>
            )}
          />
        </div>

        {/* ── Aggregate + Google CTA ───────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#F7941D] text-[#F7941D]" />
              ))}
            </div>
            <span className="font-extrabold text-white text-lg tracking-tight">4.9 out of 5</span>
            <span className="text-white/70 text-xs font-light">Based on 2,000+ Google reviews</span>
          </div>

          <div className="hidden sm:block w-px h-12 bg-[#121212]/10" />

          <a
            href="https://share.google/kRQ3R4zpQ5KVC6Zq8"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2.5 bg-[#121212] text-white
              text-xs font-semibold uppercase tracking-widest px-6 py-3.5 rounded-full
              transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
              hover:bg-[#F7941D] hover:-translate-y-0.5 hover:shadow-sm
            "
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            See All Google Reviews
          </a>
        </div>

      </div>
    </section>
  );
}
