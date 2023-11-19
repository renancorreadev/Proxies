// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {PointStorage} from "./storage/PointStorage.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import {IClientStorage} from "./interfaces/IClientStorage.sol";

contract PointCore is OwnableUpgradeable, PointStorage {
    IClientStorage public clientStorage;


    modifier validClient(uint256 clientId) {
        require(clientStorage.isClientExists(clientId), "InvalidClientID");
        _;
    }

    function initialize(address _clientStorage) public initializer {
        __Ownable_init(msg.sender);
        clientStorage = IClientStorage(_clientStorage);
    }

    function addPoints(
        uint256 clientId,
        uint points
    ) public onlyOwner validClient(clientId) {
        clientPoints[clientId] += points;
        emit PointsAdded(clientId, points);
    }

    function removePoints(
        uint256 clientId,
        uint points
    ) public onlyOwner validClient(clientId) {
        if (points > clientPoints[clientId])
            revert InsufficientPoints(clientPoints[clientId], points);

        clientPoints[clientId] -= points;
        emit PointsRemoved(clientId, points);
    }

      /**
     * @dev Returns the total points of a given client.
     * @param clientId The ID of the client.
     * @return Total points of the client.
     */
    function getClientPoints(uint256 clientId) public view validClient(clientId) returns (uint) {
        return clientPoints[clientId];
    }

}
