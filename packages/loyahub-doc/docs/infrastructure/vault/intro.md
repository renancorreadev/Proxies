---
sidebar_position: 1
---

# Introduction 

This document provides a guide on setting up **Vault** in a Docker environment using `docker-compose`, along with instructions for accessing and configuring the Vault service.

---

## **Accessing Vault on localhost:8200**

To interact with the Vault container, use the following command to open a shell session within the container:

```sh
docker exec -it vault /bin/sh
```

---

## **Vault in LoyaHub Project**

Vault plays a crucial role in managing secrets and sensitive information within the LoyaHub project. Here's an overview of how Vault is utilized:

### Secret Management

Vault securely stores and manages various types of secrets used across the LoyaHub infrastructure:

- **API Keys**: Secure storage for third-party service API keys.
- **Database Credentials**: Encrypted storage for database connection strings and passwords.
- **Encryption Keys**: Management of encryption keys used for data protection.

### Dynamic Secrets

Vault generates dynamic, short-lived credentials for services that require database access, reducing the risk of long-term credential exposure.

### Access Control

- **Fine-grained Policies**: Vault allows defining precise access policies, ensuring that services and users only have access to the secrets they need.
- **Audit Logging**: All secret access and modifications are logged for security auditing.

### Integration with Docker

As seen in the `docker-compose.yml` configuration, Vault is containerized and runs alongside other LoyaHub services:

- **Volume Mounting**: Vault data is persisted using Docker volumes.
- **Network Configuration**: Vault is part of the `protocol` network, allowing secure communication with other services.

### Configuration Management

The Vault setup in LoyaHub uses a JSON configuration file (`vault-config.json`) to define server settings, making it easy to version-control and modify the configuration.

### Security Considerations

- **IPC_LOCK Capability**: Added to prevent memory from being swapped to disk, enhancing security.
- **HTTPS in Production**: While the current setup uses HTTP for development, it's crucial to enable HTTPS in production environments.

### Best Practices

1. **Regular Rotation**: Implement policies for regular rotation of static secrets.
2. **Least Privilege**: Ensure each service only has access to the secrets it needs.
3. **Backup Strategy**: Regularly backup Vault data and encryption keys.
4. **Monitoring**: Set up alerts for any unauthorized access attempts or configuration changes.

By leveraging Vault, LoyaHub ensures that sensitive information is securely managed, accessed, and rotated, significantly enhancing the overall security posture of the project.
