import { ethers, upgrades } from "hardhat";
import {JsonRpcProvider} from "@ethersproject/providers";
import { exec } from "child_process";
import { getImplementationAddress } from '@openzeppelin/upgrades-core';



const proxyAddress = "0x74dC770ab1e2Ac3a001ee220765fc1af37758a27"
const provider = new JsonRpcProvider("https://polygon-mumbai.infura.io/v3/60786ed4ffd74c75b4b0bb369cde55f7");




async function main() {
  const newContractVersion = await ethers.getContractFactory("PizzaV5");

  const upgradeContract =  await upgrades.upgradeProxy(proxyAddress, newContractVersion);

  await upgradeContract.waitForDeployment();

  const newImplementationAddress = await getImplementationAddress(provider, proxyAddress);

  upgradeContract.getAddress();

  console.log("Contract updated deployed to:", await upgradeContract.getAddress());
  console.log("New implementation address:", newImplementationAddress);

  exec(`npx hardhat verify --network mumbai ${newImplementationAddress}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao executar o comando: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Erro no stderr: ${stderr}`);
      return;
    }
    console.log(`Resultado do comando: ${stdout}`);
  });
}
  


main();