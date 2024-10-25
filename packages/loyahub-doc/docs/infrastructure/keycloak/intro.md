---
sidebar_position: 1
---

# Keycloak Integration in LoyaHub

## Overview

Keycloak is an open-source Identity and Access Management solution used in the LoyaHub project for robust authentication and authorization. It provides a centralized login system, supporting various protocols such as OpenID Connect, OAuth 2.0, and SAML.

## Key Components

### Keycloak Server

- **Version**: 21.1
- **Container**: Running in a Docker container
- **Port**: Accessible on port 8080
- **Admin Credentials**:
  - Username: admin
  - Password: admin

### Redis Integration

Redis is used in conjunction with Keycloak to enhance performance and manage sessions:

- **Version**: Latest
- **Purpose**: Caching and session storage
- **Port**: 6379

## Configuration

### Docker Compose Setup

Keycloak and its dependencies are configured using Docker Compose. Key configurations include:

1. **Keycloak Service**:
   - Imports realms on startup
   - Uses MySQL as the database backend
   - Enables HTTP for development (should be secured in production)

2. **MySQL Database**:
   - Stores Keycloak data
   - Configured with health checks

3. **Redis**:
   - Used for caching
   - Improves Keycloak's performance

### Realm Configuration

- **Realm Files**:
  - `master-realm.json`: Basic settings
  - `protocol-realm.json`: Authentication protocols

These files are automatically imported during container initialization.

## Integration with LoyaHub

Keycloak provides centralized authentication for various components of the LoyaHub infrastructure:

- Secures API endpoints
- Manages user sessions across services
- Integrates with frontend applications for seamless login experiences

## Best Practices

1. **Security**: Always use HTTPS in production environments
2. **Scalability**: Utilize Redis for improved performance in high-load scenarios
3. **Customization**: Tailor realms and client configurations to match LoyaHub's specific needs
4. **Monitoring**: Integrate with Prometheus and Grafana for real-time monitoring

For detailed configuration and advanced usage, refer to the official Keycloak documentation and the specific setup instructions in the LoyaHub project documentation.
