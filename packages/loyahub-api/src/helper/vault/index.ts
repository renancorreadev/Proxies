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

export async function getPrivateKeyFromVault(email: string): Promise<string> {
	const headers = {
		'X-Vault-Token': process.env.VAULT_TOKEN,
		'Content-Type': 'application/json',
	};

	try {
		const vaultUrl = `${process.env.VAULT_ENDPOINT}/v1/secret/data/${email}`;
		const response = await axios.get(vaultUrl, { headers });

		if (response.status === 200 && response.data?.data?.data?.privateKey) {
			return response.data.data.data.privateKey;
		} else {
			throw new Error('Private key not found or access denied.');
		}
	} catch (error) {
		const errorMessage = error.response?.data || error.message || 'Unknown error';
		console.error(`Error retrieving private key from Vault: ${JSON.stringify(errorMessage)}`);
		throw new Error(`Error retrieving private key from Vault: ${JSON.stringify(errorMessage)}`);
	}
}
