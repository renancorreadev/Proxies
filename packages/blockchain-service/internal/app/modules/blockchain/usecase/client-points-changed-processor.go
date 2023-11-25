package usecase

import (
	"context"
	"service/internal/app/modules/blockchain/repository"
)

type ClientPointsChangedEventProcessor struct {
	blockchainRepo *repository.EthBlockchainRepository
}

func NewClientPointsChangedEventProcessor(blockchainRepo *repository.EthBlockchainRepository) *ClientPointsChangedEventProcessor {
	return &ClientPointsChangedEventProcessor{
		blockchainRepo: blockchainRepo,
	}
}

func (cep *ClientPointsChangedEventProcessor) StartEventListening(ctx context.Context) {
	cep.blockchainRepo.SubscribeToClientPointsChangedEvent(ctx)
}
