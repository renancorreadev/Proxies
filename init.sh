#!/bin/bash
echo "Iniciando os containers do postGrees..."
docker-compose -f docker-compose.yaml up -d

echo "Iniciando os containers do Hyperledger Besu..."
docker-compose -f besu/docker-compose.yaml up -d
