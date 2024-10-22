# CustomerManagementCore Blockchain Events Monitor

`cmd: Contém os pontos de entrada da aplicação, como executáveis. Cada subdiretório representa um aplicativo diferente, contendo seu próprio main.go.`

- internal: Diretório para o código privado da aplicação. Não pode ser importado por código em outros módulos.

- app: Contém a lógica de negócios e casos de uso.
- usecase: Contém os casos de uso específicos do aplicativo.
- repository: Interface para interação com a camada de dados.
- delivery: Contém adaptadores para diferentes formas de entrega (HTTP, gRPC, etc.).
- pkg: Contém bibliotecas compartilhadas que podem ser usadas por outros aplicativos ou serviços.
- api: Armazena especificações de API, como OpenAPI (Swagger) para definições de HTTP API.
- config: Contém arquivos de configuração e scripts relacionados para a aplicação.
- scripts: Scripts auxiliares para tarefas como build, deploy, etc.

O repositório golang blockchain service monitora as ações dos contratos inteligentes na rede do besu e em tempo real. ele possui essa estrutura de pastas:

```
/blockchain-service
├── cmd
│   ├── app
│   │   └── main.go
├── config
│   ├── initializers
│   ├── utils
├── internal
│   ├── blockchain
│   ├── metadata
├── output
├── pkg
│   ├── CustomerManagmentCore.abi
│   ├── CustomerManagmentCore.bin
│   ├── CustomerManagmentCore.go
│   ├── PointCore.abi
│   ├── PointCore.bin
│   ├── PointCore.go
├── .env.example
├── go.mod
├── go.sum
```

segue alguns trechos importantes:

packages/blockchain-service/cmd/app/main.go

```go
package main

import (
	"context"
	"log"
	config "service/config/initializers"
)

func main() {
    log.Println("Starting block monitor...")

    // Inicializar o processador de eventos
    _, err := config.InitializeClientPointsChangedProcessor()
    if err != nil {
        log.Fatalf("Erro ao inicializar o processador de eventos Client: %v", err)
    }


    pointCoreScInstance, errContract := config.InitializeSmartContract()
	if errContract != nil {
		log.Fatalf("Erro ao inicializar o contrato Ethereum: %v", errContract)
	}

	// Chamar as funções e verificar os erros individualmente
	if _, err := pointCoreScInstance.GetCustomerGoldThreshold(); err != nil {
		log.Fatalf("Erro na GetCustomerGoldThreshold: %v", err)
	}

	if _, err := pointCoreScInstance.GetPointsForPremiumThreshold(); err != nil {
		log.Fatalf("Erro na GetPointsForPremiumThreshold: %v", err)
	}

	if _, err := pointCoreScInstance.GetPointsForTitaniumThreshold(); err != nil {
		log.Fatalf("Erro na GetPointsForTitaniumThreshold: %v", err)
	}

    <-context.Background().Done()
}

```

packages/blockchain-service/config/initializers/initialize-client-event-process.go

```go
package config

import (
	"bytes"
	"encoding/json"
	"os"
	"service/internal/app/modules/blockchain/repository"
	"service/internal/app/modules/blockchain/usecase"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/joho/godotenv"
)

type ClientManagementContractABI struct {
    ABI json.RawMessage `json:"abi"`
}

func InitializeClientEventProcessor() (*usecase.ClientEventProcessor, error) {
    err := godotenv.Load()
    if err != nil {
        return nil, err
    }

    ethereumNodeURL := os.Getenv("BLOCKCHAIN_NODE_RPC")
    contractAddressHex := os.Getenv("CUSTOMER_MANAGEMENT_CONTRACT_ADDRESS")
    abiPath := os.Getenv("CUSTOMER_MANAGEMENT_ABI_PATH")
    filePath := os.Getenv("FILE_PATH")

    // Carregar e analisar a ABI do contrato
    abiFile, err := os.ReadFile(abiPath)
    if err != nil {
        return nil, err
    }

    var contractABI ClientManagementContractABI
    if err := json.Unmarshal(abiFile, &contractABI); err != nil {
        return nil, err
    }

    parsedABI, err := abi.JSON(bytes.NewReader(contractABI.ABI))
    if err != nil {
        return nil, err
    }

    contractAddress := common.HexToAddress(contractAddressHex)

    // Conectar ao nó Ethereum
    client, err := ethclient.Dial(ethereumNodeURL)
    if err != nil {
        return nil, err
    }

    blockchainRepo := repository.NewCRBlockchainRepository(parsedABI)
    eventProcessor := usecase.NewClientEventProcessor(client, contractAddress, parsedABI, blockchainRepo)

    go eventProcessor.PollClientRegistrationEvents(filePath)

    return eventProcessor, nil
}

```

