# Portfolio

Modern portfolio with live Kubernetes metrics, automated CI/CD, and production-ready infrastructure.

---

## Features

### Planned

- Blog (MDX-powered)
- Contact form
- Project case studies
- Multi-language support (EN/PL)

---

## Architecture

**Stack:**
- K3s on Hetzner Cloud
- Traefik ingress with cert-manager
- GHCR + Docker Hub registries

---

## Quick Start

### Local Development

```bash
pnpm install
pnpm dev
# Open http://localhost:3000
```

Note: K8s metrics will fall back to mock data locally.

### Production Deployment

```bash
# Development
git push origin main

# Production
git tag v1.0.0
git push origin v1.0.0
```

See [docs/INFRASTRUCTURE.md](./docs/INFRASTRUCTURE.md) for details.

---

## Tech Stack

**Frontend:**
- Next.js 15 (App Router, Server Components)
- React 19
- TypeScript
- Tailwind CSS 4

**Infrastructure:**
- Kubernetes (K3s)
- PostgreSQL 16
- Redis 7
- Traefik + cert-manager

---

## Scripts

```bash
pnpm dev          # Development server (Turbopack)
pnpm build        # Production build
pnpm start        # Production server
pnpm lint         # ESLint
```

---

## CI/CD Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| ci.yml | Pull requests | Linting & type checks |
| deploy.yml | Push to `main` | Deploy to development |
| release.yml | Version tags (`v*.*.*`) | Deploy to production |

---

## Key Features

### Live Kubernetes Metrics

- Executes `scripts/fetch-k8s-metrics.sh` to query K8s API
- Displays pod status, restarts, and health
- Updates every 10 seconds
- Falls back to mock data if cluster unavailable

### Auto-Generated Images

- Favicon: Purple `/` on dark background
- OG Image: Terminal-styled card with name and title
- Generated via Next.js `ImageResponse` API

---

## Roadmap

**Phase 2: Content** (Q1 2025)
- [ ] MDX blog with syntax highlighting
- [ ] RSS feed
- [ ] Post categories/tags

**Phase 3: CV System** (Q1 2025)
- [ ] Dynamic CV generation
- [ ] Multiple versions (Full-Stack, AI/ML, Platform/DevOps)
- [ ] PDF export
- [ ] Integration with curriculum-vitae repo

**Phase 4: Engagement** (Q2 2025)
- [ ] Contact form
- [ ] Case studies
- [ ] Analytics

**Phase 5: Polish** (Q2 2025)
- [ ] Theme toggle
- [ ] Multi-language (EN/PL)
- [ ] Advanced animations

---

## Documentation

- [Setup Guide](./docs/SETUP.md)
- [Infrastructure](./docs/INFRASTRUCTURE.md)
- [Strategy](./docs/STRATEGY.md)
- [K8s Metrics](./docs/k8s-metrics.md)

---

## Deployment

### Environments

- **Development**: Auto-deploy on push to `main`
- **Production**: Auto-deploy on version tags

### Creating a Release

```bash
git tag v1.0.0
git push origin v1.0.0
```

Images tagged with:
- `latest` (development)
- `v1.0.0`, `v1.0`, `v1` (production)
- `sha-abc123` (git commit)

---
