/**
 * data/programmatic-routes.ts
 *
 * Single source of truth for the PROGRAMMATIC route layer that lives under /taxi/.
 * This is deliberately separate from:
 *   - lib/priceData.ts        (fixed fares for premium editorial routes)
 *   - data/routes.json        (the /services/[slug] pillar pages)
 *   - the hand-built root-level editorial route pages (e.g. /dehradun-to-nainital)
 *
 * Every record here renders one page at /taxi/{originKey}-to-{destinationKey}.
 *
 * INVARIANT: slug === `${originKey}-to-${destinationKey}` (enforced by isValidRoute).
 *
 * Each record MUST carry genuinely unique data (distance, travel time, fares,
 * pickup info, route highlights, FAQs). The validation guardrail in
 * lib/route-helpers.ts (isValidRoute) rejects thin/boilerplate records so they
 * never reach generateStaticParams.
 */

import type { VehicleSlug } from '@/lib/vehicleData';

export type RouteTier = 'A' | 'B' | 'C';

export type RouteCategory =
  | 'plains-source'
  | 'ncr-subcity'
  | 'gateway-hub'
  | 'hill-circuit';

export interface RouteFare {
  /** Fixed sedan fare in INR, or null when quote-on-request. */
  sedan: number | null;
  /** Fixed SUV fare in INR, or null when quote-on-request. */
  suv: number | null;
  /** Fixed tempo traveller fare in INR, or null when quote-on-request. */
  tempo: number | null;
}

export interface RouteFAQ {
  question: string;
  answer: string;
}

export interface ProgrammaticRoute {
  /** MUST equal `${originKey}-to-${destinationKey}`. */
  slug: string;
  /** Lowercase origin key, used for /taxi/from/{originKey} hub linking. */
  originKey: string;
  /** Lowercase destination key, used for /taxi/to/{destinationKey} hub linking. */
  destinationKey: string;
  /** Display name of the origin, e.g. "Noida". */
  origin: string;
  /** Display name of the destination, e.g. "Nainital". */
  destination: string;

  tier: RouteTier;
  category: RouteCategory;

  /** Seasonal destinations keep their URL permanently live; only content/freq changes. */
  seasonal: boolean;
  /** Required when seasonal is true, e.g. "Apr\u2013Nov". */
  openWindow?: string;

  // ---- Unique route data (validation-enforced) ----
  /** One-way road distance in km. */
  distanceKm: number;
  /** Human travel time, e.g. "7.5 \u2013 8 hours". */
  travelTime: string;
  fare: RouteFare;
  /** Origin-specific, unique pickup information (>80 chars). */
  pickupInfo: string;
  /** 3\u20135 unique waypoints / landmarks along the corridor. */
  routeHighlights: string[];
  /** Minimum 4 unique question/answer pairs. */
  faqs: RouteFAQ[];
  /** Best season/time to travel this route. */
  bestTimeToTravel: string;
  /** Recommended fleet vehicle slug (must exist in lib/vehicleData.ts). */
  recommendedVehicle: VehicleSlug;

  // ---- Internal-link anchors ----
  /** Existing editorial pillar page to link up to, e.g. "/nainital". */
  editorialParent: string;
  /** Optional related blog guide. */
  blogLink?: string;
}

/**
 * The programmatic route dataset.
 * Phase 2 = NCR sub-city routes (24). Phases 3\u20136 are appended in later work.
 *
 * Corridor geography used for realistic, non-duplicated data:
 *  - Garhwal-bound (Dehradun, Mussoorie, Rishikesh, Haridwar): NCR \u2192 Meerut \u2192
 *    Muzaffarnagar \u2192 Roorkee \u2192 (Mohand ghat for Dehradun/Mussoorie).
 *  - Kumaon-bound (Nainital, Jim Corbett): NCR \u2192 Hapur \u2192 Moradabad \u2192
 *    Rampur \u2192 (Kaladhungi for Nainital / Ramnagar for Corbett).
 *  - Distance ordering by origin proximity to Uttarakhand:
 *    Ghaziabad (closest) < Noida < Faridabad < Gurugram (farthest).
 */
