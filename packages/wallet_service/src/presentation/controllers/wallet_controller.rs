use axum::{
    extract::Json,
    response::IntoResponse,
    routing::post,
    Router,
};
use axum::http::StatusCode;
use serde::Deserialize;
use ethers::types::transaction::eip2718::TypedTransaction;
use crate::core::services::wallet_service::{create_wallet, sign_transaction};

#[derive(Deserialize)]
pub struct WalletRequest {
    email: String,
}

#[derive(Deserialize)]
pub struct SignTransactionRequest {
    email: String,
    transaction: TypedTransaction,
}

pub async fn create_wallet_endpoint(Json(request): Json<WalletRequest>) -> impl IntoResponse {
    match create_wallet(&request.email).await {
        Ok(address) => (
            StatusCode::CREATED,
            Json(serde_json::json!({
                "status": "success",
                "address": address.trim() 
            })),
        )
            .into_response(),
        Err(err) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(serde_json::json!({
                "status": "error",
                "message": err.to_string()
            })),
        )
            .into_response(),
    }
}



pub async fn sign_transaction_endpoint(Json(request): Json<SignTransactionRequest>) -> impl IntoResponse {
    match sign_transaction(&request.email, request.transaction).await {
        Ok(signed_tx) => (StatusCode::OK, signed_tx).into_response(),
        Err(err) => (StatusCode::INTERNAL_SERVER_ERROR, err.to_string()).into_response(),
    }
}

pub fn create_router() -> Router {
    Router::new()
        .route("/create", post(create_wallet_endpoint))
        .route("/sign", post(sign_transaction_endpoint))
}
