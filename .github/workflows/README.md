# GitHub Actions Workflows

This directory contains CI/CD workflows for automated building, testing, and deployment.

## 📋 Workflows

### 1. docker-build.yml

**Purpose:** Build and push Docker images to registry

**Triggers:**

- Push to `main` or `develop` branches
- Pull requests to `main`
- Git tags starting with `v*`

**What it does:**

1. Checks out code
2. Sets up Docker Buildx
3. Logs into Docker registry
4. Builds Docker image with cache
5. Pushes to registry (on main branch only)

**Required Secrets:**

- `DOCKER_USERNAME` - Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub password or access token

### 2. deploy-k8s.yml

**Purpose:** Deploy application to Kubernetes cluster

**Triggers:**

- Successful completion of `docker-build.yml` on main branch
- Manual workflow dispatch

**What it does:**

1. Configures kubectl with cluster credentials
2. Applies Kubernetes manifests
3. Waits for deployment to be ready
4. Shows deployment status

**Required Secrets:**

- `KUBE_CONFIG` - Base64 encoded Kubernetes config file

## 🔧 Setup Instructions

### 1. Docker Hub Setup

1. Go to your repository Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Docker Hub access token (recommended) or password

**To create Docker Hub access token:**

```bash
# Go to https://hub.docker.com/settings/security
# Click "New Access Token"
# Give it a name and copy the token
```

### 2. Kubernetes Setup

1. Get your Kubernetes config file:

   ```bash
   cat ~/.kube/config | base64
   ```

2. Add as GitHub secret:
   - Name: `KUBE_CONFIG`
   - Value: The base64 encoded output from above

### 3. GitHub Container Registry (Alternative)

To use GitHub Container Registry instead of Docker Hub:

1. Edit `docker-build.yml`:

   ```yaml
   env:
     REGISTRY: ghcr.io
     IMAGE_NAME: gokite-nextjs
   ```

2. Uncomment the GitHub Container Registry login section
3. No additional secrets needed (uses `GITHUB_TOKEN`)

## 🚀 Usage

### Automatic Deployment

1. Push code to `main` branch
2. Docker image is built and pushed
3. Kubernetes deployment is updated automatically

### Manual Deployment

1. Go to Actions tab
2. Select "Deploy to Kubernetes"
3. Click "Run workflow"
4. Choose environment (production/staging)

### Tagging Releases

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

This creates versioned Docker images.

## 📊 Monitoring Workflow

### View Workflow Status

- Go to repository → Actions tab
- Click on a workflow run to see details
- View logs for each step

### Deployment Summary

After successful deployment, check the summary for:

- Pod status
- Service endpoints
- Deployment details

## 🔒 Security Best Practices

1. **Use Access Tokens** instead of passwords
2. **Rotate secrets** regularly
3. **Limit token permissions** to minimum required
4. **Use environment-specific secrets** for staging/production
5. **Enable branch protection** on main branch

## 🐛 Troubleshooting

### Docker Build Fails

- Check Dockerfile syntax
- Verify dependencies in package.json
- Check build logs for specific errors

### Docker Push Fails

- Verify `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets
- Ensure Docker Hub repository exists
- Check token permissions

### Kubernetes Deployment Fails

- Verify `KUBE_CONFIG` secret is correct and base64 encoded
- Check if cluster is accessible
- Verify namespace exists
- Check image name in deployment.yaml matches pushed image

### Image Pull Error

- Ensure image was pushed successfully
- Verify image name in deployment.yaml
- Check if image is public or credentials are configured

## 📝 Customization

### Add Environment Variables

Edit `deploy-k8s.yml`:

```yaml
- name: Apply ConfigMap
  run: |
    kubectl create configmap app-config \
      --from-literal=API_URL=${{ secrets.API_URL }} \
      -n ${{ env.NAMESPACE }} \
      --dry-run=client -o yaml | kubectl apply -f -
```

### Add Tests

Add before build step in `docker-build.yml`:

```yaml
- name: Run tests
  run: |
    cd go-kite
    npm install
    npm test
```

### Multi-Environment Deployment

Create separate workflows for each environment or use workflow inputs to select environment.

## 🔗 Related Documentation

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Build Push Action](https://github.com/docker/build-push-action)
- [Kubectl Setup Action](https://github.com/azure/setup-kubectl)

## 💡 Tips

1. **Test locally** before pushing to main
2. **Use pull requests** to review changes
3. **Monitor workflow runs** for failures
4. **Set up notifications** for workflow failures
5. **Use caching** to speed up builds (already configured)
6. **Version your releases** with git tags
