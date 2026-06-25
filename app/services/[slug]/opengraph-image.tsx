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
          background: 'linear-gradient(135deg, #1A1A1A, #0a0a0a)',
          color: 'white',
          padding: '40px',
          position: 'relative',
        }}
      >
        {/* Orange ambient glow — top right */}
        <div
          style={{
            position: 'absolute',
            top: -150,
            right: -150,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: '#F7941D',
            opacity: 0.18,
            filter: 'blur(120px)',
            display: 'flex',
          }}
        />

        {/* Brand */}
        <div style={{ fontSize: 28, fontWeight: 'bold', color: '#F7941D', marginBottom: 20, letterSpacing: 2 }}>
          UTTARAKHAND CAB 24/7
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 1.2,
            color: 'white',
          }}
        >
          {formattedTitle}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 26,
            marginTop: 30,
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          24×7 Taxi Service • Safe • Reliable
        </div>

        {/* Locations */}
        <div style={{ fontSize: 20, marginTop: 10, color: '#F7941D' }}>
          Dehradun • Mussoorie • Rishikesh • Nainital
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
