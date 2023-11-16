import { Injectable, Logger } from '@nestjs/common';
import { AuthorizationRequestDto } from '@src/Blockchain/Domain/Dto/RequestsDtos/AuthorizationRequestDto';
import { config } from 'dotenv';
import { AuthorizationTokenOutputPort } from '@src/Blockchain/Port/Output/AuthorizationTokenOutputPort';

config();

@Injectable()
export class AuthorizationBlockChainAdapter implements AuthorizationTokenOutputPort {
	private readonly logger = new Logger('AuthorizationAdapter');
	private url: string;
	private urlMetadata: string;

	// init(host: string, accreditorName: string): void {
	// 	this.url = `${host}/api/v1/namespaces/default/apis/authorization${accreditorName}/invoke/mintAuthorizationToken`;
	// 	this.urlMetadata = `${host}/api/v1/namespaces/default/apis/authorization${accreditorName}/invoke/setTokenURI`;
	// }

	async createAuthorizationToken(authorizationInput: AuthorizationRequestDto): Promise<any> {
		try {
		} catch (e) {
			const errorMessage = e.response ? e.response.data : e.message;
			this.logger.error(`Error : ${JSON.stringify(errorMessage)}`);
			throw new Error(`An error ocurred while `);
		}
	}
}
