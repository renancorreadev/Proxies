// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Open Zeppelin libraries for controlling upgradability and access.
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import {ClientStorage} from "./storage/ClientStorage.sol";
import {IClientManager} from "./interfaces/IClientManager.sol";

contract ClientManager is
    Initializable,
    UUPSUpgradeable,
    OwnableUpgradeable,
    ClientStorage,
    IClientManager
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

    function registerClient(ClientData calldata newClient) external {
        _registerClient(newClient);
    }

    /// @dev setters storages to client data
    function _registerClient(ClientData calldata newClient) internal {
        checkValidPaymentStatus(newClient.paymentStatus);
        checkClientDataIsEmpty(newClient);
        checkClientExistsByWallet(newClient.WalletAddress);

        uint256 nextId = getNextId();
        clientMappingStorage[nextId] = newClient;
        walletAddressExists[newClient.WalletAddress] = true;

        clientsByName[newClient.name].push(nextId);

        clientsByAddress[newClient.WalletAddress].push(nextId);

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

    function getClientWalletAddress(
        uint256 clientId
    ) public view clientNotExists(clientId) returns (address) {
        return clientMappingStorage[clientId].WalletAddress;
    }

    function getClientsByName(
        string memory name
    ) public view returns (ClientData memory) {
        uint clientId = clientsByName[name][0];

        ClientData memory clientData = clientMappingStorage[clientId];
        return clientData;
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
        ClientData calldata newClient
    ) private pure {
        if (bytes(newClient.name).length == 0) {
            revert EmptyParameter("It cannot be empty name");
        }
        if (newClient.age == 0) {
            revert EmptyParameter("It cannot be empty age");
        }
        if (newClient.WalletAddress == address(0)) {
            revert EmptyParameter("It cannot be empty WalletAddress");
        }
        checkAddressLocal(newClient.addressLocal);
    }

    function checkAddressLocal(
        AddressLocal calldata addressLocal
    ) private pure {
        if (bytes(addressLocal.City).length == 0) {
            revert EmptyParameter("It cannot be empty City");
        }
        if (bytes(addressLocal.Street).length == 0) {
            revert EmptyParameter("It cannot be empty Street");
        }
        if (addressLocal.PostalCode == 0) {
            revert EmptyParameter("It cannot be empty PostalCode");
        }
        if (addressLocal.HouseNumber == 0) {
            revert EmptyParameter("It cannot be empty HouseNumber");
        }
    }

    error ClientAlreadyExists(address WalletAddress);

    function checkClientExistsByWallet(address walletAddress) private view {
        if (walletAddressExists[walletAddress]) {
            revert ClientAlreadyExists(walletAddress);
        }
    }

    function getVersion() external pure returns (string memory) {
        return "1.3";
    }
}
