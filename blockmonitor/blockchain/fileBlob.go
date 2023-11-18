package blockchain

import (
	"blockmonitor/domain"
	"encoding/json"
	"os"
)

func SaveEventToFile(event domain.ClientData, filePath string) error {
	file, err := os.OpenFile(filePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return err
	}
	defer file.Close()

	eventData, err := json.Marshal(event)
	if err != nil {
		return err
	}

	_, err = file.Write(eventData)
	if err != nil {
		return err
	}

	// Adiciona uma nova linha após cada evento
	_, err = file.WriteString("\n")
	return err
}
