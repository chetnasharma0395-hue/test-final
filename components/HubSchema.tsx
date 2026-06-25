/**
 * components/HubSchema.tsx
 *
 * Emits a LocalBusiness JSON-LD node for a specific regional hub.
 * Rendered as a visually-hidden <script> tag — no UI output.
 *
 * Graceful degradation:
 *   • Missing phone    → falls back to CENTRAL_PHONE
 *   • Missing address  → falls back to CENTRAL_ADDRESS (Dehradun HQ)
 *   • Missing geo      → geo block omitted entirely
 *   • Missing GBP URL  → sameAs only includes the main domain
 *   • pending status   → schema still emits (valid fallback data), but
 *                        @id is scoped to the hub city to avoid
 *                        conflicting with the primary Dehradun node
 *
 * Usage (in any city page server component):
 *   import { HubSchema } from '@/components/HubSchema';
 *   <HubSchema hubId="rishikesh" />
 */

import {
  getHub,
  resolvePhone,
  resolveAddress,
  BASE_URL,
  CENTRAL_EMAIL,
  CENTRAL_PHONE_2,
  CENTRAL_ADDRESS,
} from '@/lib/hubData';

interface HubSchemaProps {
  hubId: string;
}

export function HubSchema({ hubId }: HubSchemaProps) {
  const hub = getHub(hubId);

  // Unknown hub id — emit nothing rather than broken schema
  if (!hub) return null;

  const phone = resolvePhone(hub);
  const address = resolveAddress(hub);
  const isUsingFallbackAddress = hub.address === null;

  const hubBusinessId = `${BASE_URL}/#business-${hub.id}`;

  const sameAs: string[] = [BASE_URL];
  if (hub.gbpUrl) sameAs.push(hub.gbpUrl);

  const schemaNode: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': hubBusinessId,
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
      streetAddress: isUsingFallbackAddress
        ? CENTRAL_ADDRESS.streetAddress   // HQ address as fallback
        : address.streetAddress,
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
    // Link back to primary business node
    parentOrganization: {
      '@id': `${BASE_URL}/#business`,
    },
  };

  // Only emit geo if we have coordinates — never emit approximate/placeholder zeros
  if (hub.geo && hub.geo.latitude !== 0 && hub.geo.longitude !== 0) {
    schemaNode.geo = {
      '@type': 'GeoCoordinates',
      latitude: hub.geo.latitude,
      longitude: hub.geo.longitude,
    };
  }

  // Emit gbpPlaceId as identifier if available
  if (hub.gbpPlaceId) {
    schemaNode.identifier = {
      '@type': 'PropertyValue',
      name: 'Google Place ID',
      value: hub.gbpPlaceId,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaNode) }}
    />
  );
}
