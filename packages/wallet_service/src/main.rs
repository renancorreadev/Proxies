mod config;
mod schema;
mod infrastructure;
mod adapters;
mod core;
mod presentation;

use dotenvy::dotenv;
use std::net::SocketAddr;
use axum::Router;

#[tokio::main]
async fn main() {
    dotenv().ok();

    // Roteadores das funcionalidades
    let user_router = presentation::controllers::user_controller::create_router();
    let wallet_router = presentation::controllers::wallet_controller::create_router();

    // Aplicativo principal com sub-rotas
    let app = Router::new()
        .nest("/user", user_router)  
        .nest("/wallet", wallet_router); 

    // Inicializando o servidor
    let addr = SocketAddr::from(([127, 0, 0, 1], config::get_port().parse().unwrap()));
    println!("Server running at http://{}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
