/**
 * lib/blogCrossLinks.ts
 *
 * Resolves the most contextually relevant blog post for any given route or
 * service page slug. Used by /services/[slug] and /taxi/[slug] sidebars to
 * automatically surface a "Read our guide" link without manual mapping.
 *
 * Resolution order (first match wins):
 *   1. Exact slug match  (e.g. haridwar-to-kedarnath → haridwar-to-kedarnath-taxi-travel-guide)
 *   2. Origin+destination keyword match
 *   3. Destination keyword match
 *   4. Origin keyword match
 *   5. Category fallback (char-dham, tour-packages)
 *
 * Adding a new blog post: add one or more keyword entries to KEYWORD_MAP below.
 * No changes needed anywhere else — all pages pick it up automatically.
 */

export interface BlogCrossLink {
  slug: string;
  title: string;
  href: string;
}

/** Keyword → { blog slug, display title } */
const KEYWORD_MAP: Record<string, BlogCrossLink> = {
  // Exact route matches
  'haridwar-to-kedarnath':         { slug: 'haridwar-to-kedarnath-taxi-travel-guide',        title: 'Haridwar to Kedarnath Travel Guide',         href: '/blog/haridwar-to-kedarnath-taxi-travel-guide' },
  'haridwar-to-rishikesh':         { slug: 'haridwar-to-rishikesh-taxi-fare-ashram-drop-guide', title: 'Haridwar to Rishikesh: Taxi Fare & Ashram Drops', href: '/blog/haridwar-to-rishikesh-taxi-fare-ashram-drop-guide' },
  'dehradun-to-mussoorie':         { slug: 'dehradun-to-mussoorie-taxi-fare',                title: 'Dehradun to Mussoorie Taxi Fare Guide',       href: '/blog/dehradun-to-mussoorie-taxi-fare' },
  'dehradun-to-auli':              { slug: 'dehradun-to-auli-taxi-trip-guide',               title: 'Dehradun to Auli: Taxi Trip Guide',            href: '/blog/dehradun-to-auli-taxi-trip-guide' },
  'dehradun-to-chopta':            { slug: 'dehradun-to-chopta-taxi-fare-and-travel-guide',  title: 'Dehradun to Chopta: Fare & Travel Guide',     href: '/blog/dehradun-to-chopta-taxi-fare-and-travel-guide' },
  'jolly-grant-airport':           { slug: 'dehradun-airport-to-rishikesh-taxi-fare',        title: 'Dehradun Airport Taxi Fare Guide',             href: '/blog/dehradun-airport-to-rishikesh-taxi-fare' },
  'delhi-to-dehradun':             { slug: 'delhi-to-dehradun-taxi-route-toll-guide',        title: 'Delhi to Dehradun: Route & Toll Guide',       href: '/blog/delhi-to-dehradun-taxi-route-toll-guide' },
  'delhi-to-jim-corbett':          { slug: 'delhi-to-jim-corbett-taxi-trip-guide',           title: 'Delhi to Jim Corbett: Trip Guide',             href: '/blog/delhi-to-jim-corbett-taxi-trip-guide' },
  'haridwar-to-badrinath':         { slug: 'haridwar-to-badrinath-taxi-guide-2026',          title: 'Haridwar to Badrinath Taxi Guide 2026',       href: '/blog/haridwar-to-badrinath-taxi-guide-2026' },
  'rishikesh-to-badrinath':        { slug: 'rishikesh-to-badrinath-taxi-guide-2026',         title: 'Rishikesh to Badrinath Taxi Guide 2026',      href: '/blog/rishikesh-to-badrinath-taxi-guide-2026' },
  'kathgodam-to-nainital':         { slug: 'kathgodam-to-nainital-taxi-guide-2026',          title: 'Kathgodam to Nainital Taxi Guide 2026',       href: '/blog/kathgodam-to-nainital-taxi-guide-2026' },
  'rishikesh-to-chopta':           { slug: 'rishikesh-to-chopta-tungnath-trek-guide-2026',   title: 'Rishikesh to Chopta-Tungnath Trek Guide 2026', href: '/blog/rishikesh-to-chopta-tungnath-trek-guide-2026' },

  // Destination keywords (partial slug matches)
  'mussoorie':      { slug: 'best-time-to-visit-mussoorie',                  title: 'Best Time to Visit Mussoorie',                href: '/blog/best-time-to-visit-mussoorie' },
  'nainital':       { slug: 'nainital-local-sightseeing-taxi-guide',         title: 'Nainital Local Sightseeing Taxi Guide',        href: '/blog/nainital-local-sightseeing-taxi-guide' },
  'kedarnath':      { slug: 'kedarnath-trek-preparation-guide-2026',         title: 'Kedarnath Trek Preparation Guide 2026',        href: '/blog/kedarnath-trek-preparation-guide-2026' },
  'rishikesh':      { slug: 'things-to-do-in-rishikesh-3-day-itinerary',    title: 'Things To Do in Rishikesh — 3-Day Itinerary',  href: '/blog/things-to-do-in-rishikesh-3-day-itinerary' },
  'auli':           { slug: 'dehradun-to-auli-taxi-trip-guide',              title: 'Dehradun to Auli: Taxi Trip Guide',            href: '/blog/dehradun-to-auli-taxi-trip-guide' },
  'chopta':         { slug: 'dehradun-to-chopta-taxi-fare-and-travel-guide', title: 'Dehradun to Chopta: Fare & Travel Guide',      href: '/blog/dehradun-to-chopta-taxi-fare-and-travel-guide' },
  'jim-corbett':    { slug: 'delhi-to-jim-corbett-taxi-trip-guide',          title: 'Delhi to Jim Corbett: Trip Guide',             href: '/blog/delhi-to-jim-corbett-taxi-trip-guide' },
  'char-dham':      { slug: 'char-dham-yatra-taxi-package-guide',            title: 'Char Dham Yatra Taxi Package Guide',           href: '/blog/char-dham-yatra-taxi-package-guide' },
  'badrinath':      { slug: 'char-dham-yatra-taxi-package-guide',            title: 'Char Dham Yatra Taxi Package Guide',           href: '/blog/char-dham-yatra-taxi-package-guide' },
  'dehradun':       { slug: 'dehradun-local-sightseeing-taxi-guide-2026',   title: 'Dehradun Local Sightseeing Guide 2026',        href: '/blog/dehradun-local-sightseeing-taxi-guide-2026' },
  'delhi':          { slug: 'delhi-to-uttarakhand-tour-package-7-days',      title: 'Delhi to Uttarakhand 7-Day Tour Package',      href: '/blog/delhi-to-uttarakhand-tour-package-7-days' },
};

