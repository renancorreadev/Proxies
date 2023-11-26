package domain

import (
	"context"
	"math/big"
)

type MetadataUpdaterURI interface {
    UpdateMetadata(ctx context.Context, clientID string, newPoints *big.Int) error
}
