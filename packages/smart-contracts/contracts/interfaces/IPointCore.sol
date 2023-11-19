// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IPointCore {
    /// @dev errors
    error InvalidClientLevel();
    error ClientAlreadyHasToken();
    error ClientDoesNotHaveToken();

    /// @dev events Minted ommited from this contract
    event CustomerTitaniumMinted(
        uint256 indexed clientId,
        address clientAddress
    );
    event CustomerGoldMinted(uint256 indexed clientId, address clientAddress);
    event CustomerPremiumMinted(
        uint256 indexed clientId,
        address clientAddress
    );

    /// @dev events Burned ommited from this contract
    event CustomerTitaniumBurned(
        uint256 indexed clientId,
        address clientAddress
    );
    event CustomerGoldBurned(uint256 indexed clientId, address clientAddress);
    event CustomerPremiumBurned(
        uint256 indexed clientId,
        address clientAddress
    );

    /// @dev events points
    event ClientPointsChanged(uint256 indexed clientId, uint256 newPoints);
    event ClientPointsReset(uint256 indexed clientId);
}
