# 🚀 GoKite Deployment Documentation

Complete guide for deploying GoKite Next.js application using Docker and Kubernetes on Ubuntu Linux.

## 📚 Documentation Index

| Document                                                     | Purpose                        | When to Use                           |
| ------------------------------------------------------------ | ------------------------------ | ------------------------------------- |
| [QUICKSTART.md](./QUICKSTART.md)                             | Fast deployment guide          | Quick reference for experienced users |
| [DEPLOYMENT.md](./DEPLOYMENT.md)                             | Comprehensive deployment guide | Detailed step-by-step instructions    |
| [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)         | Deployment checklist           | Track deployment progress             |
| [INSTALL_DEPENDENCIES.md](./INSTALL_DEPENDENCIES.md)         | Server setup guide             | Install Docker & Kubernetes on Ubuntu |
| [k8s/README.md](./k8s/README.md)                             | Kubernetes config guide        | Understand K8s manifests              |
| [.github/workflows/README.md](./.github/workflows/README.md) | CI/CD setup guide              | Set up automated deployment           |

## 🎯 Quick Navigation

### First Time Setup

1. **Install Dependencies** → [INSTALL_DEPENDENCIES.md](./INSTALL_DEPENDENCIES.md)
2. **Review Checklist** → [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
3. **Deploy Application** → [DEPLOYMENT.md](./DEPLOYMENT.md)

### Already Have Environment

→ Go directly to [QUICKSTART.md](./QUICKSTART.md)

### Understanding Configuration

→ Read [k8s/README.md](./k8s/README.md)

### Setting Up CI/CD

→ Follow [.github/workflows/README.md](./.github/workflows/README.md)

## 📁 Project Structure

```
go-kite/
├── Dockerfile                      # Multi-stage Docker build
├── .dockerignore                   # Docker build exclusions
├── docker-compose.yml              # Local testing with Docker
├── k8s/                           # Kubernetes manifests
│   ├── namespace.yaml             # Namespace definition
│   ├── configmap.yaml             # Environment variables
│   ├── deployment.yaml            # Application deployment
│   ├── service.yaml               # LoadBalancer service
│   ├── hpa.yaml                   # Auto-scaling configuration
│   ├── ingress.yaml               # HTTPS/domain routing
│   ├── kustomization.yaml         # Kustomize config
│   └── README.md                  # K8s documentation
├── scripts/                       # Automation scripts
│   ├── build-and-push.sh          # Build & push image
│   ├── build-and-push.bat         # Windows version
│   ├── deploy-k8s.sh              # Deploy to K8s
│   ├── update-deployment.sh       # Update running app
│   └── cleanup.sh                 # Remove resources
├── .github/workflows/             # CI/CD pipelines
│   ├── docker-build.yml           # Build & push workflow
│   ├── deploy-k8s.yml             # Deployment workflow
│   └── README.md                  # CI/CD documentation
└── Documentation files (this dir)
```

## 🚀 Deployment Methods

### Method 1: Manual Deployment (Recommended for First Time)

```bash
# 1. Build Docker image
docker build -t gokite-nextjs:latest .

# 2. Push to registry
docker tag gokite-nextjs:latest YOUR_REGISTRY/gokite-nextjs:latest
docker push YOUR_REGISTRY/gokite-nextjs:latest

# 3. Deploy to Kubernetes
kubectl apply -f k8s/ -n gokite
```

📖 **Full Guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)

### Method 2: Using Automation Scripts

```bash
# 1. Build and push
./scripts/build-and-push.sh v1.0.0

# 2. Deploy
./scripts/deploy-k8s.sh gokite
```

📖 **Script Documentation:** [scripts/README.md](./scripts/README.md)

### Method 3: CI/CD Pipeline

```bash
# Just push to main branch
git add .
git commit -m "Deploy v1.0.0"
git push origin main
```

📖 **CI/CD Setup:** [.github/workflows/README.md](./.github/workflows/README.md)

## 🎓 Getting Started Guide

### For Complete Beginners

**Step 1: Prepare Your Server**

- Follow [INSTALL_DEPENDENCIES.md](./INSTALL_DEPENDENCIES.md) to install Docker and Kubernetes

**Step 2: Understand the Requirements**

