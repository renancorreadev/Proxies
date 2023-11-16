import { ethers, upgrades } from "hardhat";
import { getImplementationAddress } from '@openzeppelin/upgrades-core';
import {JsonRpcProvider} from "@ethersproject/providers";
import fs from 'fs';


const provider = new JsonRpcProvider("http://192.168.15.200:5100");
const SLICES = 8;

async function main() {
  // Deploy the contract

  const PizzaFactory = await ethers.getContractFactory("Pizza");

  const deployContractPizza = await upgrades.deployProxy(PizzaFactory, [SLICES], { initializer: 'initialize' });
  await deployContractPizza.waitForDeployment();

  const proxyAddress = await deployContractPizza.getAddress();
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

