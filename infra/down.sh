#!/bin/bash
echo "Matando os containers do postGrees..."
docker-compose -f docker-compose.yaml down

echo "Matando os containers do Hyperledger Besu..."
docker-compose -f besu/docker-compose.yaml down
