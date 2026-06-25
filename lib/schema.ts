/**
 * lib/schema.ts
 * Centralized structured-data (JSON-LD) factory for Uttarakhand Cab 24/7.
 *
 * Usage in any server component:
 * import { faqPageSchema, breadcrumbSchema, taxiServiceSchema } from '@/lib/schema';
 * const schema = faqPageSchema(myFaqs);
 * // Then: <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 */

import { getRoute, getPackage, formatPrice } from './priceData';
import {
  HUBS,
  resolvePhone,
  resolveAddress,
  CENTRAL_PHONE,
  CENTRAL_PHONE_2,
  CENTRAL_EMAIL,
  BASE_URL as HUB_BASE_URL,
} from './hubData';

const BASE_URL = 'https://uttarakhand.cab';
const BUSINESS_ID = `${BASE_URL}/#business`;

// Real, verified customer reviews extracted from your Google Business Profile
const RAW_REVIEWS = [
  { name: 'Ashutosh Kumar', text: 'Great experience with great cab service. Smooth booking process with clear and simple details. Highly recommended for anyone who wants a trusted and safe cab service in Uttarakhand.', date: '2025-05-20' },
  { name: 'Balaji Premnath', text: 'Great communication, on time, cars were good and drivers were great focusing on safety especially on mountain roads.', date: '2025-05-27' },
  { name: 'Ameya Oke', text: 'Our tour experience was fantastic. Our driver Buran was excellent and very helpful throughout the journey. Will recommend to family and friends.', date: '2025-05-27' },
  { name: 'Khabar Har Bar Ki', text: 'We booked a taxi from Haridwar to Auli through Uttarakhand Cab 24/7 and the experience was very smooth. The driver knew all the hill routes well. Really good option for long hill trips and family travel.', date: '2024-09-01' },
  { name: 'Virendra Ganshin', text: 'Had a really good experience with Uttarakhand Cab 24/7. Booked a cab from Dehradun for our Uttarakhand trip and everything was smooth from pickup to drop. Driver was polite, vehicle was clean and the journey was comfortable throughout.', date: '2025-06-03' },
  { name: 'Abad Khan', text: 'Booked a cab for our family trip to Rishikesh and Mussoorie. Driver arrived on time, drove safely in the hills and the cab was clean and comfortable. Pricing was fair compared to other taxi services.', date: '2025-06-03' },
  { name: 'Loki Chauhan', text: 'Exceptional service! The driver was punctual, friendly, and went above and beyond. Highly recommend this taxi service for reliable and comfortable rides. 5 stars is not enough — they deserve 10!', date: '2024-12-10' },
  { name: 'Prateek Joshi', text: 'Amazing experience during my 8-day trip. The driver was extremely professional, polite, and ensured comfort throughout. The team also helped with hotel bookings and adventure activities. Highly recommend for reliable and helpful cab service.', date: '2024-12-10' }
];

// Shared review nodes for the LocalBusiness (rendered once, sitewide, in layout)
const BUSINESS_REVIEWS = RAW_REVIEWS.map((rev, index) => ({
  '@type': 'Review',
  '@id': `${BASE_URL}/#review-${index + 1}`,
  author: {
    '@type': 'Person',
    name: rev.name,
  },
  datePublished: rev.date,
  reviewBody: rev.text,
  reviewRating: {
    '@type': 'Rating',
    ratingValue: 5,
    bestRating: 5,
    worstRating: 1,
  },
  itemReviewed: {
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Uttarakhand Cab 24/7',
  },
}));

// ─── Shared provider base reference ──────────────────────────────────────────
export const localBusinessProvider = {
  '@type': 'LocalBusiness',
  '@id': BUSINESS_ID,
  name: 'Uttarakhand Cab 24/7',
  telephone: '+919258912169',
  additionalProperty: [
    {
      '@type': 'PropertyValue',
      name: 'Secondary Phone',
      value: '+919675212169',
    },
  ],
  url: BASE_URL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Punj 86/1, Ballupur Road, Mitralok Colony',
    addressLocality: 'Dehradun',
    addressRegion: 'Uttarakhand',
    postalCode: '248001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 30.3165,
    longitude: 78.0322,
  }
};

