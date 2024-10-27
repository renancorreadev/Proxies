---
sidebar_position: 3
---


# API - Storage 

The storage contracts in the **Customer Rewards Smart Contracts** manage the data persistence of customer information and points. These contracts ensure that relevant data is securely stored on the blockchain and accessible when needed.

---

## CustomerManagementStorage

This abstract contract handles the storage of customer data, including personal information and wallet addresses.

### Variables

| Name                | Type                    | Description                              |
| ------------------- | ----------------------- | ---------------------------------------- |
| currentId           | uint256                 | Tracks the current customer ID.          |
| clientMappingStorage | mapping(uint256 => ClientData) | Maps customer IDs to their data. |
| clientsByName       | mapping(string => uint256[]) | Maps customer names to their IDs.       |
| clientsByAddress    | mapping(address => uint256[]) | Maps wallet addresses to customer IDs. |
| walletAddressExists | mapping(address => bool) | Tracks whether a wallet address is registered. |
| userTokenIDs        | mapping(address => uint256) | Associates wallet addresses with token IDs. |

---

### Functions

#### `__ClientStorageInit`

```solidity
function __ClientStorageInit() internal
```

Initializes the storage contract by setting the initial customer ID to zero.

---

## PointStorage

This abstract contract manages the storage of customer points and their associated levels.

### Variables

| Name          | Type                    | Description                                  |
| ------------- | ----------------------- | -------------------------------------------- |
| clientLevel   | mapping(uint256 => uint256) | Maps customer IDs to their loyalty levels. |
| clientPoints  | mapping(uint256 => uint) | Stores the loyalty points for each customer. |

---

### Errors

| Error Name          | Description                                |
| ------------------- | ------------------------------------------ |
| `InsufficientPoints` | Raised when a client tries to redeem more points than they have. |
| `InvalidClientID`   | Raised when the provided client ID is invalid. |

---

### Events

#### `PointsAdded`

```solidity
event PointsAdded(uint256 indexed clientId, uint points)
```

Emitted when points are added to a customer's account.

| Parameter | Type    | Description                    |
| --------- | ------- | ------------------------------ |
| clientId  | uint256 | The unique ID of the customer. |
| points    | uint    | The number of points added.    |

---

#### `PointsRemoved`

```solidity
event PointsRemoved(uint256 indexed clientId, uint points)
```

Emitted when points are removed from a customer's account.

| Parameter | Type    | Description                    |
| --------- | ------- | ------------------------------ |
| clientId  | uint256 | The unique ID of the customer. |
| points    | uint    | The number of points removed.  |

---

## Purpose

These storage contracts ensure that:
- **Data Persistence**: Customer data and points are securely stored on-chain.
- **Efficient Retrieval**: The mappings allow for quick lookups by various identifiers (name, address, ID).
- **Modularity**: Separating storage logic from business logic enables better maintainability and scalability.

---

The storage contracts form the backbone of the protocol by managing critical data efficiently.
