package main

import (
	"blockmonitor/domain/blockchain"
	"bytes"
	"context"
	"encoding/json"
	"log"
	"os"

	"github.com/joho/godotenv"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
)

// ContractABI representa o arquivo ABI completo
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
	filePath := os.Getenv("FILE_PATH")
	abiPath := os.Getenv("ABI_PATH")

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

	client, err := blockchain.ConnectToEthereumNode(ethereumNodeURL)
	if err != nil {
		log.Fatalf("Erro ao conectar ao nó Ethereum: %v", err)
	}

	go blockchain.PollClientRegistrationEvents(client, contractAddress, parsedABI, filePath)

	<-context.Background().Done()
}
