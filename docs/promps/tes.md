Ok, você agora tem a informação que precisamos. Esse projeto é um micro-servico de event-listener na blockchain, até esse momento ele escuta os eventos do evento ClientRegistered do contrato inteligente e escreve em um json.

Eu preciso implementar um novo case:

- Criar mais um eventListener mantendo a mesma lógica porem para outro evento do contrato inteligente chamado 'ClientPointsChanged'
  segue abaixo o event:

```solidity
  event ClientPointsChanged(uint256 indexed clientId, uint256 newPoints);
```

Ele precisa escutar os eventos da mesma forma que ja escuta no evento ja implementado ClientRegistered.

Eu tenho um servidor api que gerencia a metadados dos NFTs gerados.

em http://127.0.0.1:3001/api/v1/metadata/{tokenID}
é um metodo get que retorna o json da metadata do NFT.

- Apos receber o evento ele ira realizar uma ação. Deverá enviar um update na metadata da minha api no endpoint abaixo veja:

no contrato inteligente, temos 3 funcoes publicas

```solidity
    uint256 public pointsForPremium;
    uint256 public pointsForGold;
    uint256 public pointsForTitanium;
```

Primeiramente você precisara executar um get invocando um readContract nessa funcao desse contrato inteligente e recuperar o valor de pointsForPremium, pointsForGold e pointsForTitanium. Esses 3 items são a definicao de quantos pontos o usuario (cliente) tem que possuir para ganhar um NFT de cada tipo CUSTOMER_PREMIUM, CUSTOMER_GOLD E CUSTOMER_TITANIUM.

tendo os valores dos 3 items pointsForPremium, pointsForGold e pointsForTitanium. voce ira atualizar o endpoint abaixo que é um patch para atualizar a metadata do tokenID desse usuario pelo ID. o curl de modelo para solicitacao é esse: lembrando que o /update/1 {numero} é o tokenID que é o clientId recuperado do evento

````json
curl -X 'PATCH' \
  'http://localhost:3001/api/v1/metadata/update/1' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "tokenID": 1,
  "customer": "Nome do cliente",
  "description": "Descrição do nível do cliente",
  "image": "https://meusite.com/imagens/nft/1.png",
  "insight": "Insígnia do cliente",
  "attributes": {
    "points": 240,
    "level": 1,
    "benefits": [
      {
        "level_type": "Nível",
        "value": 1
      },
      {
        "level_type": "NFT",
        "value": "CUSTOMER_TITANIUM"
      },
      {
        "level_type": "Benefits",
        "value": [
          {
            "discount": "35%",
            "description": "Desconto de 20% em todos os produtos."
          },
          {
            "freeFrete": "Frete GRATIS",
            "description": "Frete GRATIS em todo Brasil."
          },
          {
            "promotionLevel": "Promoção nivel 2",
            "description": "Acesso ao nível 2 do catálogo de promoção"
          },
          {
            "bonus": "Bonus Nivel 2",
            "description": "Acesso aos bonus oferecido pela empresa no nivel 2"
          }
        ]
      }
    ]
  }
}'
```

Eu quero que você atualize esse endpoint de acordo com algumas verificacoes relacionado ao newPoints recuperado pelo evento e comparando com os pointsForPremium, pointsForGold  e pointsForTitanium veja abaixo como deve ser cada verificacao para atualizar o body:

OBS: Perceba que todas possibilidades da montagem do json possuem "tokenID": {esse valor vai manter} e
"customer": {esse valor vai manter} esses campos você não deve alterar, deve manter o mesmo que ja existe.

 1) se newPoints for menor que pointsForPremium
```json
{
    "tokenID": {esse valor vai manter},
    "customer": {esse valor vai manter},
    "description": "Voce ainda não alcançou nenhuma insignia e nenhum nivel",
    "image": "https://meusite.com/imagens/nft/1.png",
    "insight": "sem insignia",
    "attributes": [
      {
        "level_type": "Nível",
        "value": 0
      },
      {
        "nft_type": "NFT",
        "value": "Sem NFT"
      },
      {
        "benefit_type": "Benefits",
        "value": [

        ]
      }
    ]
  }
