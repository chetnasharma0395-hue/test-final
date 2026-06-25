/**
 * CENTRALIZED PRICING SYSTEM
 * Single source of truth for all taxi fares
 * Last Updated: June 18, 2026
 */

export interface Route {
  key: string;
  name: string;
  from: string;
  to: string;
  distance: number;
  duration: string;
  sedan: number;
  suv: number;
  notes?: string;
}

export interface PackagePrice {
  key: string;
  name: string;
  duration: string;
  minDays: number;
  maxDays: number;
  sedanMin: number;
  sedanMax: number;
  suvMin: number;
  suvMax: number;
}

// MAIN ROUTE PRICING DATA - Source of Truth
export const PRICING_DATA: Record<string, Route> = {
  // Dehradun Base Routes
  'dehradun-mussoorie': {
    key: 'dehradun-mussoorie',
    name: 'Dehradun to Mussoorie',
    from: 'Dehradun',
    to: 'Mussoorie',
    distance: 35,
    duration: '1.5 hours',
    sedan: 2000,
    suv: 3000,
  },
  'dehradun-rishikesh': {
    key: 'dehradun-rishikesh',
    name: 'Dehradun to Rishikesh',
    from: 'Dehradun',
    to: 'Rishikesh',
    distance: 50,
    duration: '1.5 hours',
    sedan: 2300,
    suv: 3300,
  },
  'dehradun-haridwar': {
    key: 'dehradun-haridwar',
    name: 'Dehradun to Haridwar',
    from: 'Dehradun',
    to: 'Haridwar',
    distance: 55,
    duration: '1.5 hours',
    sedan: 2000,
    suv: 3000,
  },
  'haridwar-rishikesh': {
    key: 'haridwar-rishikesh',
    name: 'Haridwar to Rishikesh',
    from: 'Haridwar',
    to: 'Rishikesh',
    distance: 25,
    duration: '45 minutes',
    sedan: 1700,
    suv: 2300,
  },

  // Airport Routes
  'jolly-grant-mussoorie': {
    key: 'jolly-grant-mussoorie',
    name: 'Jolly Grant Airport to Mussoorie',
    from: 'Jolly Grant Airport',
    to: 'Mussoorie',
    distance: 60,
    duration: '1.5 hours',
    sedan: 3000,
    suv: 4000,
  },
  'jolly-grant-dehradun': {
    key: 'jolly-grant-dehradun',
    name: 'Jolly Grant Airport to Dehradun',
    from: 'Jolly Grant Airport',
    to: 'Dehradun',
    distance: 25,
    duration: '45 minutes',
    sedan: 1500,
    suv: 2300,
  },

  // Major Destinations
  'dehradun-jim-corbett': {
    key: 'dehradun-jim-corbett',
    name: 'Dehradun to Jim Corbett',
    from: 'Dehradun',
    to: 'Jim Corbett National Park',
    distance: 200,
    duration: '5-6 hours',
    sedan: 4000,
    suv: 5000,
  },
  'delhi-jim-corbett': {
    key: 'delhi-jim-corbett',
    name: 'Delhi to Jim Corbett',
    from: 'Delhi',
    to: 'Jim Corbett National Park',
    distance: 260,
    duration: '6-7 hours',
    sedan: 5000,
    suv: 6000,
  },
  'rishikesh-jim-corbett': {
    key: 'rishikesh-jim-corbett',
    name: 'Rishikesh to Jim Corbett',
    from: 'Rishikesh',
    to: 'Jim Corbett National Park',
    distance: 180,
    duration: '4.5-5 hours',
    sedan: 3500,
    suv: 4500,
  },
  'mussoorie-jim-corbett': {
    key: 'mussoorie-jim-corbett',
    name: 'Mussoorie to Jim Corbett',
    from: 'Mussoorie',
    to: 'Jim Corbett National Park',
    distance: 230,
    duration: '5.5-6.5 hours',
    sedan: 4500,
    suv: 5500,
  },

  // Nainital Routes
  'dehradun-nainital': {
    key: 'dehradun-nainital',
    name: 'Dehradun to Nainital',
    from: 'Dehradun',
    to: 'Nainital',
    distance: 280,
    duration: '7 hours',
    sedan: 7000,
    suv: 9000,
  },
  'kathgodam-nainital': {
    key: 'kathgodam-nainital',
    name: 'Kathgodam to Nainital',
    from: 'Kathgodam',
    to: 'Nainital',
    distance: 35,
    duration: '1.5 hours',
    sedan: 1500,
    suv: 2000,
  },

  // Char Dham Routes
  'dehradun-kedarnath': {
    key: 'dehradun-kedarnath',
    name: 'Dehradun to Kedarnath (Gaurikund)',
    from: 'Dehradun',
    to: 'Gaurikund (Kedarnath)',
    distance: 250,
    duration: '8-9 hours',
    sedan: 8500,
    suv: 10500,
  },
  'dehradun-badrinath': {
    key: 'dehradun-badrinath',
    name: 'Dehradun to Badrinath',
    from: 'Dehradun',
    to: 'Badrinath',
    distance: 320,
    duration: '10-11 hours',
    sedan: 9000,
    suv: 11000,
  },
  'haridwar-kedarnath': {
    key: 'haridwar-kedarnath',
    name: 'Haridwar to Kedarnath',
    from: 'Haridwar',
    to: 'Gaurikund (Kedarnath)',
    distance: 240,
    duration: '8 hours',
    sedan: 8000,
    suv: 10000,
  },
  'rishikesh-kedarnath': {
    key: 'rishikesh-kedarnath',
    name: 'Rishikesh to Kedarnath',
    from: 'Rishikesh',
    to: 'Gaurikund (Kedarnath)',
    distance: 220,
    duration: '7.5 hours',
    sedan: 7000,
    suv: 9500,
  },

  // Valley of Flowers
  'dehradun-govindghat': {
    key: 'dehradun-govindghat',
    name: 'Dehradun to Govindghat (Valley of Flowers)',
    from: 'Dehradun',
    to: 'Govindghat',
    distance: 290,
    duration: '9-10 hours',
    sedan: 10500,
    suv: 14000,
  },
  'rishikesh-govindghat': {
    key: 'rishikesh-govindghat',
    name: 'Rishikesh to Govindghat',
    from: 'Rishikesh',
    to: 'Govindghat',
    distance: 265,
    duration: '8-9 hours',
    sedan: 9500,
    suv: 12500,
  },
  'haridwar-govindghat': {
    key: 'haridwar-govindghat',
    name: 'Haridwar to Govindghat',
    from: 'Haridwar',
    to: 'Govindghat',
    distance: 275,
    duration: '8-9 hours',
    sedan: 10000,
    suv: 13000,
  },

  // Delhi Routes
  'delhi-dehradun': {
    key: 'delhi-dehradun',
    name: 'Delhi to Dehradun',
    from: 'Delhi',
    to: 'Dehradun',
    distance: 240,
    duration: '6-7 hours',
    sedan: 4000,
    suv: 5000,
  },
};

