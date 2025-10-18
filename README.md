# Portfolio + Blog - Self-Hosted on Hetzner K8s

Next.js 15 portfolio with blog, deployed to Hetzner Kubernetes with automated CI/CD.

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## Stack

**Frontend:** Next.js 15 (App Router) + TypeScript + Tailwind
**Database:** PostgreSQL 16 (K8s StatefulSet)
**Cache:** Redis 7
**Infrastructure:** k3s (Hetzner), Traefik ingress, ARC (Actions Runner Controller)
**CI/CD:** GitHub Actions with self-hosted runners
**Analytics:** Self-hosted Umami

---

## Architecture

```
Internet → Cloudflare DNS → Traefik (TLS) → Next.js Pods (3x)
                                              ↓
                                          PostgreSQL + Redis

GitHub → ARC Controller → Ephemeral Runner Pods → kubectl deploy
```

---

## Project Structure

```
portfolio/
├── .github/workflows/        # CI/CD pipelines
├── app/                      # Next.js App Router pages
├── components/               # React components
├── content/                  # MDX blog posts & projects
├── lib/                      # Utilities (Prisma, Redis, MDX)
├── k8s/                      # Kubernetes manifests
├── prisma/                   # Database schema
├── public/                   # Static assets
├── Dockerfile                # Multi-stage build
└── docker-compose.yml        # Local dev environment
```

---

## Local Development

```bash
# Start services (PostgreSQL + Redis)
docker-compose up -d

# Run database migrations
pnpm prisma migrate dev

# Start dev server
pnpm dev
```

---

## CI/CD Pipeline

**Self-Hosted Runners:** GitHub Actions Runner Controller (ARC) in Kubernetes

### On Pull Request (ci.yml)
- ESLint, TypeScript check
- Build test

### On Push to master (deploy.yml)
1. Run tests and build
2. Build Docker image with BuildKit
3. Push to Docker Hub + GitHub Container Registry
4. Deploy to Kubernetes via kubectl
5. Wait for rollout with health checks

### On Version Tag (release.yml)
1. Validate semver tag
2. Run full test suite
3. Build and push multi-registry images
4. Deploy to production
5. Run smoke tests
6. Create GitHub release with changelog

**Required GitHub Secrets:**
- `DOCKERHUB_USERNAME` / `DOCKERHUB_TOKEN`
- `NEXT_PUBLIC_APP_URL`

**No longer needed:** KUBECONFIG (ARC uses in-cluster ServiceAccount)

---

## Kubernetes Setup

### 1. Create Namespace
```bash
kubectl apply -f k8s/00-namespace.yaml
```

### 2. Create Secrets
```bash
# PostgreSQL credentials
kubectl create secret generic postgres-secret \
  --from-literal=username=postgres \
  --from-literal=password=YOUR_PASSWORD \
  -n portfolio

# Database URL for Next.js
kubectl create secret generic nextjs-secret \
  --from-literal=database-url='postgresql://postgres:PASSWORD@postgres:5432/portfolio' \
  -n portfolio
```

### 3. Deploy Infrastructure
```bash
kubectl apply -f k8s/01-postgres/
kubectl apply -f k8s/02-redis/
kubectl apply -f k8s/03-nextjs/
kubectl apply -f k8s/04-ingress/
```

### 4. Verify
```bash
kubectl get pods -n portfolio
kubectl logs -f deployment/portfolio-nextjs -n portfolio
```

---

## Deployment

### Manual
```bash
docker build -t your-username/portfolio:latest .
docker push your-username/portfolio:latest
kubectl set image deployment/portfolio-nextjs \
  nextjs=your-username/portfolio:latest -n portfolio
```
