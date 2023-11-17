import { BlockchainConnector } from '@src/helper/blockchain/BlockchainConnector';

export type AddressLocal = {
  City: string;
  Street: string;
  PostalCode: number;
  HouseNumber: number;
};

export interface ClientData {
  name: string;
  age: number;
  WalletAddress: string;
  paymentStatus: number;
  addressLocal: AddressLocal;
}

export class ClientBlockchainConnectorAdapter extends BlockchainConnector {
  
  // Setters blockchain States
  async registerClient(params: ClientData) {
    try {
      const { name, age, WalletAddress, paymentStatus, addressLocal } = params;

      const tx = await this.contract.registerClient({
        name,
        age,
        WalletAddress,
        paymentStatus,
        addressLocal
      }, 
      {
        gasLimit: 500000,
        gasPrice: 0,
      }
      );
  
      await tx.wait();
    } catch (e) {
      throw new Error(`An error ocurred in write contract registerClient function on blockchain evm `);
    }
  }

  // Getters blockchain States
  async getClientData(clientId: number): Promise<ClientData> {
    try {
      const rawData = await this.contract.getClientData(clientId);
  
      // Transforming the data to object readable
      const formattedData: ClientData = {
        name: rawData[0],
        age: parseInt(rawData[1].toString()),
        WalletAddress: rawData[2],
        paymentStatus: parseInt(rawData[3].toString()),
        addressLocal: {
          City: rawData[4][0],
          Street: rawData[4][1],
          PostalCode: parseInt(rawData[4][2].toString()),
          HouseNumber: parseInt(rawData[4][3].toString())
        }
      };
  
      return formattedData;
    } catch (e) {
      throw new Error(`An error ocurred in read contract getClientData on blockchain evm `);
    }
  }
  
}