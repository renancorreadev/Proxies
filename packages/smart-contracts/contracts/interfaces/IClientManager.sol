// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IClientStorage} from "./IClientStorage.sol";

interface IClientManager {
    function isClientExists(uint256 clientId) external view returns (bool);

    function getClientData(
        uint256 clientId
    ) external view returns (IClientStorage.ClientData memory);
}