// ─── Types ───────────────────────────────────────────────────────────────────

export interface FAQSchemaItem {
  question: string;
  answer: string;
}

export interface BreadcrumbSchemaItem {
  name: string;
  /** Absolute or relative URL. Relative paths are resolved to BASE_URL. */
  url: string;
}

export interface TaxiServiceSchemaParams {
  name: string;
  description: string;
  /** Full canonical URL of the service page */
  url: string;
  /** Raw price string e.g. "Starting from ₹1,500" or "3500" */
  price?: string | number;
  from?: string;
  to?: string;
}

// ─── 1. FAQPage ───────────────────────────────────────────────────────────────

export function faqPageSchema(faqs: FAQSchemaItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ─── 2. BreadcrumbList ────────────────────────────────────────────────────────

export function breadcrumbSchema(items: BreadcrumbSchemaItem[]) {
  const allItems = [
    { name: 'Home', url: BASE_URL },
    ...items.map((item) => ({
      ...item,
      url: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── 3. TaxiService with Offer ────────────────────────────────────────────────

export function taxiServiceSchema(params: TaxiServiceSchemaParams) {
  const numericPrice = params.price
    ? String(params.price).replace(/[^\d]/g, '') || null
    : null;

  const serviceId = `${params.url}#service`;

  const serviceNode: Record<string, any> = {
    '@type': 'TaxiService',
    '@id': serviceId,
    name: params.name,
    description: params.description,
    url: params.url,
    provider: {
      '@id': BUSINESS_ID,
    },
    areaServed: {
      '@type': 'State',
      name: 'Uttarakhand',
    },
  };

  if (params.from) {
    serviceNode.departureLocation = {
      '@type': 'Place',
      name: params.from,
      address: {
        '@type': 'PostalAddress',
        addressLocality: params.from,
        addressCountry: 'IN',
      },
    };
  }

  if (params.to) {
    serviceNode.arrivalLocation = {
      '@type': 'Place',
      name: params.to,
      address: {
        '@type': 'PostalAddress',
        addressLocality: params.to,
        addressCountry: 'IN',
      },
    };
  }

  if (numericPrice) {
    serviceNode.offers = {
      '@type': 'Offer',
      price: numericPrice,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@id': BUSINESS_ID,
      },
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: numericPrice,
        priceCurrency: 'INR',
        name: 'Starting taxi fare',
      },
    };
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [serviceNode],
  };
}

// ─── 4. WebSite with SearchAction ─────────────────────────────────────────────

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: 'Uttarakhand Cab 24/7',
    url: BASE_URL,
    description: 'Book reliable taxi service in Dehradun & across Uttarakhand. Fixed fares, verified local drivers, 24/7 availability.',
    publisher: { '@id': BUSINESS_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/services/{search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ─── 5. Enhanced LocalBusiness (for global layout) ────────────────────────────
//      Now multi-hub aware: emits one LocalBusiness node per hub in @graph.
//      Pending hubs fall back to central NAP — no placeholder data in production.

export function localBusinessSchema() {
  // Build a LocalBusiness node for every hub in the registry
  const hubNodes = HUBS.map((hub) => {
    const phone = resolvePhone(hub);
    const address = resolveAddress(hub);
    const hubId = `${BASE_URL}/#business-${hub.id}`;
    const sameAs: string[] = [BASE_URL];
    if (hub.gbpUrl) sameAs.push(hub.gbpUrl);
    if (hub.id === 'dehradun') {
      // Social + WhatsApp links only on the primary hub
      sameAs.push(
        'https://www.instagram.com/uttarakhand.cab',
        'https://www.facebook.com/Uttarakhandcab247',
        'https://wa.me/919258912169',
        'https://wa.me/919675212169',
      );
    }

    const node: Record<string, unknown> = {
      '@type': 'LocalBusiness',
      '@id': hubId,
      name: hub.name,
      description: hub.description,
      url: BASE_URL,
      telephone: phone,
      email: CENTRAL_EMAIL,
      image: `${BASE_URL}/images/og-main.jpg`,
      logo: `${BASE_URL}/images/logo.png`,
      priceRange: '₹₹',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, UPI, Bank Transfer',
      openingHours: 'Mo-Su 00:00-23:59',
      address: {
        '@type': 'PostalAddress',
        streetAddress: address.streetAddress,
        addressLocality: address.addressLocality,
        addressRegion: address.addressRegion,
        postalCode: address.postalCode,
        addressCountry: 'IN',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: phone,
          contactType: 'customer service',
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
            opens: '00:00',
            closes: '23:59',
          },
        },
        {
          '@type': 'ContactPoint',
          telephone: CENTRAL_PHONE_2,
          contactType: 'reservations',
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
            opens: '00:00',
            closes: '23:59',
          },
        },
      ],
      sameAs,
    };

    // Geo — only emit when coordinates are confirmed (non-zero)
    if (hub.geo && hub.geo.latitude !== 0 && hub.geo.longitude !== 0) {
      node.geo = {
        '@type': 'GeoCoordinates',
        latitude: hub.geo.latitude,
        longitude: hub.geo.longitude,
      };
    }

    // GBP Place ID as structured identifier
    if (hub.gbpPlaceId) {
      node.identifier = {
        '@type': 'PropertyValue',
        name: 'Google Place ID',
        value: hub.gbpPlaceId,
      };
    }

    // Primary Dehradun hub gets full areaServed, reviews, rating, and social
    if (hub.id === 'dehradun') {
      node.areaServed = [
        { '@type': 'City', name: 'Dehradun' },
        { '@type': 'City', name: 'Mussoorie' },
        { '@type': 'City', name: 'Rishikesh' },
        { '@type': 'City', name: 'Haridwar' },
        { '@type': 'City', name: 'Nainital' },
        { '@type': 'City', name: 'Kedarnath' },
        { '@type': 'City', name: 'Badrinath' },
        { '@type': 'City', name: 'Yamunotri' },
        { '@type': 'City', name: 'Gangotri' },
        { '@type': 'State', name: 'Uttarakhand' },
      ];
      node.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '161',
        bestRating: '5',
        worstRating: '1',
      };
      // NOTE: individual reviews are intentionally kept on organizationSchema only.
      // Attaching them here caused "Review has multiple aggregate ratings" in
      // Google's Rich Results Test because the @graph parentOrganization links
      // make each Review appear associated with every hub node simultaneously.
      node.additionalProperty = [
        {
          '@type': 'PropertyValue',
          name: 'Secondary Phone',
          value: CENTRAL_PHONE_2,
        },
      ];
    } else {
      // Non-primary hubs: scoped areaServed + pointer to primary node
      node.areaServed = { '@type': 'City', name: address.addressLocality };
      node.parentOrganization = { '@id': `${BASE_URL}/#business-dehradun` };
    }

    return node;
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...hubNodes,
      websiteSchema(),
    ],
  };
}

// ─── 6. Organization schema ──────────────────────────────────────────────────

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Uttarakhand Cab 24/7',
    alternateName: ['Uttarakhand Cab', 'UC247', 'उत्तराखंड कैब 24/7'],
    slogan: 'Sahi safar sahi service — aur vo safar hamari zimmedaari',
    description: 'Uttarakhand Cab 24/7 is a professional taxi and tour operator based in Dehradun, Uttarakhand, India. Founded in 2012, we specialise in Char Dham Yatra circuits, airport transfers, and mountain cab services across the Garhwal and Kumaon Himalayas with verified local drivers and fixed transparent pricing.',
    foundingDate: '2012',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      // /assets/images/logo.png and /assets/images/og-main.jpg do not exist (404).
      // Use the verified assets under /public/images instead.
      url: `${BASE_URL}/images/logo.png`,
      width: 230,
      height: 230,
    },
    image: `${BASE_URL}/images/og-main.jpg`,
    telephone: ['+919258912169', '+919675212169'],
    email: 'uttarakhandcab247@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Punj 86/1, Ballupur Road, Mitralok Colony',
      addressLocality: 'Dehradun',
      addressRegion: 'Uttarakhand',
      postalCode: '248001',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'State',
      name: 'Uttarakhand',
      containsPlace: [
        { '@type': 'City', name: 'Dehradun' },
        { '@type': 'City', name: 'Mussoorie' },
        { '@type': 'City', name: 'Rishikesh' },
        { '@type': 'City', name: 'Haridwar' },
        { '@type': 'City', name: 'Nainital' },
        { '@type': 'City', name: 'Kedarnath' },
        { '@type': 'City', name: 'Badrinath' },
        { '@type': 'City', name: 'Yamunotri' },
        { '@type': 'City', name: 'Gangotri' },
        { '@type': 'City', name: 'Jolly Grant' },
        { '@type': 'City', name: 'Chopta' },
        { '@type': 'City', name: 'Auli' },
      ],
    },
    knowsAbout: [
      'Char Dham Yatra taxi service from Dehradun',
      'Kedarnath taxi and cab service',
      'Dehradun to Mussoorie taxi fare and route',
      'Jolly Grant Airport taxi transfers',
      'Himalayan mountain cab service Uttarakhand',
      'Rishikesh taxi service from Dehradun and Haridwar',
      'Haridwar taxi service',
      'Nainital cab service from Kathgodam',
      'Badrinath taxi package',
      'Yamunotri Gangotri Kedarnath pilgrimage taxi',
      'Outstation taxi service Uttarakhand',
      'Corporate cab rental Dehradun',
      'Mussoorie local sightseeing taxi',
      'Delhi to Dehradun expressway taxi service',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Uttarakhand Taxi & Tour Services 2026',
      itemListElement: [
        {
          '@type': 'Offer',
          '@id': `${BASE_URL}/#offer-mussoorie`,
          name: 'Dehradun to Mussoorie Taxi',
          description: `Fixed fare taxi from Dehradun to Mussoorie. Sedan ${formatPrice(getRoute('dehradun-mussoorie').sedan)}, SUV ${formatPrice(getRoute('dehradun-mussoorie').suv)}. Covers 35 km via Rajpur Road in approximately 1.5 hours.`,
          price: String(getRoute('dehradun-mussoorie').sedan),
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: `${BASE_URL}/mussoorie`,
          seller: { '@id': BUSINESS_ID },
        },
        {
          '@type': 'Offer',
          '@id': `${BASE_URL}/#offer-kedarnath`,
          name: 'Dehradun to Kedarnath Taxi (Gaurikund)',
          description: `Fixed fare taxi from Dehradun to Gaurikund (Kedarnath base camp). Sedan ${formatPrice(getRoute('dehradun-kedarnath').sedan)}, SUV ${formatPrice(getRoute('dehradun-kedarnath').suv)}. Covers 250 km in 8–9 hours via Rishikesh and Rudraprayag.`,
          price: String(getRoute('dehradun-kedarnath').sedan),
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: `${BASE_URL}/kedarnath`,
          seller: { '@id': BUSINESS_ID },
        },
        {
          '@type': 'Offer',
          '@id': `${BASE_URL}/#offer-char-dham`,
          name: 'Char Dham Yatra Taxi Package',
          description: `Complete ${getPackage('char-dham').minDays}-day Char Dham Yatra taxi package from Dehradun covering all four dhams: Yamunotri, Gangotri, Kedarnath, and Badrinath. Starting ${formatPrice(getPackage('char-dham').sedanMin)}.`,
          price: String(getPackage('char-dham').sedanMin),
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: `${BASE_URL}/char-dham`,
          seller: { '@id': BUSINESS_ID },
        },
        {
          '@type': 'Offer',
          '@id': `${BASE_URL}/#offer-airport`,
          name: 'Jolly Grant Airport Taxi Transfer',
          description: `On-time pickup and drop to Jolly Grant Airport (Dehradun) from any Uttarakhand destination. Sedan from ${formatPrice(getRoute('jolly-grant-dehradun').sedan)}. Flight-tracked pickups, 24/7.`,
          price: String(getRoute('jolly-grant-dehradun').sedan),
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: `${BASE_URL}/services/jolly-grant-airport-taxi-service`,
          seller: { '@id': BUSINESS_ID },
        },
        {
          '@type': 'Offer',
          '@id': `${BASE_URL}/#offer-rishikesh`,
          name: 'Dehradun to Rishikesh Taxi',
          description: `Fixed fare taxi from Dehradun to Rishikesh. Sedan ${formatPrice(getRoute('dehradun-rishikesh').sedan)}. Covers 50 km via NH7 in 1.5 hours.`,
          price: String(getRoute('dehradun-rishikesh').sedan),
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: `${BASE_URL}/rishikesh`,
          seller: { '@id': BUSINESS_ID },
        },
        {
          '@type': 'Offer',
          '@id': `${BASE_URL}/#offer-haridwar`,
          name: 'Dehradun to Haridwar Taxi',
          description: `Fixed fare taxi from Dehradun to Haridwar. Sedan ${formatPrice(getRoute('dehradun-haridwar').sedan)}. Covers 55 km via NH334 in 1.5 hours.`,
          price: String(getRoute('dehradun-haridwar').sedan),
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: `${BASE_URL}/haridwar`,
          seller: { '@id': BUSINESS_ID },
        },
      ],
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 20,
      maxValue: 50,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '161',
      bestRating: '5',
      worstRating: '1',
    },
    review: BUSINESS_REVIEWS,
    sameAs: [
      'https://uttarakhand.cab',
      'https://maps.app.goo.gl/yXUrkmjsyydETpzc8',
      'https://www.instagram.com/uttarakhand.cab',
      'https://www.facebook.com/Uttarakhandcab247',
      'https://wa.me/919258912169',
      'https://wa.me/919675212169',
    ],
  };
}

