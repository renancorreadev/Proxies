---
sidebar_position: 4
---

# Metadata Endpoints

## Introduction

The **Metadata** endpoints allow the management of metadata associated with NFTs on the blockchain. These endpoints enable creating, retrieving, updating, and deleting metadata entries, essential for maintaining the integrity and accuracy of digital assets.

## Endpoints and Usage

### 1. Register New Metadata

**POST** `/api/v1/metadata/new`  
Registers a new metadata entry associated with a token ID.

#### Curl Request

```bash
curl -X POST https://api.loyahub.com/api/v1/metadata/new \
  -H "Content-Type: application/json" \
  -d '{
    "tokenId": "abc123",
    "name": "Loyalty Badge",
    "attributes": {
      "rarity": "rare",
      "pointsValue": 1000
    }
  }'
```

**Example Response:**

```json
{
  "message": "Metadata registered successfully",
}
```

### 2. Retrieve Metadata by Token ID

**GET** `/api/v1/metadata/{tokenId}`  
Fetches the metadata associated with a specific token ID.

#### Curl Request

```bash
curl -X GET https://api.loyahub.com/api/v1/metadata/abc123
```

**Example Response:**

```json
{
  "tokenID": 1,
  "customer": "Nome do cliente",
  "description": "Descrição do nível do cliente",
  "image": "https://meusite.com/imagens/nft/1.png",
  "insight": "Insígnia do cliente",
  "attributes": {
    "level": 1,
    "points": 240,
    "benefits": [
      {
        "level_type": "Nível",
        "value": 1
      },
      {
        "nft_type": "NFT",
        "value": "CUSTOMER_TITANIUM"
      },
      {
        "benefit_type": "Benefits",
        "value": [
          {
            "discount": "20%",
            "description": "Desconto de 20% em todos os produtos."
          },
          {
            "freeFrete": "Frete GRATIS",
            "description": "Frete GRATIS no seu estado."
          },
          {
            "promotionLevel": "Promoção nivel 1",
            "description": "Com esse benefício você tem acesso ao nível 1 do catálogo de promoção"
          }
        ]
      }
    ]
  }
}
```

### 3. Update Metadata by Token ID

**PATCH** `/api/v1/metadata/{tokenId}`  
Updates an existing metadata entry by its token ID.

#### Curl Request

```bash
curl -X PATCH https://api.loyahub.com/api/v1/metadata/abc123 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Loyalty Badge",
    "attributes": {
      "rarity": "legendary",
      "pointsValue": 2000
    }
  }'
```

**Example Response:**

```json
{
  "message": "Metadata updated successfully",
  "tokenId": "abc123"
}
```

### 4. Delete Metadata by Token ID

**DELETE** `/api/v1/metadata/{tokenId}`  
Deletes the metadata entry associated with a given token ID.

#### Curl Request

```bash
curl -X DELETE https://api.loyahub.com/api/v1/metadata/abc123
```

**Example Response:**

```json
{
  "message": "Metadata deleted successfully",
  "tokenId": "abc123"
}
```

## Conclusion

The **Metadata** endpoints provide the necessary tools for managing metadata tied to NFTs, ensuring digital assets are accurately represented and easy to manage across the **Loyahub** ecosystem.
