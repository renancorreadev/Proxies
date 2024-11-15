# Customer Rewards Smart Contracts

Os contratos inteligentes do projeto consiste nessa estrutura de pastas:

```
/smart-contracts
├── contracts
│   ├── interfaces
│   │   └── ICustomerManagementCore.sol
│   │   └── ICustomerManagementStorage.sol
│   │   └── IPointCore.sol
│   ├── storage
│   │   └── CustomerManagementStorage.sol
│   │   └── PointStorage.sol
│   ├── token
│   │   └── BadgeToken.sol
│   ├── CustomerManagementCore.sol
|   ├── PointCore.sol

```

Codigos:

packages/smart-contracts/contracts/interfaces/ICustomerManagementCore.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ICustomerManagementStorage} from "./ICustomerManagementStorage.sol";

interface ICustomerManagementCore {
    function isClientExists(uint256 clientId) external view returns (bool);

    function getClientData(
        uint256 clientId
    ) external view returns (ICustomerManagementStorage.ClientData memory);
}

```

packages/smart-contracts/contracts/interfaces/ICustomerManagementStorage.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ICustomerManagementStorage {
    enum PaymentStatus {
        NOT_PAID,
        PAID
    }

    struct AddressLocal {
        string City;
        string Street;
        uint PostalCode;
        uint HouseNumber;
    }

    struct ClientData {
        uint256 clientId;
        string name;
        uint age;
        address walletAddress;
        PaymentStatus paymentStatus;
        AddressLocal addressLocal;
    }

    struct ClientDataInput {
        string name;
        uint age;
        address walletAddress;
        PaymentStatus paymentStatus;
        AddressLocal addressLocal;
    }

    event ClientRegistered(uint256 indexed clientId, string name, uint256 age);
}

```

packages/smart-contracts/contracts/interfaces/IPointCore.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IPointCore {
    /// @dev events Minted ommited from this contract
    event CustomerTitaniumMinted(
        uint256 indexed clientId,
        address clientAddress
    );
    event CustomerGoldMinted(uint256 indexed clientId, address clientAddress);
    event CustomerPremiumMinted(
        uint256 indexed clientId,
        address clientAddress
    );

    /// @dev events Burned ommited from this contract
    event CustomerTitaniumBurned(
        uint256 indexed clientId,
        address clientAddress
    );
    event CustomerGoldBurned(uint256 indexed clientId, address clientAddress);
    event CustomerPremiumBurned(
        uint256 indexed clientId,
        address clientAddress
    );

    /// @dev events points
    event ClientPointsChanged(uint256 indexed clientId, uint256 newPoints);
    event ClientPointsReset(uint256 indexed clientId);
}

```

packages/smart-contracts/contracts/storage/CustomerManagementStorage.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ICustomerManagementStorage} from '../interfaces/ICustomerManagementStorage.sol';

abstract contract CustomerManagementStorage is ICustomerManagementStorage {
    /// @dev global variables for client Storage
    uint256 public currentId;

    mapping(uint256 => ClientData) internal clientMappingStorage;
    mapping(string => uint256[]) internal clientsByName;
    mapping(address => uint256[]) internal clientsByAddress;
    mapping(uint256 => uint256[]) internal clientsByAge;

    mapping(address => bool) internal walletAddressExists;

    mapping(address => uint256) public userTokenIDs;

    function __ClientStorageInit() internal {
        currentId = 0;
    }
}

```

packages/smart-contracts/contracts/storage/PointStorage.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

abstract contract PointStorage {
    // Mapeamento do cliente para o nível do NFS
    mapping(uint256 => uint256) public clientLevel;
    mapping(uint256 => uint) internal clientPoints;

    error InsufficientPoints(uint256 available, uint256 required);
    error InvalidClientID(uint256 clientId);

    event PointsAdded(uint256 indexed clientId, uint points);
    event PointsRemoved(uint256 indexed clientId, uint points);
}

