export interface BadgeConfig {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}

export const quantumPipelineBadges: BadgeConfig[] = [
  {
    src: 'https://badge.fury.io/py/quantum-pipeline.svg',
    alt: 'PyPI version',
    size: 'md',
  },
  {
    src: 'https://static.pepy.tech/badge/quantum-pipeline',
    alt: 'Total Downloads',
    size: 'md',
  },
  {
    src: 'https://img.shields.io/docker/pulls/straightchlorine/quantum-pipeline.svg',
    alt: 'Docker Pulls',
    size: 'md',
  },
  {
    src: 'https://img.shields.io/github/actions/workflow/status/straightchlorine/quantum-pipeline/pypi-publish.yml.svg',
    alt: 'Build Status',
    size: 'md',
  },
  {
    src: 'https://img.shields.io/github/stars/straightchlorine/quantum-pipeline.svg',
    alt: 'GitHub Stars',
    size: 'md',
  },
];
