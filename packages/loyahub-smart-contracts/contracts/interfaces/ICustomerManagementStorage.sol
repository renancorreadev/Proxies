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