packages/blockchain-service/config/initializers/initialize-client-points-changed-process.go

```go
package config

import (
	"bytes"
	"context"
	"encoding/json"
	"log"
	"os"

	blockchainRepository "service/internal/app/modules/blockchain/repository"
	blockchainUseCase "service/internal/app/modules/blockchain/usecase"
	metadataRepository "service/internal/app/modules/metadata/repository"
	metadataUseCase "service/internal/app/modules/metadata/usecase"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/joho/godotenv"
)


func InitializeClientPointsChangedProcessor() (*blockchainUseCase.ClientPointsChangedEventProcessor, error) {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}
	ctx := context.Background()

    // Carregar configurações das variáveis de ambiente
    rpcEndpoint := os.Getenv("BLOCKCHAIN_NODE_WS")
    contractAddressHex := os.Getenv("POINT_CORE_CONTRACT_ADDRESS")
    abiPath := os.Getenv("POINTS_CORE_ABI_PATH")

    // Conectar ao cliente Ethereum
    client, err := ethclient.Dial(rpcEndpoint)
    if err != nil {
        log.Fatalf("Failed to connect to the Ethereum client: %v", err)
        return nil, err
    }

    // Carregar a ABI do contrato
    abiFile, err := os.ReadFile(abiPath)
    if err != nil {
        log.Fatalf("Failed to read contract ABI: %v", err)
        return nil, err
    }

    var rawABI json.RawMessage = abiFile
    contractABI, err := abi.JSON(bytes.NewReader(rawABI))
    if err != nil {
        log.Fatalf("Failed to parse contract ABI: %v", err)
        return nil, err
    }
    blockchainRepo := blockchainRepository.NewCPCBlockchainRepository(client, contractABI, contractAddressHex)

    // Criar instância do repositório de metadados
    pointCoreSC, err := blockchainUseCase.NewPointCoreEthereumSC(rpcEndpoint, contractAddressHex)
    if err != nil {
        log.Fatalf("Failed to create Point Core Smart Contract instance: %v", err)
        return nil, err
    }
    metadataRepo := metadataRepository.NewPointCoreSmartContractRepository(pointCoreSC)

    // Criar o atualizador de metadados
    metadataUpdater := metadataUseCase.NewMetadataUpdaterURI(metadataRepo)

    // Criar e iniciar o processador de eventos
    eventProcessor := blockchainUseCase.NewClientPointsChangedEventProcessor(blockchainRepo, metadataUpdater)
    go eventProcessor.StartEventListening(ctx)

    return eventProcessor, nil
}
```

packages/blockchain-service/config/initializers/initialize-smart-contract-process.go

```go
package config

import (
	"fmt"
	"log"
	"os"
	smartContract "service/internal/app/modules/blockchain/usecase"
)

// InitializeSmartContract inicializa o contrato Ethereum e retorna uma instância dele.
func InitializeSmartContract() (*smartContract.PointCoreEthereumSC, error) {
	rpcEndpoint := os.Getenv("BLOCKCHAIN_NODE_RPC")
	contractAddress := os.Getenv("POINT_CORE_CONTRACT_ADDRESS")

	pointCoreScInstance, err := smartContract.NewPointCoreEthereumSC(rpcEndpoint, contractAddress)
	if err != nil {
		return nil, fmt.Errorf("falha ao criar instância do contrato Ethereum: %v", err)
	}


	/// @dev Getters
	customerGoldThreshold, err := pointCoreScInstance.GetCustomerGoldThreshold()
	if err != nil {
		return nil, fmt.Errorf("falha ao obter o valor do Limiar de Ouro do Cliente: %v", err)
	}

	pointsForPremiumThreshold, err := pointCoreScInstance.GetPointsForPremiumThreshold()
	if err != nil {
		return nil, fmt.Errorf("falha ao obter o valor do Limiar de Pró-Preço: %v", err)
	}

	pointsForTitaniumThreshold, err := pointCoreScInstance.GetPointsForTitaniumThreshold()
	if err != nil {
		return nil, fmt.Errorf("falha ao obter o valor do Limiar de Titânio: %v", err)
	}

	log.Printf("Limiar de Ouro do Cliente: %v", customerGoldThreshold)
	log.Printf("Limiar de Pró-Preço: %v", pointsForPremiumThreshold)
	log.Printf("Limiar de Titânio: %v", pointsForTitaniumThreshold)

	return pointCoreScInstance, nil
}
```

