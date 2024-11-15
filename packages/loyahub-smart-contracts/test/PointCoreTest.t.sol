// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from 'forge-std/Test.sol';
import {console} from 'forge-std/console.sol';
import {PointCore} from '../contracts/PointCore.sol';
import {BadgeToken} from '../contracts/token/BadgeToken.sol';
import {PointStorage} from '../contracts/storage/PointStorage.sol';
import {CustomerManagementCore} from '../contracts/CustomerManagementCore.sol';
import {Drex} from '../contracts/token/Drex.sol';
import {ICustomerManagementStorage} from '../contracts/interfaces/ICustomerManagementStorage.sol';

contract PointCoreTest is Test {
    PointCore public pointCore;
    CustomerManagementCore public customerManager;
    Drex public drexToken;

    address owner = address(this);
    address customer;
    address admin;
    uint256 private customerPrivateKey;
    uint256 private adminPrivateKey;

    uint256 public clientId;

    // Use as tipagens da interface ICustomerManagementStorage
    ICustomerManagementStorage.PaymentStatus public paymentStatus;
    ICustomerManagementStorage.AddressLocal public addressLocal;
    ICustomerManagementStorage.ClientDataInput public newClient;

    function setUp() public {
        // Create mock addresses
        (customer, customerPrivateKey) = makeAddrAndKey('customer');
        (admin, adminPrivateKey) = makeAddrAndKey('admin');

        // Deploy contracts
        vm.startPrank(admin, admin);
        customerManager = new CustomerManagementCore();
        pointCore = new PointCore();
        drexToken = new Drex('Drex', 'DREX', 100000 ether);
        vm.stopPrank();

        // Initialize contracts
        vm.startPrank(admin, admin);
        pointCore.initialize(
            address(customerManager),
            'https://example.com/metadata/'
        );
        // Mint Drex token to the customer
        drexToken.mint(admin, 1000 * 10 ** 18);
        vm.stopPrank();
    }

    function registerClient(
        string memory name,
        uint256 age,
        address walletAddress,
        ICustomerManagementStorage.PaymentStatus,
        string memory city,
        string memory street,
        uint256 postalCode,
        uint256 houseNumber
    ) private {
        ICustomerManagementStorage.AddressLocal
            memory localAddress = ICustomerManagementStorage.AddressLocal(
                city,
                street,
                postalCode,
                houseNumber
            );
        ICustomerManagementStorage.ClientDataInput
            memory newClientToRegister = ICustomerManagementStorage
                .ClientDataInput({
                    name: name,
                    age: age,
                    walletAddress: walletAddress,
                    paymentStatus: paymentStatus,
                    addressLocal: localAddress
                });
        // Register the client
        customerManager.registerClient(newClientToRegister);
    }

    function testRegisterClient() external {
        console.log(
            '----------------- Testando Registro de Clientes ---------------------- \n'
        );

        uint256 oldId = customerManager.currentId();
        console.log('oldID: ', oldId);
        // Register a client before running the tests
        registerClient(
            'John Doe',
            30,
            customer,
            ICustomerManagementStorage.PaymentStatus.PAID,
            'City',
            'Street',
            12345,
            123
        );

        //call currentId again to receive next id
        uint256 newId = customerManager.currentId();
        assertEq(newId, 1, 'Plan id should be 0');
    }

    function testAddPoints() external {
        // Ensure clientId is valid
        console.log('------------- Registrando um customer --------------');
        registerClient(
            'John Doe',
            30,
            customer,
            ICustomerManagementStorage.PaymentStatus.PAID,
            'City',
            'Street',
            12345,
            123
        );
        uint256 userId = customerManager.currentId();
        require(userId > 0, 'Client not registered');

        // Now that the client is registered, we can add points
        uint256 initialPoints = pointCore.getClientPoints(userId);
        console.log('initialPoints', initialPoints);

        vm.startPrank(admin, admin);
        pointCore.setPointsTokenAddress(address(drexToken));

        // Grant permissions and set points

        uint256 balance = drexToken.balanceOf(admin);
        console.log('adminBalance: ', balance);
        drexToken.approve(address(pointCore), balance);

        uint256 tokenAllowances = drexToken.allowance(
            admin,
            address(pointCore)
        );
        console.log('token aprovados: ', tokenAllowances);

        pointCore.addPoints(userId, 100);

        vm.stopPrank();
        uint256 balanceCustomerById = drexToken.balanceOf(customer);
        console.log('Balance customer: ', balanceCustomerById);

        uint256 endPoints = pointCore.getClientPoints(userId);
        console.log('Pontos adicionados: ', endPoints);

        // Secund

        vm.startPrank(admin);
        pointCore.addPoints(userId, 100);
        vm.stopPrank();

        console.log('------');
        uint256 newBalanceCustomer = drexToken.balanceOf(customer);
        console.log('new Balance Customer: ', newBalanceCustomer);

        uint256 newPointBalance = pointCore.getClientPoints(userId);
        console.log('Novos Pontos adicionados: ', newPointBalance);
    }
}
