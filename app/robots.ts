import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Default: all crawlers allowed on public pages ─────────────────────
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
          '/*.json$',
        ],
      },

      // ── Google — explicit full access ──────────────────────────────────────
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/'],
      },

      // ── AI retrieval bots — ALLOWED (they answer users, not train models) ──
      // These bots power ChatGPT Browse, Perplexity, Claude.ai, DuckDuckGo AI
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'Perplexity-User',
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'DuckAssistBot',
        allow: '/',
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },

      // ── AI training crawlers — DISALLOWED (scrape for model training) ──────
      // Block bots that collect data to train AI models, not to answer users
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/',
      },
      {
        userAgent: 'Bytespider',
        disallow: '/',
      },
      {
        userAgent: 'Amazonbot',
        disallow: '/',
      },
      {
        userAgent: 'Meta-ExternalAgent',
        disallow: '/',
      },
      {
        userAgent: 'Meta-ExternalFetcher',
        disallow: '/',
      },
    ],
    sitemap: 'https://uttarakhand.cab/sitemap.xml',
    host: 'https://uttarakhand.cab',
  };
}
