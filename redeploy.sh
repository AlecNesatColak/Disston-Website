#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Stopping and removing existing containers..."
docker-compose down

echo "Pulling updated images (if applicable)..."
docker-compose pull || echo "No remote images to pull, skipping..."

echo "Building local Docker images..."
docker-compose build

echo "Starting up containers..."
docker-compose up -d

echo "Deployment complete."
