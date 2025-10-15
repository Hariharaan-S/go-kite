# Kubernetes Configuration Files

This directory contains all Kubernetes manifests for deploying the GoKite Next.js application.

## 📁 Files Overview

| File                 | Purpose                                     |
| -------------------- | ------------------------------------------- |
| `namespace.yaml`     | Creates the `gokite` namespace              |
| `configmap.yaml`     | Environment variables and configuration     |
| `deployment.yaml`    | Application deployment with 3 replicas      |
| `service.yaml`       | LoadBalancer service exposing port 80       |
| `hpa.yaml`           | Horizontal Pod Autoscaler (2-10 replicas)   |
| `ingress.yaml`       | Ingress for HTTPS/domain access             |
| `kustomization.yaml` | Kustomize configuration for easy deployment |

## 🚀 Quick Deploy

### Option 1: Using kubectl

```bash
kubectl apply -f . -n gokite
```

### Option 2: Using kustomize

```bash
kubectl apply -k .
```

### Option 3: Using the provided script

```bash
../scripts/deploy-k8s.sh
```

## ⚙️ Configuration

### Before Deploying

1. **Update the container image** in `deployment.yaml`:

   ```yaml
   image: YOUR_REGISTRY/gokite-nextjs:latest
   ```

2. **Update environment variables** in `configmap.yaml`:

   ```yaml
   NEXT_PUBLIC_API_BASE_URL: "https://your-api-url.com"
   ```

3. **Update domain** in `ingress.yaml` (if using):
   ```yaml
   host: your-domain.com
   ```

## 📊 Resource Specifications

### Deployment

- **Replicas**: 3 (default)
- **CPU Request**: 250m
- **CPU Limit**: 500m
- **Memory Request**: 256Mi
- **Memory Limit**: 512Mi

### HPA (Auto-Scaling)

- **Min Replicas**: 2
- **Max Replicas**: 10
- **CPU Target**: 70%
- **Memory Target**: 80%

## 🔧 Customization

### Adjust Resource Limits

Edit `deployment.yaml`:

```yaml
resources:
  requests:
    memory: "512Mi" # Increase for better performance
    cpu: "500m"
  limits:
    memory: "1Gi"
    cpu: "1000m"
```

### Change Service Type

Edit `service.yaml`:

```yaml
spec:
  type: NodePort # Options: ClusterIP, NodePort, LoadBalancer
```

### Disable Auto-Scaling

Don't apply `hpa.yaml` or delete it:

```bash
kubectl delete hpa gokite-nextjs-hpa -n gokite
```

## 🌐 Service Types

### LoadBalancer (Recommended for Cloud)

- Automatically provisions external IP
- Best for AWS, GCP, Azure
- Default configuration

### NodePort (For On-Premise)

Change in `service.yaml`:

```yaml
spec:
  type: NodePort
  ports:
    - name: http
      port: 80
      targetPort: 3000
      nodePort: 30080 # Optional: specify port (30000-32767)
```

### ClusterIP (Internal Only)

For internal access only:

```yaml
spec:
  type: ClusterIP
```

Then use Ingress or port-forward to access.

## 🔐 Using Ingress for HTTPS

1. **Install Nginx Ingress Controller** (if not already installed):

   ```bash
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
   ```

2. **Update `ingress.yaml`** with your domain:

   ```yaml
   - host: your-domain.com
   ```

3. **Apply Ingress**:

   ```bash
   kubectl apply -f ingress.yaml -n gokite
   ```

4. **Install cert-manager** for SSL (optional):
   ```bash
   kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml
   ```

## 📝 Common Operations

### View All Resources

```bash
kubectl get all -n gokite
```

### Update Configuration

```bash
# Edit configmap
kubectl edit configmap gokite-nextjs-config -n gokite

# Or apply changes
kubectl apply -f configmap.yaml -n gokite

# Restart deployment to pick up changes
kubectl rollout restart deployment/gokite-nextjs-deployment -n gokite
```

### Scale Manually

```bash
kubectl scale deployment gokite-nextjs-deployment --replicas=5 -n gokite
```

### Update Image

```bash
kubectl set image deployment/gokite-nextjs-deployment \
  gokite-nextjs=YOUR_REGISTRY/gokite-nextjs:v2.0.0 \
  -n gokite
```

### Rollback

```bash
kubectl rollout undo deployment/gokite-nextjs-deployment -n gokite
```

## 🔍 Troubleshooting

### Check Pod Status

```bash
kubectl get pods -n gokite
kubectl describe pod <pod-name> -n gokite
kubectl logs <pod-name> -n gokite
```

### Check Events

```bash
kubectl get events -n gokite --sort-by='.lastTimestamp'
```

### Test Service Connectivity

```bash
# From inside the cluster
kubectl run -it --rm debug --image=alpine --restart=Never -n gokite -- sh
# Then: wget -O- http://gokite-nextjs-service
```

## 🗑️ Cleanup

### Delete All Resources

```bash
kubectl delete -f . -n gokite
```

### Delete Namespace (removes everything)

```bash
kubectl delete namespace gokite
```

## 📚 Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Nginx Ingress Controller](https://kubernetes.github.io/ingress-nginx/)
- [cert-manager](https://cert-manager.io/)
- [Kustomize](https://kustomize.io/)

## 💡 Tips

1. **Always use specific image tags** instead of `latest` in production
2. **Set up monitoring** with Prometheus and Grafana
3. **Use secrets** for sensitive data instead of ConfigMap
4. **Enable resource quotas** to prevent resource exhaustion
5. **Set up backup** for critical configurations
6. **Use labels** consistently for better organization
7. **Test in staging** before deploying to production

## 🔗 Related Files

- Main Dockerfile: `../Dockerfile`
- Docker Compose: `../docker-compose.yml`
- Deployment Guide: `../DEPLOYMENT.md`
- Quick Start: `../QUICKSTART.md`