packages/blockchain-service/config/utils/initialize-smart-contract-customer.go

```go
package utils

import (
	"fmt"
	"log"
	"math/big"
	"os"
	smartContractCustomer "service/internal/app/modules/blockchain/usecase"
)

// InitializeSmartContract inicializa o contrato Ethereum e retorna uma instância dele.
func InitializeCustomerSC(clientID *big.Int) (string, error) {
	rpcEndpoint := os.Getenv("BLOCKCHAIN_NODE_RPC")
	contractAddress := os.Getenv("CUSTOMER_MANAGEMENT_CONTRACT_ADDRESS")

	customerContractInstance, err := smartContractCustomer.NewCustomerEthereumSC(rpcEndpoint, contractAddress)
	if err != nil {
			return "", fmt.Errorf("falha ao criar instância do contrato Ethereum: %v", err)
	}

	// @dev Getters
	clientName, err := customerContractInstance.GetClientName(clientID)
	if err != nil {
			return "", fmt.Errorf("falha ao obter o nome do cliente para o ID %v: %v", clientID, err)
	}

	log.Printf("Nome do Cliente: %s", clientName)
	return clientName, nil
}

```

Domain Blockchain

packages/blockchain-service/internal/app/modules/blockchain/domain/client-point-changed-model.go'

```go
package domain

import "math/big"

type ClientPointsChangedEvent struct {
	ClientId  *big.Int
	NewPoints *big.Int
}

```

packages/blockchain-service/internal/app/modules/blockchain/domain/client-registered-model.go

```go
package domain

import (
	"math/big"
)

type ClientData struct {
	ClientId *big.Int
	Name     string
	Age      *big.Int
}

```

packages/blockchain-service/internal/app/modules/blockchain/domain/metadata-interface.go

```go
package domain

import (
	"context"
	"math/big"
)

type MetadataUpdaterURI interface {
    UpdateMetadata(ctx context.Context, clientID string, newPoints *big.Int) error
}

```

Repositorys Blockchain

packages/blockchain-service/internal/app/modules/blockchain/repository/client-points-changed-event-repository.go

```go
package repository

import (
	"context"
	"errors"
	"log"
	"math/big"
	domain "service/internal/app/modules/blockchain/domain"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
)

type EthBlockchainRepository struct {
	clientContractABI        abi.ABI
	pointCoreContractAddress common.Address
	ethereumClient           *ethclient.Client
}

func NewCPCBlockchainRepository(client *ethclient.Client, contractAbi abi.ABI, contractAddress string) *EthBlockchainRepository {
	return &EthBlockchainRepository{
		clientContractABI:        contractAbi,
		pointCoreContractAddress: common.HexToAddress(contractAddress),
		ethereumClient:           client,
	}
}
func (r *EthBlockchainRepository) SubscribeToClientPointsChangedEvent(ctx context.Context, updater domain.MetadataUpdaterURI) {
	query := ethereum.FilterQuery{
		Addresses: []common.Address{r.pointCoreContractAddress},
	}

	logs := make(chan types.Log)
	sub, err := r.ethereumClient.SubscribeFilterLogs(ctx, query, logs)
	if err != nil {
		log.Fatalf("Failed to subscribe to logs: %v", err)
	}

	go func() {
		for {
			select {
			case err := <-sub.Err():
				log.Fatalf("Subscription error: %v", err)

			case vLog := <-logs:
				event, err := r.processLog(vLog)
				if err != nil || event == nil {
					continue // Ignora logs irrelevantes ou erros
				}

				// Recupera os pontos totais do cliente pelo contrato
				totalPoints, err := r.GetClientTotalPoints(ctx, event.ClientId)
				if err != nil {
					log.Printf("Erro ao recuperar total de pontos: %v", err)
					continue
				}

				log.Printf("Event received - ClientID: %s, TotalPoints: %s", event.ClientId.String(), totalPoints.String())

				// Atualiza os metadados do NFT com base nos pontos do cliente e nos limiares
				err = updater.UpdateMetadata(ctx, event.ClientId.String(), totalPoints)
				if err != nil {
					log.Printf("Erro ao atualizar metadata: %v", err)
					continue
				}
			}
		}
	}()
}

func (r *EthBlockchainRepository) GetClientTotalPoints(ctx context.Context, clientID *big.Int) (*big.Int, error) {
	// Cria uma instância do contrato utilizando a ABI e o endereço do contrato
	contract := bind.NewBoundContract(r.pointCoreContractAddress, r.clientContractABI, r.ethereumClient, r.ethereumClient, r.ethereumClient)

	callOpts := &bind.CallOpts{
		Context: ctx,
	}

	// O slice de interface{} para os argumentos de saída
	var result []interface{}

	// Chama a função 'getClientPoints' do contrato
	err := contract.Call(callOpts, &result, "getClientPoints", clientID)
	if err != nil {
		log.Printf("Erro ao chamar getClientPoints: %v", err)
		return nil, err
	}

	// Verifica se o resultado foi recebido corretamente
	if len(result) == 0 || result[0] == nil {
		return nil, errors.New("nenhum ponto foi retornado pelo contrato")
	}

	// Faz uma asserção de tipo para converter o resultado para *big.Int
	totalPoints, ok := result[0].(*big.Int)
	if !ok {
		return nil, errors.New("o resultado não pôde ser convertido para *big.Int")
	}

	return totalPoints, nil
}

func (r *EthBlockchainRepository) processLog(vLog types.Log) (*domain.ClientPointsChangedEvent, error) {
	eventName := "ClientPointsChanged"
	if vLog.Topics[0].Hex() != r.clientContractABI.Events[eventName].ID.Hex() {
		return nil, nil // Retorna nil para ignorar logs irrelevantes
	}

	event := &domain.ClientPointsChangedEvent{
		ClientId:  new(big.Int).SetBytes(vLog.Topics[1][:]),
		NewPoints: new(big.Int).SetBytes(vLog.Data),
	}

	return event, nil
}

```

