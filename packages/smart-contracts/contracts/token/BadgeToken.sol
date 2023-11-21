// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC1155Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract BadgeToken is
    Initializable,
    ERC1155Upgradeable,
    UUPSUpgradeable,
    OwnableUpgradeable
{
    // ERC721 - CUSTOMER_PREMIUM
    // ERC721 - CUSTOMER_GOLD
    // ERC721 - CUSTOMER_TITANIUM
    uint256 public constant CUSTOMER_PREMIUM = 1; // 200 PONTOS
    uint256 public constant CUSTOMER_GOLD = 2; // 500 PONTOS
    uint256 public constant CUSTOMER_TITANIUM = 3; // 1000 PONTOS

    function mint(
        address account,
        uint256 id,
        uint256 amount
    ) public onlyOwner {
        require(
            id == CUSTOMER_PREMIUM ||
                id == CUSTOMER_GOLD ||
                id == CUSTOMER_TITANIUM,
            "Invalid badge id"
        );
        _mint(account, id, amount, "");
    }

    function burnToken(
        address account,
        uint256 id,
        uint256 amount
    ) public onlyOwner {
        uint256 currentBalance = balanceOf(account, id);
        require(currentBalance >= amount, "Insufficient balance to burn");

        _burn(account, id, amount);
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}
