import { ImageResponse } from 'next/og';

export const alt = 'Piotr Krzysztof Lis | Full-Stack Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #030712 0%, #0f172a 100%)',
          padding: '80px',
          fontFamily: 'monospace',
        }}
      >
        {/* Terminal prompt */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
            fontSize: '24px',
            color: '#4ade80',
          }}
        >
          <span style={{ color: '#4ade80' }}>piotr@wroclaw:~$</span>
          <span style={{ color: '#9ca3af', marginLeft: '12px' }}>whoami</span>
        </div>

        {/* Name */}
        <div
          style={{
            display: 'flex',
            fontSize: '72px',
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '20px',
            letterSpacing: '-0.02em',
          }}
        >
          Piotr Krzysztof Lis
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#a78bfa',
            marginBottom: '40px',
          }}
        >
          Full-Stack Engineer
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: 'flex',
            fontSize: '28px',
            color: '#9ca3af',
            maxWidth: '900px',
            lineHeight: 1.4,
          }}
        >
          Building AI systems & production infrastructure
        </div>

        {/* Tech badges */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '50px',
            fontSize: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              padding: '12px 24px',
              background: '#1f2937',
              border: '2px solid #374151',
              borderRadius: '8px',
              color: '#e5e7eb',
            }}
          >
            RAG Systems
          </div>
          <div
            style={{
              display: 'flex',
              padding: '12px 24px',
              background: '#1f2937',
              border: '2px solid #374151',
              borderRadius: '8px',
              color: '#e5e7eb',
            }}
          >
            Kubernetes
          </div>
          <div
            style={{
              display: 'flex',
              padding: '12px 24px',
              background: '#1f2937',
              border: '2px solid #374151',
              borderRadius: '8px',
              color: '#e5e7eb',
            }}
          >
            ML Pipelines
          </div>
        </div>

        {/* Footer accent */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '8px',
            background: 'linear-gradient(90deg, #a78bfa 0%, #4ade80 50%, #3b82f6 100%)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
