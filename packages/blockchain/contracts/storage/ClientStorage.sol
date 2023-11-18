// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IClientStorage {
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
        string name;
        uint age;
        address WalletAddress;
        PaymentStatus paymentStatus;
        AddressLocal addressLocal;
    }

    event ClientRegistered(
        uint256 indexed clientId ,
        string name,
        uint256 age
    );

    function getClientData(
        uint256 clientId
    ) external view returns (ClientData memory);

    function getClientName(
        uint256 clientId
    ) external view returns (string memory);

    function getClientAge(uint256 clientId) external view returns (uint256);

    function getClientWalletAddress(
        uint256 clientId
    ) external view returns (address);

    function getClientPaymentStatus(
        uint256 clientId
    ) external view returns (PaymentStatus);

    function getClientAddressLocal(
        uint256 clientId
    ) external view returns (AddressLocal memory);
}

abstract contract ClientStorage is IClientStorage {
    /// @dev global variables for client Storage
    uint256 private currentId;

    mapping(uint256 => ClientData) internal clientMappingStorage;

    function __ClientStorageInit() internal {
        currentId = 0;
    }

    /// @dev setters storages to client data
    function _registerClient(ClientData calldata newClient) internal {
        uint256 nextId = getNextId();

        clientMappingStorage[nextId] = newClient;

        emit ClientRegistered(
            nextId,
            newClient.name,
            newClient.age
        );
    }

    /// @dev getters storage to client data
    function getClientData(
        uint256 clientId
    ) public view override returns (ClientData memory) {
        return clientMappingStorage[clientId];
    }

    function getClientName(
        uint256 clientId
    ) public view override returns (string memory) {
        return clientMappingStorage[clientId].name;
    }

    function getClientAge(
        uint256 clientId
    ) public view override returns (uint256) {
        return clientMappingStorage[clientId].age;
    }

    function getClientWalletAddress(
        uint256 clientId
    ) public view override returns (address) {
        return clientMappingStorage[clientId].WalletAddress;
    }

    function getClientPaymentStatus(
        uint256 clientId
    ) public view override returns (PaymentStatus) {
        return clientMappingStorage[clientId].paymentStatus;
    }

    function getClientAddressLocal(
        uint256 clientId
    ) public view override returns (AddressLocal memory) {
        return clientMappingStorage[clientId].addressLocal;
    }

    function getNextId() private returns (uint256) {
        return ++currentId;
    }
}
