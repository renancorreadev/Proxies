import { ethers, upgrades } from 'hardhat';
import { getImplementationAddress } from '@openzeppelin/upgrades-core';
import { JsonRpcProvider } from '@ethersproject/providers';
import fs from 'fs';

const provider = new JsonRpcProvider(process.env.JSON_RPC_URL);

async function main() {
  const contractFactory = await ethers.getContractFactory(
    process.env.CONTRACT_CLIENT_VERSION as string
  );
  const deployContract = await upgrades.deployProxy(contractFactory, [], {
    initializer: 'initialize',
  });
  await deployContract.waitForDeployment();

  const proxyAddress = await deployContract.getAddress();
  const newImplementationAddress = await getImplementationAddress(
    provider,
    proxyAddress
  );

  const data = {
    proxyAddress,
    implementationAddress: newImplementationAddress,
  };

  console.log('Proxy address :', proxyAddress);
  console.log('Implementation address :', newImplementationAddress);

  fs.writeFileSync(
    '.deployed/deploys/CustomerManagementCore.json',
    JSON.stringify(data, null, 2)
  );
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