// ─── 7. Speakable schema ──────────────────────────────────────────────────────

export function speakableSchema(pageUrl: string, cssSelectors: string[] = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': pageUrl,
    url: pageUrl,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: [
        'h1',
        'h2',
        '.geo-answer-question',
        '.geo-answer-text',
        '.geo-faq-question',
        '.geo-faq-answer',
        ...cssSelectors,
      ],
    },
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': BUSINESS_ID },
    publisher: { '@id': BUSINESS_ID },
  };
}

// ─── 8. Vehicle schema (for fleet pages) ──────────────────────────────────────

export interface VehicleSchemaParams {
  name: string;
  description: string;
  url: string;
  seatingCapacity: number;
  image?: string;
  /** e.g. "Sedan", "SUV", "Van" */
  vehicleType?: string;
}

export function vehicleSchema(params: VehicleSchemaParams) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    '@id': `${params.url}#vehicle`,
    name: params.name,
    description: params.description,
    url: params.url,
    seatingCapacity: params.seatingCapacity,
    ...(params.image ? { image: params.image } : {}),
    ...(params.vehicleType ? { vehicleConfiguration: params.vehicleType } : {}),
    provider: { '@id': BUSINESS_ID },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
      seller: { '@id': BUSINESS_ID },
    },
  };
}

