import axios from 'axios';

export async function storePrivateKeyInVault(email: string, privateKey: string): Promise<string> {
	console.log('email', email);
	console.log('privateKey', privateKey);
	const headers = {
		'X-Vault-Token': process.env.VAULT_TOKEN,
		'Content-Type': 'application/json',
	};

	const data = {
		data: {
			privateKey: privateKey,
		},
	};

	try {
		const vaultUrl = `${process.env.VAULT_ENDPOINT}/v1/secret/data/${email}`;

		const response = await axios.post(vaultUrl, data, { headers });

		if (response.status === 200 || response.status === 204) {
			return `Key successfully stored in Vault for user: ${email}`;
		} else {
			throw new Error(`Unexpected response status: ${response.status}`);
		}
	} catch (error) {
		const errorMessage = error.response?.data || error.message || 'Unknown error';
		console.error(`Error storing key in Vault: ${JSON.stringify(errorMessage)}`);
		throw new Error(`Error storing key in Vault: ${JSON.stringify(errorMessage)}`);
	}
}
