import React from 'react';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';

export default function DehradunToDhanaultiContent() {
  return (
    <article className="prose prose-lg max-w-none text-left text-gray-800">
  <div className="sr-only" aria-hidden="false">
  <GEOAnswerBox
    question="What is the taxi fare from Dehradun to Dhanaulti?"
    answer="A taxi from Dehradun to Dhanaulti costs ₹2,000 for a Sedan and ₹2,800 for an SUV with Uttarakhand Cab 24/7. The 60 km mountain route via Mussoorie takes approximately 2.5 hours. Experienced hill drivers, fixed fares, 24/7 available. Book via WhatsApp: +91 92589 12169."
    facts={[
        { label: 'Distance', value: '60 km' },
        { label: 'Duration', value: '2.5 hrs' },
        { label: 'Sedan', value: '₹2,000' },
        { label: 'SUV', value: '₹2,800' },
    ]}
    source="Uttarakhand Cab 24/7 — Updated June 2026"
  />
  </div>

      
      {/* SECTION 1: Route Overview */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">1. The Route: Two Destinations, One Journey</h2>
        <p className="mb-4">
          The 60km journey from Dehradun to Dhanaulti via Mussoorie is a classic Himalayan climb. The road demands respect, local knowledge, and an understanding of seasonal weather shifts. Here is the exact breakdown of the route our drivers navigate daily.
        </p>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">The Primary Route</h3>
        <p className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500 mb-6">
          <strong>Dehradun Clock Tower → Rajpur Road → Kolhukhet → Bhatta Fall Junction → Library Chowk (Mussoorie) → Suakholi → Dhanaulti</strong><br/>
          <em>Total Distance:</em> ~60 km (35km to Mussoorie + 25km to Dhanaulti).
        </p>

        <h3 className="text-xl font-bold text-gray-800 mb-3">Honest Travel Time Estimates</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-[#1A1A1A] border border-white/10 shadow-sm rounded-lg text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b font-semibold text-gray-700">Driving Condition</th>
                <th className="py-3 px-4 border-b font-semibold text-gray-700">Dehradun to Mussoorie</th>
                <th className="py-3 px-4 border-b font-semibold text-gray-700">Mussoorie to Dhanaulti</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4 border-b">Normal Weekday (7-8 AM start)</td>
                <td className="py-3 px-4 border-b font-medium text-green-600">1.0 – 1.25 Hours</td>
                <td className="py-3 px-4 border-b font-medium text-green-600">45 – 55 Mins</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-3 px-4 border-b">Weekend / Peak Season</td>
                <td className="py-3 px-4 border-b text-orange-600">1.5 – 2.5 Hours</td>
                <td className="py-3 px-4 border-b text-orange-600">1.0 – 1.5 Hours</td>
              </tr>
              <tr className="bg-red-50">
                <td className="py-3 px-4 border-b">Monsoon / Heavy Fog</td>
                <td className="py-3 px-4 border-b font-bold text-red-600">2.0 – 3.0 Hours</td>
                <td className="py-3 px-4 border-b font-bold text-red-600">1.5 – 2.0 Hours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 2: Local Intelligence */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">2. Local Insights: Avoiding the Bottlenecks</h2>
        
        <ul className="list-disc pl-6 space-y-4 mb-6">
          <li><strong>The Rajpur Road Trap:</strong> On weekends, the Dehradun city exit via Rajpur Road can cost you 45 minutes of bumper-to-bumper traffic. We strongly advise departing before 7:00 AM to beat the rush.</li>
          <li><strong>Mussoorie Mall Road Reality:</strong> Private taxis are highly restricted on Mall Road during peak hours. Tourists expecting a door-to-door hotel drop on the Mall are often surprised. We will drop you at Library Chowk or Masonic Lodge, just a 5-minute walk to the center.</li>
          <li><strong>The Alternate "Vikasnagar" Route:</strong> During severe monsoon cloudbursts when the main Kolhukhet highway is breached, our drivers are trained to use the 80km Vikasnagar-Nainbagh route to get you safely to Dhanaulti without touching Mussoorie.</li>
        </ul>

        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
          <h3 className="text-lg font-bold text-yellow-800 mb-2">⚠️ The Truth About AC in the Hills</h3>
          <p className="text-yellow-900 text-sm">
            Once we cross Rajpur and the steep hairpins begin, our drivers will occasionally turn off the Air Conditioning. <strong>This is not a vehicle fault; it is proper hill-driving practice.</strong> The engine requires maximum torque on steep gradients, and the AC compressor adds heavy load. At 7,000+ feet, the natural air is cold and refreshing anyway!
          </p>
        </div>
      </section>

      {/* SECTION 3: Stopovers */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">3. Recommended Highway Stopovers</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#1A1A1A] p-5 border rounded-lg shadow-sm">
            <h4 className="font-bold text-blue-700 mb-2">📍 First Gear Café (Rajpur Road)</h4>
            <p className="text-sm">The last flat-road stop before the climb. Perfect for a quick coffee and a washroom break before the winding hairpins begin.</p>
          </div>
          <div className="bg-[#1A1A1A] p-5 border rounded-lg shadow-sm">
            <h4 className="font-bold text-blue-700 mb-2">📍 Bhatta Falls Viewpoint</h4>
            <p className="text-sm">About an hour into the journey. Step out, feel the sudden temperature drop, grab some roasted corn, and take your first Himalayan photos safely.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: Fleet Selection */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">4. Which Cab Should You Book?</h2>
        
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="text-2xl mr-3">🚕</span>
            <div>
              <strong className="block text-lg">Sedan (Swift Dzire, Honda Amaze)</strong>
              <span className="text-gray-600">Suitable for a day trip to Mussoorie with 1-3 passengers and light bags. However, we do not recommend sedans for Dhanaulti overnight trips with heavy luggage, as the engine feels stressed on the final ridge climbs.</span>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-3">🚙</span>
            <div>
              <strong className="block text-lg">SUV (Innova Crysta, Ertiga) - Highly Recommended</strong>
              <span className="text-gray-600">The supreme choice. The superior ground clearance easily handles broken monsoon patches, and the engine torque effortlessly conquers the steep ascents to Dhanaulti with 6 passengers and full luggage.</span>
            </div>
          </li>
        </ul>
      </section>

      {/* SECTION 5: Destination Insights */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">5. Destination Guide: Mussoorie & Dhanaulti</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Mussoorie's Hidden Gem: Landour</h3>
            <p className="text-gray-700">Skip the crowded Kempty Falls. Ask our driver to take you up to <strong>Landour and Char Dukan</strong>. It is the highest point in Mussoorie, featuring quiet British-era cottages, 1800s bakeries, and stunning views of the Kedarnath peaks on a clear winter day.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Dhanaulti: The Silent Forest</h3>
            <p className="text-gray-700">Dhanaulti is often 4-6°C colder than Mussoorie. Visit the Eco Park for peaceful walks through cedar forests, or ask us about the drive further up to <strong>Kanatal</strong> for ultra-remote, apple-orchard silence.</p>
          </div>
        </div>
      </section>

      {/* SECTION 6: Pricing Transparency */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">6. Transparent Fare Breakdown</h2>
        
        <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-6">
          <h3 className="font-bold text-green-800 mb-3">What is INCLUDED in your quote:</h3>
          <ul className="list-disc pl-5 space-y-1 text-green-900">
            <li>Base fare covering vehicle, fuel, and time.</li>
            <li>Driver's allowance (food and rest expenses).</li>
          </ul>
          <h3 className="font-bold text-red-800 mt-4 mb-2">What is NOT included (Paid via Actuals):</h3>
          <ul className="list-disc pl-5 space-y-1 text-red-900">
            <li>Dehradun-Mussoorie route tolls (~₹60 one way).</li>
            <li>Mussoorie/Dhanaulti paid parking charges.</li>
          </ul>
        </div>
        
        <p className="font-medium text-lg text-blue-900 border-l-4 border-blue-600 pl-4 py-2 bg-blue-50">
          "Sahi safar sahi service aur vo safar hamari zimmedaari."
        </p>
      </section>

      {/* SECTION 7: FAQs */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">7. Customer FAQs (Straight from our WhatsApp)</h2>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-lg">Q: Will we see snow in Dhanaulti?</h4>
            <p className="text-gray-700">A: While Mussoorie rarely gets heavy snow, Dhanaulti frequently does between December and February. It is not guaranteed, but a winter trip gives you a 70-80% chance of a winter wonderland.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg">Q: Can we do Mussoorie and Dhanaulti in a single day?</h4>
            <p className="text-gray-700">A: Yes, but a 7:00 AM sharp departure from Dehradun is strictly mandatory. This allows you to beat traffic, see Mussoorie in the morning, reach Dhanaulti by noon, and return safely before the evening mountain fog sets in.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg">Q: Is it safe to drive to Dhanaulti at night?</h4>
            <p className="text-gray-700">A: We strongly advise against night driving on the Mussoorie-Dhanaulti ridge road. There are no streetlights, and fog can reduce visibility to zero in minutes. Your safety is our absolute priority.</p>
          </div>
        </div>
      </section>

    </article>
  );
}
