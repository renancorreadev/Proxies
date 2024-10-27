---
sidebar_position: 3
---

# Endpoints de Gestão de Pontos

## Introdução

Os **endpoints de Gestão de Pontos** fornecem funcionalidades para adicionar, recuperar e gerenciar os pontos de usuários na blockchain. 
Esses endpoints são fundamentais para os sistemas **Admin UI** e **App Mobile**, permitindo o monitoramento e a modificação de pontos em tempo real.

## Endpoints e Uso

### 1. Adicionar Pontos a um Usuário

**POST** `/api/v1/points/add`  
Adiciona pontos a um usuário identificado pelo seu ID único.

#### Requisição Curl

```bash
curl -X POST https://api.loyahub.com/api/v1/points/add \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "points": 100
  }'
```

**Exemplo de Resposta:**

```json
{
  "message": "Pontos adicionados com sucesso",
  "userId": 1,
  "totalPoints": 200
}
```

### 2. Recuperar Pontos de um Usuário

**GET** `/api/v1/points/{id}`  
Recupera o total de pontos de um usuário específico pelo ID.

#### Requisição Curl

```bash
curl -X GET https://api.loyahub.com/api/v1/points/1
```

**Exemplo de Resposta:**

```json
{
  "userId": 1,
  "totalPoints": 200
}
```

### 3. Remover Pontos de um Usuário

**PATCH** `/api/v1/points/remove`  
Remove pontos do saldo total de um usuário.

#### Requisição Curl

```bash
curl -X PATCH https://api.loyahub.com/api/v1/points/remove \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "points": 50
  }'
```

**Exemplo de Resposta:**

```json
{
  "message": "Pontos removidos com sucesso",
  "userId": 1,
  "remainingPoints": 150
}
```

### 4. Obter Nível do Usuário

**GET** `/api/v1/points/level/{id}`  
Recupera o nível atual de um usuário com base no total de pontos.

#### Requisição Curl

```bash
curl -X GET https://api.loyahub.com/api/v1/points/level/1
```

**Exemplo de Resposta:**

```json
{
  "userId": 1,
  "level": "Gold"
}
```

### 5. Recuperar Todos os NFTs do Usuário

**GET** `/api/v1/points/nfts/all`  
Recupera todos os NFTs pertencentes a um usuário específico.

#### Requisição Curl

```bash
curl -X GET https://api.loyahub.com/api/v1/points/nfts/all?userId=1
```

**Exemplo de Resposta:**

```json
[
  {
    "nftId": "abc123",
    "name": "Insígnia de Fidelidade",
    "description": "Uma insígnia especial concedida pela lealdade."
  },
  {
    "nftId": "def456",
    "name": "Troféu de Conquista",
    "description": "Um troféu por conquistas notáveis."
  }
]
```

### 6. Verificar Propriedade de NFT

**GET** `/api/v1/points/nfts/simple`  
Verifica se um usuário possui um NFT específico.

#### Requisição Curl

```bash
curl -X GET "https://api.loyahub.com/api/v1/points/nfts/simple?userId=1&nftId=abc123"
```

**Exemplo de Resposta:**

```json
{
  "userId": 1,
  "nftId": "abc123",
  "ownsNFT": true
}
```

## Conclusão

Os **endpoints de Gestão de Pontos** permitem o acompanhamento e a modificação eficiente dos pontos e recompensas dos usuários no ecossistema Loyahub. 
Esses endpoints são essenciais para operações em tempo real nos sistemas **Admin UI** e **App Mobile**, garantindo a gestão integrada de programas de fidelidade e recompensas digitais.
