import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@openzeppelin/hardhat-upgrades';
import env from 'dotenv';
env.config();

const config: HardhatUserConfig = {
  solidity: '0.8.20',
  networks: {
    firefly: {
      url: 'http://172.16.239.10:8545',
      accounts: [
        '6139eb4c7a004f2c90a3233b493517b52718f7ad5fd4a82ef326351dfaced7b5',
      ],
    },
    mumbai: {
      url: process.env.POLYGON_RPC_URL,
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
