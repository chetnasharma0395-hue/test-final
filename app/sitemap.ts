import { MetadataRoute } from 'next';
import routes from '@/data/routes.json';
import { blogPosts } from '@/lib/blog-content';
import { buildableRoutes } from '@/lib/route-helpers';
import { ORIGIN_HUBS, DESTINATION_HUBS } from '@/data/hub-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://uttarakhand.cab'; // Kept as .cab domain per current file structure

  // 1. Map Service Pillar Pages from JSON
  const serviceRoutes = routes.map((route) => ({
    url: `${baseUrl}/services/${route.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 2. Standard Static and Core Destination Routes
  const staticRoutes = [
    { path: '',                              priority: 1.0, freq: 'weekly'  },
    { path: '/destinations',                 priority: 0.8, freq: 'monthly' },
    { path: '/tour-packages',               priority: 0.8, freq: 'monthly' },
    { path: '/taxi-rates',                   priority: 0.9, freq: 'weekly'  },
    { path: '/taxi',                         priority: 0.9, freq: 'weekly'  },
    { path: '/char-dham',                    priority: 0.9, freq: 'weekly'  },
    { path: '/mussoorie',                    priority: 0.9, freq: 'weekly'  },
    { path: '/nainital',                     priority: 0.8, freq: 'monthly' },
    { path: '/rishikesh',                    priority: 0.9, freq: 'weekly'  },
    { path: '/kedarnath',                    priority: 0.9, freq: 'weekly'  },
    { path: '/haridwar',                     priority: 0.8, freq: 'monthly' },
    { path: '/dehradun',                     priority: 0.9, freq: 'weekly'  },
    { path: '/about',                        priority: 0.6, freq: 'yearly'  },
    { path: '/contact',                      priority: 0.7, freq: 'yearly'  },
    { path: '/gallery',                      priority: 0.6, freq: 'monthly' },
    { path: '/why-choose-us',                priority: 0.7, freq: 'monthly' },
    { path: '/info',                         priority: 0.6, freq: 'monthly' },
    { path: '/distance-guide',               priority: 0.7, freq: 'monthly' },
    { path: '/travel-guide',                 priority: 0.7, freq: 'monthly' },
    { path: '/jolly-grant-airport-to-mussoorie', priority: 0.8, freq: 'monthly' },
    { path: '/haridwar-to-kedarnath',        priority: 0.8, freq: 'monthly' },
    { path: '/dehradun-to-nainital',         priority: 0.8, freq: 'monthly' },
    { path: '/dehradun-to-haridwar',         priority: 0.8, freq: 'monthly' },
    { path: '/dehradun-to-rishikesh',        priority: 0.8, freq: 'monthly' },
    { path: '/rishikesh-to-kedarnath',       priority: 0.8, freq: 'monthly' },
    { path: '/delhi-to-dehradun',            priority: 0.8, freq: 'monthly' },
    { path: '/valley-of-flowers',            priority: 0.9, freq: 'weekly'  },
    { path: '/dehradun-airport-taxi',        priority: 1.0, freq: 'weekly'  },
    { path: '/jim-corbett',                  priority: 0.9, freq: 'weekly'  },
    { path: '/badrinath',                    priority: 0.9, freq: 'weekly'  },
    { path: '/fleet',                        priority: 0.9, freq: 'weekly'  },
    { path: '/fleet/innova-crysta',          priority: 0.9, freq: 'weekly'  },
    { path: '/fleet/ertiga',                 priority: 0.9, freq: 'weekly'  },
    { path: '/fleet/sedan',                  priority: 0.9, freq: 'weekly'  },
    { path: '/fleet/tempo-traveller',        priority: 0.9, freq: 'weekly'  },
    { path: '/fleet/force-urbania',          priority: 0.8, freq: 'weekly'  },
    { path: '/compare/innova-crysta-vs-ertiga', priority: 0.8, freq: 'monthly' },
    { path: '/best-vehicle-for-char-dham-yatra', priority: 0.9, freq: 'monthly' },
    { path: '/privacy-policy',               priority: 0.2, freq: 'yearly'  },
    { path: '/terms-of-service',             priority: 0.2, freq: 'yearly'  },
    { path: '/cancellation-policy',          priority: 0.2, freq: 'yearly'  },
  ].map(({ path, priority, freq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: freq as 'weekly' | 'monthly' | 'yearly',
    priority,
  }));

  // 3. Dynamic Blog Handling
  const latestPostDate = blogPosts.length > 0 
    ? blogPosts.reduce((acc, post) => (post.dateISO > acc ? post.dateISO : acc), blogPosts[0].dateISO)
    : new Date().toISOString();

  const blogIndex = {
    url: `${baseUrl}/blog`,
    lastModified: new Date(latestPostDate),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  };

  const blogPostRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.dateISO),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 4. Programmatic /taxi/[slug] route pages
  const taxiRoutePages = buildableRoutes().map((route) => ({
    url: `${baseUrl}/taxi/${route.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 5. Origin hub pages /taxi/from/[origin]
  const taxiOriginHubs = ORIGIN_HUBS.map((hub) => ({
    url: `${baseUrl}/taxi/from/${hub.key}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 6. Destination hub pages /taxi/to/[destination]
  const taxiDestHubs = DESTINATION_HUBS.map((hub) => ({
    url: `${baseUrl}/taxi/to/${hub.key}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    blogIndex,
    ...blogPostRoutes,
    ...serviceRoutes,
    ...taxiRoutePages,
    ...taxiOriginHubs,
    ...taxiDestHubs,
  ];
}
