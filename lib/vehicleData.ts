/**
 * CENTRALIZED VEHICLE / FLEET DATA
 * Single source of truth for all vehicle specs, capacities, and per-km rates.
 *
 * Route-level fixed fares live in lib/priceData.ts and should always be read
 * from there (getRoute, formatPrice) rather than duplicated here. This file
 * covers vehicle specifications and the per-km / quote-on-request rates that
 * apply across all routes for a given vehicle type.
 *
 * Seating and luggage figures below are standard industry specifications for
 * each model, presented as typical capacities. Update here if your actual
 * fleet configuration differs — every fleet page reads from this file.
 *
 * Last Updated: June 2026
 */

export type VehicleSlug =
  | 'sedan'
  | 'ertiga'
  | 'innova-crysta'
  | 'tempo-traveller'
  | 'force-urbania';

export interface VehiclePricing {
  /** True if this vehicle has fixed per-route fares in priceData.ts */
  hasFixedRoutes: boolean;
  /** Per-km outstation rate, e.g. "₹15 - ₹18" — only set if known/published */
  perKmRate?: string;
  /** Local 8hr/80km sightseeing package rate, only set if known/published */
  localPackageRate?: string;
  /** True if pricing should show "Quote on WhatsApp" instead of fixed numbers */
  quoteOnRequest: boolean;
}

/** Suitability rating for a vehicle on a given destination/use-case. */
export type Suitability = 'ideal' | 'good' | 'limited' | 'not-recommended';

/** Canonical Uttarakhand destinations evaluated across the fleet. */
export type DestinationKey =
  | 'mussoorie'
  | 'rishikesh'
  | 'haridwar'
  | 'nainital'
  | 'jim-corbett'
  | 'chopta'
  | 'auli'
  | 'kedarnath'
  | 'badrinath'
  | 'gangotri'
  | 'yamunotri'
  | 'valley-of-flowers'
  | 'char-dham';

export interface DestinationMeta {
  key: DestinationKey;
  name: string;
  /** Internal link target on the site for this destination. */
  href: string;
}

/** Ordered list of destinations used by matrices and per-vehicle suitability. */
export const DESTINATIONS: DestinationMeta[] = [
  { key: 'mussoorie', name: 'Mussoorie', href: '/mussoorie' },
  { key: 'rishikesh', name: 'Rishikesh', href: '/rishikesh' },
  { key: 'haridwar', name: 'Haridwar', href: '/haridwar' },
  { key: 'nainital', name: 'Nainital', href: '/nainital' },
  { key: 'jim-corbett', name: 'Jim Corbett', href: '/jim-corbett' },
  { key: 'chopta', name: 'Chopta', href: '/destinations' },
  { key: 'auli', name: 'Auli', href: '/destinations' },
  { key: 'kedarnath', name: 'Kedarnath', href: '/kedarnath' },
  { key: 'badrinath', name: 'Badrinath', href: '/badrinath' },
  { key: 'gangotri', name: 'Gangotri', href: '/char-dham' },
  { key: 'yamunotri', name: 'Yamunotri', href: '/char-dham' },
  { key: 'valley-of-flowers', name: 'Valley of Flowers', href: '/valley-of-flowers' },
  { key: 'char-dham', name: 'Char Dham Yatra', href: '/char-dham' },
];

export interface DestinationSuitability {
  rating: Suitability;
  /** One concise, AI-citable sentence on this vehicle for this destination. */
  note: string;
}

