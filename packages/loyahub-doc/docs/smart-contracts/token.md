---
sidebar_position: 4
---

# API - Token Contract 

The **BadgeToken** contract implements the ERC1155 token standard and is used to represent loyalty badges for customers. These badges indicate different reward levels, such as **Premium**, **Gold**, and **Titanium**, based on the number of points a customer has accumulated.

---

## BadgeToken Contract

This contract handles the minting and burning of badges, ensuring that customers are rewarded appropriately for their loyalty level.

### Constants

| Name              | Type    | Value | Description                      |
| ----------------- | ------- | ----- | -------------------------------- |
| CUSTOMER_PREMIUM  | uint256 | 1     | Represents the Premium badge (200 points). |
| CUSTOMER_GOLD     | uint256 | 2     | Represents the Gold badge (500 points). |
| CUSTOMER_TITANIUM | uint256 | 3     | Represents the Titanium badge (1000 points). |

---

### Functions

#### `mint`

```solidity
function mint(address account, uint256 nftId, uint256 amount) public onlyOwner
```

Mints a new badge token for the specified account.

| Parameter | Type    | Description                               |
| --------- | ------- | ----------------------------------------- |
| account   | address | The address to receive the minted token.  |
| nftId     | uint256 | The ID of the badge (1 for Premium, 2 for Gold, 3 for Titanium). |
| amount    | uint256 | The number of tokens to mint.             |

- **Access Control**: Only the owner of the contract can mint tokens.
- **Validation**: Ensures that the `nftId` is valid.

---

#### `burnToken`

```solidity
function burnToken(address account, uint256 id, uint256 amount) public onlyOwner
```

Burns a specified number of tokens from an account.

| Parameter | Type    | Description                               |
| --------- | ------- | ----------------------------------------- |
| account   | address | The address from which to burn tokens.    |
| id        | uint256 | The ID of the token to burn.              |
| amount    | uint256 | The number of tokens to burn.             |

- **Access Control**: Only the owner can burn tokens.
- **Validation**: Ensures the account has enough tokens to burn.

---

#### `_authorizeUpgrade`

```solidity
function _authorizeUpgrade(address newImplementation) internal override onlyOwner
```

Handles the upgrade logic for the contract, ensuring only the owner can authorize upgrades.

| Parameter | Type    | Description                      |
| --------- | ------- | -------------------------------- |
| newImplementation | address | The address of the new contract implementation. |

---

## Purpose

The **BadgeToken** contract serves as:
- **Loyalty System**: Customers receive badges based on their loyalty points.
- **ERC1155 Standard Compliance**: Allows efficient minting and management of multiple token types.
- **Upgradeable**: Supports upgrades using the UUPS pattern for future improvements.

---

By using the **BadgeToken** contract, the protocol ensures that customer loyalty is recognized and rewarded with blockchain-based tokens.
