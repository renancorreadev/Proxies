# Usar a imagem base Rust
FROM rust:1.79

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar apenas os arquivos de dependência primeiro (para aproveitar o cache do Docker)
COPY Cargo.toml Cargo.lock ./

# Criar um diretório "src" vazio para permitir o build parcial
RUN mkdir src && echo "// placeholder" > src/lib.rs

# Instalar dependências e compilar parcialmente
RUN cargo build --release

# Remover o placeholder e copiar o restante do código do projeto
RUN rm -rf src
COPY . .

# Compilar o binário no modo release
RUN cargo build --release

# Expor a porta correta
EXPOSE 8084

# Comando para executar o binário
CMD ["./target/release/loyahub-wallet-engine"]
