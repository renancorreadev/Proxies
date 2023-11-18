package domain

import "time"

type Job struct {
	id        int
	client    string
	status    string
	startedAt time.Time
	createdAt time.Time
	updatedAt time.Time
}
