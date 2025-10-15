# 🔧 Deployment Automation Scripts

This directory contains automation scripts to simplify Docker and Kubernetes operations.

## 📁 Available Scripts

| Script                 | Platform  | Purpose                      |
| ---------------------- | --------- | ---------------------------- |
| `build-and-push.sh`    | Linux/Mac | Build and push Docker images |
| `build-and-push.bat`   | Windows   | Build and push Docker images |
| `deploy-k8s.sh`        | Linux/Mac | Deploy to Kubernetes         |
| `update-deployment.sh` | Linux/Mac | Update running deployment    |
| `cleanup.sh`           | Linux/Mac | Remove all resources         |

## 🚀 Usage

### Setup (Linux/Mac only)

```bash
# Make scripts executable
chmod +x scripts/*.sh
```

### build-and-push.sh

Build Docker image and push to registry.

```bash
# Build with 'latest' tag
./scripts/build-and-push.sh

# Build with specific version
./scripts/build-and-push.sh v1.2.0
```

**Before using:**

- Edit script and set `REGISTRY` variable to your Docker registry
- Or export it: `export REGISTRY=your-username`

**Example:**

```bash
# Edit the script
vi scripts/build-and-push.sh
# Set: REGISTRY="mydockerhub"

# Then run
./scripts/build-and-push.sh v1.0.0
```

### deploy-k8s.sh

Deploy application to Kubernetes cluster.

```bash
# Deploy to 'gokite' namespace
./scripts/deploy-k8s.sh

# Deploy to custom namespace
./scripts/deploy-k8s.sh my-namespace
```

**What it does:**

1. Creates namespace if needed
2. Applies ConfigMap
3. Applies Deployment
4. Applies Service
5. Applies HPA (if metrics-server available)
6. Waits for deployment to be ready
7. Shows access information

### update-deployment.sh

Update running deployment with new image version.

```bash
# Update to version 2.0.0 in 'gokite' namespace
./scripts/update-deployment.sh v2.0.0 gokite

# Update to 'latest' in 'production' namespace
./scripts/update-deployment.sh latest production
```

**Before using:**

- Set `REGISTRY` variable in the script

**What it does:**

1. Updates deployment image
2. Waits for rollout to complete
3. Shows pod status
4. Auto-rollbacks on failure

### cleanup.sh

Remove all Kubernetes resources.

```bash
# Clean up 'gokite' namespace
./scripts/cleanup.sh

# Clean up custom namespace
./scripts/cleanup.sh my-namespace
```

**Warning:** This will delete all resources!

**What it does:**

1. Confirms deletion
2. Deletes all K8s resources
3. Optionally deletes namespace

### build-and-push.bat (Windows)

Windows version of build-and-push script.

```cmd
REM Build with 'latest' tag
scripts\build-and-push.bat

REM Build with specific version
scripts\build-and-push.bat v1.0.0
```

## ⚙️ Configuration

### Set Docker Registry

**Option 1: Edit scripts**

```bash
# Edit build-and-push.sh
vi scripts/build-and-push.sh
# Change: REGISTRY="your-dockerhub-username"

# Edit update-deployment.sh
vi scripts/update-deployment.sh
# Change: REGISTRY="your-dockerhub-username"
```

**Option 2: Environment variable**

```bash
export REGISTRY="your-dockerhub-username"
./scripts/build-and-push.sh v1.0.0
```

## 📝 Examples

### Complete Deployment Workflow

```bash
# 1. Build and push new version
./scripts/build-and-push.sh v2.0.0

# 2. Update deployment
./scripts/update-deployment.sh v2.0.0 gokite

# 3. Verify
kubectl get pods -n gokite
```

### First Time Deployment

```bash
# 1. Set registry
export REGISTRY="myusername"

# 2. Build and push
./scripts/build-and-push.sh v1.0.0

# 3. Update k8s/deployment.yaml with image name
# image: myusername/gokite-nextjs:v1.0.0

# 4. Deploy
./scripts/deploy-k8s.sh gokite
```

### Rollback Example

```bash
# If deployment fails, rollback manually
kubectl rollout undo deployment/gokite-nextjs-deployment -n gokite
```

### Testing Locally

```bash
# Build image
./scripts/build-and-push.sh test

# Run locally (don't push)
docker run -d -p 3000:3000 gokite-nextjs:test
curl http://localhost:3000

# Clean up
docker stop <container-id>
docker rm <container-id>
```

## 🔍 Troubleshooting

### Script not executable (Linux/Mac)

```bash
chmod +x scripts/*.sh
```

### Registry not set

```bash
# Error: "No registry configured"
# Solution: Edit script or export REGISTRY
export REGISTRY="your-username"
```

### kubectl not found

```bash
# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

### Docker login required

```bash
# Login to Docker Hub
docker login

# Or for other registries
docker login registry.example.com
```

### Permission denied

```bash
# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

## 🎯 Best Practices

1. **Use versioned tags** instead of 'latest' in production

   ```bash
   ./scripts/build-and-push.sh v$(date +%Y%m%d)-$BUILD_NUMBER
   ```

2. **Test locally** before pushing

   ```bash
   docker build -t test .
   docker run -p 3000:3000 test
   # Test, then push if OK
   ```

3. **Backup before updates**

   ```bash
   kubectl get all -n gokite -o yaml > backup-$(date +%Y%m%d).yaml
   ```

4. **Monitor deployments**

   ```bash
   watch kubectl get pods -n gokite
   ```

5. **Check logs after deployment**
   ```bash
   kubectl logs -f deployment/gokite-nextjs-deployment -n gokite
   ```

## 💡 Tips

- **Parallel builds**: Scripts use Docker BuildKit for faster builds
- **Multi-platform**: Build for multiple architectures if needed
- **Cache**: Docker layer caching speeds up builds
- **Dry-run**: Test K8s changes with `--dry-run=client`

## 🔗 Related Documentation

- Main Deployment Guide: [../DEPLOYMENT.md](../DEPLOYMENT.md)
- Quick Start: [../QUICKSTART.md](../QUICKSTART.md)
- Kubernetes Config: [../k8s/README.md](../k8s/README.md)

## 📞 Need Help?

- **Manual commands**: See [QUICKSTART.md](../QUICKSTART.md)
- **Detailed guide**: See [DEPLOYMENT.md](../DEPLOYMENT.md)
- **K8s issues**: See [k8s/README.md](../k8s/README.md)

---

**Note for Windows users:**

- Use `.bat` files or run commands manually
- Consider using WSL (Windows Subsystem for Linux) for full script support
