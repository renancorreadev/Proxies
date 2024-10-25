// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

abstract contract PointStorage {
    // Mapeamento do cliente para o nível do NFS
    mapping(uint256 => uint256) public clientLevel;
    mapping(uint256 => uint) internal clientPoints;

    error InsufficientPoints(uint256 available, uint256 required);
    error InvalidClientID(uint256 clientId);

    event PointsAdded(uint256 indexed clientId, uint points);
    event PointsRemoved(uint256 indexed clientId, uint points);
}
