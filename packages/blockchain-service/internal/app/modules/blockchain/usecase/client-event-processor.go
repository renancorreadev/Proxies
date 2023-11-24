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
	blockchainRepo  repository.BlockchainRepository
	events          []domain.ClientData
	lastBlock       uint64 // Adicione lastBlock como variável de membro
}

func NewClientEventProcessor(client *ethclient.Client, contractAddress common.Address, contractAbi abi.ABI, blockchainRepo repository.BlockchainRepository) *ClientEventProcessor {
	return &ClientEventProcessor{
		client:          client,
		contractAddress: contractAddress,
		contractAbi:     contractAbi,
		blockchainRepo:  blockchainRepo,
		lastBlock:       0, // Inicialize lastBlock como 0
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
			if event, err := cep.blockchainRepo.ParseEvent(vLog); err == nil {
				cep.events = append(cep.events, event)
				log.Printf("Evento recebido e processado: %+v", event)
			}
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

		cep.events = []domain.ClientData{} // Clear events list
	}
}
