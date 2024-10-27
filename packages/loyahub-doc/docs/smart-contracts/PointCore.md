---
sidebar_position: 6
---

# API - PointCore Contract 

The **PointCore** contract manages customer loyalty points and their corresponding badge levels. This contract interacts with the **CustomerManagementCore** contract to validate customers and assigns points that translate into loyalty badges, such as Premium, Gold, and Titanium. It also supports **UUPS proxy-based upgrades** for future enhancements.

---

## PointCore Contract

### State Variables

| Name                 | Type         | Description                                           |
| -------------------- | ------------ | ----------------------------------------------------- |
| `customerManagerInstance` | CustomerManagementCore | Instance of the customer management contract for client validation. |
| `pointsForPremium`   | uint256      | Minimum points required to achieve Premium level.     |
| `pointsForGold`      | uint256      | Minimum points required to achieve Gold level.        |
| `pointsForTitanium`  | uint256      | Minimum points required to achieve Titanium level.    |
| `metadataURI`        | string       | Metadata URI for the token.                           |

---

### Functions

#### `initialize`

```solidity
function initialize(address _customerManagerInstanceAddress, string memory uri) public initializer
```

Initializes the PointCore contract with the customer management instance and token metadata URI.

| Parameter                    | Type    | Description                                    |
| ---------------------------- | ------- | ---------------------------------------------- |
| _customerManagerInstanceAddress | address | Address of the customer management contract. |
| uri                          | string  | URI pointing to the token’s metadata.         |

---

#### `addPoints`

```solidity
function addPoints(uint256 clientId, uint points) public onlyOwner validClient(clientId)
```

Adds loyalty points to a client’s account.

| Parameter | Type    | Description                    |
| --------- | ------- | ------------------------------ |
| clientId  | uint256 | ID of the client receiving points. |
| points    | uint    | Number of points to add.       |

- **Access Control**: Restricted to the contract owner.
- **Validation**: Ensures the client exists before adding points.
- **Events**: Emits `PointsAdded`.

---

#### `removePoints`

```solidity
function removePoints(uint256 clientId, uint points) public onlyOwner validClient(clientId)
```

Removes loyalty points from a client’s account.

| Parameter | Type    | Description                     |
| --------- | ------- | ------------------------------- |
| clientId  | uint256 | ID of the client losing points. |
| points    | uint    | Number of points to remove.     |

- **Access Control**: Restricted to the contract owner.
- **Validation**: Ensures the client has enough points to deduct.
- **Events**: Emits `PointsRemoved`.

---

#### `getClientPoints`

```solidity
function getClientPoints(uint256 clientId) public view validClient(clientId) returns (uint)
```

Fetches the total points for a specific client.

| Parameter | Type    | Description                    |
| --------- | ------- | ------------------------------ |
| clientId  | uint256 | ID of the client.              |

**Returns**: `uint` – Total points of the client.

---

#### `getClientLevel`

```solidity
function getClientLevel(uint256 clientId) public view validClient(clientId) returns (uint)
```

Retrieves the loyalty level of a client.

| Parameter | Type    | Description                    |
| --------- | ------- | ------------------------------ |
| clientId  | uint256 | ID of the client.              |

**Returns**: `uint` – Loyalty level of the client.

---

### Internal Logic

#### `updateClientLevel`

```solidity
function updateClientLevel(uint256 clientId) internal
```

Updates the loyalty level of a client based on their accumulated points. This function mints a new badge token if the level changes and burns the previous badge.

- **Events**: Emits `CustomerTitaniumMinted`, `CustomerGoldMinted`, or `CustomerPremiumMinted` based on the new level.

---

#### `emitMintEvent`

```solidity
function emitMintEvent(uint256 clientId, uint256 level) internal
```

Emits a mint event when a new loyalty badge is assigned.

---

#### `burnPreviousLevelToken`

```solidity
function burnPreviousLevelToken(uint256 clientId, address clientAddress, uint256 currentLevel) internal
```

Burns the token of the previous loyalty level when a client’s level changes.

---

### Events

#### `PointsAdded`

```solidity
event PointsAdded(uint256 indexed clientId, uint points)
```

Emitted when points are added to a client’s account.

#### `PointsRemoved`

```solidity
event PointsRemoved(uint256 indexed clientId, uint points)
```

Emitted when points are removed from a client’s account.

---

### Purpose

The **PointCore** contract ensures that:
- **Customers are rewarded** with appropriate loyalty badges.
- **Points are accurately tracked** and updated in real-time.
- **Token minting and burning** reflect the customer's current status.

This contract plays a critical role in maintaining customer engagement by automating the loyalty system through blockchain tokens.
