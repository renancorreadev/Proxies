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

    //@dev create routers
    let user_router = presentation::controllers::user_controller::create_router();
    let wallet_router = presentation::controllers::wallet_controller::create_router();


    let app = Router::new()
        .nest("/user", user_router)  
        .nest("/wallet", wallet_router); 

    let addr = SocketAddr::from(([0, 0, 0, 0], config::get_port().parse().unwrap()));

    println!("Server running at http://{}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
