package usecase

import (
	"fmt"
	"math/big"
	pointCoreContract "service/pkg"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
)

// PointCoreEthereumSC representa um contrato Ethereum PointCore.
type PointCoreEthereumSC struct {
	conn     *ethclient.Client
	contract *pointCoreContract.PointCore
}

// NewPointCoreEthereumSC cria uma nova instância do contrato Ethereum PointCore.
func NewPointCoreEthereumSC(rpcEndpoint, contractAddress string) (*PointCoreEthereumSC, error) {
	conn, err := ethclient.Dial(rpcEndpoint)
	if err != nil {
		return nil, fmt.Errorf("falha ao conectar ao cliente Ethereum: %v", err)
	}

	address := common.HexToAddress(contractAddress)
	contract, err := pointCoreContract.NewPointCore(address, conn)
	if err != nil {
		return nil, fmt.Errorf("falha ao instanciar o contrato Ethereum: %v", err)
	}

	return &PointCoreEthereumSC{
		conn:     conn,
		contract: contract,
	}, nil
}

func (ec *PointCoreEthereumSC) GetCustomerGoldThreshold() (*big.Int, error) {
	customerGoldThreshold, err := ec.contract.PointsForGold(nil)
	if err != nil {
		return nil, fmt.Errorf("falha ao recuperar o valor CUSTOMERGOLD: %v", err)
	}
	return customerGoldThreshold, nil
}

func (ec *PointCoreEthereumSC) GetPointsForPremiumThreshold() (*big.Int, error) {
	pointsForPremiumThreshold, err := ec.contract.PointsForPremium(nil)
	if err != nil {
		return nil, fmt.Errorf("falha ao recuperar o valor PointsForPremium: %v", err)
	}
	return pointsForPremiumThreshold, nil
}

func (ec *PointCoreEthereumSC) GetPointsForTitaniumThreshold() (*big.Int, error) {
	pointsForTitaniumThreshold, err := ec.contract.PointsForTitanium(nil)
	if err != nil {
		return nil, fmt.Errorf("falha ao recuperar o valor PointsForTitanium: %v", err)
	}
	return pointsForTitaniumThreshold, nil
}
