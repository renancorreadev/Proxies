---
sidebar_position: 4
---

# Endpoints de Metadata

## Introdução

Os **endpoints de Metadata** permitem o gerenciamento dos metadados associados a NFTs na blockchain. 
Esses endpoints possibilitam a criação, recuperação, atualização e exclusão de entradas de metadata, essenciais para manter a integridade e a precisão dos ativos digitais.

## Endpoints e Uso

### 1. Registrar Novo Metadata

**POST** `/api/v1/metadata/new`  
Registra uma nova entrada de metadata associada a um token ID.

#### Requisição Curl

```bash
curl -X POST https://api.loyahub.com/api/v1/metadata/new \
  -H "Content-Type: application/json" \
  -d '{
    "tokenId": "abc123",
    "name": "Insígnia de Fidelidade",
    "attributes": {
      "raridade": "raro",
      "valorEmPontos": 1000
    }
  }'
```

**Exemplo de Resposta:**

```json
{
  "message": "Metadata registrado com sucesso",
  "tokenId": "abc123"
}
```

### 2. Recuperar Metadata por Token ID

**GET** `/api/v1/metadata/{tokenId}`  
Recupera o metadata associado a um token ID específico.

#### Requisição Curl

```bash
curl -X GET https://api.loyahub.com/api/v1/metadata/abc123
```

**Exemplo de Resposta:**

```json
{
  "tokenId": "abc123",
  "name": "Insígnia de Fidelidade",
  "attributes": {
    "raridade": "raro",
    "valorEmPontos": 1000
  }
}
```

### 3. Atualizar Metadata por Token ID

**PATCH** `/api/v1/metadata/{tokenId}`  
Atualiza uma entrada de metadata existente pelo token ID.

#### Requisição Curl

```bash
curl -X PATCH https://api.loyahub.com/api/v1/metadata/abc123 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Insígnia de Fidelidade Atualizada",
    "attributes": {
      "raridade": "lendário",
      "valorEmPontos": 2000
    }
  }'
```

**Exemplo de Resposta:**

```json
{
  "message": "Metadata atualizado com sucesso",
  "tokenId": "abc123"
}
```

### 4. Deletar Metadata por Token ID

**DELETE** `/api/v1/metadata/{tokenId}`  
Exclui a entrada de metadata associada a um determinado token ID.

#### Requisição Curl

```bash
curl -X DELETE https://api.loyahub.com/api/v1/metadata/abc123
```

**Exemplo de Resposta:**

```json
{
  "message": "Metadata deletado com sucesso",
  "tokenId": "abc123"
}
```

## Conclusão

Os **endpoints de Metadata** fornecem as ferramentas necessárias para o gerenciamento dos metadados vinculados a NFTs, garantindo que os ativos digitais sejam representados e administrados de forma precisa e eficiente no ecossistema **Loyahub**.
