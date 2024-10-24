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
} from "ethers";
import { validateMnemonic } from "bip39";
import axios from "axios";

// ABI para ERC-20
const ERC20_ABI = [
  // Eventos
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",


  "function name() view returns (string)", // Nome do token
  "function symbol() view returns (string)", // Símbolo do token
  "function decimals() view returns (uint8)", // Casas decimais
  "function totalSupply() view returns (uint256)", // Suprimento total
  "function balanceOf(address owner) view returns (uint256)", // Saldo de um endereço

  
  "function transfer(address to, uint256 amount) returns (bool)", // Transferência de tokens
  "function approve(address spender, uint256 amount) returns (bool)", // Aprova o uso de tokens por terceiros
  "function transferFrom(address from, address to, uint256 amount) returns (bool)" // Transferência delegada
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
      // Estima o gas (mesmo que seja 0)
      const gasEstimate = await this.provider.estimateGas(tx);
  
      // Obtenha informações sobre taxas, mas trate zero gas de forma segura
      const feeData = await this.provider.getFeeData();
      const gasFee = feeData.maxFeePerGas || BigInt(0); // Tratar zero gas
  
  
  
      return {
        gasEstimate: formatEther(BigInt(gasEstimate)), // Exibe gas estimado em Ether
        totalCost: formatEther(amountInWei), // Custo total é apenas o valor enviado
        totalCostMinusGas: formatEther(amountInWei), // Sem gas, o custo total é igual ao valor
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

  async getERC20BalanceWei(walletAddress: AddressLike): Promise<{ balance: bigint }> {
    const contractAddress = process.env.EXPO_PUBLIC_ERC20_CONTRACT_ADDRESS!;
    const contract = new Contract(contractAddress, ERC20_ABI, this.provider);

    try {
      const balance: bigint = await contract.balanceOf(walletAddress);
      return { balance };
    } catch (error) {
      console.error("Failed to fetch ERC-20 balance:", error);
      throw new Error("Unable to fetch token balance.");
    }
  }


  async getBalance(address: AddressLike): Promise<bigint> {
    try {
      const data = await this.getERC20BalanceWei(address);
      return data.balance;
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

  async derivePrivateKeysFromPhrase(
    phrase: string,
    derivationPath: string = "m/44'/60'/0'/0/0"
  ): Promise<{ privateKey: string; address: string }> {
    if (!validateMnemonic(phrase)) {
      throw new Error("Invalid mnemonic phrase");
    }

    try {
      // Cria a instância do mnemonic e gera a carteira no caminho especificado
      const mnemonic = Mnemonic.fromPhrase(phrase);
      const wallet = HDNodeWallet.fromMnemonic(mnemonic, derivationPath);

      const privateKey = wallet.privateKey;
      const address = await wallet.getAddress();

      return { privateKey, address };
    } catch (error: any) {
      console.error("Error deriving private key:", error);
      throw new Error("Failed to derive private key from phrase.");
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
    const query = `
      {
        transfers(where: { to: "${walletAddress.toLowerCase()}" }) {
          id
          from
          to
          value
          blockTimestamp  # Certifique-se de que o subgraph indexa este campo
        }
      }
    `;

    try {
      const response = await axios.post(
        "http://localhost:8000/subgraphs/name/drex",
        { query },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.errors) {
        console.error("GraphQL errors:", response.data.errors);
        throw new Error("Failed to fetch ERC-20 transfers.");
      }

      const transfers = response.data.data.transfers;

      return transfers.map((transfer: any) => ({
        id: transfer.id,
        from: transfer.from,
        to: transfer.to,
        value: parseFloat(formatUnits(transfer.value.toString(), 18)).toFixed(2),
        date: transfer.blockTimestamp
      }));
    } catch (error: any) {
      console.error("Failed to fetch ERC-20 transfers:", error);
      throw new Error("Unable to fetch transactions.");
    }
  }

  async transferERC20(
    fromPrivateKey: string, 
    toAddress: AddressLike, 
    amount: string 
  ): Promise<any> {
    const contractAddress = process.env.EXPO_PUBLIC_ERC20_CONTRACT_ADDRESS!;
    const signer = new Wallet(fromPrivateKey, this.provider); // Assinador com chave privada
    const contract = new Contract(contractAddress, ERC20_ABI, signer); // Instância do contrato ERC-20
  
    try {
      console.log("amount", amount);
      const amountInWei = parseEther(amount);
  
      // Configura a transação com gasPrice = 0 para taxa zero
      const tx = await contract.transfer(toAddress, amountInWei, {
        gasPrice: 0n, // gasPrice zero para redes que permitem
        gasLimit: 100000, // Definir um limite razoável para gas
      });
  
      console.log(`Transferência enviada: ${tx.hash}`);
  
      // Aguarde a transação ser minerada
      await tx.wait();
  
      console.log("Transferência confirmada!");
  
      return tx; // Retorna os detalhes da transação
    } catch (error: any) {
      console.error("Transferência ERC-20 falhou:", error);
      throw new Error("Não foi possível transferir os tokens ERC-20.");
    }
  }
  

 

}
  
  


const ethService = new EthereumService();
export default ethService;