packages/blockchain-service/internal/app/modules/blockchain/repository/client-registered-event-repository.go

```go
package repository

import (
	"errors"
	"math/big"
	"service/internal/app/modules/blockchain/domain"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/core/types"
)

type ClientRegisteredBlockchainRepository interface {
	ClientRegisteredEventListener(vLog types.Log) (domain.ClientData, error)
}


/// @dev New Client Registered Blockchain Repository
func NewCRBlockchainRepository(contractAbi abi.ABI) *EthBlockchainRepository {
	return &EthBlockchainRepository{
		clientContractABI: contractAbi,
	}
}

func (r *EthBlockchainRepository) ClientRegisteredEventListener(vLog types.Log) (domain.ClientData, error) {
	var event domain.ClientData

	eventName := "ClientRegistered"
	eventID := r.clientContractABI.Events[eventName].ID

	if vLog.Topics[0] == eventID {
		clientId := new(big.Int).SetBytes(vLog.Topics[1][:])
		event.ClientId = clientId

		err := r.clientContractABI.UnpackIntoInterface(&event, eventName, vLog.Data)
		if err != nil {
			return domain.ClientData{}, err
		}

		return event, nil
	}

	return domain.ClientData{}, errors.New("log event ID does not match")
}





```

UseCases Blockchain

packages/blockchain-service/internal/app/modules/blockchain/usecase/client-event-processor.go

