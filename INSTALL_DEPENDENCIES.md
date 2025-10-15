# Installing Dependencies on Ubuntu Server

Step-by-step guide to install Docker and Kubernetes on Ubuntu Linux.

## 🖥️ System Requirements

- Ubuntu 20.04 LTS or later
- 4GB RAM minimum (8GB+ recommended)
- 2 CPU cores minimum (4+ recommended)
- 20GB available disk space
- Root or sudo access

## 📦 Update System

```bash
sudo apt update
sudo apt upgrade -y
```

## 🐳 Install Docker

### Method 1: Install Docker (Recommended)

```bash
# Remove old versions
sudo apt remove docker docker-engine docker.io containerd runc

# Install prerequisites
sudo apt install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Verify installation
sudo docker --version
sudo docker run hello-world
```

### Post-Installation Steps

```bash
# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to docker group (optional, to run without sudo)
sudo usermod -aG docker $USER
newgrp docker

# Verify non-sudo access
docker ps
```

## ☸️ Install Kubernetes

### Option 1: Install Minikube (Development/Testing)

```bash
# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
kubectl version --client

# Install Minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Start Minikube
minikube start --driver=docker

# Verify
kubectl get nodes
kubectl cluster-info
```

### Option 2: Install K3s (Lightweight Production)

```bash
# Install K3s
curl -sfL https://get.k3s.io | sh -

# Check status
sudo systemctl status k3s

# Configure kubectl
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown $USER:$USER ~/.kube/config
chmod 600 ~/.kube/config

# Verify
kubectl get nodes
```

### Option 3: Install kubeadm (Full Kubernetes)

```bash
# Disable swap
sudo swapoff -a
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

# Load kernel modules
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

# Configure sysctl
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF

sudo sysctl --system

# Install containerd
sudo apt install -y containerd
sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml
sudo systemctl restart containerd
sudo systemctl enable containerd

# Add Kubernetes repository
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

# Install kubeadm, kubelet, kubectl
sudo apt update
sudo apt install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl

# Initialize cluster (on master node)
sudo kubeadm init --pod-network-cidr=10.244.0.0/16

# Configure kubectl for regular user
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# Install CNI (Flannel)
kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml

# Verify
kubectl get nodes
kubectl get pods -A
```

## 🔧 Install Additional Tools

### Install Git

```bash
sudo apt install -y git
git --version
```

### Install kubectl (if not installed)

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
kubectl version --client
```

### Install Helm (Package Manager for Kubernetes)

```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
helm version
```

### Install metrics-server (for HPA)

```bash
# For Minikube
minikube addons enable metrics-server

# For K3s (already included)

# For kubeadm
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Verify
kubectl top nodes
```

## 🌐 Optional: Install Nginx Ingress Controller

```bash
# For Minikube
minikube addons enable ingress

# For K3s (Traefik included by default, or install Nginx)
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml

# For kubeadm
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/baremetal/deploy.yaml

# Verify
kubectl get pods -n ingress-nginx
```

## 🔐 Optional: Install cert-manager (for SSL)

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Verify
kubectl get pods -n cert-manager
```

## ✅ Verification

### Check Docker

```bash
docker --version
docker ps
docker images
sudo systemctl status docker
```

### Check Kubernetes

```bash
kubectl version
kubectl cluster-info
kubectl get nodes
kubectl get pods -A
kubectl get namespaces
```

### Test deployment

```bash
# Deploy test nginx
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --port=80 --type=NodePort
kubectl get svc nginx

# Access and verify
# Then cleanup
kubectl delete deployment nginx
kubectl delete svc nginx
```

## 🔍 Troubleshooting

### Docker Issues

```bash
# Check logs
sudo journalctl -u docker.service

# Restart Docker
sudo systemctl restart docker

# Check permissions
groups $USER
```

### Kubernetes Issues

```bash
# Check kubelet logs
sudo journalctl -u kubelet

# Reset cluster (if needed - WARNING: destroys cluster)
# sudo kubeadm reset

# Check component status
kubectl get componentstatuses
```

### Networking Issues

```bash
# Check firewall
sudo ufw status
sudo ufw allow 6443/tcp  # Kubernetes API
sudo ufw allow 2379:2380/tcp  # etcd
sudo ufw allow 10250/tcp  # kubelet
sudo ufw allow 10251/tcp  # kube-scheduler
sudo ufw allow 10252/tcp  # kube-controller-manager

# For Minikube
minikube ssh
# Check network inside
```

## 📝 Next Steps

After installation:

1. ✅ Verify all components are running
2. ✅ Clone your application repository
3. ✅ Follow the deployment checklist
4. ✅ Build and push Docker images
5. ✅ Deploy to Kubernetes

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Minikube Documentation](https://minikube.sigs.k8s.io/docs/)
- [K3s Documentation](https://docs.k3s.io/)
- [kubeadm Documentation](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/)

---

**Quick Reference Commands:**

```bash
# Docker
docker --version
docker ps
docker images
sudo systemctl status docker

# Kubernetes
kubectl version
kubectl cluster-info
kubectl get nodes
kubectl get pods -A

# Minikube specific
minikube status
minikube start
minikube stop

# K3s specific
sudo systemctl status k3s
sudo journalctl -u k3s
```
