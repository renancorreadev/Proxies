package domain

import "math/big"

type ClientPointsChangedEvent struct {
	ClientID   *big.Int
	NewPoints  *big.Int
}
