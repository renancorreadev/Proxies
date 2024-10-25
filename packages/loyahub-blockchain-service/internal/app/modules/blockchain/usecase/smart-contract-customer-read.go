package usecase

import (
	"fmt"
	"math/big"
	customerManagementContract "service/pkg"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
)

// CustomerEthereumSC representa um contrato Ethereum PointCore.
type CustomerEthereumSC struct {
	conn     *ethclient.Client
	contract *customerManagementContract.CustomerManagementCore
}

// NewCustomerEthereumSC cria uma nova instância do contrato Ethereum PointCore.
func NewCustomerEthereumSC(rpcEndpoint, contractAddress string) (*CustomerEthereumSC, error) {
	conn, err := ethclient.Dial(rpcEndpoint)
	if err != nil {
		return nil, fmt.Errorf("falha ao conectar ao cliente Ethereum: %v", err)
	}

	address := common.HexToAddress(contractAddress)
	contract, err := customerManagementContract.NewCustomerManagementCore(address, conn)
	if err != nil {
		return nil, fmt.Errorf("falha ao instanciar o contrato Ethereum: %v", err)
	}

	return &CustomerEthereumSC{
		conn:     conn,
		contract: contract,
	}, nil

}

func (ec *CustomerEthereumSC) GetClientName(clientID *big.Int) (string, error) {
	clientName, err := ec.contract.GetClientName(nil, clientID)
	if err != nil {
			return "", fmt.Errorf("falha ao recuperar o nome do cliente para o ID %v: %v", clientID, err)
	}
	return clientName, nil
}


