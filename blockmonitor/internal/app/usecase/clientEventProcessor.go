package usecase

import (
	"blockmonitor/internal/app/domain"
	"blockmonitor/internal/app/repository"
	"context"
	"encoding/json"
	"log"
	"math/big"
	"os"
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
}

func NewClientEventProcessor(client *ethclient.Client, contractAddress common.Address, contractAbi abi.ABI, blockchainRepo repository.BlockchainRepository) *ClientEventProcessor {
	return &ClientEventProcessor{
		client:          client,
		contractAddress: contractAddress,
		contractAbi:     contractAbi,
		blockchainRepo:  blockchainRepo,
	}
}

/** cep = ClientEventProcessor */
func (cep *ClientEventProcessor) PollClientRegistrationEvents(filePath string) {
	lastBlock := uint64(0)

	for {
		blockNumber, err := cep.client.BlockNumber(context.Background())
		if err != nil {
			log.Printf("Error getting the latest block number: %s", err)
			time.Sleep(10 * time.Second)
			continue
		}

		if blockNumber > lastBlock {
			cep.processNewBlocks(&lastBlock, blockNumber)
		}

		cep.writeEventsToFile(filePath)
		time.Sleep(10 * time.Second)
	}
}

/** cep = ClientEventProcessor */
func (cep *ClientEventProcessor) processNewBlocks(lastBlock *uint64, blockNumber uint64) {
	query := ethereum.FilterQuery{
		Addresses: []common.Address{cep.contractAddress},
	}

	blockRangeLimit := uint64(200)
	for fromBlock := *lastBlock; fromBlock < blockNumber; fromBlock += blockRangeLimit {
		toBlock := fromBlock + blockRangeLimit
		if toBlock > blockNumber {
			toBlock = blockNumber
		}

		query.FromBlock = new(big.Int).SetUint64(fromBlock)
		query.ToBlock = new(big.Int).SetUint64(toBlock)

		if logs, err := cep.client.FilterLogs(context.Background(), query); err == nil {
			for _, vLog := range logs {
				if event, err := cep.blockchainRepo.ParseEvent(vLog); err == nil {
					cep.events = append(cep.events, event)
					log.Printf("Evento recebido e processado: %+v", event)
				}
			}
		}
	}

	*lastBlock = blockNumber
}

/** cep = ClientEventProcessor */
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
