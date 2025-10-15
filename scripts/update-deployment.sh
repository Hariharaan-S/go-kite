#!/bin/bash

# Update Deployment Script
# Usage: ./scripts/update-deployment.sh [version] [namespace]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
VERSION=${1:-"latest"}
NAMESPACE=${2:-"gokite"}
IMAGE_NAME="gokite-nextjs"
REGISTRY=""  # Set your registry here

if [ -z "$REGISTRY" ]; then
    echo -e "${RED}Error: REGISTRY variable is not set${NC}"
    echo -e "${YELLOW}Please edit this script and set the REGISTRY variable${NC}"
    exit 1
fi

FULL_IMAGE="${REGISTRY}/${IMAGE_NAME}:${VERSION}"

echo -e "${GREEN}=== Updating GoKite Deployment ===${NC}\n"
echo -e "${YELLOW}Version: ${VERSION}${NC}"
echo -e "${YELLOW}Namespace: ${NAMESPACE}${NC}"
echo -e "${YELLOW}Image: ${FULL_IMAGE}${NC}\n"

# Update the deployment
echo -e "${YELLOW}Updating deployment...${NC}"
kubectl set image deployment/gokite-nextjs-deployment \
    gokite-nextjs=${FULL_IMAGE} \
    -n ${NAMESPACE}

# Wait for rollout to complete
echo -e "\n${YELLOW}Waiting for rollout to complete...${NC}"
kubectl rollout status deployment/gokite-nextjs-deployment -n ${NAMESPACE} --timeout=5m

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}Deployment updated successfully!${NC}"
    
    # Show current pods
    echo -e "\n${GREEN}Current pods:${NC}"
    kubectl get pods -n ${NAMESPACE} -l app=gokite-nextjs
else
    echo -e "\n${RED}Deployment update failed!${NC}"
    echo -e "${YELLOW}Rolling back to previous version...${NC}"
    kubectl rollout undo deployment/gokite-nextjs-deployment -n ${NAMESPACE}
    exit 1
fi

