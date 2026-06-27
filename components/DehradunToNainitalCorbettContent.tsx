import React from 'react';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';

export default function DehradunToNainitalCorbettContent() {
  return (
    <article className="max-w-none text-left text-white/80">
  <div className="sr-only" aria-hidden="false">
  <GEOAnswerBox
    question="What is the taxi fare from Dehradun to Nainital and Jim Corbett?"
    answer="A taxi from Dehradun to Nainital costs ₹4,000 (Sedan) / ₹5,500 (SUV). Dehradun to Jim Corbett (Ramnagar) costs ₹3,500 (Sedan) / ₹4,500 (SUV) with Uttarakhand Cab 24/7. Fixed fares, experienced drivers, 24/7 service. Book via WhatsApp: +91 92589 12169."
    facts={[
        { label: 'Nainital Sedan', value: '₹4,000' },
        { label: 'Corbett Sedan', value: '₹3,500' },
        { label: 'Nainital', value: '5–6 hrs' },
        { label: 'Corbett', value: '5–6 hrs' },
    ]}
    source="Uttarakhand Cab 24/7 — Updated June 2026"
  />
  </div>

      
      {/* SECTION 1: Route Overview */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">1. The Route: Understanding the Kumaon Gateway</h2>
        <p className="mb-4">
          Traveling from Dehradun into the Kumaon region is a beautiful but long journey through the plains of Uttar Pradesh before hitting the foothills again. The most important thing to understand: <strong>Jim Corbett and Nainital are two different trips.</strong> They are 65km apart on different roads.
        </p>
        
        {/* Visual Aid for geographical understanding */}
        <div className="my-8 flex justify-center">
          
        </div>

        <h3 className="text-xl font-bold text-white mb-3 mt-6">The Primary Route</h3>
        <p className="bg-[#1A1A1A] p-4 rounded-lg border-l-4 border-[#F7941D] mb-6">
          <strong>Dehradun → Haridwar → Najibabad (UP) → Kashipur → Ramnagar (Jim Corbett) → Kaladhungi → Kathgodam → Nainital</strong><br/>
          <em>Distance to Corbett:</em> ~260 km.<br/>
          <em>Distance to Nainital:</em> ~320 km.
        </p>

        <h3 className="text-xl font-bold text-white mb-3">Honest Travel Time Estimates</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-[#1A1A1A] border border-white/10 shadow-sm rounded-lg text-left">
            <thead className="bg-white/5">
              <tr>
                <th className="py-3 px-4 border-b font-semibold text-white/70">Driving Condition</th>
                <th className="py-3 px-4 border-b font-semibold text-white/70">To Jim Corbett (Ramnagar)</th>
                <th className="py-3 px-4 border-b font-semibold text-white/70">To Nainital</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4 border-b">Normal Weekday (6:00 AM start)</td>
                <td className="py-3 px-4 border-b font-medium text-emerald-400">5.0 – 5.5 Hours</td>
                <td className="py-3 px-4 border-b font-medium text-emerald-400">6.5 – 7.0 Hours</td>
              </tr>
              <tr className="bg-white/3">
                <td className="py-3 px-4 border-b">Weekend / Peak Season</td>
                <td className="py-3 px-4 border-b text-[#F7941D]">6.5 – 7.5 Hours</td>
                <td className="py-3 px-4 border-b text-[#F7941D]">8.0 – 9.0 Hours</td>
              </tr>
              <tr className="bg-red-900/20">
                <td className="py-3 px-4 border-b">Monsoon / Heavy Rain</td>
                <td className="py-3 px-4 border-b font-bold text-red-400">7.0+ Hours</td>
                <td className="py-3 px-4 border-b font-bold text-red-400">9.0+ Hours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 2: Local Intelligence */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">2. Local Insights: The Highway Reality</h2>
        
        <ul className="list-disc pl-6 space-y-4 mb-6">
          <li><strong>The Uttar Pradesh Stretch:</strong> This route passes through UP towns like Najibabad and Kashipur. These are busy market towns with heavy local traffic. We strongly advise a <strong>5:30 AM – 6:30 AM departure</strong> from Dehradun to clear these towns before their morning rush begins.</li>
          <li><strong>The Nainital Hill Climb:</strong> The 35km ascent from Kathgodam to Nainital is winding and narrow. In peak season (May-June), traffic queues here can last for hours. A morning arrival at the base is critical.</li>
          <li><strong>Kanwar Yatra Warning:</strong> During July and August, the Haridwar-Najibabad stretch is a major route for Kanwar pilgrims. Traffic can come to a standstill. We deploy alternative routes via Moradabad during this window to ensure you aren't stranded.</li>
        </ul>

        <div className="bg-[#2A1F00] p-6 rounded-xl border border-[#F7941D]/30">
          <h3 className="text-lg font-bold text-[#F7941D] mb-2">⚠️ Night Driving Advisory</h3>
          <p className="text-white/75 text-sm">
            Driving to <strong>Jim Corbett</strong> at night is manageable on the flat highways. However, we <strong>do not recommend</strong> driving up the 35km hill to <strong>Nainital</strong> late at night. If your flight lands late, we suggest staying overnight in Kathgodam or Haldwani and climbing fresh in the morning for safety and better views.
          </p>
        </div>
      </section>

      {/* SECTION 3: Fleet Selection */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">3. Which Cab Should You Book?</h2>
        
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="text-2xl mr-3">🚕</span>
            <div>
              <strong className="block text-lg">Sedan (Swift Dzire, Honda Amaze)</strong>
              <span className="text-white/65">Adequate for Jim Corbett drops (as the route is flat), provided you have light luggage. We do <em>not</em> recommend sedans for Nainital trips due to the long hill climb and limited boot space for multi-day luggage.</span>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-3">🚙</span>
            <div>
              <strong className="block text-lg">SUV (Innova Crysta, Ertiga) - The Perfect Choice</strong>
              <span className="text-white/65">This route's ideal vehicle. The Innova's torque handles the UP highway cruising perfectly and conquers the 35km Nainital hill climb effortlessly, ensuring rear passengers remain comfortable and motion-sickness free.</span>
            </div>
          </li>
        </ul>
      </section>

      {/* SECTION 4: Destination Insights */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">4. Destination Guide: Corbett vs. Nainital</h2>
        
        <div className="space-y-6">
          <div className="bg-[#0A1F12] p-6 rounded-lg border border-emerald-500/25">
            <h3 className="text-xl font-bold text-emerald-400 mb-2">🐅 Jim Corbett National Park</h3>
            <ul className="list-disc pl-5 space-y-2 text-white/75 text-sm">
              <li><strong>Safari Reality:</strong> Safari bookings are separate from your taxi fare and must be done via the official forest portal. Book weeks in advance.</li>
              <li><strong>Monsoon Closure:</strong> The famous Dhikala Zone is closed from mid-June to mid-November. Plan your tiger spotting accordingly!</li>
            </ul>
          </div>
          
          <div className="bg-[#0A1220] p-6 rounded-lg border border-blue-400/25">
            <h3 className="text-xl font-bold text-[#F7941D] mb-2">🏔️ Nainital (The Lake City)</h3>
            <ul className="list-disc pl-5 space-y-2 text-white/75 text-sm">
              <li><strong>The Vehicle Ban:</strong> Private vehicles are restricted on Mall Road. We will drop you at the Tallital checkpoint, where you can easily walk or take a shared vehicle to your hotel.</li>
              <li><strong>Hidden Gem:</strong> Skip the crowded lake at noon. Ask our driver to take you to <strong>Khurpatal Lake</strong> (12km away) for absolute silence and pine forests.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 5: Pricing Transparency */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">5. Transparent Fare Breakdown</h2>
        
        <div className="bg-[#0A1F12] p-6 rounded-lg border border-emerald-500/25 mb-6">
          <h3 className="font-bold text-emerald-400 mb-3">What is INCLUDED in your quote:</h3>
          <ul className="list-disc pl-5 space-y-1 text-white/75">
            <li>Base fare covering vehicle, driver time, and commercial fuel.</li>
            <li><strong>Uttar Pradesh Inter-State Permit Fees</strong> (Crucial to avoid border delays at Kashipur).</li>
            <li>Haridwar/NH Highway Tolls.</li>
          </ul>
          <h3 className="font-bold text-red-400 mt-4 mb-2">What is NOT included (Paid via Actuals):</h3>
          <ul className="list-disc pl-5 space-y-1 text-white/65">
            <li>Nainital Tourist Vehicle Entry Fee / Parking at Tallital.</li>
            <li>Corbett Safari Jeeps & Permits.</li>
          </ul>
        </div>
        
        <p className="font-medium text-lg text-white/80 border-l-4 border-[#F7941D] pl-4 py-2 bg-[#1A1209]">
          "Sahi safar sahi service aur vo safar hamari zimmedaari."
        </p>
      </section>

      {/* SECTION 6: FAQs */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">6. Customer FAQs (Straight from our WhatsApp)</h2>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-lg">Q: Can we do both Jim Corbett and Nainital in a single day?</h4>
            <p className="text-white/70">A: Technically yes, but we highly discourage it. Doing a morning safari in Ramnagar and then driving 65km up the hill to Nainital leaves you exhausted. We recommend dedicating at least 2-3 days for this combo trip.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg">Q: Are there any border issues entering Uttar Pradesh?</h4>
            <p className="text-white/70">A: No. Because we use strictly commercial, fully-permitted vehicles, our cars carry the necessary UP state entry permits. Your journey will not be delayed at border checkposts.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg">Q: Will the Innova drop us right at our hotel door on Mall Road in Nainital?</h4>
            <p className="text-white/70">A: Nainital administration restricts large vehicles from entering Mall Road during most hours. We will drop you safely at the Tallital or Mallital taxi points, where hotel staff or local porters will assist you the short distance to your door.</p>
          </div>
        </div>
      </section>

    </article>
  );
}