export interface Vehicle {
  slug: VehicleSlug;
  name: string;
  shortName: string;
  tagline: string;
  category: 'Sedan' | 'SUV' | 'Group Vehicle' | 'Premium Group Vehicle';
  models: string[];
  seating: number;
  seatingLabel: string; // e.g. "4 Passengers", "12-17 Passengers"
  luggage: string; // e.g. "2 Large + 1 Small Bag"
  acType: string;
  idealFor: string[];
  notIdealFor?: string[];
  bestRoutes: string[]; // priceData.ts route keys this vehicle is recommended for
  pricing: VehiclePricing;
  description: string;
  metaDescription: string;
  /** Per-destination suitability rating + concise note (AI-citable). */
  destinationSuitability: Record<DestinationKey, DestinationSuitability>;
  /** Concise season-by-season guidance for this vehicle in the Uttarakhand hills. */
  seasonalSuitability: string;
  /** Short, scannable real-world use cases this vehicle is booked for. */
  useCases: string[];
}

export const VEHICLES: Record<VehicleSlug, Vehicle> = {
  sedan: {
    slug: 'sedan',
    name: 'Sedan (Swift Dzire / Honda Amaze)',
    shortName: 'Sedan',
    tagline: 'Budget-friendly comfort for local and short outstation trips',
    category: 'Sedan',
    models: ['Swift Dzire', 'Honda Amaze', 'Hyundai Aura'],
    seating: 4,
    seatingLabel: '4 Passengers',
    luggage: '2 Medium Bags + 1 Cabin Bag',
    acType: 'Factory AC',
    idealFor: [
      'Solo travelers and couples',
      'Small families (up to 4)',
      'Airport transfers',
      'Local sightseeing in Dehradun, Mussoorie, Rishikesh, Haridwar',
      'Short outstation trips on plain or moderate hill roads',
    ],
    notIdealFor: [
      'Groups larger than 4',
      'Heavy luggage (more than 2-3 bags)',
      'Steep, high-altitude Char Dham routes where ground clearance matters',
    ],
    bestRoutes: ['dehradun-mussoorie', 'dehradun-rishikesh', 'dehradun-haridwar', 'haridwar-rishikesh', 'jolly-grant-dehradun'],
    pricing: {
      hasFixedRoutes: true,
      perKmRate: '₹15 - ₹18',
      localPackageRate: '₹2,500',
      quoteOnRequest: false,
    },
    description:
      'The Sedan is the most economical and widely booked option in our fleet, ideal for solo travelers, couples, and small families moving between Dehradun, Mussoorie, Rishikesh, and Haridwar. With 4 comfortable seats, factory air conditioning, and enough boot space for 2-3 bags, it covers the vast majority of plain-road and moderate-hill routes at the lowest fixed fare in our pricing system.',
    metaDescription:
      'Book a Sedan taxi (Swift Dzire / Honda Amaze) in Dehradun and across Uttarakhand. Fixed fares from ₹2,000, 4-seater, ideal for local trips, airport transfers, and short outstation routes.',
    destinationSuitability: {
      mussoorie: { rating: 'ideal', note: 'Perfect for Dehradun-Mussoorie runs; comfortable on moderate hill roads.' },
      rishikesh: { rating: 'ideal', note: 'Ideal for Dehradun-Rishikesh trips; smooth plains roads.' },
      haridwar: { rating: 'ideal', note: 'Excellent for Rishikesh-Haridwar and Dehradun-Haridwar routes.' },
      nainital: { rating: 'good', note: 'Suitable for Nainital trips; limited on very steep approach roads.' },
      'jim-corbett': { rating: 'good', note: 'Capable for most Jim Corbett access roads; some bumpy stretches.' },
      chopta: { rating: 'limited', note: 'Can reach Chopta but less ideal due to steep final climb.' },
      auli: { rating: 'limited', note: 'Not recommended; severe mountain roads require SUV ground clearance.' },
      kedarnath: { rating: 'not-recommended', note: 'Base services only; serious Char Dham yatra requires Innova Crysta.' },
      badrinath: { rating: 'not-recommended', note: 'Base services only; serious Char Dham yatra requires Innova Crysta.' },
      gangotri: { rating: 'not-recommended', note: 'Base services only; serious Char Dham yatra requires Innova Crysta.' },
      yamunotri: { rating: 'not-recommended', note: 'Base services only; serious Char Dham yatra requires Innova Crysta.' },
      'valley-of-flowers': { rating: 'limited', note: 'Limited access; connecting car only to Govindghat base.' },
      'char-dham': { rating: 'not-recommended', note: 'Not recommended for full Char Dham circuit; use Innova Crysta.' },
    },
    seasonalSuitability: 'Summer (May–Oct): Fully suitable. Winter (Nov–Apr): Roads remain open but hazardous conditions (snow, ice) reduce comfort and speed on hill sections.',
    useCases: ['Airport transfers', 'City sightseeing tours', 'Couples & solo traveler trips', 'Weekend getaways to nearby hill stations', 'Local Dehradun commuting'],
  },
  ertiga: {
    slug: 'ertiga',
    name: 'Maruti Ertiga',
    shortName: 'Ertiga',
    tagline: 'The practical 6-seater for family trips and mid-size groups',
    category: 'SUV',
    models: ['Maruti Ertiga'],
    seating: 6,
    seatingLabel: '6 Passengers',
    luggage: '3 Large Bags + 2 Cabin Bags',
    acType: 'Dual-Zone AC (Front + Rear)',
    idealFor: [
      'Families of 5-6 traveling together',
      'Mid-size groups wanting more room than a Sedan',
      'Mussoorie, Rishikesh, Haridwar, and Nainital trips',
      'Short Char Dham legs in good weather',
    ],
    notIdealFor: [
      'Groups larger than 6',
      'Very heavy luggage loads (better suited to Innova or Tempo Traveller)',
    ],
    bestRoutes: ['dehradun-mussoorie', 'dehradun-rishikesh', 'dehradun-nainital', 'dehradun-haridwar'],
    pricing: {
      hasFixedRoutes: true,
      perKmRate: '₹20 - ₹25',
      localPackageRate: '₹3,500',
      quoteOnRequest: false,
    },
    description:
      'The Ertiga is our most popular SUV for families and mid-size groups who have outgrown a Sedan but don\u2019t yet need a full 7-seater Innova. With 6 seats across three rows, dual-zone air conditioning, and solid luggage capacity, it strikes the right balance of comfort and value for trips to Mussoorie, Rishikesh, Haridwar, and Nainital.',
    metaDescription:
      'Book a Maruti Ertiga taxi in Dehradun and Uttarakhand. 6-seater SUV with fixed fares from ₹3,000, ideal for family trips, mid-size groups, and hill station travel.',
    destinationSuitability: {
      mussoorie: { rating: 'ideal', note: 'Excellent choice; good ground clearance and space for family groups.' },
      rishikesh: { rating: 'ideal', note: 'Perfect for larger families; smooth roads and ample seating.' },
      haridwar: { rating: 'ideal', note: 'Great for mid-size groups; well-maintained roads throughout.' },
      nainital: { rating: 'good', note: 'Good option for Nainital trips; handles hill roads comfortably.' },
      'jim-corbett': { rating: 'good', note: 'Suitable for Jim Corbett access; decent ground clearance for rough patches.' },
      chopta: { rating: 'good', note: 'Can handle Chopta climb; good for smaller family groups.' },
      auli: { rating: 'limited', note: 'Limited; extreme altitude and weather conditions are challenging.' },
      kedarnath: { rating: 'limited', note: 'Base-only rides; steep Char Dham roads better served by Innova.' },
      badrinath: { rating: 'limited', note: 'Base-only rides; steep Char Dham roads better served by Innova.' },
      gangotri: { rating: 'limited', note: 'Base-only rides; steep Char Dham roads better served by Innova.' },
      yamunotri: { rating: 'limited', note: 'Base-only rides; steep Char Dham roads better served by Innova.' },
      'valley-of-flowers': { rating: 'good', note: 'Good for rides to Govindghat base; families can reach easily.' },
      'char-dham': { rating: 'limited', note: 'Limited; full yatra better handled by Innova Crysta.' },
    },
    seasonalSuitability: 'Summer–Monsoon (May–Sep): Ideal season. Early Winter (Oct–Nov): Good conditions. Winter (Dec–Mar): Can operate but risk increases on high-altitude passes.',
    useCases: ['Family holidays', '5-6 person group tours', 'Wedding guest transport', 'Corporate team outings', 'Multi-day hill station packages'],
  },
  'innova-crysta': {
    slug: 'innova-crysta',
    name: 'Toyota Innova Crysta',
    shortName: 'Innova Crysta',
    tagline: 'The gold standard for Char Dham Yatra and mountain travel',
    category: 'SUV',
    models: ['Toyota Innova Crysta'],
    seating: 7,
    seatingLabel: '7 Passengers',
    luggage: '4 Large Bags + 2 Cabin Bags',
    acType: 'Dual-Zone AC (Front + Rear)',
    idealFor: [
      'Char Dham Yatra (Kedarnath, Badrinath, Yamunotri, Gangotri)',
      'Families and groups of 6-7',
      'Long-distance mountain routes with steep climbs',
      'Trips requiring maximum luggage capacity',
      'Travelers prioritizing ride comfort over budget',
    ],
    bestRoutes: ['dehradun-kedarnath', 'dehradun-badrinath', 'haridwar-kedarnath', 'rishikesh-kedarnath', 'dehradun-govindghat', 'dehradun-nainital'],
    pricing: {
      hasFixedRoutes: true,
      perKmRate: '₹28 - ₹35',
      localPackageRate: '₹3,500',
      quoteOnRequest: false,
    },
    description:
      'The Toyota Innova Crysta is the most trusted vehicle for Char Dham Yatra and high-altitude Himalayan routes, and it is the vehicle our drivers themselves recommend most often for Kedarnath and Badrinath. With 7 seats, superior ground clearance, dual-zone climate control, and the largest luggage capacity in our SUV lineup, it handles steep mountain roads, hairpin bends, and long multi-day pilgrimages with the comfort and reliability serious Himalayan travel demands.',
    metaDescription:
      'Book a Toyota Innova Crysta taxi for Char Dham Yatra and Uttarakhand mountain routes. 7-seater SUV with fixed fares from ₹3,000, the recommended vehicle for Kedarnath and Badrinath.',
    destinationSuitability: {
      mussoorie: { rating: 'ideal', note: 'Excellent for larger groups; superior comfort and handling.' },
      rishikesh: { rating: 'ideal', note: 'Great choice; smooth plains and comfortable seating for families.' },
      haridwar: { rating: 'ideal', note: 'Perfect for group trips; spacious and reliable throughout.' },
      nainital: { rating: 'ideal', note: 'Ideal option; excellent ground clearance and climb performance.' },
      'jim-corbett': { rating: 'ideal', note: 'Top choice; handles all Jim Corbett access roads with ease.' },
      chopta: { rating: 'ideal', note: 'Best in class for steep Chopta climbs; smooth and commanding.' },
      auli: { rating: 'good', note: 'Can reach Auli; high altitude and winter weather remain challenging.' },
      kedarnath: { rating: 'ideal', note: 'The recommended vehicle; handles extreme terrain and pilgrim comfort.' },
      badrinath: { rating: 'ideal', note: 'The recommended vehicle; trusted for steep climbs and long journeys.' },
      gangotri: { rating: 'ideal', note: 'Excellent choice; superior handling of hairpin bends and altitude.' },
      yamunotri: { rating: 'ideal', note: 'Top choice; comfortable for Char Dham yatra sections.' },
      'valley-of-flowers': { rating: 'ideal', note: 'Excellent for entire journey including Govindghat and access roads.' },
      'char-dham': { rating: 'ideal', note: 'The gold standard for full Char Dham circuit; trusted by pilgrims.' },
    },
    seasonalSuitability: 'Summer (May–Oct): Ideal season for all routes. Winter (Nov–Apr): Can operate, but serious equipment and driver experience required; winter closure windows apply to some high-altitude passes.',
    useCases: ['Char Dham pilgrimage tours', 'Large family vacations', 'Multi-day mountain expeditions', 'Premium group travel', 'Adventure tourism packages'],
  },
  'tempo-traveller': {
    slug: 'tempo-traveller',
    name: 'Tempo Traveller',
    shortName: 'Tempo Traveller',
    tagline: 'Spacious group transport for pilgrimage groups and large families',
    category: 'Group Vehicle',
    models: ['Force Tempo Traveller'],
    seating: 12,
    seatingLabel: '12-17 Passengers',
    luggage: 'Dedicated Rear Luggage Compartment',
    acType: 'Full AC (Bus-style vents)',
    idealFor: [
      'Pilgrimage groups for Char Dham Yatra',
      'Large families (10+ members)',
      'Group sightseeing tours',
      'Wedding and event group transport',
    ],
    notIdealFor: [
      'Solo travelers or couples (oversized and costlier than needed)',
      'Narrow village or ashram lanes with tight turning radius',
    ],
    bestRoutes: ['dehradun-kedarnath', 'dehradun-badrinath', 'dehradun-nainital'],
    pricing: {
      hasFixedRoutes: false,
      quoteOnRequest: true,
    },
    description:
      'The Tempo Traveller is built for groups: pilgrimage parties heading out on Char Dham Yatra, large joint families, and group tours that need everyone traveling together in one vehicle. Available in 12 to 17-seater configurations with a dedicated rear luggage compartment, it is quoted on request based on group size, itinerary, and number of night halts \u2014 message us on WhatsApp with your group size and route for a fixed quote.',
    metaDescription:
      'Book a Tempo Traveller (12-17 seater) in Dehradun for Char Dham Yatra, group tours, and large family travel across Uttarakhand. Quote on request via WhatsApp.',
    destinationSuitability: {
      mussoorie: { rating: 'good', note: 'Suitable for group tours; parking limitations in town areas.' },
      rishikesh: { rating: 'good', note: 'Good for larger groups; moderate roads and urban navigation.' },
      haridwar: { rating: 'good', note: 'Suitable for pilgrimage group transport and temple visits.' },
      nainital: { rating: 'good', note: 'Good option for organized group tours; limited tight-lane access.' },
      'jim-corbett': { rating: 'good', note: 'Suitable for wildlife group tours; decent road conditions.' },
      chopta: { rating: 'limited', note: 'Limited; very steep and narrow final approach roads.' },
      auli: { rating: 'limited', note: 'Limited; extreme altitude and narrow mountain roads unsuitable.' },
      kedarnath: { rating: 'ideal', note: 'Ideal for large pilgrimage groups; base-to-valley coordination required.' },
      badrinath: { rating: 'ideal', note: 'Ideal for large pilgrimage groups; base-to-valley coordination required.' },
      gangotri: { rating: 'ideal', note: 'Perfect for large group yatra; efficient group transport.' },
      yamunotri: { rating: 'ideal', note: 'Perfect for large group yatra; efficient group transport.' },
      'valley-of-flowers': { rating: 'good', note: 'Good for group coordination to Govindghat; final hiking on foot.' },
      'char-dham': { rating: 'ideal', note: 'Excellent for full Char Dham circuit group tours; economies of scale.' },
    },
    seasonalSuitability: 'Summer (May–Oct): Best season for all routes. Monsoon (Jun–Sep): Proceed with caution; landslide risks. Winter (Nov–Apr): Limited operations; high-altitude passes may close.',
    useCases: ['Large pilgrimage groups (10+)', 'Corporate team building tours', 'Wedding group transport', 'Religious organization outings', 'Multi-day group adventure packages'],
  },
  'force-urbania': {
    slug: 'force-urbania',
    name: 'Force Urbania',
    shortName: 'Force Urbania',
    tagline: 'Premium group travel for corporate and large tour groups',
    category: 'Premium Group Vehicle',
    models: ['Force Urbania'],
    seating: 12,
    seatingLabel: '12-17 Passengers',
    luggage: 'Dedicated Rear Luggage Compartment',
    acType: 'Premium Full AC',
    idealFor: [
      'Corporate group travel and offsites',
      'Premium group tours and pilgrimage packages',
      'Large families wanting extra comfort over a standard Tempo Traveller',
      'Multi-day Char Dham group packages',
    ],
    notIdealFor: [
      'Solo travelers or small families',
      'Budget-conscious bookings (Tempo Traveller is more economical for the same capacity)',
    ],
    bestRoutes: ['dehradun-kedarnath', 'dehradun-badrinath', 'dehradun-nainital'],
    pricing: {
      hasFixedRoutes: false,
      quoteOnRequest: true,
    },
    description:
      'The Force Urbania is our premium group vehicle, built for corporate travel and tour groups who want a higher level of comfort than a standard Tempo Traveller while keeping everyone together in one 12-17 seater vehicle. With premium upholstery, full air conditioning, and a dedicated luggage compartment, it suits corporate offsites, premium pilgrimage packages, and large group tours. Available on request \u2014 message us on WhatsApp with your group size and route for a fixed quote.',
    metaDescription:
      'Book a Force Urbania (12-17 seater premium vehicle) in Dehradun for corporate travel and large group tours across Uttarakhand. Quote on request via WhatsApp.',
    destinationSuitability: {
      mussoorie: { rating: 'good', note: 'Good for premium group tours; excellent comfort and space.' },
      rishikesh: { rating: 'good', note: 'Great for corporate retreats and premium group experiences.' },
      haridwar: { rating: 'ideal', note: 'Ideal for premium pilgrimage packages and organized tours.' },
      nainital: { rating: 'ideal', note: 'Perfect for luxury group getaways; premium comfort on hill roads.' },
      'jim-corbett': { rating: 'good', note: 'Good for premium wildlife tour groups; excellent onboard comfort.' },
      chopta: { rating: 'limited', note: 'Limited; extreme steepness and narrow roads challenge large vehicle.' },
      auli: { rating: 'limited', note: 'Limited; altitude and narrow terrain unsuitable for premium coach.' },
      kedarnath: { rating: 'good', note: 'Good for premium pilgrimage groups; base coordination required.' },
      badrinath: { rating: 'good', note: 'Good for premium pilgrimage groups; base coordination required.' },
      gangotri: { rating: 'ideal', note: 'Ideal for premium Char Dham group packages with full comfort.' },
      yamunotri: { rating: 'ideal', note: 'Ideal for premium Char Dham group packages with full comfort.' },
      'valley-of-flowers': { rating: 'good', note: 'Good for premium group coordination to Govindghat and beyond.' },
      'char-dham': { rating: 'ideal', note: 'Excellent for premium multi-day Char Dham circuit groups.' },
    },
    seasonalSuitability: 'Summer (May–Oct): Ideal for all operations. Monsoon (Jun–Sep): Possible with caution and experience. Winter (Nov–Apr): Limited; not recommended for high-altitude passes.',
    useCases: ['Corporate offsites and retreats', 'Premium pilgrimage tours', 'Luxury group vacations', 'VIP delegations and group visits', 'High-end adventure packages'],
  },
};

export function getVehicle(slug: VehicleSlug): Vehicle {
  const vehicle = VEHICLES[slug];
  if (!vehicle) {
    throw new Error(`Vehicle slug "${slug}" not found in VEHICLES`);
  }
  return vehicle;
}

export function getAllVehicles(): Vehicle[] {
  return Object.values(VEHICLES);
}

/** Vehicles other than the given slug — useful for "Compare" / "Other Vehicles" widgets */
export function getOtherVehicles(slug: VehicleSlug, limit?: number): Vehicle[] {
  const others = Object.values(VEHICLES).filter((v) => v.slug !== slug);
  return limit ? others.slice(0, limit) : others;
}
