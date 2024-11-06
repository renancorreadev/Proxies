// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../../contracts/PointCore.sol";
import "../../contracts/token/BadgeToken.sol";
import "../../contracts/storage/PointStorage.sol";
import "../../contracts/interfaces/IERC20.sol";
import "../../contracts/CustomerManagementCore.sol";

contract PointCoreTest is Test {
    PointCore public pointCore;
    CustomerManagementCore public customerManager;
    IERC20 public drexToken;

    address owner = address(this);
    address customer = address(0x123);

    function setUp() public {
        customerManager = new CustomerManagementCore();
        drexToken = IERC20(address()); // Um mock de token ERC20 para testes
        pointCore = new PointCore();

        // Inicializa o contrato com o endereço do gerenciador de clientes
        pointCore.initialize(address(customerManager), "https://example.com/metadata");
        pointCore.setPointsTokenAddress(address(drexToken));

        // Adiciona um cliente fictício ao gerenciador de clientes
        customerManager.addClient(customer, 1);
    }

    function testAddPoints() public {
        uint256 initialPoints = pointCore.getClientPoints(1);

        pointCore.addPoints(1, 100); // Adiciona 100 pontos ao cliente

        uint256 newPoints = pointCore.getClientPoints(1);
        assertEq(newPoints, initialPoints + 100, "Os pontos nao foram adicionados corretamente");
    }

    function testRemovePoints() public {
        pointCore.addPoints(1, 100);
        uint256 pointsAfterAddition = pointCore.getClientPoints(1);

        pointCore.removePoints(1, 50); // Remove 50 pontos do cliente

        uint256 pointsAfterRemoval = pointCore.getClientPoints(1);
        assertEq(pointsAfterRemoval, pointsAfterAddition - 50, "Os pontos nao foram removidos corretamente");
    }

    function testSetPointsTokenAddress() public {
        address newTokenAddress = address(0x456);

        pointCore.setPointsTokenAddress(newTokenAddress);

        assertEq(pointCore.drexToken(), newTokenAddress, "O endereco do token nao foi configurado corretamente");
    }

    function testUpdateClientLevel() public {
        pointCore.addPoints(1, 1000); // Adiciona pontos suficientes para atingir nível Titanium
        uint256 clientLevel = pointCore.getClientLevel(1);

        assertEq(clientLevel, 3, "O nivel do cliente nao foi atualizado corretamente");
    }
}
