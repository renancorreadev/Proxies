package repository

import (
	"context"
	"errors"
	"log"
	"math/big"
	domain "service/internal/app/modules/blockchain/domain"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
)

type EthBlockchainRepository struct {
	clientContractABI        abi.ABI
	pointCoreContractAddress common.Address
	ethereumClient           *ethclient.Client
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

				// Recupera os pontos totais do cliente pelo contrato
				totalPoints, err := r.GetClientTotalPoints(ctx, event.ClientId)
				if err != nil {
					log.Printf("Erro ao recuperar total de pontos: %v", err)
					continue
				}

				log.Printf("Event received - ClientID: %s, TotalPoints: %s", event.ClientId.String(), totalPoints.String())

				// Atualiza os metadados do NFT com base nos pontos do cliente e nos limiares
				err = updater.UpdateMetadata(ctx, event.ClientId.String(), totalPoints)
				if err != nil {
					log.Printf("Erro ao atualizar metadata: %v", err)
					continue
				}
			}
		}
	}()
}

func (r *EthBlockchainRepository) GetClientTotalPoints(ctx context.Context, clientID *big.Int) (*big.Int, error) {
	// Cria uma instância do contrato utilizando a ABI e o endereço do contrato
	contract := bind.NewBoundContract(r.pointCoreContractAddress, r.clientContractABI, r.ethereumClient, r.ethereumClient, r.ethereumClient)

	callOpts := &bind.CallOpts{
		Context: ctx,
	}

	// O slice de interface{} para os argumentos de saída
	var result []interface{}

	// Chama a função 'getClientPoints' do contrato
	err := contract.Call(callOpts, &result, "getClientPoints", clientID)
	if err != nil {
		log.Printf("Erro ao chamar getClientPoints: %v", err)
		return nil, err
	}

	// Verifica se o resultado foi recebido corretamente
	if len(result) == 0 || result[0] == nil {
		return nil, errors.New("nenhum ponto foi retornado pelo contrato")
	}

	// Faz uma asserção de tipo para converter o resultado para *big.Int
	totalPoints, ok := result[0].(*big.Int)
	if !ok {
		return nil, errors.New("o resultado não pôde ser convertido para *big.Int")
	}

	return totalPoints, nil
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
