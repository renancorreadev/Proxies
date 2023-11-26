package usecase

import (
	"fmt"
	"math/big"
	"os"

	pointCoreContract "service/pkg"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
)

func GetCustomerGoldThreshold() (*big.Int, error) {
	contract, err := initializeConnection()
	if err != nil {
		return nil, fmt.Errorf("Falha ao inicializar a conexão e o contrato Ethereum: %v", err)
	}

	pointsToGoldThreshold, err := contract.PointsForGold(nil)
	if err != nil {
		return nil, fmt.Errorf("Falha ao recuperar o valor CUSTOMERGOLD: %v", err)
	}
	return pointsToGoldThreshold, nil
}

func initializeConnection() (*pointCoreContract.PointCore, error) {
	rpcEndpoint := os.Getenv("BLOCKCHAIN_NODE_RPC")

	conn, err := ethclient.Dial(rpcEndpoint)
	if err != nil {
		return nil, err
	}

	contractAddressHex := os.Getenv("POINT_CORE_CONTRACT_ADDRESS")
	address := common.HexToAddress(contractAddressHex)

	contract, err := pointCoreContract.NewPointCore(address, conn)
	if err != nil {
		return nil, err
	}

	return contract, nil
}