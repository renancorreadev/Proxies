---
sidebar_position: 3
---

# Points Endpoints

## Introduction

The **Points Management** endpoints provide functionalities to add, retrieve, and manage user points on the blockchain. 
These endpoints are crucial for the **Admin UI** and **Mobile App** systems, enabling real-time monitoring and modification of user points and rewards.

## Endpoints and Usage

### 1. Add Points to a User

**POST** `/api/v1/points/add`  
Adds points to a user identified by their unique ID.

#### Curl Request

```bash
curl -X POST https://api.loyahub.com/api/v1/points/add \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "points": 100
  }'
```

**Example Response:**

```json
{
  "message": "Points added successfully",
  "userId": 1,
  "totalPoints": 200
}
```

### 2. Retrieve User Points

**GET** `/api/v1/points/{id}`  
Retrieves the total points of a specific user by their ID.

#### Curl Request

```bash
curl -X GET https://api.loyahub.com/api/v1/points/1
```

**Example Response:**

```json
{
  "userId": 1,
  "totalPoints": 200
}
```

### 3. Remove Points from a User

**PATCH** `/api/v1/points/remove`  
Removes points from a user's total balance.

#### Curl Request

```bash
curl -X PATCH https://api.loyahub.com/api/v1/points/remove \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "points": 50
  }'
```

**Example Response:**

```json
{
  "message": "Points removed successfully",
  "userId": 1,
  "remainingPoints": 150
}
```

### 4. Get User Level

**GET** `/api/v1/points/level/{id}`  
Retrieves the current level of a user based on their total points.

#### Curl Request

```bash
curl -X GET https://api.loyahub.com/api/v1/points/level/1
```

**Example Response:**

```json
{
  "userId": 1,
  "level": "Gold"
}
```

### 5. Retrieve All User NFTs

**GET** `/api/v1/points/nfts/all`  
Fetches all NFTs owned by a specific user.

#### Curl Request

```bash
curl -X GET https://api.loyahub.com/api/v1/points/nfts/all?userId=1
```

**Example Response:**

```json
[
  {
    "nftId": "abc123",
    "name": "Loyalty Badge",
    "description": "A special badge awarded for loyalty."
  },
  {
    "nftId": "def456",
    "name": "Achievement Trophy",
    "description": "A trophy for outstanding achievements."
  }
]
```

### 6. Check for Specific NFT Ownership

**GET** `/api/v1/points/nfts/simple`  
Checks if a user owns a specific NFT.

#### Curl Request

```bash
curl -X GET "https://api.loyahub.com/api/v1/points/nfts/simple?userId=1&nftId=abc123"
```

**Example Response:**

```json
{
  "userId": 1,
  "nftId": "abc123",
  "ownsNFT": true
}
```

## Conclusion

The **Points Management** endpoints enable efficient tracking and modification of user points and rewards in the Loyahub ecosystem. These endpoints are critical for real-time operations in both the **Admin UI** and **Mobile App**, ensuring seamless management of loyalty programs and digital rewards.
