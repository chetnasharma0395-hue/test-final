/**
 * lib/hubData.ts
 * Multi-hub NAP (Name, Address, Phone) configuration for Uttarakhand Cab 24/7.
 *
 * USAGE GUIDE
 * ───────────
 * • status: 'active'  — hub has a verified GBP listing. Full NAP rendered in schema + UI.
 * • status: 'pending' — GBP verification in progress. Falls back to central booking details
 *                       so the schema stays valid and no placeholder data leaks into production.
 *
 * PART B CHECKLIST (fill in when operations team confirms each hub):
 *   □ Verified GBP Place ID  → gbpPlaceId
 *   □ GBP listing URL        → gbpUrl
 *   □ Street address         → address.streetAddress + postalCode
 *   □ Exact geo coordinates  → geo.latitude / geo.longitude
 *   □ Dedicated phone line   → phone (or leave null to keep central number)
 *
 * DO NOT set status: 'active' until the GBP listing is live and verified.
 * Premature activation will emit incorrect NAP data into JSON-LD sitewide.
 */

export type HubStatus = 'active' | 'pending';

export interface HubAddress {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: 'IN';
}

export interface HubGeo {
  latitude: number;
  longitude: number;
}

export interface Hub {
  /** Internal identifier — used for schema @id and component keys */
  id: string;
  /** Display name for UI and schema */
  name: string;
  /** GBP verification state */
  status: HubStatus;
  /**
   * Hub-specific phone. null = inherit CENTRAL_PHONE.
   * Only set this once a dedicated line is confirmed with operations.
   */
  phone: string | null;
  /** Physical address. Only populated once GBP street address is verified. */
  address: HubAddress | null;
  /** GPS coordinates for LocalBusiness geo and map embeds */
  geo: HubGeo | null;
  /** Google Business Profile Place ID — required for map embeds and GBP schema */
  gbpPlaceId: string | null;
  /** Full GBP listing URL for sameAs array */
  gbpUrl: string | null;
  /** City-level page path on uttarakhand.cab, e.g. '/rishikesh' */
  cityPagePath: string | null;
  /** Brief description used in per-hub LocalBusiness schema */
  description: string;
}

// ─── Central fallback values ──────────────────────────────────────────────────
// These are used for any hub where phone / address / geo is null (pending hubs).

export const CENTRAL_PHONE = '+919258912169';
export const CENTRAL_PHONE_2 = '+919675212169';
export const CENTRAL_EMAIL = 'uttarakhandcab247@gmail.com';
export const BASE_URL = 'https://uttarakhand.cab';

export const CENTRAL_ADDRESS: HubAddress = {
  streetAddress: 'Punj 86/1, Ballupur Road, Mitralok Colony',
  addressLocality: 'Dehradun',
  addressRegion: 'Uttarakhand',
  postalCode: '248001',
  addressCountry: 'IN',
};

// ─── Hub registry ─────────────────────────────────────────────────────────────

export const HUBS: Hub[] = [
  // ── 1. Dehradun — Active base ─────────────────────────────────────────────
  {
    id: 'dehradun',
    name: 'Uttarakhand Cab 24/7 — Dehradun',
    status: 'active',
    phone: '+919258912169',
    address: {
      streetAddress: 'Punj 86/1, Ballupur Road, Mitralok Colony',
      addressLocality: 'Dehradun',
      addressRegion: 'Uttarakhand',
      postalCode: '248001',
      addressCountry: 'IN',
    },
    geo: {
      latitude: 30.3165,
      longitude: 78.0322,
    },
    gbpPlaceId: 'ChIJr4jIVsMpCTkRmYdRMsBiSUE', // verified GBP Place ID
    gbpUrl: 'https://maps.app.goo.gl/yXUrkmjsyydETpzc8',
    cityPagePath: '/dehradun',
    description:
      'Main operations hub for Uttarakhand Cab 24/7 in Dehradun. Serving Jolly Grant Airport transfers, Char Dham Yatra departures, Mussoorie, and all Garhwal routes.',
  },

  // ── 2. Rishikesh — Pending GBP ────────────────────────────────────────────
  {
    id: 'rishikesh',
    name: 'Uttarakhand Cab 24/7 — Rishikesh',
    status: 'pending',
    // PART B: replace null with dedicated Rishikesh line once confirmed
    phone: null,
    // PART B: replace null with verified GBP street address
    address: null,
    // PART B: replace with exact GBP-verified coordinates
    geo: {
      latitude: 30.0869,
      longitude: 78.2676,
    },
    // PART B: replace null with GBP Place ID once listing is live
    gbpPlaceId: null,
    gbpUrl: null,
    cityPagePath: '/rishikesh',
    description:
      'Regional hub for river rafting group transfers, ashram drops, and Kedarnath Yatra departures from Rishikesh.',
  },

  // ── 3. Haridwar — Pending GBP ─────────────────────────────────────────────
  {
    id: 'haridwar',
    name: 'Uttarakhand Cab 24/7 — Haridwar',
    status: 'pending',
    phone: null,
    address: null,
    geo: {
      latitude: 29.9457,
      longitude: 78.1642,
    },
    gbpPlaceId: null,
    gbpUrl: null,
    cityPagePath: '/haridwar',
    description:
      'Regional hub serving Haridwar Railway Station pickups, Ganga Aarti transfers, and Kedarnath / Badrinath Yatra departures.',
  },

  // ── 4. Haldwani — Pending GBP ─────────────────────────────────────────────
  {
    id: 'haldwani',
    name: 'Uttarakhand Cab 24/7 — Haldwani',
    status: 'pending',
    phone: null,
    address: null,
    // Haldwani city centre approximate coordinates
    geo: {
      latitude: 29.2183,
      longitude: 79.5130,
    },
    gbpPlaceId: null,
    gbpUrl: null,
    // PART B: create /haldwani city page when hub goes active
    cityPagePath: null,
    description:
      'Kumaon gateway hub serving Kathgodam Railway Station pickups, Nainital transfers, Jim Corbett safaris, and Almora / Ranikhet routes.',
  },

  // ── 5. Joshimath — Pending GBP ────────────────────────────────────────────
  {
    id: 'joshimath',
    name: 'Uttarakhand Cab 24/7 — Joshimath',
    status: 'pending',
    phone: null,
    address: null,
    // Joshimath town approximate coordinates
    geo: {
      latitude: 30.5579,
      longitude: 79.5647,
    },
    gbpPlaceId: null,
    gbpUrl: null,
    cityPagePath: null,
    description:
      'High-altitude hub for Auli ski resort transfers, Valley of Flowers / Hemkund Sahib base, and Badrinath Yatra final-leg service.',
  },
];

// ─── Utility helpers ──────────────────────────────────────────────────────────

/** Returns the active hub for a given city id, or null if not found */
export function getHub(id: string): Hub | undefined {
  return HUBS.find((h) => h.id === id);
}

/** Returns only hubs with verified GBP listings */
export function getActiveHubs(): Hub[] {
  return HUBS.filter((h) => h.status === 'active');
}

/** Returns all hubs regardless of status (for admin/debug use) */
export function getAllHubs(): Hub[] {
  return HUBS;
}

/**
 * Resolves the effective phone for a hub.
 * Falls back to CENTRAL_PHONE if the hub has no dedicated line.
 */
export function resolvePhone(hub: Hub): string {
  return hub.phone ?? CENTRAL_PHONE;
}

/**
 * Resolves the effective address for a hub.
 * Falls back to CENTRAL_ADDRESS if the hub has no verified address.
 */
export function resolveAddress(hub: Hub): HubAddress {
  return hub.address ?? CENTRAL_ADDRESS;
}
