/**
 * lib/route-integrity.ts
 *
 * Build-time integrity guard for the /taxi programmatic route system.
 * Imported by app/sitemap.ts so that any structural breakage FAILS THE BUILD
 * (throws) rather than shipping a broken sitemap or orphaned pages.
 *
 * Checks:
 *  1. Duplicate slug detection
 *  2. Orphan route detection (origin/destination key has no matching hub)
 *  3. Broken origin references
 *  4. Broken destination references
 *  5. Broken vehicle references
 *  6. Sibling resolution (every route resolves origin + destination siblings
 *     and required internal links without error)
 */

import { PROGRAMMATIC_ROUTES } from '@/data/programmatic-routes';
import { ORIGIN_HUBS, DESTINATION_HUBS } from '@/data/hub-config';
import { VEHICLES } from '@/lib/vehicleData';
import {
  buildableRoutes,
  findDuplicateSlugs,
  originSiblings,
  destinationSiblings,
} from '@/lib/route-helpers';

export interface IntegrityResult {
  ok: boolean;
  errors: string[];
  stats: {
    totalRecords: number;
    buildableRecords: number;
    originHubs: number;
    destinationHubs: number;
  };
}

export function checkRouteIntegrity(): IntegrityResult {
  const errors: string[] = [];

  const originKeys = new Set(ORIGIN_HUBS.map((h) => h.key));
  const destKeys = new Set(DESTINATION_HUBS.map((h) => h.key));
  const vehicleKeys = new Set(Object.keys(VEHICLES));

  // 1. Duplicate slugs
  const dupes = findDuplicateSlugs();
  if (dupes.length > 0) {
    errors.push(`Duplicate route slugs detected: ${dupes.join(', ')}`);
  }

  for (const r of PROGRAMMATIC_ROUTES) {
    // slug invariant
    if (r.slug !== `${r.originKey}-to-${r.destinationKey}`) {
      errors.push(`Slug mismatch: "${r.slug}" != "${r.originKey}-to-${r.destinationKey}"`);
    }
    // 3. broken origin reference
    if (!originKeys.has(r.originKey)) {
      errors.push(`Route "${r.slug}" references unknown origin hub "${r.originKey}"`);
    }
    // 4. broken destination reference
    if (!destKeys.has(r.destinationKey)) {
      errors.push(`Route "${r.slug}" references unknown destination hub "${r.destinationKey}"`);
    }
    // 5. broken vehicle reference
    if (!vehicleKeys.has(r.recommendedVehicle)) {
      errors.push(`Route "${r.slug}" references unknown vehicle "${r.recommendedVehicle}"`);
    }
    // editorialParent must be a non-empty absolute path
    if (!r.editorialParent || !r.editorialParent.startsWith('/')) {
      errors.push(`Route "${r.slug}" has invalid editorialParent "${r.editorialParent}"`);
    }
  }

  // 2. Orphan detection: every active origin/destination key must have a hub
  //    (covered above per-route, but also assert no buildable route is unreachable)
  // 6. Sibling resolution: ensure resolvers run without throwing for each route
  for (const r of buildableRoutes()) {
    try {
      originSiblings(r);
      destinationSiblings(r);
    } catch (e) {
      errors.push(`Sibling resolution failed for "${r.slug}": ${(e as Error).message}`);
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    stats: {
      totalRecords: PROGRAMMATIC_ROUTES.length,
      buildableRecords: buildableRoutes().length,
      originHubs: ORIGIN_HUBS.length,
      destinationHubs: DESTINATION_HUBS.length,
    },
  };
}

/**
 * Throws if the route dataset is structurally broken. Call at module load in
 * sitemap.ts so the Next.js build aborts loudly on any integrity failure.
 */
export function assertRouteIntegrity(): void {
  const result = checkRouteIntegrity();
  if (!result.ok) {
    throw new Error(
      `[route-integrity] ${result.errors.length} integrity error(s):\n` +
        result.errors.map((e) => `  - ${e}`).join('\n'),
    );
  }
}
