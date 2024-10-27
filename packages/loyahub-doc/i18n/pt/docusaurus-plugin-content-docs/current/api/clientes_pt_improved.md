---
sidebar_position: 2
---

# Endpoints de Clientes

## Introdução

Os **endpoints de Clientes** oferecem funcionalidades essenciais para criar, consultar e gerenciar dados de clientes na blockchain. 
Essas rotas permitem a obtenção de informações detalhadas com base em ID, nome, idade ou wallet blockchain. 
Elas são fundamentais para os sistemas **Admin UI** e **App Mobile**, garantindo integração eficiente.

## Endpoints e Uso

### 1. Criar um Novo Cliente

**POST** `/api/v1/client/new`  
Cria um novo cliente e retorna o ID gerado junto com os detalhes fornecidos.

#### Requisição Curl

```bash
curl -X POST https://api.loyahub.com/api/v1/client/new \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "age": 30,
    "wallet": "0x123abc..."
  }'
```

**Exemplo de Resposta:**

```json
{
  "id": 1,
  "name": "João Silva",
  "age": 30,
  "wallet": "0x123abc..."
}
```

### 2. Buscar Cliente por ID

**GET** `/api/v1/client/data/{id}`  
Recupera informações detalhadas sobre um cliente utilizando o ID único.

#### Requisição Curl

```bash
curl -X GET https://api.loyahub.com/api/v1/client/data/1
```

**Exemplo de Resposta:**

```json
{
  "id": 1,
  "name": "João Silva",
  "age": 30,
  "wallet": "0x123abc..."
}
```

### 3. Buscar Cliente por Nome

**GET** `/api/v1/client/dataByName/{name}`  
Obtém os dados de um cliente utilizando o nome.

#### Requisição Curl

```bash
curl -X GET https://api.loyahub.com/api/v1/client/dataByName/João%20Silva
```

**Exemplo de Resposta:**

```json
{
  "id": 1,
  "name": "João Silva",
  "age": 30,
  "wallet": "0x123abc..."
}
```

### 4. Buscar Cliente por Idade

**GET** `/api/v1/client/dataByAge/{age}`  
Retorna todos os clientes com uma idade específica.

#### Requisição Curl

```bash
curl -X GET https://api.loyahub.com/api/v1/client/dataByAge/30
```

**Exemplo de Resposta:**

```json
[
  {
    "id": 1,
    "name": "João Silva",
    "age": 30,
    "wallet": "0x123abc..."
  },
  {
    "id": 2,
    "name": "Maria Souza",
    "age": 30,
    "wallet": "0x456def..."
  }
]
```

### 5. Buscar Cliente por Wallet

**GET** `/api/v1/client/dataByWallet/{wallet}`  
Obtém o cliente associado a um endereço de wallet blockchain específico.

#### Requisição Curl

```bash
curl -X GET https://api.loyahub.com/api/v1/client/dataByWallet/0x123abc...
```

**Exemplo de Resposta:**

```json
{
  "id": 1,
  "name": "João Silva",
  "age": 30,
  "wallet": "0x123abc..."
}
```

### 6. Buscar Último ID de Cliente

**GET** `/api/vl/client/currentId`  
Retorna o ID mais recente de cliente gerado.

#### Requisição Curl

```bash
curl -X GET https://api.loyahub.com/api/vl/client/currentId
```

**Exemplo de Resposta:**

```json
{
  "currentId": 5
}
```

## Conclusão

Esses endpoints de clientes são fundamentais no ecossistema **Loyahub**, oferecendo recursos essenciais para a gestão de dados. 
Eles são amplamente utilizados nos sistemas **Admin UI** e **App Mobile**, permitindo uma interação eficiente com registros de clientes na blockchain.
