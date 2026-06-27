/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [],
    // Serve images at quality 82 (was 75 default) — better visual with
    // smaller byte-size than 90. deviceSizes controls srcset breakpoints.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
  },
  compress: true,
  poweredByHeader: false,
  // Inline critical CSS → eliminates the render-blocking chunks/065zet3*.css
  experimental: {
    optimizeCss: true,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      // ── uttarakhandcab.in → uttarakhand.cab (primary domain) ──────────────
      // Both www and non-www versions — 301 passes full SEO value
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'uttarakhandcab.in' }],
        destination: 'https://uttarakhand.cab/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.uttarakhandcab.in' }],
        destination: 'https://uttarakhand.cab/:path*',
        permanent: true,
      },
      // ── www.uttarakhand.cab → uttarakhand.cab (non-www canonical) ─────────
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.uttarakhand.cab' }],
        destination: 'https://uttarakhand.cab/:path*',
        permanent: true,
      },

      // ── /services root (no index page exists) → /taxi hub ────────────────
      {
        source: '/services',
        destination: '/taxi',
        permanent: false,
      },
      // ── Old site URL redirects (indexed on uttarakhandcab.in) ─────────────
      // These pass SEO value through the chain:
      // old URL on uttarakhandcab.in → uttarakhand.cab/new-url
      {
        source: '/uttarakhand-taxi-service',
        destination: '/destinations',
        permanent: true,
      },
      {
        source: '/uttarakhand-taxi-service/',
        destination: '/destinations',
        permanent: true,
      },
      {
        source: '/uttarakhand-taxi-service/nainital-taxi-service',
        destination: '/nainital',
        permanent: true,
      },
      {
        source: '/uttarakhand-taxi-service/nainital-taxi-service/',
        destination: '/nainital',
        permanent: true,
      },
      {
        source: '/uttarakhand-taxi-service/mussoorie-taxi-service',
        destination: '/mussoorie',
        permanent: true,
      },
      {
        source: '/uttarakhand-taxi-service/mussoorie-taxi-service/',
        destination: '/mussoorie',
        permanent: true,
      },
      {
        source: '/uttarakhand-taxi-service/delhi-airport-taxi',
        destination: '/dehradun-airport-taxi',
        permanent: true,
      },
      {
        source: '/uttarakhand-taxi-service/delhi-airport-taxi/',
        destination: '/dehradun-airport-taxi',
        permanent: true,
      },
      // NOTE: '/services/jolly-grant-airport-taxi-service' is intentionally NOT
      // redirected. lib/schema.ts (organizationSchema OfferCatalog) lists it as a
      // live canonical URL, so redirecting it would create a contradictory SEO signal.
      {
        source: '/services/badrinath-taxi-service',
        destination: '/badrinath',
        permanent: true,
      },
      {
        source: '/uttarakhand-taxi-service/jim-corbett-taxi-service',
        destination: '/jim-corbett',
        permanent: true,
      },
      {
        source: '/uttarakhand-taxi-service/jim-corbett-taxi-service/',
        destination: '/jim-corbett',
        permanent: true,
      },
      {
        source: '/uttarakhand-taxi-service/:slug*',
        destination: '/destinations',
        permanent: true,
      },
      // ── why-choose-us merged into why-trust-us ────────────
      {
        source: '/why-choose-us',
        destination: '/why-trust-us',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
