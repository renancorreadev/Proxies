package domain

import (
	"math/big"
)

type ClientData struct {
	ClientId *big.Int
	Name     string
	Age      *big.Int
}