```go
package usecase

import (
	"context"
	"encoding/json"
	"log"
	"math/big"
	"os"
	"service/internal/app/modules/blockchain/domain"
	"service/internal/app/modules/blockchain/repository"
	"time"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
)

type ClientEventProcessor struct {
	client          *ethclient.Client
	contractAddress common.Address
	contractAbi     abi.ABI
	blockchainRepo  repository.ClientRegisteredBlockchainRepository
	events          []domain.ClientData
	lastBlock       uint64
}

func NewClientEventProcessor(
	client *ethclient.Client,
	contractAddress common.Address,
	contractAbi abi.ABI,
	blockchainRepo repository.ClientRegisteredBlockchainRepository) *ClientEventProcessor {
	return &ClientEventProcessor{
		client:          client,
		contractAddress: contractAddress,
		contractAbi:     contractAbi,
		blockchainRepo:  blockchainRepo,
		lastBlock:       0,
	}
}

func (cep *ClientEventProcessor) PollClientRegistrationEvents(filePath string) {
	// Obtenha o bloco atual
	lastBlock, err := cep.client.BlockNumber(context.Background())
	if err != nil {
		log.Printf("Error getting the latest block number: %s", err)
		time.Sleep(10 * time.Second)
		return
	}

	for {
		// Verifique os logs a partir do último bloco processado + 1
		cep.processNewBlocks(&lastBlock)

		cep.writeEventsToFile(filePath)
		time.Sleep(10 * time.Second)
	}
}

func (cep *ClientEventProcessor) processNewBlocks(lastBlock *uint64) {
	// Consulte os logs a partir do último bloco processado + 1 até o bloco atual
	fromBlock := *lastBlock + 1
	toBlock, err := cep.client.BlockNumber(context.Background())
	if err != nil {
		log.Printf("Error getting the latest block number: %s", err)
		return
	}

	query := ethereum.FilterQuery{
		Addresses: []common.Address{cep.contractAddress},
		FromBlock: new(big.Int).SetUint64(fromBlock),
		ToBlock:   new(big.Int).SetUint64(toBlock),
	}

	if logs, err := cep.client.FilterLogs(context.Background(), query); err == nil {
		for _, vLog := range logs {
				event, err := cep.blockchainRepo.ClientRegisteredEventListener(vLog)
				if err != nil {
						log.Printf("Erro ao processar evento: %v", err)
						continue
				}
				cep.events = append(cep.events, event)
				log.Printf("Evento recebido e processado: %+v", event)
		}
	}
	*lastBlock = toBlock
}


func (cep *ClientEventProcessor) writeEventsToFile(filePath string) {
	if len(cep.events) > 0 {
		file, err := os.Create(filePath)
		if err != nil {
			log.Printf("Error creating file: %s", err)
			return
		}
		defer file.Close()

		encoder := json.NewEncoder(file)
		if err := encoder.Encode(cep.events); err != nil {
			log.Printf("Error writing events to file: %s", err)
		}

		cep.events = []domain.ClientData{}
	}
}

```

packages/blockchain-service/internal/app/modules/blockchain/usecase/client-points-changed-processor.go

```go
package usecase

import (
	"context"
	"service/internal/app/modules/blockchain/domain" // Supondo que MetadataUpdater esteja aqui
	"service/internal/app/modules/blockchain/repository"
)

type ClientPointsChangedEventProcessor struct {
	blockchainRepo *repository.EthBlockchainRepository
	metadataUpdater domain.MetadataUpdaterURI
}

// Inclua MetadataUpdater na função de inicialização
func NewClientPointsChangedEventProcessor(blockchainRepo *repository.EthBlockchainRepository, metadataUpdater domain.MetadataUpdaterURI) *ClientPointsChangedEventProcessor {
	return &ClientPointsChangedEventProcessor{
		blockchainRepo: blockchainRepo,
		metadataUpdater: metadataUpdater, // Inicialize o campo
	}
}

func (cep *ClientPointsChangedEventProcessor) StartEventListening(ctx context.Context) {
	// Passe metadataUpdater para SubscribeToClientPointsChangedEvent
	cep.blockchainRepo.SubscribeToClientPointsChangedEvent(ctx, cep.metadataUpdater)
}

```

packages/blockchain-service/internal/app/modules/blockchain/usecase/smart-contract-customer-read.go

```go
package usecase

import (
	"fmt"
	"math/big"
	customerManagementContract "service/pkg"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
)

// CustomerEthereumSC representa um contrato Ethereum PointCore.
type CustomerEthereumSC struct {
	conn     *ethclient.Client
	contract *customerManagementContract.CustomerManagementCore
}

// NewCustomerEthereumSC cria uma nova instância do contrato Ethereum PointCore.
func NewCustomerEthereumSC(rpcEndpoint, contractAddress string) (*CustomerEthereumSC, error) {
	conn, err := ethclient.Dial(rpcEndpoint)
	if err != nil {
		return nil, fmt.Errorf("falha ao conectar ao cliente Ethereum: %v", err)
	}

	address := common.HexToAddress(contractAddress)
	contract, err := customerManagementContract.NewCustomerManagementCore(address, conn)
	if err != nil {
		return nil, fmt.Errorf("falha ao instanciar o contrato Ethereum: %v", err)
	}

	return &CustomerEthereumSC{
		conn:     conn,
		contract: contract,
	}, nil

}

func (ec *CustomerEthereumSC) GetClientName(clientID *big.Int) (string, error) {
	clientName, err := ec.contract.GetClientName(nil, clientID)
	if err != nil {
			return "", fmt.Errorf("falha ao recuperar o nome do cliente para o ID %v: %v", clientID, err)
	}
	return clientName, nil
}



```

packages/blockchain-service/internal/app/modules/blockchain/usecase/smart-contract-read.go

