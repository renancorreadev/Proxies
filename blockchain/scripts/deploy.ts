import { ethers, upgrades } from "hardhat";
import { getImplementationAddress } from '@openzeppelin/upgrades-core';
import {JsonRpcProvider} from "@ethersproject/providers";
import fs from 'fs';

const provider = new JsonRpcProvider("http://192.168.15.200:5100");

async function main() {
  // Deploy the contract

  const contractFactory = await ethers.getContractFactory("ClientManager");

  const deployContract = await upgrades.deployProxy(contractFactory, [], { initializer: 'initialize' });
  await deployContract.waitForDeployment();

  const proxyAddress = await deployContract.getAddress();
  const newImplementationAddress = await getImplementationAddress(provider, proxyAddress);

  const data = {
    proxyAddress: proxyAddress,
    implementationAddress: newImplementationAddress
  };

  console.log("Proxy address :", proxyAddress);
  console.log("Implementation address :", newImplementationAddress);

  fs.writeFileSync('deployedContracts.json', JSON.stringify(data, null, 2));
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/* 
{
  "proxyAddress": "0xF75bD2B5282c2B7caFA289A0565d511707B7E5D1",
  "implementationAddress": "0xd4cE30e0424Ff3D580217F5FCAf2B271Fe50375F"
}
**/