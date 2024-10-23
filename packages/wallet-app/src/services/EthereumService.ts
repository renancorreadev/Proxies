import "react-native-get-random-values";
import "@ethersproject/shims";

import {
  Wallet,
  isAddress,
  JsonRpcProvider,
  WebSocketProvider,
  formatEther,
  parseEther,
  HDNodeWallet,
  AddressLike,
  Contract,
  Mnemonic,
  formatUnits,
  Log,
  Interface,
} from "ethers";
import { validateMnemonic } from "bip39";

// ABI para ERC-20
const ERC20_ABI = [
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

interface SendTransactionResponse {
  gasEstimate: string;
  totalCost: string;
  totalCostMinusGas: string;
  gasFee: bigint;
}

class EthereumService {
  private readonly provider: JsonRpcProvider;
  private readonly webSocketProvider: WebSocketProvider;

  constructor() {
    const rpcUrl = process.env.EXPO_PUBLIC_BESU_RPC_URL!;
    const socketUrl = process.env.EXPO_PUBLIC_BESU_SOCKET_URL!;

    this.provider = new JsonRpcProvider(rpcUrl);
    this.webSocketProvider = new WebSocketProvider(socketUrl);
  }

  async createWallet(): Promise<HDNodeWallet> {
    return HDNodeWallet.createRandom();
  }

  async restoreWalletFromPhrase(mnemonicPhrase: string): Promise<HDNodeWallet> {
    if (!validateMnemonic(mnemonicPhrase)) {
      throw new Error("Invalid mnemonic phrase");
    }
    return HDNodeWallet.fromPhrase(mnemonicPhrase);
  }

  async sendTransaction(
    toAddress: AddressLike,
    privateKey: string,
    value: string
  ): Promise<any> {
    const signer = new Wallet(privateKey, this.provider);
    const tx = { to: toAddress, value: parseEther(value) };

    try {
      return await signer.sendTransaction(tx);
    } catch (error: any) {
      console.error("Transaction failed:", error);
      throw new Error("Failed to send transaction.");
    }
  }

  async calculateGasAndAmounts(
    toAddress: string,
    amount: string
  ): Promise<SendTransactionResponse> {
    const amountInWei = parseEther(amount);
    const tx = { to: toAddress, value: amountInWei };

    try {
      const gasEstimate = await this.provider.estimateGas(tx);
      const gasFee = (await this.provider.getFeeData()).maxFeePerGas!;
      const gasPrice = gasEstimate * gasFee;

      return {
        gasEstimate: formatEther(gasPrice),
        totalCost: formatEther(amountInWei + gasPrice),
        totalCostMinusGas: formatEther(amountInWei - gasPrice),
        gasFee,
      };
    } catch (error) {
      console.error("Gas calculation failed:", error);
      throw new Error("Unable to calculate gas.");
    }
  }

  async getERC20Balance(walletAddress: AddressLike): Promise<{ balance: string }> {
    const contractAddress = process.env.EXPO_PUBLIC_ERC20_CONTRACT_ADDRESS!;
    const contract = new Contract(contractAddress, ERC20_ABI, this.provider);

    try {
      const balance: bigint = await contract.balanceOf(walletAddress);
      const decimals: number = await contract.decimals();

      const formattedBalance = formatUnits(balance, decimals);
      const balanceWithTwoDecimals = parseFloat(formattedBalance).toFixed(2);

      return { balance: balanceWithTwoDecimals };
    } catch (error) {
      console.error("Failed to fetch ERC-20 balance:", error);
      throw new Error("Unable to fetch token balance.");
    }
  }

  async getBalance(address: AddressLike): Promise<bigint> {
    try {
      return await this.provider.getBalance(address);
    } catch (error) {
      console.error("Balance fetch failed:", error);
      throw new Error("Unable to fetch balance.");
    }
  }

  async confirmTransaction(txHash: string): Promise<boolean> {
    try {
      const receipt = await this.provider.waitForTransaction(txHash);
      return receipt.status === 1;
    } catch (error) {
      console.error("Transaction confirmation failed:", error);
      return false;
    }
  }

  validateAddress(address: string): boolean {
    return isAddress(address);
  }

  getProvider() {
    return this.provider;
  }

  getWebSocketProvider() {
    return this.webSocketProvider;
  }

  private async resolveAddress(address: AddressLike): Promise<string> {
    if (typeof address === "string") return address;
    if ("getAddress" in address && typeof address.getAddress === "function") {
      return await address.getAddress();
    }
    throw new Error("Invalid address type");
  }

  async createWalletByIndex(
    phrase: string,
    index = 0
  ): Promise<{ address: string; publicKey: string; derivationPath: string }> {
    if (!validateMnemonic(phrase)) {
      throw new Error("Invalid mnemonic phrase");
    }

    const mnemonic = Mnemonic.fromPhrase(phrase);
    const derivationPath = `m/44'/60'/0'/0/${index}`;

    try {
      const wallet = HDNodeWallet.fromMnemonic(mnemonic, derivationPath);
      return {
        address: await wallet.getAddress(),
        publicKey: wallet.publicKey,
        derivationPath,
      };
    } catch (error: any) {
      throw new Error(`Failed to create wallet by index: ${error.message}`);
    }
  }

  async fetchERC20Transfers(walletAddress: string) {
    const contractAddress = process.env.EXPO_PUBLIC_ERC20_CONTRACT_ADDRESS!;
    const iface = new Interface(ERC20_ABI);
  
    const eventFragment = iface.getEvent("Transfer");
    const topic = eventFragment.topicHash;
  
    const latestBlock = await this.provider.getBlockNumber();
    const blockRange = 5000;
    const logs: Log[] = [];
  
    try {
      for (let fromBlock = 0; fromBlock <= latestBlock; fromBlock += blockRange) {
        const toBlock = Math.min(fromBlock + blockRange - 1, latestBlock);
        const filter = {
          address: contractAddress,
          topics: [topic, null, `0x${walletAddress.slice(2).padStart(64, "0")}`],
          fromBlock,
          toBlock,
        };
        const partialLogs = await this.provider.getLogs(filter);
        logs.push(...partialLogs);
      }
  
      return logs.map((log) => {
        const parsedLog = iface.parseLog(log);
        const { from, to, value } = parsedLog.args;
        return {
          from,
          to,
          value: parseFloat(formatUnits(value, 18)).toFixed(2),
          blockNumber: log.blockNumber,
          transactionHash: log.transactionHash,
        };
      });
    } catch (error) {
      console.error("Failed to fetch ERC-20 transfers:", error);
      throw new Error("Unable to fetch transactions.");
    }
  }
  
  
}

const ethService = new EthereumService();
export default ethService;
