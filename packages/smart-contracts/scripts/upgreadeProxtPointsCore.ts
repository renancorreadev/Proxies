import { ethers, upgrades } from 'hardhat';
import { JsonRpcProvider } from '@ethersproject/providers';
import { proxyAddress } from '../.deployed/deploys/PointCore.json';
import { getImplementationAddress } from '@openzeppelin/upgrades-core';
import fs from 'fs';
import env from 'dotenv';

env.config();

const provider = new JsonRpcProvider(process.env.JSON_RPC_URL as string);

async function main() {
  const newContractVersion = await ethers.getContractFactory(
    process.env.CONTRACT_POINTS_CORE_VERSION as string
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
    'Contract PointCore updated deployed to:',
    await upgradeContract.getAddress()
  );
  console.log(
    'New PointCore implementation address:',
    newImplementationAddress
  );

  const data = {
    proxyAddress,
    implementationAddress: newImplementationAddress,
  };

  fs.writeFileSync(
    '.deployed/upgrades/PointCore.json',
    JSON.stringify(data, null, 2)
  );
}

main();
