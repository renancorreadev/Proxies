# Front end do protocolo de Gerenciamento de pontuação de clientes baseado em blockchain. 

## Esse aplicativo é o front end que está sendo desenvolvido para a dashboard para interagir e visualizar as informações em tempo real de todo ecossistema desenvolvido. 

> Endpoints: 
> ---| Clientes |-----
> POST /api/v1/client/new -> Cria um novo Cliente 
> GET /api/v1/client/{id} -> Traz informações do cliente 
> GET /api/v1/client/{id} -> Traz informaçóes do cliente pelo nome
> GET /api/v1/client/dataBy/{age} -> Traz informações do cliente pela idade 
> GET /api/v1/client/dataBy/{age} -> Traz informações do cliente pela wallet blockchain
> ---| Pontos |-----
> POST /api/v1/points/add -> Adiciona pontos para um usuario pelo id 
> GET /api/v1/points/{id} -> Recupera os pontos de um usuario pelo id
> GET /api/v1/points/level/{id} ex:  Valor 1 = Premium, Valor 2 = Gold, Valor 3 = Titanium -> Recupera o level que o usuario esta pelo 
> GET /api/v1/points/nfts/all -> Recupera todos os NFT que o usuario possui em sua wallet
> GET /api/v1/points/nfts/simple -> Verifica se o usuario possui o NFT por tipo: Para NFT ID 1 = NFT Premium, NFT ID 2 = NFT Gold, NFT ID 3 = NFT Titanium
> ---| Metadata |-----
> POST /api/v1/metadata/new -> Registra um novo Metadata manualmente (informacao do NFT)
> GET /api/v1/metadata/{tokenID} -> Recupera o Metadata registrado
> PATCH /api/v1/metadata/{tokenID} -> Atualiza a metadata registrada 
> DELETE /api/v1/metadata/{tokenID} -> Deleta uma metadata ja existente


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

