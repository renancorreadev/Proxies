import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { ClientManager } from "../typechain";

describe("ClientManager", function () {
  let clientManager: ClientManager;
  let owner: any;
  let clientData: any;

  async function deployClientManagerFixture() {
    const [owner] = await ethers.getSigners();

    const ClientManagerContract = await ethers.getContractFactory(
      "ClientManager"
    );

    clientManager = (await upgrades.deployProxy(ClientManagerContract, [], {
      initializer: "initialize",
    })) as unknown as ClientManager;
    return { clientManager, owner };
  }

  beforeEach(async function () {
    const { clientManager: newClientManager, owner: newOwner } =
      await deployClientManagerFixture();
    clientManager = newClientManager;
    owner = newOwner;

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

  it("Should register and retrieve client data", async function () {
    const retrievedData = await clientManager.getClientData(1);
    expect(retrievedData.name).to.equal(clientData.name);
    expect(retrievedData.age).to.equal(clientData.age);
    expect(retrievedData.WalletAddress).to.equal(clientData.WalletAddress);
    expect(retrievedData.paymentStatus).to.equal(clientData.paymentStatus);
    expect(retrievedData.addressLocal.City).to.equal(
      clientData.addressLocal.City
    );
  });

  it("Should retrieve client name", async function () {
    const retrievedName = await clientManager.getClientName(1);
    expect(retrievedName).to.equal("John Doe");
  });

  it("Should retrieve client age", async function () {
    const retrievedAge = await clientManager.getClientAge(1);
    expect(retrievedAge).to.equal(30);
  });

  it("Should retrieve client payment status", async function () {
    const retrievedPaymentStatus = await clientManager.getClientPaymentStatus(
      1
    );
    expect(retrievedPaymentStatus).to.equal(0);
  });

  it("Should retrieve client address Local", async function () {
    const retrievedPaymentStatus = await clientManager.getClientAddressLocal(1);
    expect(retrievedPaymentStatus.HouseNumber).to.equal(67);
  });

  it("should retrieve client complete data with id", async function () {
    const retrievedData = await clientManager.getClientData(1);

    const formattedRetrievedData = {
      name: retrievedData.name,
      age: Number(retrievedData.age),
      WalletAddress: retrievedData.WalletAddress,
      paymentStatus: Number(retrievedData.paymentStatus),
      addressLocal: {
        City: retrievedData.addressLocal.City,
        Street: retrievedData.addressLocal.Street,
        PostalCode: Number(retrievedData.addressLocal.PostalCode),
        HouseNumber: Number(retrievedData.addressLocal.HouseNumber),
      },
    };

    expect(formattedRetrievedData).to.deep.equal(clientData);
  });
});