/**
 * Returns the best matching blog cross-link for a given route slug.
 * Returns null if no relevant post exists (no link rendered).
 */
export function getBlogCrossLink(routeSlug: string): BlogCrossLink | null {
  const slug = routeSlug.toLowerCase();

  // 1. Exact slug prefix match
  for (const [keyword, link] of Object.entries(KEYWORD_MAP)) {
    if (slug === keyword || slug.startsWith(keyword + '-') || slug.includes('-' + keyword + '-to-') || slug.includes('-to-' + keyword)) {
      // Avoid self-linking (blog post slug matches route slug)
      if (slug !== link.slug) return link;
    }
  }

  // 2. Keyword contained anywhere in slug (destination-first priority)
  const parts = slug.split('-to-');
  const destination = parts[1]?.replace('-taxi', '').replace('-service', '').replace('-cab', '') ?? '';
  const origin = parts[0] ?? '';

  // Destination match first
  for (const [keyword, link] of Object.entries(KEYWORD_MAP)) {
    if (destination.includes(keyword) && slug !== link.slug) return link;
  }

  // Origin match fallback
  for (const [keyword, link] of Object.entries(KEYWORD_MAP)) {
    if (origin.includes(keyword) && slug !== link.slug) return link;
  }

  return null;
}

/**
 * Returns up to `limit` related blog posts for the blog index sidebar.
 * Used in blog/[slug]/page.tsx to cross-link to sibling posts.
 */
export function getRelatedBlogPosts(
  currentSlug: string,
  currentCategory: string,
  allSlugs: string[],
  limit = 3
): { slug: string; href: string }[] {
  // First: same category, then anything else
  const categoryMatches = allSlugs.filter(
    (s) => s !== currentSlug && KEYWORD_MAP[s]?.slug !== currentSlug
  );
  return categoryMatches.slice(0, limit).map((s) => ({ slug: s, href: `/blog/${s}` }));
}
