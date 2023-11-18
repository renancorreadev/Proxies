package domain

import (
	"encoding/json"
	"os"
)

var Events []ClientData

func WriteToFile(filePath string) error {
	file, err := os.OpenFile(filePath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0644)
	if err != nil {
		return err
	}
	defer file.Close()

	jsonData, err := json.Marshal(Events)
	if err != nil {
		return err
	}

	_, err = file.Write(jsonData)
	return err
}
