
# Customer Rewards API

## Índice
- [Customer Rewards API](#customer-rewards-api)
  - [Índice](#índice)
  - [Visão Geral](#visão-geral)
  - [Arquitetura Hexagonal](#arquitetura-hexagonal)
    - [Principais Rotas](#principais-rotas)
      - [Clientes](#clientes)
      - [Pontos](#pontos)
      - [Metadata](#metadata)
  - [Instalação e Configuração](#instalação-e-configuração)
  - [Uso](#uso)
  - [Contribuição](#contribuição)
  - [Licença](#licença)

## Visão Geral

Este repositório contém o projeto back-end para o protocolo Customer Rewards em blockchain. O projeto foi desenvolvido com a arquitetura hexagonal, utilizando o conceito de ports e adapters para melhorar a legibilidade e manutenção do código.

## Arquitetura Hexagonal

A estrutura de diretórios do projeto é organizada da seguinte maneira:

```plaintext
api/
├── src
│   ├── modules
│   │    ├── Blockchain 
│   │    │    ├── Client 
│   │    │    │    ├── Adapter
│   │    │    │    │    ├── Input
│   │    │    │    │    ├── Output
│   │    │    │    ├── Domain 
│   │    │    │    │    ├── DTO
│   │    │    │    │    ├── Service.ts
│   │    │    │    ├── Port  
│   │    │    │    │    ├── Input
│   │    │    │    │    ├── Output
│   │    │    ├── Payment
│   │    │    │    ├── Adapter
│   │    │    │    │    ├── Input
│   │    │    │    │    ├── Output
│   │    │    │    ├── Domain 
│   │    │    │    │    ├── DTO
│   │    │    │    │    ├── Service.ts
│   │    │    │    ├── Port  
│   │    │    │    │    ├── Input
│   │    │    │    │    ├── Output
│   │    │    ├── Management
│   │    │    │    ├── Adapter
│   │    │    │    │    ├── Input
│   │    │    │    │    ├── Output
│   │    │    │    ├── Domain 
│   │    │    │    │    ├── DTO
│   │    │    │    │    ├── Service.ts
│   │    │    │    ├── Port  
│   │    │    │    │    ├── Input
│   │    │    │    │    ├── Output
│   │    ├── Gym
```

### Principais Rotas

#### Clientes
- POST /api/v1/client/new -> Cria um novo Cliente 
- GET /api/v1/client/{id} -> Traz informações do cliente 
- GET /api/v1/client/dataBy/{age} -> Traz informações do cliente pela idade 
- GET /api/v1/client/dataBy/{wallet} -> Traz informações do cliente pela wallet blockchain

#### Pontos
- POST /api/v1/points/add -> Adiciona pontos para um usuário pelo id 
- GET /api/v1/points/{id} -> Recupera os pontos de um usuário pelo id
- GET /api/v1/points/level/{id} -> Recupera o nível do usuário
- GET /api/v1/points/nfts/all -> Recupera todos os NFTs que o usuário possui
- GET /api/v1/points/nfts/simple -> Verifica se o usuário possui um NFT específico

#### Metadata
- POST /api/v1/metadata/new -> Registra um novo Metadata 
- GET /api/v1/metadata/{tokenID} -> Recupera um Metadata registrado
- PATCH /api/v1/metadata/{tokenID} -> Atualiza um Metadata registrado 
- DELETE /api/v1/metadata/{tokenID} -> Deleta um Metadata existente

## Instalação e Configuração
Instruções detalhadas sobre como instalar e configurar o projeto.

## Uso
Guia de como usar a API, incluindo exemplos de requests e respostas.

## Contribuição
Diretrizes para contribuir para o projeto.

## Licença
Informações sobre a licença do projeto.
