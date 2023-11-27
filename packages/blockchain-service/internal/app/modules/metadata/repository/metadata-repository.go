package repository

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"service/internal/app/modules/blockchain/usecase"
	"service/internal/app/modules/metadata/domain"
)

type BlockchainRepository interface {
    GetThresholds(ctx context.Context) (domain.Thresholds, error)
    UpdateMetadata(ctx context.Context, clientID string, metadata domain.Metadata) error
}

type CustomerNameGetter interface {
	GetCustomerName(ctx context.Context, clientID string) (string, error)
}

type PointCoreSmartContractRepository struct {
	// Instância do contrato Ethereum PointCore
	PointCoreScInstance *usecase.PointCoreEthereumSC 
}

func NewPointCoreSmartContractRepository(pointCoreScInstance *usecase.PointCoreEthereumSC) *PointCoreSmartContractRepository {
	return &PointCoreSmartContractRepository{
		PointCoreScInstance: pointCoreScInstance,
	}
}
func (r *PointCoreSmartContractRepository) GetThresholds(ctx context.Context) (domain.Thresholds, error) {
	rpcEndpoint := os.Getenv("BLOCKCHAIN_NODE_RPC")
	contractAddress := os.Getenv("POINT_CORE_CONTRACT_ADDRESS")

	pointCoreScInstance, err := usecase.NewPointCoreEthereumSC(rpcEndpoint, contractAddress)
	if err != nil {
			return domain.Thresholds{}, fmt.Errorf("falha ao criar instância do contrato Ethereum: %v", err)
	}

	goldThreshold, err := pointCoreScInstance.GetCustomerGoldThreshold()
	if err != nil {
			return domain.Thresholds{}, fmt.Errorf("falha ao obter o valor do Limiar de Ouro do Cliente: %v", err)
	}

	premiumThreshold, err := pointCoreScInstance.GetPointsForPremiumThreshold()
	if err != nil {
			return domain.Thresholds{}, fmt.Errorf("falha ao obter o valor do Limiar de Pró-Preço: %v", err)
	}

	titaniumThreshold, err := pointCoreScInstance.GetPointsForTitaniumThreshold()
	if err != nil {
			return domain.Thresholds{}, fmt.Errorf("falha ao obter o valor do Limiar de Titânio: %v", err)
	}

	goldThresholdInt64 := goldThreshold.Int64() // Converte *big.Int para int64
	premiumThresholdInt64 := premiumThreshold.Int64() // Converte *big.Int para int64
	titaniumThresholdInt64 := titaniumThreshold.Int64() // Converte *big.Int para int64


	return domain.Thresholds{
			PointsForGold: goldThresholdInt64,
			PointsForPremium: premiumThresholdInt64,
			PointsForTitanium: titaniumThresholdInt64,
	}, nil
}

func (r *PointCoreSmartContractRepository) UpdateMetadata(ctx context.Context, clientID string, metadata domain.Metadata) error {
    jsonData, err := json.Marshal(metadata)
    if err != nil {
        return fmt.Errorf("erro ao serializar metadata: %w", err)
    }

    url := fmt.Sprintf("http://localhost:3001/api/v1/metadata/update/%s", clientID)
    req, err := http.NewRequestWithContext(ctx, "PATCH", url, bytes.NewBuffer(jsonData))
    if err != nil {
        return fmt.Errorf("erro ao criar request: %w", err)
    }

    req.Header.Set("Content-Type", "application/json")
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return fmt.Errorf("erro ao realizar request: %w", err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return fmt.Errorf("request falhou com status code: %d", resp.StatusCode)
    }

    return nil
}
