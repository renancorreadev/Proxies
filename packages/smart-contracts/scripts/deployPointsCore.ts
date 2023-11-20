import { ethers, upgrades } from "hardhat";
import { getImplementationAddress } from "@openzeppelin/upgrades-core";
import { JsonRpcProvider } from "@ethersproject/providers";
import fs from "fs";

const provider = new JsonRpcProvider("http://192.168.15.200:5100");

async function main() {
  // Deploy the contract
  const contractFactory = await ethers.getContractFactory("PointCore");

  const deployContract = await upgrades.deployProxy(
    contractFactory,
    [
      "0xEB9e9E2DbC00fC320AC66413F169adD6abe7c222",
      "http://localhost:3000/api/metadata",
    ],
    {
      initializer: "initialize",
    }
  );
  await deployContract.waitForDeployment();

  const proxyAddress = await deployContract.getAddress();
  const newImplementationAddress = await getImplementationAddress(
    provider,
    proxyAddress
  );

  const data = {
    proxyAddress: proxyAddress,
    implementationAddress: newImplementationAddress,
  };

  console.log("Proxy address :", proxyAddress);
  console.log("Implementation address :", newImplementationAddress);

  fs.writeFileSync("pointCore.json", JSON.stringify(data, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
