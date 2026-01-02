# Portfolio

Personal portfolio and engineering showcase. Next.js application with live Kubernetes metrics, automated CI/CD, and production deployment.

## Quick Start

```bash
pnpm install
pnpm dev
# http://localhost:3000
```

**Local database:**
```bash
docker-compose up -d  # PostgreSQL + Redis
```

## Stack

- **Framework:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS v4, Lucide React icons
- **Deployment:** Docker, Kubernetes, Traefik
- **CI/CD:** Woodpecker (self-hosted)
- **Database:** PostgreSQL, Redis
- **Infrastructure:** K3s on Hetzner Cloud

## Features

- **Home:** Featured project + projects grid + live K8s metrics
- **Tech Stack:** Role-specific skills selector (AI/ML, Full-Stack, Platform/DevOps)
- **Experience:** Work history (placeholder)
- **Security:** CSP with nonce, security headers, HTTPS enforcement
- **Metrics:** Real K8s pod status in production, mock fallback in dev

## Development

**Scripts:**
```bash
pnpm dev              # Dev server (Turbopack)
pnpm build            # Production build
pnpm lint             # ESLint
pnpm tsc --noEmit     # Type check
```

**Key Files:**
- `app/page.tsx` - Home page (hardcoded projects)
- `app/tech-stack/[role]/page.tsx` - CV by role
- `app/api/metrics/route.ts` - Kubernetes metrics endpoint
- `proxy.ts` - CSP & security headers (middleware)
- `.woodpecker/` - CI/CD pipelines

**Projects are hardcoded** in JSX. To modify: edit `app/page.tsx` directly.

## Deployment

### Local Production Build
```bash
pnpm build
pnpm start
```

### Kubernetes Deployment
```bash
# Automatic via Woodpecker on git tag
git tag v1.0.0
git push origin v1.0.0

# Manual deployment
kubectl set image deployment/portfolio-nextjs nextjs=straightchlorine/portfolio:TAG -n portfolio
```

**Docker image:** `straightchlorine/portfolio:HASH`

## Environment Variables

See `.env.example`:
- `DATABASE_URL` - PostgreSQL connection
- `REDIS_URL` - Redis connection
- `NEXT_PUBLIC_APP_URL` - Public app URL

## Roadmap

- Blog (MDX)
- Dynamic projects
- CV integration
- Multi-language support (EN/PL)
