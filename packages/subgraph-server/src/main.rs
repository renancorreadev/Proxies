use axum::{
    body::Bytes,
    extract::{Path, Multipart, Query},
    http::StatusCode,
    response::IntoResponse,
    routing::{get, post},
    Router,
};
use serde::Deserialize;
use std::{fs, net::SocketAddr};
use uuid::Uuid;

const STORAGE_DIR: &str = "./subgraphs";

#[derive(Deserialize)]
struct CatQuery {
    arg: String,  // Esse parâmetro será usado para o hash
}

#[tokio::main]
async fn main() {
    // Cria o diretório de armazenamento se não existir
    fs::create_dir_all(STORAGE_DIR).expect("Failed to create storage directory");

    // Define as rotas do servidor
    let app = Router::new()
        .route("/", get(health_check))                // Endpoint para "ping"
        .route("/api/v0/version", get(ipfs_version))  // Endpoint para versão IPFS
        .route("/api/v0/cat", get(cat_file))          // Endpoint para buscar arquivo por hash
        .route("/api/v0/add", post(add_file))         // Endpoint para adicionar arquivo
        .route("/ipfs/:hash", get(get_file_by_hash))  // Endpoint para buscar arquivo pelo hash direto
        .route("/files", get(list_files));            // Endpoint para listar arquivos

    // Configura o endereço para escutar em 0.0.0.0:8081
    let addr = SocketAddr::from(([0, 0, 0, 0], 8081));
    println!("Servidor rodando em http://{}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

// Handler para o "ping"
async fn health_check() -> impl IntoResponse {
    (StatusCode::OK, "IPFS Substitute is running")
}

// Handler para simular o endpoint de versão do IPFS
async fn ipfs_version() -> impl IntoResponse {
    // Responde com a versão simulada do IPFS em JSON
    (StatusCode::OK, "{\"Version\": \"0.9.1\"}")
}

// Handler para simular o endpoint `cat` do IPFS para buscar arquivo pelo hash
async fn cat_file(Query(query): Query<CatQuery>) -> impl IntoResponse {
    let file_path = format!("{}/{}", STORAGE_DIR, query.arg);

    if let Ok(content) = fs::read(&file_path) {
        (StatusCode::OK, Bytes::from(content))
    } else {
        (StatusCode::NOT_FOUND, "File not found".into())
    }
}

// Handler para adicionar um arquivo (simula o `ipfs add`)
async fn add_file(mut multipart: Multipart) -> impl IntoResponse {
    while let Some(field) = multipart.next_field().await.unwrap() {
        let _file_name = field.file_name().unwrap_or("default").to_string();
        let content = field.bytes().await.unwrap();

        let hash = Uuid::new_v4().to_string();
        let file_path = format!("{}/{}", STORAGE_DIR, hash);

        fs::write(&file_path, &content).expect("Failed to write file");

        // Retorna um JSON simulando a resposta do `ipfs add`
        let response = format!("{{\"Name\": \"{}\", \"Hash\": \"{}\"}}", _file_name, hash);
        return (StatusCode::OK, response);
    }

    (StatusCode::BAD_REQUEST, "Failed to process file".to_string())
}

// Handler para buscar arquivo diretamente pelo hash
async fn get_file_by_hash(Path(hash): Path<String>) -> impl IntoResponse {
    let file_path = format!("{}/{}", STORAGE_DIR, hash);

    if let Ok(content) = fs::read(&file_path) {
        (StatusCode::OK, Bytes::from(content))
    } else {
        (StatusCode::NOT_FOUND, "File not found".into())
    }
}

// Handler para listar todos os arquivos armazenados
async fn list_files() -> impl IntoResponse {
    let paths = fs::read_dir(STORAGE_DIR).unwrap();
    let mut file_list = Vec::new();

    for path in paths {
        let file_name = path.unwrap().file_name().into_string().unwrap();
        file_list.push(file_name);
    }

    axum::Json(file_list)
}