// PACKAGE PRICING - Multi-day packages
export const PACKAGE_PRICING: Record<string, PackagePrice> = {
  'char-dham': {
    key: 'char-dham',
    name: 'Char Dham Yatra (All 4 Dhams)',
    duration: 'Complete Pilgrimage',
    minDays: 10,
    maxDays: 12,
    sedanMin: 40000,
    sedanMax: 40000,
    suvMin: 55000,
    suvMax: 55000,
  },
  'do-dham-kedarnath-badrinath': {
    key: 'do-dham-kedarnath-badrinath',
    name: 'Do Dham (Kedarnath + Badrinath)',
    duration: 'Pilgrimage',
    minDays: 5,
    maxDays: 6,
    sedanMin: 15000,
    sedanMax: 18000,
    suvMin: 20000,
    suvMax: 24000,
  },
  'do-dham-yamunotri-gangotri': {
    key: 'do-dham-yamunotri-gangotri',
    name: 'Do Dham (Yamunotri + Gangotri)',
    duration: 'Pilgrimage',
    minDays: 4,
    maxDays: 5,
    sedanMin: 12000,
    sedanMax: 15000,
    suvMin: 16000,
    suvMax: 20000,
  },
  'ek-dham': {
    key: 'ek-dham',
    name: 'Ek Dham (Any Single Dham)',
    duration: 'Pilgrimage',
    minDays: 2,
    maxDays: 3,
    sedanMin: 7500,
    sedanMax: 10000,
    suvMin: 10000,
    suvMax: 14000,
  },
};

// UTILITY FUNCTIONS

/**
 * Get a single route by key
 */