// ─── 9. ItemPage schema (for fleet/vehicle pages) ─────────────────────────────

export interface ItemPageSchemaParams {
  name: string;
  description: string;
  url: string;
}

export function itemPageSchema(params: ItemPageSchemaParams) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    '@id': `${params.url}#itempage`,
    name: params.name,
    description: params.description,
    url: params.url,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': `${params.url}#vehicle` },
  };
}

// ─── Utility: Extract from/to from route h1 ───────────────────────────────────

export function extractFromTo(h1: string): { from?: string; to?: string } {
  if (!h1) return {};
  const matchA = h1.match(
    /\b([\w\s()]+?)\s+to\s+([\w\s]+?)(?:\s+(?:Cab|Taxi|Transfer|Service|Package|Yatra).*)?$/i
  );
  if (matchA) {
    const rawFrom = matchA[1]
      .replace(/^(Safe\s*&?\s*Reliable\s*|Reliable\s*|Safe\s*|Best\s*|Premium\s*|Book\s*a?\s*)/i, '')
      .trim();
    const rawTo = matchA[2].trim();
    return {
      from: rawFrom || undefined,
      to: rawTo || undefined,
    };
  }
  const matchB = h1.match(/from\s+([\w\s()]+?)\s+to\s+([\w\s]+?)(?:\s|$)/i);
  if (matchB) {
    return {
      from: matchB[1].trim(),
      to: matchB[2].trim(),
    };
  }
  return {};
}
