mod config;
mod schema;
mod infrastructure;
mod adapters;
mod core;
mod presentation;

use dotenvy::dotenv;
use std::net::SocketAddr;

#[tokio::main] // Certifique-se de que essa anotação está habilitada corretamente
async fn main() {
    dotenv().ok(); // Carrega variáveis do arquivo .env

    // Cria o roteador para gerenciar as rotas
    let app = presentation::controllers::user_controller::create_router();

    // Define o endereço para o servidor
    let addr = SocketAddr::from(([127, 0, 0, 1], config::get_port().parse().unwrap()));
    println!("Server running at http://{}", addr);

    // Inicia o servidor Axum
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
