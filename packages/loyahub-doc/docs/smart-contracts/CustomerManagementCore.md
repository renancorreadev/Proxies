---
sidebar_position: 5
---

# API - CustomerManagementCore  


The **CustomerManagementCore** contract handles customer management, including registration, data storage, and interaction with loyalty tokens. It integrates with **CustomerManagementStorage** to persist customer data and supports upgradability using the UUPS proxy pattern.

---

## CustomerManagementCore Contract

### Functions

#### `initialize`

```solidity
function initialize() external initializer
```

Initializes the contract and sets the contract owner. This function also initializes the customer storage.

---

#### `registerClient`

```solidity
function registerClient(ClientDataInput calldata newClient) external
```

Registers a new client with the provided data.

| Parameter   | Type                    | Description                                  |
| ----------- | ----------------------- | -------------------------------------------- |
| newClient   | ClientDataInput         | A struct containing the new client’s data.  |

- **Validation**: Checks for valid payment status, non-duplicate wallet addresses, and non-empty data.

---

#### `getClientData`

```solidity
function getClientData(uint256 clientId) public view returns (ClientData memory)
```

Retrieves the data associated with a specific client.

| Parameter | Type    | Description                    |
| --------- | ------- | ------------------------------ |
| clientId  | uint256 | The unique ID of the client.   |

**Returns**: `ClientData` – A struct containing all relevant details about the client.

---

#### `getClientsByName`

```solidity
function getClientsByName(string memory name) public view returns (ClientData memory)
```

Fetches the data of the first client matching the given name.

| Parameter | Type    | Description                  |
| --------- | ------- | ---------------------------- |
| name      | string  | The name of the client.      |

**Returns**: `ClientData` – The data of the first matching client.

---

#### `getUserTokenID`

```solidity
function getUserTokenID(address userAddress) public view returns (uint256)
```

Retrieves the token ID associated with a user’s wallet address.

| Parameter     | Type    | Description                    |
| ------------- | ------- | ------------------------------ |
| userAddress   | address | The wallet address of the user.|

**Returns**: `uint256` – The token ID linked to the user’s address.

---

### Errors

| Error Name           | Description                                |
| -------------------- | ------------------------------------------ |
| `InvalidPaymentStatus` | Raised if the payment status is invalid. |
| `ClientExists`       | Raised if the client already exists.       |
| `EmptyParameter`     | Raised if required data is missing.        |

---

### Purpose

The **CustomerManagementCore** contract serves to:
- **Manage Customer Data**: Handles all customer-related data operations.
- **Enforce Validations**: Ensures data integrity through multiple checks.
- **Interact with Tokens**: Links customers with their loyalty token IDs.

---

This contract ensures that customer data is stored securely, managed efficiently, and integrated seamlessly with the loyalty token system.
