import React from 'react';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';

export default function DehradunToBadrinathContent() {
  return (
    <article className="prose prose-lg max-w-none text-left text-gray-800">
  <div className="sr-only" aria-hidden="false">
  <GEOAnswerBox
    question="How much does a taxi from Dehradun to Badrinath cost?"
    answer="A taxi from Dehradun to Badrinath costs ₹8,500 for a Sedan and ₹10,500 for an SUV with Uttarakhand Cab 24/7. The 320 km journey takes 10–11 hours via Rishikesh, Devprayag, and Joshimath. Fares are fixed with no hidden charges. Book via WhatsApp: +91 92589 12169."
    facts={[
        { label: 'Distance', value: '320 km' },
        { label: 'Duration', value: '10–11 hrs' },
        { label: 'Sedan', value: '₹8,500' },
        { label: 'SUV', value: '₹10,500' },
    ]}
    source="Uttarakhand Cab 24/7 — Updated June 2026"
  />
  </div>

      
      {/* SECTION 1: Route Overview */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">1. The Holy Route: Dehradun to Badrinath</h2>
        <p className="mb-4">
          The 340km journey to Badrinath Dham is a spectacular drive along the Alaknanda River. Unlike Kedarnath, you can drive directly to the Badrinath temple, but the extreme altitude and mountain terrain require an experienced driver and a sturdy SUV.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500 mb-6">
          <strong>Route: Dehradun → Rishikesh → Srinagar → Rudraprayag → Karnaprayag → Joshimath → Badrinath</strong>
        </div>
      </section>

      {/* SECTION 2: Local Intelligence */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">2. Yatra Insights: What Google Won't Tell You</h2>
        
        <ul className="list-disc pl-6 space-y-4 mb-6">
          <li><strong>The 2-Day Strategy:</strong> While technically possible in one day, a 14-hour mountain drive is exhausting. We highly recommend breaking the journey with an overnight halt in Srinagar or Pipalkoti.</li>
          <li><strong>Joshimath Gate Timings:</strong> The final 45km from Joshimath to Badrinath is managed by strict one-way traffic gates. Our drivers time the journey perfectly so you aren't left waiting at the checkpoint for hours.</li>
          <li><strong>Mana Village:</strong> Don't just visit the temple! We include a complimentary drive 3km further to Mana, India's last village before the Tibetan border, where you can see the Vyas Gufa and Saraswati River.</li>
        </ul>

        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
          <h3 className="text-lg font-bold text-yellow-800 mb-2">⚠️ The SUV Requirement</h3>
          <p className="text-yellow-900 text-sm">
            We strictly deploy SUVs (Innova Crysta, Ertiga) for the Badrinath route. The road features high-altitude water crossings (like the famous Pagal Nala) and rough patches where sedans risk undercarriage damage and passenger discomfort.
          </p>
        </div>
      </section>

      {/* SECTION 3: Stopovers */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">3. Strategic Pause Points</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#1A1A1A] p-5 border rounded-lg shadow-sm">
            <h4 className="font-bold text-blue-700 mb-2">📍 Devprayag (The Sangam)</h4>
            <p className="text-sm">The holy confluence of the Alaknanda and Bhagirathi rivers. A perfect morning stop for photography and breakfast.</p>
          </div>
          <div className="bg-[#1A1A1A] p-5 border rounded-lg shadow-sm">
            <h4 className="font-bold text-blue-700 mb-2">📍 Karnaprayag</h4>
            <p className="text-sm">A major junction town in the hills, ideal for lunch and stretching your legs before the final ascent towards Joshimath.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: Pricing Transparency */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">4. Transparent Fare Breakdown</h2>
        
        <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-6">
          <h3 className="font-bold text-green-800 mb-3">What is INCLUDED in your Yatra Package:</h3>
          <ul className="list-disc pl-5 space-y-1 text-green-900">
            <li>Premium SUV Vehicle, fuel, and time.</li>
            <li>Driver's daily allowance and overnight stay expenses.</li>
            <li>All State Permits and Highway Tolls.</li>
            <li>Yatra Registration Assistance if required.</li>
          </ul>
        </div>
        
        <p className="font-medium text-lg text-blue-900 border-l-4 border-blue-600 pl-4 py-2 bg-blue-50">
          "Sahi safar sahi service aur vo safar hamari zimmedaari."
        </p>
      </section>

    </article>
  );
}