```

 2 - Se newPoints for maior ou igual que pointsForPremium e menor que pointsForGold

```json
{
    "tokenID": {esse valor vai manter},
    "customer": {esse valor vai manter},
    "description": "Voce está no nivel I com a insignia Customer Premium",
    "image": "https://meusite.com/imagens/nft/1.png",
    "insight": "CUSTOMER_PREMIUM",
    "attributes": [
      {
        "level_type": "Nível",
        "value": 1
      },
      {
        "nft_type": "NFT",
        "value": "CUSTOMER_PREMIUM"
      },
      {
        "benefit_type": "Benefits",
        "value": [
          {
            "discount": "10%",
            "description": "Desconto de 10%"
          },
          {
            "FreeFrete": "Frete GRATIS",
            "description": "Frete GRATIS para todo o Brasil"
          },
          {
            "promotionLevel": "Promoção nivel I",
            "description": "Com esse benefício voce tem acesso ao nivel 1 do catalogo de promoção"
          }
        ]
      }
    ]
  }
 ```
3 - Se newPoints for maior que pointsForGold e menor que pointsForTitanium

```json
{
    "tokenID": {esse valor vai manter},
    "customer": {esse valor vai manter},
    "description": "Voce está no nivel I com a insignia Customer Premium",
    "image": "https://meusite.com/imagens/nft/1.png",
    "insight": "CUSTOMER_PREMIUM",
    "attributes": [
      {
        "level_type": "Nível",
        "value": 2
      },
      {
        "nft_type": "NFT",
        "value": "CUSTOMER_GOLD"
      },
      {
        "benefit_type": "Benefits",
        "value": [
          {
            "discount": "35%",
            "description": "Desconto de 35%"
          },
          {
            "FreeFrete": "Frete GRATIS",
            "description": "Frete GRATIS para todo o Brasil"
          },
          {
            "promotionLevel": "Promoção nivel II",
            "description": "Com esse benefício voce tem acesso ao nivel 2 do catalogo de promoção"
          },
          {
            "doublePoints": "Pontuação em dobro",
            "description": "Pontuação em dobro a cada vez que você compra na loja para chegar no próximo nivel mais rapido."
          }
        ]
      }
    ]
  }
```


4 - Se newPoints for maior que pointsForTitanium

```json
{
    "tokenID": {esse valor vai manter},
    "customer": {esse valor vai manter},
    "description": "Voce está no nivel III com a insignia Customer Titanium",
    "image": "https://meusite.com/imagens/nft/1.png",
    "insight": "CUSTOMER_TITANIUM",
    "attributes": [
      {
        "level_type": "Nível",
        "value": 3
      },
      {
        "nft_type": "NFT",
        "value": "CUSTOMER_TITANIUM"
      },
      {
        "benefit_type": "Benefits",
        "value": [
          {
            "discount": "50%",
            "description": "Desconto de 50%"
          },
          {
            "FreeFrete": "Frete GRATIS",
            "description": "Frete GRATIS para todo o Brasil"
          },
          {
            "promotionLevel": "Promoção nivel III",
            "description": "Com esse benefício voce tem acesso ao nivel 3 do catalogo de promoção"
          },
          {
            "doublePoints": "Pontuação em Triplo",
            "description": "Pontuação em dobro a cada vez que você compra na loja para chegar no próximo nivel mais rapido."
          },
          {
            "gifts": "Presente para o cliente",
            "description": "Diversos produtos e serviços de brinde para o cliente que recebeu o NFT do nível 3"
          },
          {
            "priority": "Prioridade para o cliente",
            "description": "Prioridade para o cliente em atendimentos, recursos, trocas, pedidos e vendas"
          },
          {
            "birthdays" : "Ofertas imperdiveis para Aniversariantes",
            "description": "É seu aniversário? Com esse benefício voce tem acesso a ofertas imperdiveis para Aniversariantes"
          }
        ]
      }
    ]
  }

```

````