- Review [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- Check all prerequisites

**Step 3: Deploy**

- Follow [DEPLOYMENT.md](./DEPLOYMENT.md) step-by-step
- Don't skip any steps

**Step 4: Verify**

- Test your deployment
- Check all components are running

### For Experienced Users

→ Jump to [QUICKSTART.md](./QUICKSTART.md) for quick commands

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Internet                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │  LoadBalancer/Ingress │
            │   (Port 80/443)       │
            └──────────┬───────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │  Kubernetes Service   │
            │  gokite-nextjs-svc   │
            └──────────┬───────────┘
                       │
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
    ┌────────┐    ┌────────┐    ┌────────┐
    │  Pod 1 │    │  Pod 2 │    │  Pod 3 │
    │ Next.js│    │ Next.js│    │ Next.js│
    │  :3000 │    │  :3000 │    │  :3000 │
    └────────┘    └────────┘    └────────┘
         │             │             │
         └─────────────┴─────────────┘
                       │
            Horizontal Pod Autoscaler
            (Scale 2-10 based on load)
```

## 🔧 Configuration

### Required Changes Before Deployment

1. **Update Docker Registry** in `k8s/deployment.yaml`:

   ```yaml
   image: YOUR_REGISTRY/gokite-nextjs:latest
   ```

2. **Update API URL** in `k8s/configmap.yaml`:

   ```yaml
   NEXT_PUBLIC_API_BASE_URL: "https://your-api-url.com"
   ```

3. **Update Domain** (if using HTTPS) in `k8s/ingress.yaml`:
   ```yaml
   host: your-domain.com
   ```

### Optional Configurations

- **Resource Limits**: Edit `k8s/deployment.yaml`
- **Replica Count**: Edit `k8s/deployment.yaml`
- **Auto-scaling**: Edit `k8s/hpa.yaml`
- **Service Type**: Edit `k8s/service.yaml`

## 📈 Deployment Environments

### Development (Local)

```bash
# Use Docker Compose
docker-compose up -d
```

### Staging/Testing

```bash
# Use Minikube
minikube start
./scripts/deploy-k8s.sh staging
```

### Production

```bash
# Use full Kubernetes cluster
./scripts/deploy-k8s.sh production
```

## 🔄 Common Operations

### Update Application

```bash
# Build new version
docker build -t gokite-nextjs:v2.0.0 .
docker push YOUR_REGISTRY/gokite-nextjs:v2.0.0

# Update deployment
kubectl set image deployment/gokite-nextjs-deployment \
  gokite-nextjs=YOUR_REGISTRY/gokite-nextjs:v2.0.0 -n gokite
```

### Scale Application

```bash
kubectl scale deployment gokite-nextjs-deployment --replicas=5 -n gokite
```

### View Logs

```bash
kubectl logs -f deployment/gokite-nextjs-deployment -n gokite
```

### Rollback

```bash
kubectl rollout undo deployment/gokite-nextjs-deployment -n gokite
```

## 🆘 Troubleshooting

### Quick Diagnostics

```bash
# Check all resources
kubectl get all -n gokite

# Check pod status
kubectl get pods -n gokite
kubectl describe pod <pod-name> -n gokite

# Check logs
kubectl logs <pod-name> -n gokite

# Check events
kubectl get events -n gokite --sort-by='.lastTimestamp'
```

### Common Issues

| Issue                  | Solution                                           |
| ---------------------- | -------------------------------------------------- |
| Pods not starting      | Check image name, verify registry access           |
| Image pull error       | Verify image exists, check credentials             |
| Service not accessible | Check service type, verify firewall rules          |
| Out of resources       | Increase node capacity or reduce resource requests |

📖 **Detailed troubleshooting:** [DEPLOYMENT.md](./DEPLOYMENT.md#troubleshooting)

## 🔐 Security Best Practices

- ✅ Use specific image tags (not `latest` in production)
- ✅ Scan Docker images for vulnerabilities
- ✅ Use Kubernetes Secrets for sensitive data
- ✅ Enable RBAC
- ✅ Set up network policies
- ✅ Use HTTPS with valid certificates
- ✅ Regularly update dependencies
- ✅ Implement pod security policies

## 📊 Monitoring & Observability

### Recommended Tools

- **Metrics**: Prometheus + Grafana
- **Logs**: ELK Stack or Loki
- **Tracing**: Jaeger or Zipkin
- **Uptime**: UptimeRobot or StatusCake

### Built-in Health Checks

- Liveness Probe: Restarts unhealthy containers
- Readiness Probe: Removes unready pods from service
- HPA: Auto-scales based on CPU/memory usage

## 📚 Additional Resources

### Official Documentation

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

### Tutorials

- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Kubernetes Best Practices](https://kubernetes.io/docs/concepts/configuration/overview/)

### Tools

- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [Docker CLI Reference](https://docs.docker.com/engine/reference/commandline/cli/)

## 🎯 Support & Contribution

### Getting Help

1. Check documentation above
2. Review troubleshooting section
3. Check GitHub issues
4. Contact DevOps team

### Contributing

- Report issues via GitHub Issues
- Submit improvements via Pull Requests
- Update documentation when making changes

## 📝 Deployment History

Track your deployments here:

| Date       | Version | Environment | Deployed By | Notes              |
| ---------- | ------- | ----------- | ----------- | ------------------ |
| 2024-01-XX | v1.0.0  | Production  | -           | Initial deployment |

## ✅ Pre-Flight Checklist

Before deploying to production:

- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Security scan completed
- [ ] Documentation updated
- [ ] Backup plan in place
- [ ] Rollback tested
- [ ] Team notified
- [ ] Monitoring configured
- [ ] Logs aggregation set up
- [ ] SSL certificates configured

## 🚦 Deployment Status

**Current Version:** v1.0.0
**Environment:** Production
**Status:** ✅ Running
**Last Updated:** 2024-XX-XX
**Deployed By:** DevOps Team

---

## 🎉 Quick Start for the Impatient

```bash
# Clone, build, push, deploy - all in one go!
cd go-kite
docker build -t YOUR_REGISTRY/gokite-nextjs:latest .
docker push YOUR_REGISTRY/gokite-nextjs:latest
kubectl apply -f k8s/ -n gokite
kubectl get pods -n gokite
```

**Done!** 🎊

For detailed instructions, see [QUICKSTART.md](./QUICKSTART.md)

---

**Happy Deploying! 🚀**

_For questions or issues, please contact the DevOps team._
