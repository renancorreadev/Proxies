// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ICustomerManagementStorage} from '../interfaces/ICustomerManagementStorage.sol';

abstract contract CustomerManagementStorage is ICustomerManagementStorage {
    /// @dev global variables for client Storage
    uint256 internal currentId;

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
