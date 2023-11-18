package blockchain

import (
	"blockmonitor/domain"
	"errors"
	"math/big"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/core/types"
)

func parseEvent(contractAbi abi.ABI, vLog types.Log) (domain.ClientData, error) {
	var event domain.ClientData

	eventName := "ClientRegistered"

	// ID do evento
	eventID := contractAbi.Events[eventName].ID

	if vLog.Topics[0] == eventID {
		err := contractAbi.UnpackIntoInterface(&event, eventName, vLog.Data)
		if err != nil {
			return domain.ClientData{}, err
		}

		// ID do cliente
		if len(vLog.Topics) > 1 {
			event.ClientId = new(big.Int).SetBytes(vLog.Topics[1].Bytes()).Uint64()
		}

		return event, nil
	}

	return domain.ClientData{}, errors.New("log event ID does not match")
}
