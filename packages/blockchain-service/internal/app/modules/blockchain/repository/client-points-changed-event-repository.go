package repository

import (
	"context"
	"log"
	"math/big"
	domain "service/internal/app/modules/blockchain/domain"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
)

type EthBlockchainRepository struct {
    clientContractABI         abi.ABI
    pointCoreContractAddress  common.Address
    ethereumClient            *ethclient.Client
}

func NewCPCBlockchainRepository(client *ethclient.Client, contractAbi abi.ABI, contractAddress string) *EthBlockchainRepository {
    return &EthBlockchainRepository{
        clientContractABI:        contractAbi,
        pointCoreContractAddress: common.HexToAddress(contractAddress),
        ethereumClient:           client,
    }
}

func (r *EthBlockchainRepository) SubscribeToClientPointsChangedEvent(ctx context.Context, updater domain.MetadataUpdaterURI) {
    query := ethereum.FilterQuery{
        Addresses: []common.Address{r.pointCoreContractAddress},
    }

    logs := make(chan types.Log)
    sub, err := r.ethereumClient.SubscribeFilterLogs(ctx, query, logs)
    if err != nil {
        log.Fatalf("Failed to subscribe to logs: %v", err)
    }

    go func() {
        for {
            select {
            case err := <-sub.Err():
                log.Fatalf("Subscription error: %v", err)

            case vLog := <-logs:
                event, err := r.processLog(vLog)
                if err != nil || event == nil {
                    continue // Ignora logs irrelevantes ou erros
                }
                log.Printf("Event received - ClientID: %s, NewPoints: %s", event.ClientId.String(), event.NewPoints.String())

                // Atualiza os metadados do NFT com base nos pontos do cliente e nos limiares
                err = updater.UpdateMetadata(ctx, event.ClientId.String(), event.NewPoints)
                if err != nil {
                    log.Printf("Erro ao atualizar metadata: %v", err)
                    continue
                }
            }
        }
    }()
}

func (r *EthBlockchainRepository) processLog(vLog types.Log) (*domain.ClientPointsChangedEvent, error) {
    eventName := "ClientPointsChanged"
    if vLog.Topics[0].Hex() != r.clientContractABI.Events[eventName].ID.Hex() {
        return nil, nil // Retorna nil para ignorar logs irrelevantes
    }

    event := &domain.ClientPointsChangedEvent{
        ClientId:  new(big.Int).SetBytes(vLog.Topics[1][:]),
        NewPoints: new(big.Int).SetBytes(vLog.Data),
    }

    return event, nil
}