export const PROGRAMMATIC_ROUTES: ProgrammaticRoute[] = [
  // ===================== NOIDA =====================
  {
    slug: 'noida-to-dehradun',
    originKey: 'noida', destinationKey: 'dehradun',
    origin: 'Noida', destination: 'Dehradun',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 270, travelTime: '5.5 \u2013 6.5 hours',
    fare: { sedan: 5500, suv: 7000, tempo: null },
    bestTimeToTravel: 'September to April; early-morning start to clear NCR traffic',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Doorstep pickup across Noida and Greater Noida \u2014 from Sector 18, Pari Chowk, the Expressway sectors, and Noida Extension. Drivers reach the Meerut Expressway within minutes for a fast plains run to Dehradun.',
    routeHighlights: [
      'Delhi\u2013Meerut Expressway exit straight out of Noida for a quick getaway',
      'Muzaffarnagar and Roorkee highway stretch with clean refreshment stops',
      'Cheetal Grand near Khatauli \u2014 the classic mid-journey breakfast halt',
      'Mohand forest ghat marking the climb into the Doon valley',
    ],
    faqs: [
      { question: 'How long does Noida to Dehradun take by taxi?', answer: 'The 270 km journey takes about 5.5 to 6.5 hours via the Delhi\u2013Meerut Expressway and Roorkee, depending on your departure time and the Mohand ghat traffic.' },
      { question: 'What is the taxi fare from Noida to Dehradun?', answer: 'A sedan is \u20b95,500 and an SUV \u20b97,000 one-way. The fare is fixed and all-inclusive of fuel and driver allowance.' },
      { question: 'Is night travel available on this route?', answer: 'Yes. The Noida to Dehradun route is largely expressway and national highway, so overnight departures are available and avoid daytime NCR congestion.' },
      { question: 'Are tolls extra on Noida to Dehradun?', answer: 'Our quoted fixed fare is all-inclusive \u2014 fuel and driver allowance are covered. Expressway and highway tolls are included unless stated otherwise at booking.' },
    ],
    editorialParent: '/dehradun',
  },
  {
    slug: 'noida-to-haridwar',
    originKey: 'noida', destinationKey: 'haridwar',
    origin: 'Noida', destination: 'Haridwar',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 240, travelTime: '5 \u2013 6 hours',
    fare: { sedan: 5000, suv: 6500, tempo: null },
    bestTimeToTravel: 'October to March; avoid Kanwar Yatra season (July) for clear roads',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Pickup anywhere in Noida and Greater Noida, including Sector 62, the Film City belt, and Noida Extension. The route joins the Meerut Expressway and runs via Roorkee to the temple ghats of Haridwar.',
    routeHighlights: [
      'Delhi\u2013Meerut Expressway for a rapid exit from the NCR',
      'Roorkee and the IIT town stretch before entering Uttarakhand',
      'Bharat Mata Mandir and the approach to Har Ki Pauri',
      'Riverside drop points near the main Haridwar ghats',
    ],
    faqs: [
      { question: 'How long does Noida to Haridwar take?', answer: 'About 5 to 6 hours for the 240 km drive via the Meerut Expressway and Roorkee, slightly longer during festival and Kanwar season.' },
      { question: 'What is included in the Noida to Haridwar fare?', answer: 'The fixed fare covers the vehicle, fuel, and driver allowance. A sedan is \u20b95,000 and an SUV \u20b96,500 one-way.' },
      { question: 'Can the driver drop us directly at Har Ki Pauri?', answer: 'Drivers drop you as close to Har Ki Pauri as vehicle access allows; during peak aarti hours the final stretch is pedestrian-only, so drop is at the nearest permitted point.' },
      { question: 'Are tolls and parking extra?', answer: 'Highway tolls are included in the fixed fare. Any temple-area parking, if required, is nominal and confirmed at booking.' },
    ],
    editorialParent: '/haridwar',
  },
  {
    slug: 'noida-to-rishikesh',
    originKey: 'noida', destinationKey: 'rishikesh',
    origin: 'Noida', destination: 'Rishikesh',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 260, travelTime: '5.5 \u2013 6.5 hours',
    fare: { sedan: 5300, suv: 6800, tempo: null },
    bestTimeToTravel: 'September to November and February to April for rafting season',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Doorstep pickup from all Noida sectors and Greater Noida, including the Expressway corridor. The route runs via the Meerut Expressway and Haridwar before reaching the ashram belt and rafting camps of Rishikesh.',
    routeHighlights: [
      'Delhi\u2013Meerut Expressway and Muzaffarnagar bypass',
      'Haridwar crossing before the final Rishikesh leg',
      'Triveni Ghat and the Ram Jhula / Laxman Jhula ashram area',
      'Shivpuri rafting base-camp drop on request',
    ],
    faqs: [
      { question: 'How long is the Noida to Rishikesh taxi journey?', answer: 'Around 5.5 to 6.5 hours for 260 km via the Meerut Expressway and Haridwar.' },
      { question: 'Can you drop us at a rafting camp in Shivpuri?', answer: 'Yes. We regularly drop rafting groups at Shivpuri and Brahmpuri camps and can carry gear; mention it at booking so we assign the right vehicle.' },
      { question: 'Is night travel available to Rishikesh?', answer: 'Yes, overnight departures are available; the highway portion is well-lit and drivers are experienced on the Haridwar\u2013Rishikesh stretch.' },
      { question: 'What is included in the fare?', answer: 'Fuel, driver allowance, and highway tolls are included in the fixed fare \u2014 \u20b95,300 sedan, \u20b96,800 SUV one-way.' },
    ],
    editorialParent: '/rishikesh',
  },
  {
    slug: 'noida-to-mussoorie',
    originKey: 'noida', destinationKey: 'mussoorie',
    origin: 'Noida', destination: 'Mussoorie',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 305, travelTime: '7 \u2013 8 hours',
    fare: { sedan: 6500, suv: 8000, tempo: null },
    bestTimeToTravel: 'March to June for summer escape; December for snow',
    recommendedVehicle: 'ertiga',
    pickupInfo: 'Pickup across Noida and Greater Noida. After the Meerut Expressway and Dehradun, the route climbs the 35 km hill road to Mussoorie, so an Ertiga or larger SUV is recommended for the ascent and luggage.',
    routeHighlights: [
      'Delhi\u2013Meerut Expressway and Roorkee plains run',
      'Mohand ghat into the Doon valley',
      'Dehradun bypass and the Kempty Falls approach road',
      'Gun Hill and Mall Road drop points in Mussoorie',
    ],
    faqs: [
      { question: 'How long does Noida to Mussoorie take?', answer: 'Roughly 7 to 8 hours for 305 km \u2014 about 6 hours to Dehradun plus the 1\u20131.5 hour hill climb to Mussoorie.' },
      { question: 'Which car is best from Noida to Mussoorie?', answer: 'For the hill ascent we recommend an Ertiga for families or an Innova Crysta for extra comfort and luggage; a sedan is fine for 2\u20133 light travellers.' },
      { question: 'Are there Mall Road vehicle restrictions?', answer: 'Yes, Mussoorie restricts vehicle entry near Mall Road during peak hours; the driver drops you at the nearest permitted point and coordinates with your hotel.' },
      { question: 'Are tolls extra from Noida to Mussoorie?', answer: 'No \u2014 tolls, fuel and driver allowance are all included in the fixed fare of \u20b96,500 (sedan) or \u20b98,000 (SUV).' },
    ],
    editorialParent: '/mussoorie',
  },
  {
    slug: 'noida-to-nainital',
    originKey: 'noida', destinationKey: 'nainital',
    origin: 'Noida', destination: 'Nainital',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 300, travelTime: '7 \u2013 8 hours',
    fare: { sedan: 6500, suv: 8200, tempo: null },
    bestTimeToTravel: 'March to June and September to November; December\u2013February for snow',
    recommendedVehicle: 'innova-crysta',
    pickupInfo: 'Doorstep pickup from Noida and Greater Noida. The Kumaon-bound route runs via Hapur, Moradabad and Rampur, then climbs from Kaladhungi to Nainital \u2014 an Innova Crysta is recommended for the long run and hill bends.',
    routeHighlights: [
      'Hapur and Moradabad highway corridor out of the NCR',
      'Rampur and the Kumaon plains approach',
      'Kaladhungi \u2014 Jim Corbett\u2019s former home and gateway to the hills',
      'Naini Lake and Mall Road drop in Nainital',
    ],
    faqs: [
      { question: 'How long does Noida to Nainital take by taxi?', answer: 'About 7 to 8 hours for 300 km via Moradabad and Kaladhungi, including the final hill climb.' },
      { question: 'Which car is best from Noida to Nainital?', answer: 'An Innova Crysta is best for this long Kumaon route \u2014 it handles the Kaladhungi hill bends comfortably and has room for luggage. Ertiga is a good value alternative for smaller families.' },
      { question: 'Can we stop at Jim Corbett on the way?', answer: 'Yes. The Kaladhungi route passes close to the Corbett belt, so a short stop or a Corbett-then-Nainital itinerary is easy to arrange.' },
      { question: 'Are tolls and the fare all-inclusive?', answer: 'Yes \u2014 \u20b96,500 sedan or \u20b98,200 SUV covers fuel, driver allowance and tolls. Nainital parking, if needed, is nominal.' },
    ],
    editorialParent: '/nainital',
  },
  {
    slug: 'noida-to-jim-corbett',
    originKey: 'noida', destinationKey: 'jim-corbett',
    origin: 'Noida', destination: 'Jim Corbett',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 255, travelTime: '5.5 \u2013 6.5 hours',
    fare: { sedan: 5500, suv: 7000, tempo: null },
    bestTimeToTravel: 'November to June; core zones best November to mid-June',
    recommendedVehicle: 'ertiga',
    pickupInfo: 'Pickup across Noida and Greater Noida. The route runs via Hapur, Moradabad and Rampur to Ramnagar, the gateway to Jim Corbett \u2014 an Ertiga suits the resort approach roads and safari luggage.',
    routeHighlights: [
      'Hapur\u2013Moradabad highway corridor',
      'Rampur and the approach to the Kosi river belt',
      'Ramnagar \u2014 the main entry town for Corbett safari zones',
      'Resort drops near Dhikuli and the Kosi riverside',
    ],
    faqs: [
      { question: 'How long does Noida to Jim Corbett take?', answer: 'Around 5.5 to 6.5 hours for 255 km via Moradabad and Rampur to Ramnagar.' },
      { question: 'Which vehicle is best for a Corbett trip?', answer: 'An Ertiga or Innova Crysta is ideal \u2014 enough room for safari gear and comfortable on the resort approach roads. Sedans are fine for couples.' },
      { question: 'Can the taxi take us to the safari gate?', answer: 'The taxi drops you at your resort or the relevant zone gate (Bijrani, Dhikala, Jhirna); the actual safari inside the park uses authorised Gypsies only.' },
      { question: 'What is included in the fare?', answer: 'Fuel, driver allowance and tolls are included \u2014 \u20b95,500 sedan or \u20b97,000 SUV one-way.' },
    ],
    editorialParent: '/jim-corbett',
  },

  // ===================== GURUGRAM =====================
  {
    slug: 'gurugram-to-dehradun',
    originKey: 'gurugram', destinationKey: 'dehradun',
    origin: 'Gurugram', destination: 'Dehradun',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 290, travelTime: '6 \u2013 7 hours',
    fare: { sedan: 6000, suv: 7500, tempo: null },
    bestTimeToTravel: 'September to April; pre-dawn start to clear the NCR perimeter',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Doorstep pickup from Cyber City, Sohna Road, Golf Course Road, and all Gurugram sectors. The route crosses the NCR to join the Meerut Expressway, then runs via Roorkee and the Mohand ghat into Dehradun.',
    routeHighlights: [
      'KMP / Delhi crossing to reach the Meerut Expressway',
      'Muzaffarnagar and Roorkee national highway stretch',
      'Cheetal Grand breakfast halt near Khatauli',
      'Mohand forest ghat climb into the Doon valley',
    ],
    faqs: [
      { question: 'How long does Gurugram to Dehradun take?', answer: 'About 6 to 7 hours for 290 km \u2014 slightly longer than other NCR cities because of the cross-Delhi stretch before the Meerut Expressway.' },
      { question: 'What is the taxi fare from Gurugram to Dehradun?', answer: 'A sedan is \u20b96,000 and an SUV \u20b97,500 one-way, fixed and all-inclusive.' },
      { question: 'Is an early-morning departure better from Gurugram?', answer: 'Yes \u2014 a pre-dawn start clears the Gurugram\u2013Delhi perimeter before peak traffic and gets you to Dehradun by early afternoon.' },
      { question: 'Are tolls extra?', answer: 'No, all tolls plus fuel and driver allowance are included in the fixed fare.' },
    ],
    editorialParent: '/dehradun',
  },
  {
    slug: 'gurugram-to-haridwar',
    originKey: 'gurugram', destinationKey: 'haridwar',
    origin: 'Gurugram', destination: 'Haridwar',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 265, travelTime: '5.5 \u2013 6.5 hours',
    fare: { sedan: 5500, suv: 7000, tempo: null },
    bestTimeToTravel: 'October to March; avoid the July Kanwar Yatra window',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Pickup from Cyber City, Sohna Road, MG Road, and all Gurugram sectors. After crossing into the NCR highway network the route runs via Meerut and Roorkee to the ghats of Haridwar.',
    routeHighlights: [
      'Cross-Delhi link to the Meerut Expressway',
      'Roorkee and the Uttarakhand border crossing',
      'Chandi Devi and Mansa Devi temple hills on approach',
      'Drop near Har Ki Pauri at the nearest permitted point',
    ],
    faqs: [
      { question: 'How long does Gurugram to Haridwar take?', answer: 'About 5.5 to 6.5 hours for 265 km via Meerut and Roorkee.' },
      { question: 'What is included in the Gurugram to Haridwar fare?', answer: 'The fixed fare \u2014 \u20b95,500 sedan, \u20b97,000 SUV \u2014 includes fuel, driver allowance and tolls.' },
      { question: 'Can we visit Mansa Devi on arrival?', answer: 'Yes, the driver can drop you at the Mansa Devi ropeway base; let us know so the schedule allows time before your onward plans.' },
      { question: 'Is night travel available?', answer: 'Yes, overnight departures are available on this highway-dominated route.' },
    ],
    editorialParent: '/haridwar',
  },
  {
    slug: 'gurugram-to-rishikesh',
    originKey: 'gurugram', destinationKey: 'rishikesh',
    origin: 'Gurugram', destination: 'Rishikesh',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 285, travelTime: '6 \u2013 7 hours',
    fare: { sedan: 5800, suv: 7300, tempo: null },
    bestTimeToTravel: 'September to November and February to April for rafting and yoga season',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Doorstep pickup from Cyber City, Sohna Road, Golf Course Extension, and all Gurugram sectors. The route runs via Meerut and Haridwar to the ashram belt and rafting camps of Rishikesh.',
    routeHighlights: [
      'Cross-Delhi link onto the Meerut Expressway',
      'Haridwar crossing before the Rishikesh leg',
      'Ram Jhula, Laxman Jhula and Parmarth Niketan ashram area',
      'Tapovan and Shivpuri rafting-camp drops on request',
    ],
    faqs: [
      { question: 'How long does Gurugram to Rishikesh take?', answer: 'Around 6 to 7 hours for 285 km via Meerut and Haridwar.' },
      { question: 'Which car is best from Gurugram to Rishikesh?', answer: 'A sedan is comfortable for this mostly-highway route; choose an Ertiga or Innova for families or if carrying rafting and yoga-retreat luggage.' },
      { question: 'Can you drop at a yoga ashram in Tapovan?', answer: 'Yes \u2014 we regularly drop guests at Tapovan and Swarg Ashram; share the ashram name at booking for the closest permitted drop.' },
      { question: 'Are tolls extra from Gurugram?', answer: 'No, tolls, fuel and driver allowance are included in the fixed fare of \u20b95,800 sedan or \u20b97,300 SUV.' },
    ],
    editorialParent: '/rishikesh',
  },
  {
    slug: 'gurugram-to-mussoorie',
    originKey: 'gurugram', destinationKey: 'mussoorie',
    origin: 'Gurugram', destination: 'Mussoorie',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 325, travelTime: '7.5 \u2013 8.5 hours',
    fare: { sedan: 7000, suv: 8800, tempo: null },
    bestTimeToTravel: 'March to June for the summer season; December for snow',
    recommendedVehicle: 'innova-crysta',
    pickupInfo: 'Pickup from Cyber City, Sohna Road, and all Gurugram sectors. This is the longest NCR run to Mussoorie, so an Innova Crysta is recommended for comfort over the cross-Delhi stretch and the final hill climb.',
    routeHighlights: [
      'Cross-Delhi link to the Meerut Expressway',
      'Roorkee plains and the Mohand ghat',
      'Dehradun bypass and Kempty Falls approach',
      'Library and Mall Road drop points in Mussoorie',
    ],
    faqs: [
      { question: 'How long does Gurugram to Mussoorie take?', answer: 'About 7.5 to 8.5 hours for 325 km \u2014 the longest NCR origin for Mussoorie due to the cross-Delhi leg plus the hill climb.' },
      { question: 'Which car is best from Gurugram to Mussoorie?', answer: 'An Innova Crysta is the best choice for this long hill route; an Ertiga works for smaller families on a tighter budget.' },
      { question: 'Should we break the journey?', answer: 'Many travellers do an early start and reach by evening; for a relaxed trip you can halt overnight in Dehradun and finish the short hill climb fresh the next morning.' },
      { question: 'What is included in the fare?', answer: 'Fuel, driver allowance and tolls are all included \u2014 \u20b97,000 sedan or \u20b98,800 SUV one-way.' },
    ],
    editorialParent: '/mussoorie',
  },
  {
    slug: 'gurugram-to-nainital',
    originKey: 'gurugram', destinationKey: 'nainital',
    origin: 'Gurugram', destination: 'Nainital',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 330, travelTime: '7.5 \u2013 8.5 hours',
    fare: { sedan: 7000, suv: 9000, tempo: null },
    bestTimeToTravel: 'March to June and September to November; snow in December\u2013February',
    recommendedVehicle: 'innova-crysta',
    pickupInfo: 'Doorstep pickup from Cyber City, Sohna Road, and all Gurugram sectors. The Kumaon route crosses the NCR to Hapur, then runs via Moradabad and Rampur, climbing from Kaladhungi to Nainital \u2014 an Innova Crysta is recommended.',
    routeHighlights: [
      'Cross-Delhi link to the Hapur\u2013Moradabad corridor',
      'Rampur and the Kumaon plains approach',
      'Kaladhungi hill gateway into Kumaon',
      'Naini Lake, Mall Road and Tallital drop points',
    ],
    faqs: [
      { question: 'How long does Gurugram to Nainital take?', answer: 'About 7.5 to 8.5 hours for 330 km via Moradabad and Kaladhungi, the longest NCR origin for Nainital.' },
      { question: 'Which car is best from Gurugram to Nainital?', answer: 'An Innova Crysta is best for this long Kumaon route; it is comfortable on the Kaladhungi bends and roomy for luggage.' },
      { question: 'Is night travel available to Nainital?', answer: 'The plains stretch can be driven overnight, but the final Kaladhungi hill climb is best done in daylight, so we usually time arrival for the morning.' },
      { question: 'Are tolls extra?', answer: 'No, the fixed fare of \u20b97,000 sedan or \u20b99,000 SUV includes tolls, fuel and driver allowance.' },
    ],
    editorialParent: '/nainital',
  },
  {
    slug: 'gurugram-to-jim-corbett',
    originKey: 'gurugram', destinationKey: 'jim-corbett',
    origin: 'Gurugram', destination: 'Jim Corbett',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 285, travelTime: '6 \u2013 7 hours',
    fare: { sedan: 6000, suv: 7500, tempo: null },
    bestTimeToTravel: 'November to June; core safari zones mid-November to mid-June',
    recommendedVehicle: 'ertiga',
    pickupInfo: 'Pickup from Cyber City, Sohna Road, Golf Course Road, and all Gurugram sectors. The route crosses to Hapur and runs via Moradabad and Rampur to Ramnagar \u2014 an Ertiga suits resort roads and safari luggage.',
    routeHighlights: [
      'Cross-Delhi link to the Hapur\u2013Moradabad corridor',
      'Rampur and the Kosi river approach',
      'Ramnagar gateway town for Corbett safari zones',
      'Dhikuli and Kosi-riverside resort drops',
    ],
    faqs: [
      { question: 'How long does Gurugram to Jim Corbett take?', answer: 'Around 6 to 7 hours for 285 km via Moradabad and Rampur to Ramnagar.' },
      { question: 'Which vehicle is best for Corbett from Gurugram?', answer: 'An Ertiga or Innova Crysta is ideal for safari luggage and resort approach roads; a sedan suits couples.' },
      { question: 'Does the taxi enter the national park?', answer: 'No \u2014 the taxi drops you at your resort or zone gate; safaris inside the park use authorised Gypsies only.' },
      { question: 'What is included in the fare?', answer: 'The fixed fare of \u20b96,000 sedan or \u20b97,500 SUV includes fuel, driver allowance and tolls.' },
    ],
    editorialParent: '/jim-corbett',
  },

  // ===================== GHAZIABAD =====================
  {
    slug: 'ghaziabad-to-dehradun',
    originKey: 'ghaziabad', destinationKey: 'dehradun',
    origin: 'Ghaziabad', destination: 'Dehradun',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 250, travelTime: '5 \u2013 6 hours',
    fare: { sedan: 5200, suv: 6700, tempo: null },
    bestTimeToTravel: 'September to April; Ghaziabad is the quickest NCR start to the Doon valley',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Doorstep pickup from Indirapuram, Vaishali, Raj Nagar Extension, and Kaushambi. Ghaziabad sits closest to the Meerut Expressway, giving one of the fastest NCR runs to Dehradun via Roorkee and Mohand.',
    routeHighlights: [
      'Quick onramp to the Delhi\u2013Meerut Expressway from Indirapuram',
      'Muzaffarnagar and Roorkee highway stretch',
      'Cheetal Grand halt near Khatauli',
      'Mohand ghat climb into the Doon valley',
    ],
    faqs: [
      { question: 'How long does Ghaziabad to Dehradun take?', answer: 'About 5 to 6 hours for 250 km \u2014 the shortest NCR origin for Dehradun thanks to direct Meerut Expressway access.' },
      { question: 'What is the fare from Ghaziabad to Dehradun?', answer: 'A sedan is \u20b95,200 and an SUV \u20b96,700 one-way, fixed and all-inclusive.' },
      { question: 'Is night travel available?', answer: 'Yes \u2014 the expressway and highway make overnight departures from Ghaziabad convenient and traffic-free.' },
      { question: 'Are tolls extra?', answer: 'No, tolls, fuel and driver allowance are all included in the fixed fare.' },
    ],
    editorialParent: '/dehradun',
  },
  {
    slug: 'ghaziabad-to-haridwar',
    originKey: 'ghaziabad', destinationKey: 'haridwar',
    origin: 'Ghaziabad', destination: 'Haridwar',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 220, travelTime: '4.5 \u2013 5.5 hours',
    fare: { sedan: 4800, suv: 6200, tempo: null },
    bestTimeToTravel: 'October to March; avoid the July Kanwar Yatra surge',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Pickup from Indirapuram, Vaishali, Raj Nagar, and Kaushambi. With direct Meerut Expressway access, Ghaziabad offers the shortest NCR run to Haridwar via Roorkee.',
    routeHighlights: [
      'Direct Meerut Expressway onramp',
      'Roorkee and the Uttarakhand border',
      'Mansa Devi hill on the Haridwar approach',
      'Drop near Har Ki Pauri at the nearest permitted point',
    ],
    faqs: [
      { question: 'How long does Ghaziabad to Haridwar take?', answer: 'About 4.5 to 5.5 hours for 220 km \u2014 the shortest NCR origin for Haridwar.' },
      { question: 'What is included in the fare?', answer: 'The fixed fare \u2014 \u20b94,800 sedan, \u20b96,200 SUV \u2014 includes fuel, driver allowance and tolls.' },
      { question: 'Can the driver drop us at Har Ki Pauri?', answer: 'As close as vehicle access allows; during aarti hours the final stretch is pedestrian-only and drop is at the nearest point.' },
      { question: 'Are tolls extra?', answer: 'No, all highway tolls are included in the quoted fixed fare.' },
    ],
    editorialParent: '/haridwar',
  },
  {
    slug: 'ghaziabad-to-rishikesh',
    originKey: 'ghaziabad', destinationKey: 'rishikesh',
    origin: 'Ghaziabad', destination: 'Rishikesh',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 240, travelTime: '5 \u2013 6 hours',
    fare: { sedan: 5000, suv: 6500, tempo: null },
    bestTimeToTravel: 'September to November and February to April for rafting season',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Doorstep pickup from Indirapuram, Vaishali, Raj Nagar Extension, and Kaushambi. Direct Meerut Expressway access makes this one of the quickest NCR runs to Rishikesh via Haridwar.',
    routeHighlights: [
      'Direct Meerut Expressway onramp from Indirapuram',
      'Haridwar crossing before the Rishikesh leg',
      'Triveni Ghat and the Ram Jhula ashram belt',
      'Shivpuri rafting base-camp drop on request',
    ],
    faqs: [
      { question: 'How long does Ghaziabad to Rishikesh take?', answer: 'About 5 to 6 hours for 240 km via the Meerut Expressway and Haridwar.' },
      { question: 'Which car is best from Ghaziabad to Rishikesh?', answer: 'A sedan is comfortable for this highway route; pick an Ertiga or Innova for families or rafting gear.' },
      { question: 'Can you drop us at a rafting camp?', answer: 'Yes \u2014 we drop rafting groups at Shivpuri and Brahmpuri and can carry equipment; mention it at booking.' },
      { question: 'What is included in the fare?', answer: 'Fuel, driver allowance and tolls are included \u2014 \u20b95,000 sedan or \u20b96,500 SUV.' },
    ],
    editorialParent: '/rishikesh',
  },
  {
    slug: 'ghaziabad-to-mussoorie',
    originKey: 'ghaziabad', destinationKey: 'mussoorie',
    origin: 'Ghaziabad', destination: 'Mussoorie',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 285, travelTime: '6.5 \u2013 7.5 hours',
    fare: { sedan: 6200, suv: 7800, tempo: null },
    bestTimeToTravel: 'March to June for summer; December for snowfall',
    recommendedVehicle: 'ertiga',
    pickupInfo: 'Pickup from Indirapuram, Vaishali, and Raj Nagar. Direct Meerut Expressway access shortens the plains leg; an Ertiga is recommended for the 35 km hill climb from Dehradun to Mussoorie.',
    routeHighlights: [
      'Direct Meerut Expressway onramp',
      'Roorkee and the Mohand ghat',
      'Dehradun bypass and Kempty Falls approach',
      'Mall Road and Gun Hill drop points',
    ],
    faqs: [
      { question: 'How long does Ghaziabad to Mussoorie take?', answer: 'About 6.5 to 7.5 hours for 285 km \u2014 quicker than other NCR origins on the plains leg, plus the hill climb.' },
      { question: 'Which car is best from Ghaziabad to Mussoorie?', answer: 'An Ertiga for families or an Innova Crysta for extra comfort on the hill ascent; a sedan suits 2\u20133 light travellers.' },
      { question: 'Are there vehicle restrictions in Mussoorie?', answer: 'Yes, Mall Road has peak-hour entry limits; the driver drops you at the nearest permitted point.' },
      { question: 'Are tolls extra?', answer: 'No \u2014 \u20b96,200 sedan or \u20b97,800 SUV includes tolls, fuel and driver allowance.' },
    ],
    editorialParent: '/mussoorie',
  },
  {
    slug: 'ghaziabad-to-nainital',
    originKey: 'ghaziabad', destinationKey: 'nainital',
    origin: 'Ghaziabad', destination: 'Nainital',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 285, travelTime: '6.5 \u2013 7.5 hours',
    fare: { sedan: 6200, suv: 7900, tempo: null },
    bestTimeToTravel: 'March to June and September to November; December\u2013February for snow',
    recommendedVehicle: 'innova-crysta',
    pickupInfo: 'Doorstep pickup from Indirapuram, Vaishali, and Raj Nagar. The Kumaon route runs via Hapur, Moradabad and Rampur, then climbs from Kaladhungi to Nainital \u2014 an Innova Crysta is recommended for the bends.',
    routeHighlights: [
      'Hapur\u2013Moradabad corridor with a short NCR exit',
      'Rampur and the Kumaon plains approach',
      'Kaladhungi hill gateway',
      'Naini Lake and Mall Road drop',
    ],
    faqs: [
      { question: 'How long does Ghaziabad to Nainital take?', answer: 'About 6.5 to 7.5 hours for 285 km via Moradabad and Kaladhungi.' },
      { question: 'Which car is best from Ghaziabad to Nainital?', answer: 'An Innova Crysta is best for the long Kumaon route and hill bends; an Ertiga is a good value option.' },
      { question: 'Can we add a Jim Corbett stop?', answer: 'Yes \u2014 the Kaladhungi route passes near the Corbett belt, so a combined Corbett\u2013Nainital trip is easy.' },
      { question: 'What is included in the fare?', answer: 'Tolls, fuel and driver allowance are included \u2014 \u20b96,200 sedan or \u20b97,900 SUV.' },
    ],
    editorialParent: '/nainital',
  },
  {
    slug: 'ghaziabad-to-jim-corbett',
    originKey: 'ghaziabad', destinationKey: 'jim-corbett',
    origin: 'Ghaziabad', destination: 'Jim Corbett',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 235, travelTime: '5 \u2013 6 hours',
    fare: { sedan: 5200, suv: 6700, tempo: null },
    bestTimeToTravel: 'November to June; core zones mid-November to mid-June',
    recommendedVehicle: 'ertiga',
    pickupInfo: 'Pickup from Indirapuram, Vaishali, Raj Nagar, and Kaushambi. The route runs via Hapur, Moradabad and Rampur to Ramnagar \u2014 a short NCR exit makes this one of the quicker Corbett runs; an Ertiga suits safari luggage.',
    routeHighlights: [
      'Short NCR exit onto the Hapur\u2013Moradabad corridor',
      'Rampur and the Kosi river approach',
      'Ramnagar gateway town for Corbett zones',
      'Dhikuli and Kosi-riverside resort drops',
    ],
    faqs: [
      { question: 'How long does Ghaziabad to Jim Corbett take?', answer: 'About 5 to 6 hours for 235 km via Moradabad and Rampur to Ramnagar.' },
      { question: 'Which vehicle is best for Corbett?', answer: 'An Ertiga or Innova Crysta handles safari luggage and resort roads well; sedans suit couples.' },
      { question: 'Does the taxi go inside the park?', answer: 'No \u2014 it drops you at your resort or zone gate; in-park safaris use authorised Gypsies only.' },
      { question: 'Are tolls extra?', answer: 'No, \u20b95,200 sedan or \u20b96,700 SUV includes fuel, driver allowance and tolls.' },
    ],
    editorialParent: '/jim-corbett',
  },

  // ===================== FARIDABAD =====================
  {
    slug: 'faridabad-to-dehradun',
    originKey: 'faridabad', destinationKey: 'dehradun',
    origin: 'Faridabad', destination: 'Dehradun',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 285, travelTime: '6 \u2013 7 hours',
    fare: { sedan: 5900, suv: 7400, tempo: null },
    bestTimeToTravel: 'September to April; early start to clear the southern NCR',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Doorstep pickup from NIT Faridabad, the Sector belt, and Greater Faridabad (Neharpar). The route crosses the NCR to join the Meerut Expressway, then runs via Roorkee and the Mohand ghat into Dehradun.',
    routeHighlights: [
      'Cross-NCR link from southern Faridabad to the Meerut Expressway',
      'Muzaffarnagar and Roorkee highway run',
      'Cheetal Grand halt near Khatauli',
      'Mohand ghat into the Doon valley',
    ],
    faqs: [
      { question: 'How long does Faridabad to Dehradun take?', answer: 'About 6 to 7 hours for 285 km, including the cross-NCR leg before the Meerut Expressway.' },
      { question: 'What is the fare from Faridabad to Dehradun?', answer: 'A sedan is \u20b95,900 and an SUV \u20b97,400 one-way, fixed and all-inclusive.' },
      { question: 'Is an early-morning departure recommended?', answer: 'Yes \u2014 leaving early clears the southern NCR and the Delhi crossing before traffic builds.' },
      { question: 'Are tolls extra?', answer: 'No, tolls, fuel and driver allowance are all included in the fixed fare.' },
    ],
    editorialParent: '/dehradun',
  },
  {
    slug: 'faridabad-to-haridwar',
    originKey: 'faridabad', destinationKey: 'haridwar',
    origin: 'Faridabad', destination: 'Haridwar',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 255, travelTime: '5.5 \u2013 6.5 hours',
    fare: { sedan: 5400, suv: 6900, tempo: null },
    bestTimeToTravel: 'October to March; avoid the July Kanwar Yatra period',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Pickup from NIT Faridabad, the Sector areas, and Greater Faridabad. After crossing the NCR the route runs via Meerut and Roorkee to the temple ghats of Haridwar.',
    routeHighlights: [
      'Cross-NCR link to the Meerut Expressway',
      'Roorkee and the Uttarakhand border',
      'Chandi Devi hill on the Haridwar approach',
      'Drop near Har Ki Pauri at the nearest permitted point',
    ],
    faqs: [
      { question: 'How long does Faridabad to Haridwar take?', answer: 'About 5.5 to 6.5 hours for 255 km via Meerut and Roorkee.' },
      { question: 'What is included in the fare?', answer: 'The fixed fare \u2014 \u20b95,400 sedan, \u20b96,900 SUV \u2014 covers fuel, driver allowance and tolls.' },
      { question: 'Can we stop at Mansa Devi or Chandi Devi?', answer: 'Yes, the driver can drop you at either ropeway base; let us know so timing allows.' },
      { question: 'Is night travel available?', answer: 'Yes, overnight departures work well on this highway-dominated route.' },
    ],
    editorialParent: '/haridwar',
  },
  {
    slug: 'faridabad-to-rishikesh',
    originKey: 'faridabad', destinationKey: 'rishikesh',
    origin: 'Faridabad', destination: 'Rishikesh',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 275, travelTime: '6 \u2013 7 hours',
    fare: { sedan: 5700, suv: 7200, tempo: null },
    bestTimeToTravel: 'September to November and February to April for rafting and yoga season',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Doorstep pickup from NIT Faridabad, the Sector belt, and Greater Faridabad (Neharpar). The route crosses the NCR and runs via Meerut and Haridwar to the ashram belt of Rishikesh.',
    routeHighlights: [
      'Cross-NCR link to the Meerut Expressway',
      'Haridwar crossing before the Rishikesh leg',
      'Ram Jhula, Laxman Jhula and Parmarth Niketan',
      'Shivpuri and Tapovan drop points on request',
    ],
    faqs: [
      { question: 'How long does Faridabad to Rishikesh take?', answer: 'About 6 to 7 hours for 275 km via Meerut and Haridwar.' },
      { question: 'Which car is best from Faridabad to Rishikesh?', answer: 'A sedan suits this highway route; choose an Ertiga or Innova for families or rafting and retreat luggage.' },
      { question: 'Can you drop at an ashram or rafting camp?', answer: 'Yes \u2014 we drop at Tapovan ashrams and Shivpuri rafting camps; share the name at booking for the closest permitted drop.' },
      { question: 'Are tolls extra from Faridabad?', answer: 'No, \u20b95,700 sedan or \u20b97,200 SUV includes tolls, fuel and driver allowance.' },
    ],
    editorialParent: '/rishikesh',
  },
  {
    slug: 'faridabad-to-mussoorie',
    originKey: 'faridabad', destinationKey: 'mussoorie',
    origin: 'Faridabad', destination: 'Mussoorie',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 320, travelTime: '7.5 \u2013 8.5 hours',
    fare: { sedan: 6900, suv: 8700, tempo: null },
    bestTimeToTravel: 'March to June for summer; December for snow',
    recommendedVehicle: 'innova-crysta',
    pickupInfo: 'Pickup from NIT Faridabad, the Sector areas, and Greater Faridabad. This long southern-NCR run pairs the cross-Delhi leg with the Mussoorie hill climb, so an Innova Crysta is recommended for comfort.',
    routeHighlights: [
      'Cross-NCR link to the Meerut Expressway',
      'Roorkee plains and the Mohand ghat',
      'Dehradun bypass and Kempty Falls approach',
      'Library and Mall Road drop points in Mussoorie',
    ],
    faqs: [
      { question: 'How long does Faridabad to Mussoorie take?', answer: 'About 7.5 to 8.5 hours for 320 km \u2014 a long run combining the cross-Delhi leg with the hill climb.' },
      { question: 'Which car is best from Faridabad to Mussoorie?', answer: 'An Innova Crysta for comfort on this long hill route; an Ertiga is a budget-friendly alternative for smaller families.' },
      { question: 'Should we halt overnight?', answer: 'For a relaxed trip, halt in Dehradun and finish the short hill climb the next morning; an early single-day start is also doable.' },
      { question: 'What is included in the fare?', answer: 'Fuel, driver allowance and tolls are all included \u2014 \u20b96,900 sedan or \u20b98,700 SUV.' },
    ],
    editorialParent: '/mussoorie',
  },
  {
    slug: 'faridabad-to-nainital',
    originKey: 'faridabad', destinationKey: 'nainital',
    origin: 'Faridabad', destination: 'Nainital',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 320, travelTime: '7.5 \u2013 8.5 hours',
    fare: { sedan: 6900, suv: 8800, tempo: null },
    bestTimeToTravel: 'March to June and September to November; December\u2013February for snow',
    recommendedVehicle: 'innova-crysta',
    pickupInfo: 'Doorstep pickup from NIT Faridabad, the Sector belt, and Greater Faridabad. The Kumaon route crosses the NCR to Hapur, runs via Moradabad and Rampur, then climbs from Kaladhungi to Nainital \u2014 an Innova Crysta is recommended.',
    routeHighlights: [
      'Cross-NCR link to the Hapur\u2013Moradabad corridor',
      'Rampur and the Kumaon plains approach',
      'Kaladhungi hill gateway into Kumaon',
      'Naini Lake and Mall Road drop',
    ],
    faqs: [
      { question: 'How long does Faridabad to Nainital take?', answer: 'About 7.5 to 8.5 hours for 320 km via Moradabad and Kaladhungi.' },
      { question: 'Which car is best from Faridabad to Nainital?', answer: 'An Innova Crysta is best for this long Kumaon route and the Kaladhungi bends; an Ertiga is a value alternative.' },
      { question: 'Is night travel possible?', answer: 'The plains leg can be done overnight, but we time the final Kaladhungi hill climb for daylight, arriving in the morning.' },
      { question: 'Are tolls extra?', answer: 'No, \u20b96,900 sedan or \u20b98,800 SUV includes tolls, fuel and driver allowance.' },
    ],
    editorialParent: '/nainital',
  },
  {
    slug: 'faridabad-to-jim-corbett',
    originKey: 'faridabad', destinationKey: 'jim-corbett',
    origin: 'Faridabad', destination: 'Jim Corbett',
    tier: 'A', category: 'ncr-subcity', seasonal: false,
    distanceKm: 275, travelTime: '6 \u2013 7 hours',
    fare: { sedan: 5900, suv: 7400, tempo: null },
    bestTimeToTravel: 'November to June; core safari zones mid-November to mid-June',
    recommendedVehicle: 'ertiga',
    pickupInfo: 'Pickup from NIT Faridabad, the Sector areas, and Greater Faridabad (Neharpar). The route crosses the NCR to Hapur and runs via Moradabad and Rampur to Ramnagar \u2014 an Ertiga suits resort roads and safari luggage.',
    routeHighlights: [
      'Cross-NCR link to the Hapur\u2013Moradabad corridor',
      'Rampur and the Kosi river approach',
      'Ramnagar gateway town for Corbett zones',
      'Dhikuli and Kosi-riverside resort drops',
    ],
    faqs: [
      { question: 'How long does Faridabad to Jim Corbett take?', answer: 'About 6 to 7 hours for 275 km via Moradabad and Rampur to Ramnagar.' },
      { question: 'Which vehicle is best for Corbett from Faridabad?', answer: 'An Ertiga or Innova Crysta for safari luggage and resort roads; a sedan suits couples.' },
      { question: 'Does the taxi enter the park?', answer: 'No \u2014 it drops you at your resort or zone gate; in-park safaris use authorised Gypsies only.' },
      { question: 'What is included in the fare?', answer: 'The fixed fare of \u20b95,900 sedan or \u20b97,400 SUV includes fuel, driver allowance and tolls.' },
    ],
    editorialParent: '/jim-corbett',
  },

  // ─── DELHI ORIGIN ─────────────────────────────────────────────────────────

  {
    slug: 'delhi-to-mussoorie',
    originKey: 'delhi', destinationKey: 'mussoorie',
    origin: 'Delhi', destination: 'Mussoorie',
    tier: 'A', category: 'plains-source', seasonal: false,
    distanceKm: 300, travelTime: '5.5 – 7 hours',
    fare: { sedan: 5500, suv: 7000, tempo: 12000 },
    bestTimeToTravel: 'March to June and September to November; avoid monsoon highway floods',
    recommendedVehicle: 'ertiga',
    pickupInfo: 'Doorstep pickup from any Delhi locality — South Delhi, Dwarka, Rohini, Lajpat Nagar, Connaught Place, and all NCR borders. We use the Delhi–Meerut or NH-58 corridor based on real-time traffic, then ascend the 35 km Dehradun–Mussoorie hill road.',
    routeHighlights: [
      'Delhi–Dehradun Expressway cutting travel time to under 4.5 hrs from North Delhi',
      'Roorkee IIT campus and Solani aqueduct as mid-journey landmarks',
      'Mohand forest checkpost and the Doon valley descent',
      'Kempty Falls road and Library Chowk approach into Mussoorie',
    ],
    faqs: [
      { question: 'What is the taxi fare from Delhi to Mussoorie?', answer: 'A sedan is ₹5,500 and an SUV is ₹7,000 one-way. Tempo Travellers for groups are ₹12,000. All fares are fixed and include fuel, driver allowance, and tolls.' },
      { question: 'How long does Delhi to Mussoorie take by taxi?', answer: 'Approximately 5.5 to 7 hours for 300 km. Night departures from Delhi using the new Expressway can reach Dehradun in under 4.5 hours, with the final hill climb adding 1–1.5 hours.' },
      { question: 'Is the Delhi–Dehradun Expressway used for this route?', answer: 'Yes. For pickups in North and West Delhi we use the Expressway via Muzaffarnagar. For South Delhi and Gurugram borders we may route via NH-334 depending on traffic.' },
      { question: 'Can I book a one-way taxi from Delhi to Mussoorie?', answer: 'Yes, one-way is our standard booking. The driver returns independently so you pay only the fixed one-way fare with no return-trip loading.' },
    ],
    editorialParent: '/mussoorie',
  },

  {
    slug: 'delhi-to-rishikesh',
    originKey: 'delhi', destinationKey: 'rishikesh',
    origin: 'Delhi', destination: 'Rishikesh',
    tier: 'A', category: 'plains-source', seasonal: false,
    distanceKm: 245, travelTime: '5 – 6 hours',
    fare: { sedan: 4500, suv: 5800, tempo: 10000 },
    bestTimeToTravel: 'October to June; March to May for rafting season',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Pickup from any Delhi address including airports (IGI T1, T2, T3), railway stations (NDLS, Hazrat Nizamuddin, Anand Vihar), and all major colonies. We route via NH-334 through Meerut or Haridwar bypass based on time of day.',
    routeHighlights: [
      'NH-334 through Meerut and Muzaffarnagar — the fastest Delhi exit for Rishikesh',
      'Haridwar bypass around Har Ki Pauri to avoid pilgrimage congestion',
      'Ram Jhula and Laxman Jhula drop options with pedestrian-zone navigation',
      'Ashram and rafting camp drop-offs at Shivpuri, Byasi, and Phool Chatti',
    ],
    faqs: [
      { question: 'What is the taxi fare from Delhi to Rishikesh?', answer: 'A sedan is ₹4,500 and an SUV is ₹5,800 one-way. Tempo Travellers for groups of 8–12 are ₹10,000. All fares are fully inclusive.' },
      { question: 'How long does the Delhi to Rishikesh taxi take?', answer: 'Typically 5 to 6 hours for 245 km. Early morning departures (before 6 AM) clear Delhi in under 45 minutes and can reach Rishikesh in 4.5 hours.' },
      { question: 'Which pickup points in Delhi are covered?', answer: 'All of Delhi including IGI Airport (T1/T2/T3), New Delhi Railway Station, Hazrat Nizamuddin, Anand Vihar ISBT, and all residential zones from Dwarka to Noida Extension.' },
      { question: 'Can you drop at specific ashrams or rafting camps near Rishikesh?', answer: 'Yes. We cover all major ashrams (Parmarth Niketan, Sivananda, Beatles Ashram) and rafting camps at Shivpuri, Byasi, Club House (Marine Drive), and Phool Chatti.' },
    ],
    editorialParent: '/rishikesh',
  },

  {
    slug: 'delhi-to-haridwar',
    originKey: 'delhi', destinationKey: 'haridwar',
    origin: 'Delhi', destination: 'Haridwar',
    tier: 'A', category: 'plains-source', seasonal: false,
    distanceKm: 220, travelTime: '4 – 5 hours',
    fare: { sedan: 4000, suv: 5000, tempo: 9000 },
    bestTimeToTravel: 'October to March for pilgrimage; March to June for Char Dham departures',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Doorstep pickup from all Delhi zones — South Delhi, CP, Dwarka, Rohini, and all NCR borders. We route via the Meerut Expressway or NH-334 Muzaffarnagar bypass, chosen for real-time traffic. Drop points include Har Ki Pauri, Haridwar Railway Station, and all major ghats and dharamshalas.',
    routeHighlights: [
      'Delhi–Meerut Expressway for rapid Delhi exit',
      'Muzaffarnagar bypass saving 30 minutes versus old NH-58',
      'Roorkee and Manglaur toll plazas — all included in fixed fare',
      'Har Ki Pauri ghat and Haridwar Railway Station drop options',
    ],
    faqs: [
      { question: 'What is the taxi fare from Delhi to Haridwar?', answer: 'A sedan is ₹4,000 and an SUV is ₹5,000 one-way. Tempo Travellers are ₹9,000. All tolls, fuel, and driver allowance are included.' },
      { question: 'How long is the Delhi to Haridwar taxi journey?', answer: 'Around 4 to 5 hours for 220 km via NH-334 and the Muzaffarnagar bypass. Early morning runs (before 5 AM) can reach Haridwar in under 3.5 hours.' },
      { question: 'Can I get a drop at Har Ki Pauri for evening Ganga Aarti?', answer: 'Yes. We time departures from Delhi to ensure arrival at Har Ki Pauri well before the evening Ganga Aarti at 6:30–7 PM. Book an afternoon slot — we handle the rest.' },
      { question: 'Is this route covered for Char Dham Yatra departures?', answer: 'Yes. Haridwar is the traditional starting point for Char Dham. We offer onward connections to Rishikesh, Barkot (Yamunotri), Gangotri, and Sonprayag (Kedarnath) from Haridwar.' },
    ],
    editorialParent: '/haridwar',
  },

  {
    slug: 'delhi-to-nainital',
    originKey: 'delhi', destinationKey: 'nainital',
    origin: 'Delhi', destination: 'Nainital',
    tier: 'A', category: 'plains-source', seasonal: false,
    distanceKm: 310, travelTime: '7 – 8 hours',
    fare: { sedan: 5800, suv: 7500, tempo: 13000 },
    bestTimeToTravel: 'March to June and September to November; avoid monsoon (Jul–Aug)',
    recommendedVehicle: 'ertiga',
    pickupInfo: 'Pickup from all Delhi zones and NCR. We route via the Moradabad Expressway then NH-9 to Kathgodam — the fastest Kumaon corridor from Delhi. Drop at Tallital, Mallital, or your hotel on the lake circuit.',
    routeHighlights: [
      'Delhi–Meerut and Moradabad Expressway link for fast plains run',
      'Rampur and Rudrapur highway with roadside tea stop options',
      'Kathgodam railhead — last plains town before the hill climb',
      'Kaladungi ghat and the Nainital lake circuit approach',
    ],
    faqs: [
      { question: 'What is the taxi fare from Delhi to Nainital?', answer: 'A sedan is ₹5,800 and an SUV is ₹7,500. Tempo Travellers are ₹13,000. All fares are one-way and all-inclusive.' },
      { question: 'Which route do you take from Delhi to Nainital?', answer: 'We use the Moradabad Expressway then NH-9 via Rudrapur and Kathgodam — typically the fastest option at 310 km and 7–8 hours. We avoid Haridwar to skip pilgrim traffic.' },
      { question: 'How long is the hill drive from Kathgodam to Nainital?', answer: 'Around 1.5 hours for the 35 km mountain climb. The road is well-paved but winding — we use Ertiga or Innova Crysta for this last section.' },
      { question: 'What drop points in Nainital do you cover?', answer: 'Tallital Bus Stand, Mallital, Naini Lake circuit hotels, Snow View cableway, Bhimtal, Sat Tal, and all properties on the Nainital lake road.' },
    ],
    editorialParent: '/nainital',
  },

  {
    slug: 'delhi-to-kedarnath',
    originKey: 'delhi', destinationKey: 'kedarnath',
    origin: 'Delhi', destination: 'Kedarnath',
    tier: 'A', category: 'plains-source', seasonal: true,
    openWindow: 'Apr–Nov',
    distanceKm: 465, travelTime: '11 – 13 hours',
    fare: { sedan: 9500, suv: 12000, tempo: null },
    bestTimeToTravel: 'May to June and September to October for best weather; avoid monsoon road risk',
    recommendedVehicle: 'innova-crysta',
    pickupInfo: 'Pickup from any Delhi address with overnight scheduling recommended. We depart between 3–5 AM to reach Gaurikund (Kedarnath base) by late afternoon. Sonprayag vehicle-restriction compliance and biometric coordination are handled by our Yatra-experienced drivers.',
    routeHighlights: [
      'Delhi–Dehradun Expressway or NH-334 for the Haridwar corridor',
      'Rishikesh to Devprayag along the Ganga and into Rudraprayag district',
      'Agastmuni and Ukhimath waypoints before the final ascent',
      'Sonprayag vehicle barrier and shared jeep to Gaurikund base camp',
    ],
    faqs: [
      { question: 'What is the taxi fare from Delhi to Kedarnath (Gaurikund)?', answer: 'A sedan is ₹9,500 and an Innova Crysta SUV is ₹12,000 for the 465 km one-way run to Gaurikund. This is an overnight-departure route; pre-booking is essential.' },
      { question: 'How long does Delhi to Kedarnath take by taxi?', answer: '11 to 13 hours for 465 km via Haridwar, Rishikesh, and Rudraprayag. We recommend a 3–4 AM departure from Delhi to reach Gaurikund before dark.' },
      { question: 'Is Kedarnath accessible by car all the way?', answer: 'Taxis reach Sonprayag (barrier point) and then Gaurikund, which is the trailhead. Beyond Gaurikund is a 16 km trek or helicopter. Our drivers manage the Sonprayag barrier and shared vehicle transfer.' },
      { question: 'When is the Kedarnath Yatra season?', answer: 'The temple opens in late April or early May (Akshaya Tritiya) and closes in November (Bhai Dooj). May–June and September–October have the best weather; monsoon (July–August) carries road risk.' },
    ],
    editorialParent: '/kedarnath',
  },

  {
    slug: 'delhi-to-badrinath',
    originKey: 'delhi', destinationKey: 'badrinath',
    origin: 'Delhi', destination: 'Badrinath',
    tier: 'A', category: 'plains-source', seasonal: true,
    openWindow: 'Apr–Nov',
    distanceKm: 520, travelTime: '13 – 15 hours',
    fare: { sedan: 11000, suv: 14000, tempo: null },
    bestTimeToTravel: 'May to June and September to October; monsoon road caution July–August',
    recommendedVehicle: 'innova-crysta',
    pickupInfo: 'Pickup from all Delhi localities with pre-dawn departure. The 520 km drive covers Delhi, Haridwar, Rishikesh, Devprayag, Srinagar Garhwal, Joshimath, and then the final descent to Badrinath. Our drivers handle all NHAI and BRO checkpoints and monitor NDRF alerts for the Joshimath segment.',
    routeHighlights: [
      'Delhi to Haridwar via the Expressway — quickest plains exit',
      'Devprayag — Alaknanda and Bhagirathi confluence viewpoint',
      'Srinagar Garhwal and Rudraprayag waypoints for fuel and rest',
      'Joshimath town before the final descent to Badrinath Dham',
    ],
    faqs: [
      { question: 'What is the taxi fare from Delhi to Badrinath?', answer: 'A sedan is ₹11,000 and an Innova Crysta is ₹14,000 one-way for the 520 km run. This is a two-day journey if combined with sightseeing, or a hard single-day run with a pre-dawn start.' },
      { question: 'How long does Delhi to Badrinath take by road?', answer: '13 to 15 hours for 520 km. A 2–3 AM departure from Delhi reaches Badrinath by evening. We strongly recommend an overnight stay at Joshimath (310 km) for safety.' },
      { question: 'Is the Joshimath road safe for taxis?', answer: 'The BRO-maintained road to Badrinath via Joshimath is generally safe during the Yatra season. Our drivers monitor NDRF and SDRF advisories; if a road is closed we reroute or advise halting safely.' },
      { question: 'Can the driver manage all check-points and permits?', answer: 'Yes. Our Badrinath-route drivers are Char Dham certified and familiar with all NHAI toll points, BRO checkposts, and the Mana village registration requirement near Badrinath.' },
    ],
    editorialParent: '/badrinath',
  },

  {
    slug: 'delhi-to-jim-corbett',
    originKey: 'delhi', destinationKey: 'jim-corbett',
    origin: 'Delhi', destination: 'Jim Corbett',
    tier: 'A', category: 'plains-source', seasonal: false,
    distanceKm: 260, travelTime: '5.5 – 6.5 hours',
    fare: { sedan: 5000, suv: 6500, tempo: 11000 },
    bestTimeToTravel: 'November to June; peak safari season November to February',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Pickup from all Delhi addresses including IGI Airport, NDLS, and all NCR zones. We route via the Moradabad Expressway to Kashipur and then Ramnagar — the fastest corridor to Jim Corbett. Drop at Dhikala, Bijrani, Jhirna, Durgadevi, or Sitabani gate as per your safari zone booking.',
    routeHighlights: [
      'Delhi–Meerut and Moradabad Expressway for rapid plains crossing',
      'Kashipur bypass and the Ramnagar forest approach road',
      'Corbett National Park boundary and zone-specific gate drops',
      'Garjia Devi temple on the Kosi river — popular en-route stop',
    ],
    faqs: [
      { question: 'What is the taxi fare from Delhi to Jim Corbett?', answer: 'A sedan is ₹5,000 and an SUV is ₹6,500. Group Tempo Travellers are ₹11,000. Fares are fixed and all-inclusive for the 260 km Ramnagar drop.' },
      { question: 'Which safari gate does the taxi drop at?', answer: 'We drop at whichever Corbett zone gate matches your booked safari — Dhikala, Bijrani, Jhirna, Durgadevi, or Sitabani. Please confirm your zone at booking.' },
      { question: 'How long is the drive from Delhi to Jim Corbett?', answer: '5.5 to 6.5 hours for 260 km via the Moradabad Expressway. Early morning starts avoid Ghaziabad and Meerut congestion and reach Ramnagar before your afternoon safari check-in.' },
      { question: 'Is there a return taxi available from Jim Corbett to Delhi?', answer: 'Yes. We provide return taxis from Corbett to Delhi with hotel pickup from Ramnagar town or your jungle resort. Pre-booking 24 hours in advance is recommended during peak season.' },
    ],
    editorialParent: '/jim-corbett',
  },

  {
    slug: 'delhi-to-auli',
    originKey: 'delhi', destinationKey: 'auli',
    origin: 'Delhi', destination: 'Auli',
    tier: 'A', category: 'plains-source', seasonal: true,
    openWindow: 'Year-round, peak Dec–Mar (ski season)',
    distanceKm: 500, travelTime: '12 – 14 hours',
    fare: { sedan: 10500, suv: 13500, tempo: null },
    bestTimeToTravel: 'December to March for skiing; April to June and September for trekking',
    recommendedVehicle: 'innova-crysta',
    pickupInfo: 'Pickup from all Delhi addresses with pre-dawn departure. The 500 km route goes Delhi–Haridwar–Rishikesh–Devprayag–Srinagar Garhwal–Chamoli–Joshimath–Auli. Chains are mandatory in winter; our Innova Crysta carries them standard. The Auli ropeway from Joshimath is the alternative final ascent if road conditions dictate.',
    routeHighlights: [
      'Delhi to Rishikesh via Expressway and NH-334',
      'Devprayag and Srinagar Garhwal waypoints along the Ganga',
      'Chamoli and Pipalkoti after Rudraprayag confluence',
      'Joshimath town — last services before Auli ski meadows',
    ],
    faqs: [
      { question: 'What is the taxi fare from Delhi to Auli?', answer: 'A sedan is ₹10,500 and an Innova Crysta is ₹13,500 for the 500 km run to Auli. We recommend the Innova for the Joshimath–Auli high-altitude segment.' },
      { question: 'How long does Delhi to Auli take by taxi?', answer: '12 to 14 hours for 500 km via Rishikesh and Joshimath. A 2–3 AM departure from Delhi reaches Auli by late afternoon. An overnight halt at Rishikesh or Joshimath is recommended for leisure travellers.' },
      { question: 'Is Auli road safe in winter for taxis?', answer: 'The BRO road to Auli is maintained during ski season. Snow chains are required above Joshimath from December to March — our vehicles carry them. In extreme snowfall, the Joshimath ropeway is the safest alternative.' },
      { question: 'Is a two-day journey better for Delhi to Auli?', answer: 'Yes, for comfort. We recommend halting at Rishikesh (Day 1) then proceeding to Auli via Joshimath (Day 2). This splits the drive and lets you acclimatise to altitude gradually.' },
    ],
    editorialParent: '/destinations',
  },

  {
    slug: 'delhi-to-chopta',
    originKey: 'delhi', destinationKey: 'chopta',
    origin: 'Delhi', destination: 'Chopta',
    tier: 'B', category: 'plains-source', seasonal: false,
    distanceKm: 450, travelTime: '10 – 12 hours',
    fare: { sedan: 9000, suv: 11500, tempo: null },
    bestTimeToTravel: 'April to June and September to November; snow closes the road Dec–Mar',
    recommendedVehicle: 'innova-crysta',
    pickupInfo: 'Pickup from all Delhi zones. Route runs Delhi–Haridwar–Rishikesh–Rudraprayag–Ukhimath–Chopta. The Ukhimath–Chopta road (above 2,600 m) becomes snow-bound from December to March and requires a 4WD vehicle; we use Innova Crysta with chains as standard.',
    routeHighlights: [
      'Delhi to Rishikesh via NH-334 or Expressway',
      'Devprayag and Srinagar Garhwal along the Alaknanda',
      'Rudraprayag confluence — Alaknanda and Mandakini rivers',
      'Ukhimath village and the forest road ascent to Chopta meadows',
    ],
    faqs: [
      { question: 'What is the taxi fare from Delhi to Chopta?', answer: 'A sedan is ₹9,000 and an Innova Crysta is ₹11,500 for the 450 km run to Chopta. The Ukhimath–Chopta stretch requires a capable 4WD vehicle.' },
      { question: 'How long is the Delhi to Chopta drive?', answer: '10 to 12 hours for 450 km. A pre-dawn departure from Delhi is recommended; an overnight halt at Rishikesh on Day 1 makes for a more comfortable two-day journey.' },
      { question: 'Is Chopta road open year-round?', answer: 'No. The Ukhimath–Chopta road typically closes from December to March due to snow. The Tungnath temple trek is open April to November; Valley of Flowers travellers can visit July to September.' },
      { question: 'What trek does Chopta serve as base for?', answer: 'Chopta is the base camp for the Tungnath (3,680 m) and Chandrashila (4,130 m) treks — the highest Shiva temple in the world and one of the finest Himalayan panorama viewpoints.' },
    ],
    editorialParent: '/destinations',
  },

  // ─── DEHRADUN ORIGIN ───────────────────────────────────────────────────────

  {
    slug: 'dehradun-to-mussoorie',
    originKey: 'dehradun', destinationKey: 'mussoorie',
    origin: 'Dehradun', destination: 'Mussoorie',
    tier: 'A', category: 'gateway-hub', seasonal: false,
    distanceKm: 35, travelTime: '1 – 1.5 hours',
    fare: { sedan: 2000, suv: 3000, tempo: 6000 },
    bestTimeToTravel: 'March to June and October to December; avoid monsoon landslide risk',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Hotel or doorstep pickup from anywhere in Dehradun city, ISBT, Dehradun Railway Station, or Jolly Grant Airport. The 35 km hill road via Rajpur Road is the standard ascent; we use the Mussoorie Diversion Road to avoid peak-hour Mall Road entry restrictions.',
    routeHighlights: [
      'Rajpur Road climb with Doon valley valley views opening up',
      'Barlowganj and Happy Valley — quiet residential Mussoorie entry point',
      'Library Chowk and Landour Bazaar drop options',
      'Mall Road and Gun Hill ropeway base — vehicle entry managed by driver',
    ],
    faqs: [
      { question: 'What is the taxi fare from Dehradun to Mussoorie?', answer: 'A sedan is ₹2,000 and an SUV is ₹3,000 for the 35 km hill road. Tempo Travellers are ₹6,000. All fares are one-way and fully inclusive.' },
      { question: 'How long does Dehradun to Mussoorie take?', answer: 'About 1 to 1.5 hours for 35 km. During summer peak season (May–June) the Rajpur Road can be congested; our drivers know the alternate Mussoorie Diversion Road.' },
      { question: 'Are there vehicle restrictions near Mall Road?', answer: 'Yes. Mussoorie imposes time-based vehicle restrictions on Mall Road during peak hours. Our drivers drop at the nearest permitted point and coordinate with your hotel for luggage.' },
      { question: 'Can I book a return Dehradun–Mussoorie taxi?', answer: 'Yes. We offer same-day return and open-return options. The return is priced identically at ₹2,000 (sedan) — book both legs together for a 5% discount.' },
    ],
    editorialParent: '/mussoorie',
  },

  {
    slug: 'dehradun-to-kedarnath',
    originKey: 'dehradun', destinationKey: 'kedarnath',
    origin: 'Dehradun', destination: 'Kedarnath',
    tier: 'A', category: 'gateway-hub', seasonal: true,
    openWindow: 'Apr–Nov',
    distanceKm: 250, travelTime: '8 – 9 hours',
    fare: { sedan: 8500, suv: 10500, tempo: null },
    bestTimeToTravel: 'May to June and September to October for weather and crowd balance',
    recommendedVehicle: 'innova-crysta',
    pickupInfo: 'Pickup from Dehradun city, Jolly Grant Airport, or Dehradun Railway Station. We route via Rishikesh, Devprayag, and Rudraprayag to Sonprayag. Our Yatra drivers handle the Sonprayag vehicle barrier and coordinate shared vehicle transfer to Gaurikund base camp, where the 16 km Kedarnath trek begins.',
    routeHighlights: [
      'Rishikesh Lakshman Jhula and Ram Jhula crossing point',
      'Devprayag — Ganga origin confluence of Bhagirathi and Alaknanda',
      'Rudraprayag confluence — Alaknanda and Mandakini rivers',
      'Sonprayag vehicle barrier and shared jeep transfer to Gaurikund',
    ],
    faqs: [
      { question: 'What is the taxi fare from Dehradun to Kedarnath?', answer: 'A sedan is ₹8,500 and an Innova Crysta is ₹10,500 for the 250 km run to Gaurikund (Kedarnath trailhead). Fares are all-inclusive and fixed.' },
      { question: 'How long does Dehradun to Kedarnath take?', answer: '8 to 9 hours for 250 km to Gaurikund. A 4–5 AM departure from Dehradun reaches Sonprayag around noon, allowing the same-day shared vehicle to Gaurikund.' },
      { question: 'What happens at the Sonprayag vehicle barrier?', answer: 'Private vehicles are stopped at Sonprayag. From there, official shared vehicles (Bolero or Jeep) run to Gaurikund for ₹150–250 per person. Our driver coordinates this transfer for you.' },
      { question: 'Is Jolly Grant Airport pickup available for Kedarnath Yatra?', answer: 'Yes. We offer flight-tracked airport pickup and proceed directly to Gaurikund. This is the fastest same-day combination for pilgrims flying into Dehradun for the Yatra.' },
    ],
    editorialParent: '/kedarnath',
  },

  {
    slug: 'dehradun-to-badrinath',
    originKey: 'dehradun', destinationKey: 'badrinath',
    origin: 'Dehradun', destination: 'Badrinath',
    tier: 'A', category: 'gateway-hub', seasonal: true,
    openWindow: 'Apr–Nov',
    distanceKm: 320, travelTime: '10 – 11 hours',
    fare: { sedan: 9000, suv: 11000, tempo: null },
    bestTimeToTravel: 'May to June and September to October; monsoon caution on Joshimath road',
    recommendedVehicle: 'innova-crysta',
    pickupInfo: 'Pickup from Dehradun city, Jolly Grant Airport, or Dehradun Railway Station with early morning departure. Route via Rishikesh, Devprayag, Srinagar Garhwal, Chamoli, and Joshimath. Our drivers carry BRO checkpoint clearance and monitor NDRF advisories for the Joshimath–Badrinath segment.',
    routeHighlights: [
      'Rishikesh and Devprayag Ganga confluence',
      'Srinagar Garhwal — district headquarters and fuel stop',
      'Chamoli and Pipalkoti waypoints along the Alaknanda',
      'Joshimath — last town before Badrinath with accommodation options',
    ],
    faqs: [
      { question: 'What is the taxi fare from Dehradun to Badrinath?', answer: 'A sedan is ₹9,000 and an Innova Crysta is ₹11,000 for the 320 km run. All tolls, fuel, and driver allowance are included in the fixed fare.' },
      { question: 'How long does Dehradun to Badrinath take?', answer: '10 to 11 hours for 320 km. A 3–4 AM departure from Dehradun reaches Badrinath by mid-afternoon. An overnight at Joshimath (310 km mark) is recommended for a relaxed two-day journey.' },
      { question: 'Can I combine Badrinath with Kedarnath in one trip?', answer: 'Yes. We offer Do Dham packages covering both Kedarnath (via Gaurikund) and Badrinath over 3–4 days from Dehradun with a dedicated vehicle and driver throughout.' },
      { question: 'Is Badrinath accessible from Dehradun by car year-round?', answer: 'No. The Badrinath highway typically opens in late April and closes after Diwali (November). We list the temple status in our booking flow; pre-booking for the opening week is advised as demand is very high.' },
    ],
    editorialParent: '/badrinath',
  },

  {
    slug: 'dehradun-to-jim-corbett',
    originKey: 'dehradun', destinationKey: 'jim-corbett',
    origin: 'Dehradun', destination: 'Jim Corbett',
    tier: 'B', category: 'gateway-hub', seasonal: false,
    distanceKm: 200, travelTime: '5 – 6 hours',
    fare: { sedan: 4000, suv: 5000, tempo: null },
    bestTimeToTravel: 'November to June for safari; peak season November to February',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Pickup from Dehradun city, Jolly Grant Airport, or Dehradun ISBT. Route via Haridwar, Najibabad, and Kashipur to Ramnagar — the fastest cross-region route between the Garhwal and Kumaon foothills. Drop at any Corbett zone gate per your safari booking.',
    routeHighlights: [
      'Haridwar bypass to Najibabad for the quickest east–west foothills run',
      'Kotdwar forest approach road into the Kumaon belt',
      'Ramnagar town — Corbett base with resorts and forest lodge access',
      'Dhikala, Bijrani, Jhirna, and Durgadevi zone gate drops',
    ],
    faqs: [
      { question: 'What is the taxi fare from Dehradun to Jim Corbett?', answer: 'A sedan is ₹4,000 and an SUV is ₹5,000 for the 200 km run to Ramnagar (Jim Corbett). The fare is one-way and fully inclusive.' },
      { question: 'How long is the Dehradun to Jim Corbett drive?', answer: '5 to 6 hours for 200 km via Haridwar and Najibabad. Early departures avoid Haridwar morning traffic and reach Ramnagar for a 2 PM safari check-in.' },
      { question: 'Which safari zone gate do you drop at?', answer: 'We drop at whichever Corbett zone you have booked — Dhikala, Bijrani, Jhirna, Durgadevi, or Sitabani. Share your booking confirmation and we navigate to the right gate.' },
      { question: 'Is there a return taxi from Jim Corbett to Dehradun?', answer: 'Yes. Return taxis from Ramnagar to Dehradun can be booked with or without the outward journey. The same fixed fare applies and drivers are stationed locally in the Ramnagar area.' },
    ],
    editorialParent: '/jim-corbett',
  },

  {
    slug: 'dehradun-to-auli',
    originKey: 'dehradun', destinationKey: 'auli',
    origin: 'Dehradun', destination: 'Auli',
    tier: 'A', category: 'gateway-hub', seasonal: true,
    openWindow: 'Year-round, peak Dec–Mar (ski season)',
    distanceKm: 295, travelTime: '9 – 10 hours',
    fare: { sedan: 9500, suv: 12000, tempo: null },
    bestTimeToTravel: 'December to March for skiing; April to June for meadow treks',
    recommendedVehicle: 'innova-crysta',
    pickupInfo: 'Pickup from Dehradun city, Jolly Grant Airport, or Dehradun Railway Station. Route via Rishikesh, Devprayag, Srinagar Garhwal, and Joshimath to Auli. Winter departures carry snow chains as standard. The Joshimath ropeway to Auli (4 km) is an alternative if road conditions are severe.',
    routeHighlights: [
      'Rishikesh and the Garhwal hill entry via Devprayag',
      'Srinagar Garhwal and Rudraprayag for fuel and rest stops',
      'Chamoli and Pipalkoti before the Joshimath ascent',
      'Auli ski resort and Nanda Devi view meadow at 2,519 m',
    ],
    faqs: [
      { question: 'What is the taxi fare from Dehradun to Auli?', answer: 'A sedan is ₹9,500 and an Innova Crysta is ₹12,000 for the 295 km run to Auli ski resort. Fares are fixed and all-inclusive.' },
      { question: 'How long does Dehradun to Auli take?', answer: '9 to 10 hours for 295 km. A 4 AM departure from Dehradun reaches Auli by late afternoon, including a 30-minute break at Srinagar Garhwal.' },
      { question: 'Is the Auli road safe in winter?', answer: 'The BRO maintains the Joshimath–Auli road during ski season. Our vehicles carry snow chains above Joshimath from December to March. We monitor BRO and NDRF bulletins and advise on the ropeway alternative if road access is restricted.' },
      { question: 'Can Jolly Grant Airport be used for Auli?', answer: 'Yes. Jolly Grant Airport (Dehradun) is the nearest airport, 330 km from Auli. We offer flight-tracked airport pickup and direct transfers to Auli — the most convenient option for ski tourists.' },
    ],
    editorialParent: '/destinations',
  },

  {
    slug: 'dehradun-to-chopta',
    originKey: 'dehradun', destinationKey: 'chopta',
    origin: 'Dehradun', destination: 'Chopta',
    tier: 'A', category: 'gateway-hub', seasonal: false,
    distanceKm: 200, travelTime: '6.5 – 7.5 hours',
    fare: { sedan: 6500, suv: 8500, tempo: null },
    bestTimeToTravel: 'April to June and September to November; road closes December to March',
    recommendedVehicle: 'innova-crysta',
    pickupInfo: 'Pickup from Dehradun city, Jolly Grant Airport, or Dehradun Railway Station. Route via Rishikesh, Devprayag, Rudraprayag, and Ukhimath to Chopta. The Ukhimath–Chopta forest road is narrow and climbs to 2,600 m; we use Innova Crysta as standard for this ascent.',
    routeHighlights: [
      'Rishikesh departure through the Garhwal hills into the upper Mandakini valley',
      'Rudraprayag confluence town — popular halt for chai and fuel',
      'Ukhimath village — winter seat of Kedarnath deity and trek starting point',
      'Deoria Tal lake trail junction and Chopta meadow base camp',
    ],
    faqs: [
      { question: 'What is the taxi fare from Dehradun to Chopta?', answer: 'A sedan is ₹6,500 and an Innova Crysta is ₹8,500 for the 200 km run to Chopta. Fares are one-way and all-inclusive.' },
      { question: 'How long does Dehradun to Chopta take?', answer: '6.5 to 7.5 hours for 200 km. The last 20 km from Ukhimath to Chopta is a slow forest road that takes around 1 hour despite the short distance.' },
      { question: 'Is Chopta accessible from Dehradun in winter?', answer: 'No. The Chopta road is typically snow-closed from December to March. It opens around late March or April depending on snowmelt. Tungnath temple treks are available April to November.' },
      { question: 'Is Chopta the same as the Tungnath trek base?', answer: 'Yes. Chopta village is the starting point for the 3.5 km trek to Tungnath (3,680 m) and the further 1.5 km ascent to Chandrashila peak (4,130 m) — one of Uttarakhand’s finest panorama points.' },
    ],
    editorialParent: '/destinations',
  },

  // ─── RISHIKESH ORIGIN ─────────────────────────────────────────────────────

  {
    slug: 'rishikesh-to-mussoorie',
    originKey: 'rishikesh', destinationKey: 'mussoorie',
    origin: 'Rishikesh', destination: 'Mussoorie',
    tier: 'A', category: 'gateway-hub', seasonal: false,
    distanceKm: 70, travelTime: '2 – 2.5 hours',
    fare: { sedan: 3000, suv: 4000, tempo: null },
    bestTimeToTravel: 'March to June and October to December; clear hill views post-monsoon',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Pickup from Rishikesh hotels, ashrams, rafting camps, Ram Jhula, or Laxman Jhula area. Route via Dehradun bypass (avoiding city centre) then the 35 km Rajpur Road hill climb. Our drivers know the Mussoorie Diversion Road to sidestep peak-hour Mall Road vehicle restrictions.',
    routeHighlights: [
      'Rishikesh to Dehradun via NH-7 — smooth fast highway section',
      'Dehradun city bypass on the Saharanpur Road',
      'Rajpur Road hill ascent with Doon valley panorama',
      'Library Chowk, Landour, and Mall Road drop points',
    ],
    faqs: [
      { question: 'What is the taxi fare from Rishikesh to Mussoorie?', answer: 'A sedan is ₹3,000 and an SUV is ₹4,000 for the 70 km journey. Fares are one-way and fully inclusive.' },
      { question: 'How long does Rishikesh to Mussoorie take?', answer: 'About 2 to 2.5 hours for 70 km. Most of the route is fast highway to Dehradun, with the final 35 km being the hill road climb taking around 1 hour.' },
      { question: 'Can I be picked up from a rafting camp near Rishikesh?', answer: 'Yes. We pick up from Shivpuri, Byasi, Marine Drive (Club House), Phool Chatti, and all Rishikesh ashrams and hotels before proceeding to Mussoorie.' },
      { question: 'Is there a combined Rishikesh–Mussoorie day-trip option?', answer: 'Yes. We offer a same-day return from Rishikesh to Mussoorie (6–7 hours total with 2–3 hours in Mussoorie) at a round-trip fare starting from ₹5,500 for a sedan.' },
    ],
    editorialParent: '/mussoorie',
  },

  {
    slug: 'rishikesh-to-haridwar',
    originKey: 'rishikesh', destinationKey: 'haridwar',
    origin: 'Rishikesh', destination: 'Haridwar',
    tier: 'A', category: 'gateway-hub', seasonal: false,
    distanceKm: 25, travelTime: '40 – 55 mins',
    fare: { sedan: 1700, suv: 2300, tempo: null },
    bestTimeToTravel: 'October to March for pleasant Ganga Aarti weather; book evening slots',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Pickup from any Rishikesh hotel, ashram, or ghat. Route via Haridwar Road (NH-334) taking the Bhimgoda bypass to avoid Har Ki Pauri peak-hour congestion. We drop at Haridwar Railway Station, Har Ki Pauri ghat, or your dharamshala.',
    routeHighlights: [
      'Rishikesh to Haridwar via NH-334 — straight and fast',
      'Bhimgoda bypass to avoid Har Ki Pauri vehicle restriction zone',
      'Haridwar Railway Station drop for train connections',
      'Har Ki Pauri ghat drop timed for evening Ganga Aarti',
    ],
    faqs: [
      { question: 'What is the taxi fare from Rishikesh to Haridwar?', answer: 'A sedan is ₹1,700 and an SUV is ₹2,300 for the 25 km journey. All fares are fixed and inclusive of fuel and driver allowance.' },
      { question: 'How long does Rishikesh to Haridwar take?', answer: 'About 40 to 55 minutes for 25 km on NH-334. Evening trips heading for Ganga Aarti should allow 10–15 extra minutes for Haridwar approach traffic.' },
      { question: 'Can I time the drop for evening Ganga Aarti at Har Ki Pauri?', answer: 'Yes. We recommend a 4:30–5 PM departure from Rishikesh to comfortably reach Har Ki Pauri before the 6:30 PM Ganga Aarti ceremony.' },
      { question: 'Is this route covered for Haridwar Railway Station drop?', answer: 'Yes. We drop at the railway station, ISBT, or any Haridwar dharamshala. If you have a train to catch, share the departure time and we plan the pickup accordingly.' },
    ],
    editorialParent: '/haridwar',
  },

  {
    slug: 'rishikesh-to-nainital',
    originKey: 'rishikesh', destinationKey: 'nainital',
    origin: 'Rishikesh', destination: 'Nainital',
    tier: 'B', category: 'gateway-hub', seasonal: false,
    distanceKm: 255, travelTime: '6.5 – 7.5 hours',
    fare: { sedan: 6500, suv: 8500, tempo: null },
    bestTimeToTravel: 'March to June and September to November',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Pickup from Rishikesh hotels, ashrams, or rafting camps. Route via Haridwar bypass, Najibabad, Kashipur, and Kathgodam to Nainital. This inter-regional corridor crosses from Garhwal into Kumaon; our drivers know the Haridwar–Najibabad shortcut that most tourist vehicles miss.',
    routeHighlights: [
      'Haridwar bypass on Rishikesh–Najibabad road',
      'Najibabad and the plains run into Kumaon district',
      'Kashipur and Rudrapur before the foothills begin',
      'Kathgodam railhead and the 35 km Nainital hill climb',
    ],
    faqs: [
      { question: 'What is the taxi fare from Rishikesh to Nainital?', answer: 'A sedan is ₹6,500 and an SUV is ₹8,500 for the 255 km inter-regional run. Fares are one-way and fully inclusive.' },
      { question: 'How long does Rishikesh to Nainital take?', answer: '6.5 to 7.5 hours for 255 km via Haridwar and Najibabad. The Garhwal–Kumaon transfer crosses two distinct Himalayan regions with no city congestion en route.' },
      { question: 'Is this a direct Garhwal–Kumaon transfer?', answer: 'Yes. This is one of the few direct hill-to-hill routes in Uttarakhand, taking you from the Garhwal pilgrimage belt to the Kumaon lake district in a single cab ride.' },
      { question: 'Are stop-overs available en route?', answer: 'Yes. We can arrange a 20–30 minute stop at Najibabad or Kashipur for tea and refreshments. Longer stops at Ranikhet or Bhimtal can be added as a day-trip extension.' },
    ],
    editorialParent: '/nainital',
  },

  {
    slug: 'rishikesh-to-badrinath',
    originKey: 'rishikesh', destinationKey: 'badrinath',
    origin: 'Rishikesh', destination: 'Badrinath',
    tier: 'A', category: 'gateway-hub', seasonal: true,
    openWindow: 'Apr–Nov',
    distanceKm: 295, travelTime: '9 – 10 hours',
    fare: { sedan: 9000, suv: 11500, tempo: null },
    bestTimeToTravel: 'May to June and September to October; monsoon road caution July–August',
    recommendedVehicle: 'innova-crysta',
    pickupInfo: 'Pickup from Rishikesh hotels, ashrams, Ram Jhula, or Laxman Jhula area with early morning departure. Route via Devprayag, Srinagar Garhwal, Rudraprayag, Chamoli, and Joshimath. Char Dham certified drivers who know the Joshimath–Badrinath road condition alerts.',
    routeHighlights: [
      'Devprayag — Ganga source confluence directly from Rishikesh',
      'Srinagar Garhwal district HQ — mid-point fuel and food stop',
      'Chamoli and Pipalkoti waypoints along the Alaknanda gorge',
      'Joshimath town with Shankaracharya Math before the Badrinath descent',
    ],
    faqs: [
      { question: 'What is the taxi fare from Rishikesh to Badrinath?', answer: 'A sedan is ₹9,000 and an Innova Crysta is ₹11,500 for the 295 km journey. All tolls, fuel, and driver allowance are included.' },
      { question: 'How long does Rishikesh to Badrinath take?', answer: '9 to 10 hours for 295 km via Joshimath. A 4 AM departure from Rishikesh reaches Badrinath by early afternoon, allowing time for darshan before the closing ceremony.' },
      { question: 'Is a night halt recommended?', answer: 'For a relaxed journey, an overnight halt at Srinagar Garhwal (180 km) or Joshimath (280 km) is recommended. We can arrange accommodation at either stopover.' },
      { question: 'Is Badrinath Dham accessible from Rishikesh without a guide?', answer: 'Yes — our drivers know the route, checkpoints, and the Mana village registration requirement near Badrinath. No separate guide is needed for the road journey.' },
    ],
    editorialParent: '/badrinath',
  },

  {
    slug: 'rishikesh-to-jim-corbett',
    originKey: 'rishikesh', destinationKey: 'jim-corbett',
    origin: 'Rishikesh', destination: 'Jim Corbett',
    tier: 'B', category: 'gateway-hub', seasonal: false,
    distanceKm: 185, travelTime: '5 – 6 hours',
    fare: { sedan: 3500, suv: 4500, tempo: null },
    bestTimeToTravel: 'November to February for peak safari; avoid July–August monsoon',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Pickup from Rishikesh hotels, ashrams, or rafting camps. Route via Haridwar bypass, Najibabad, Kashipur, and Ramnagar. This Garhwal–Kumaon wildlife corridor is one of the most scenic inter-region transfers in Uttarakhand, entirely on national and state highways.',
    routeHighlights: [
      'Haridwar bypass and Najibabad inter-region corridor',
      'Kashipur plains and the Shivalik foothills approach',
      'Ramnagar town — Jim Corbett base with jungle lodge belt',
      'Zone-specific gate drops at Dhikala, Bijrani, or Jhirna',
    ],
    faqs: [
      { question: 'What is the taxi fare from Rishikesh to Jim Corbett?', answer: 'A sedan is ₹3,500 and an SUV is ₹4,500 for the 185 km run to Ramnagar. Fares are one-way and all-inclusive.' },
      { question: 'How long does Rishikesh to Jim Corbett take?', answer: '5 to 6 hours for 185 km via the Haridwar–Najibabad corridor. Early morning departures from Rishikesh reach Ramnagar in time for afternoon safari check-in.' },
      { question: 'Is Rishikesh a good base before Jim Corbett?', answer: 'Yes. Many travellers combine a 2–3 day Rishikesh stay (yoga, rafting) with an onward Jim Corbett safari, making this a popular back-to-back itinerary in Uttarakhand.' },
      { question: 'Which Corbett zone gate can you drop at from Rishikesh?', answer: 'We drop at Dhikala, Bijrani, Jhirna, Durgadevi, or Sitabani gate — depending on your booked safari zone. Share your booking details and we navigate accordingly.' },
    ],
    editorialParent: '/jim-corbett',
  },

  {
    slug: 'rishikesh-to-auli',
    originKey: 'rishikesh', destinationKey: 'auli',
    origin: 'Rishikesh', destination: 'Auli',
    tier: 'A', category: 'gateway-hub', seasonal: true,
    openWindow: 'Year-round, peak Dec–Mar (ski season)',
    distanceKm: 255, travelTime: '8 – 9 hours',
    fare: { sedan: 8500, suv: 11000, tempo: null },
    bestTimeToTravel: 'December to March for skiing; May to June for high-altitude meadow treks',
    recommendedVehicle: 'innova-crysta',
    pickupInfo: 'Pickup from Rishikesh hotels, ashrams, or ghat areas with early morning departure. Route via Devprayag, Srinagar Garhwal, Chamoli, and Joshimath to Auli. Winter departures carry snow chains above Joshimath. The Joshimath ropeway to Auli (4 km gondola) is the alternative if the road is snow-blocked.',
    routeHighlights: [
      'Devprayag and Ganga source confluence on the valley road',
      'Srinagar Garhwal and Rudraprayag waypoints',
      'Chamoli and Pipalkoti along the Alaknanda gorge',
      'Joshimath town before the Auli road or ropeway ascent',
    ],
    faqs: [
      { question: 'What is the taxi fare from Rishikesh to Auli?', answer: 'A sedan is ₹8,500 and an Innova Crysta is ₹11,000 for the 255 km run to Auli. Fares include all tolls, fuel, and driver allowance.' },
      { question: 'How long does Rishikesh to Auli take?', answer: '8 to 9 hours for 255 km. A 4 AM departure from Rishikesh reaches Auli by early afternoon with a short rest stop at Srinagar Garhwal.' },
      { question: 'Is there a ropeway at Auli from Joshimath?', answer: 'Yes. The Joshimath–Auli ropeway (4 km, one of Asia’s longest) is an alternative to the road when snow conditions make driving difficult. Our driver drops at Joshimath ropeway base.' },
      { question: 'Is Auli suitable for beginners at skiing?', answer: 'Yes. Auli has beginner, intermediate, and advanced ski slopes with GMVN ski equipment rental. Our drivers can advise on equipment rental shops in Joshimath and the best arrival timing for ski school sessions.' },
    ],
    editorialParent: '/destinations',
  },

  {
    slug: 'rishikesh-to-chopta',
    originKey: 'rishikesh', destinationKey: 'chopta',
    origin: 'Rishikesh', destination: 'Chopta',
    tier: 'A', category: 'gateway-hub', seasonal: false,
    distanceKm: 195, travelTime: '6 – 7 hours',
    fare: { sedan: 6000, suv: 8000, tempo: null },
    bestTimeToTravel: 'April to June and September to November; road closed December to March',
    recommendedVehicle: 'innova-crysta',
    pickupInfo: 'Pickup from Rishikesh hotels, ashrams, or rafting camps. Route via Devprayag, Rudraprayag, Ukhimath, and the Chopta forest road. The final 20 km from Ukhimath is a narrow mountain track requiring a capable vehicle; we use Innova Crysta as standard.',
    routeHighlights: [
      'Devprayag Ganga confluence from Rishikesh on the valley road',
      'Srinagar Garhwal and Augustmuni waypoints for fuel and rest',
      'Rudraprayag town — Alaknanda and Mandakini river junction',
      'Ukhimath village and the narrow Chopta forest track final ascent',
    ],
    faqs: [
      { question: 'What is the taxi fare from Rishikesh to Chopta?', answer: 'A sedan is ₹6,000 and an Innova Crysta is ₹8,000 for the 195 km run. Fares are fixed and all-inclusive.' },
      { question: 'How long does Rishikesh to Chopta take?', answer: '6 to 7 hours for 195 km. The last 20 km from Ukhimath to Chopta takes around 1 hour on a narrow mountain track.' },
      { question: 'Is the Chopta road open in winter from Rishikesh?', answer: 'No. The Ukhimath–Chopta road closes from December to March due to snow. Routes from Rishikesh are available April through November for the Tungnath and Chandrashila treks.' },
      { question: 'Can I combine Chopta with Kedarnath from Rishikesh?', answer: 'Yes. Chopta lies 60 km from Ukhimath, which is itself 45 km from Sonprayag (Kedarnath route). We offer multi-destination packages combining Kedarnath, Chopta, and Deoria Tal in a single Rishikesh-based itinerary.' },
    ],
    editorialParent: '/destinations',
  },

  // ─── HARIDWAR ORIGIN ───────────────────────────────────────────────────────

  {
    slug: 'haridwar-to-mussoorie',
    originKey: 'haridwar', destinationKey: 'mussoorie',
    origin: 'Haridwar', destination: 'Mussoorie',
    tier: 'A', category: 'gateway-hub', seasonal: false,
    distanceKm: 80, travelTime: '2.5 – 3 hours',
    fare: { sedan: 3500, suv: 4500, tempo: null },
    bestTimeToTravel: 'March to June and October to December; winter snowfall is a Mussoorie draw',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Pickup from Har Ki Pauri, Haridwar Railway Station, ISBT, or your hotel. Route via Dehradun (45 km from Haridwar) then the 35 km Rajpur Road hill climb. We use the Haridwar–Dehradun NH-334 and bypass Dehradun city centre for the fastest transit.',
    routeHighlights: [
      'Haridwar–Dehradun NH-334 — smooth 45 km national highway section',
      'Dehradun bypass on Saharanpur Road avoiding city centre',
      'Rajpur Road hill climb with Doon valley views',
      'Mall Road and Gun Hill drop with vehicle restriction management',
    ],
    faqs: [
      { question: 'What is the taxi fare from Haridwar to Mussoorie?', answer: 'A sedan is ₹3,500 and an SUV is ₹4,500 for the 80 km run via Dehradun. Fares are one-way and fully inclusive.' },
      { question: 'How long is the Haridwar to Mussoorie taxi?', answer: 'About 2.5 to 3 hours for 80 km. The Haridwar–Dehradun stretch takes 45 minutes; the hill climb adds around 1.5 hours.' },
      { question: 'Can pilgrims continue from Haridwar to Mussoorie after Ganga Aarti?', answer: 'Yes, though we recommend a morning departure. Evening trips after Ganga Aarti (7–8 PM) face night hill driving — our experienced drivers manage this safely, but daytime is preferred for first-timers.' },
      { question: 'Is there a return taxi from Mussoorie to Haridwar?', answer: 'Yes. Return taxis from Mussoorie to Haridwar are available at the same fixed rate of ₹3,500 (sedan). Pre-book for morning or evening departures.' },
    ],
    editorialParent: '/mussoorie',
  },

  {
    slug: 'haridwar-to-rishikesh',
    originKey: 'haridwar', destinationKey: 'rishikesh',
    origin: 'Haridwar', destination: 'Rishikesh',
    tier: 'A', category: 'gateway-hub', seasonal: false,
    distanceKm: 25, travelTime: '45 – 60 mins',
    fare: { sedan: 1700, suv: 2300, tempo: null },
    bestTimeToTravel: 'Year-round; March to May for rafting season; October to March for pilgrimage',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Pickup from Har Ki Pauri, Haridwar Railway Station, ISBT, or any Haridwar hotel. Route via Haridwar Road (NH-334) to Rishikesh. Drop at Ram Jhula, Laxman Jhula, Triveni Ghat, or any ashram or rafting camp in the Rishikesh area.',
    routeHighlights: [
      'NH-334 straight highway — the fastest 25 km inter-city run',
      'Shivpuri and Byasi rafting camp approach road',
      'Ram Jhula pedestrian bridge zone — vehicle drop at nearest point',
      'Laxman Jhula and Tapovan ashram belt drops',
    ],
    faqs: [
      { question: 'What is the taxi fare from Haridwar to Rishikesh?', answer: 'A sedan is ₹1,700 and an SUV is ₹2,300 for the 25 km journey. The fare is fixed and fully inclusive.' },
      { question: 'How long does Haridwar to Rishikesh take?', answer: 'About 45 to 60 minutes for 25 km on NH-334. Evening departures can take 10–15 minutes longer due to Rishikesh approach traffic.' },
      { question: 'Can I get a drop at a specific ashram or rafting camp?', answer: 'Yes. We drop at Parmarth Niketan, Sivananda Ashram, Beatles Ashram (Chaurasi Kutia), Shivpuri camp, Byasi camp, and all ghat areas near Ram Jhula and Laxman Jhula.' },
      { question: 'Is a return Rishikesh–Haridwar taxi available on the same day?', answer: 'Yes. Same-day return taxis are our most common booking on this route. The combined round-trip fare is ₹3,200 (sedan) booked together.' },
    ],
    editorialParent: '/rishikesh',
  },

  {
    slug: 'haridwar-to-nainital',
    originKey: 'haridwar', destinationKey: 'nainital',
    origin: 'Haridwar', destination: 'Nainital',
    tier: 'B', category: 'gateway-hub', seasonal: false,
    distanceKm: 260, travelTime: '6.5 – 7.5 hours',
    fare: { sedan: 7000, suv: 9000, tempo: null },
    bestTimeToTravel: 'March to June and September to November',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Pickup from Haridwar Railway Station, Har Ki Pauri, or any Haridwar hotel. Route via Najibabad, Kashipur, and Kathgodam — the direct Garhwal–Kumaon inter-regional route that avoids Delhi entirely. Our drivers know the Haridwar–Najibabad shortcut that cuts 30 minutes versus the main highway.',
    routeHighlights: [
      'Haridwar–Najibabad state highway — the fastest Garhwal–Kumaon link',
      'Kashipur plains and Shivalik foothills entry',
      'Kathgodam railhead and the 35 km hill climb to Nainital',
      'Naini Lake circuit and Tallital Mallital drop points',
    ],
    faqs: [
      { question: 'What is the taxi fare from Haridwar to Nainital?', answer: 'A sedan is ₹7,000 and an SUV is ₹9,000 for the 260 km inter-regional run. All fares are fixed and one-way.' },
      { question: 'How long does Haridwar to Nainital take?', answer: '6.5 to 7.5 hours for 260 km via Najibabad. This Garhwal–Kumaon corridor avoids Delhi and is the fastest way to cross between the two Himalayan regions.' },
      { question: 'Is there a train alternative from Haridwar to Nainital?', answer: 'Yes — Haridwar to Kathgodam by train, then taxi to Nainital. Our taxi is faster and door-to-door without any transfer complexity; it is often the preferred choice for families and groups.' },
      { question: 'Can this route continue to Jim Corbett from Nainital?', answer: 'Yes. After a Nainital stay, we provide onward taxis to Jim Corbett (Ramnagar) — 65 km and 2 hours from Nainital, making it an easy combination.' },
    ],
    editorialParent: '/nainital',
  },

  {
    slug: 'haridwar-to-badrinath',
    originKey: 'haridwar', destinationKey: 'badrinath',
    origin: 'Haridwar', destination: 'Badrinath',
    tier: 'A', category: 'gateway-hub', seasonal: true,
    openWindow: 'Apr–Nov',
    distanceKm: 320, travelTime: '10 – 11 hours',
    fare: { sedan: 8000, suv: 10000, tempo: null },
    bestTimeToTravel: 'May to June and September to October; Yatra season April to November',
    recommendedVehicle: 'innova-crysta',
    pickupInfo: 'Pickup from Har Ki Pauri, Haridwar Railway Station, ISBT, or any hotel with early morning departure. Route via Rishikesh, Devprayag, Srinagar Garhwal, Chamoli, and Joshimath. Haridwar is the traditional Char Dham Yatra starting point; our Char Dham certified drivers handle all checkpoints and BRO advisories.',
    routeHighlights: [
      'Rishikesh departure up the Garhwal valley into the high Himalayas',
      'Devprayag and Ganga source confluence viewpoint',
      'Srinagar Garhwal district headquarters — key rest and fuel stop',
      'Joshimath and Shankaracharya Math before the Badrinath descent',
    ],
    faqs: [
      { question: 'What is the taxi fare from Haridwar to Badrinath?', answer: 'A sedan is ₹8,000 and an Innova Crysta is ₹10,000 for the 320 km journey to Badrinath Dham. Fares are fixed and all-inclusive.' },
      { question: 'How long does Haridwar to Badrinath take?', answer: '10 to 11 hours for 320 km via Rishikesh and Joshimath. A 3–4 AM departure from Haridwar reaches Badrinath in the early afternoon for darshan.' },
      { question: 'Is Haridwar the best starting point for Badrinath Yatra?', answer: 'Haridwar is the traditional starting city for Char Dham Yatra. Most pilgrim packages begin at Haridwar Railway Station; our cabs are stationed to depart immediately after train arrivals.' },
      { question: 'Can Badrinath be combined with Kedarnath from Haridwar?', answer: 'Yes. We offer Do Dham (Kedarnath + Badrinath) packages from Haridwar over 5–6 days with the same dedicated vehicle and driver throughout. The classic route goes Haridwar–Kedarnath–Badrinath–Haridwar.' },
    ],
    editorialParent: '/badrinath',
  },

  {
    slug: 'haridwar-to-jim-corbett',
    originKey: 'haridwar', destinationKey: 'jim-corbett',
    origin: 'Haridwar', destination: 'Jim Corbett',
    tier: 'B', category: 'gateway-hub', seasonal: false,
    distanceKm: 200, travelTime: '5 – 6 hours',
    fare: { sedan: 3300, suv: 4300, tempo: null },
    bestTimeToTravel: 'November to June; peak safari November to February',
    recommendedVehicle: 'sedan',
    pickupInfo: 'Pickup from Haridwar Railway Station, Har Ki Pauri, ISBT, or any hotel. Route via Najibabad and Kashipur to Ramnagar — the direct foothills corridor between Garhwal and Kumaon without entering Delhi. Drop at your jungle resort or any Corbett zone gate.',
    routeHighlights: [
      'Haridwar–Najibabad state highway — the inter-Himalayan foothills link',
      'Kashipur and the Shivalik belt approach to Jim Corbett',
      'Ramnagar town and the Corbett National Park entry zones',
      'Garjia Devi temple on the Kosi river — popular pre-safari halt',
    ],
    faqs: [
      { question: 'What is the taxi fare from Haridwar to Jim Corbett?', answer: 'A sedan is ₹3,300 and an SUV is ₹4,300 for the 200 km run to Ramnagar. Fares are one-way and all-inclusive.' },
      { question: 'How long does Haridwar to Jim Corbett take?', answer: '5 to 6 hours for 200 km via Najibabad and Kashipur. This Garhwal–Kumaon foothills route avoids Delhi and is the fastest connection between the two regions.' },
      { question: 'Can I book Haridwar to Jim Corbett after attending Ganga Aarti?', answer: 'Yes. We recommend a night departure after the evening Ganga Aarti (8–9 PM) to reach Ramnagar by 2–3 AM, ready for a dawn safari. Pre-booking the Corbett zone entry is essential.' },
      { question: 'Which Corbett zone gate do you drop at from Haridwar?', answer: 'We drop at any booked Corbett zone gate — Dhikala, Bijrani, Jhirna, Durgadevi, or Sitabani. Share your safari booking reference and we navigate to the exact gate.' },
    ],
    editorialParent: '/jim-corbett',
  },

  {
    slug: 'haridwar-to-auli',
    originKey: 'haridwar', destinationKey: 'auli',
    origin: 'Haridwar', destination: 'Auli',
    tier: 'A', category: 'gateway-hub', seasonal: true,
    openWindow: 'Year-round, peak Dec–Mar (ski season)',
    distanceKm: 290, travelTime: '9 – 10 hours',
    fare: { sedan: 9000, suv: 12000, tempo: null },
    bestTimeToTravel: 'December to March for skiing; May to June for meadow and trekking',
    recommendedVehicle: 'innova-crysta',
    pickupInfo: 'Pickup from Har Ki Pauri, Haridwar Railway Station, or your hotel with pre-dawn departure. Route via Rishikesh, Devprayag, Srinagar Garhwal, Chamoli, and Joshimath to Auli. Snow chains carried as standard above Joshimath in winter.',
    routeHighlights: [
      'Rishikesh ghat crossing and the Garhwal valley entry',
      'Devprayag, Srinagar Garhwal, and Chamoli waypoints',
      'Joshimath — last town with fuel, food, and accommodation',
      'Auli ski meadow at 2,519 m with Nanda Devi panorama',
    ],
    faqs: [
      { question: 'What is the taxi fare from Haridwar to Auli?', answer: 'A sedan is ₹9,000 and an Innova Crysta is ₹12,000 for the 290 km run to Auli. Fares are one-way and all-inclusive.' },
      { question: 'How long does Haridwar to Auli take?', answer: '9 to 10 hours for 290 km via Joshimath. A 3–4 AM departure from Haridwar reaches Auli by early afternoon in time for ski slope access.' },
      { question: 'Is an overnight halt recommended between Haridwar and Auli?', answer: 'For a relaxed trip, an overnight at Rishikesh (50 km from Haridwar) or Srinagar Garhwal (180 km) is recommended, especially during peak ski season when roads near Joshimath can be icy.' },
      { question: 'Is the ropeway at Auli accessible from Haridwar?', answer: 'Yes. We drop at Joshimath ropeway base (4 km gondola to Auli) if the road to Auli is snow-blocked. The gondola runs year-round and is the most scenic way to arrive at the ski resort.' },
    ],
    editorialParent: '/destinations',
  },

  {
    slug: 'haridwar-to-chopta',
    originKey: 'haridwar', destinationKey: 'chopta',
    origin: 'Haridwar', destination: 'Chopta',
    tier: 'B', category: 'gateway-hub', seasonal: false,
    distanceKm: 245, travelTime: '7.5 – 8.5 hours',
    fare: { sedan: 7500, suv: 9500, tempo: null },
    bestTimeToTravel: 'April to June and September to November; road closed December to March',
    recommendedVehicle: 'innova-crysta',
    pickupInfo: 'Pickup from Haridwar Railway Station, Har Ki Pauri, or any hotel. Route via Rishikesh, Devprayag, Rudraprayag, Ukhimath, and the Chopta forest road. The final 20 km from Ukhimath is a narrow mountain track; we use Innova Crysta as standard.',
    routeHighlights: [
      'Rishikesh ghat crossing and Garhwal valley road entry',
      'Devprayag and Rudraprayag confluences along the Ganga network',
      'Ukhimath village — winter seat of the Kedarnath deity',
      'Chopta forest road and meadow base camp at 2,600 m',
    ],
    faqs: [
      { question: 'What is the taxi fare from Haridwar to Chopta?', answer: 'A sedan is ₹7,500 and an Innova Crysta is ₹9,500 for the 245 km journey. Fares are fixed and all-inclusive.' },
      { question: 'How long does Haridwar to Chopta take?', answer: '7.5 to 8.5 hours for 245 km. The last 20 km from Ukhimath to Chopta takes around 1 hour on a narrow track.' },
      { question: 'Is the Chopta road open from Haridwar in all seasons?', answer: 'No. The Ukhimath–Chopta road closes from December to March due to snow. Routes from Haridwar operate April to November for the Tungnath and Chandrashila treks.' },
      { question: 'Can Chopta be combined with Kedarnath from Haridwar?', answer: 'Yes. Chopta (via Ukhimath) and Kedarnath (via Sonprayag) share the same valley. We offer multi-day packages from Haridwar covering Kedarnath Yatra and the Tungnath–Chandrashila trek in one itinerary.' },
    ],
    editorialParent: '/destinations',
  },
];
