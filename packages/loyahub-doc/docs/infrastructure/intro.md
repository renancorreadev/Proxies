---
sidebar_position: 1
---

# Infrastructure

The LoyaHub project leverages a robust and interconnected infrastructure to deliver a seamless and secure blockchain-based loyalty program. This infrastructure comprises various technologies and services, each selected for their specific strengths and contributions to the overall system.

## Overview of the Infrastructure

The infrastructure of the project consists of:

- **Hyperledger Besu**: A private blockchain network managed using the IBFT protocol.
- **Vault**: A secrets management system by HashiCorp for storing sensitive data.
- **MinIO**: An object storage system for static assets.
- **Blockchain Explorer**: A tool for visualizing blockchain data.
- **Redis**: An in-memory key-value store for caching and session management.
- **PostgreSQL**: A relational database for structured data.
- **The Graph**: A protocol for indexing and querying blockchain data.
- **Prometheus**: A monitoring system for collecting metrics.
- **Grafana**: A visualization tool for metrics and analytics.
- **Keycloak**: An authentication and authorization system.

## Connectivity and Interactions

- **Hyperledger Besu** forms the backbone of the blockchain network where all APIs and smart contracts are executed.
- **Vault** stores secrets like database credentials and private keys, accessed securely by services that require them.
- **MinIO** stores static files such as platform documents, images, and videos.
- **Blockchain Explorer** provides a visual interface to the blockchain data, allowing inspection of blocks, transactions, and smart contracts.
- **Redis** is used for caching and storing authentication cookies from Keycloak.
- **PostgreSQL** stores structured data such as users, points, and assets.
- **The Graph** indexes blockchain data and provides a GraphQL API for querying transaction history and other blockchain events.
- **Prometheus** collects metrics from various services for monitoring.
- **Grafana** visualizes the metrics collected by Prometheus, providing dashboards and alerts.
- **Keycloak** manages user authentication and authorization across the platform.

## Rationale for Technology Choices

- **Hyperledger Besu**: Chosen for its enterprise-level capabilities in managing private blockchain networks.
- **Vault**: Provides robust security for managing secrets and sensitive data.
- **MinIO**: Offers scalable and high-performance object storage compatible with S3 APIs.
- **Blockchain Explorer**: Enhances transparency by allowing users to inspect blockchain data.
- **Redis**: Improves performance through caching and efficient session management.
- **PostgreSQL**: Reliable relational database suitable for complex queries and transactions.
- **The Graph**: Simplifies access to blockchain data through efficient indexing and querying.
- **Prometheus and Grafana**: Together provide a comprehensive monitoring and visualization solution.
- **Keycloak**: Centralizes authentication and authorization, supporting various protocols and integrations.
