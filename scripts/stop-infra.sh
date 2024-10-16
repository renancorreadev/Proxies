#!/bin/bash

# Lista de diretórios de serviços
SERVICE_DIRS=(
  "infra/compose/besu"
  "infra/compose/db"
  "infra/compose/keycloak"
  "infra/compose/minio"
  "infra/compose/monitoring"
  "infra/compose/vault"
)

# Loop pelos diretórios e executa 'docker-compose down'
for DIR in "${SERVICE_DIRS[@]}"; do
  echo "Parando serviços na pasta $DIR..."
  cd $DIR || exit 1  # Entra na pasta ou sai com erro se falhar
  docker-compose down --volumes --remove-orphans  # Para os serviços e remove os volumes
  if [ $? -ne 0 ]; then
    echo "Erro ao parar os serviços em $DIR. Continuando..."
  fi
  cd - >/dev/null  # Volta para a pasta anterior
  echo "Serviços em $DIR parados com sucesso e volumes removidos."
done

# Remover a rede 'protocol' se existir
NETWORK_NAME="protocol"
if docker network inspect $NETWORK_NAME >/dev/null 2>&1; then
  echo "Removendo a rede $NETWORK_NAME..."
  docker network rm $NETWORK_NAME
  echo "Rede $NETWORK_NAME removida com sucesso."
else
  echo "Rede $NETWORK_NAME não encontrada."
fi


# docker volume prune -f

echo "Todos os serviços foram parados, volumes removidos e rede protocol apagada."
