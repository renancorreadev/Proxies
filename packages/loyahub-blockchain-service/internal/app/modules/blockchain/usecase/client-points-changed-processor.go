package usecase

import (
	"context"
	"service/internal/app/modules/blockchain/domain" // Supondo que MetadataUpdater esteja aqui
	"service/internal/app/modules/blockchain/repository"
)

type ClientPointsChangedEventProcessor struct {
	blockchainRepo *repository.EthBlockchainRepository
	metadataUpdater domain.MetadataUpdaterURI 
}

// Inclua MetadataUpdater na função de inicialização
func NewClientPointsChangedEventProcessor(blockchainRepo *repository.EthBlockchainRepository, metadataUpdater domain.MetadataUpdaterURI) *ClientPointsChangedEventProcessor {
	return &ClientPointsChangedEventProcessor{
		blockchainRepo: blockchainRepo,
		metadataUpdater: metadataUpdater, // Inicialize o campo
	}
}

func (cep *ClientPointsChangedEventProcessor) StartEventListening(ctx context.Context) {
	// Passe metadataUpdater para SubscribeToClientPointsChangedEvent
	cep.blockchainRepo.SubscribeToClientPointsChangedEvent(ctx, cep.metadataUpdater)
}
