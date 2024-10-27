---
sidebar_position: 2
---

# Customer Endpoints

## Introduction

The **Customer** endpoints provide essential functions to create, retrieve, and manage customer data on the blockchain. 
These routes offer detailed information through various query methods, including by ID, name, age, and blockchain wallet. 
These endpoints play a crucial role in **Admin UI** and **Mobile App** systems, enabling seamless integration.

## Endpoints and Usage

### 1. Create a New Customer

**POST** `/api/v1/client/new`  
Creates a new customer and returns the generated ID along with the provided details.

#### Curl Request

```bash
curl -X POST https://api.loyahub.com/api/v1/client/new \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 30,
    "wallet": "0x123abc..."
  }'
```

**Example Response:**

```json
{
  "id": 1,
  "name": "John Doe",
  "age": 30,
  "wallet": "0x123abc..."
}
```

### 2. Get Customer by ID

**GET** `/api/v1/client/data/{id}`  
Retrieves detailed information about a customer using their unique ID.

#### Curl Request

```bash
curl -X GET https://api.loyahub.com/api/v1/client/data/1
```

**Example Response:**

```json
{
  "id": 1,
  "name": "John Doe",
  "age": 30,
  "wallet": "0x123abc..."
}
```

### 3. Get Customer by Name

**GET** `/api/v1/client/dataByName/{name}`  
Fetches a customer's data using their name.

#### Curl Request

```bash
curl -X GET https://api.loyahub.com/api/v1/client/dataByName/John%20Doe
```

**Example Response:**

```json
{
  "id": 1,
  "name": "John Doe",
  "age": 30,
  "wallet": "0x123abc..."
}
```

### 4. Get Customer by Age

**GET** `/api/v1/client/dataByAge/{age}`  
Retrieves all customers matching a specific age.

#### Curl Request

```bash
curl -X GET https://api.loyahub.com/api/v1/client/dataByAge/30
```

**Example Response:**

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "age": 30,
    "wallet": "0x123abc..."
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "age": 30,
    "wallet": "0x456def..."
  }
]
```

### 5. Get Customer by Wallet

**GET** `/api/v1/client/dataByWallet/{wallet}`  
Fetches the customer associated with a specific blockchain wallet address.

#### Curl Request

```bash
curl -X GET https://api.loyahub.com/api/v1/client/dataByWallet/0x123abc...
```

**Example Response:**

```json
{
  "id": 1,
  "name": "John Doe",
  "age": 30,
  "wallet": "0x123abc..."
}
```

### 6. Get Current Customer ID

**GET** `/api/vl/client/currentId`  
Returns the most recently generated customer ID.

#### Curl Request

```bash
curl -X GET https://api.loyahub.com/api/vl/client/currentId
```

**Example Response:**

```json
{
  "currentId": 5
}
```

## Conclusion

These customer endpoints are the backbone of the **Loyahub** ecosystem, providing essential capabilities for data management. 
They are used across various platforms, including the **Admin UI** and **Mobile App**, ensuring seamless data flow and easy interaction with blockchain-based customer records.
