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
    uint256 public constant CUSTOMER_PREMIUM = 1;
    uint256 public constant CUSTOMER_GOLD = 2;
    uint256 public constant CUSTOMER_TITANIUM = 3;

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

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}
