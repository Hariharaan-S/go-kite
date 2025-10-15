# GoKite Next.js Deployment Guide

This guide provides step-by-step instructions for deploying the GoKite Next.js application using Docker and Kubernetes on Ubuntu Linux.

## Prerequisites

- Ubuntu Linux server
- Docker installed
- Kubernetes cluster (minikube, kubeadm, or managed K8s)
- kubectl configured
- Docker registry access (Docker Hub, AWS ECR, GCR, etc.)

## Docker Deployment

### 1. Build the Docker Image

```bash
cd go-kite
docker build -t gokite-nextjs:latest .
```

### 2. Test Locally with Docker

```bash
# Run the container
docker run -d -p 3000:3000 --name gokite-app gokite-nextjs:latest

# Check logs
docker logs -f gokite-app

# Test the application
curl http://localhost:3000

# Stop the container
docker stop gokite-app
docker rm gokite-app
```

### 3. Using Docker Compose

```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

## Kubernetes Deployment

### 1. Tag and Push Image to Registry

```bash
# For Docker Hub
docker tag gokite-nextjs:latest <your-dockerhub-username>/gokite-nextjs:latest
docker push <your-dockerhub-username>/gokite-nextjs:latest

# For AWS ECR
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
docker tag gokite-nextjs:latest <account-id>.dkr.ecr.<region>.amazonaws.com/gokite-nextjs:latest
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/gokite-nextjs:latest
```

### 2. Update Kubernetes Deployment File

Edit `k8s/deployment.yaml` and update the image reference:

```yaml
image: <your-registry>/gokite-nextjs:latest
```

### 3. Deploy to Kubernetes

```bash
# Create namespace (optional)
kubectl create namespace gokite

# Apply ConfigMap
kubectl apply -f k8s/configmap.yaml -n gokite

# Apply Deployment
kubectl apply -f k8s/deployment.yaml -n gokite

# Apply Service
kubectl apply -f k8s/service.yaml -n gokite

# Apply HPA (optional, for auto-scaling)
kubectl apply -f k8s/hpa.yaml -n gokite
```

### 4. Verify Deployment

```bash
# Check pods
kubectl get pods -n gokite

# Check services
kubectl get svc -n gokite

# Check deployment
kubectl get deployment -n gokite

# View logs
kubectl logs -f deployment/gokite-nextjs-deployment -n gokite

# Describe pod for troubleshooting
kubectl describe pod <pod-name> -n gokite
```

### 5. Access the Application

```bash
# For LoadBalancer service
kubectl get svc gokite-nextjs-service -n gokite
# Access via EXTERNAL-IP

# For NodePort service
kubectl get svc gokite-nextjs-service -n gokite
# Access via <node-ip>:<node-port>

# For port-forwarding (testing)
kubectl port-forward svc/gokite-nextjs-service 3000:80 -n gokite
# Access via http://localhost:3000
```

## Configuration

### Environment Variables

Update environment variables in `k8s/configmap.yaml` or `k8s/deployment.yaml`:

- `NODE_ENV`: Set to `production`
- `NEXT_PUBLIC_API_BASE_URL`: Your backend API URL

### Resource Limits

Adjust CPU and memory limits in `k8s/deployment.yaml` based on your requirements:

```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "250m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

### Scaling

#### Manual Scaling

```bash
kubectl scale deployment gokite-nextjs-deployment --replicas=5 -n gokite
```

#### Auto-Scaling (HPA)

The HPA configuration is in `k8s/hpa.yaml`. It will automatically scale between 2-10 replicas based on CPU and memory usage.

## Monitoring and Maintenance

### Update Deployment

```bash
# Build new image
docker build -t gokite-nextjs:v2.0 .

# Push to registry
docker push <your-registry>/gokite-nextjs:v2.0

# Update deployment
kubectl set image deployment/gokite-nextjs-deployment gokite-nextjs=<your-registry>/gokite-nextjs:v2.0 -n gokite

# Check rollout status
kubectl rollout status deployment/gokite-nextjs-deployment -n gokite
```

### Rollback

```bash
# View rollout history
kubectl rollout history deployment/gokite-nextjs-deployment -n gokite

# Rollback to previous version
kubectl rollout undo deployment/gokite-nextjs-deployment -n gokite

# Rollback to specific revision
kubectl rollout undo deployment/gokite-nextjs-deployment --to-revision=2 -n gokite
```

### Health Checks

The deployment includes:

- **Liveness Probe**: Restarts container if unhealthy
- **Readiness Probe**: Removes pod from service if not ready

### Logs

```bash
# Stream logs
kubectl logs -f deployment/gokite-nextjs-deployment -n gokite

# Logs from specific pod
kubectl logs <pod-name> -n gokite

# Previous container logs
kubectl logs <pod-name> -n gokite --previous
```

## Cleanup

```bash
# Delete all resources
kubectl delete -f k8s/ -n gokite

# Delete namespace
kubectl delete namespace gokite
```

## Troubleshooting

### Pod Not Starting

```bash
kubectl describe pod <pod-name> -n gokite
kubectl logs <pod-name> -n gokite
```

### Image Pull Errors

- Check image name and tag
- Verify registry credentials
- Create image pull secret if using private registry:

```bash
kubectl create secret docker-registry regcred \
  --docker-server=<registry-url> \
  --docker-username=<username> \
  --docker-password=<password> \
  --docker-email=<email> \
  -n gokite
```

Then add to deployment:

```yaml
spec:
  imagePullSecrets:
    - name: regcred
```

### Service Not Accessible

- Check service type and ports
- Verify network policies
- Check firewall rules on Ubuntu server

## Production Best Practices

1. **Use specific image tags** instead of `latest`
2. **Set up monitoring** (Prometheus, Grafana)
3. **Configure logging** (ELK stack, Loki)
4. **Implement CI/CD** pipeline
5. **Use secrets** for sensitive data
6. **Enable HTTPS** with Ingress controller
7. **Regular backups** of configurations
8. **Security scanning** of Docker images

## Next Steps

- Set up Ingress controller for HTTPS
- Configure persistent storage if needed
- Implement monitoring and alerting
- Set up CI/CD pipeline
- Configure backup and disaster recovery
