package blockchain

/** MonitorClientRegistrationEvents
 * A chamada client.SubscribeFilterLogs é utilizada para se inscrever nos logs de eventos do contrato.
  Os eventos são recebidos através do canal logs e processados.
	Para cada evento, parseEvent é chamada para extrair os dados do evento, e SaveEventToFile é usada para salvá-los no
  arquivo especificado.
*/

import (
	"context"
	"log"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
)

func MonitorClientRegistrationEvents(client *ethclient.Client, contractAddress common.Address, contractAbi abi.ABI, filePath string) {
	query := ethereum.FilterQuery{
		Addresses: []common.Address{contractAddress},
	}

	logs := make(chan types.Log)
	sub, err := client.SubscribeFilterLogs(context.Background(), query, logs)
	if err != nil {
		log.Fatalf("Falha na inscrição de eventos: %s", err)
	}

	for {
		select {
		case err := <-sub.Err():
			log.Fatal(err)
		case vLog := <-logs:
			event, err := parseEvent(contractAbi, vLog)
			if err != nil {
				log.Printf("Erro ao analisar o evento: %s", err)
				continue
			}
			err = SaveEventToFile(event, filePath)
			if err != nil {
				log.Printf("Erro ao salvar o evento no arquivo: %s", err)
			}
		}
	}
}
