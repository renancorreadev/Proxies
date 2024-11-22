// @generated automatically by Diesel CLI.

diesel::table! {
    customer (clientID) {
        clientID -> Int4,
        name -> Varchar,
        age -> Int4,
        walletAddress -> Varchar,
        paymentStatus -> Int4,
        points -> Nullable<Int4>,
        addressLocal -> Json,
        createdAt -> Timestamp,
        updatedAt -> Timestamp,
    }
}

diesel::table! {
    metadata (id) {
        id -> Int4,
        tokenID -> Int4,
        customer -> Varchar,
        description -> Varchar,
        image -> Varchar,
        insight -> Varchar,
        attributes -> Jsonb,
        createdAt -> Timestamp,
        updatedAt -> Timestamp,
    }
}

diesel::table! {
    user_entity (id) {
        id -> Int4,
        username -> Varchar,
        email -> Varchar,
        password -> Varchar,
        walletAddress -> Nullable<Varchar>,
        profileImageUrl -> Nullable<Varchar>,
        isAdmin -> Bool,
        createdAt -> Timestamp,
        updatedAt -> Timestamp,
        age -> Nullable<Int4>,
        address -> Nullable<Jsonb>,
        paymentStatus -> Int4,
    }
}


diesel::allow_tables_to_appear_in_same_query!(
    customer,
    metadata,
    user_entity,
);
