---
sidebar_position: 2
---

# Settings

##  The Graph - Project Setup and Configuration

This section provides a detailed overview of how The Graph was set up and configured both locally and on the cloud for the project. It also covers the database setup and Docker Compose configurations used to run the services.

---

## **1. Local Setup**

Below are the steps followed to initialize and run The Graph locally:

### **Initialize the Subgraph**

```shell
graph init --studio drex \
   --from-contract 0x640c974A4d1cF06d9b0c15669c50eE1D62fA7C14 \
   --network private \
   --node http://localhost:8020/ \
   --abi ./abi/Drex.json \
   --allow-simple-name
```

### **Create the Subgraph**

```shell
graph create --node http://localhost:8020/ drex
```

### **Deploy the Subgraph**

```shell
graph deploy \
   --node http://localhost:8020/ \
   --ipfs http://localhost:5001/ \
   drex
```

---

## **2. Cloud Deployment (Google Cloud or Other Providers)**

The steps for deploying The Graph on a cloud provider involve similar commands as the local setup. However, ensure the following services are accessible via the cloud infrastructure:

1. **Graph Node** (runs on the chosen cloud instance)
2. **IPFS Node** (used to store and query metadata)
3. **Postgres Database** (stores indexed data)

---

## **3. SQL Initialization Script**

A SQL script (`init.sql`) ensures the necessary roles and databases are available for the subgraph. Below is the content of the script:

```sql
-- Create the 'graph' role if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'graph') THEN
      CREATE ROLE graph WITH LOGIN PASSWORD 'letmein';
      ALTER ROLE graph CREATEDB;
   END IF;
END $$;

-- Create the 'graph' database if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'graph') THEN
      CREATE DATABASE graph
        WITH OWNER = graph
        ENCODING = 'UTF8'
        LC_COLLATE = 'C'
        LC_CTYPE = 'C'
        TEMPLATE = template0;
   END IF;
END $$;
```

---

## **4. Docker Compose Configuration**

The following `docker-compose` file defines the services used by the project:

```yaml
services:
  ipfs:
    container_name: ipfs
    image: ipfs/go-ipfs:v0.9.1
    ports:
      - '5001:5001'
    networks:
      - protocol

  postgres-graph:
    container_name: postgres-graph
    image: postgres:13
    environment:
      POSTGRES_USER: graph
      POSTGRES_PASSWORD: letmein
      POSTGRES_DB: graph
      POSTGRES_INITDB_ARGS: "--encoding=UTF8 --locale=C"
    ports:
      - '5433:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - protocol

  graph-node:
    container_name: graph-node
    image: graphprotocol/graph-node
    ports:
      - '8000:8000'
      - '8020:8020'
      - '8030:8030'
      - '8040:8040'
    depends_on:
      - ipfs
      - postgres-graph
    environment:
      postgres_host: postgres-graph
      postgres_user: graph
      postgres_pass: letmein
      postgres_db: graph
      ipfs: 'http://ipfs:5001'
      ethereum: 'private:http://bootnode:8545'
    networks:
      - protocol

volumes:
  pgdata:
    driver: local

networks:
  protocol:
    external: true
```

---

## **5. Starting the Services**

Use the following command to start the Docker services:

```shell
docker-compose up -d
```

Ensure all services are healthy before deploying the subgraph.

---

This setup ensures that the subgraph infrastructure is properly configured both locally and in the cloud, providing seamless access to indexed blockchain data through The Graph.
