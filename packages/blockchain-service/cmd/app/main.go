package main

import (
	"context"
	"log"
	config "service/config/initializers"
)

func main() {
    log.Println("Starting block monitor...")

    // Inicializar o processador de eventos
    _, err := config.InitializeClientPointsChangedProcessor()
    if err != nil {
        log.Fatalf("Erro ao inicializar o processador de eventos Client: %v", err)
    }


    pointCoreScInstance, errContract := config.InitializeSmartContract()
	if errContract != nil {
		log.Fatalf("Erro ao inicializar o contrato Ethereum: %v", errContract)
	}

	// Chamar as funções e verificar os erros individualmente
	if _, err := pointCoreScInstance.GetCustomerGoldThreshold(); err != nil {
		log.Fatalf("Erro na GetCustomerGoldThreshold: %v", err)
	}

	if _, err := pointCoreScInstance.GetPointsForPremiumThreshold(); err != nil {
		log.Fatalf("Erro na GetPointsForPremiumThreshold: %v", err)
	}

	if _, err := pointCoreScInstance.GetPointsForTitaniumThreshold(); err != nil {
		log.Fatalf("Erro na GetPointsForTitaniumThreshold: %v", err)
	}

    <-context.Background().Done()
}
