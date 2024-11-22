use crate::core::models::user::User;
use crate::infrastructure::database::establish_connection;
use diesel::prelude::*;
use crate::schema::user_entity::dsl::*; // Importa o DSL para a tabela

pub fn get_user_by_email(user_email: &str) -> Option<User> {
    let mut connection = establish_connection();

    user_entity
        .filter(email.eq(user_email))
        .select(User::as_select()) // Explicitly select fields matching `User`
        .first::<User>(&mut connection)
        .ok()
}