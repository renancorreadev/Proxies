A infraestrutura do projeto é composta por:

- [Hyperledger Besu](./infrasctruture/hyperledger-besu.md)
- [Vault](./infrasctruture/vault.md)
- [Minio](./infrasctruture/minio.md)
- [Explorer](./infrasctruture/explorer.md)
- [Redis](./infrasctruture/redis.md)
- [Postgres](./infrasctruture/postgres.md)
- [theGraph](./infrasctruture/thegraph.md)
- [Prometheus](./infrasctruture/prometheus.md)
- [Grafana](./infrasctruture/grafana.md)
- [Keycloak](./infrasctruture/keycloak.md)

* Hyperledger Besu

o docker-compose do besu se baseia no protocolo do IBFT e toda blockchain é gerenciada pelo bootnode, temos 3 nodes que participam da blockchain sendo eles validadores. Todas APIS e contratos inteligentes são executados nessa blockchain.

* Vault

o vault é um sistema de gerenciamento de secrets do HashiCorp, nele estão armazenados os secrets do projeto como credenciais de banco de dados, s3, entre outros. Toda vez que é necessario criar uma wallet digital é necessario consultar o vault para ter acesso a private key dessa wallet.

* Minio

o minio é um sistema de storage de objetos, nele estão armazenados os arquivos estáticos do projeto como documentos da plataforma, imagens, vídeos, etc.

* Explorer

o explorer é um sistema de visualização de dados da blockchain, nele é possivel ter uma visão geral de toda a blockchain, ver os blocos, transações, contratos inteligentes, etc.

* Redis

o redis é um sistema de key-value store, nele é possivel armazenar dados em memória para uma rápida consulta, no projeto ele é utilizado para armazenar o histórico de transações da blockchain. Foi utilizado para armazenar os cookies de autenticação do keycloak.

* Postgres

o postgres é um sistema de banco de dados relacional, nele é possivel armazenar dados de forma estruturada, no projeto ele é utilizado para armazenar os dados do sistema como usuários, pontos, ativos, etc.

* theGraph

o theGraph é um protocolo de indexação de dados da blockchain, nele é possivel criar um subgraph para indexar os dados da blockchain e disponibilizar uma API GraphQL para consulta dos dados. No projeto ele é utilizado para indexar os dados da blockchain e disponibilizar uma API para consulta dos dados do sistema. Estamos utilizando o subgraph para indexar os dados de todas transações realizadas na EVM e facilitar a consulta do historico de transações.

* Prometheus

o prometheus é um sistema de monitoramento de métricas, nele é possivel monitorar as métricas do sistema como consumo de CPU, memória, rede, entre outras. No projeto ele é utilizado para monitorar as métricas do sistema.

* Grafana

o grafana é um sistema de visualização de métricas, nele é possivel visualizar as métricas monitoradas pelo prometheus em forma de gráficos e tabelas. No projeto ele é utilizado para visualizar as métricas do sistema.

* Keycloak

o keycloak é um sistema de autenticação e autorização, nele é possivel gerenciar usuários, grupos, permissões, entre outras coisas. No projeto ele é utilizado para autenticar os usuários do sistema.

### 🚀 Como executar a infraestrutura

| No repositório root do projeto execute o comando:

```bash
pnpm infra-up 
```

Esse comando irá subir a infraestrutura do projeto e disponibilizar os serviços em seus respectivos ports. Ao total são 12 containers.

## Como parar a infraestrutura

No repositório root do projeto execute o comando:

```bash
pnpm infra-down
```

