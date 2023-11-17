import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@openzeppelin/hardhat-upgrades';


const PRIVATE_KEY = "6139eb4c7a004f2c90a3233b493517b52718f7ad5fd4a82ef326351dfaced7b5"
const FFPRIVATEKEY = "6d69dceeab29191cc966fc42b4cdc7fd7a301c7c77b5af3c4d3e6efb8436c31d"
const ETHERSCAN_API_KEY = "ZASD27N3FJ8NJ7HD471SN93TKAYBEKSYRF"
const INFURA_API_KEY = "fce92eb6f57546ef83a440a2f532829e"

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    firefly: {
      url: "http://192.168.15.200:5100",
      accounts: [FFPRIVATEKEY as string],
    },
    mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/60786ed4ffd74c75b4b0bb369cde55f7",
      accounts: [PRIVATE_KEY as string],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v6'
  }
};

export default config;
