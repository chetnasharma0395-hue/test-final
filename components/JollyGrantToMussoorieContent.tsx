import React from 'react';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';

export default function JollyGrantToMussoorieContent() {
  return (
    <article className="max-w-none text-left text-white/80">
  <div className="sr-only" aria-hidden="false">
  <GEOAnswerBox
    question="What is the taxi fare from Jolly Grant Airport to Mussoorie?"
    answer="A taxi from Jolly Grant Airport (Dehradun) to Mussoorie costs ₹3,000 for a Sedan and ₹4,000 for an SUV with Uttarakhand Cab 24/7. The 60 km mountain drive takes approximately 2 hours. Driver tracks your flight and waits at arrivals with a name board. Book via WhatsApp: +91 92589 12169."
    facts={[
        { label: 'Distance', value: '60 km' },
        { label: 'Duration', value: '2 hrs' },
        { label: 'Sedan', value: '₹3,000' },
        { label: 'SUV', value: '₹4,000' },
    ]}
    source="Uttarakhand Cab 24/7 — Updated June 2026"
  />
  </div>

      
      {/* SECTION 1: Route Overview */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">1. The Route & Real Road Conditions</h2>
        <p className="mb-4">
          The 60km journey from Jolly Grant Airport to Mussoorie is a tale of two completely different roads. The first half is a flat, fast sprint to the base of the Himalayas. The second half is a 22km winding ascent that demands absolute driving precision. 
        </p>
        
        <h3 className="text-xl font-bold text-white mb-3 mt-6">The Primary Route</h3>
        <p className="bg-[#1A1A1A] p-4 rounded-lg border-l-4 border-blue-400/50 mb-6">
          <strong>Airport → Doiwala → Dehradun City → Rajpur Road → Library Chowk, Mussoorie</strong><br/>
          <em>Total Distance:</em> ~60–65 km.
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
                <td className="py-3 px-4 border-b font-medium text-emerald-400">1.5 – 2.0 Hours</td>
              </tr>
              <tr className="bg-[#1A1A1A]">
                <td className="py-3 px-4 border-b">Weekend / Peak Season (May-June)</td>
                <td className="py-3 px-4 border-b text-[#F7941D]">2.5 – 3.5 Hours</td>
              </tr>
              <tr className="bg-red-900/20">
                <td className="py-3 px-4 border-b">Long Weekend or Holiday Rush</td>
                <td className="py-3 px-4 border-b font-bold text-red-400">4.0+ Hours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 2: Local Intelligence */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">2. Local Insights: The 22km Hill Climb</h2>
        
        <ul className="list-disc pl-6 space-y-4 mb-6">
          <li><strong>The Airport Meet & Greet:</strong> Jolly Grant is a small, efficient airport. Your driver will track your flight number, account for delays, and meet you directly outside the arrival gate.</li>
          <li><strong>Dehradun City Traffic:</strong> Depending on the time of day, navigating past the Clock Tower and Rajpur Road can be slow. Our drivers know the Gandhi Road shortcuts to bypass peak traffic.</li>
          <li><strong>The 22km Ascent:</strong> The road from Rajpur up to Mussoorie is steep, narrow, and filled with blind hairpins. This is not the time to rely on an app-based driver who rarely drives in the hills. Local expertise is mandatory here.</li>
        </ul>

        <div className="bg-[#2A1F00] p-6 rounded-xl border border-[#F7941D]/30">
          <h3 className="text-lg font-bold text-[#F7941D] mb-2">⚠️ The Motion Sickness Advisory</h3>
          <p className="text-white/75 text-sm">
            If any passenger is prone to motion sickness, <strong>please take your medication at Rajpur Village</strong> (the base of the hill). Taking it halfway up the winding road is usually too late. Our drivers are happy to make a quick 5-minute stop at the base for you to prepare for the climb.
          </p>
        </div>
      </section>

      {/* SECTION 3: Stopovers */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">3. Strategic Pause Points</h2>
        <p className="mb-4">Since this is a relatively short trip, full meal stops aren't usually necessary, but we recommend these strategic breaks:</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#1A1A1A] p-5 border rounded-lg shadow-sm">
            <h4 className="font-bold text-blue-300 mb-2">📍 Rajpur Village (Base of the Hill)</h4>
            <p className="text-sm">The last chance to stretch your legs and grab a quick juice before the 45-minute winding ascent begins.</p>
          </div>
          <div className="bg-[#1A1A1A] p-5 border rounded-lg shadow-sm">
            <h4 className="font-bold text-blue-300 mb-2">📍 Jharipani / Midway Viewpoints</h4>
            <p className="text-sm">If you need fresh air during the climb, our drivers know the exact safe spots to pull over for a stunning view of the Doon valley below.</p>
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
              <span className="text-white/60">Excellent for 1-3 passengers with light luggage. We turn off the AC during steep sections of the hill climb to ensure the engine has maximum climbing power.</span>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-3">🚙</span>
            <div>
              <strong className="block text-lg">SUV (Innova Crysta, Ertiga) - Highly Recommended</strong>
              <span className="text-white/60">The supreme choice for 4+ passengers, families, or those prone to motion sickness. The Innova's higher seating position and superior suspension make the winding hill road significantly more comfortable.</span>
            </div>
          </li>
        </ul>
      </section>

      {/* SECTION 5: Destination Insights */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">5. Arriving in Mussoorie (The "Queen of Hills")</h2>
        <p className="mb-4">Mussoorie is not a single location; it is a 15km ridge. Where you go matters.</p>
        
        <div className="bg-[#0A1220] p-6 rounded-lg border border-blue-400/25 mb-6">
          <h3 className="font-bold text-blue-400 mb-3">Local Tips from Our Drivers:</h3>
          <ul className="list-disc pl-5 space-y-2 text-white/80 text-sm">
            <li><strong>The One-Way Trap:</strong> Mall Road has strict one-way timings. Our drivers know exactly which entry gate (Library or Picture Palace) to use to get you to your hotel without doing a frustrating 30-minute loop.</li>
            <li><strong>Beyond Mall Road:</strong> Most tourists stop at the crowded Kempty Falls. Ask your driver about the quiet, historic charm of the <strong>Landour / Char Dukan</strong> area for the "real" Mussoorie experience.</li>
          </ul>
        </div>
      </section>

      {/* SECTION 6: Pricing Transparency */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">6. Transparent Fare Breakdown</h2>
        
        <div className="bg-[#0A1F12] p-6 rounded-lg border border-emerald-500/25 mb-6">
          <h3 className="font-bold text-emerald-400 mb-3">What is INCLUDED in your quote:</h3>
          <ul className="list-disc pl-5 space-y-1 text-white/75">
            <li>Flight tracking and Airport "Meet & Greet" wait time.</li>
            <li>Driver's allowance and commercial fuel.</li>
            <li><strong>The Mussoorie Tourist Entry Gate Toll</strong> (We handle this so you have no surprises upon arrival).</li>
          </ul>
          <p className="mt-4 text-sm text-emerald-400">
            <em>Note: Paid parking directly at your hotel on Mall Road is the only cost not included in the base fare.</em>
          </p>
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
            <h4 className="font-bold text-lg">Q: My flight lands at 10 PM. Is it safe to drive to Mussoorie at night?</h4>
            <p className="text-white/70">A: Yes, night arrivals are actually the fastest and smoothest journeys because Dehradun city traffic is gone. Our drivers are hill-certified and familiar with driving the Mussoorie road safely in the dark.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg">Q: What happens if my flight is delayed by 2 hours?</h4>
            <p className="text-white/70">A: We track your flight number in real-time using radar apps. If your flight is delayed, our driver adjusts their arrival time accordingly. You will not be charged extra for airline delays.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg">Q: Why should I book an Innova if a Dzire is cheaper?</h4>
            <p className="text-white/70">A: For 2 people with light bags, a Dzire is perfect. However, if you have 4 people or heavy luggage, the Innova's powerful engine, heavy suspension, and larger cabin space make the 22km hairpin ascent vastly more comfortable.</p>
          </div>
        </div>
      </section>

    </article>
  );
}
