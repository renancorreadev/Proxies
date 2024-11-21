use axum::{
    extract::Query,
    response::{Json, IntoResponse},
    routing::get,
    Router,
};
use serde::Deserialize;
use crate::core::services::user_service;

#[derive(Deserialize)]
pub struct UserQuery {
    email: String,
}

pub async fn get_user(query: Query<UserQuery>) -> impl IntoResponse {
    match user_service::fetch_user_by_email(&query.email) {
        Some(user) => Json(Some(user)), 
        None => Json(None), 
    }
}


pub fn create_router() -> Router {
    Router::new().route("/user", get(get_user))
}
