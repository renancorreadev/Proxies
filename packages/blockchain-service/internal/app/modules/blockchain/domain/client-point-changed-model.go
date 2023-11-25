package domain

import "math/big"

type ClientPointsChangedEvent struct {
	ClientId  *big.Int
	NewPoints *big.Int
}
