# O Subgraph serve para indexar os dados do blockchain e disponibilizar uma API GraphQL para acesso aos dados.

# O Subgraph é composto por três partes:

# 1. O Subgraph Code: É a parte que contém a lógica de negócios do subgraph, escrita em GraphQL SDL (GraphQL Schema Definition Language).

# 2. O Mapping: É a parte que contém a lógica de mapeamento dos dados do blockchain para o formato do subgraph.

# 3. O Template: É a parte que contém a estrutura do subgraph, incluindo os templates de queries e mutations.

graph init --from-contract <CONTRACT_ADDRESS> --network private <SUBGRAPH_NAME>

graph init --from-contract 0x640c974A4d1cF06d9b0c15669c50eE1D62fA7C14--network private DREX
