import { ethers, upgrades } from "hardhat";
import { JsonRpcProvider } from "@ethersproject/providers";

import { getImplementationAddress } from "@openzeppelin/upgrades-core";
import fs from "fs";

const proxyAddress = "0x19188CC908dDC7e1112267d8202adB8760707878";
const provider = new JsonRpcProvider("http://127.0.0.1:5100");

async function main() {
  const newContractVersion = await ethers.getContractFactory("PointCore");

  const upgradeContract = await upgrades.upgradeProxy(
    proxyAddress,
    newContractVersion
  );

  await upgradeContract.waitForDeployment();

  const newImplementationAddress = await getImplementationAddress(
    provider,
    proxyAddress
  );

  upgradeContract.getAddress();

  console.log(
    "Contract PointCore updated deployed to:",
    await upgradeContract.getAddress()
  );
  console.log(
    "New PointCore implementation address:",
    newImplementationAddress
  );

  const data = {
    proxyAddress: proxyAddress,
    implementationAddress: newImplementationAddress,
  };

  fs.writeFileSync(
    "PointCoreContractAddresses.json",
    JSON.stringify(data, null, 2)
  );
}

main();
