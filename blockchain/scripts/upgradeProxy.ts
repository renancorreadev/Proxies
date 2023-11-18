import { ethers, upgrades } from "hardhat";
import {JsonRpcProvider} from "@ethersproject/providers";
// import { exec } from "child_process";
import { getImplementationAddress } from '@openzeppelin/upgrades-core';
import fs from 'fs';


const proxyAddress = "0xF75bD2B5282c2B7caFA289A0565d511707B7E5D1"
const provider = new JsonRpcProvider("http://192.168.15.200:5100");

async function main() {
  const newContractVersion = await ethers.getContractFactory("ClientManagerV2");

  const upgradeContract =  await upgrades.upgradeProxy(proxyAddress, newContractVersion);

  await upgradeContract.waitForDeployment();

  const newImplementationAddress = await getImplementationAddress(provider, proxyAddress);

  upgradeContract.getAddress();

  console.log("Contract updated deployed to:", await upgradeContract.getAddress());
  console.log("New implementation address:", newImplementationAddress);

  const data = {
    proxyAddress: proxyAddress,
    implementationAddress: newImplementationAddress
  };

  fs.writeFileSync('updatedContracts.json', JSON.stringify(data, null, 2));
}
  


main();