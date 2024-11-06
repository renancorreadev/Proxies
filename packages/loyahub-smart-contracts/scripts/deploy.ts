import { ethers, upgrades } from 'hardhat';
import { getImplementationAddress } from '@openzeppelin/upgrades-core';
import { JsonRpcProvider } from '@ethersproject/providers';
import fs from 'fs';
import path from 'path';

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

  // Salvar em um JSON para registro
  fs.writeFileSync(
    '.deployed/deploys/CustomerManagementCore.json',
    JSON.stringify(data, null, 2)
  );

  // Função auxiliar para atualizar o arquivo .env
  function updateEnvFile(
    filePath: string,
    variableName: string,
    value: string
  ) {
    const envPath = path.resolve(__dirname, filePath);
    let envFileContent = fs.readFileSync(envPath, 'utf-8');
    const regex = new RegExp(`^${variableName}=.*`, 'm');
    if (envFileContent.match(regex)) {
      envFileContent = envFileContent.replace(
        regex,
        `${variableName}="${value}"`
      );
    } else {
      envFileContent += `\n${variableName}="${value}"`;
    }
    fs.writeFileSync(envPath, envFileContent);
  }

  // Atualizar .env nos dois projetos
  updateEnvFile('../../loyahub-api/.env', 'CONTRACT_ADDRESS', proxyAddress);
  updateEnvFile(
    '../../loyahub-blockchain-service/.env',
    'CUSTOMER_MANAGEMENT_CONTRACT_ADDRESS',
    proxyAddress
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
