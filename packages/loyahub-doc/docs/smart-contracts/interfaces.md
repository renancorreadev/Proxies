---
sidebar_position: 2
---

# API - Interfaces

This section provides detailed documentation for the key interfaces in the **Customer Rewards Smart Contracts** protocol. These interfaces define the functions, events, and data structures used to enable seamless interaction between different parts of the system.

---

## ICustomerManagementCore

Interface responsible for managing core customer operations, including verification of client existence and data retrieval.

### Functions

#### isClientExists

```solidity
function isClientExists(uint256 clientId) external view returns (bool)
```

Checks if a client with the given ID exists.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `clientId` | uint256 | The unique ID of the client. |

**Returns:**  
- `bool`: True if the client exists, false otherwise.

#### getClientData

```solidity
function getClientData(uint256 clientId) external view returns (ClientData memory)
```

Retrieves the data of a specific client.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `clientId` | uint256 | The unique ID of the client. |

**Returns:**  
- `ClientData`: Struct containing all relevant information about the client.

---

## ICustomerManagementStorage

This interface defines the data structures and events used to manage and store customer information on-chain.

### Structs

#### AddressLocal

Represents a customer's address information.

| Field | Type | Description |
| ----- | ---- | ----------- |
| `City` | string | City name. |
| `Street` | string | Street name. |
| `PostalCode` | uint | Postal code of the address. |
| `HouseNumber` | uint | House number. |

#### ClientData

Stores all relevant information about a client.

| Field | Type | Description |
| ----- | ---- | ----------- |
| `clientId` | uint256 | Unique ID of the client. |
| `name` | string | Name of the client. |
| `age` | uint | Age of the client. |
| `WalletAddress` | address | Wallet address of the client. |
| `paymentStatus` | PaymentStatus | Payment status of the client. |
| `addressLocal` | AddressLocal | Address information of the client. |

### Events

#### ClientRegistered

```solidity
event ClientRegistered(uint256 indexed clientId, string name, uint256 age)
```

Emitted when a new client is registered.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `clientId` | uint256 | The ID of the registered client. |
| `name` | string | Name of the registered client. |
| `age` | uint256 | Age of the registered client. |

---

## IPointCore

Manages loyalty points and reward levels for customers. Defines events related to minting, burning, and updating points.

### Events

#### CustomerTitaniumMinted

```solidity
event CustomerTitaniumMinted(uint256 indexed clientId, address clientAddress)
```

Emitted when a Titanium badge is minted for a customer.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `clientId` | uint256 | The ID of the customer receiving the badge. |
| `clientAddress` | address | The wallet address of the customer. |

#### ClientPointsChanged

```solidity
event ClientPointsChanged(uint256 indexed clientId, uint256 newPoints)
```

Emitted when a customer's points are updated.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `clientId` | uint256 | The ID of the customer. |
| `newPoints` | uint256 | The new points value. |

---

## Purpose of Interfaces

Interfaces provide a standardized way for smart contracts to communicate. They ensure:
- **Consistency**: Enforce the use of standard functions and data structures.
- **Interoperability**: Allow seamless interaction between different components.
- **Modularity**: Make the protocol easier to upgrade and maintain.

This structured documentation provides developers with a clear understanding of the interfaces and their functions, promoting effective use and integration within the system.
