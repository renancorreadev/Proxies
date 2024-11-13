# Etapa de construção
FROM rust:1.72 as builder

WORKDIR /usr/src/app

# Copia os arquivos Cargo.toml e Cargo.lock para cache de dependências
COPY Cargo.toml Cargo.lock ./

# Baixa as dependências
RUN cargo fetch

# Copia o restante do código fonte
COPY . .

# Compila o projeto
RUN cargo build --release

# Etapa final, usando uma imagem com glibc mais recente
FROM debian:bookworm-slim

# Instala as dependências necessárias (opcional)
RUN apt-get update && apt-get install -y libssl-dev ca-certificates && rm -rf /var/lib/apt/lists/*

# Copia o binário compilado
COPY --from=builder /usr/src/app/target/release/subgraph_server /usr/local/bin/servidor_rust

# Exponha a porta 8081
EXPOSE 8081

# Comando para iniciar o servidor
CMD ["servidor_rust"]
