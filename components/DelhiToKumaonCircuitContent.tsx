import React from 'react';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';

export default function DelhiToKumaonCircuitContent() {
  return (
    <article className="prose prose-lg prose-invert max-w-none text-left text-white/80">
  <div className="sr-only" aria-hidden="false">
  <GEOAnswerBox
    question="What is the taxi fare from Delhi to Nainital and Kumaon circuit?"
    answer="A taxi from Delhi to Nainital costs ₹5,500 (Sedan) / ₹7,000 (SUV) with Uttarakhand Cab 24/7. Full Kumaon circuit packages covering Nainital, Mukteshwar, Kausani, and Ranikhet start at ₹14,000 for 3 days. Fixed fares, 24/7 available. Book via WhatsApp: +91 92589 12169."
    facts={[
        { label: 'Delhi-Nainital', value: '₹5,500' },
        { label: 'Circuit Pkg', value: '₹14,000' },
        { label: 'Duration', value: '5–6 hrs' },
        { label: 'Circuit', value: '3–5 days' },
    ]}
    source="Uttarakhand Cab 24/7 — Updated June 2026"
  />
  </div>

      
      {/* SECTION 1: Route Overview */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">1. The Kumaon Circuit: Beyond Just Nainital</h2>
        <p className="mb-4">
          Most travelers from Delhi stop at Nainital. But the true magic of Uttarakhand lies further up in the Kumaon hills—through the apple orchards of Mukteshwar, the pristine military roads of Ranikhet, and the panoramic sunrise views of Kausani. This is a multi-day expedition, not a simple taxi drop.
        </p>
        
        <h3 className="text-xl font-bold text-white mb-3 mt-6">The Primary Circuit Route</h3>
        <p className="bg-white/5 p-4 rounded-lg border-l-4 border-[#F7941D] mb-6 text-sm text-white/80">
          <strong>Leg 1:</strong> Delhi → Moradabad → Haldwani → Nainital (310 km, ~7–8 hrs)<br/>
          <strong>Leg 2:</strong> Nainital → Bhowali → Mukteshwar (51 km, ~1.5 hrs)<br/>
          <strong>Leg 3:</strong> Mukteshwar → Khairna → Ranikhet (60 km, ~2 hrs)<br/>
          <strong>Leg 4:</strong> Ranikhet → Almora → Kausani (102 km, ~3.5 hrs)<br/>
          <em>Total Circuit Distance:</em> ~520–540 km.
        </p>

        <div className="bg-yellow-500/10 p-6 rounded-xl border border-yellow-500/30">
          <h3 className="text-lg font-bold text-yellow-400 mb-2">⚠️ The Delhi Departure Rule</h3>
          <p className="text-white/80 text-sm">
            To survive this journey without losing your sanity to traffic, a <strong>4:30 AM to 5:00 AM departure from Delhi is strictly mandatory</strong>. This ensures you clear Ghaziabad before the trucks enter, bypass Moradabad before the city wakes up, and reach the Nainital hills by 1:00 PM for lunch.
          </p>
        </div>
      </section>

      {/* SECTION 2: Local Intelligence & Driving Reality */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">2. Local Insights: What Google Maps Hides</h2>
        
        <ul className="list-disc pl-6 space-y-4 mb-6 text-white/80">
          <li><strong>The Nainital Vehicle Ban:</strong> During peak seasons (Oct-Nov, May-June), Nainital Mall Road is closed to vehicles after 9:00 AM. Our SUVs will drop you safely at Tallital or Mallital, but please confirm your hotel's exact location beforehand, as you may need to walk the final stretch.</li>
          <li><strong>The "Secret" Mukteshwar Road:</strong> The drive from Mukteshwar to Ranikhet via Khairna is considered the best mountain road on the circuit—smooth, canopy-covered, with a river running alongside. It is a driver's favorite.</li>
          <li><strong>No Night Driving in the High Kumaon:</strong> We strictly halt all driving beyond Nainital after 6:00 PM. The roads to Mukteshwar and Kausani have zero streetlights, frequent fog, and active wildlife (including leopards) after dusk.</li>
        </ul>
      </section>

      {/* SECTION 3: Fleet Selection */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">3. Why an SUV is Non-Negotiable</h2>
        
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="text-2xl mr-3">❌</span>
            <div>
              <strong className="block text-lg text-white">Sedans (Dzire, Amaze) - Not Recommended for the Full Circuit</strong>
              <span className="text-white/60">A sedan is fine if you are only going to Nainital. However, if your itinerary includes the steep 2,286m climb to Mukteshwar or the narrow Kausani roads, a loaded sedan engine will struggle, and low ground clearance becomes a liability.</span>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-3">🚙</span>
            <div>
              <strong className="block text-lg text-white">SUV (Innova Crysta, Ertiga) - The Required Standard</strong>
              <span className="text-white/60">The Innova Crysta is the undisputed king of the Kumaon circuit. It offers the torque required for the steep Mukteshwar ascents, the braking power needed for the hairpins, and the cabin space to keep 6 passengers comfortable over a 5-day tour.</span>
            </div>
          </li>
        </ul>

        <div className="bg-[#F7941D]/10 p-4 rounded-lg border-l-4 border-[#F7941D] mt-6 text-sm text-white/80">
          <strong>The Truth About AC in the Hills:</strong> The AC will run continuously from Delhi to Haldwani. Once we begin the climb to Nainital, our drivers will turn the AC off. This is to ensure the engine has maximum power for the steep gradients. At 6,000+ feet, the natural Himalayan air is far superior anyway!
        </div>
      </section>

      {/* SECTION 4: Destination Highlights */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">4. Kumaon Highlights: Sell the Experience</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white">Mukteshwar (The Sleeper Hit)</h3>
            <p className="text-white/70">At 2,286m, Mukteshwar sits higher than Nainital. It offers stunning apple orchards and the terrifyingly beautiful <strong>Chauli Ki Jali</strong> cliff walk. It is quieter, colder, and has a much higher chance of winter snow than Nainital.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Ranikhet (The Military Pristine)</h3>
            <p className="text-white/70">A cantonment town with immaculate roads, zero traffic, and one of India's highest golf courses. Ask our driver to take you to the <strong>Chaubatia Orchards</strong> in season, where you can pluck fresh fruit right off the trees.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Kausani (The Sunrise Panorama)</h3>
            <p className="text-white/70">Mahatma Gandhi called it the "Switzerland of India." The entire reason to visit Kausani is the 6:00 AM sunrise view of the Trishul and Nanda Devi peaks. Make sure you book an east-facing room, and do not sleep through the dawn!</p>
          </div>
        </div>
      </section>

      {/* SECTION 5: Pricing Transparency */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">5. Transparent Fare Breakdown</h2>
        
        <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/30 mb-6">
          <h3 className="font-bold text-green-400 mb-3">What is INCLUDED in your Kumaon Package:</h3>
          <ul className="list-disc pl-5 space-y-1 text-white/80">
            <li>Premium SUV Vehicle, fuel, and dedicated driver for the entire circuit.</li>
            <li>Uttarakhand State Entry / Green Tax (~₹700-900).</li>
            <li>All NH9 Highway Tolls (Delhi to Haldwani).</li>
          </ul>
          <h3 className="font-bold text-red-400 mt-4 mb-2">What is NOT included (Paid via Actuals):</h3>
          <ul className="list-disc pl-5 space-y-1 text-white/80">
            <li>Nainital Mall Road Parking fees (~₹100-200/day).</li>
            <li>Driver's food and accommodation (Standard industry practice for multi-day tours, though we can roll this into a master quote if preferred).</li>
          </ul>
        </div>
        
        <p className="font-medium text-lg text-white border-l-4 border-[#F7941D] pl-4 py-2 bg-[#F7941D]/10">
          &quot;Sahi safar sahi service aur vo safar hamari zimmedaari.&quot;
        </p>
      </section>

      {/* SECTION 6: FAQs */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-2">6. Customer FAQs (Straight from our WhatsApp)</h2>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-lg text-white">Q: Can we drive from Nainital directly to Kausani in one day?</h4>
            <p className="text-white/70">A: While the distance is only 170km, it takes 5 to 6 hours on mountain roads. While technically possible if you leave early, we highly recommend breaking the journey with a night stay in Mukteshwar or Ranikhet so you can actually enjoy the scenery instead of just rushing through it.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white">Q: Will we see snow?</h4>
            <p className="text-white/70">A: Between December and February, Mukteshwar and Kausani frequently receive snow. Mukteshwar gets significantly more snow than Nainital due to its higher altitude. If snow is your priority, plan to spend two nights in Mukteshwar.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white">Q: Are your drivers experienced in the high hills?</h4>
            <p className="text-white/70">A: Absolutely. We do not send Delhi-based city drivers on the Kumaon circuit. All our drivers have a minimum of 5 years of dedicated hill-driving experience and know the specific diversion zones, local Dhabas, and hidden viewpoints across the entire circuit.</p>
          </div>
        </div>
      </section>

    </article>
  );
}
