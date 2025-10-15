#!/bin/bash

# Kubernetes Deployment Script
# Usage: ./scripts/deploy-k8s.sh [namespace]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
NAMESPACE=${1:-"gokite"}
K8S_DIR="./k8s"

echo -e "${GREEN}=== GoKite Kubernetes Deployment ===${NC}\n"

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}Error: kubectl is not installed${NC}"
    exit 1
fi

# Check if kubectl can connect to cluster
if ! kubectl cluster-info &> /dev/null; then
    echo -e "${RED}Error: Cannot connect to Kubernetes cluster${NC}"
    exit 1
fi

echo -e "${BLUE}Using namespace: ${NAMESPACE}${NC}\n"

# Create namespace if it doesn't exist
if ! kubectl get namespace ${NAMESPACE} &> /dev/null; then
    echo -e "${YELLOW}Creating namespace: ${NAMESPACE}${NC}"
    kubectl create namespace ${NAMESPACE}
else
    echo -e "${GREEN}Namespace ${NAMESPACE} already exists${NC}"
fi

# Apply ConfigMap
echo -e "\n${YELLOW}Applying ConfigMap...${NC}"
kubectl apply -f ${K8S_DIR}/configmap.yaml -n ${NAMESPACE}

# Apply Deployment
echo -e "\n${YELLOW}Applying Deployment...${NC}"
kubectl apply -f ${K8S_DIR}/deployment.yaml -n ${NAMESPACE}

# Apply Service
echo -e "\n${YELLOW}Applying Service...${NC}"
kubectl apply -f ${K8S_DIR}/service.yaml -n ${NAMESPACE}

# Apply HPA (if metrics-server is available)
if kubectl top nodes &> /dev/null; then
    echo -e "\n${YELLOW}Applying HPA...${NC}"
    kubectl apply -f ${K8S_DIR}/hpa.yaml -n ${NAMESPACE}
else
    echo -e "\n${YELLOW}Skipping HPA (metrics-server not available)${NC}"
fi

# Apply Ingress if file exists
if [ -f "${K8S_DIR}/ingress.yaml" ]; then
    echo -e "\n${YELLOW}Do you want to apply Ingress? (y/n)${NC}"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        kubectl apply -f ${K8S_DIR}/ingress.yaml -n ${NAMESPACE}
    fi
fi

# Wait for deployment to be ready
echo -e "\n${YELLOW}Waiting for deployment to be ready...${NC}"
kubectl rollout status deployment/gokite-nextjs-deployment -n ${NAMESPACE} --timeout=5m

# Show deployment status
echo -e "\n${GREEN}=== Deployment Status ===${NC}"
kubectl get all -n ${NAMESPACE}

# Show service details
echo -e "\n${GREEN}=== Service Details ===${NC}"
kubectl get svc gokite-nextjs-service -n ${NAMESPACE}

# Get the service URL
SERVICE_TYPE=$(kubectl get svc gokite-nextjs-service -n ${NAMESPACE} -o jsonpath='{.spec.type}')

echo -e "\n${GREEN}=== Access Information ===${NC}"
if [ "$SERVICE_TYPE" == "LoadBalancer" ]; then
    echo -e "${BLUE}Service Type: LoadBalancer${NC}"
    echo -e "${YELLOW}Waiting for external IP...${NC}"
    kubectl get svc gokite-nextjs-service -n ${NAMESPACE} -w &
    sleep 10
    kill %1 2>/dev/null
    EXTERNAL_IP=$(kubectl get svc gokite-nextjs-service -n ${NAMESPACE} -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
    if [ -n "$EXTERNAL_IP" ]; then
        echo -e "${GREEN}Access your application at: http://${EXTERNAL_IP}${NC}"
    else
        echo -e "${YELLOW}External IP pending. Check with: kubectl get svc -n ${NAMESPACE}${NC}"
    fi
elif [ "$SERVICE_TYPE" == "NodePort" ]; then
    echo -e "${BLUE}Service Type: NodePort${NC}"
    NODE_PORT=$(kubectl get svc gokite-nextjs-service -n ${NAMESPACE} -o jsonpath='{.spec.ports[0].nodePort}')
    NODE_IP=$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="ExternalIP")].address}')
    if [ -z "$NODE_IP" ]; then
        NODE_IP=$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="InternalIP")].address}')
    fi
    echo -e "${GREEN}Access your application at: http://${NODE_IP}:${NODE_PORT}${NC}"
else
    echo -e "${BLUE}Service Type: ClusterIP${NC}"
    echo -e "${YELLOW}To access the application, use port-forward:${NC}"
    echo -e "${GREEN}kubectl port-forward svc/gokite-nextjs-service 3000:80 -n ${NAMESPACE}${NC}"
    echo -e "${GREEN}Then access at: http://localhost:3000${NC}"
fi

echo -e "\n${GREEN}=== Deployment Complete! ===${NC}\n"

# Show helpful commands
echo -e "${YELLOW}Useful commands:${NC}"
echo -e "  View logs:       ${GREEN}kubectl logs -f deployment/gokite-nextjs-deployment -n ${NAMESPACE}${NC}"
echo -e "  Get pods:        ${GREEN}kubectl get pods -n ${NAMESPACE}${NC}"
echo -e "  Scale:           ${GREEN}kubectl scale deployment gokite-nextjs-deployment --replicas=5 -n ${NAMESPACE}${NC}"
echo -e "  Delete:          ${GREEN}kubectl delete -f ${K8S_DIR}/ -n ${NAMESPACE}${NC}"

