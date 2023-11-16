import { ethers, upgrades } from "hardhat";

const SLICES = 8;
//0x74dC770ab1e2Ac3a001ee220765fc1af37758a27
async function main() {
  // Deploy the contract
  const SLICES = 8;

  const PizzaFactory = await ethers.getContractFactory("Pizza");

  const deployContractPizza = await upgrades.deployProxy(PizzaFactory, [SLICES], { initializer: 'initialize' });

  await deployContractPizza.waitForDeployment();

  console.log("Pizza deployed to:", await deployContractPizza.getAddress());
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

