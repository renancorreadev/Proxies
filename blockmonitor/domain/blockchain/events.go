package blockchain

import (
	"blockmonitor/domain"
	"encoding/json"
	"errors"
	"math/big"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/core/types"
)

func parseEvent(contractAbi abi.ABI, vLog types.Log) (domain.ClientData, error) {
	var event domain.ClientData

	eventName := "ClientRegistered"
	eventID := contractAbi.Events[eventName].ID

	if vLog.Topics[0] == eventID {
		clientId := new(big.Int).SetBytes(vLog.Topics[1][:])
		event.ClientId = clientId

		err := contractAbi.UnpackIntoInterface(&event, eventName, vLog.Data)
		if err != nil {
			return domain.ClientData{}, err
		}

		return event, nil
	}

	return domain.ClientData{}, errors.New("log event ID does not match")
}

func FormatEventAsJSON(event domain.ClientData) (string, error) {
	jsonData, err := json.Marshal(event)
	if err != nil {
		return "", err
	}
	return string(jsonData), nil
}
