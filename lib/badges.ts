export interface BadgeConfig {
  src: string;
  alt: string;
  height?: number;
}

export const quantumPipelineBadges: BadgeConfig[] = [
  {
    src: 'https://badge.fury.io/py/quantum-pipeline.svg',
    alt: 'PyPI version',
    height: 20,
  },
  {
    src: 'https://static.pepy.tech/badge/quantum-pipeline',
    alt: 'Total Downloads',
    height: 20,
  },
  {
    src: 'https://img.shields.io/docker/pulls/straightchlorine/quantum-pipeline.svg',
    alt: 'Docker Pulls',
    height: 20,
  },
  {
    src: 'https://img.shields.io/github/actions/workflow/status/straightchlorine/quantum-pipeline/pypi-publish.yml.svg',
    alt: 'Build Status',
    height: 20,
  },
  {
    src: 'https://img.shields.io/github/stars/straightchlorine/quantum-pipeline.svg',
    alt: 'GitHub Stars',
    height: 20,
  },
];
