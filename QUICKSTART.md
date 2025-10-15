# GoKite Quick Start Guide

This guide provides quick commands to get your GoKite Next.js application deployed using Docker and Kubernetes.

## 📋 Prerequisites Checklist

- [ ] Ubuntu Linux server (or WSL on Windows for testing)
- [ ] Docker installed (`docker --version`)
- [ ] Kubernetes cluster access (`kubectl version`)
- [ ] Docker registry account (Docker Hub, AWS ECR, GCR, etc.)

## 🚀 Quick Deploy (5 Steps)

### Step 1: Build Docker Image

```bash
cd go-kite
docker build -t gokite-nextjs:latest .
```

### Step 2: Test Locally (Optional)

```bash
# Using Docker
docker run -d -p 3000:3000 --name gokite-test gokite-nextjs:latest
curl http://localhost:3000

# Or using Docker Compose
docker-compose up -d
```

### Step 3: Push to Registry

**For Docker Hub:**

```bash
# Login
docker login

# Tag and push
docker tag gokite-nextjs:latest YOUR_USERNAME/gokite-nextjs:latest
docker push YOUR_USERNAME/gokite-nextjs:latest
```

**For AWS ECR:**

```bash
# Login
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

# Create repository (first time only)
aws ecr create-repository --repository-name gokite-nextjs --region us-east-1

# Tag and push
docker tag gokite-nextjs:latest ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/gokite-nextjs:latest
docker push ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/gokite-nextjs:latest
```

### Step 4: Update Kubernetes Configuration

Edit `k8s/deployment.yaml` line 22:

```yaml
image: YOUR_REGISTRY/gokite-nextjs:latest
```

### Step 5: Deploy to Kubernetes

```bash
# Using the automated script (Linux/Mac)
chmod +x scripts/*.sh
./scripts/deploy-k8s.sh

# Or manually
kubectl create namespace gokite
kubectl apply -f k8s/configmap.yaml -n gokite
kubectl apply -f k8s/deployment.yaml -n gokite
kubectl apply -f k8s/service.yaml -n gokite
kubectl apply -f k8s/hpa.yaml -n gokite
```

### Step 6: Verify Deployment

```bash
# Check pods
kubectl get pods -n gokite

# Check services
kubectl get svc -n gokite

# View logs
kubectl logs -f deployment/gokite-nextjs-deployment -n gokite
```

## 🔄 Update Deployment

### Quick Update Process

1. **Make your code changes**

2. **Build new version:**

   ```bash
   docker build -t gokite-nextjs:v1.1.0 .
   ```

3. **Push to registry:**

   ```bash
   docker tag gokite-nextjs:v1.1.0 YOUR_REGISTRY/gokite-nextjs:v1.1.0
   docker push YOUR_REGISTRY/gokite-nextjs:v1.1.0
   ```

4. **Update Kubernetes:**

   ```bash
   kubectl set image deployment/gokite-nextjs-deployment \
     gokite-nextjs=YOUR_REGISTRY/gokite-nextjs:v1.1.0 \
     -n gokite

   # Watch the rollout
   kubectl rollout status deployment/gokite-nextjs-deployment -n gokite
   ```

### Rollback if Needed

```bash
kubectl rollout undo deployment/gokite-nextjs-deployment -n gokite
```

## 🌐 Access Your Application

### LoadBalancer (Cloud)

```bash
kubectl get svc gokite-nextjs-service -n gokite
# Access via EXTERNAL-IP shown
```

### NodePort (On-Premise)

```bash
kubectl get svc gokite-nextjs-service -n gokite
# Access via <node-ip>:<node-port>
```

### Port Forward (Testing)

```bash
kubectl port-forward svc/gokite-nextjs-service 3000:80 -n gokite
# Access via http://localhost:3000
```

## 📊 Monitoring Commands

```bash
# View all resources
kubectl get all -n gokite

# Stream logs
kubectl logs -f deployment/gokite-nextjs-deployment -n gokite

# Check pod status
kubectl describe pod <pod-name> -n gokite

# View HPA status
kubectl get hpa -n gokite

# Check resource usage
kubectl top pods -n gokite
```

