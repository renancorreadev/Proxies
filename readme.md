# Client Manager on Blockchain Technology 

## Desenvolvimento: 

> O Planejamento para desenvolvimento de uma nova feature para esse projeto com um longo escopo está definida para seguir 
> esse padrão abaixo: 

![Alt text](docs/images/plainning.png)

* Inicia se o desenvolvimento da feature na blockckchain com os contratos inteligentes que são atualizaveis com o  
ERC1967Proxy.
* Parte para o desenvolvimento da solução da feature na escuta dos eventos com o micro serviço desenvolvido em Go para gerenciamento de eventos e acionamentos de cronJobs. 
* Parte se para o desenvolvimento da solução da feature para o back-end, desenvolvendo-se os casos de uso, rotas, entidades e dominios para se atender. 
* Parte se para o desenvolvimento da solução no front end no React. 


## Estrutura de pastas
> O projeto é um projeto monorepo baseado em projetos descentralizados de blockchain mas com enfase em blockchain privada. 
> Temos esse domínios de pastas: 

```log
monoRepo/
├─ docs/
├─ packages/
│    ├── blockchain-service
│    │   ├── package.json
│    ├── client-manager-api
│    │   ├── package.json
│    ├── client-manager-ui
│    │   ├── package.json
│    ├── smart-contracts
│    │   ├── package.json
├── package.json
```
- O Projeto está sendo gerenciado pelo lerna, existem alguns scripts para serem executados na execução do projeto: 

```file
monoRepo/
├─ docs/
├─ packages/
├── package.json
```

```json
 "scripts": {
    "start:dev": "lerna run --parallel --stream dev --scope client-manager-api --scope client-manager-ui --scope blockchain-service",
    "dev": "lerna run --parallel --stream dev --scope client-manager-api --scope client-manager-ui",
    "sc": "lerna run --scope smart-contracts compile",
    "bs": "lerna run --scope blockchain-service --stream dev",
    "api": "lerna run --scope client-manager-api --stream dev",
    "ui": "lerna run --scope client-manager-ui --stream dev",
    "clean": "lerna run clean",
    "build": "pnpm recursive run build",
    "test": "pnpm recursive run test"
  },
```

| Comando      | Descrição                                                                                               |
|--------------|---------------------------------------------------------------------------------------------------------|
| `start:dev`  | Executa paralelamente todos os aplicativos relacionados ao protocolo de gerenciamento de clientes (API, UI, e serviço blockchain). |
| `dev`        | Executa paralelamente a API e a UI do gerenciador de clientes.                                          |
| `sc`         | Executa o comando de compilação no projeto de smart contracts.                                         |
| `bs`         | Executa o micro serviço blockchain.                                                                           |
| `api`        | Executa a API do gerenciador de clientes.                                                               |
| `ui`         | Executa a interface do usuário (UI) do gerenciador de clientes.                                         |
| `clean`      | Executa o comando de limpeza em todos os pacotes do monorepo.                                           |
| `build`      | Executa o comando de build em todos os pacotes do monorepo de forma recursiva.                          |
| `test`       | Executa testes em todos os pacotes do monorepo de forma recursiva.                                      |
