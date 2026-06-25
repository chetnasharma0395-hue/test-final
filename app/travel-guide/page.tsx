import type { Metadata } from 'next';
import TravelGuideClient from './TravelGuideClient';
import { GEOAnswerBox } from '@/components/GEOAnswerBox';

export const metadata: Metadata = {
  title: 'Uttarakhand Travel Guide 2026 | Best Time, Packing & Road Tips',
  description: 'Uttarakhand travel guide for 2026. Best time to visit, seasonal weather, packing essentials, and Himalayan road conditions. Pro tips for travelers.',
  alternates: { canonical: 'https://uttarakhand.cab/travel-guide' },
  openGraph: {
    title: 'Uttarakhand Travel Guide 2026 | Best Time & Packing',
    description: 'Uttarakhand travel guide for 2026. Best time to visit, seasonal weather, packing essentials, and Himalayan road conditions. Pro tips for travelers.',
    url: 'https://uttarakhand.cab/travel-guide',
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

export default function TravelGuidePage() {
  return (
    <>
      {/* GEO — Direct Answer Block, visually hidden */}
      <section className="sr-only">
        <GEOAnswerBox
          question="When is the best time to visit Uttarakhand?"
          answer="The best time to visit Uttarakhand depends on your destination. For hill stations like Mussoorie and Nainital, March to June (spring/summer) and September to November (post-monsoon) are ideal. For Char Dham Yatra (Kedarnath, Badrinath, Yamunotri, Gangotri), the pilgrimage season runs April to November. For snow and skiing at Auli, December to February is best. Monsoon (July–August) brings heavy rain and landslide risk on mountain roads — travel with experienced hill drivers only."
          facts={[
            { label: 'Hill Stations (Mussoorie/Nainital)', value: 'Mar–Jun & Sep–Nov' },
            { label: 'Char Dham Yatra Season', value: 'Apr–Nov' },
            { label: 'Auli Ski Season', value: 'Dec–Feb' },
            { label: 'Chopta & Tungnath Trek', value: 'Apr–Jun & Sep–Nov' },
            { label: 'Monsoon (Caution)', value: 'Jul–Aug (landslide risk)' },
            { label: 'Valley of Flowers', value: 'Jul–Sep (bloom season)' },
          ]}
          source="Uttarakhand Cab 24/7 — Travel Guide 2026"
        />
      </section>
      <TravelGuideClient />
    </>
  );
}
