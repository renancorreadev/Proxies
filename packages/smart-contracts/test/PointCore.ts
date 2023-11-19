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
      [proxyAddress, "http://localhost:3000/api/metadata/"],
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
    ).to.be.revertedWith("InvalidClientID on PointCore");
  });

  it("Should reset points when reaching the maximum level", async function () {
    // Add 1000 points to the client (max point)
    await pointCoreInstance.addPoints(1, 1000);

    // verify that the client has 0 points after reaching the maximum level
    const pointsAfterMaxLevel = await pointCoreInstance.getClientPoints(1);
    expect(pointsAfterMaxLevel).to.equal(0);
  });

  it("Should burn the previous level NFT when advancing to a new level", async function () {
    // Primeiro, adicione pontos suficientes para alcançar o nível Premium
    await pointCoreInstance.addPoints(1, 200);

    // Em seguida, adicione mais pontos para alcançar o nível Gold
    await pointCoreInstance.addPoints(1, 300); // Totalizando 500 pontos

    // Verifique se o NFT Premium foi queimado
    const previousLevelNftBalance = await pointCoreInstance.balanceOf(
      owner.address,
      1
    ); // Substitua 1 pelo ID do NFT Premium
    expect(previousLevelNftBalance).to.equal(0);

    // Verifique se o NFT Gold foi emitido
    const newLevelNftBalance = await pointCoreInstance.balanceOf(
      owner.address,
      2
    ); // Substitua 2 pelo ID do NFT Gold
    expect(newLevelNftBalance).to.equal(1);
  });

  it("Should mint a new NFT when reaching a new level", async function () {
    // Suponha que 200 pontos sejam suficientes para o nível Premium
    await pointCoreInstance.addPoints(1, 200);

    // Verifique se o NFT foi emitido corretamente
    const nftBalance = await pointCoreInstance.balanceOf(owner.address, 1);
    expect(nftBalance).to.equal(1);
  });
});
