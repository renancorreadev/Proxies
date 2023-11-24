import { ethers, upgrades } from 'hardhat';
import { JsonRpcProvider } from '@ethersproject/providers';
import { getImplementationAddress } from '@openzeppelin/upgrades-core';
import { proxyAddress } from '../.deployed/deploys/CustomerManagementCore.json';
import fs from 'fs';

const provider = new JsonRpcProvider(process.env.JSON_RPC_URL as string);

async function main() {
  const newContractVersion = await ethers.getContractFactory(
    process.env.CONTRACT_CLIENT_VERSION as string
  );

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
    'Contract updated deployed to:',
    await upgradeContract.getAddress()
  );
  console.log('New implementation address:', newImplementationAddress);

  const data = {
    proxyAddress,
    implementationAddress: newImplementationAddress,
  };

  fs.writeFileSync(
    '.deployed/upgrades/CustomerManagementCore.json',
    JSON.stringify(data, null, 2)
  );
}

main();
