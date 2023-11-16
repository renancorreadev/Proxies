// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Open Zeppelin libraries for controlling upgradability and access.
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract PizzaV5 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    uint256 public slices;

    mapping(uint => string) public sliceNames;

    ///@dev no constructor in upgradable contracts. Instead we have initializers
    ///@param _sliceCount initial number of slices for the pizza
    function initialize(uint256 _sliceCount) public initializer {
        slices = _sliceCount;

        ///@dev as there is no constructor, we need to initialise the OwnableUpgradeable explicitly
        __Ownable_init(msg.sender);
    }

    ///@dev required by the OZ UUPS module
    function _authorizeUpgrade(address) internal override onlyOwner {}

    ///@dev decrements the slices when called
    function eatSlice() external {
        require(slices > 1, "no slices left");
        slices -= 1;
    }

    function sum(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }

    function setSliceName(uint256 index, string memory name) public {
        sliceNames[index] = name;
    }

    function getSliceName(uint256 index) public view returns (string memory) {
        return sliceNames[index];
    }

    function pizzaVersion() external pure returns (uint256) {
        return 5;
    }
}
