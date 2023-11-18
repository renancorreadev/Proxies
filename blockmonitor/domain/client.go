package domain

import "github.com/ethereum/go-ethereum/common"

type AddressLocal struct {
	City        string
	Street      string
	PostalCode  uint64
	HouseNumber uint64
}

type ClientData struct {
	ClientId      uint64
	Name          string
	Age           uint64
	WalletAddress common.Address
	PaymentStatus uint64
	AddressLocal  AddressLocal
}
