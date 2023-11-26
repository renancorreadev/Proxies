package config

import (
	"fmt"
	"log"
	"os"
	smartContract "service/internal/app/modules/blockchain/usecase"
)

// InitializeSmartContract inicializa o contrato Ethereum e retorna uma instância dele.
func InitializeSmartContract() (*smartContract.PointCoreEthereumSC, error) {
	rpcEndpoint := os.Getenv("BLOCKCHAIN_NODE_RPC")
	contractAddress := os.Getenv("POINT_CORE_CONTRACT_ADDRESS")

	pointCoreScInstance, err := smartContract.NewPointCoreEthereumSC(rpcEndpoint, contractAddress)
	if err != nil {
		return nil, fmt.Errorf("falha ao criar instância do contrato Ethereum: %v", err)
	}


	/// @dev Getters
	customerGoldThreshold, err := pointCoreScInstance.GetCustomerGoldThreshold()
	if err != nil {
		return nil, fmt.Errorf("falha ao obter o valor do Limiar de Ouro do Cliente: %v", err)
	}

	pointsForPremiumThreshold, err := pointCoreScInstance.GetPointsForPremiumThreshold()
	if err != nil {
		return nil, fmt.Errorf("falha ao obter o valor do Limiar de Pró-Preço: %v", err)
	}

	pointsForTitaniumThreshold, err := pointCoreScInstance.GetPointsForTitaniumThreshold()
	if err != nil {
		return nil, fmt.Errorf("falha ao obter o valor do Limiar de Titânio: %v", err)
	}

	log.Printf("Limiar de Ouro do Cliente: %v", customerGoldThreshold)
	log.Printf("Limiar de Pró-Preço: %v", pointsForPremiumThreshold)
	log.Printf("Limiar de Titânio: %v", pointsForTitaniumThreshold)

	return pointCoreScInstance, nil
}
