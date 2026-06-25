import type { Metadata } from 'next';
import DehradunClient from './DehradunClient';
import { dehradunFAQs } from './data';
import { localBusinessSchema } from '@/lib/schema'; // Import your global business data

export const metadata: Metadata = {
  title: 'Dehradun Taxi Service | Airport, Railway & Local Cabs 24/7',
  description: 'Book reliable Dehradun taxi from Jolly Grant Airport, Railway Station, or city. Local sightseeing, outstation rides, 24/7 service. Fixed transparent fares with experienced local drivers.',
  alternates: { canonical: 'https://uttarakhand.cab/dehradun' },
  openGraph: {
    title: 'Dehradun Taxi Service | Airport, Railway & Local Cabs 24/7',
    description: 'Book reliable Dehradun taxi from Jolly Grant Airport, Railway Station, or city. Local sightseeing, outstation rides, 24/7 service. Fixed transparent fares with experienced local drivers.',
    url: 'https://uttarakhand.cab/dehradun',
    siteName: 'Uttarakhand Cab 24/7',
    type: 'website',
    images: [
      {
        url: 'https://uttarakhand.cab/images/og-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Uttarakhand Cab 24/7 - Premium Taxi Service',
      },
    ],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: dehradunFAQs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://uttarakhand.cab' },
    { '@type': 'ListItem', position: 2, name: 'Dehradun Taxi Service', item: 'https://uttarakhand.cab/dehradun' },
  ],
};

const speakableLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://uttarakhand.cab/dehradun',
  url: 'https://uttarakhand.cab/dehradun',
  speakable: {
    '@type': 'SpeakableSpecification',
    // ✅ Updated class selectors to perfectly match your client components
    cssSelector: ['h1', 'h2', '.geo-answer-question', '.geo-answer-text', '.geo-faq-question', '.geo-faq-answer'],
  },
  isPartOf: { '@id': 'https://uttarakhand.cab/#website' },
  about: { '@id': 'https://uttarakhand.cab/#business' },
  publisher: { '@id': 'https://uttarakhand.cab/#business' },
};

export default function DehradunPage() {
  // Fetch your sitewide local business node array


  return (
    <>
      {/* Structural Data Blocks Processed Server-Side */}
    
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />
      
      {/* Main Client UI Component */}
      <DehradunClient />
    </>
  );
}
