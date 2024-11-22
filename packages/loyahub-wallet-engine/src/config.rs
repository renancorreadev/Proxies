use std::env;

pub fn get_database_url() -> String {
    env::var("CONNECTION_STRING").expect("CONNECTION_STRING must be set")
}

pub fn get_port() -> String {
    env::var("PORT").expect("PORT must be set")
}

pub fn get_vault_endpoint() -> String {
    env::var("VAULT_ENDPOINT").expect("VAULT_ENDPOINT must be set")
}

pub fn get_vault_token() -> String {
    env::var("VAULT_TOKEN").expect("VAULT_TOKEN must be set")
}
