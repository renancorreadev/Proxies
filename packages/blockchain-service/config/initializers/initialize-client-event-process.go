// config/config.go

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

type ContractABI struct {
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

    var contractABI ContractABI
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

    // Configurar o repositório e o caso de uso para ClientEventProcessor
    blockchainRepo := repository.NewBlockchainRepository(parsedABI)
    eventProcessor := usecase.NewClientEventProcessor(client, contractAddress, parsedABI, blockchainRepo)

    go eventProcessor.PollClientRegistrationEvents(filePath)

    return eventProcessor, nil
}
