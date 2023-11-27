package utils

import (
	"fmt"
	"log"
	"math/big"
	"os"
	smartContractCustomer "service/internal/app/modules/blockchain/usecase"
)

// InitializeSmartContract inicializa o contrato Ethereum e retorna uma instância dele.
func InitializeCustomerSC(clientID *big.Int) (string, error) {
	rpcEndpoint := os.Getenv("BLOCKCHAIN_NODE_RPC")
	contractAddress := os.Getenv("CUSTOMER_MANAGEMENT_CONTRACT_ADDRESS")

	customerContractInstance, err := smartContractCustomer.NewCustomerEthereumSC(rpcEndpoint, contractAddress)
	if err != nil {
			return "", fmt.Errorf("falha ao criar instância do contrato Ethereum: %v", err)
	}

	// @dev Getters
	clientName, err := customerContractInstance.GetClientName(clientID)
	if err != nil {
			return "", fmt.Errorf("falha ao obter o nome do cliente para o ID %v: %v", clientID, err)
	}

	log.Printf("Nome do Cliente: %s", clientName)
	return clientName, nil
}
