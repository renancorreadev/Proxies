---
sidebar_position: 3
---

# Configuration

## Realm Importation

The Keycloak configuration allows for automatic import of JSON files that define the application's realms. There is a folder called `config` that contains the following files:

- **master-realm.json**: Defines the main realm with basic settings.
- **protocol-realm.json**: Defines the realm with configured authentication protocols.

These files are automatically imported during the container initialization through the following command:

```bash
start --import-realm --hostname-strict=false
```

## **Access and Administration**

- Keycloak will be accessible on **port 8080**.
- The default admin credentials are:
  - **Username:** admin
  - **Password:** admin

## **Dependencies**

- **MySQL**: Used as the database to store Keycloak information.
- **Redis**: Acts as a cache to enhance Keycloak's performance.

## **Starting the Services**

Make sure the external network named `protocol` is created before starting the environment. Use the following command to bring up the environment:

```bash
docker-compose up -d
```

Keycloak will only start once both MySQL and Redis services are healthy, thanks to the `depends_on` configuration with health conditions.

---

This is the basic guide for configuring and using Keycloak in the project. For further information, please refer to the [official Keycloak documentation](https://www.keycloak.org/documentation).
