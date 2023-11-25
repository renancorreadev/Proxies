package config

import (
	"bytes"
	"context"
	"encoding/json"
	"log"
	"os"
	"service/internal/app/modules/blockchain/repository"
	"service/internal/app/modules/blockchain/usecase"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/joho/godotenv"
)

func InitializeClientPointsChangedProcessor() (*usecase.ClientPointsChangedEventProcessor, error) {
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

    // Configurar o repositório e o caso de uso
    blockchainRepo := repository.NewCPCBlockchainRepository(client, contractABI, contractAddressHex)
    eventProcessor := usecase.NewClientPointsChangedEventProcessor(blockchainRepo)

    // Iniciar a escuta de eventos
    go eventProcessor.StartEventListening(ctx)

    return eventProcessor, nil
}