## 🎯 Common Operations

### Scale Manually

```bash
kubectl scale deployment gokite-nextjs-deployment --replicas=5 -n gokite
```

### Restart Deployment

```bash
kubectl rollout restart deployment/gokite-nextjs-deployment -n gokite
```

### View Rollout History

```bash
kubectl rollout history deployment/gokite-nextjs-deployment -n gokite
```

### Update Environment Variables

Edit `k8s/configmap.yaml` then:

```bash
kubectl apply -f k8s/configmap.yaml -n gokite
kubectl rollout restart deployment/gokite-nextjs-deployment -n gokite
```

## 🧹 Cleanup

### Remove All Resources

```bash
# Using script (Linux/Mac)
./scripts/cleanup.sh

# Or manually
kubectl delete -f k8s/ -n gokite
kubectl delete namespace gokite
```

## 🔧 Troubleshooting

### Pods Not Starting?

```bash
kubectl describe pod <pod-name> -n gokite
kubectl logs <pod-name> -n gokite
```

### Image Pull Error?

1. Verify image name in `k8s/deployment.yaml`
2. Check registry credentials
3. Create image pull secret if using private registry:
   ```bash
   kubectl create secret docker-registry regcred \
     --docker-server=<registry> \
     --docker-username=<username> \
     --docker-password=<password> \
     -n gokite
   ```

### Service Not Accessible?

```bash
# Check service
kubectl get svc -n gokite

# Check endpoints
kubectl get endpoints -n gokite

# Test from inside cluster
kubectl run -it --rm debug --image=alpine --restart=Never -n gokite -- sh
# Inside pod: wget -O- http://gokite-nextjs-service
```

## 📚 Automation Scripts

All scripts are in the `scripts/` directory:

- **build-and-push.sh** - Build and push Docker image
- **deploy-k8s.sh** - Deploy to Kubernetes
- **update-deployment.sh** - Update running deployment
- **cleanup.sh** - Remove all resources

### Make Scripts Executable (Linux/Mac)

```bash
chmod +x scripts/*.sh
```

### Usage Examples

```bash
# Build version 2.0.0
./scripts/build-and-push.sh 2.0.0

# Deploy to custom namespace
./scripts/deploy-k8s.sh my-namespace

# Update to version 2.0.0
./scripts/update-deployment.sh 2.0.0 gokite
```

## 🔐 Production Checklist

Before going to production:

- [ ] Update `NEXT_PUBLIC_API_BASE_URL` in `k8s/configmap.yaml`
- [ ] Configure proper resource limits in `k8s/deployment.yaml`
- [ ] Set up HTTPS with Ingress (edit `k8s/ingress.yaml`)
- [ ] Use specific image tags (not `latest`)
- [ ] Configure image pull secrets for private registry
- [ ] Set up monitoring (Prometheus/Grafana)
- [ ] Configure log aggregation (ELK/Loki)
- [ ] Enable backups for configurations
- [ ] Review security policies
- [ ] Set up CI/CD pipeline

## 📖 Need More Details?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive documentation.

## 🆘 Quick Help

| Task         | Command                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------- |
| Build        | `docker build -t gokite-nextjs:latest .`                                                  |
| Run locally  | `docker-compose up -d`                                                                    |
| Deploy       | `kubectl apply -f k8s/ -n gokite`                                                         |
| Check status | `kubectl get all -n gokite`                                                               |
| View logs    | `kubectl logs -f deployment/gokite-nextjs-deployment -n gokite`                           |
| Scale        | `kubectl scale deployment/gokite-nextjs-deployment --replicas=5 -n gokite`                |
| Update       | `kubectl set image deployment/gokite-nextjs-deployment gokite-nextjs=NEW_IMAGE -n gokite` |
| Rollback     | `kubectl rollout undo deployment/gokite-nextjs-deployment -n gokite`                      |
| Delete       | `kubectl delete -f k8s/ -n gokite`                                                        |

---

**Happy Deploying! 🚀**
