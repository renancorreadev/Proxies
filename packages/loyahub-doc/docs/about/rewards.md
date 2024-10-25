---
sidebar_position: 4
---

# Rewards and Loyalty Levels

At the heart of LoyaHub Blockchain is a dynamic rewards system designed to enhance customer engagement and loyalty. The platform implements a tiered rewards structure, allowing customers to progress through different levels based on their accumulated points. These levels are represented by NFTs, providing customers with unique digital assets that symbolize their status and benefits.

## Loyalty Levels

The loyalty program is divided into three primary levels:

### 1. Customer Premium

- **Points Required**: 0 - 999 points
- **Benefits**:
  - 5% discount on all purchases
  - Access to exclusive promotions
  - Free standard shipping

### 2. Customer Gold

- **Points Required**: 1,000 - 4,999 points
- **Benefits**:
  - 10% discount on all purchases
  - Priority customer support
  - Early access to new products
  - Free expedited shipping

### 3. Customer Titanium

- **Points Required**: 5,000+ points
- **Benefits**:
  - 20% discount on all purchases
  - Dedicated account manager
  - Invitations to exclusive events
  - Free international shipping

## Points Accumulation and Management

Customers earn points through various interactions and purchases. The accumulation of points is managed by smart contracts deployed on the blockchain, ensuring transparency and security. Key features include:

- **Automatic Point Allocation**: Points are automatically added to a customer's account upon eligible transactions.
- **Real-Time Updates**: The Go microservice listens to blockchain events and updates customer levels and benefits in real-time.
- **Point Deduction Mechanism**: A smart contract periodically deducts 20% of accumulated points every 30 days to encourage continuous engagement.

## Role of Smart Contracts

Smart contracts are central to the rewards system:

- **Tier Management**: Contracts define the thresholds for each loyalty level and handle the issuance of corresponding NFTs.
- **Benefits Enforcement**: Smart contracts enforce the benefits associated with each level, ensuring consistent application across the platform.
- **Automatic Upgrades**: When customers reach the required points for a new level, the smart contract automatically upgrades their status and issues a new NFT.

## Supervision by the Go Microservice

The Go-based microservice plays a crucial role in:

- **Event Listening**: Continuously monitors blockchain events related to point transactions and NFT issuances.
- **Database Synchronization**: Updates the backend database with the latest customer information, ensuring data consistency.
- **Metadata Management**: Adjusts NFT metadata to reflect the customer's current level and benefits.
- **Cron Jobs**: Executes scheduled tasks, such as the periodic deduction of points.

By combining the precision of smart contracts with the efficiency of the Go microservice, LoyaHub Blockchain offers a robust and scalable rewards system that benefits both businesses and customers.
