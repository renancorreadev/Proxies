import { Injectable, Logger } from '@nestjs/common';
import { config } from 'dotenv';
import { ClientBlockchainTokenOutputPort } from '@src/modules/Blockchain/Client/Port/Output/ClientBlockchainTokenOutputPort';
import { BlockchainConnector, ClientData, AddressLocal } from '../../../utils/blockchainConnector';

// DTO 
import { RegisterClientRequestDto } from '@src/modules/Blockchain/Client/Domain/Dto/HTTPRequest/ClientBlockchainRequestDto';


config();

@Injectable()
export class ClientBlockchainAdapter implements ClientBlockchainTokenOutputPort {
	private readonly logger = new Logger('ClientBlockchainAdapter');


	async registerClient(registerClientBlockchainDto: RegisterClientRequestDto): Promise<any> {
		try {
			const { name, age, WalletAddress, paymentStatus, address } = registerClientBlockchainDto;

			const contract = new BlockchainConnector(
				process.env.CONTRACT_ADDRESS,
				process.env.PROVIDER,
				process.env.PRIVATE_KEY
			);

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

			return await contract.registerClient(payload);
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred while `);
		}
	}
}
