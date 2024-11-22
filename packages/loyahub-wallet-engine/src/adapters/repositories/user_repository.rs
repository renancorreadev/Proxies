use crate::core::models::user::User;
use crate::infrastructure::database::establish_connection;
use crate::schema::user_entity::dsl::*;
use diesel::prelude::*; // Importa o DSL para a tabela

pub fn get_user_by_email(user_email: &str) -> Option<User> {
    let mut connection = establish_connection();

    user_entity
        .filter(email.eq(user_email))
        .select(User::as_select())
        .first::<User>(&mut connection)
        .ok()
}
