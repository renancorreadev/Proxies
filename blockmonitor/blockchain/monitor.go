package blockchain

import (
	"context"
	"log"
	"math/big"
	"time"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
)

func PollClientRegistrationEvents(client *ethclient.Client, contractAddress common.Address, contractAbi abi.ABI, filePath string) {
	query := ethereum.FilterQuery{
		Addresses: []common.Address{contractAddress},
	}

	lastBlock := uint64(0)
	blockRangeLimit := uint64(200) // Defina o número de blocos a serem verificados por vez

	for {
		// Obtém o número do bloco mais recente
		blockNumber, err := client.BlockNumber(context.Background())
		if err != nil {
			log.Printf("Erro ao obter o número do bloco mais recente: %s", err)
			time.Sleep(10 * time.Second)
			continue
		}

		if blockNumber > lastBlock {
			for fromBlock := lastBlock; fromBlock < blockNumber; fromBlock += blockRangeLimit {
				toBlock := fromBlock + blockRangeLimit
				if toBlock > blockNumber {
					toBlock = blockNumber
				}

				query.FromBlock = big.NewInt(0).SetUint64(fromBlock)
				query.ToBlock = big.NewInt(0).SetUint64(toBlock)

				logs, err := client.FilterLogs(context.Background(), query)
				if err != nil {
					log.Printf("Erro ao filtrar logs: %s", err)
					break
				}

				for _, vLog := range logs {
					event, err := parseEvent(contractAbi, vLog)
					if err != nil {
						log.Printf("Erro ao analisar o evento: %s", err)
						continue
					}
					if err := SaveEventToFile(event, filePath); err != nil {
						log.Printf("Erro ao salvar o evento no arquivo: %s", err)
					}
				}
			}
			lastBlock = blockNumber
		}

		time.Sleep(10 * time.Second)
	}
}
