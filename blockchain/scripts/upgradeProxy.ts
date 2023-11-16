import { ethers, upgrades } from "hardhat";
import {JsonRpcProvider} from "@ethersproject/providers";
// import { exec } from "child_process";
import { getImplementationAddress } from '@openzeppelin/upgrades-core';
import fs from 'fs';


const proxyAddress = "0x74dC770ab1e2Ac3a001ee220765fc1af37758a27"
const provider = new JsonRpcProvider("http://192.168.15.200:5100");

async function main() {
  const newContractVersion = await ethers.getContractFactory("PizzaV5");

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

  // exec(`npx hardhat verify --network mumbai ${newImplementationAddress}`, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`Erro ao executar o comando: ${error.message}`);
  //     return;
  //   }
  //   if (stderr) {
  //     console.error(`Erro no stderr: ${stderr}`);
  //     return;
  //   }
  //   console.log(`Resultado do comando: ${stdout}`);
  // });
}
  


main();