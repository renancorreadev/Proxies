#!/bin/bash

# Lista de diretórios de serviços
SERVICE_DIRS=(
  "infra/compose/besu"
  "infra/compose/db"
  "infra/compose/keycloak"
  "infra/compose/minio"
  "infra/compose/monitoring"
  "infra/compose/vault"
  "infra/compose/thegraph"
)

# Loop pelos diretórios e executa 'docker-compose up'
for DIR in "${SERVICE_DIRS[@]}"; do
  echo "Iniciando serviços na pasta $DIR..."
  cd $DIR || exit 1  # Entra na pasta ou sai com erro se falhar
  docker-compose up -d  # Sobe os serviços em background
  if [ $? -ne 0 ]; then
    echo "Erro ao subir os serviços em $DIR. Abortando."
    exit 1
  fi
  cd - >/dev/null  # Volta para a pasta anterior
  echo "Serviços em $DIR iniciados com sucesso."
done

echo "Todos os serviços foram iniciados."
