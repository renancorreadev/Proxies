// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IClientStorage} from "../interfaces/IClientStorage.sol";

abstract contract ClientStorage is IClientStorage {
    /// @dev global variables for client Storage
    uint256 private currentId;

    mapping(uint256 => ClientData) internal clientMappingStorage;
    mapping(address => bool) private walletAddressExists;

    modifier clientNotExists(uint256 clientId) {
        if (!isClientExists(clientId)) {
            revert ClientExists(clientId);
        }
        _;
    }

    function __ClientStorageInit() internal {
        currentId = 0;
    }

    /// @dev setters storages to client data
    function _registerClient(ClientData calldata newClient) internal {
        checkValidPaymentStatus(newClient.paymentStatus);
        checkClientDataIsEmpty(newClient);
        checkClientExistsByWallet(newClient.WalletAddress);

        uint256 nextId = getNextId();
        clientMappingStorage[nextId] = newClient;
        walletAddressExists[newClient.WalletAddress] = true;

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

    function getClientName(
        uint256 clientId
    ) public view override clientNotExists(clientId) returns (string memory) {
        return clientMappingStorage[clientId].name;
    }

    function getClientAge(
        uint256 clientId
    ) public view override clientNotExists(clientId) returns (uint256) {
        return clientMappingStorage[clientId].age;
    }

    function getClientWalletAddress(
        uint256 clientId
    ) public view override clientNotExists(clientId) returns (address) {
        return clientMappingStorage[clientId].WalletAddress;
    }

    function getClientPaymentStatus(
        uint256 clientId
    ) public view override clientNotExists(clientId) returns (PaymentStatus) {
        return clientMappingStorage[clientId].paymentStatus;
    }

    function getClientAddressLocal(
        uint256 clientId
    )
        public
        view
        override
        clientNotExists(clientId)
        returns (AddressLocal memory)
    {
        return clientMappingStorage[clientId].addressLocal;
    }

    function getNextId() private returns (uint256) {
        return ++currentId;
    }

    /**
     * IMPORTANT @dev
     * This blocks the execution of the contract this validation of data
     */
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
}
