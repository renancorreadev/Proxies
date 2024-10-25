---
sidebar_position: 2
---

# Setup

This document provides a comprehensive guide on setting up **Vault**, initializing it, generating keys, and configuring access and secrets.

---

## **1. Starting the Vault Service**

Before proceeding, ensure the external network named `protocol` is created. To start the Vault container, run the following command:

```bash
docker-compose up -d
```

Once the container is up, Vault will be accessible at **localhost:8200**.

---

## **2. Accessing the Vault Container**

To interact with the Vault container, execute the following command to open a shell session within it:

```bash
docker exec -it vault /bin/sh
```

---

## **3. Configuring the Vault Environment**

Inside the container, set the necessary environment variables:

```sh
export VAULT_ADDR='http://127.0.0.1:8200'
export VAULT_TOKEN=<TOKEN>
```

Replace `<TOKEN>` with the generated token you receive after initialization.

---

## **4. Initializing Vault and Generating Keys**

To secure Vault, it must be initialized. This process generates multiple **unseal keys** and an **initial root token**:

```bash
vault operator init
```

The output will contain:
- **Unseal Keys**: A set of keys needed to unlock Vault after a restart.
- **Initial Root Token**: Used for administrative access.

### **Important**:
- Save the unseal keys and root token securely. They are required to unlock the Vault.

---

## **5. Unsealing Vault**

Vault requires unsealing after each start. Use the unseal keys generated during initialization. You need to enter at least **three unseal keys** (depending on the configuration) to unlock Vault:

```bash
vault operator unseal <UNSEAL_KEY_1>
vault operator unseal <UNSEAL_KEY_2>
vault operator unseal <UNSEAL_KEY_3>
```

---

## **6. Logging into Vault**

Use the initial root token to log in to Vault:

```bash
vault login
```

---

## **7. Enabling a Secrets Engine**

Vault supports various secrets engines. To enable a KV secrets engine at the path `users/kv`, run:

```bash
vault secrets enable -path=users/kv kv
```

---

## **8. Docker Compose Configuration for Vault**

Below is the `docker-compose` configuration for Vault:

```yaml
services:
  vault:
    image: hashicorp/vault:latest
    container_name: vault
    volumes:
      - ./data/vault_data:/vault/data
      - ./data/vault-config.json:/vault/config/config.json:ro
    environment:
      - VAULT_ADDR=http://0.0.0.0:8200
    ports:
      - "8200:8200"
    cap_add:
      - IPC_LOCK
    entrypoint: vault server -config=/vault/config/config.json
    networks:
      protocol:

volumes:
  vault_data:
    driver: local

networks:
  protocol:
    external: true
```

---

## **9. Purpose of Vault in the Project**

Vault is used to securely store:
- **Secrets** related to the project (e.g., API keys, credentials).
- **Private keys** for clients' wallets in the ecosystem.

Vault ensures sensitive data is encrypted and accessible only through controlled policies and tokens.

---

## **10. Configuring Vault for Multiple Unseal Keys**

During initialization, Vault can be configured to require multiple keys for unsealing. This is part of the **Shamir's Secret Sharing** technique, which distributes the unseal keys among trusted parties. This configuration ensures that no single person can unlock Vault alone.

---

## **11. Restarting Vault**

If Vault is restarted, it must be unsealed again using the required number of unseal keys. Make sure to have the keys securely stored to avoid data loss.

---

## **12. Troubleshooting**

- **Issue**: Vault does not start or is inaccessible.
  - **Solution**: Check if the Docker network `protocol` exists and recreate it if necessary.
  
- **Issue**: Vault fails to unseal.
  - **Solution**: Verify the unseal keys are correct and in the right order.

---

For more details, refer to the [official Vault documentation](https://www.vaultproject.io/docs).

