#!/bin/bash

# Build and Push Docker Image Script
# Usage: ./scripts/build-and-push.sh [version]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="gokite-nextjs"
REGISTRY=""  # Set your registry here (e.g., your-username or registry-url)
VERSION=${1:-"latest"}

echo -e "${GREEN}Starting Docker build process...${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running${NC}"
    exit 1
fi

# Build the image
echo -e "${YELLOW}Building Docker image: ${IMAGE_NAME}:${VERSION}${NC}"
docker build -t ${IMAGE_NAME}:${VERSION} .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Successfully built ${IMAGE_NAME}:${VERSION}${NC}"
else
    echo -e "${RED}Failed to build Docker image${NC}"
    exit 1
fi

# Tag image with version and latest
if [ "$VERSION" != "latest" ]; then
    echo -e "${YELLOW}Tagging image as latest${NC}"
    docker tag ${IMAGE_NAME}:${VERSION} ${IMAGE_NAME}:latest
fi

# Push to registry if REGISTRY is set
if [ -n "$REGISTRY" ]; then
    echo -e "${YELLOW}Tagging image for registry${NC}"
    docker tag ${IMAGE_NAME}:${VERSION} ${REGISTRY}/${IMAGE_NAME}:${VERSION}
    
    if [ "$VERSION" != "latest" ]; then
        docker tag ${IMAGE_NAME}:${VERSION} ${REGISTRY}/${IMAGE_NAME}:latest
    fi
    
    echo -e "${YELLOW}Pushing to registry: ${REGISTRY}${NC}"
    docker push ${REGISTRY}/${IMAGE_NAME}:${VERSION}
    
    if [ "$VERSION" != "latest" ]; then
        docker push ${REGISTRY}/${IMAGE_NAME}:latest
    fi
    
    echo -e "${GREEN}Successfully pushed to registry${NC}"
else
    echo -e "${YELLOW}No registry configured. Skipping push.${NC}"
    echo -e "${YELLOW}To push to a registry, set the REGISTRY variable in this script.${NC}"
fi

echo -e "${GREEN}Build process completed!${NC}"
echo -e "${GREEN}Image: ${IMAGE_NAME}:${VERSION}${NC}"

# Show image size
echo -e "\n${YELLOW}Image size:${NC}"
docker images ${IMAGE_NAME}:${VERSION}

