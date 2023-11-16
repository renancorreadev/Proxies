# Arquitetura

A arquitetura aplicada a este projeto é a arquitetura hexagonal.

![1689875274184](image/README/1689875274184.png)

Temos para cada domínio (Transaction, Wallet e Smart Contract) as seguintes camadas:

> Domain: Esta camada é responsável por implementar toda a lógica de negócio relacionada ao domínio e todas as ações gerais que podem ser feitas a partir dele.

> Ports: As portas contêm as definições de como as classes de domínio se comunicarão com os serviços externos, como bancos de dados ou APIs externas (portas de saída) e também como o cliente se comunicará com a camada de domínio, por exemplo, por interfaces da Web, serviços de fila etc. (portas de entrada).

> Adapter: Os adaptadores serão a implementação das definições estabelecidas pelas portas, tratando das requisições dos clientes e consultas aos bancos de dados.

Assim, para acessar nossos serviços, o fluxo a ser seguido será:

1. Um cliente fará uma solicitação que será tratada por uma classe de adaptador de entrada específica para esse tipo de solicitação.
2. O adaptador chamará a camada de domínio pela porta de entrada: um caso de uso que define quais são as ações necessárias para esse domínio.
3. O serviço que implementa tal caso de uso executará a lógica solicitada e, se necessário, chamará um adaptador de saída através de definições de porta de saída, para fazer uma consulta a um banco de dados ou algo parecido.
4. Dito isso, o adaptador retornará os dados solicitados ao serviço, o serviço retornará os dados solicitados ao adaptador de entrada e o cliente receberá sua resposta.

![1689875334208](image/README/1689875334208.png)

# Exemplo de estrutura do projeto

![1689877667314](image/README/1689877667314.png)

## SETUP

- requires [Node.js](https://nodejs.org/) v14+ to run;
- `npm install`: install dependencies;
- `environment variables`: rename the .env.production.example file to .env.production and add the necessary information.
- `npm start`: we suggest you to use `npm start` to run the project;

## GIT PATTERNS:

- BRANCHES:

  - `main`: branch containing everything that is reflected in production;
  - `dev`: development branch, where is everything that was validated;
  - `qa`: branch where the testers (QAs) can test everything from the develop branch before deploying to production (main);
  - `feature/*`: branch generated during the development of a feature, task or PBI must have the prefix "feature/" in the name. We name it with "feature/" followed by the number of the task and later by the name of the feature, like so: `feature/1234_pbi_name`;
  - `hotfix/*`: when we need to fix an urgent bug from production branch (main). When the fix is done in production, merge it with `dev` and `qa`;

    > **Pattern:**<br>`prefix: description of the commit`.<br> > **Example:**<br>`feat: route create user`.<br>
