// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {PointStorage} from "./storage/PointStorage.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract PointCore is OwnableUpgradeable, PointStorage {
    modifier validClient(uint256 clientId) {
        if (clientPoints[clientId] == 0) revert InvalidClientID(clientId);
        _;
    }

    function initialize() public initializer {
        __Ownable_init(msg.sender);
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
}
