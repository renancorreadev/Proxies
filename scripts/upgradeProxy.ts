import { ethers, upgrades } from "hardhat";


const proxyAddress = "0x74dC770ab1e2Ac3a001ee220765fc1af37758a27"



async function main() {
  const newContractVersion = await ethers.getContractFactory("PizzaV4");

  const upgradeContract =  await upgrades.upgradeProxy(proxyAddress, newContractVersion);

  await upgradeContract.waitForDeployment();

  const newImplementationAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress);

  console.log("Contract updated deployed to:", await upgradeContract.getAddress());
  console.log("New implementation address:", newImplementationAddress);
}

main();