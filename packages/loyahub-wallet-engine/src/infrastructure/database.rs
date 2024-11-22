use crate::config;
use diesel::pg::PgConnection;
use diesel::prelude::*;

pub fn establish_connection() -> PgConnection {
    let database_url = config::get_database_url();
    PgConnection::establish(&database_url).expect("Error connecting to the database")
}