```go
package usecase

import (
	"fmt"
	"math/big"
	pointCoreContract "service/pkg"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
)

// PointCoreEthereumSC representa um contrato Ethereum PointCore.
type PointCoreEthereumSC struct {
	conn     *ethclient.Client
	contract *pointCoreContract.PointCore
}

// NewPointCoreEthereumSC cria uma nova instância do contrato Ethereum PointCore.
func NewPointCoreEthereumSC(rpcEndpoint, contractAddress string) (*PointCoreEthereumSC, error) {
	conn, err := ethclient.Dial(rpcEndpoint)
	if err != nil {
		return nil, fmt.Errorf("falha ao conectar ao cliente Ethereum: %v", err)
	}

	address := common.HexToAddress(contractAddress)
	contract, err := pointCoreContract.NewPointCore(address, conn)
	if err != nil {
		return nil, fmt.Errorf("falha ao instanciar o contrato Ethereum: %v", err)
	}

	return &PointCoreEthereumSC{
		conn:     conn,
		contract: contract,
	}, nil
}

func (ec *PointCoreEthereumSC) GetCustomerGoldThreshold() (*big.Int, error) {
	customerGoldThreshold, err := ec.contract.PointsForGold(nil)
	if err != nil {
		return nil, fmt.Errorf("falha ao recuperar o valor CUSTOMERGOLD: %v", err)
	}
	return customerGoldThreshold, nil
}

func (ec *PointCoreEthereumSC) GetPointsForPremiumThreshold() (*big.Int, error) {
	pointsForPremiumThreshold, err := ec.contract.PointsForPremium(nil)
	if err != nil {
		return nil, fmt.Errorf("falha ao recuperar o valor PointsForPremium: %v", err)
	}
	return pointsForPremiumThreshold, nil
}

func (ec *PointCoreEthereumSC) GetPointsForTitaniumThreshold() (*big.Int, error) {
	pointsForTitaniumThreshold, err := ec.contract.PointsForTitanium(nil)
	if err != nil {
		return nil, fmt.Errorf("falha ao recuperar o valor PointsForTitanium: %v", err)
	}
	return pointsForTitaniumThreshold, nil
}

```

Domain Metadata
packages/blockchain-service/internal/app/modules/metadata/domain/metadata-domain-model.go

```go
package domain

type Metadata struct {
    TokenID     string `json:"tokenID"`
    Customer    string `json:"customer"`
    Description string `json:"description"`
    Image       string `json:"image"`
    Insight     string `json:"insight"`
    Attributes  []Attribute `json:"attributes"`
}

type Attribute struct {
    Type  string      `json:"type"`
    Value interface{} `json:"value"`
}

type Thresholds struct {
	PointsForPremium  int64
	PointsForGold     int64
	PointsForTitanium int64
}
```

Repository Metadata

packages/blockchain-service/internal/app/modules/metadata/repository/metadata-repository.go

```go
package repository

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"service/internal/app/modules/blockchain/usecase"
	"service/internal/app/modules/metadata/domain"
)

type BlockchainRepository interface {
	GetThresholds(ctx context.Context) (domain.Thresholds, error)
	UpdateMetadata(ctx context.Context, clientID string, metadata domain.Metadata) error
}

type CustomerNameGetter interface {
	GetCustomerName(ctx context.Context, clientID string) (string, error)
}

type PointCoreSmartContractRepository struct {
	// Instância do contrato Ethereum PointCore
	PointCoreScInstance *usecase.PointCoreEthereumSC
}

func NewPointCoreSmartContractRepository(pointCoreScInstance *usecase.PointCoreEthereumSC) *PointCoreSmartContractRepository {
	return &PointCoreSmartContractRepository{
		PointCoreScInstance: pointCoreScInstance,
	}
}
func (r *PointCoreSmartContractRepository) GetThresholds(ctx context.Context) (domain.Thresholds, error) {
	rpcEndpoint := os.Getenv("BLOCKCHAIN_NODE_RPC")
	contractAddress := os.Getenv("POINT_CORE_CONTRACT_ADDRESS")

	pointCoreScInstance, err := usecase.NewPointCoreEthereumSC(rpcEndpoint, contractAddress)
	if err != nil {
		return domain.Thresholds{}, fmt.Errorf("falha ao criar instância do contrato Ethereum: %v", err)
	}

	goldThreshold, err := pointCoreScInstance.GetCustomerGoldThreshold()
	if err != nil {
		return domain.Thresholds{}, fmt.Errorf("falha ao obter o valor do Limiar de Ouro do Cliente: %v", err)
	}

	premiumThreshold, err := pointCoreScInstance.GetPointsForPremiumThreshold()
	if err != nil {
		return domain.Thresholds{}, fmt.Errorf("falha ao obter o valor do Limiar de Pró-Preço: %v", err)
	}

	titaniumThreshold, err := pointCoreScInstance.GetPointsForTitaniumThreshold()
	if err != nil {
		return domain.Thresholds{}, fmt.Errorf("falha ao obter o valor do Limiar de Titânio: %v", err)
	}

	goldThresholdInt64 := goldThreshold.Int64()         // Converte *big.Int para int64
	premiumThresholdInt64 := premiumThreshold.Int64()   // Converte *big.Int para int64
	titaniumThresholdInt64 := titaniumThreshold.Int64() // Converte *big.Int para int64

	return domain.Thresholds{
		PointsForGold:     goldThresholdInt64,
		PointsForPremium:  premiumThresholdInt64,
		PointsForTitanium: titaniumThresholdInt64,
	}, nil
}

func (r *PointCoreSmartContractRepository) UpdateMetadata(ctx context.Context, clientID string, metadata domain.Metadata) error {
	jsonData, err := json.Marshal(metadata)
	if err != nil {
		return fmt.Errorf("erro ao serializar metadata: %w", err)
	}

	url := fmt.Sprintf("http://localhost:3001/api/v1/metadata/update/%s", clientID)
	req, err := http.NewRequestWithContext(ctx, "PATCH", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return fmt.Errorf("erro ao criar request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("erro ao realizar request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("request falhou com status code: %d", resp.StatusCode)
	}

	return nil
}

```

