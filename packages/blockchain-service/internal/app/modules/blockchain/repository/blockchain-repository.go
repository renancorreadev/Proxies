package repository

import (
	"errors"
	"math/big"
	"service/internal/app/modules/blockchain/domain"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/core/types"
)

type BlockchainRepository interface {
	ParseEvent(vLog types.Log) (domain.ClientData, error)
}

type EthBlockchainRepository struct {
	clientContractABI abi.ABI
}

func NewBlockchainRepository(contractAbi abi.ABI) *EthBlockchainRepository {
	return &EthBlockchainRepository{
		clientContractABI: contractAbi,
	}
}

func (r *EthBlockchainRepository) ParseEvent(vLog types.Log) (domain.ClientData, error) {
	var event domain.ClientData

	eventName := "ClientRegistered"
	eventID := r.clientContractABI.Events[eventName].ID

	if vLog.Topics[0] == eventID {
		clientId := new(big.Int).SetBytes(vLog.Topics[1][:])
		event.ClientId = clientId

		err := r.clientContractABI.UnpackIntoInterface(&event, eventName, vLog.Data)
		if err != nil {
			return domain.ClientData{}, err
		}

		return event, nil
	}

	return domain.ClientData{}, errors.New("log event ID does not match")
}




