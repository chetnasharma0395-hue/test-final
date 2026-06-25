/**
 * CENTRALIZED VEHICLE COMPARISON DATA
 * Single source of truth for /compare/[slug] pages.
 *
 * To add a new comparison page later:
 *   1. Add a new entry to COMPARISONS below with a unique `slug`.
 *   2. Create app/compare/[your-slug]/page.tsx that imports getComparison(slug)
 *      and renders it using the shared comparison page pattern established by
 *      app/compare/innova-crysta-vs-ertiga/page.tsx (copy that file as a
 *      starting template — swap the slug and metadata).
 *
 * Each comparison is independent of route/vehicle data drift because vehicle
 * specs are pulled live from lib/vehicleData.ts via getVehicle() at render
 * time — only the qualitative verdict text and FAQs live in this file.
 */

import { VehicleSlug } from './vehicleData';

export interface ComparisonDimension {
  label: string;
  /** Short verdict per vehicle, in the same order as the comparison's `vehicles` tuple */
  values: [string, string];
  /** Optional winner: 0 or 1 (index into the vehicles tuple), or null for "depends" */
  winner: 0 | 1 | null;
}

export interface ComparisonFAQ {
  question: string;
  answer: string;
}

export interface VehicleComparison {
  slug: string;
  /** The two vehicles being compared, as VehicleSlug keys into vehicleData.ts */
  vehicles: [VehicleSlug, VehicleSlug];
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  dimensions: ComparisonDimension[];
  verdict: string;
  faqs: ComparisonFAQ[];
}

export const COMPARISONS: Record<string, VehicleComparison> = {
  'innova-crysta-vs-ertiga': {
    slug: 'innova-crysta-vs-ertiga',
    vehicles: ['innova-crysta', 'ertiga'],
    title: 'Innova Crysta vs Ertiga',
    metaTitle: 'Innova Crysta vs Ertiga — Which Taxi Should You Book? | Uttarakhand Cab 24/7',
    metaDescription: 'Innova Crysta vs Ertiga compared on seating, luggage, ground clearance, and pricing for Uttarakhand routes. Find out which vehicle suits your family trip or Char Dham Yatra.',
    intro: 'Both the Innova Crysta and Ertiga are popular SUV choices for travel across Uttarakhand, but they suit different trips. Here\u2019s a direct, dimension-by-dimension comparison to help you choose the right one for your group size, route, and budget.',
    dimensions: [
      { label: 'Seating Capacity', values: ['7 passengers', '6 passengers'], winner: 0 },
      { label: 'Luggage Space', values: ['4 large + 2 cabin bags', '3 large + 2 cabin bags'], winner: 0 },
      { label: 'Ground Clearance / Mountain Roads', values: ['Higher — better for steep Char Dham routes', 'Good for moderate hill roads, less suited to very steep climbs'], winner: 0 },
      { label: 'Per-KM Outstation Rate', values: ['\u20b928 - \u20b935/km', '\u20b920 - \u20b925/km'], winner: 1 },
      { label: 'Best For', values: ['Char Dham Yatra, groups of 7, heavy luggage', 'Families of 5-6, moderate hill routes, better value'], winner: null },
      { label: 'AC', values: ['Dual-zone AC', 'Dual-zone AC'], winner: null },
    ],
    verdict: 'If you\u2019re traveling to Kedarnath, Badrinath, or anywhere on the Char Dham circuit, or your group is 7 people with significant luggage, the Innova Crysta is the better choice for its ground clearance and capacity. If you\u2019re a family of 5-6 heading to Mussoorie, Rishikesh, Haridwar, or Nainital and want to keep costs down without sacrificing comfort, the Ertiga delivers excellent value.',
    faqs: [
      { question: 'Which is better for Char Dham Yatra, Innova Crysta or Ertiga?', answer: 'The Innova Crysta is generally the better choice for Char Dham Yatra due to its higher ground clearance and larger engine, which handle the steep, winding roads to Kedarnath and Badrinath more comfortably than the Ertiga. The Ertiga remains a capable option for shorter, less steep legs of the journey.' },
      { question: 'Is the Ertiga cheaper than the Innova Crysta?', answer: 'Yes. The Ertiga\u2019s per-km outstation rate (\u20b920-25/km) is lower than the Innova Crysta\u2019s (\u20b928-35/km), making it the more economical choice for families who don\u2019t need the extra seat or ground clearance.' },
      { question: 'Which seats more people, Innova Crysta or Ertiga?', answer: 'The Innova Crysta seats 7 passengers compared to the Ertiga\u2019s 6, making the Innova Crysta the better fit for larger families or groups.' },
      { question: 'Which has more luggage space, Innova Crysta or Ertiga?', answer: 'The Innova Crysta offers more luggage capacity (approximately 4 large bags plus 2 cabin bags) compared to the Ertiga (approximately 3 large bags plus 2 cabin bags), making it better suited to multi-day trips with heavier packing.' },
      { question: 'Is the Ertiga good enough for Mussoorie or Nainital?', answer: 'Yes. The Ertiga handles moderate hill routes like Mussoorie, Rishikesh, Haridwar, and Nainital comfortably and is a popular, more economical choice for these destinations compared to the Innova Crysta.' },
    ],
  },
};

export function getComparison(slug: string): VehicleComparison {
  const comparison = COMPARISONS[slug];
  if (!comparison) {
    throw new Error(`Comparison slug "${slug}" not found in COMPARISONS`);
  }
  return comparison;
}

export function getAllComparisons(): VehicleComparison[] {
  return Object.values(COMPARISONS);
}