UseCase Metadata

packages/blockchain-service/internal/app/modules/metadata/usecase/update-metadata.go

```go
package usecase

import (
	"context"
	"fmt"
	"math/big"
	initialize "service/config/utils"
	"service/internal/app/modules/metadata/domain"
	"service/internal/app/modules/metadata/repository"
)

type MetadataUpdaterURI struct {
	Repo repository.BlockchainRepository
}

func NewMetadataUpdaterURI(repo repository.BlockchainRepository) *MetadataUpdaterURI {
	return &MetadataUpdaterURI{Repo: repo}
}

func (updater *MetadataUpdaterURI) UpdateMetadata(ctx context.Context, clientID string, newPoints *big.Int) error {
	thresholds, err := updater.Repo.GetThresholds(ctx)
	if err != nil {
		return err
	}

	// Adiciona um log para verificar os valores
	fmt.Printf("Thresholds: %+v\n", thresholds)
	fmt.Printf("New Points: %d\n", newPoints.Int64())

	metadata, err := determineMetadata(clientID, newPoints.Int64(), thresholds)
	if err != nil {
		return err
	}

	// Adiciona um log para verificar a metadata
	fmt.Printf("Metadata: %+v\n", metadata)

	return updater.Repo.UpdateMetadata(ctx, clientID, metadata)
}

func determineMetadata(clientID string, newPoints int64, thresholds domain.Thresholds) (domain.Metadata, error) {
	clientIDBigInt := new(big.Int)
	clientIDBigInt.SetString(clientID, 10) // Converte clientID de string para *big.Int

	clientName, err := initialize.InitializeCustomerSC(clientIDBigInt)
	if err != nil {
		return domain.Metadata{}, fmt.Errorf("erro ao obter nome do cliente: %s", err)
	}

	metadata := domain.Metadata{
		TokenID:  clientID,
		Customer: clientName,
		Image:    "https://meusite.com/imagens/nft/1.png",
	}

	switch {
	case newPoints < thresholds.PointsForPremium:
		metadata.Description = "Voce ainda não alcançou nenhuma insignia e nenhum nivel"
		metadata.Insight = "sem insignia"
		metadata.Attributes = []domain.Attribute{
			{Type: "level_type", Value: 0},
			{Type: "nft_type", Value: "Sem NFT"},
			{Type: "benefit_type", Value: []interface{}{}},
		}

	case newPoints >= thresholds.PointsForPremium && newPoints < thresholds.PointsForGold:
		metadata.Description = "Voce está no nivel I com a insignia Customer Premium"
		metadata.Insight = "CUSTOMER_PREMIUM"
		metadata.Attributes = []domain.Attribute{
			{Type: "level_type", Value: 1},
			{Type: "nft_type", Value: "CUSTOMER_PREMIUM"},
			{Type: "benefit_type", Value: []interface{}{
				map[string]interface{}{"discount": "10%", "description": "Desconto de 10%"},
				map[string]interface{}{"FreeFrete": "Frete gratis", "description": "Frete gratis para todo o Brasil"},
				map[string]interface{}{"promotionLevel": "Promoção nivel I", "description": "Com esse benefício voce tem acesso ao nivel 1 do catalogo de promoção"},
			}},
		}

	case newPoints >= thresholds.PointsForGold && newPoints < thresholds.PointsForTitanium:
		metadata.Description = "Voce está no nivel II com a insignia Customer Gold"
		metadata.Insight = "CUSTOMER_GOLD"
		metadata.Attributes = []domain.Attribute{
			{Type: "level_type", Value: 2},
			{Type: "nft_type", Value: "CUSTOMER_GOLD"},
			{Type: "benefit_type", Value: []interface{}{
				map[string]interface{}{"discount": "35%", "description": "Desconto de 35%"},
				map[string]interface{}{"FreeFrete": "Frete gratis", "description": "Frete gratis para todo o Brasil"},
				map[string]interface{}{"promotionLevel": "Promoção nivel II", "description": "Com esse benefício voce tem acesso ao nivel 2 do catalogo de promoção"},
				map[string]interface{}{"doublePoints": "Pontuação em dobro", "description": "Pontuação em dobro a cada vez que você compra na loja para chegar no próximo nivel mais rapido."},
			}},
		}

	case newPoints >= thresholds.PointsForTitanium:
		metadata.Description = "Voce está no nivel III com a insignia Customer Titanium"
		metadata.Insight = "CUSTOMER_TITANIUM"
		metadata.Attributes = []domain.Attribute{
			{Type: "level_type", Value: 3},
			{Type: "nft_type", Value: "CUSTOMER_TITANIUM"},
			{Type: "benefit_type", Value: []interface{}{
				map[string]interface{}{"discount": "50%", "description": "Desconto de 50%"},
				map[string]interface{}{"FreeFrete": "Frete gratis", "description": "Frete gratis para todo o Brasil"},
				map[string]interface{}{"promotionLevel": "Promoção nivel III", "description": "Com esse benefício voce tem acesso ao nivel 3 do catalogo de promoção"},
				map[string]interface{}{"doublePoints": "Pontuação em Triplo", "description": "Pontuação em dobro a cada vez que você compra na loja para chegar no próximo nivel mais rapido."},
				map[string]interface{}{"gifts": "Presente para o cliente", "description": "Diversos produtos e serviços de brinde para o cliente que recebeu o NFT do nível 3"},
				map[string]interface{}{"priority": "Prioridade para o cliente", "description": "Prioridade para o cliente em atendimentos, recursos, trocas, pedidos e vendas"},
				map[string]interface{}{"birthdays": "Ofertas imperdiveis para Aniversariantes", "description": "É seu aniversário? Com esse benefício voce tem acesso a ofertas imperdiveis para Aniversariantes"},
			}},
		}
	// newPoints >= thresholds.PointsForTitanium
	default:
		metadata.Description = "Voce está no nivel III com a insignia Customer Titanium"
		metadata.Insight = "CUSTOMER_TITANIUM"
		metadata.Attributes = []domain.Attribute{
			{Type: "level_type", Value: 3},
			{Type: "nft_type", Value: "CUSTOMER_TITANIUM"},
			{Type: "benefit_type", Value: []interface{}{
				map[string]interface{}{"discount": "50%", "description": "Desconto de 50%"},
				map[string]interface{}{"FreeFrete": "Frete gratis", "description": "Frete gratis para todo o Brasil"},
				map[string]interface{}{"promotionLevel": "Promoção nivel III", "description": "Com esse benefício voce tem acesso ao nivel 3 do catalogo de promoção"},
				map[string]interface{}{"doublePoints": "Pontuação em Triplo", "description": "Pontuação em dobro a cada vez que você compra na loja para chegar no próximo nivel mais rapido."},
				map[string]interface{}{"gifts": "Presente para o cliente", "description": "Diversos produtos e serviços de brinde para o cliente que recebeu o NFT do nível 3"},
				map[string]interface{}{"priority": "Prioridade para o cliente", "description": "Prioridade para o cliente em atendimentos, recursos, trocas, pedidos e vendas"},
				map[string]interface{}{"birthdays": "Ofertas imperdiveis para Aniversariantes", "description": "É seu aniversário? Com esse benefício voce tem acesso a ofertas imperdiveis para Aniversariantes"},
			}},
		}
	}

	return metadata, nil
}

```

A pasta pkg possui os contratos inteligentes compilados pelo abigen onde gera os arquivos em go a partir da abi do solidity.
