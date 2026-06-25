/**
 * data/hub-config.ts
 *
 * Defines the origin and destination hub pages for the /taxi programmatic layer.
 *   - Origin hubs:      /taxi/from/{key}
 *   - Destination hubs: /taxi/to/{key}
 *
 * Hub pages aggregate the route pages generated from PROGRAMMATIC_ROUTES and act
 * as rule-based internal-link distributors (see lib/route-helpers.ts).
 */

export interface OriginHub {
  /** Lowercase key; matches ProgrammaticRoute.originKey and the URL segment. */
  key: string;
  /** Display name, e.g. "Delhi". */
  name: string;
  /** Short intro copy for the hub page hero. */
  intro: string;
}

export interface DestinationHub {
  /** Lowercase key; matches ProgrammaticRoute.destinationKey and the URL segment. */
  key: string;
  /** Display name, e.g. "Nainital". */
  name: string;
  /** Existing editorial pillar to link up to. */
  editorialParent: string;
  /** Seasonal destinations keep their hub live year-round; content/freq adapts. */
  seasonal: boolean;
  /** Open window when seasonal, e.g. "Apr\u2013Nov". */
  openWindow?: string;
  /** Short intro copy for the hub page hero. */
  intro: string;
}

/** Origin hubs (Phase 1 + Phase 2 origins). */
export const ORIGIN_HUBS: OriginHub[] = [
  {
    key: 'delhi',
    name: 'Delhi',
    intro:
      'Book a reliable taxi from Delhi to anywhere in Uttarakhand. Doorstep pickup across the capital, fixed all-inclusive fares, and verified hill-route drivers.',
  },
  {
    key: 'noida',
    name: 'Noida',
    intro:
      'Pre-book your Noida to Uttarakhand taxi with doorstep pickup from any sector. Transparent fares, clean AC vehicles, and drivers who know the hill roads.',
  },
  {
    key: 'gurugram',
    name: 'Gurugram',
    intro:
      'Outstation taxi from Gurugram to the hills of Uttarakhand. Pickup from Cyber City, Sohna Road, and all sectors with fixed pricing and no hidden charges.',
  },
  {
    key: 'ghaziabad',
    name: 'Ghaziabad',
    intro:
      'Ghaziabad to Uttarakhand taxi service with doorstep pickup from Indirapuram, Vaishali, and Raj Nagar. One of the shortest NCR runs to the Garhwal hills.',
  },
  {
    key: 'faridabad',
    name: 'Faridabad',
    intro:
      'Book a Faridabad to Uttarakhand cab with pickup from NIT, Sector areas, and Greater Faridabad. Reliable long-distance drivers and transparent fares.',
  },
  {
    key: 'dehradun',
    name: 'Dehradun',
    intro:
      'Dehradun is our home base. Book onward taxis to every major Uttarakhand destination with local drivers and fixed, transparent fares.',
  },
  {
    key: 'rishikesh',
    name: 'Rishikesh',
    intro:
      'Taxi service from Rishikesh to the Garhwal Himalayas and beyond. Ideal for pilgrims and adventure travellers continuing into the mountains.',
  },
  {
    key: 'haridwar',
    name: 'Haridwar',
    intro:
      'Book a taxi from Haridwar to anywhere in Uttarakhand. A natural gateway for Char Dham pilgrims and travellers heading into the hills.',
  },
];

/** Destination hubs (approved list). Seasonal: kedarnath, badrinath, auli. */
export const DESTINATION_HUBS: DestinationHub[] = [
  {
    key: 'mussoorie',
    name: 'Mussoorie',
    editorialParent: '/mussoorie',
    seasonal: false,
    intro:
      'Every way to reach Mussoorie by taxi. Compare fares and travel times from Delhi NCR, Dehradun, and the gateway hubs to the Queen of Hills.',
  },
  {
    key: 'rishikesh',
    name: 'Rishikesh',
    editorialParent: '/rishikesh',
    seasonal: false,
    intro:
      'Compare taxi options to Rishikesh from across North India. Fixed fares, airport pickups, and ashram/ghat drops with experienced drivers.',
  },
  {
    key: 'haridwar',
    name: 'Haridwar',
    editorialParent: '/haridwar',
    seasonal: false,
    intro:
      'All the ways to reach Haridwar by taxi, with transparent fares from Delhi NCR and the Uttarakhand gateway cities.',
  },
  {
    key: 'nainital',
    name: 'Nainital',
    editorialParent: '/nainital',
    seasonal: false,
    intro:
      'Compare every taxi route to Nainital, the Lake District of Kumaon, from Delhi NCR and the Garhwal gateway hubs. Fixed fares and hill-expert drivers.',
  },
  {
    key: 'kedarnath',
    name: 'Kedarnath',
    editorialParent: '/kedarnath',
    seasonal: true,
    openWindow: 'Apr\u2013Nov',
    intro:
      'Taxi routes to Kedarnath (Gaurikund / Sonprayag) from across the region. The Yatra runs roughly April to November \u2014 pre-booking is open year-round.',
  },
  {
    key: 'badrinath',
    name: 'Badrinath',
    editorialParent: '/badrinath',
    seasonal: true,
    openWindow: 'Apr\u2013Nov',
    intro:
      'Compare taxi routes to Badrinath Dham. The temple opens roughly April to November \u2014 routes stay listed year-round so you can plan and pre-book.',
  },
  {
    key: 'jim-corbett',
    name: 'Jim Corbett',
    editorialParent: '/jim-corbett',
    seasonal: false,
    intro:
      'Every taxi route to Jim Corbett National Park from Delhi NCR and Uttarakhand. Compare fares and times for your wildlife getaway.',
  },
  {
    key: 'auli',
    name: 'Auli',
    editorialParent: '/destinations',
    seasonal: true,
    openWindow: 'Year-round, peak Dec\u2013Mar (ski season)',
    intro:
      'Taxi routes to Auli, Uttarakhand\u2019s premier ski destination. Accessible year-round with a winter peak \u2014 compare fares from all major origins.',
  },
  {
    key: 'chopta',
    name: 'Chopta',
    editorialParent: '/destinations',
    seasonal: false,
    intro:
      'Compare taxi routes to Chopta, the \u201cMini Switzerland of Uttarakhand\u201d and base for the Tungnath trek, from the gateway hubs.',
  },
];

export function getOriginHub(key: string): OriginHub | undefined {
  return ORIGIN_HUBS.find((h) => h.key === key);
}

export function getDestinationHub(key: string): DestinationHub | undefined {
  return DESTINATION_HUBS.find((h) => h.key === key);
}
