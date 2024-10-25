---
sidebar_position: 3
---

# Executing Smart Contracts 

### Connecting to the Network

You can connect to the DREX network using tools like **Remix IDE**, **Web3.js**, or **ethers.js**, pointing to the RPC HTTP endpoint:

```bash
http://localhost:8545
```

### Deploying Smart Contracts

1. **Set Up the Development Environment**

   Configure your preferred tool for developing smart contracts in Solidity.

2. **Write a Simple Smart Contract**

   ```solidity
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   contract HelloWorld {
       string public message;

       constructor(string memory _message) {
           message = _message;
       }

       function setMessage(string memory _message) public {
           message = _message;
       }
   }
   ```

3. **Compile and Deploy the Contract**

   Use Remix IDE or another tool to compile and deploy the contract on the DREX network.

4. **Interact with the Contract**

   After deployment, you can call the contract functions and observe the state changes.