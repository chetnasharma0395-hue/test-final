import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Uttarakhand Cab 24/7';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params to prevent Next.js 15 from crashing
  const resolvedParams = await params;
  
  const pageTitleRaw = resolvedParams.slug.replace(/-/g, ' ');
  const pageTitle = pageTitleRaw.toUpperCase();

  const formattedTitle =
    pageTitle.length > 45 ? pageTitle.slice(0, 45) + '...' : pageTitle;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0f172a, #020617)',
          color: 'white',
          padding: '40px',
        }}
      >
        {/* Brand */}
        <div style={{ fontSize: 28, color: '#fbbf24', marginBottom: 20 }}>
          UTTARAKHAND CAB 24/7
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          {formattedTitle}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 26,
            marginTop: 30,
            color: '#94a3b8',
          }}
        >
          24×7 Taxi Service • Safe • Reliable
        </div>

        {/* Locations */}
        <div style={{ fontSize: 20, marginTop: 10, color: '#cbd5f5' }}>
          Dehradun • Mussoorie • Rishikesh • Nainital
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