```

packages/smart-contracts/contracts/token/BadgeToken.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC1155Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol';
import {Initializable} from '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import {UUPSUpgradeable} from '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';
import {OwnableUpgradeable} from '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

contract BadgeToken is
    Initializable,
    ERC1155Upgradeable,
    UUPSUpgradeable,
    OwnableUpgradeable
{
    // ERC721 - CUSTOMER_PREMIUM
    // ERC721 - CUSTOMER_GOLD
    // ERC721 - CUSTOMER_TITANIUM
    uint256 public constant CUSTOMER_PREMIUM = 1; // 200 PONTOS
    uint256 public constant CUSTOMER_GOLD = 2; // 500 PONTOS
    uint256 public constant CUSTOMER_TITANIUM = 3; // 1000 PONTOS

    function mint(
        address account,
        uint256 nftId,
        uint256 amount
    ) public onlyOwner {
        require(
            nftId == CUSTOMER_PREMIUM ||
                nftId == CUSTOMER_GOLD ||
                nftId == CUSTOMER_TITANIUM,
            'Invalid badge nftId id'
        );

        _mint(account, nftId, amount, '');
    }

    function burnToken(
        address account,
        uint256 id,
        uint256 amount
    ) public onlyOwner {
        uint256 currentBalance = balanceOf(account, id);
        require(currentBalance >= amount, 'Insufficient balance to burn');

        _burn(account, id, amount);
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}

```

packages/smart-contracts/contracts/CustomerManagementCore.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Open Zeppelin libraries for controlling upgradability and access.
import {Initializable} from '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import {UUPSUpgradeable} from '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';
import {OwnableUpgradeable} from '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

import {CustomerManagementStorage} from './storage/CustomerManagementStorage.sol';
import {ICustomerManagementCore} from './interfaces/ICustomerManagementCore.sol';

contract CustomerManagementCore is
    Initializable,
    UUPSUpgradeable,
    OwnableUpgradeable,
    CustomerManagementStorage,
    ICustomerManagementCore
{
    function initialize() external initializer {
        __ClientStorageInit();
        ///@dev as there is no constructor, we need to initialise the OwnableUpgradeable explicitly
        __Ownable_init(msg.sender);
    }

    modifier clientNotExists(uint256 clientId) {
        if (!isClientExists(clientId)) {
            revert ClientExists(clientId);
        }
        _;
    }

    ///@dev required by the OZ UUPS module
    function _authorizeUpgrade(address) internal override onlyOwner {}

    function registerClient(ClientDataInput calldata newClient) external {
        _registerClient(newClient);
    }

    /// @dev setters storages to client data
    function _registerClient(ClientDataInput calldata newClient) internal {
        checkValidPaymentStatus(newClient.paymentStatus);
        checkClientDataIsEmpty(newClient);
        checkClientExistsByWallet(newClient.walletAddress);

        uint256 nextId = getNextId();

        /// @dev use clientID (nextID) to register tokenID
        userTokenIDs[newClient.walletAddress] = nextId;

        AddressLocal memory newAddressLocal = AddressLocal({
            City: newClient.addressLocal.City,
            Street: newClient.addressLocal.Street,
            PostalCode: newClient.addressLocal.PostalCode,
            HouseNumber: newClient.addressLocal.HouseNumber
        });

        ClientData memory newClientData = ClientData({
            clientId: nextId,
            name: newClient.name,
            age: newClient.age,
            walletAddress: newClient.walletAddress,
            paymentStatus: newClient.paymentStatus,
            addressLocal: newAddressLocal
        });

        clientMappingStorage[nextId] = newClientData;

        walletAddressExists[newClient.walletAddress] = true;

        clientsByName[newClient.name].push(nextId);

        clientsByAddress[newClient.walletAddress].push(nextId);

        clientsByAge[newClient.age].push(nextId);

        emit ClientRegistered(nextId, newClient.name, newClient.age);
    }

    /// @dev getters storage to client data
    function getClientData(
        uint256 clientId
    )
        public
        view
        override
        clientNotExists(clientId)
        returns (ClientData memory)
    {
        return clientMappingStorage[clientId];
    }

    function getClientwalletAddress(
        uint256 clientId
    ) public view clientNotExists(clientId) returns (address) {
        return clientMappingStorage[clientId].walletAddress;
    }

    function getClientsByName(
        string memory name
    ) public view returns (ClientData memory) {
        uint clientId = clientsByName[name][0];

        ClientData memory clientData = clientMappingStorage[clientId];
        return clientData;
    }

    function getUserTokenID(address userAddress) public view returns (uint256) {
        return userTokenIDs[userAddress];
    }

    function getClientsByAddress(
        address clientAddress
    ) public view returns (ClientData memory) {
        uint clientId = clientsByAddress[clientAddress][0];

        ClientData memory clientData = clientMappingStorage[clientId];
        return clientData;
    }

    function getClientsByAge(
        uint256 age
    ) public view returns (ClientData memory) {
        uint clientId = clientsByAge[age][0];

        ClientData memory clientData = clientMappingStorage[clientId];
        return clientData;
    }

    function getClientName(
        uint256 clientId
    ) public view clientNotExists(clientId) returns (string memory) {
        return clientMappingStorage[clientId].name;
    }

    function getNextId() private returns (uint256) {
        return ++currentId;
    }

    error InvalidClientID(uint256 clientId);

    function isClientExists(
        uint256 clientId
    ) public view override returns (bool) {
        return bytes(clientMappingStorage[clientId].name).length > 0;
    }

    error ClientExists(uint256 clientId);

    function checkClientExists(uint256 clientId) private view {
        if (isClientExists(clientId)) {
            revert ClientExists(clientId);
        }
    }

    error InvalidPaymentStatus(PaymentStatus status);

    function checkValidPaymentStatus(PaymentStatus status) private pure {
        if (status != PaymentStatus.NOT_PAID && status != PaymentStatus.PAID) {
            revert InvalidPaymentStatus(status);
        }
    }

    error EmptyParameter(string message);

    function checkClientDataIsEmpty(
        ClientDataInput calldata newClient
    ) private pure {
        if (bytes(newClient.name).length == 0) {
            revert EmptyParameter('It cannot be empty name');
        }
        if (newClient.age == 0) {
            revert EmptyParameter('It cannot be empty age');
        }
        if (newClient.walletAddress == address(0)) {
            revert EmptyParameter('It cannot be empty walletAddress');
        }
        checkAddressLocal(newClient.addressLocal);
    }

    function checkAddressLocal(
        AddressLocal calldata addressLocal
    ) private pure {
        if (bytes(addressLocal.City).length == 0) {
            revert EmptyParameter('It cannot be empty City');
        }
        if (bytes(addressLocal.Street).length == 0) {
            revert EmptyParameter('It cannot be empty Street');
        }
        if (addressLocal.PostalCode == 0) {
            revert EmptyParameter('It cannot be empty PostalCode');
        }
        if (addressLocal.HouseNumber == 0) {
            revert EmptyParameter('It cannot be empty HouseNumber');
        }
    }

    error ClientAlreadyExists(address walletAddress);

    function checkClientExistsByWallet(address walletAddress) private view {
        if (walletAddressExists[walletAddress]) {
            revert ClientAlreadyExists(walletAddress);
        }
    }

    function getVersion() external pure returns (string memory) {
        return '1.4';
    }
}

