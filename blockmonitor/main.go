package main

import (
	"blockmonitor/blockchain"
	"bytes"
	"context"
	"encoding/json"
	"log"
	"os"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
)

// Strutura para representar o arquivo ABI completo
type ContractABI struct {
	ABI json.RawMessage `json:"abi"`
}

func main() {
	log.Println("Starting block monitor...")

	const ethereumNodeURL = "http://192.168.15.200:5100"
	const contractAddressHex = "0xEB9e9E2DbC00fC320AC66413F169adD6abe7c222"
	const filePath = "./fileOutput/test.json"
	const abiPath = "../blockchain/artifacts/contracts/ClientManager.sol/ClientManager.json"

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

	client, err := blockchain.ConnectToEthereumNode(ethereumNodeURL)
	if err != nil {
		log.Fatalf("Erro ao conectar ao nó Ethereum: %v", err)
	}

	contractAddress := common.HexToAddress(contractAddressHex)

	go blockchain.MonitorClientRegistrationEvents(client, contractAddress, parsedABI, filePath)

	// Manter o programa em execução
	<-context.Background().Done()
}
