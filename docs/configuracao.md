# Passos que precisam se executados para iniciar ambiente do zero

1. Iniciar os 10 containers docker dos serviços

2. Configurar as variaveis de ambientes dentro de packages

packages/blockchain-service/.env:

```shell
BLOCKCHAIN_NODE_RPC=http://localhost:8545
BLOCKCHAIN_NODE_WS=ws://localhost:6174
CUSTOMER_MANAGEMENT_CONTRACT_ADDRESS=<contract_address_client_core>
POINT_CORE_CONTRACT_ADDRESS=<contract_address_proxy_points>
FILE_PATH=./output/clients.json
CUSTOMER_MANAGEMENT_ABI_PATH=../smart-contracts/artifacts/contracts/CustomerManagementCore.sol/CustomerManagementCore.json
POINTS_CORE_ABI_PATH=../blockchain-service/config/PointCore.json

```

packages/customer-rewards-admin-ui/.env

```shell
VITE_CUSTOMER_API=http://localhost:3001/api/v1
VITE_NODE_ENV=development
```

packages/customer-rewards-api/.env

```shell
PORT="3001"
CONNECTION_STRING="postgres://admin:astronalta@localhost:5432/metadataDatabase"
# CONNECTION_STRING=""
CONTRACT_ADDRESS=<contract_address_client_core>
POINTS_CONTRACT_ADDRESS=<contract_address_proxy_points>
PROVIDER="http://localhost:8545"
PRIVATE_KEY="6139eb4c7a004f2c90a3233b493517b52718f7ad5fd4a82ef326351dfaced7b5"
BASE_URL=http://localhost:3001
```

packages/customer-rewards-app/.env

```shell
VITE_CUSTOMER_API=http://localhost:3001/api/v1
VITE_NODE_ENV=development
```
