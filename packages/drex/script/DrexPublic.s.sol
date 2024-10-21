// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Drex} from "../src/Drex.sol";

contract DrexPublic is Script {
    Drex public drex;

    function setUp() public {

    }

    function run() public {
        // Inicia a transmissão da transação
        vm.startBroadcast();

        // Deploy do contrato Drex
        drex = new Drex("Drex", "DREX", 1_000_000 * 10 ** 18);

        // Para a transmissão da transação
        vm.stopBroadcast();

        // Exibe o endereço do contrato na saída do console
        console.log("Drex deployed at:", address(drex));
    }
}

//0xbC252E3B2bAD829c99d17E0eaF0f7DA3Ea6d1cDe
