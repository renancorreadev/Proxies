---
sidebar_position: 3
---


# Subgraph for DREX 

This section details the **DREX** subgraph created for the project. The subgraph indexes ERC20 token transactions and provides a GraphQL API for querying transaction histories. 

---

## **1. Purpose of the DREX Subgraph**

The **DREX subgraph** was created to:
- Monitor all transactions related to the **DREX ERC20 token**.
- Provide historical transaction data.
- Track changes in execution status on the blockchain.
- Enable future queries for blockchain data such as the execution history of smart contracts.

This subgraph plays a crucial role in two key components of the project:
1. **Wallet Application**: The subgraph is integrated with the wallet app to monitor real-time token transfers and balances.
2. **Transaction Monitoring**: It serves as a tool for tracking and reporting all DREX-related transactions on the blockchain.

---

## **2. Queries Example**

Below is an example query to retrieve the first five DREX token transfers:

```bash
curl -X POST http://localhost:8000/subgraphs/name/drex \
 -H "Content-Type: application/json" \
 --data '{ "query": "{ transfers(first: 5) { id from to value } }" }'
```

The result will include the transfer details such as:
- **ID** of the transfer
- **Sender** address
- **Receiver** address
- **Amount transferred**

---

## **3. Deploying the DREX Subgraph**

The following commands were used to initialize, create, and deploy the DREX subgraph:

### **1. Initialize the Subgraph:**
```bash
graph init --studio drex \
   --from-contract 0x640c974A4d1cF06d9b0c15669c50eE1D62fA7C14 \
   --network private \
   --node http://localhost:8020/ \
   --abi ./abi/Drex.json \
   --allow-simple-name
```

### **2. Create the Subgraph:**
```bash
graph create --node http://localhost:8020/ drex
```

### **3. Deploy the Subgraph:**
```bash
graph deploy \
   --node http://localhost:8020/ \
   --ipfs http://localhost:5001/ \
   drex
```

---

## **4. Integrating with the Wallet Application**

The DREX subgraph powers the **wallet application** by:
- Providing up-to-date token balances.
- Tracking token transfers in real-time.
- Enabling users to view their transaction history through GraphQL queries.

---

## **5. Future Use Cases**

In addition to transaction monitoring, the DREX subgraph can be expanded to:
- Track **contract executions** and **status changes**.
- Provide detailed reports on blockchain events relevant to DREX.

This flexibility allows the subgraph to evolve with the project’s needs, offering a reliable way to query blockchain data efficiently.

---

The DREX subgraph ensures that all key information about the ERC20 token is easily accessible and provides a powerful interface for interacting with blockchain data in real-time.