export function getRoute(key: string): Route {
  const route = PRICING_DATA[key];
  if (!route) {
    // Do NOT throw: getRoute is called at module load time by lib/schema.ts
    // (organizationSchema) which runs in app/layout.tsx. A missing key here
    // would crash the build for EVERY page. Warn and return a safe fallback.
    console.warn(`[priceData] Route key "${key}" not found in PRICING_DATA; using fallback.`);
    return {
      key,
      name: key,
      from: '',
      to: '',
      distance: 0,
      duration: '',
      sedan: 0,
      suv: 0,
    };
  }
  return route;
}

/**
 * Get all routes
 */
export function getAllRoutes(): Route[] {
  return Object.values(PRICING_DATA);
}

/**
 * Get package pricing by key
 */
export function getPackage(key: string): PackagePrice {
  const pkg = PACKAGE_PRICING[key];
  if (!pkg) {
    // Do NOT throw: getPackage is used at module load time by lib/schema.ts.
    // Warn and return a safe fallback to avoid crashing the build.
    console.warn(`[priceData] Package key "${key}" not found in PACKAGE_PRICING; using fallback.`);
    return {
      key,
      name: key,
      duration: '',
      minDays: 0,
      maxDays: 0,
      sedanMin: 0,
      sedanMax: 0,
      suvMin: 0,
      suvMax: 0,
    };
  }
  return pkg;
}

/**
 * Format price as currency string
 */
export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

/**
 * Get fare display text for a route
 * Example: "₹2,000 - ₹3,000"
 */
export function getFareDisplay(key: string): string {
  const route = getRoute(key);
  return `${formatPrice(route.sedan)} - ${formatPrice(route.suv)}`;
}

/**
 * Get formatted route info for display
 */
export function getRouteDisplay(key: string) {
  const route = getRoute(key);
  return {
    name: route.name,
    from: route.from,
    to: route.to,
    distance: route.distance,
    duration: route.duration,
    sedan: formatPrice(route.sedan),
    suv: formatPrice(route.suv),
    fareRange: getFareDisplay(key),
  };
}

/**
 * Get routes by destination (partial key match)
 */
export function getRoutesByDestination(destination: string): Route[] {
  return Object.values(PRICING_DATA).filter(
    route => route.to.toLowerCase().includes(destination.toLowerCase()) ||
             route.from.toLowerCase().includes(destination.toLowerCase())
  );
}

/**
 * Get related routes (same destination, different origin)
 */
export function getRelatedRoutes(key: string, limit: number = 3): Route[] {
  const route = getRoute(key);
  const related = Object.values(PRICING_DATA).filter(
    r => r.key !== key && r.to === route.to
  );
  return related.slice(0, limit);
}

/**
 * Validate all prices are consistent with current system
 */
export function validatePricing(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  Object.entries(PRICING_DATA).forEach(([key, route]) => {
    if (route.sedan <= 0) {
      errors.push(`${key}: Sedan price must be > 0`);
    }
    if (route.suv <= 0) {
      errors.push(`${key}: SUV price must be > 0`);
    }
    if (route.suv <= route.sedan) {
      errors.push(`${key}: SUV price (${route.suv}) should be > sedan price (${route.sedan})`);
    }
    if (!route.from) {
      errors.push(`${key}: Missing 'from' field`);
    }
    if (!route.to) {
      errors.push(`${key}: Missing 'to' field`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get all unique destinations
 */
export function getAllDestinations(): string[] {
  const destinations = new Set<string>();
  Object.values(PRICING_DATA).forEach(route => {
    destinations.add(route.to);
  });
  return Array.from(destinations).sort();
}

/**
 * Get cheapest route to a destination
 */
export function getCheapestRoute(destination: string): Route | null {
  const routes = getRoutesByDestination(destination);
  if (routes.length === 0) return null;
  return routes.reduce((cheapest, route) =>
    route.sedan < cheapest.sedan ? route : cheapest
  );
}

/**
 * Export pricing data for APIs/external use
 */
export function exportPricingJSON() {
  return {
    lastUpdated: new Date().toISOString(),
    routes: PRICING_DATA,
    packages: PACKAGE_PRICING,
    stats: {
      totalRoutes: Object.keys(PRICING_DATA).length,
      totalPackages: Object.keys(PACKAGE_PRICING).length,
    },
  };
}
