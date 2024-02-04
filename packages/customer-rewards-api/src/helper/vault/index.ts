import axios from 'axios';

export async function storePrivateKeyInVault(email: string, privateKey: string): Promise<string> {
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
		await axios.post(`${process.env.VAULT_ENDPOINT}/v1/${process.env.VAULT_URL}${email}`, data, { headers });
		const successMessage = `Key successfully stored in Vault for user: ${email}`;

		return successMessage;
	} catch (error) {
		let errorMessage = 'Error storing key in Vault';
		if (error.response) {
			errorMessage += `: ${error.response.data}`;
		} else if (error.request) {
			errorMessage += ': No response received from Vault';
		} else {
			errorMessage += `: ${error.message}`;
		}
		console.error(errorMessage);
		throw new Error(errorMessage);
	}
}
