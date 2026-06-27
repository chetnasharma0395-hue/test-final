import type { Metadata } from 'next';

import Script from 'next/script';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  weight: ['300', '400', '700'],
  fallback: ['system-ui', 'arial', 'sans-serif'],
  adjustFontFallback: true,
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  preload: true,
  weight: ['800', '900'],
  fallback: ['system-ui', 'arial', 'sans-serif'],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: 'Taxi Service in Dehradun | Uttarakhand Cab 24/7 | Book Online',
    template: '%s | Uttarakhand Cab 24/7',
  },

  description:
    'Book reliable taxi service in Dehradun & across Uttarakhand. Local drivers, transparent pricing, 24/7 availability for Mussoorie, Rishikesh, Nainital, Kedarnath, and Char Dham.',

  keywords: [
    'taxi service Dehradun',
    'Uttarakhand taxi',
    'Dehradun cab booking',
    'Mussoorie taxi',
    'Rishikesh taxi',
    'Nainital taxi',
    'Kedarnath taxi',
    'Char Dham Yatra taxi',
    'Uttarakhand cab 24/7',
  ],

  metadataBase: new URL('https://uttarakhand.cab'),

  alternates: {
    canonical: 'https://uttarakhand.cab',
  },

  openGraph: {
    type: 'website',
    siteName: 'Uttarakhand Cab 24/7',
    url: 'https://uttarakhand.cab',
    title: 'Taxi Service in Dehradun | Uttarakhand Cab 24/7',
    description:
      '24/7 taxi service in Uttarakhand with local drivers. Book rides for Mussoorie, Rishikesh, Nainital & Char Dham.',
    images: [
      {
        url: 'https://uttarakhand.cab/images/og-main.jpg', // ✅ absolute URL FIX
        width: 1200,
        height: 630,
        alt: 'Uttarakhand Cab 24/7 - Premium Taxi Service',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Taxi Service in Dehradun | Uttarakhand Cab 24/7',
    description:
      'Reliable 24/7 cab service across Uttarakhand. Book now for Mussoorie, Rishikesh & more.',
    site: '@uttarakhandcab247',
    images: ['https://uttarakhand.cab/images/og-main.jpg'], // ✅ absolute URL FIX
  },


  robots: {
    index: true,
    follow: true,
  },

  // Icons are handled automatically by the App Router file conventions
  // (app/favicon.ico, app/icon.png, app/icon0.svg, app/apple-icon.png).
  // A manual `icons` block here produced duplicate/competing favicon tags,
  // and `/site.webmanifest` did not exist in /public (404), so both are removed.
};

import { localBusinessSchema, organizationSchema } from '@/lib/schema';
// Multi-hub LocalBusiness @graph — hub registry lives in lib/hubData.ts.
// To activate a new hub: set status: 'active' and fill GBP fields in hubData.ts.
// No changes needed here.
const globalSchema = localBusinessSchema();
const orgSchema = organizationSchema();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="bg-[#121212] text-white font-sans antialiased selection:bg-[#F7941D]/30 flex flex-col min-h-screen">
        <SmoothScroll>
          <Navbar />

          <main className="flex-grow flex flex-col w-full relative">
            {children}
          </main>

          <Footer />
        </SmoothScroll>
        <FloatingWhatsApp />
        <SpeedInsights />
        <Analytics />

        {/* Google Analytics 4 — loaded after interactive so it never blocks
            paint/LCP. Measurement ID: G-LCV4JP5NLJ */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LCV4JP5NLJ"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LCV4JP5NLJ');
          `}
        </Script>
        {/* JSON-LD — placed at end of body; non-blocking, fully readable by Googlebot */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
