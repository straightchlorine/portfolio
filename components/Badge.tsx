'use client';

import React from 'react';

interface BadgeProps {
  src: string;
  alt: string;
  title?: string;
  height?: number; // Natural height in pixels (e.g., 20)
}

/**
 * Badge component for displaying external service badges (shields.io, pepy.tech, etc.)
 * Maintains correct aspect ratio and supports high-DPI displays
 *
 * Key fixes:
 * - Uses height: auto and width: auto to prevent aspect ratio distortion
 * - maxHeight constrains size while maintaining proportions
 * - No hardcoded width attributes that cause stretching
 */
export function Badge({ src, alt, title, height = 20 }: BadgeProps) {
  // Pre-compute title to avoid hydration mismatch
  const badgeTitle = title ?? alt;

  return (
    <img
      src={src}
      alt={alt}
      title={badgeTitle}
      style={{
        height: 'auto',
        maxHeight: `${height}px`,
        width: 'auto',
        display: 'inline-block',
      }}
      className="transition-all duration-300 hover:scale-110 hover:brightness-110"
      loading="lazy"
      decoding="async"
      suppressHydrationWarning
    />
  );
}
