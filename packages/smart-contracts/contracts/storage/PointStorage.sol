// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

abstract contract PointStorage {
    mapping(uint256 => uint) internal clientPoints;

    error InsufficientPoints(uint256 available, uint256 required);
    error InvalidClientID(uint256 clientId);

    event PointsAdded(uint256 indexed clientId, uint points);
    event PointsRemoved(uint256 indexed clientId, uint points);
}
