'use client';

interface BadgeProps {
  src: string;
  alt: string;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'max-h-4',   // 16px
  md: 'max-h-5',   // 20px
  lg: 'max-h-6',   // 24px
};

/**
 * Badge component for displaying external service badges (shields.io, pepy.tech, etc.)
 * Maintains correct aspect ratio with predefined size variants
 *
 * - Uses height: auto and width: auto to prevent aspect ratio distortion
 * - Predefined size variants ensure consistent badge sizing
 */
export function Badge({ src, alt, title, size = 'md' }: BadgeProps) {
  const badgeTitle = title ?? alt;

  return (
    <img
      src={src}
      alt={alt}
      title={badgeTitle}
      className={`h-auto w-auto inline-block transition-all duration-300 hover:scale-110 hover:brightness-110 ${sizeMap[size]}`}
      loading="lazy"
      decoding="async"
      suppressHydrationWarning
    />
  );
}
