# LoYahub Wallet Engine

## Description

Esse serviço é responsável por gerenciar wallets de usuários, ele cria wallets, assina transações para os usuarios do negócio sem que necessite transitar a chave privada do usuário entre os sistemas. É essencial para se ter um sistema de pagamentos descentralizado e centralizado.

- O Projeto está configurado na arquitetura hexagonal, com o intuito de ser facilmente integrável com outros sistemas.

## Tecnologias

- Rust
- Diesel
- PostgreSQL
- ethers.rs 

Criptografia de dados:

- Chave simétrica: AES
- Chave assimétrica: ECDSA
- Hash: SHA256
- HMAC: SHA256


## Docker 

- Build: `docker build -t loyahub-wallet-engine .`

- Run: `docker-compose up -d`

- Stop: `docker-compose down`
