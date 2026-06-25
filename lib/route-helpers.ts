/**
 * lib/route-helpers.ts
 *
 * Generator + validation + internal-linking helpers for the /taxi programmatic
 * route layer. This is the guardrail that keeps the programmatic system from
 * (a) duplicating premium editorial routes, (b) shipping thin content, or
 * (c) creating URL collisions.
 */

import {
  PROGRAMMATIC_ROUTES,
  type ProgrammaticRoute,
} from '@/data/programmatic-routes';

/**
 * Premium EDITORIAL route slugs that already exist as hand-built pages.
 * The programmatic generator must NEVER emit a /taxi/{slug} duplicate of these.
 * (These live at the site root, e.g. /dehradun-to-nainital, and stay untouched.)
 */
export const EXCLUDED_SLUGS = new Set<string>([
  'dehradun-to-nainital',
  'dehradun-to-haridwar',
  'dehradun-to-rishikesh',
  'delhi-to-dehradun',
  'haridwar-to-kedarnath',
  'rishikesh-to-kedarnath',
  'jolly-grant-airport-to-mussoorie',
]);

/**
 * Validation guardrail. A route may only be built (enter generateStaticParams)
 * if it is not an excluded editorial route AND carries genuinely unique data.
 * Thin/boilerplate records are rejected here.
 */
export function isValidRoute(r: ProgrammaticRoute): boolean {
  if (EXCLUDED_SLUGS.has(r.slug)) return false;
  if (r.slug !== `${r.originKey}-to-${r.destinationKey}`) return false;
  if (!r.distanceKm || r.distanceKm <= 0) return false;
  if (!r.travelTime || !r.travelTime.trim()) return false;

  const hasFare =
    r.fare.sedan !== null || r.fare.suv !== null || r.fare.tempo !== null;
  if (!hasFare) return false;

  if (!r.pickupInfo || r.pickupInfo.trim().length <= 80) return false;
  if (!Array.isArray(r.routeHighlights) || r.routeHighlights.length < 3) return false;
  if (!Array.isArray(r.faqs) || r.faqs.length < 4) return false;
  if (r.seasonal && (!r.openWindow || !r.openWindow.trim())) return false;

  return true;
}

/**
 * Detect duplicate slugs in the dataset (defensive \u2014 prevents two records
 * resolving to the same /taxi/{slug} URL).
 */
export function findDuplicateSlugs(): string[] {
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const r of PROGRAMMATIC_ROUTES) {
    if (seen.has(r.slug)) dupes.add(r.slug);
    seen.add(r.slug);
  }
  return Array.from(dupes);
}

/**
 * The only routes allowed to render. De-duplicated and validated.
 */
export function buildableRoutes(): ProgrammaticRoute[] {
  const seen = new Set<string>();
  const out: ProgrammaticRoute[] = [];
  for (const r of PROGRAMMATIC_ROUTES) {
    if (seen.has(r.slug)) continue; // collision guard
    if (!isValidRoute(r)) continue; // thin-content / exclusion guard
    seen.add(r.slug);
    out.push(r);
  }
  return out;
}

/** Look up a single buildable route by slug. */
export function getRouteBySlug(slug: string): ProgrammaticRoute | undefined {
  return buildableRoutes().find((r) => r.slug === slug);
}

/** Same-origin siblings: "More routes from {Origin}". */
export function originSiblings(r: ProgrammaticRoute): ProgrammaticRoute[] {
  return buildableRoutes().filter(
    (x) => x.originKey === r.originKey && x.slug !== r.slug,
  );
}

/** Same-destination siblings: "Other ways to reach {Destination}". */
export function destinationSiblings(r: ProgrammaticRoute): ProgrammaticRoute[] {
  return buildableRoutes().filter(
    (x) => x.destinationKey === r.destinationKey && x.slug !== r.slug,
  );
}

/** All buildable routes departing a given origin key (for /taxi/from/{key}). */
export function routesFromOrigin(originKey: string): ProgrammaticRoute[] {
  return buildableRoutes().filter((x) => x.originKey === originKey);
}

/** All buildable routes arriving at a given destination key (for /taxi/to/{key}). */
export function routesToDestination(destinationKey: string): ProgrammaticRoute[] {
  return buildableRoutes().filter((x) => x.destinationKey === destinationKey);
}

/** Distinct origin keys present in the buildable dataset. */
export function activeOriginKeys(): string[] {
  return Array.from(new Set(buildableRoutes().map((r) => r.originKey)));
}

/** Distinct destination keys present in the buildable dataset. */
export function activeDestinationKeys(): string[] {
  return Array.from(new Set(buildableRoutes().map((r) => r.destinationKey)));
}

const BASE_URL = 'https://uttarakhand.cab';

/** Canonical absolute URL for a route page. */
export function routeUrl(slug: string): string {
  return `${BASE_URL}/taxi/${slug}`;
}

/** Canonical absolute URL for an origin hub. */
export function originHubUrl(key: string): string {
  return `${BASE_URL}/taxi/from/${key}`;
}

/** Canonical absolute URL for a destination hub. */
export function destinationHubUrl(key: string): string {
  return `${BASE_URL}/taxi/to/${key}`;
}
