#!/bin/bash

# Cleanup Script for Kubernetes Resources
# Usage: ./scripts/cleanup.sh [namespace]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
NAMESPACE=${1:-"gokite"}

echo -e "${YELLOW}=== GoKite Cleanup Script ===${NC}\n"

# Confirm deletion
echo -e "${RED}WARNING: This will delete all GoKite resources in namespace: ${NAMESPACE}${NC}"
echo -e "${YELLOW}Are you sure you want to continue? (yes/no)${NC}"
read -r response

if [[ ! "$response" =~ ^[Yy][Ee][Ss]$ ]]; then
    echo -e "${GREEN}Cleanup cancelled${NC}"
    exit 0
fi

echo -e "\n${YELLOW}Deleting Kubernetes resources...${NC}"

# Delete resources
kubectl delete -f ./k8s/ -n ${NAMESPACE} --ignore-not-found=true

echo -e "\n${YELLOW}Do you want to delete the namespace '${NAMESPACE}' as well? (yes/no)${NC}"
read -r response

if [[ "$response" =~ ^[Yy][Ee][Ss]$ ]]; then
    kubectl delete namespace ${NAMESPACE} --ignore-not-found=true
    echo -e "${GREEN}Namespace deleted${NC}"
fi

echo -e "\n${GREEN}Cleanup completed!${NC}"

