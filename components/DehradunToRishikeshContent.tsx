import React from 'react';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';

export default function DehradunToRishikeshContent() {
  return (
    <article className="max-w-none text-left text-white/80">
  <div className="sr-only" aria-hidden="false">
  <GEOAnswerBox
    question="What is the taxi fare from Dehradun to Rishikesh?"
    answer="A taxi from Dehradun to Rishikesh costs ₹2,300 for a Sedan and ₹3,300 for an SUV with Uttarakhand Cab 24/7. The 50 km journey via NH7 takes approximately 1.5 hours. Fixed fare, airport pickups included, 24/7 available. Book via WhatsApp: +91 92589 12169."
    facts={[
        { label: 'Distance', value: '50 km' },
        { label: 'Duration', value: '1.5 hrs' },
        { label: 'Sedan', value: '₹2,300' },
        { label: 'SUV', value: '₹3,300' },
    ]}
    source="Uttarakhand Cab 24/7 — Updated June 2026"
  />
  </div>

      
      {/* SECTION 1: Route Overview */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">1. The Route: The NH-7 River Corridor</h2>
        <p className="mb-4">
          The 50 km journey from Dehradun to Rishikesh is a fast, flat drive through the Doon Valley, following the NH-7 corridor. While the highway is smooth, the final entry into Rishikesh town requires deep local knowledge to navigate narrow lanes and pilgrim traffic.
        </p>
        
        <h3 className="text-xl font-bold text-white mb-3 mt-6">The Primary Route</h3>
        <p className="bg-[#1A1A1A] p-4 rounded-lg border-l-4 border-blue-400/50 mb-6">
          <strong>Dehradun City → Doiwala → Raiwala → Rishikesh (Haridwar Bypass Entry) → Ram Jhula</strong><br/>
          <em>Total Distance:</em> ~43–46 km.
        </p>

        <h3 className="text-xl font-bold text-white mb-3">Honest Travel Time Estimates</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-[#1A1A1A] border border-white/10 shadow-sm rounded-lg text-left">
            <thead className="bg-white/5">
              <tr>
                <th className="py-3 px-4 border-b font-semibold text-white/70">Driving Condition</th>
                <th className="py-3 px-4 border-b font-semibold text-white/70">Dehradun to Rishikesh Entry</th>
                <th className="py-3 px-4 border-b font-semibold text-white/70">Add Time to Ram Jhula</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4 border-b">Normal Weekday</td>
                <td className="py-3 px-4 border-b font-medium text-emerald-400">50 Mins – 1 Hour</td>
                <td className="py-3 px-4 border-b font-medium text-emerald-400">+15 – 20 Mins</td>
              </tr>
              <tr className="bg-[#1A1A1A]">
                <td className="py-3 px-4 border-b">Weekend / Holiday Rush</td>
                <td className="py-3 px-4 border-b text-[#F7941D]">1.5 – 2.0 Hours</td>
                <td className="py-3 px-4 border-b text-[#F7941D]">+25 – 40 Mins</td>
              </tr>
              <tr className="bg-red-900/20">
                <td className="py-3 px-4 border-b">Char Dham Yatra Peak (May-Jun)</td>
                <td className="py-3 px-4 border-b font-bold text-red-400">2.0 – 3.0+ Hours</td>
                <td className="py-3 px-4 border-b font-bold text-red-400">Unpredictable</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 2: Local Intelligence */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">2. Local Insights: Navigating the Holy City</h2>
        
        <ul className="list-disc pl-6 space-y-4 mb-6">
          <li><strong>The Raiwala Bottleneck:</strong> The Raiwala junction is where pilgrim buses from Haridwar merge onto our route. During the Char Dham Yatra (April-June), this creates massive congestion. We strictly advise weekday travel during these months.</li>
          <li><strong>The "Saat More" Descent:</strong> Just before entering Rishikesh, there are seven sharp curves descending toward the river. Our drivers navigate this section with muscle memory, ensuring a smooth ride even in the rain.</li>
          <li><strong>Timing the Rafting Slots:</strong> If your goal is river rafting, operators book up early. A <strong>7:00 AM sharp departure</strong> from Dehradun is strictly advised so we can secure your slot before the weekend rush arrives from Delhi.</li>
        </ul>

        <div className="bg-[#2A1F00] p-6 rounded-xl border border-[#F7941D]/30">
          <h3 className="text-lg font-bold text-[#F7941D] mb-2">⚠️ Critical Update: Laxman Jhula is Closed</h3>
          <p className="text-white/75 text-sm">
            Many tourists arrive expecting to walk across the iconic Laxman Jhula bridge, only to find out it has been closed for public crossing due to safety and structural work. Do not worry—our drivers will take you directly to <strong>Ram Jhula</strong>, which offers the exact same walking experience, river views, and ashram access.
          </p>
        </div>
      </section>

      {/* SECTION 3: Stopovers */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">3. Recommended Highway Stopovers</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#1A1A1A] p-5 border rounded-lg shadow-sm">
            <h4 className="font-bold text-[#F7941D] mb-2">📍 Punj Di Lassi (Doiwala)</h4>
            <p className="text-sm">About 30 minutes into the journey. Famous for thick, authentic lassi and fresh paranthas. A perfect, quick refreshment stop before entering the spiritual zone.</p>
          </div>
          <div className="bg-[#1A1A1A] p-5 border rounded-lg shadow-sm">
            <h4 className="font-bold text-[#F7941D] mb-2">📍 Song River Bank Viewpoint</h4>
            <p className="text-sm">A brief, natural 5-minute stop near Raiwala where the road meets the river. Step out, feel the cool river breeze, and realize you have officially entered the Himalayan foothills.</p>
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
              <span className="text-white/60">Excellent for 1-4 passengers. Because Rishikesh has incredibly narrow inner lanes near the ghats, a nimble Sedan is often the fastest and easiest way to reach your specific hotel or ashram.</span>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-3">🚙</span>
            <div>
              <strong className="block text-lg">SUV (Innova Crysta, Ertiga) - Premium Choice</strong>
              <span className="text-white/60">Highly recommended for families, elderly passengers, or groups with heavy luggage. The Innova offers superior dignity, legroom, and a smooth ride over the rougher patches near the riverside.</span>
            </div>
          </li>
        </ul>
      </section>

      {/* SECTION 5: Destination Insights */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">5. Destination Guide: The Real Rishikesh</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white">Triveni Ghat (Morning) vs. Parmarth Niketan (Evening)</h3>
            <p className="text-white/70">Most tourists visit Triveni Ghat at noon and miss its magic. If you want profound stillness, ask us for a 6:00 AM drop. For the famous evening Ganga Aarti, we will ensure you are seated at Parmarth Niketan by 5:30 PM before the crowds overwhelm the ashram.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">The Insider Tip: The Beatles Ashram</h3>
            <p className="text-white/70">Looking for something unique? Ask our driver to drop you at the <strong>Chaurasi Kutia (Beatles Ashram)</strong>. It is a fascinating, graffiti-covered ruin in the jungle where the band stayed in 1968. It requires an entry fee but offers a completely different vibe from the crowded temples.</p>
          </div>
        </div>
      </section>

      {/* SECTION 6: Pricing Transparency */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">6. Transparent Fare Breakdown</h2>
        
        <div className="bg-[#0A1F12] p-6 rounded-lg border border-emerald-500/25 mb-6">
          <h3 className="font-bold text-emerald-400 mb-3">What is INCLUDED in your quote:</h3>
          <ul className="list-disc pl-5 space-y-1 text-white/75">
            <li>Base fare covering vehicle, driver time, and commercial fuel.</li>
            <li>Driver's allowance.</li>
            <li>Full Air Conditioning (Since this is a flat valley route, we run the AC continuously for your comfort).</li>
          </ul>
          <h3 className="font-bold text-red-400 mt-4 mb-2">What is NOT included (Paid via Actuals):</h3>
          <ul className="list-disc pl-5 space-y-1 text-white/70">
            <li>NH-7 Highway Toll (~₹60–80).</li>
            <li>Paid parking at Ram Jhula / Ghats (Police strictly enforce No-Parking zones; we use official paid lots to protect your trip from delays).</li>
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
            <h4 className="font-bold text-lg">Q: Is river rafting safe, and when does it close?</h4>
            <p className="text-white/70">A: Yes, it is highly safe with government-approved operators who provide life jackets and helmets. However, rafting is strictly closed during the monsoon season (July to September) due to dangerous water levels.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg">Q: Will the Innova drop us directly at our hotel on the riverbank?</h4>
            <p className="text-white/70">A: We will drop you as close as legally possible. Many lanes in Tapovan and near the ghats are too narrow for SUVs, or are designated pedestrian-only zones. In these cases, we drop you at the designated parking area where hotel porters can assist you.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg">Q: Can we do a same-day return trip to Rishikesh?</h4>
            <p className="text-white/70">A: Absolutely. With a mandatory 7:00 AM start from Dehradun, you can comfortably explore Ram Jhula, attend the evening Ganga Aarti, and be back on the highway by 6:30 PM for a smooth return home.</p>
          </div>
        </div>
      </section>

    </article>
  );
}
