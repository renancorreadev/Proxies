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


