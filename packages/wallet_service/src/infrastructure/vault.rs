use reqwest::Client;
use serde::Deserialize;

use crate::config;

#[derive(Deserialize)]
struct VaultResponse {
    data: VaultData,
}

#[derive(Deserialize)]
struct VaultData {
    data: PrivateKey,
}

#[derive(Deserialize)]
struct PrivateKey {
    private_key: String,
}

/// Salva uma chave privada no Vault
pub async fn store_private_key_in_vault(email: &str, private_key: &str) -> Result<(), Box<dyn std::error::Error>> {
    let vault_endpoint = config::get_vault_endpoint();
    let vault_token = config::get_vault_token();

    let client = Client::new();
    let url = format!("{}/v1/secret/data/{}", vault_endpoint, email);

    let body = serde_json::json!({ "data": { "privateKey": private_key } });

    let response = client
        .post(&url)
        .header("X-Vault-Token", &vault_token)
        .json(&body)
        .send()
        .await?;

    if response.status().is_success() {
        Ok(())
    } else {
        Err(format!("Vault error: {:?}", response.text().await?).into())
    }
}

/// Recupera uma chave privada do Vault
pub async fn retrieve_private_key_from_vault(email: &str) -> Result<String, Box<dyn std::error::Error>> {
    let vault_endpoint = config::get_vault_endpoint();
    let vault_token = config::get_vault_token();

    let client = Client::new();
    let url = format!("{}/v1/secret/data/{}", vault_endpoint, email);

    let response: VaultResponse = client
        .get(&url)
        .header("X-Vault-Token", &vault_token)
        .send()
        .await?
        .json()
        .await?;

    Ok(response.data.data.private_key)
}
