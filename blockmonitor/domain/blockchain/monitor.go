package blockchain

import (
	"blockmonitor/domain"
	"context"
	"log"
	"math/big"
	"time"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
)

func PollClientRegistrationEvents(client *ethclient.Client, contractAddress common.Address, contractAbi abi.ABI, filePath string) {
	lastBlock := uint64(0)

	for {
		blockNumber, err := updateBlockNumber(client)
		if err != nil {
			continue
		}

		if blockNumber > lastBlock {
			processNewBlocks(client, contractAddress, contractAbi, &lastBlock, blockNumber)
		}

		writeEventsToFile(filePath)

		time.Sleep(10 * time.Second)
	}
}

func updateBlockNumber(client *ethclient.Client) (uint64, error) {
	blockNumber, err := client.BlockNumber(context.Background())
	if err != nil {
		log.Printf("Error getting the latest block number: %s", err)
		time.Sleep(10 * time.Second)
		return 0, err
	}
	return blockNumber, nil
}

func processNewBlocks(client *ethclient.Client, contractAddress common.Address, contractAbi abi.ABI, lastBlock *uint64, blockNumber uint64) {
	query := ethereum.FilterQuery{
		Addresses: []common.Address{contractAddress},
	}

	blockRangeLimit := uint64(200)
	for fromBlock := *lastBlock; fromBlock < blockNumber; fromBlock += blockRangeLimit {
		toBlock := fromBlock + blockRangeLimit
		if toBlock > blockNumber {
			toBlock = blockNumber
		}

		query.FromBlock = new(big.Int).SetUint64(fromBlock)
		query.ToBlock = new(big.Int).SetUint64(toBlock)

		if logs, err := client.FilterLogs(context.Background(), query); err == nil {
			processLogs(logs, contractAbi)
		}
	}

	*lastBlock = blockNumber
}

func processLogs(logs []types.Log, contractAbi abi.ABI) {
	for _, vLog := range logs {
		if event, err := parseEvent(contractAbi, vLog); err == nil {
			domain.Events = append(domain.Events, event)
		}
	}
}

func writeEventsToFile(filePath string) {
	if len(domain.Events) > 0 {
		if err := domain.WriteToFile(filePath); err != nil {
			log.Printf("Error writing events to file: %s", err)
		}
		domain.Events = []domain.ClientData{} // Clear events list
	}
}
