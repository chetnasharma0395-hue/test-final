import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Database, Settings, Share2, Lock, CreditCard, Cookie, ExternalLink, RefreshCw, Phone, MapPin, Mail, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Uttarakhand Cab 24/7 taxi booking service. Learn how we collect, use, and protect your personal information.',
  alternates: { canonical: 'https://uttarakhand.cab/privacy-policy' },
  openGraph: {
    title: 'Privacy Policy | Uttarakhand Cab 24/7',
    description: 'Privacy policy for Uttarakhand Cab 24/7 taxi booking service. Learn how we collect, use, and protect your personal information.',
    url: 'https://uttarakhand.cab/privacy-policy',
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

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#1A1A1A] min-h-screen selection:bg-[#F7941D]/30">
      
      {/* 1. HERO SECTION: Minimalist & Authoritative */}
      <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8 bg-[#121212] border-b border-white/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F7941D] opacity-[0.02] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-left">
          {/* Glass Navigation Pill */}
          <nav className="inline-flex items-center gap-2 bg-[#1A1A1A] backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 shadow-sm text-white/70 text-xs font-bold uppercase tracking-widest">
            <Link href="/" className="hover:text-[#F7941D] transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <span className="text-[#F7941D]">Privacy Policy</span>
          </nav>

          <p className="text-[#F7941D] text-xs font-black uppercase tracking-[0.3em] mb-4">Legal Information</p>
          <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl text-white uppercase leading-[0.9] tracking-tighter mb-6">
            Privacy <br/> Policy.
          </h1>
          <p className="text-white/70 text-sm font-bold uppercase tracking-widest bg-[#1A1A1A] border border-white/10 px-4 py-2 rounded-lg w-fit shadow-sm">
            Last updated: April 2026
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTENT AREA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Introduction Box (Bento Frame) */}
          <div className="bg-[#1A1A1A] p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-[#1A1A1A] flex items-center justify-center shrink-0 group-hover:bg-[#F7941D]/10 transition-colors">
                <ShieldCheck className="w-8 h-8 text-[#F7941D]" />
              </div>
              <p className="text-white/70 leading-relaxed text-lg font-light">
                At Uttarakhand Cab 24/7, we take your privacy seriously. This policy outlines how we collect, use, and protect the personal information you provide when using our taxi booking services.
              </p>
            </div>
          </div>

          {/* Section 1: Collection */}
          <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-sm hover:shadow-xl hover:border-[#F7941D]/20 transition-all">
            <h2 className="font-heading font-black text-2xl md:text-3xl text-white uppercase tracking-tighter mb-8 flex items-center justify-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] flex items-center justify-center shrink-0">
                <Database className="w-5 h-5 text-[#F7941D]" />
              </div>
              Information We Collect
            </h2>
            <p className="text-white/70 text-base mb-8 font-light leading-relaxed">
              We collect information you provide directly to us when booking a taxi service, including:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Name and contact details (phone number, optional email address)',
                'Pickup locations and destination addresses',
                'Travel dates and expected pickup times',
                'Number of passengers and luggage requirements'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 bg-[#1A1A1A]/50 p-4 rounded-xl border border-gray-50">
                  <CheckCircle2 className="w-5 h-5 text-[#F7941D] shrink-0 mt-0.5" />
                  <span className="text-sm text-white/70 font-light leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2: Usage */}
          <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-sm hover:shadow-xl hover:border-[#F7941D]/20 transition-all">
            <h2 className="font-heading font-black text-2xl md:text-3xl text-white uppercase tracking-tighter mb-8 flex items-center justify-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] flex items-center justify-center shrink-0">
                <Settings className="w-5 h-5 text-[#F7941D]" />
              </div>
              How We Use Your Information
            </h2>
            <p className="text-white/70 text-base mb-8 font-light leading-relaxed">
              Your information is used strictly for operational and service fulfillment purposes:
            </p>
            <ul className="space-y-4">
              {[
                'To process, confirm, and manage your taxi booking',
                'To send booking confirmations and updates via WhatsApp, SMS, or phone call',
                'To provide customer support and real-time trip assistance',
                'To improve our services and overall customer experience'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#121212] transition-colors">
                  <div className="w-2 h-2 rounded-full bg-[#F7941D] mt-2 shrink-0" />
                  <span className="text-base text-white/70 font-light leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3 & 4: Sharing and Security Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1A1A1A] p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-sm hover:shadow-xl transition-all">
              <h2 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-6 flex items-center justify-start gap-3">
                <Share2 className="w-5 h-5 text-[#F7941D] shrink-0" />
                Information Sharing
              </h2>
              <p className="text-white/70 text-sm md:text-base font-light leading-relaxed">
                We only share necessary details (such as your pickup location and phone number) with the assigned driver to complete your trip. We strictly do <strong className="text-white font-black uppercase tracking-tight">not sell, rent, or trade</strong> your personal information to any third-party marketing agencies.
              </p>
            </div>

            <div className="bg-[#1A1A1A] p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-sm hover:shadow-xl transition-all">
              <h2 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-6 flex items-center justify-start gap-3">
                <Lock className="w-5 h-5 text-[#F7941D] shrink-0" />
                Data Security
              </h2>
              <p className="text-white/70 text-sm md:text-base font-light leading-relaxed">
                We take appropriate physical and digital security measures to protect your personal information from unauthorized access, accidental loss, misuse, or public disclosure.
              </p>
            </div>
          </div>

          {/* Section 5, 6, 7: Details Bento */}
          <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-xl space-y-12">
            <div>
              <h2 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-4 flex items-center justify-start gap-4">
                <CreditCard className="w-6 h-6 text-[#F7941D] shrink-0" />
                Payment Information
              </h2>
              <p className="text-white/70 leading-relaxed text-base font-light">
                We do not store any sensitive payment details such as debit/credit card numbers on our servers. All digital payments are handled securely through trusted third-party payment gateways (like UPI providers) or via direct transactions with the driver.
              </p>
            </div>

            <div className="border-t border-gray-50 pt-12">
              <h2 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-4 flex items-center justify-start gap-4">
                <Cookie className="w-6 h-6 text-[#F7941D] shrink-0" />
                Cookies & Tracking
              </h2>
              <p className="text-white/70 leading-relaxed text-base font-light">
                Our website may use standard cookies to enhance your browsing experience, analyze web traffic, and improve site functionality. You can choose to disable cookies through your personal browser settings at any time.
              </p>
            </div>

            <div className="border-t border-gray-50 pt-12">
              <h2 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-4 flex items-center justify-start gap-4">
                <ExternalLink className="w-6 h-6 text-[#F7941D] shrink-0" />
                Third-Party Links
              </h2>
              <p className="text-white/70 leading-relaxed text-base font-light">
                Our website may contain links to external third-party websites (such as government registration portals for the Char Dham Yatra). We are not responsible for the privacy practices, security, or content of those external websites.
              </p>
            </div>
          </div>

          {/* Policy Updates */}
          <div className="bg-[#1A1A1A] p-8 md:p-10 rounded-[2.5rem] border border-white/10/50 shadow-inner flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0 shadow-sm border border-white/10">
               <RefreshCw className="w-6 h-6 text-[#F7941D]" />
            </div>
            <div>
              <h2 className="font-heading font-black text-xl text-white uppercase tracking-tighter mb-2">Policy Updates</h2>
              <p className="text-white/70 leading-relaxed text-sm font-light">
                We may update this Privacy Policy periodically to reflect changes in our legal obligations or operational practices. Any updates will be reflected directly on this page alongside a revised &quot;Last updated&quot; date.
              </p>
            </div>
          </div>

          {/* Contact Information (Deep Space Box) */}
          <div className="bg-[#1A1A1A] text-white p-10 md:p-16 rounded-[3rem] shadow-2xl mt-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#F7941D] rounded-full opacity-10 blur-[80px] pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="font-heading font-black text-3xl text-white uppercase tracking-tighter mb-8 flex items-center justify-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-[#F7941D]" />
                </div>
                Privacy Contact
              </h2>
              <p className="text-white/70 font-light leading-relaxed mb-10 max-w-xl text-lg">
                If you have any questions, concerns, or requests regarding how we handle your personal data, please contact our data team immediately:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <a href="tel:+919258912169" className="flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-[#F7941D] hover:border-[#F7941D] transition-all group">
                  <Phone className="w-6 h-6 text-[#F7941D] group-hover:text-white shrink-0" />
                  <span className="text-base font-black tracking-tighter">+91 92589 12169</span>
                </a>
                <a href="mailto:uttarakhandcab247@gmail.com" className="flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-[#F7941D] hover:border-[#F7941D] transition-all group">
                  <Mail className="w-6 h-6 text-[#F7941D] group-hover:text-white shrink-0" />
                  <span className="text-sm font-black tracking-tighter truncate">uttarakhandcab247@gmail.com</span>
                </a>
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl sm:col-span-2">
                  <MapPin className="w-6 h-6 text-[#F7941D] shrink-0" />
                  <span className="text-base font-light tracking-wide">Dehradun, Uttarakhand, India</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
