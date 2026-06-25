/**
 * lib/relatedRoutes.ts
 * Dynamic "Related Routes" generator — replaces the manually maintained
 * relatedLinksMap in app/services/[slug]/page.tsx.
 *
 * Algorithm:
 *   1. Parse all routes from data/routes.json
 *   2. For a given slug, find its first city (origin) and last city (destination)
 *      by scanning the h1/title text left-to-right for known city names
 *   3. Return routes that share the same origin OR destination (excluding itself)
 *   4. Prioritise shared-origin first (most contextually relevant in sidebar)
 *
 * Zero config: adding a new entry to routes.json automatically updates every
 * related-links sidebar that touches the same city.
 */

import routesData from '@/data/routes.json';

interface RouteEntry {
  slug: string;
  title: string;
  h1?: string;
  category?: string;
  [key: string]: unknown;
}

interface RelatedLink {
  label: string;
  href: string;
}

const routes = routesData as RouteEntry[];

// Known Uttarakhand city tokens — order matters for matching priority in lists
const KNOWN_CITIES = [
  'jolly grant',
  'dehradun', 'mussoorie', 'rishikesh', 'haridwar',
  'kedarnath', 'badrinath', 'yamunotri', 'gangotri',
  'nainital', 'kathgodam', 'corbett',
  'chandigarh', 'delhi', 'dhanaulti', 'govindghat',
  'auli', 'chopta', 'mukteshwar', 'ranikhet', 'almora',
  'kausani', 'sonprayag', 'gaurikund',
];

/**
 * Returns city names found in `text`, ordered by their position of first
 * appearance (left-to-right), so origin always comes before destination.
 */
function extractCitiesOrdered(text: string): string[] {
  const cleaned = text
    .toLowerCase()
    .replace(/cab service|taxi service|taxi|cab|service|reliable|safe|premium|book|from/gi, ' ')
    .replace(/[^a-z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Find each known city and record its position in the cleaned string
  const found: { city: string; pos: number }[] = [];

  for (const city of KNOWN_CITIES) {
    const pos = cleaned.indexOf(city);
    if (pos !== -1) {
      found.push({ city, pos });
    }
  }

  // Sort by position so we get [origin, ..., destination] in text order
  found.sort((a, b) => a.pos - b.pos);

  // Deduplicate (e.g. "jolly grant" and "jolly-grant" could both match)
  const seen = new Set<string>();
  return found
    .filter(({ city }) => {
      if (seen.has(city)) return false;
      seen.add(city);
      return true;
    })
    .map(({ city }) => city);
}

/**
 * Returns up to `limit` related service page links for a given route slug.
 * Prefers routes sharing the same origin city; falls back to shared destination.
 */
export function getRelatedServiceLinks(
  currentSlug: string,
  limit = 4
): RelatedLink[] {
  const current = routes.find((r) => r.slug === currentSlug);
  if (!current) return [];

  const currentText = (current.h1 || current.title) as string;
  const currentCities = extractCitiesOrdered(currentText);

  if (currentCities.length === 0) return [];

  const origin = currentCities[0];
  const destination = currentCities[currentCities.length - 1];

  const scored: { route: RouteEntry; score: number }[] = [];

  for (const route of routes) {
    if (route.slug === currentSlug) continue;

    const text = (route.h1 || route.title) as string;
    const cities = extractCitiesOrdered(text);
    if (cities.length === 0) continue;

    let score = 0;

    // Shared origin (highest value — same departure city)
    if (cities[0] === origin) score += 2;

    // Shared destination (also valuable — same endpoint, different start)
    if (cities[cities.length - 1] === destination) score += 1;

    if (score > 0) scored.push({ route, score });
  }

  // Sort by score desc, then alphabetically for deterministic ordering
  scored.sort((a, b) => b.score - a.score || a.route.slug.localeCompare(b.route.slug));

  return scored.slice(0, limit).map(({ route }) => ({
    label: (route.h1 || route.title) as string,
    href: `/services/${route.slug}`,
  }));
}
