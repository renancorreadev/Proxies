package repository

import (
	"github.com/ethereum/go-ethereum/accounts/abi"
)

type EthBlockchainRepository struct {
	clientContractABI abi.ABI
}
