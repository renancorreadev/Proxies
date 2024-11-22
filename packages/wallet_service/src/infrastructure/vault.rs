use reqwest::Client;
use serde::Deserialize;

use crate::config;

#[derive(Deserialize)]
struct VaultResponse {
    data: OuterData,
}

#[derive(Deserialize)]
struct OuterData {
    data: InnerData,
}

#[derive(Deserialize)]
struct InnerData {
    #[serde(rename = "privateKey")] // Mapeia o nome do campo para corresponder ao JSON
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

pub async fn retrieve_private_key_from_vault(email: &str) -> Result<String, Box<dyn std::error::Error>> {
    let vault_endpoint = config::get_vault_endpoint();
    let vault_token = config::get_vault_token();

    let client = Client::new();
    let url = format!("{}/v1/secret/data/{}", vault_endpoint, email);

    let response_text = client
        .get(&url)
        .header("X-Vault-Token", &vault_token)
        .send()
        .await?
        .text()
        .await?;

    println!("Vault Response: {}", response_text); // Log para depuração

    // Ajusta a desserialização para lidar com dois níveis de `data`
    let response: VaultResponse = serde_json::from_str(&response_text)?;
    Ok(response.data.data.private_key)
}
