---
sidebar_position: 2
---

# IBFT Concept

### Overview

**IBFT (Istanbul Byzantine Fault Tolerance)** is a consensus algorithm based on Proof of Authority (PoA) that enables a blockchain network to reach consensus even in the presence of malicious nodes or network failures. It is designed for permissioned environments where validators are known and trusted.

### How It Works

- **Validator Nodes**: In an IBFT network, a set of validator nodes is responsible for validating and adding blocks to the blockchain.
- **Byzantine Fault Tolerance**: The algorithm can tolerate up to `(n-1)/3` malicious nodes, where `n` is the total number of validators.
- **Consensus Steps**:
  - **Proposal**: A proposer node is selected to propose a new block.
  - **Pre-prepare**: Validators receive the proposal and broadcast it to other validators.
  - **Prepare**: Validators verify the block and send prepare messages.
  - **Commit**: If a quorum is reached, validators commit the block and add it to the blockchain.


---