```

packages/smart-contracts/contracts/PointCore.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {PointStorage} from './storage/PointStorage.sol';
import {BadgeToken} from './token/BadgeToken.sol';

// Open Zeppelin libraries for controlling upgradability and access.
import {Initializable} from '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import {OwnableUpgradeable} from '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import {UUPSUpgradeable} from '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';
import {Strings} from '@openzeppelin/contracts/utils/Strings.sol';

import {CustomerManagementCore} from './CustomerManagementCore.sol';
import {IPointCore} from './interfaces/IPointCore.sol';

contract PointCore is
    Initializable,
    UUPSUpgradeable,
    OwnableUpgradeable,
    IPointCore,
    PointStorage,
    BadgeToken
{
    CustomerManagementCore public customerManagerInstance;

    uint256 public pointsForPremium;
    uint256 public pointsForGold;
    uint256 public pointsForTitanium;

    string public metadataURI;

    modifier validClient(uint256 clientId) {
        require(
            customerManagerInstance.isClientExists(clientId),
            'InvalidClientID on PointCore'
        );
        _;
    }

    function initialize(
        address _customerManagerInstanceAddress,
        string memory uri
    ) public initializer {
        __Ownable_init(msg.sender);
        customerManagerInstance = CustomerManagementCore(
            _customerManagerInstanceAddress
        );
        __ERC1155_init(uri);

        setPointThresholds(200, 500, 1000);
        metadataURI = uri;
    }

    // ---------- SETTERS ----------
    /// @dev set points for each level
    function setPointThresholds(
        uint256 premium,
        uint256 gold,
        uint256 titanium
    ) public onlyOwner {
        pointsForPremium = premium;
        pointsForGold = gold;
        pointsForTitanium = titanium;
    }

    /// @dev add points
    function addPoints(
        uint256 clientId,
        uint points
    ) public onlyOwner validClient(clientId) {
        clientPoints[clientId] += points;
        updateClientLevel(clientId);

        emit PointsAdded(clientId, points);
    }

    /// @dev remove points
    function removePoints(
        uint256 clientId,
        uint points
    ) public onlyOwner validClient(clientId) {
        if (points > clientPoints[clientId])
            revert InsufficientPoints(clientPoints[clientId], points);

        clientPoints[clientId] -= points;
        emit PointsRemoved(clientId, points);
    }

    /// ---------- GETTERS ----------
    /**
     * @dev Returns the total points of a given client.
     * @param clientId The ID of the client.
     * @return Total points of the client.
     */
    function getClientPoints(
        uint256 clientId
    ) public view validClient(clientId) returns (uint) {
        return clientPoints[clientId];
    }

    function getClientLevel(
        uint256 clientId
    ) public view validClient(clientId) returns (uint) {
        return clientLevel[clientId];
    }

    function getVersion() public pure returns (string memory) {
        return '1.0.0';
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(!_exists(tokenId), 'Token ID does not exist');
        return
            string(
                abi.encodePacked(metadataURI, '/', Strings.toString(tokenId))
            );
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return customerManagerInstance.getUserTokenID(msg.sender) == tokenId;
    }

    /// ---------- INTERNAL ----------
    function updateClientLevel(uint256 clientId) internal {
        uint256 currentPoints = clientPoints[clientId];
        uint256 currentLevel = clientLevel[clientId];
        uint256 newLevel = 0;

        clientLevel[clientId] = newLevel;

        if (currentPoints >= pointsForTitanium) {
            newLevel = CUSTOMER_TITANIUM;
        } else if (currentPoints >= pointsForGold) {
            newLevel = CUSTOMER_GOLD;
        } else if (currentPoints >= pointsForPremium) {
            newLevel = CUSTOMER_PREMIUM;
        }

        address clientAddress = customerManagerInstance.getClientwalletAddress(
            clientId
        );

        if (newLevel != currentLevel) {
            burnPreviousLevelToken(clientId, clientAddress, currentLevel);
            _mint(clientAddress, newLevel, 1, '');
            emitMintEvent(clientId, newLevel);

            // if (newLevel == CUSTOMER_TITANIUM) {
            //     clientPoints[clientId] = 0;
            //     emit ClientPointsReset(clientId);
            // }
        }

        emit ClientPointsChanged(clientId, clientPoints[clientId]);
    }

    function burnPreviousLevelToken(
        uint256 clientId,
        address clientAddress,
        uint256 currentLevel
    ) internal {
        if (currentLevel != 0 && balanceOf(clientAddress, currentLevel) > 0) {
            _burn(clientAddress, currentLevel, 1);
            emitBurnEvent(clientId, currentLevel);
        }
    }

    function emitMintEvent(uint256 clientId, uint256 level) internal {
        address clientAddress = customerManagerInstance.getClientwalletAddress(
            clientId
        );
        if (level == CUSTOMER_TITANIUM) {
            emit CustomerTitaniumMinted(clientId, clientAddress);
        } else if (level == CUSTOMER_GOLD) {
            emit CustomerGoldMinted(clientId, clientAddress);
        } else if (level == CUSTOMER_PREMIUM) {
            emit CustomerPremiumMinted(clientId, clientAddress);
        }
    }

    function emitBurnEvent(uint256 clientId, uint256 burnedLevel) internal {
        address clientAddress = customerManagerInstance.getClientwalletAddress(
            clientId
        );
        if (burnedLevel == CUSTOMER_GOLD) {
            emit CustomerGoldBurned(clientId, clientAddress);
        } else if (burnedLevel == CUSTOMER_PREMIUM) {
            emit CustomerPremiumBurned(clientId, clientAddress);
        }
    }
}

```

