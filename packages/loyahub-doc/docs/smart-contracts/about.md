---
sidebar_position: 1
---

# Overview

The **Customer Rewards Smart Contracts** protocol is designed to manage customer interactions, points, and token-based rewards on the blockchain. This set of smart contracts facilitates the storage of customer data, management of loyalty points, and minting of badges through an ERC1155 token contract.

## Problem Solved

This protocol offers a solution for:
- **Customer Data Management**: Stores and manages client information on the blockchain.
- **Loyalty Points System**: Tracks and updates points associated with each customer.
- **Tokenized Badges**: Uses ERC1155 tokens to represent customer levels and achievements.

## Connections and Hierarchy

The architecture follows a modular approach with key components interconnected through:
- **Interfaces**: Define the contract interactions.
- **Storage Contracts**: Handle data persistence.
- **Token Contracts**: Manage token issuance for loyalty programs.

### **Project Folder Structure**

```
/smart-contracts
├── contracts
│   ├── interfaces
│   │   └── ICustomerManagementCore.sol
│   │   └── ICustomerManagementStorage.sol
│   │   └── IPointCore.sol
│   ├── storage
│   │   └── CustomerManagementStorage.sol
│   │   └── PointStorage.sol
│   ├── token
│   │   └── BadgeToken.sol
│   ├── CustomerManagementCore.sol
│   ├── PointCore.sol
└── scripts
    ├── deploy.ts
    ├── deployPointsCore.ts
    ├── upgradeProxyClientCore.ts
    └── upgreadeProxtPointsCore.ts
```

## Hexagonal Architecture

The protocol employs a **hexagonal architecture** for smart contract development, emphasizing:
- **Separation of Concerns**: Each contract has a distinct role, such as storage, logic, or tokenization.
- **Interchangeable Modules**: The modular nature allows easy upgrades and reusability.
- **Clear Interfaces**: Facilitates communication between different modules, ensuring robustness and maintainability.

---

This architecture ensures that the smart contracts are scalable, easy to maintain, and aligned with blockchain best practices.
