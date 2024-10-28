---
sidebar_position: 1
---

# Overview

## Introduction

The **Loyahub API** is part of the **Loyahub ecosystem**, designed to offer a robust service for customer and rewards management based on blockchain technology.  
This API provides integration for various applications, such as:

- **Admin UI:** Administrative interface for monitoring and control.
- **Web app:** Allows customers to track their points balance and NFTs.
- **Wallet app:** Integration for managing digital assets and secure authentication.

### Infrastruture 
![API Infrastructure](https://github.com/renancorreadev/customer-rewards-blockchain/blob/develop/docs/images/API_Infra.png?raw=true)


The API follows the **Hexagonal Architecture** model, promoting higher modularity through the use of `Ports` and `Adapters`. This structure simplifies maintenance and future expansions, ensuring flexibility and decoupling of essential modules.


![Hexagonal Architecture](https://miro.medium.com/v2/resize:fit:1400/0*DA-VUfJf4h2eVPN-)


## Technologies Used
- **Blockchain:** Ethereum-compatible via Besu.
- **Keycloak:** Authentication management.
- **Redis & MinIO:** Support for caching and storage.
- **NestJS:** Backend framework for building REST services.
- **Docker:** Containerization and isolated environment.
- **Swagger:** API documentation.
- **Jest:** Testing framework.
- **ESLint:** Code quality and consistency.
- **Prettier:** Code formatting.
- **TheGraph:** GraphQL API for querying blockchain data.

## Dependency Inversion

The Loyahub API utilizes the principle of Dependency Inversion, which is a key aspect of the SOLID principles in software design. This is implemented through the use of Dependency Injection, a technique where the dependencies of a class are "injected" from the outside rather than being created within the class itself.

In our project, we use NestJS's powerful Dependency Injection container to manage these dependencies. The `AppModule` serves as the root module where all dependencies are declared and configured.

Key aspects of our Dependency Inversion implementation:

1. **Token-based Injection**: We use tokens defined in `DependencyInjectionTokens` enum to uniquely identify our dependencies. This allows for more flexible and maintainable dependency management.

2. **Interface-based Programming**: Dependencies are typically defined as interfaces (or abstract classes), allowing for easy substitution of implementations.

3. **Provider Configuration**: In the `AppModule`, we configure providers for each dependency. This is where we specify which concrete implementation should be used for each interface or token.

4. **Modular Structure**: Dependencies are organized into modules (like Blockchain, Authentication, Metadata, etc.), promoting a clean and scalable architecture.

5. **External Service Integration**: Services like Redis and database connections are also configured as injectable dependencies, allowing for easy mocking in tests and flexibility in changing implementations.

This approach allows us to adhere to the Dependency Inversion Principle, where high-level modules do not depend on low-level modules, but both depend on abstractions. It provides several benefits:

- Improved testability through easy mocking of dependencies
- Enhanced flexibility to swap implementations without changing the dependent code
- Better separation of concerns and modular design

By leveraging NestJS's dependency injection system and following these principles, we create a more maintainable, scalable, and loosely coupled architecture for the Loyahub API.

## Project Structure

```plaintext
📁 loyahub-api
├── 📁 src
│   ├── 📁 modules
│   │   ├── 📁 Blockchain
│   │   ├── 📁 Authentication
│   │   ├── 📁 Metadata
│   │   └── 📁 User
│   └── main.ts
└── 📁 test
```

## Target Audience and Use Cases

### Target Audience:
- **Developers**: Integration with other blockchain platforms.
- **Administrators**: Monitoring and control of rewards.
- **End Users**: Management of points and assets in digital wallets.

### Use Cases:
- **Mobile App**: Query points and NFTs.
- **Admin Dashboard**: Real-time monitoring and point management.
- **Wallet App**: Access to digital assets and secure integration.

This API is essential to ensure that all components of the Loyahub ecosystem work seamlessly together, utilizing endpoints to query and manipulate blockchain data, and manage users and metadata.
