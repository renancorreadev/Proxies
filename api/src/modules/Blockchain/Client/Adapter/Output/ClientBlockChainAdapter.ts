import { Injectable, Logger } from '@nestjs/common';
import { ClientBlockchainRequestDto } from '@src/modules/Blockchain/Client/Domain/Dto/HTTPRequest/ClientBlockchainRequestDto';
import { config } from 'dotenv';
import { ClientBlockchainTokenOutputPort } from '@src/modules/Blockchain/Client/Port/Output/ClientBlockchainTokenOutputPort';

config();

@Injectable()
export class ClientBlockchainAdapter implements ClientBlockchainTokenOutputPort {
	private readonly logger = new Logger('ClientBlockchainAdapter');
	private url: string;
	private urlMetadata: string;

	// init(host: string, accreditorName: string): void {
	// 	this.url = `${host}/api/v1/namespaces/default/apis/authorization${accreditorName}/invoke/mintAuthorizationToken`;
	// 	this.urlMetadata = `${host}/api/v1/namespaces/default/apis/authorization${accreditorName}/invoke/setTokenURI`;
	// }

	async createAuthorizationToken(authorizationInput: ClientBlockchainRequestDto): Promise<any> {
		try {
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred while `);
		}
	}
}
