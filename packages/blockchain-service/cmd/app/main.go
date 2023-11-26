package main

import (
	"context"
	"fmt"
	"log"
	config "service/config/initializers"
	smartContract "service/internal/app/modules/blockchain/usecase"
)

func main() {
    log.Println("Starting block monitor...")

    // Inicializar o processador de eventos
    _, err := config.InitializeClientPointsChangedProcessor()
    if err != nil {
        log.Fatalf("Erro ao inicializar o processador de eventos Client: %v", err)
    }
    pointsToGoldThreshold, err :=smartContract.GetCustomerGoldThreshold()
    if err != nil {
        log.Fatalf("Erro ao recuperar o valor CUSTOMERGOLD: %v", err)
    }
    fmt.Println(pointsToGoldThreshold.String())

    <-context.Background().Done()
}
