import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { ClientManager, PointCore } from "../typechain";

describe("PointCore", function () {
  let pointCoreInstance: PointCore;
  let clientManager: ClientManager;
  let owner: any;
  let clientData: any;

  async function deployPointContractProxy() {
    // @ts-ignore
    const [owner] = await ethers.getSigners();

    // Deploy ClientManager
    const ClientManagerContract = await ethers.getContractFactory(
      "ClientManager"
    );
    clientManager = (await upgrades.deployProxy(ClientManagerContract, [], {
      initializer: "initialize",
    })) as unknown as ClientManager;

    const proxyAddress = await clientManager.getAddress();

    const pointContract = await ethers.getContractFactory("PointCore");
    pointCoreInstance = (await upgrades.deployProxy(
      pointContract,
      [proxyAddress],
      {
        initializer: "initialize",
      }
    )) as unknown as PointCore;

    return { pointCoreInstance, clientManager, owner };
  }

  beforeEach(async function () {
    const {
      pointCoreInstance: newPointCore,
      clientManager: newClientManager,
      owner: newOwner,
    } = await deployPointContractProxy();

    pointCoreInstance = newPointCore;
    owner = newOwner;
    clientManager = newClientManager;

    clientData = {
      name: "John Doe",
      age: 30,
      WalletAddress: owner.address,
      paymentStatus: 0,
      addressLocal: {
        City: "Test City",
        Street: "Test Street",
        PostalCode: 12345,
        HouseNumber: 67,
      },
    };

    await clientManager.registerClient(clientData);
  });

  it("Should register points to client by id", async function () {
    await pointCoreInstance.addPoints(1, 100);

    const points = await pointCoreInstance.getClientPoints(1);

    console.log(points);

    expect(points).to.equal(100);
  });

  it("Should revert when trying to add points to a non-existent client", async function () {
    // Suponha que o cliente com ID 999 não existe
    const nonExistentClientId = 999;
    const pointsToAdd = 100;

    await expect(
      pointCoreInstance.addPoints(nonExistentClientId, pointsToAdd)
    ).to.be.revertedWith("InvalidClientID");
  });
});
