import React from 'react';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';

export default function DehradunToChandigarhContent() {
  return (
    <article className="max-w-none text-left text-white/80">
  <div className="sr-only" aria-hidden="false">
  <GEOAnswerBox
    question="What is the taxi fare from Dehradun to Chandigarh?"
    answer="A taxi from Dehradun to Chandigarh costs ₹2,800 for a Sedan and ₹3,800 for an SUV with Uttarakhand Cab 24/7. The 175 km journey via NH72 takes approximately 4–5 hours. Fixed fare, no hidden charges, 24/7 available. Book via WhatsApp: +91 92589 12169."
    facts={[
        { label: 'Distance', value: '175 km' },
        { label: 'Duration', value: '4–5 hrs' },
        { label: 'Sedan', value: '₹2,800' },
        { label: 'SUV', value: '₹3,800' },
    ]}
    source="Uttarakhand Cab 24/7 — Updated June 2026"
  />
  </div>

      
      {/* SECTION 1: Route Overview */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">1. The Route: Crossing Three States</h2>
        <p className="mb-4">
          The 180km journey from Dehradun to Chandigarh is unique because it crosses three states: Uttarakhand, a brief but beautiful stretch through Himachal Pradesh, and finally Haryana into Punjab/Chandigarh. It requires proper permits and a driver who knows the terrain.
        </p>
        
        <h3 className="text-xl font-bold text-white mb-3 mt-6">The Primary Route (NH-707 & NH-7)</h3>
        <p className="bg-[#1A1A1A] p-4 rounded-lg border-l-4 border-blue-400/50 mb-6">
          <strong>Dehradun → Vikasnagar → Paonta Sahib (HP) → Kala Amb → Nahan → Pinjore → Chandigarh</strong><br/>
          <em>Total Distance:</em> ~175–185 km.
        </p>

        <h3 className="text-xl font-bold text-white mb-3">Honest Travel Time Estimates</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-[#1A1A1A] border border-white/10 shadow-sm rounded-lg">
            <thead className="bg-white/5">
              <tr>
                <th className="py-3 px-4 border-b text-left font-semibold text-white/70">Driving Condition</th>
                <th className="py-3 px-4 border-b text-left font-semibold text-white/70">Estimated Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4 border-b">Normal Weekday / Night Drive</td>
                <td className="py-3 px-4 border-b font-medium text-emerald-400">3.5 – 4.5 Hours</td>
              </tr>
              <tr className="bg-[#1A1A1A]">
                <td className="py-3 px-4 border-b">Weekend / Peak Season</td>
                <td className="py-3 px-4 border-b text-[#F7941D]">4.5 – 5.5 Hours</td>
              </tr>
              <tr className="bg-red-900/20">
                <td className="py-3 px-4 border-b">Heavy Monsoon Days (July-Sept)</td>
                <td className="py-3 px-4 border-b font-bold text-red-400">5.5+ Hours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 2: Local Intelligence */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">2. Local Insights: The Inter-State Reality</h2>
        
        <ul className="list-disc pl-6 space-y-4 mb-6">
          <li><strong>The River Valley Stretch:</strong> The road from Vikasnagar to Paonta Sahib follows the Yamuna river. It is gorgeous, but the sharp curves require a driver who respects the road, not someone navigating via GPS for the first time.</li>
          <li><strong>The Nahan-Pinjore Bottleneck:</strong> This is the most underestimated section. It is hilly, narrow in patches, and carries heavy truck traffic. A cautious, experienced driver is worth more than a fast one here.</li>
          <li><strong>Dehradun City Exit:</strong> Getting out of Dehradun toward Vikasnagar between 8:30–10:30 AM is notoriously slow due to school and office traffic. We highly recommend a <strong>7:00 AM departure</strong>.</li>
        </ul>

        <div className="bg-[#2A1F00] p-6 rounded-xl border border-[#F7941D]/30">
          <h3 className="text-lg font-bold text-[#F7941D] mb-2">⚠️ The Inter-State Permit Warning</h3>
          <p className="text-white/75 text-sm">
            Because this route crosses into Himachal Pradesh (Paonta Sahib), commercial vehicles <strong>must</strong> have HP state permits. Cheap aggregator cabs often skip this and get detained at the border checkpost. We ensure all our vehicles have pre-arranged, valid multi-state permits so you never face border delays.
          </p>
        </div>
      </section>

      {/* SECTION 3: Stopovers */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">3. Recommended Highway Stopovers</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#1A1A1A] p-5 border rounded-lg shadow-sm">
            <h4 className="font-bold text-[#F7941D] mb-2">📍 Paonta Sahib (HP)</h4>
            <p className="text-sm">About 1.5 hours in. This is a historic Sikh pilgrimage town. Excellent dhabas on the bypass road. If time permits, the Gurudwara on the banks of the Yamuna is a beautiful, peaceful 15-minute stop.</p>
          </div>
          <div className="bg-[#1A1A1A] p-5 border rounded-lg shadow-sm">
            <h4 className="font-bold text-[#F7941D] mb-2">📍 Kala Amb / Nahan Bypass</h4>
            <p className="text-sm">Roughly halfway through the journey. A major junction town with good, clean, truck-friendly dhabas perfect for a quick tea and leg-stretch before the winding Nahan section.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: Fleet Selection */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">4. Which Cab Should You Book?</h2>
        
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="text-2xl mr-3">🚕</span>
            <div>
              <strong className="block text-lg">Sedan (Swift Dzire, Honda Amaze)</strong>
              <span className="text-white/60">Perfect for 1-4 passengers. The hills on this route are manageable, making a sedan a highly cost-effective and comfortable option.</span>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-3">🚙</span>
            <div>
              <strong className="block text-lg">SUV (Innova Crysta, Ertiga)</strong>
              <span className="text-white/60">Recommended for larger families, heavy luggage, or elderly passengers. The Innova's suspension provides a noticeably smoother ride during the winding Nahan-Pinjore stretch.</span>
            </div>
          </li>
        </ul>
      </section>

      {/* SECTION 5: Destination Insights */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">5. Chandigarh Destination Guide</h2>
        <p className="mb-4">Chandigarh is India's premier planned city, serving as a hub for business, transit, and medical care.</p>
        
        <div className="bg-[#0A1220] p-6 rounded-lg border border-blue-400/25 mb-6">
          <h3 className="font-bold text-[#F7941D] mb-3">Specialized Service: PGI Medical Travel</h3>
          <p className="text-white/80 text-sm">
            A large portion of our Dehradun-Chandigarh trips are for families visiting the <strong>PGIMER Hospital</strong>. We understand this is an essential, often stressful journey. Our drivers are trained to be punctual, respectful, and can be booked on a "waiting" basis while you attend appointments, ensuring a stress-free return home.
          </p>
        </div>
      </section>

      {/* SECTION 6: Pricing Transparency */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">6. Transparent Fare Breakdown</h2>
        
        <div className="bg-[#0A1F12] p-6 rounded-lg border border-emerald-500/25 mb-6">
          <h3 className="font-bold text-emerald-400 mb-3">What is INCLUDED in your quote:</h3>
          <ul className="list-disc pl-5 space-y-1 text-white/75">
            <li>Driver's allowance and commercial fuel.</li>
            <li>Uttarakhand and Haryana State Tolls.</li>
            <li><strong>Himachal Pradesh Inter-State Permit Fees</strong> (Crucial for the Paonta Sahib crossing).</li>
          </ul>
        </div>
        
        <p className="font-medium text-lg text-white/80 border-l-4 border-[#F7941D] pl-4 py-2 bg-[#0A1220]">
          "Sahi safar sahi service aur vo safar hamari zimmedaari."
        </p>
      </section>

      {/* SECTION 7: FAQs */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">7. Customer FAQs (Straight from our WhatsApp)</h2>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-lg">Q: Is this a hill route or a flat highway?</h4>
            <p className="text-white/70">A: It is a mix. The first half features a beautiful, slightly winding river valley road. After Paonta Sahib, it flattens out into straight highways until you reach Chandigarh. It is much easier than routes like Kedarnath or Manali.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg">Q: Will the driver drop me inside my specific sector in Chandigarh?</h4>
            <p className="text-white/70">A: Yes. Whether it is Sector 17, PGI Hospital, Elante Mall, or the Mohali Airport, our fare includes door-to-door drop-off at your exact destination.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg">Q: Is it safe to travel this route during the monsoon?</h4>
            <p className="text-white/70">A: Generally, yes. However, the Nahan section can occasionally experience minor debris during heavy rains. We monitor weather conditions daily and advise our clients on the safest departure times. In severe weather, we utilize the alternative (but longer) Saharanpur-Ambala highway.</p>
          </div>
        </div>
      </section>

    </article>
  );
}
