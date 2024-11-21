    use std::env;

    /// Retorna a URL de conexão ao banco de dados a partir da variável de ambiente.
    pub fn get_database_url() -> String {
        env::var("CONNECTION_STRING").expect("CONNECTION_STRING must be set")
    }

    pub fn get_port() -> String {
        env::var("PORT").expect("PORT must be set")
    }
