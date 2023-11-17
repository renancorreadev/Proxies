// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Open Zeppelin libraries for controlling upgradability and access.
import {Initializable} from "../node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "../node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {OwnableUpgradeable} from "../node_modules/@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import {ClientStorage} from "./storage/ClientStorage.sol";

// interfaces
import {IClient} from "./interfaces/Iclient.sol";

contract ClientManager is Initializable, UUPSUpgradeable, OwnableUpgradeable, ClientStorage, IClient {

    function initialize() public initializer {
        __ClientStorageInit();
        ///@dev as there is no constructor, we need to initialise the OwnableUpgradeable explicitly
        __Ownable_init(msg.sender);
    }

    ///@dev required by the OZ UUPS module
    function _authorizeUpgrade(address) internal override onlyOwner {}

    function registerClient(ClientData calldata newClient) external {
        _registerClient(newClient);
    }    
}
