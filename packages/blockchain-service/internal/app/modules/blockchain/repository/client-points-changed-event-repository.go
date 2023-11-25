package repository

import (
	"errors"
	"math/big"
	"service/internal/app/modules/blockchain/domain"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/core/types"
)

type ClientPointsChangedBlockchainRepository interface {
	ClientPointsChangedEventListener(vLog types.Log) (domain.ClientData, error)
}

/// @dev new Client Points Changed Blockchain Repository
func NewCPCBlockchainRepository(contractAbi abi.ABI) *EthBlockchainRepository {
	return &EthBlockchainRepository{
		clientContractABI: contractAbi,
	}
}

func (r *EthBlockchainRepository) ClientPointsChangedEventListener(vLog types.Log) (domain.ClientPointsChangedEvent, error) {
	var event domain.ClientPointsChangedEvent

	eventName := "ClientPointsChanged"
	eventID := r.clientContractABI.Events[eventName].ID

	if vLog.Topics[0] == eventID {
		clientId := new(big.Int).SetBytes(vLog.Topics[1][:])
		event.ClientID = clientId

		err := r.clientContractABI.UnpackIntoInterface(&event, eventName, vLog.Data)
		if err != nil {
			return domain.ClientPointsChangedEvent{}, err
		}

		return event, nil
	}

	return domain.ClientPointsChangedEvent{}, errors.New("log event ID does not match")
}
