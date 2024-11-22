use crate::adapters::repositories::user_repository;

pub fn fetch_user_by_email(email: &str) -> Option<crate::core::models::user::User> {
    user_repository::get_user_by_email(email)
}
