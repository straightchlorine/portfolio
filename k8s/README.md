# Kubernetes Manifests

## Setup Instructions

### 1. Create secrets (DO NOT commit actual secrets!)

```bash
# PostgreSQL credentials
kubectl create secret generic postgres-secret \
  --from-literal=username=postgres \
  --from-literal=password=CHANGE_ME \
  -n portfolio

# Next.js database URL
kubectl create secret generic nextjs-secret \
  --from-literal=database-url='postgresql://postgres:CHANGE_ME@postgres:5432/portfolio' \
  -n portfolio
```

### 2. Deploy

```bash
# Create namespace
kubectl apply -f 00-namespace/

# Deploy services
kubectl apply -f 01-postgres/
kubectl apply -f 02-redis/
kubectl apply -f 03-nextjs/
kubectl apply -f 04-ingress/
```

### 3. Update configuration

- Edit `03-nextjs/deployment.yaml` - change Docker image
- Edit `03-nextjs/configmap.yaml` - change app URL
- Edit `04-ingress/ingressroute.yaml` - change domain

## Verify deployment

```bash
kubectl get pods -n portfolio
kubectl logs -f deployment/portfolio-nextjs -n portfolio
```
