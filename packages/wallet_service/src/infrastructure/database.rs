use diesel::pg::PgConnection;
use diesel::prelude::*;
use crate::config;

pub fn establish_connection() -> PgConnection {
    let database_url = config::get_database_url(); // Configura a URL do banco de dados
    PgConnection::establish(&database_url)
        .expect("Error connecting to the database")
}