Possuimos alguns scripts para deploy e atualizacao Proxies

```
/smart-contracts
├── scripts
│   ├── deploy.ts
│   ├── deployPointsCore.ts
│   ├── upgradeProxyClientCore.ts
│   ├── upgreadeProxtPointsCore.ts

```

packages/smart-contracts/scripts/deploy.ts

```ts
import { ethers, upgrades } from 'hardhat';
import { getImplementationAddress } from '@openzeppelin/upgrades-core';
import { JsonRpcProvider } from '@ethersproject/providers';
import fs from 'fs';

const provider = new JsonRpcProvider(process.env.JSON_RPC_URL);

async function main() {
  const contractFactory = await ethers.getContractFactory(
    process.env.CONTRACT_CLIENT_VERSION as string
  );
  const deployContract = await upgrades.deployProxy(contractFactory, [], {
    initializer: 'initialize',
  });
  await deployContract.waitForDeployment();

  const proxyAddress = await deployContract.getAddress();
  const newImplementationAddress = await getImplementationAddress(
    provider,
    proxyAddress
  );

  const data = {
    proxyAddress,
    implementationAddress: newImplementationAddress,
  };

  console.log('Proxy address :', proxyAddress);
  console.log('Implementation address :', newImplementationAddress);

  fs.writeFileSync(
    '.deployed/deploys/CustomerManagementCore.json',
    JSON.stringify(data, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/* 
{
  "proxyAddress": "0xF75bD2B5282c2B7caFA289A0565d511707B7E5D1",
  "implementationAddress": "0xd4cE30e0424Ff3D580217F5FCAf2B271Fe50375F"
}
**/
```

