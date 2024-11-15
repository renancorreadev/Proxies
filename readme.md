# LoyaHub Blockchain 

```shell
pnpm install --recursive
```
- [Customer Rewards Blockchain](#loyahub-blockchain)
  - [Visão Geral](#visão-geral)
  - [Auto Code Review GPT](#auto-code-review-gpt)
  - [Interação com a Blockchain](#interação-com-a-blockchain)
  - [Gerenciamento de Metadados de NFTs](#gerenciamento-de-metadados-de-nfts)
  - [API HTTP e Swagger](#api-http-e-swagger)
  - [Tecnologias](#tecnologias)
  - [Ciclo de nova Feature:](#ciclo-de-nova-feature)
  - [Estrutura de pastas](#estrutura-de-pastas)
- [Desenvolvimento](#desenvolvimento)
  - [📌 Pendências](#-pendências)
  - [🚀 Em Progresso](#-em-progresso)
  - [✅ Concluídas](#-concluídas)
  - [🧠 Ideias para Explorar](#-ideias-para-explorar)
  - [🛠️ Melhorias Futuras](#️-melhorias-futuras)
  - [📚 Documentação](#-documentação)


## Visão Geral

O projeto **LoyaHub Blockchain** é uma solução desenvolvida baseada em serviços  para otimizar a gestão de clientes com pontuação e emitir tokens de benefícios no ecossistema de blockchain privada. Utilizando **Hyperledger Besu** para gerenciar rede privada com o protocolo QBFT em conjunto com uma aplicação back-end equipada com os recursos das capacidades avançadas do [NestJS](https://nestjs.com/), um framework para aplicações server-side em Node.js, uma aplicação desenvolvida em golang separada apenas para interação com blockchain e escuta de eventos dos contratos inteligentes **(solidity)** diretamente no nó rpc do besu. Em desenvolvimento temos a dashboard ui do admin onde será feito a integração com apache Kafta, Grafana, Prometheus e Keycloak para authenticação. 

> O Projeto possui 6 módulos em desenvolvimento:

- `loyahub-blockchain-service`
- `loyahub-api`
- `loyahub-admin-ui`
- `loyahub-app`
- `loyahub-smart-contracts`
- `loyahub-doc`
- `loyahub-wallet`

 #### -> loyahub-blockchain-service

 O projeto é um micro serviço desenvolvido em golang para interação com a blockchain e escuta de eventos dos contratos inteligentes **(solidity)** diretamente no nó rpc do besu, ele é responsavel por escutar eventos e executar ações no banco de dados, como alterar a metadata do NFT de um cliente baseado no saldo de pontos que ele possui. É um módulo fundamental para o projeto pois ele é o responsável por intermediar as ações do usuário com a blockchain. 

 #### -> loyahub-api

 O projeto **loyahub-api** é um projeto back-end desenvolvido em **NestJS** que possui a responsabilidade de intermediar as ações do usuário com todo ecossistema, ele possui vários sub-módulos essenciais para regra de negócio do projeto, como:  

 - `Authentication`
 - `Blockchain`
 - `Points`
 - `Metadata`
 - `User`

 #### ->  loyahub-admin-ui
Esse módulo é uma aplicação desenvolvida em **React** que possui a responsabilidade de intermediar as ações de back-office, nele é possivel cadastrar novos clientes, emitir pontos, emitir tokens, alterar metadata dos NFTs e visualizar logs de eventos.


#### -> loyahub-app

Esse módulo é um front-end desenvolvido em **React** que possui a responsabilidade de ser a apresentação visual para o cliente final, nele é possivel visualizar os benefícios adquiridos, pontos adquiridos e visualizar o NFT.

#### -> loyahub-smart-contracts

Esse é o módulo de contratos inteligentes desenvolvidos em **Solidity** que possui a responsabilidade de gerenciar a lógica de negócio do projeto, ele é responsavel por emitir pontos, emitir tokens, alterar metadata dos NFTs e visualizar logs de eventos em blockchain.

#### -> loyahub-doc

Esse módulo é um projeto desenvolvido em **Docusaurus** que possui a responsabilidade de ser a documentação do projeto, nele é possivel visualizar a documentação técnica do projeto, como: como instalar, como configurar, como usar, arquitetura, etc.

#### -> loyahub-wallet

Esse módulo é um projeto desenvolvido em **React Native** que possui a responsabilidade de ser a carteira digital do cliente, nele é possivel visualizar os benefícios adquiridos, pontos adquiridos e visualizar o NFT.

> Este projeto possui todos pacotes (packages) incorporados na arquitetura hexagonal com inversão de dependências, garantindo um design modular e de fácil manutenção.

## Auto Code Review GPT
<em> O projeto está equipado com uma infraestrutura para code review lançados pelo GPT-4 e GPT3 toda vez que um Pull Request é aberto, essa etapa foi desenvolvida para melhorar a qualidade do código e abertura de novas ideias durante o fechamento da PR, você pode ver mais em `infra/code-review-gpt` </em>

![Auto Code Review](docs/images/auto_code_review.png)


## Interação com a Blockchain

A essência do projeto reside na sua capacidade de interagir com a blockchain, permitindo o monitoramento e reação a eventos específicos da rede em tempo real. Isso é alcançado por meio de um micro-serviço dedicado, que escuta eventos na blockchain e executa ações correspondentes, como a atualização de registros de clientes, emissão de pontos para determinado cliente, emissão de tokens baseado em NFTs para representar uma `insignia` ou nível `level` em que um cliente se encontra dependendo do saldo de pontos que esse indivíduo possui.

## Gerenciamento de Metadados de NFTs

Uma característica central do sistema é o gerenciamento de metadados de NFTs, essencial para o registro, adição de pontos e atualização dos níveis dos clientes (`1` | `2` | `3`). Os NFTs são usados para representar diferentes níveis de clientes, como (`CUSTOMER_PREMIUM` | `CUSTOMER_GOLD` | `CUSTOMER_TITANIUM`), cada um com benefícios exclusivos. Os clientes acumulam pontos através de interações e compras, e esses pontos determinam o nível do NFT que lhes é atribuído. A mudança de níveis é refletida automaticamente pelo micro-serviço desenvolvido em go nos metadados do NFT correspondente, assegurando uma representação precisa do status do cliente.

> Aqui tem um exemplo de como é definidido as Metadata pelo tokenID de um usuario:

```json
{
  "tokenID": 2,
  "customer": "John Doe dos Santos",
  "description": "Você está no nível I com a insígnia Customer Premium",
  "image": "https://meusite.com/imagens/nft/1.png",
  "insight": "CUSTOMER_PREMIUM",
  "attributes": {
    "points": 240,
    "level": 1,
    "benefits": [
      {
        "level_type": "Nível",
        "value": 1
      },
      {
        "nft_type": "NFT",
        "value": "CUSTOMER_TITANIUM"
      },
      {
        "benefit_type": "Benefits",
        "value": [
          {
            "discount": "20%",
            "description": "Desconto de 20% em todos os produtos."
          },
          {
            "FreeFrete": "Frete GRATIS",
            "description": "Frete GRATIS no seu estado."
          },
          {
            "description": "Com esse benefício voce tem acesso ao nivel 1 do catalogo de promoção",
            "promotionLevel3": "Promoção nivel 1"
          }
        ]
      }
    ]
  },
  "databaseId": 8,
  "createdAt": "2023-11-23T16:43:47.683Z",
  "updatedAt": "2023-11-23T16:43:47.683Z"
}
```

## API HTTP e Swagger

O sistema também conta com uma API HTTP integrada para gerenciar os metadados dos NFTs. Isso inclui endpoints para consulta e atualização dos metadados baseados nos tokenIDs. A integração com o Swagger oferece uma documentação clara e interativa da API, facilitando o uso e a integração por parte dos desenvolvedores.

> Abaixo você pode ver uma breve ilustração:
> ![Swagger](docs/images/swagger.png)

## Tecnologias

<div style="text-align: center;">
  <img src="https://repository-images.githubusercontent.com/206414745/a9aaa900-127c-11ea-8095-5139ce4e7a09" alt="Hyperledger" style="width: 200px; height: 90px; margin: 1rem;">
  <img src="https://github.com/remojansen/logo.ts/raw/master/ts.png" alt="TypeScript" style="width: 100px; height: 90px; margin: 1rem;">
  <img src="https://github.com/rfyiamcool/golang_logo/raw/master/png/golang_58.png" alt="Go" style="width: 180px; height: 90px; margin: 1rem;">
  <img src="https://nestjs.com/img/logo-small.svg" alt="NestJS" style="width: 150px; height: 90px; margin: 1rem;">
  <img src="https://raw.githubusercontent.com/github/explore/ba9de12f88fd08825c51928e91f1678cb5c94b26/topics/solidity/solidity.png" alt="Solidity" style="width: 150px; height: 90px; margin: 1rem;">
</div>

- NestJs
- Golang
- React
- Typescript
- Solidity
- PostgreeSQL
- TypeOrm
- EthereumGo

## Ciclo de nova Feature:

> O Planejamento para desenvolvimento de uma nova feature para esse projeto com um longo escopo está definida para seguir esse padrão abaixo:

![Alt text](docs/images/plainning.png)

1. Inicia se o desenvolvimento da feature na blockckchain com os contratos inteligentes que são atualizaveis com o  
   ERC1967Proxy.
1. Parte para o desenvolvimento da solução da feature na escuta dos eventos com o micro serviço desenvolvido em Go para gerenciamento de eventos e acionamentos de cronJobs.
1. Parte se para o desenvolvimento da solução da feature para o back-end, desenvolvendo-se os casos de uso, rotas, entidades e dominios para se atender.
1. Parte se para o desenvolvimento da solução no front end no React.

- O Projeto está sendo gerenciado pelo lerna, existem alguns scripts para serem executados na execução do projeto:

```file
monoRepo/
├─ docs/
├─ packages/
├── package.json
```

```json
 "scripts": {
    "run-infra": "bash scripts/run-infra.sh",
    "stop-infra": "bash scripts/stop-infra.sh",
    "start:full": "lerna run --parallel --stream --no-bail dev --scope loyahub-api --scope loyahub-blockchain-service --scope loyahub-admin-ui --scope loyahub-app --scope loyahub-doc",
    "start:dev": "lerna run --parallel --stream dev --scope loyahub-api --scope loyahub-blockchain-service",
    "bs:download": "lerna run --scope loyahub-blockchain-service --stream download",
    "bs": "lerna run --scope loyahub-blockchain-service --stream dev --ignore-missing ",
    "api": "lerna run --scope loyahub-api --stream dev",
    "ui": "lerna run --scope loyahub-app --stream dev",
    "admin:ui": "lerna run --scope loyahub-admin-ui --stream dev",
    "api:test": "lerna run --scope loyahub-api test",
    "sc": "lerna run --scope loyahub-smart-contracts compile",
    "sc:test": "lerna run --scope loyahub-smart-contracts test",
    "sc:compile": "lerna run --scope loyahub-smart-contracts compile",
    "sc:deploy:client:core": "lerna run --scope loyahub-smart-contracts deploy-client-core",
    "sc:upgrade:client:core": "lerna run --scope loyahub-smart-contracts upgrade-client-core",
    "deploy-sc": "pnpm sc:deploy:client:core && pnpm sc:deploy:points:core",
    "sc:deploy:points:core": "lerna run --scope loyahub-smart-contracts deploy-points-core",
    "sc:upgrade:points:core": "lerna run --scope smart-contracts upgrade-points-core",
    "sc:clean": "lerna run --scope smart-contracts cache",
    "code-review": "cd infra/code-review-gpt && pnpm review",
    "doc": "lerna run --scope loyahub-doc start",
    "clean": "lerna run clean",
    "clear": "rm -rf node_modules && rm -rf packages/loyahub-api/node_modules && rm -rf packages/loyahub-app/node_modules && packages/loyahub-smart-contracts/node_modules && rm -rf packages/loyahub-admin-ui/node_modules",
    "build": "pnpm recursive run build",
    "test": "pnpm recursive run test",
    "link": "lerna bootstrap"
  },
```

| Comando     | Descrição                                                                                                                          |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `start:dev` | Executa paralelamente todos os aplicativos relacionados ao protocolo de gerenciamento de clientes (API, UI, e serviço blockchain). |
| `dev`       | Executa paralelamente a API e a UI do gerenciador de clientes.                                                                     |
| `sc`        | Executa o comando de compilação no projeto de smart contracts.                                                                     |
| `bs`        | Executa o micro serviço blockchain.                                                                                                |
| `api`       | Executa a API do gerenciador de clientes.                                                                                          |
| `ui`        | Executa a interface do usuário (UI) do gerenciador de clientes.                                                                    |
| `clean`     | Executa o comando de limpeza em todos os pacotes do monorepo.                                                                      |
| `build`     | Executa o comando de build em todos os pacotes do monorepo de forma recursiva.                                                     |
| `test`      | Executa testes em todos os pacotes do monorepo de forma recursiva.                                                                 |

# Desenvolvimento

## 📌 Pendências

- loyahub-blockchain-service
  - [x] Integrar banco de dados PostGree no Micro Serviço Go
  - [ ] Implementar testes unitários do micro serviço

- loyahub-admin-ui 
  - [] Implementar Elastick Search para monitoramento de eventos 
  - [x] Implementar Grafana para visualização de logs em tempo real da infraestrutura

- loyahub-api
  - [x] Implementar novas rotas para interagir com os contratos inteligentes 
  - [x] Configurar e implementar WebSocket para eventos 
  - [x] Configurar e implementar Prometheus para Kafta
  - [x] Configurar e implementar Apache Kafta 
  - [x] Confiturar e implementar Grafana 
  - [x] Implementar Keycloak para autenticação
  - [x] Implementar Keycloak para autenticação no banco de dados
  - [ ] Implementar testes unitários da api

- loyahub-app
  - [x] Implementar acesso a API para consumir dados
  - [x] Implementar login 
  - [ ] Implementar Landing Page do produto
  - [ ] Implementar telas de listagem de benefícios, pontos e NFT
  - [ ] Implementar tela de detalhe de benefícios, pontos e NFT
  - [ ] Implementar testes unitários do app

- loyahub-smart-contracts
  - [x] Definir lógica para remoção automática de 20% dos pontos após 30 dias.
  - [x] Implementar contrato inteligente para gerenciar a lógica de remoção de pontos
  - [x] Implementar contrato inteligente para gerenciar a emissão de pontos
  - [x] Implementar contrato inteligente para gerenciar a emissão de tokens
  - [x] Implementar contrato inteligente para gerenciar a lógica de metadata dos NFTs
  - [x] Implementar Proxies e tornar os contratos inteligentes atualizaveis
  - [x] Implementar scripts de deploy e upgrade para os contratos inteligentes
  - [ ] Implementar distribuição de token DREX ERC20 de acordo com nível
  - [ ] Implementar testes unitarios para os contratos inteligentes

- loyahub-doc
  - [x] Implementar documentação técnica do projeto
  - [ ] Implementar documentação de como instalar, configurar, usar, arquitetura, etc.

- loyahub-wallet
  - [x] Implementar login via secrets 
  - [x] Implementar historicos de transações com The Graph
  - [ ] Implementar busca de saldo DREX ERC20
  - [ ] Implementar busca de pontos
  - [ ] Implementar busca de NFT
  - [ ] Implementar Wallet Digital para ativos e pontos


## 🚀 Em Progresso
  - [ ] ... Desenvolver modelo de NFT visual para as insígnias 
  - [ ] ... Implementar Modelo Visual do NFT na Dashboard para leitura de metadados 
  - [ ] ... Implementar Wallet Digital para ativos e pontos


## ✅ Concluídas
- [x] Configurar ambiente de desenvolvimento inicial.
- [x] Subir ambiente blockchain com Hyperledger Besu e Firefly
- [x] Configurar monoRepo e scripts com o lerna
- [x] Revisar e validar estruturas existentes no contrato `CustomerManagementCore.sol`.
- [x] Estabelecer sistema de cadastro e gerenciamento de pontos dos clientes.
- [x] Desenvolver integração de pontuação com ERC1155.
- [x] Criar tokens NFT para insígnias (PremiumCustomer, GoldCustomer, TitaniumCustomer).
- [x] Tornar a porcentagem de remoção de pontos ajustável pelo administrador do contrato.
- [x] Implementar testes automatizados para novas funcionalidades.
- [x] Desenvolvimento de todos testes unitarios
- [x] Implementar Rotas no Back-end API
- [x] Integrar banco de dados PostGree no backEnd
- [x] Implementar API de Metadatas dos tokens ERC1155 das insignas
- [x] Implementar função para atualizar metadata do NFT conforme níveis de pontuação.
- [x] Implementar rotas para deletar e update metadata do NFT na api.
- [x] Implementar autenticação via keycloack e database para usuarios 
- [x] Configurar ambiente de desenvolvimento com dev container e docker 
- [x] Implementação das rotas de Points (add pontos e remover Pontos) na admin ui
    - [x] Implementar rota api para trazer todos customers 
    - [x] Implementar rota api para adicionar pontos 
    - [x] Implementar rota api para remover pontos 
    - [x] Implementar Página React para add pontos na Dashboard 
    - [x] Implementar Página React para remover pontos na Dashboard 
  - [x] Implementar uma wallet inicial para visualizar ativos do sistema

## 🧠 Ideias para Explorar
- [ ] Avaliar interoperabilidade com outros contratos inteligentes.

## 🛠️ Melhorias Futuras

## 📚 Documentação

- [ ] Atualizar documentação com detalhes das novas funcionalidades.
- [ ] Criar guia de uso para a interface de administração de pontos.
