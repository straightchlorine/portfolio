import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#030712',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#a78bfa',
          fontFamily: 'monospace',
        }}
      >
        /
      </div>
    ),
    {
      ...size,
    }
  );
}