packages/smart-contracts/scripts/deployPointsCore.ts

```ts
import { ethers, upgrades } from 'hardhat';
import { getImplementationAddress } from '@openzeppelin/upgrades-core';
import { JsonRpcProvider } from '@ethersproject/providers';
import { proxyAddress as customerManagementAddress } from '../.deployed/deploys/CustomerManagementCore.json';
import fs from 'fs';

const provider = new JsonRpcProvider(process.env.JSON_RPC_URL);

async function main() {
  const contractFactory = await ethers.getContractFactory(
    process.env.CONTRACT_POINTS_CORE_VERSION as string
  );
  const deployContract = await upgrades.deployProxy(
    contractFactory,
    [customerManagementAddress, process.env.METADATA_PROVIDER_URL as string],
    {
      initializer: 'initialize',
    }
  );
  await deployContract.waitForDeployment();

  const proxyContractAddress = await deployContract.getAddress();
  const newImplementationAddress = await getImplementationAddress(
    provider,
    proxyContractAddress
  );

  const data = {
    proxyAddress: proxyContractAddress,
    implementationAddress: newImplementationAddress,
  };

  console.log('Proxy address:', proxyContractAddress);
  console.log('Implementation address:', newImplementationAddress);

  fs.writeFileSync(
    '.deployed/deploys/PointCore.json',
    JSON.stringify(data, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

packages/smart-contracts/scripts/upgradeProxyClientCore.ts

```ts
import { ethers, upgrades } from 'hardhat';
import { JsonRpcProvider } from '@ethersproject/providers';
import { getImplementationAddress } from '@openzeppelin/upgrades-core';
import { proxyAddress } from '../.deployed/deploys/CustomerManagementCore.json';
import fs from 'fs';

const provider = new JsonRpcProvider(process.env.JSON_RPC_URL as string);

async function main() {
  const newContractVersion = await ethers.getContractFactory(
    process.env.CONTRACT_CLIENT_VERSION as string
  );

  const upgradeContract = await upgrades.upgradeProxy(
    proxyAddress,
    newContractVersion
  );

  await upgradeContract.waitForDeployment();

  const newImplementationAddress = await getImplementationAddress(
    provider,
    proxyAddress
  );

  upgradeContract.getAddress();

  console.log(
    'Contract updated deployed to:',
    await upgradeContract.getAddress()
  );
  console.log('New implementation address:', newImplementationAddress);

  const data = {
    proxyAddress,
    implementationAddress: newImplementationAddress,
  };

  fs.writeFileSync(
    '.deployed/upgrades/CustomerManagementCore.json',
    JSON.stringify(data, null, 2)
  );
}

main();
```

packages/smart-contracts/scripts/upgreadeProxtPointsCore.ts

```ts
import { ethers, upgrades } from 'hardhat';
import { JsonRpcProvider } from '@ethersproject/providers';
import { proxyAddress } from '../.deployed/deploys/PointCore.json';
import { getImplementationAddress } from '@openzeppelin/upgrades-core';
import fs from 'fs';

const provider = new JsonRpcProvider(process.env.JSON_RPC_URL as string);

async function main() {
  const newContractVersion = await ethers.getContractFactory(
    process.env.CONTRACT_POINTS_CORE_VERSION as string
  );

  const upgradeContract = await upgrades.upgradeProxy(
    proxyAddress,
    newContractVersion
  );

  await upgradeContract.waitForDeployment();

  const newImplementationAddress = await getImplementationAddress(
    provider,
    proxyAddress
  );

  upgradeContract.getAddress();

  console.log(
    'Contract PointCore updated deployed to:',
    await upgradeContract.getAddress()
  );
  console.log(
    'New PointCore implementation address:',
    newImplementationAddress
  );

  const data = {
    proxyAddress,
    implementationAddress: newImplementationAddress,
  };

  fs.writeFileSync(
    '.deployed/upgrades/PointCore.json',
    JSON.stringify(data, null, 2)
  );
}

main();
```

hardhat.config.ts

```ts
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@openzeppelin/hardhat-upgrades';
import env from 'dotenv';
env.config();

const config: HardhatUserConfig = {
  solidity: '0.8.20',
  networks: {
    besu: {
      url: process.env.JSON_RPC_URL,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    mumbai: {
      url: process.env.POLYGON_RPC_URL,
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v6',
  },
};

export default config;
```
