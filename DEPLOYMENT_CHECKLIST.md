# 🚀 GoKite Deployment Checklist

Complete deployment checklist for Ubuntu Linux server using Docker and Kubernetes.

## 📋 Pre-Deployment Checklist

### Server Requirements

- [ ] Ubuntu 20.04 LTS or later installed
- [ ] Minimum 4GB RAM (8GB+ recommended)
- [ ] Minimum 2 CPU cores (4+ recommended)
- [ ] 20GB+ available disk space
- [ ] Static IP address configured
- [ ] Domain name configured (if using HTTPS)

### Software Installation

- [ ] Docker installed and running
  ```bash
  docker --version
  sudo systemctl status docker
  ```
- [ ] Kubernetes cluster set up (kubeadm, k3s, or managed)
  ```bash
  kubectl version
  kubectl get nodes
  ```
- [ ] kubectl configured with cluster access
  ```bash
  kubectl cluster-info
  ```
- [ ] Git installed
  ```bash
  git --version
  ```

### Access & Permissions

- [ ] SSH access to server configured
- [ ] Sudo privileges for deployment user
- [ ] Docker registry account created (Docker Hub/ECR/GCR)
- [ ] Registry credentials configured
  ```bash
  docker login
  ```

## 🔧 Configuration Checklist

### Repository Setup

- [ ] Code cloned to server
  ```bash
  git clone <repository-url>
  cd go-kite
  ```

### Docker Configuration

- [ ] Review `Dockerfile` (no changes needed typically)
- [ ] Update `.dockerignore` if needed
- [ ] Test local Docker build
  ```bash
  docker build -t gokite-nextjs:test .
  ```

### Kubernetes Configuration

- [ ] Update image registry in `k8s/deployment.yaml`
  ```yaml
  image: YOUR_REGISTRY/gokite-nextjs:latest
  ```
- [ ] Update API URL in `k8s/configmap.yaml`
  ```yaml
  NEXT_PUBLIC_API_BASE_URL: "https://your-api-url.com"
  ```
- [ ] Update domain in `k8s/ingress.yaml` (if using)
  ```yaml
  host: your-domain.com
  ```
- [ ] Adjust resource limits in `k8s/deployment.yaml` based on server capacity
- [ ] Review HPA settings in `k8s/hpa.yaml`

## 🚀 Deployment Steps

### Step 1: Build Docker Image

- [ ] Navigate to project directory
  ```bash
  cd go-kite
  ```
- [ ] Build the Docker image
  ```bash
  docker build -t gokite-nextjs:v1.0.0 .
  ```
- [ ] Verify image created
  ```bash
  docker images | grep gokite-nextjs
  ```
- [ ] Test image locally (optional)
  ```bash
  docker run -d -p 3000:3000 --name test gokite-nextjs:v1.0.0
  curl http://localhost:3000
  docker stop test && docker rm test
  ```

### Step 2: Push to Registry

- [ ] Tag image for registry
  ```bash
  docker tag gokite-nextjs:v1.0.0 YOUR_REGISTRY/gokite-nextjs:v1.0.0
  docker tag gokite-nextjs:v1.0.0 YOUR_REGISTRY/gokite-nextjs:latest
  ```
- [ ] Push to registry
  ```bash
  docker push YOUR_REGISTRY/gokite-nextjs:v1.0.0
  docker push YOUR_REGISTRY/gokite-nextjs:latest
  ```
- [ ] Verify push successful
  ```bash
  # Check on Docker Hub or your registry
  ```

### Step 3: Deploy to Kubernetes

- [ ] Create namespace
  ```bash
  kubectl apply -f k8s/namespace.yaml
  ```
- [ ] Apply ConfigMap
  ```bash
  kubectl apply -f k8s/configmap.yaml -n gokite
  ```
- [ ] Apply Deployment
  ```bash
  kubectl apply -f k8s/deployment.yaml -n gokite
  ```
- [ ] Apply Service
  ```bash
  kubectl apply -f k8s/service.yaml -n gokite
  ```
- [ ] Apply HPA (if metrics-server installed)
  ```bash
  kubectl apply -f k8s/hpa.yaml -n gokite
  ```

### Step 4: Verify Deployment

- [ ] Check pods are running
  ```bash
  kubectl get pods -n gokite
  # All pods should show STATUS: Running
  ```
- [ ] Check deployment status
  ```bash
  kubectl get deployment -n gokite
  # READY should show 3/3
  ```
- [ ] Check service
  ```bash
  kubectl get svc -n gokite
  ```
- [ ] View logs
  ```bash
  kubectl logs -f deployment/gokite-nextjs-deployment -n gokite
  ```

### Step 5: Access Application

- [ ] Get service external IP/NodePort
  ```bash
  kubectl get svc gokite-nextjs-service -n gokite
  ```
