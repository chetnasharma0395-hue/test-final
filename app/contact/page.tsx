import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { FAQSection } from '@/components/FAQ';

export const metadata: Metadata = {
  title: 'Contact Us | Taxi Booking',
  description: 'Get in touch with Uttarakhand Cab 24/7. Call or WhatsApp us at +91 92589 12169 for instant taxi bookings, custom tour quotes, and travel assistance in Dehradun.',
  alternates: { canonical: 'https://uttarakhand.cab/contact' },
  openGraph: {
    title: 'Contact Us | Uttarakhand Cab 24/7 | Taxi Booking',
    description: 'Get in touch with Uttarakhand Cab 24/7. Call or WhatsApp us at +91 92589 12169 for instant taxi bookings, custom tour quotes, and travel assistance in Dehradun.',
    url: 'https://uttarakhand.cab/contact',
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

const contactFAQs = [
  {
    question: 'How fast do you reply to quotes?',
    answer: 'We operate 24/7. If you reach out via WhatsApp or phone call, our dispatch team will reply with an exact, fixed-fare quote in under 5 minutes.'
  },
  {
    question: 'Can I book a taxi for late night or early morning?',
    answer: 'Yes! We provide round-the-clock service. Whether you have a 3:00 AM flight from Jolly Grant Airport or need a late-night pickup, our drivers will be there. We recommend booking at least 4 hours in advance for odd hours.'
  },
  {
    question: 'Do I need to pay an advance to confirm my booking?',
    answer: 'Yes, we require a small token advance payment to lock in your vehicle and driver for your specific dates. The remaining balance is paid directly to your driver during the trip.'
  }
];

export default function Contact() {
  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': 'https://uttarakhand.cab/contact',
    name: 'Contact Uttarakhand Cab 24/7',
    url: 'https://uttarakhand.cab/contact',
    mainEntity: {
      '@type': 'LocalBusiness',
      '@id': 'https://uttarakhand.cab/#business',
      name: 'Uttarakhand Cab 24/7',
      telephone: '+919258912169',
      email: 'uttarakhandcab247@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Punj 86/1, Ballupur Road, Mitralok Colony',
        addressLocality: 'Dehradun',
        addressRegion: 'Uttarakhand',
        postalCode: '248001',
        addressCountry: 'IN',
      },
      openingHours: 'Mo-Su 00:00-23:59',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: contactFAQs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <Script id="contact-page-schema" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <Script id="contact-faq-schema" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <div className="bg-[#1A1A1A] min-h-screen selection:bg-[#F7941D]/30">
      
      {/* 1. HERO SECTION: Clean & Modern */}
      <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8 bg-[#121212] border-b border-white/10 overflow-hidden">
        {/* Subtle Orange Showroom Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F7941D] opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-page mx-auto relative z-10 text-left">
          {/* Glass Navigation Pill */}
          <nav className="inline-flex items-center gap-2 bg-[#1A1A1A] backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 shadow-sm text-white/70 text-xs font-bold uppercase tracking-widest">
            <Link href="/" className="hover:text-[#F7941D] transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <span className="text-[#F7941D]">Contact Us</span>
          </nav>

          <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">We Are Here To Help</p>
          <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl text-white uppercase leading-[0.9] tracking-tighter mb-6">
            Get In Touch
          </h1>
          <p className="text-white/70 text-lg max-w-2xl font-light leading-relaxed">
            Have a question about a route, need a custom itinerary, or want to book a taxi right now? Our local support team is available 24/7 to assist you.
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTENT AREA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-page mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Column: Contact Information (Bento Layout) */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading font-black text-3xl text-white uppercase tracking-tighter mb-4">Contact Information</h2>
                <p className="text-white/70 font-light leading-relaxed mb-8">
                  For the fastest response, we highly recommend calling us directly or sending a message on WhatsApp. We provide instant, fixed quotes for all routes across Uttarakhand.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone */}
                <div className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 shadow-sm hover:shadow-xl hover:border-[#F7941D]/30 transition-all group sm:col-span-2">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#1A1A1A] flex items-center justify-center shrink-0 group-hover:bg-[#F7941D]/10 transition-colors">
                      <Phone className="w-6 h-6 text-[#F7941D]" />
                    </div>
                    <div>
                      <h3 className="font-black text-white uppercase tracking-tight text-lg mb-1">Direct Call (24/7)</h3>
                      <p className="text-white/70 font-light text-sm mb-4">Speak directly with our booking desk.</p>
                      <div className="flex flex-col gap-2">
                        <a href="tel:+919258912169" className="text-[#F7941D] font-black text-2xl tracking-tighter hover:text-white transition-colors">
                          +91 92589 12169
                        </a>
                        <a href="tel:+919675212169" className="text-[#F7941D] font-black text-2xl tracking-tighter hover:text-white transition-colors">
                          +91 96752 12169
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 shadow-sm hover:shadow-xl hover:border-[#25D366]/30 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center mb-6 group-hover:bg-[#25D366]/10 transition-colors">
                    <MessageCircle className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <h3 className="font-black text-white uppercase tracking-tight text-lg mb-2">WhatsApp Fast Quote</h3>
                  <p className="text-white/70 font-light text-sm mb-6">Send your itinerary for an instant price.</p>
                  <a href="https://wa.me/919258912169" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#25D366] text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#128C7E] hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all">
                    <MessageCircle className="w-4 h-4" /> Message Us Now
                  </a>
                </div>

                {/* Email */}
                <div className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 shadow-sm hover:shadow-xl hover:border-[#F7941D]/30 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center mb-6 group-hover:bg-[#F7941D]/10 transition-colors">
                    <Mail className="w-6 h-6 text-[#F7941D]" />
                  </div>
                  <h3 className="font-black text-white uppercase tracking-tight text-lg mb-2">Email Support</h3>
                  <p className="text-white/70 font-light text-sm mb-6">For corporate ties or detailed itineraries.</p>
                  <a href="mailto:uttarakhandcab247@gmail.com" className="text-white font-bold text-sm hover:text-[#F7941D] transition-colors break-all">
                    uttarakhandcab247@gmail.com , info@uttarakhandcab
                  </a>
                </div>

                {/* Location & Hours */}
                <div className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/10 shadow-sm sm:col-span-2 flex flex-col sm:flex-row items-start gap-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[#F7941D]" />
                  </div>
                  <div>
                    <h3 className="font-black text-white uppercase tracking-tight text-lg mb-2">Base Location</h3>
                    <p className="text-white/70 font-light text-base mb-4">Dehradun, Uttarakhand, India</p>
                    
                    <div className="inline-flex items-center justify-start gap-2 bg-[#1A1A1A] px-4 py-2 rounded-lg">
                      <Clock className="w-4 h-4 text-[#F7941D]" />
                      <span className="font-bold text-[10px] uppercase tracking-widest text-white">Operating Hours: 24 Hours / 7 Days a Week</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form (SaaS Dark Mode) */}
            <div>
              <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[3rem] shadow-2xl border border-[#333537] relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#F7941D] opacity-10 rounded-full blur-[80px] pointer-events-none" />
                
                <div className="relative z-10">
                  <h2 className="font-heading font-black text-3xl text-white uppercase tracking-tighter mb-4">Send an Inquiry</h2>
                  <p className="text-white/60 font-light text-sm leading-relaxed mb-10">
                    Prefer not to call? Fill out the details below and our team will get back to you with a transparent, fixed-price quote.
                  </p>

                  {/* NOTE: Formspree Action Preserved */}
                  <form className="space-y-6" action="https://formspree.io/f/xreonpak" method="POST">
                    
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-white/80 ml-1">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        className="w-full bg-[#121212] border border-[#333537] rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F7941D] focus:ring-4 focus:ring-[#F7941D]/10 transition-all text-sm font-medium"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-white/80 ml-1">Phone / WhatsApp Number</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone" 
                          required 
                          className="w-full bg-[#121212] border border-[#333537] rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F7941D] focus:ring-4 focus:ring-[#F7941D]/10 transition-all text-sm font-medium"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="date" className="text-[10px] font-black uppercase tracking-widest text-white/80 ml-1">Travel Date</label>
                        <input 
                          type="date" 
                          id="date" 
                          name="date" 
                          className="w-full bg-[#121212] border border-[#333537] rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F7941D] focus:ring-4 focus:ring-[#F7941D]/10 transition-all text-sm font-medium [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="route" className="text-[10px] font-black uppercase tracking-widest text-white/80 ml-1">Route / Destinations Needed</label>
                      <input 
                        type="text" 
                        id="route" 
                        name="route" 
                        required 
                        className="w-full bg-[#121212] border border-[#333537] rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F7941D] focus:ring-4 focus:ring-[#F7941D]/10 transition-all text-sm font-medium"
                        placeholder="e.g. Dehradun Airport to Mussoorie"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-white/80 ml-1">Additional Details (Optional)</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={4}
                        className="w-full bg-[#121212] border border-[#333537] rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F7941D] focus:ring-4 focus:ring-[#F7941D]/10 transition-all text-sm font-medium resize-none"
                        placeholder="Number of passengers, vehicle preference, specific pickup time..."
                      ></textarea>
                    </div>

                    <button type="submit" className="w-full bg-[#F7941D] hover:bg-[#D97E10] hover:shadow-[0_0_25px_-5px_#F7941D] text-white font-black text-sm uppercase tracking-widest py-5 rounded-xl transition-all flex items-center justify-center gap-3 mt-4">
                      <Send className="w-5 h-5" /> Request Quote
                    </button>

                    <div className="flex items-center justify-start gap-3 mt-6 pt-6 border-t border-white/10 text-white/50 text-xs font-light">
                      <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0" />
                      <span>Your information is secure and never shared with third parties.</span>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FAQs */}
      <section className="py-24 bg-[#1A1A1A] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center md:text-left">
            <h2 className="font-heading font-black text-3xl md:text-5xl text-white uppercase tracking-tighter mb-4">
              Booking FAQs
            </h2>
            <p className="text-white/70 font-light text-lg">Quick answers to our most common contact and booking questions.</p>
          </div>
          <FAQSection faqs={contactFAQs} />
        </div>
      </section>
    </div>
    </>
  );
}
