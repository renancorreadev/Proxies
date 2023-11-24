import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@openzeppelin/hardhat-upgrades';
import env from 'dotenv';
env.config();

const config: HardhatUserConfig = {
  solidity: '0.8.20',
  networks: {
    firefly: {
      url: process.env.JSON_RPC_URL,
      accounts: [process.env.FFPRIVATEKEY as string],
    },
    mumbai: {
      url: 'https://polygon-mumbai.infura.io/v3/60786ed4ffd74c75b4b0bb369cde55f7',
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v6',
  },
};

export default config;