- [ ] Test application access
  ```bash
  curl http://<EXTERNAL-IP or NODE-IP:NODE-PORT>
  ```
- [ ] Verify application loads in browser
- [ ] Test main features and pages

## 🔒 Security Checklist

- [ ] Environment variables don't contain sensitive data
- [ ] Use Kubernetes Secrets for sensitive data
  ```bash
  kubectl create secret generic app-secrets \
    --from-literal=db-password=xxx \
    -n gokite
  ```
- [ ] Configure network policies if needed
- [ ] Set up HTTPS with Ingress and cert-manager
- [ ] Review pod security policies
- [ ] Enable RBAC if not already enabled
- [ ] Scan Docker image for vulnerabilities
  ```bash
  docker scan gokite-nextjs:v1.0.0
  ```

## 📊 Monitoring Setup

- [ ] Set up log aggregation (ELK, Loki, etc.)
- [ ] Configure metrics collection (Prometheus)
- [ ] Set up dashboards (Grafana)
- [ ] Configure alerts for pod failures
- [ ] Set up health check monitoring
- [ ] Configure resource usage alerts

## 🔄 Post-Deployment Tasks

### Testing

- [ ] Test all major user flows
- [ ] Verify API connectivity
- [ ] Test responsive design
- [ ] Check performance and load times
- [ ] Verify environment-specific configurations

### Documentation

- [ ] Document deployment date and version
- [ ] Document any custom configurations
- [ ] Update runbook with server details
- [ ] Document rollback procedures
- [ ] Create incident response plan

### Backup & Recovery

- [ ] Backup Kubernetes configurations
  ```bash
  kubectl get all -n gokite -o yaml > backup-$(date +%Y%m%d).yaml
  ```
- [ ] Document recovery procedures
- [ ] Test rollback process
- [ ] Set up automated backups

## 🌐 HTTPS Setup (Production)

### If using Ingress with cert-manager

- [ ] Install Nginx Ingress Controller
  ```bash
  kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
  ```
- [ ] Install cert-manager
  ```bash
  kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml
  ```
- [ ] Create ClusterIssuer for Let's Encrypt
  ```bash
  kubectl apply -f - <<EOF
  apiVersion: cert-manager.io/v1
  kind: ClusterIssuer
  metadata:
    name: letsencrypt-prod
  spec:
    acme:
      server: https://acme-v02.api.letsencrypt.org/directory
      email: your-email@example.com
      privateKeySecretRef:
        name: letsencrypt-prod
      solvers:
      - http01:
          ingress:
            class: nginx
  EOF
  ```
- [ ] Update and apply ingress.yaml
  ```bash
  kubectl apply -f k8s/ingress.yaml -n gokite
  ```
- [ ] Verify certificate issued
  ```bash
  kubectl get certificate -n gokite
  ```
- [ ] Test HTTPS access

## 🔄 CI/CD Setup (Optional)

- [ ] Set up GitHub Actions secrets
  - `DOCKER_USERNAME`
  - `DOCKER_PASSWORD`
  - `KUBE_CONFIG`
- [ ] Test automated build workflow
- [ ] Test automated deployment workflow
- [ ] Configure branch protection rules
- [ ] Set up approval workflows for production

## 📈 Scaling Considerations

- [ ] Review HPA configuration
- [ ] Set appropriate resource requests/limits
- [ ] Configure cluster autoscaler (if cloud provider)
- [ ] Test scaling under load
- [ ] Document scaling thresholds

## ✅ Final Verification

- [ ] All pods healthy and running
- [ ] Application accessible from public internet
- [ ] HTTPS working (if configured)
- [ ] Logs being collected
- [ ] Metrics being recorded
- [ ] Alerts configured
- [ ] Backups scheduled
- [ ] Documentation updated
- [ ] Team notified of deployment
- [ ] Rollback plan tested

## 📞 Emergency Contacts

Document key contacts:

- DevOps Team: ******\_\_\_******
- Platform Team: ******\_\_\_******
- On-Call Engineer: ******\_\_\_******
- Manager: ******\_\_\_******

## 🆘 Quick Rollback

If something goes wrong:

```bash
# Rollback deployment
kubectl rollout undo deployment/gokite-nextjs-deployment -n gokite

# Or scale down to 0
kubectl scale deployment gokite-nextjs-deployment --replicas=0 -n gokite

# Delete all resources
kubectl delete -f k8s/ -n gokite
```

## 📝 Deployment Log

| Date       | Version | Deployed By | Notes              |
| ---------- | ------- | ----------- | ------------------ |
| YYYY-MM-DD | v1.0.0  | Name        | Initial deployment |
|            |         |             |                    |

---

**Deployment Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Sign-off:**

- [ ] Technical Lead: ********\_******** Date: ****\_****
- [ ] DevOps Lead: ********\_******** Date: ****\_****
- [ ] Project Manager: ********\_******** Date: ****\_****
