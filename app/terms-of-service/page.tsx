import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, FileText, CreditCard, Car, UserCheck, AlertTriangle, Scale, Phone, MapPin, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using Uttarakhand Cab 24/7 taxi booking service. Read our booking, pricing, and travel policies.',
  alternates: { canonical: 'https://uttarakhand.cab/terms-of-service' },
  openGraph: {
    title: 'Terms of Service | Uttarakhand Cab 24/7',
    description: 'Terms and conditions for using Uttarakhand Cab 24/7 taxi booking service. Read our booking, pricing, and travel policies.',
    url: 'https://uttarakhand.cab/terms-of-service',
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

export default function TermsOfService() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-navy text-white pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden text-left">
        <div className="container-wide relative z-10 max-w-4xl">
          <nav className="text-white/80 text-sm mb-6 flex items-center justify-start gap-2">
            <Link href="/" className="hover:text-gold transition-colors font-medium">Home</Link>
            <span className="text-white/50">/</span>
            <span className="text-gold font-medium">Terms of Service</span>
          </nav>
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Legal Information</p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl uppercase mb-4 leading-tight">
            Terms of Service
          </h1>
          <p className="text-white/90 text-lg leading-relaxed">
            Last updated: April 2026
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="content-section bg-[#1A1A1A] text-left">
        <div className="container-wide max-w-4xl space-y-8">
          
          {/* Introduction Box */}
          <div className="bg-[#1A1A1A] p-6 md:p-8 border border-white/10 shadow-sm rounded-sm">
            <p className="text-white/70 leading-relaxed">
              Welcome to Uttarakhand Cab 24/7. By booking a taxi with us, you agree to be bound by the following terms and conditions. Please read them carefully before confirming your travel arrangements.
            </p>
          </div>

          {/* Section 1: Booking */}
          <div className="bg-[#1A1A1A] p-6 md:p-8 border-l-4 border-gold shadow-sm rounded-sm">
            <h2 className="font-heading font-bold text-2xl text-white uppercase mb-4 flex items-center justify-start gap-3">
              <FileText className="w-6 h-6 text-gold shrink-0" />
              Booking & Confirmation
            </h2>
            <ul className="space-y-3 text-white/70 list-disc list-outside ml-5">
              <li className="pl-2">Bookings are confirmed via WhatsApp or phone call from our official team.</li>
              <li className="pl-2">A booking is considered confirmed only after the receipt of an advance payment or explicit confirmation from Uttarakhand Cab 24/7.</li>
              <li className="pl-2">All bookings are strictly subject to vehicle availability.</li>
              <li className="pl-2">We reserve the right to decline or cancel a booking at our sole discretion.</li>
            </ul>
          </div>

          {/* Section 2: Pricing */}
          <div className="bg-[#1A1A1A] p-6 md:p-8 border-l-4 border-gold shadow-sm rounded-sm">
            <h2 className="font-heading font-bold text-2xl text-white uppercase mb-4 flex items-center justify-start gap-3">
              <CreditCard className="w-6 h-6 text-gold shrink-0" />
              Pricing & Inclusions
            </h2>
            <ul className="space-y-3 text-white/70 list-disc list-outside ml-5">
              <li className="pl-2">All fares are agreed upon transparently at the time of booking.</li>
              <li className="pl-2">Toll taxes, parking fees, and inter-state border taxes (if applicable) are charged at actuals during the trip unless explicitly bundled into a &quot;Fixed Package&quot;.</li>
              <li className="pl-2">Night driving charges (between 10:00 PM and 6:00 AM) are applicable for trips involving travel during these hours and will be charged at actuals as per the route and vehicle category. These will be communicated upfront at the time of booking.</li>
              <li className="pl-2">Waiting charges will be applicable if the passenger is delayed beyond the agreed pickup time. Rates are ₹100–₹200 per hour depending on vehicle category and will be communicated at the time of booking.</li>
              <li className="pl-2">For multi-day outstation trips, driver accommodation and meal expenses (driver allowance) are to be borne by the customer unless explicitly stated as included in the package.</li>
              <li className="pl-2">An advance payment may be required at the time of booking confirmation. The remaining balance is payable before or on the day of commencement of the trip as agreed.</li>
            </ul>
          </div>

          {/* Section 3: Cancellation */}
          <div className="bg-[#1A1A1A] p-6 md:p-8 border-l-4 border-gold shadow-sm rounded-sm">
            <h2 className="font-heading font-bold text-2xl text-white uppercase mb-4 flex items-center justify-start gap-3">
              <ShieldCheck className="w-6 h-6 text-gold shrink-0" />
              Cancellation & Credit Policy
            </h2>
            <ul className="space-y-3 text-white/70 list-disc list-outside ml-5">
              <li className="pl-2">All cancellations are strictly governed by our official <Link href="/cancellation-policy" className="text-gold underline underline-offset-2 hover:text-white transition-colors font-medium">Cancellation Policy</Link>, which forms an integral part of these Terms.</li>
              <li className="pl-2 font-medium text-white">No cash refunds will be provided under any circumstances.</li>
              <li className="pl-2">Only credit notes for future travel will be issued as per the applicable terms of your cancellation window.</li>
              <li className="pl-2 font-medium text-red-600">Once a trip has commenced, the booking shall be considered fully utilised for the reserved duration. No refund or credit note shall be applicable for early termination after commencement.</li>
            </ul>
          </div>

          {/* Early Termination Policy */}
          <div className="bg-[#1A1A1A] p-6 md:p-8 border-l-4 border-red-500 shadow-sm rounded-sm">
            <h2 className="font-heading font-bold text-2xl text-white uppercase mb-4 flex items-center justify-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500 shrink-0" />
              Trip Cancellation & Early Termination
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              The vehicle and driver are reserved exclusively for the customer during the booked period. Once a trip has commenced, the following terms apply without exception:
            </p>
            <ul className="space-y-3 text-white/70 list-disc list-outside ml-5">
              <li className="pl-2 font-medium">Once the trip has started, the booking will be considered fully utilised for the reserved duration, irrespective of actual usage.</li>
              <li className="pl-2">If the customer cancels, shortens, abandons, or terminates the trip after commencement for any reason — including personal, medical, or family reasons — <span className="font-medium text-white">no refund shall be applicable.</span></li>
              <li className="pl-2">The customer shall remain liable to pay the <span className="font-medium">full agreed booking amount</span>, including all reserved days, vehicle charges, driver allowance, tolls, parking charges, and any other applicable expenses.</li>
              <li className="pl-2">Any unused kilometres, days, hotel nights, sightseeing inclusions, or services shall not be refundable or adjustable.</li>
              <li className="pl-2">In case the customer chooses to end the trip before the scheduled completion date, the vehicle and driver remain blocked for the booked period. The full package cost shall therefore be payable in its entirety.</li>
            </ul>
          </div>

          {/* Section 4 & 5: Vehicle and Passenger */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1A1A1A] p-6 md:p-8 border-l-4 border-gold shadow-sm rounded-sm">
              <h2 className="font-heading font-bold text-xl text-white uppercase mb-4 flex items-center justify-start gap-3">
                <Car className="w-5 h-5 text-gold shrink-0" />
                Usage of Vehicle
              </h2>
              <ul className="space-y-3 text-white/70 text-sm list-disc list-outside ml-5">
                <li className="pl-2">Vehicle usage is strictly limited to the pre-agreed itinerary.</li>
                <li className="pl-2">Any additional distance covered or route deviation requested during the trip will be chargeable extra.</li>
                <li className="pl-2">The vehicle cannot be used for any illegal, restricted, or unsafe activities.</li>
                <li className="pl-2 font-medium">Any extension beyond the booked tour duration shall be treated as an additional service day and charged accordingly.</li>
              </ul>
            </div>

            <div className="bg-[#1A1A1A] p-6 md:p-8 border-l-4 border-gold shadow-sm rounded-sm md:col-span-2">
              <h2 className="font-heading font-bold text-xl text-white uppercase mb-4 flex items-center justify-start gap-3">
                <Car className="w-5 h-5 text-gold shrink-0" />
                Tour Duration &amp; Extra Day Charges
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                All tour packages are calculated based on the pre-agreed itinerary and number of days. If the trip extends beyond the booked duration due to guest request, delays, road closures, traffic conditions, weather disruptions, government restrictions, vehicle waiting, late departures, route changes, or any other reason requiring an additional day of vehicle and driver service, an extra day charge will be applicable as per the vehicle category.
              </p>
              <p className="text-white/70 text-sm leading-relaxed mt-3">
                Any stay extension or inability to reach the scheduled destination or drop point within the booked duration shall be treated as an additional service day and charged accordingly. Additional expenses such as driver allowance, parking, tolls, accommodation, and other actual charges (if applicable) shall also be borne by the customer.
              </p>
            </div>

            <div className="bg-[#1A1A1A] p-6 md:p-8 border-l-4 border-gold shadow-sm rounded-sm">
              <h2 className="font-heading font-bold text-xl text-white uppercase mb-4 flex items-center justify-start gap-3">
                <UserCheck className="w-5 h-5 text-gold shrink-0" />
                Passenger Responsibility
              </h2>
              <ul className="space-y-3 text-white/70 text-sm list-disc list-outside ml-5">
                <li className="pl-2">Passengers must be present at the agreed pickup location on time.</li>
                <li className="pl-2">Passengers are solely responsible for their luggage and personal belongings.</li>
                <li className="pl-2">Any physical damage caused to the vehicle by the passenger will be billed directly to them.</li>
                <li className="pl-2 text-red-600 font-medium">Misconduct with the driver or unsafe behavior will not be tolerated and may result in immediate termination of the trip.</li>
              </ul>
            </div>
          </div>

          {/* Section 6 & 7: Driver, Force Majeure & Liability */}
          <div className="bg-[#1A1A1A] p-6 md:p-8 border border-white/10 shadow-sm rounded-sm space-y-8">
            <div>
              <h2 className="font-heading font-bold text-xl text-white uppercase mb-3 flex items-center justify-start gap-3">
                <AlertTriangle className="w-5 h-5 text-gold shrink-0" />
                Driver & Travel Conditions
              </h2>
              <p className="text-white/70 leading-relaxed text-sm mb-2">
                Driver duty hours are limited to ensure safety, unless agreed otherwise for multi-day trips. Night travel or extended driving hours in the mountains may attract additional allowances. The driver will follow safe and officially permitted routes only.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-white uppercase mb-3 flex items-center justify-start gap-3">
                <AlertTriangle className="w-5 h-5 text-gold shrink-0" />
                Force Majeure & Liability
              </h2>
              <p className="text-white/70 leading-relaxed text-sm">
                Uttarakhand Cab 24/7 is not responsible for delays, itinerary changes, or the inability to complete trips due to force majeure events such as road closures, landslides, extreme weather conditions, government restrictions, or any unforeseen circumstances beyond our control. Furthermore, we shall not be held liable for any indirect financial losses, missed flights/trains, or inconvenience caused during the trip.
              </p>
            </div>
          </div>

          {/* Section 8: Jurisdiction & Contact */}
          <div className="bg-navy text-white p-6 md:p-8 rounded-sm shadow-sm">
            <h2 className="font-heading font-bold text-xl text-gold uppercase mb-4 flex items-center justify-start gap-3">
              <Scale className="w-5 h-5 text-gold shrink-0" />
              Jurisdiction & Legal
            </h2>
            <p className="text-white/80 text-sm leading-relaxed mb-8">
              These terms are governed by the laws of Uttarakhand, India. Any disputes arising from these terms or the provision of our services are strictly subject to the exclusive jurisdiction of the courts located in Dehradun, Uttarakhand.
            </p>

            <div className="border-t border-white/10 pt-6">
              <h3 className="font-bold text-white uppercase tracking-wider text-sm mb-4">Contact Information</h3>
              <div className="space-y-3 text-white/90 text-sm">
                <a href="tel:+919258912169" className="flex items-center justify-start gap-3 hover:text-gold transition-colors w-max">
                  <Phone className="w-4 h-4 text-gold shrink-0" />
                  +91 92589 12169
                </a>
                <a href="mailto:uttarakhandcab247@gmail.com" className="flex items-center justify-start gap-3 hover:text-gold transition-colors w-max">
                  <Mail className="w-4 h-4 text-gold shrink-0" />
                  uttarakhandcab247@gmail.com
                </a>
                <div className="flex items-start justify-start gap-3">
                  <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>Dehradun, Uttarakhand, India</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
