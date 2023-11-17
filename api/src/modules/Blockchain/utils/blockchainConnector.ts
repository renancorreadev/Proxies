
import { JsonRpcProvider, Wallet } from "ethers";
import { ClientManager, ClientManager__factory } from "@blockchain";

export type  AddressLocal  = {
  City: string;
  Street: string;
  PostalCode: number;
  HouseNumber: number;
}
export interface ClientData {
  name: string;
  age: number;
  WalletAddress: string;
  paymentStatus: number;
  addressLocal: AddressLocal
}

export class BlockchainConnector {
  private contract: ClientManager;
  protected provider: JsonRpcProvider;
  protected wallet: Wallet;

  constructor(contractAddress: string, provider: string, privateKey: string) {
    this.provider = new JsonRpcProvider(provider);
    this.wallet = new Wallet(privateKey, this.provider);
    this.contract = ClientManager__factory.connect(contractAddress);
  }

  async registerClient(params: ClientData) {
    const {name, age, WalletAddress, paymentStatus, addressLocal} = params;

    const tx = await this.contract.registerClient({
      name,
      age,
      WalletAddress,
      paymentStatus,
      addressLocal
    });

    await tx.wait();
  }
}
