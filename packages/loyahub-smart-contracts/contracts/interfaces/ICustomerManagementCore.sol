// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ICustomerManagementStorage} from "./ICustomerManagementStorage.sol";

interface ICustomerManagementCore {
    function isClientExists(uint256 clientId) external view returns (bool);

    function getClientData(
        uint256 clientId
    ) external view returns (ICustomerManagementStorage.ClientData memory);
}
