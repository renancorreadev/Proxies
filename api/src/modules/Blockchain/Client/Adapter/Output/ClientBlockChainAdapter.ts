import { Injectable, Logger } from '@nestjs/common';
import { config } from 'dotenv';
import { ClientBlockchainTokenOutputPort } from '@src/modules/Blockchain/Client/Port/Output/ClientBlockchainTokenOutputPort';


// DTO 
import { RegisterClientRequestDto } from '@src/modules/Blockchain/Client/Domain/Dto/HTTPRequest/ClientBlockchainRequestDto';
import { AddressLocal, ClientBlockchainConnectorAdapter, ClientData } from './ClientBlockchainConnectorAdapter';

config();

@Injectable()
export class ClientBlockchainAdapter implements ClientBlockchainTokenOutputPort {
	private readonly logger = new Logger('ClientBlockchainAdapter');
	private contractInstance: ClientBlockchainConnectorAdapter;
	
	constructor () {
		this.contractInstance = new ClientBlockchainConnectorAdapter(
			process.env.CONTRACT_ADDRESS,
			process.env.PROVIDER,
			process.env.PRIVATE_KEY
		);
	}


	async registerClient(registerClientBlockchainDto: RegisterClientRequestDto): Promise<any> {
		try {
			const { name, age, WalletAddress, paymentStatus, address } = registerClientBlockchainDto;

			const addressLocal: AddressLocal  = {
				City: address.City,
				Street: address.Street,
				PostalCode: address.PostalCode,
				HouseNumber: Number(address.HouseNumber)
			}
			const payload: ClientData = {
				name,
				age,
				WalletAddress,
				paymentStatus,
				addressLocal
			}

			return await this.contractInstance.registerClient(payload);
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in write contract registerClient function on blockchain `);
		}
	}

	async getClientData(clientId: number): Promise<ClientData> {
		try {
			return await this.contractInstance.getClientData(clientId);
	} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred in read contract getClientData on blockchain `);
		}
	}
}
