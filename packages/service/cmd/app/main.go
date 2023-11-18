package main

import (
	"bytes"
	"context"
	"encoding/json"
	"log"
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

func main() {
	log.Println("Starting block monitor...")

	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Erro ao carregar o arquivo .env: %v", err)
	}

	ethereumNodeURL := os.Getenv("BLOCKCHAIN_NODE_RPC")
	contractAddressHex := os.Getenv("CONTRACT_ADDRESS")
	abiPath := os.Getenv("ABI_PATH")
	filePath := os.Getenv("FILE_PATH")

	// Carregar e analisar a ABI do contrato
	abiFile, err := os.ReadFile(abiPath)
	if err != nil {
		log.Fatalf("Erro ao ler o arquivo ABI: %v", err)
	}

	var contractABI ContractABI
	if err := json.Unmarshal(abiFile, &contractABI); err != nil {
		log.Fatalf("Erro ao deserializar JSON da ABI: %v", err)
	}

	parsedABI, err := abi.JSON(bytes.NewReader(contractABI.ABI))
	if err != nil {
		log.Fatalf("Erro ao analisar a ABI: %v", err)
	}

	contractAddress := common.HexToAddress(contractAddressHex)

	// Conectar ao nó Ethereum
	client, err := ethclient.Dial(ethereumNodeURL)
	if err != nil {
		log.Fatalf("Erro ao conectar ao nó Ethereum: %v", err)
	}

	// Configurando o repositório e o caso de uso
	blockchainRepo := repository.NewBlockchainRepository(parsedABI)
	eventProcessor := usecase.NewClientEventProcessor(client, contractAddress, parsedABI, blockchainRepo)

	// Iniciar a sondagem de eventos de registro de clientes
	go eventProcessor.PollClientRegistrationEvents(filePath)

	<-context.Background().Done()
}
