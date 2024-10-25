// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package pkg

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
	_ = abi.ConvertType
)

// ICustomerManagementStorageAddressLocal is an auto generated low-level Go binding around an user-defined struct.
type ICustomerManagementStorageAddressLocal struct {
	City        string
	Street      string
	PostalCode  *big.Int
	HouseNumber *big.Int
}

// ICustomerManagementStorageClientData is an auto generated low-level Go binding around an user-defined struct.
type ICustomerManagementStorageClientData struct {
	ClientId      *big.Int
	Name          string
	Age           *big.Int
	WalletAddress common.Address
	PaymentStatus uint8
	AddressLocal  ICustomerManagementStorageAddressLocal
}

// ICustomerManagementStorageClientDataInput is an auto generated low-level Go binding around an user-defined struct.
type ICustomerManagementStorageClientDataInput struct {
	Name          string
	Age           *big.Int
	WalletAddress common.Address
	PaymentStatus uint8
	AddressLocal  ICustomerManagementStorageAddressLocal
}

// CustomerManagementCoreMetaData contains all meta data concerning the CustomerManagementCore contract.
var CustomerManagementCoreMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"target\",\"type\":\"address\"}],\"name\":\"AddressEmptyCode\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"WalletAddress\",\"type\":\"address\"}],\"name\":\"ClientAlreadyExists\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"}],\"name\":\"ClientExists\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"implementation\",\"type\":\"address\"}],\"name\":\"ERC1967InvalidImplementation\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ERC1967NonPayable\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"message\",\"type\":\"string\"}],\"name\":\"EmptyParameter\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"FailedInnerCall\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"}],\"name\":\"InvalidClientID\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidInitialization\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"enumICustomerManagementStorage.PaymentStatus\",\"name\":\"status\",\"type\":\"uint8\"}],\"name\":\"InvalidPaymentStatus\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotInitializing\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"OwnableInvalidOwner\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"OwnableUnauthorizedAccount\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UUPSUnauthorizedCallContext\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"slot\",\"type\":\"bytes32\"}],\"name\":\"UUPSUnsupportedProxiableUUID\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"age\",\"type\":\"uint256\"}],\"name\":\"ClientRegistered\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"version\",\"type\":\"uint64\"}],\"name\":\"Initialized\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"implementation\",\"type\":\"address\"}],\"name\":\"Upgraded\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"UPGRADE_INTERFACE_VERSION\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"}],\"name\":\"getClientData\",\"outputs\":[{\"components\":[{\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"age\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"WalletAddress\",\"type\":\"address\"},{\"internalType\":\"enumICustomerManagementStorage.PaymentStatus\",\"name\":\"paymentStatus\",\"type\":\"uint8\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"City\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"Street\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"PostalCode\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"HouseNumber\",\"type\":\"uint256\"}],\"internalType\":\"structICustomerManagementStorage.AddressLocal\",\"name\":\"addressLocal\",\"type\":\"tuple\"}],\"internalType\":\"structICustomerManagementStorage.ClientData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"}],\"name\":\"getClientName\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"}],\"name\":\"getClientWalletAddress\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"clientAddress\",\"type\":\"address\"}],\"name\":\"getClientsByAddress\",\"outputs\":[{\"components\":[{\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"age\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"WalletAddress\",\"type\":\"address\"},{\"internalType\":\"enumICustomerManagementStorage.PaymentStatus\",\"name\":\"paymentStatus\",\"type\":\"uint8\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"City\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"Street\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"PostalCode\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"HouseNumber\",\"type\":\"uint256\"}],\"internalType\":\"structICustomerManagementStorage.AddressLocal\",\"name\":\"addressLocal\",\"type\":\"tuple\"}],\"internalType\":\"structICustomerManagementStorage.ClientData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"age\",\"type\":\"uint256\"}],\"name\":\"getClientsByAge\",\"outputs\":[{\"components\":[{\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"age\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"WalletAddress\",\"type\":\"address\"},{\"internalType\":\"enumICustomerManagementStorage.PaymentStatus\",\"name\":\"paymentStatus\",\"type\":\"uint8\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"City\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"Street\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"PostalCode\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"HouseNumber\",\"type\":\"uint256\"}],\"internalType\":\"structICustomerManagementStorage.AddressLocal\",\"name\":\"addressLocal\",\"type\":\"tuple\"}],\"internalType\":\"structICustomerManagementStorage.ClientData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"}],\"name\":\"getClientsByName\",\"outputs\":[{\"components\":[{\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"age\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"WalletAddress\",\"type\":\"address\"},{\"internalType\":\"enumICustomerManagementStorage.PaymentStatus\",\"name\":\"paymentStatus\",\"type\":\"uint8\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"City\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"Street\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"PostalCode\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"HouseNumber\",\"type\":\"uint256\"}],\"internalType\":\"structICustomerManagementStorage.AddressLocal\",\"name\":\"addressLocal\",\"type\":\"tuple\"}],\"internalType\":\"structICustomerManagementStorage.ClientData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"userAddress\",\"type\":\"address\"}],\"name\":\"getUserTokenID\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getVersion\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"initialize\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"}],\"name\":\"isClientExists\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"proxiableUUID\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"age\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"WalletAddress\",\"type\":\"address\"},{\"internalType\":\"enumICustomerManagementStorage.PaymentStatus\",\"name\":\"paymentStatus\",\"type\":\"uint8\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"City\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"Street\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"PostalCode\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"HouseNumber\",\"type\":\"uint256\"}],\"internalType\":\"structICustomerManagementStorage.AddressLocal\",\"name\":\"addressLocal\",\"type\":\"tuple\"}],\"internalType\":\"structICustomerManagementStorage.ClientDataInput\",\"name\":\"newClient\",\"type\":\"tuple\"}],\"name\":\"registerClient\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newImplementation\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"upgradeToAndCall\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"userTokenIDs\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]",
}

// CustomerManagementCoreABI is the input ABI used to generate the binding from.
// Deprecated: Use CustomerManagementCoreMetaData.ABI instead.
var CustomerManagementCoreABI = CustomerManagementCoreMetaData.ABI

// CustomerManagementCore is an auto generated Go binding around an Ethereum contract.
type CustomerManagementCore struct {
	CustomerManagementCoreCaller     // Read-only binding to the contract
	CustomerManagementCoreTransactor // Write-only binding to the contract
	CustomerManagementCoreFilterer   // Log filterer for contract events
}

// CustomerManagementCoreCaller is an auto generated read-only Go binding around an Ethereum contract.
type CustomerManagementCoreCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CustomerManagementCoreTransactor is an auto generated write-only Go binding around an Ethereum contract.
type CustomerManagementCoreTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CustomerManagementCoreFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type CustomerManagementCoreFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CustomerManagementCoreSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type CustomerManagementCoreSession struct {
	Contract     *CustomerManagementCore // Generic contract binding to set the session for
	CallOpts     bind.CallOpts           // Call options to use throughout this session
	TransactOpts bind.TransactOpts       // Transaction auth options to use throughout this session
}

// CustomerManagementCoreCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type CustomerManagementCoreCallerSession struct {
	Contract *CustomerManagementCoreCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts                 // Call options to use throughout this session
}

// CustomerManagementCoreTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type CustomerManagementCoreTransactorSession struct {
	Contract     *CustomerManagementCoreTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts                 // Transaction auth options to use throughout this session
}

// CustomerManagementCoreRaw is an auto generated low-level Go binding around an Ethereum contract.
type CustomerManagementCoreRaw struct {
	Contract *CustomerManagementCore // Generic contract binding to access the raw methods on
}

// CustomerManagementCoreCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type CustomerManagementCoreCallerRaw struct {
	Contract *CustomerManagementCoreCaller // Generic read-only contract binding to access the raw methods on
}

// CustomerManagementCoreTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type CustomerManagementCoreTransactorRaw struct {
	Contract *CustomerManagementCoreTransactor // Generic write-only contract binding to access the raw methods on
}

// NewCustomerManagementCore creates a new instance of CustomerManagementCore, bound to a specific deployed contract.
func NewCustomerManagementCore(address common.Address, backend bind.ContractBackend) (*CustomerManagementCore, error) {
	contract, err := bindCustomerManagementCore(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &CustomerManagementCore{CustomerManagementCoreCaller: CustomerManagementCoreCaller{contract: contract}, CustomerManagementCoreTransactor: CustomerManagementCoreTransactor{contract: contract}, CustomerManagementCoreFilterer: CustomerManagementCoreFilterer{contract: contract}}, nil
}

// NewCustomerManagementCoreCaller creates a new read-only instance of CustomerManagementCore, bound to a specific deployed contract.
func NewCustomerManagementCoreCaller(address common.Address, caller bind.ContractCaller) (*CustomerManagementCoreCaller, error) {
	contract, err := bindCustomerManagementCore(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &CustomerManagementCoreCaller{contract: contract}, nil
}

// NewCustomerManagementCoreTransactor creates a new write-only instance of CustomerManagementCore, bound to a specific deployed contract.
func NewCustomerManagementCoreTransactor(address common.Address, transactor bind.ContractTransactor) (*CustomerManagementCoreTransactor, error) {
	contract, err := bindCustomerManagementCore(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &CustomerManagementCoreTransactor{contract: contract}, nil
}

// NewCustomerManagementCoreFilterer creates a new log filterer instance of CustomerManagementCore, bound to a specific deployed contract.
func NewCustomerManagementCoreFilterer(address common.Address, filterer bind.ContractFilterer) (*CustomerManagementCoreFilterer, error) {
	contract, err := bindCustomerManagementCore(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &CustomerManagementCoreFilterer{contract: contract}, nil
}

// bindCustomerManagementCore binds a generic wrapper to an already deployed contract.
func bindCustomerManagementCore(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := CustomerManagementCoreMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_CustomerManagementCore *CustomerManagementCoreRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _CustomerManagementCore.Contract.CustomerManagementCoreCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_CustomerManagementCore *CustomerManagementCoreRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _CustomerManagementCore.Contract.CustomerManagementCoreTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_CustomerManagementCore *CustomerManagementCoreRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _CustomerManagementCore.Contract.CustomerManagementCoreTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_CustomerManagementCore *CustomerManagementCoreCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _CustomerManagementCore.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_CustomerManagementCore *CustomerManagementCoreTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _CustomerManagementCore.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_CustomerManagementCore *CustomerManagementCoreTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _CustomerManagementCore.Contract.contract.Transact(opts, method, params...)
}

// UPGRADEINTERFACEVERSION is a free data retrieval call binding the contract method 0xad3cb1cc.
//
// Solidity: function UPGRADE_INTERFACE_VERSION() view returns(string)
func (_CustomerManagementCore *CustomerManagementCoreCaller) UPGRADEINTERFACEVERSION(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _CustomerManagementCore.contract.Call(opts, &out, "UPGRADE_INTERFACE_VERSION")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// UPGRADEINTERFACEVERSION is a free data retrieval call binding the contract method 0xad3cb1cc.
//
// Solidity: function UPGRADE_INTERFACE_VERSION() view returns(string)
func (_CustomerManagementCore *CustomerManagementCoreSession) UPGRADEINTERFACEVERSION() (string, error) {
	return _CustomerManagementCore.Contract.UPGRADEINTERFACEVERSION(&_CustomerManagementCore.CallOpts)
}

// UPGRADEINTERFACEVERSION is a free data retrieval call binding the contract method 0xad3cb1cc.
//
// Solidity: function UPGRADE_INTERFACE_VERSION() view returns(string)
func (_CustomerManagementCore *CustomerManagementCoreCallerSession) UPGRADEINTERFACEVERSION() (string, error) {
	return _CustomerManagementCore.Contract.UPGRADEINTERFACEVERSION(&_CustomerManagementCore.CallOpts)
}

// GetClientData is a free data retrieval call binding the contract method 0xe3807f7b.
//
// Solidity: function getClientData(uint256 clientId) view returns((uint256,string,uint256,address,uint8,(string,string,uint256,uint256)))
func (_CustomerManagementCore *CustomerManagementCoreCaller) GetClientData(opts *bind.CallOpts, clientId *big.Int) (ICustomerManagementStorageClientData, error) {
	var out []interface{}
	err := _CustomerManagementCore.contract.Call(opts, &out, "getClientData", clientId)

	if err != nil {
		return *new(ICustomerManagementStorageClientData), err
	}

	out0 := *abi.ConvertType(out[0], new(ICustomerManagementStorageClientData)).(*ICustomerManagementStorageClientData)

	return out0, err

}

// GetClientData is a free data retrieval call binding the contract method 0xe3807f7b.
//
// Solidity: function getClientData(uint256 clientId) view returns((uint256,string,uint256,address,uint8,(string,string,uint256,uint256)))
func (_CustomerManagementCore *CustomerManagementCoreSession) GetClientData(clientId *big.Int) (ICustomerManagementStorageClientData, error) {
	return _CustomerManagementCore.Contract.GetClientData(&_CustomerManagementCore.CallOpts, clientId)
}

// GetClientData is a free data retrieval call binding the contract method 0xe3807f7b.
//
// Solidity: function getClientData(uint256 clientId) view returns((uint256,string,uint256,address,uint8,(string,string,uint256,uint256)))
func (_CustomerManagementCore *CustomerManagementCoreCallerSession) GetClientData(clientId *big.Int) (ICustomerManagementStorageClientData, error) {
	return _CustomerManagementCore.Contract.GetClientData(&_CustomerManagementCore.CallOpts, clientId)
}

// GetClientName is a free data retrieval call binding the contract method 0x1bbc9f48.
//
// Solidity: function getClientName(uint256 clientId) view returns(string)
func (_CustomerManagementCore *CustomerManagementCoreCaller) GetClientName(opts *bind.CallOpts, clientId *big.Int) (string, error) {
	var out []interface{}
	err := _CustomerManagementCore.contract.Call(opts, &out, "getClientName", clientId)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// GetClientName is a free data retrieval call binding the contract method 0x1bbc9f48.
//
// Solidity: function getClientName(uint256 clientId) view returns(string)
func (_CustomerManagementCore *CustomerManagementCoreSession) GetClientName(clientId *big.Int) (string, error) {
	return _CustomerManagementCore.Contract.GetClientName(&_CustomerManagementCore.CallOpts, clientId)
}

// GetClientName is a free data retrieval call binding the contract method 0x1bbc9f48.
//
// Solidity: function getClientName(uint256 clientId) view returns(string)
func (_CustomerManagementCore *CustomerManagementCoreCallerSession) GetClientName(clientId *big.Int) (string, error) {
	return _CustomerManagementCore.Contract.GetClientName(&_CustomerManagementCore.CallOpts, clientId)
}

// GetClientWalletAddress is a free data retrieval call binding the contract method 0x261b514a.
//
// Solidity: function getClientWalletAddress(uint256 clientId) view returns(address)
func (_CustomerManagementCore *CustomerManagementCoreCaller) GetClientWalletAddress(opts *bind.CallOpts, clientId *big.Int) (common.Address, error) {
	var out []interface{}
	err := _CustomerManagementCore.contract.Call(opts, &out, "getClientWalletAddress", clientId)

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// GetClientWalletAddress is a free data retrieval call binding the contract method 0x261b514a.
//
// Solidity: function getClientWalletAddress(uint256 clientId) view returns(address)
func (_CustomerManagementCore *CustomerManagementCoreSession) GetClientWalletAddress(clientId *big.Int) (common.Address, error) {
	return _CustomerManagementCore.Contract.GetClientWalletAddress(&_CustomerManagementCore.CallOpts, clientId)
}

// GetClientWalletAddress is a free data retrieval call binding the contract method 0x261b514a.
//
// Solidity: function getClientWalletAddress(uint256 clientId) view returns(address)
func (_CustomerManagementCore *CustomerManagementCoreCallerSession) GetClientWalletAddress(clientId *big.Int) (common.Address, error) {
	return _CustomerManagementCore.Contract.GetClientWalletAddress(&_CustomerManagementCore.CallOpts, clientId)
}

// GetClientsByAddress is a free data retrieval call binding the contract method 0x51f0fe34.
//
// Solidity: function getClientsByAddress(address clientAddress) view returns((uint256,string,uint256,address,uint8,(string,string,uint256,uint256)))
func (_CustomerManagementCore *CustomerManagementCoreCaller) GetClientsByAddress(opts *bind.CallOpts, clientAddress common.Address) (ICustomerManagementStorageClientData, error) {
	var out []interface{}
	err := _CustomerManagementCore.contract.Call(opts, &out, "getClientsByAddress", clientAddress)

	if err != nil {
		return *new(ICustomerManagementStorageClientData), err
	}

	out0 := *abi.ConvertType(out[0], new(ICustomerManagementStorageClientData)).(*ICustomerManagementStorageClientData)

	return out0, err

}

// GetClientsByAddress is a free data retrieval call binding the contract method 0x51f0fe34.
//
// Solidity: function getClientsByAddress(address clientAddress) view returns((uint256,string,uint256,address,uint8,(string,string,uint256,uint256)))
func (_CustomerManagementCore *CustomerManagementCoreSession) GetClientsByAddress(clientAddress common.Address) (ICustomerManagementStorageClientData, error) {
	return _CustomerManagementCore.Contract.GetClientsByAddress(&_CustomerManagementCore.CallOpts, clientAddress)
}

// GetClientsByAddress is a free data retrieval call binding the contract method 0x51f0fe34.
//
// Solidity: function getClientsByAddress(address clientAddress) view returns((uint256,string,uint256,address,uint8,(string,string,uint256,uint256)))
func (_CustomerManagementCore *CustomerManagementCoreCallerSession) GetClientsByAddress(clientAddress common.Address) (ICustomerManagementStorageClientData, error) {
	return _CustomerManagementCore.Contract.GetClientsByAddress(&_CustomerManagementCore.CallOpts, clientAddress)
}

// GetClientsByAge is a free data retrieval call binding the contract method 0xd13a3f80.
//
// Solidity: function getClientsByAge(uint256 age) view returns((uint256,string,uint256,address,uint8,(string,string,uint256,uint256)))
func (_CustomerManagementCore *CustomerManagementCoreCaller) GetClientsByAge(opts *bind.CallOpts, age *big.Int) (ICustomerManagementStorageClientData, error) {
	var out []interface{}
	err := _CustomerManagementCore.contract.Call(opts, &out, "getClientsByAge", age)

	if err != nil {
		return *new(ICustomerManagementStorageClientData), err
	}

	out0 := *abi.ConvertType(out[0], new(ICustomerManagementStorageClientData)).(*ICustomerManagementStorageClientData)

	return out0, err

}

// GetClientsByAge is a free data retrieval call binding the contract method 0xd13a3f80.
//
// Solidity: function getClientsByAge(uint256 age) view returns((uint256,string,uint256,address,uint8,(string,string,uint256,uint256)))
func (_CustomerManagementCore *CustomerManagementCoreSession) GetClientsByAge(age *big.Int) (ICustomerManagementStorageClientData, error) {
	return _CustomerManagementCore.Contract.GetClientsByAge(&_CustomerManagementCore.CallOpts, age)
}

// GetClientsByAge is a free data retrieval call binding the contract method 0xd13a3f80.
//
// Solidity: function getClientsByAge(uint256 age) view returns((uint256,string,uint256,address,uint8,(string,string,uint256,uint256)))
func (_CustomerManagementCore *CustomerManagementCoreCallerSession) GetClientsByAge(age *big.Int) (ICustomerManagementStorageClientData, error) {
	return _CustomerManagementCore.Contract.GetClientsByAge(&_CustomerManagementCore.CallOpts, age)
}

// GetClientsByName is a free data retrieval call binding the contract method 0x42324d7b.
//
// Solidity: function getClientsByName(string name) view returns((uint256,string,uint256,address,uint8,(string,string,uint256,uint256)))
func (_CustomerManagementCore *CustomerManagementCoreCaller) GetClientsByName(opts *bind.CallOpts, name string) (ICustomerManagementStorageClientData, error) {
	var out []interface{}
	err := _CustomerManagementCore.contract.Call(opts, &out, "getClientsByName", name)

	if err != nil {
		return *new(ICustomerManagementStorageClientData), err
	}

	out0 := *abi.ConvertType(out[0], new(ICustomerManagementStorageClientData)).(*ICustomerManagementStorageClientData)

	return out0, err

}

// GetClientsByName is a free data retrieval call binding the contract method 0x42324d7b.
//
// Solidity: function getClientsByName(string name) view returns((uint256,string,uint256,address,uint8,(string,string,uint256,uint256)))
func (_CustomerManagementCore *CustomerManagementCoreSession) GetClientsByName(name string) (ICustomerManagementStorageClientData, error) {
	return _CustomerManagementCore.Contract.GetClientsByName(&_CustomerManagementCore.CallOpts, name)
}

// GetClientsByName is a free data retrieval call binding the contract method 0x42324d7b.
//
// Solidity: function getClientsByName(string name) view returns((uint256,string,uint256,address,uint8,(string,string,uint256,uint256)))
func (_CustomerManagementCore *CustomerManagementCoreCallerSession) GetClientsByName(name string) (ICustomerManagementStorageClientData, error) {
	return _CustomerManagementCore.Contract.GetClientsByName(&_CustomerManagementCore.CallOpts, name)
}

// GetUserTokenID is a free data retrieval call binding the contract method 0x423411b1.
//
// Solidity: function getUserTokenID(address userAddress) view returns(uint256)
func (_CustomerManagementCore *CustomerManagementCoreCaller) GetUserTokenID(opts *bind.CallOpts, userAddress common.Address) (*big.Int, error) {
	var out []interface{}
	err := _CustomerManagementCore.contract.Call(opts, &out, "getUserTokenID", userAddress)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// GetUserTokenID is a free data retrieval call binding the contract method 0x423411b1.
//
// Solidity: function getUserTokenID(address userAddress) view returns(uint256)
func (_CustomerManagementCore *CustomerManagementCoreSession) GetUserTokenID(userAddress common.Address) (*big.Int, error) {
	return _CustomerManagementCore.Contract.GetUserTokenID(&_CustomerManagementCore.CallOpts, userAddress)
}

// GetUserTokenID is a free data retrieval call binding the contract method 0x423411b1.
//
// Solidity: function getUserTokenID(address userAddress) view returns(uint256)
func (_CustomerManagementCore *CustomerManagementCoreCallerSession) GetUserTokenID(userAddress common.Address) (*big.Int, error) {
	return _CustomerManagementCore.Contract.GetUserTokenID(&_CustomerManagementCore.CallOpts, userAddress)
}

// GetVersion is a free data retrieval call binding the contract method 0x0d8e6e2c.
//
// Solidity: function getVersion() pure returns(string)
func (_CustomerManagementCore *CustomerManagementCoreCaller) GetVersion(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _CustomerManagementCore.contract.Call(opts, &out, "getVersion")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// GetVersion is a free data retrieval call binding the contract method 0x0d8e6e2c.
//
// Solidity: function getVersion() pure returns(string)
func (_CustomerManagementCore *CustomerManagementCoreSession) GetVersion() (string, error) {
	return _CustomerManagementCore.Contract.GetVersion(&_CustomerManagementCore.CallOpts)
}

// GetVersion is a free data retrieval call binding the contract method 0x0d8e6e2c.
//
// Solidity: function getVersion() pure returns(string)
func (_CustomerManagementCore *CustomerManagementCoreCallerSession) GetVersion() (string, error) {
	return _CustomerManagementCore.Contract.GetVersion(&_CustomerManagementCore.CallOpts)
}

// IsClientExists is a free data retrieval call binding the contract method 0xc6123bd0.
//
// Solidity: function isClientExists(uint256 clientId) view returns(bool)
func (_CustomerManagementCore *CustomerManagementCoreCaller) IsClientExists(opts *bind.CallOpts, clientId *big.Int) (bool, error) {
	var out []interface{}
	err := _CustomerManagementCore.contract.Call(opts, &out, "isClientExists", clientId)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// IsClientExists is a free data retrieval call binding the contract method 0xc6123bd0.
//
// Solidity: function isClientExists(uint256 clientId) view returns(bool)
func (_CustomerManagementCore *CustomerManagementCoreSession) IsClientExists(clientId *big.Int) (bool, error) {
	return _CustomerManagementCore.Contract.IsClientExists(&_CustomerManagementCore.CallOpts, clientId)
}

// IsClientExists is a free data retrieval call binding the contract method 0xc6123bd0.
//
// Solidity: function isClientExists(uint256 clientId) view returns(bool)
func (_CustomerManagementCore *CustomerManagementCoreCallerSession) IsClientExists(clientId *big.Int) (bool, error) {
	return _CustomerManagementCore.Contract.IsClientExists(&_CustomerManagementCore.CallOpts, clientId)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_CustomerManagementCore *CustomerManagementCoreCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _CustomerManagementCore.contract.Call(opts, &out, "owner")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_CustomerManagementCore *CustomerManagementCoreSession) Owner() (common.Address, error) {
	return _CustomerManagementCore.Contract.Owner(&_CustomerManagementCore.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_CustomerManagementCore *CustomerManagementCoreCallerSession) Owner() (common.Address, error) {
	return _CustomerManagementCore.Contract.Owner(&_CustomerManagementCore.CallOpts)
}

// ProxiableUUID is a free data retrieval call binding the contract method 0x52d1902d.
//
// Solidity: function proxiableUUID() view returns(bytes32)
func (_CustomerManagementCore *CustomerManagementCoreCaller) ProxiableUUID(opts *bind.CallOpts) ([32]byte, error) {
	var out []interface{}
	err := _CustomerManagementCore.contract.Call(opts, &out, "proxiableUUID")

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// ProxiableUUID is a free data retrieval call binding the contract method 0x52d1902d.
//
// Solidity: function proxiableUUID() view returns(bytes32)
func (_CustomerManagementCore *CustomerManagementCoreSession) ProxiableUUID() ([32]byte, error) {
	return _CustomerManagementCore.Contract.ProxiableUUID(&_CustomerManagementCore.CallOpts)
}

// ProxiableUUID is a free data retrieval call binding the contract method 0x52d1902d.
//
// Solidity: function proxiableUUID() view returns(bytes32)
func (_CustomerManagementCore *CustomerManagementCoreCallerSession) ProxiableUUID() ([32]byte, error) {
	return _CustomerManagementCore.Contract.ProxiableUUID(&_CustomerManagementCore.CallOpts)
}

// UserTokenIDs is a free data retrieval call binding the contract method 0xfbfeeffd.
//
// Solidity: function userTokenIDs(address ) view returns(uint256)
func (_CustomerManagementCore *CustomerManagementCoreCaller) UserTokenIDs(opts *bind.CallOpts, arg0 common.Address) (*big.Int, error) {
	var out []interface{}
	err := _CustomerManagementCore.contract.Call(opts, &out, "userTokenIDs", arg0)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// UserTokenIDs is a free data retrieval call binding the contract method 0xfbfeeffd.
//
// Solidity: function userTokenIDs(address ) view returns(uint256)
func (_CustomerManagementCore *CustomerManagementCoreSession) UserTokenIDs(arg0 common.Address) (*big.Int, error) {
	return _CustomerManagementCore.Contract.UserTokenIDs(&_CustomerManagementCore.CallOpts, arg0)
}

// UserTokenIDs is a free data retrieval call binding the contract method 0xfbfeeffd.
//
// Solidity: function userTokenIDs(address ) view returns(uint256)
func (_CustomerManagementCore *CustomerManagementCoreCallerSession) UserTokenIDs(arg0 common.Address) (*big.Int, error) {
	return _CustomerManagementCore.Contract.UserTokenIDs(&_CustomerManagementCore.CallOpts, arg0)
}

// Initialize is a paid mutator transaction binding the contract method 0x8129fc1c.
//
// Solidity: function initialize() returns()
func (_CustomerManagementCore *CustomerManagementCoreTransactor) Initialize(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _CustomerManagementCore.contract.Transact(opts, "initialize")
}

// Initialize is a paid mutator transaction binding the contract method 0x8129fc1c.
//
// Solidity: function initialize() returns()
func (_CustomerManagementCore *CustomerManagementCoreSession) Initialize() (*types.Transaction, error) {
	return _CustomerManagementCore.Contract.Initialize(&_CustomerManagementCore.TransactOpts)
}

// Initialize is a paid mutator transaction binding the contract method 0x8129fc1c.
//
// Solidity: function initialize() returns()
func (_CustomerManagementCore *CustomerManagementCoreTransactorSession) Initialize() (*types.Transaction, error) {
	return _CustomerManagementCore.Contract.Initialize(&_CustomerManagementCore.TransactOpts)
}

// RegisterClient is a paid mutator transaction binding the contract method 0xba5662e8.
//
// Solidity: function registerClient((string,uint256,address,uint8,(string,string,uint256,uint256)) newClient) returns()
func (_CustomerManagementCore *CustomerManagementCoreTransactor) RegisterClient(opts *bind.TransactOpts, newClient ICustomerManagementStorageClientDataInput) (*types.Transaction, error) {
	return _CustomerManagementCore.contract.Transact(opts, "registerClient", newClient)
}

// RegisterClient is a paid mutator transaction binding the contract method 0xba5662e8.
//
// Solidity: function registerClient((string,uint256,address,uint8,(string,string,uint256,uint256)) newClient) returns()
func (_CustomerManagementCore *CustomerManagementCoreSession) RegisterClient(newClient ICustomerManagementStorageClientDataInput) (*types.Transaction, error) {
	return _CustomerManagementCore.Contract.RegisterClient(&_CustomerManagementCore.TransactOpts, newClient)
}

// RegisterClient is a paid mutator transaction binding the contract method 0xba5662e8.
//
// Solidity: function registerClient((string,uint256,address,uint8,(string,string,uint256,uint256)) newClient) returns()
func (_CustomerManagementCore *CustomerManagementCoreTransactorSession) RegisterClient(newClient ICustomerManagementStorageClientDataInput) (*types.Transaction, error) {
	return _CustomerManagementCore.Contract.RegisterClient(&_CustomerManagementCore.TransactOpts, newClient)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_CustomerManagementCore *CustomerManagementCoreTransactor) RenounceOwnership(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _CustomerManagementCore.contract.Transact(opts, "renounceOwnership")
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_CustomerManagementCore *CustomerManagementCoreSession) RenounceOwnership() (*types.Transaction, error) {
	return _CustomerManagementCore.Contract.RenounceOwnership(&_CustomerManagementCore.TransactOpts)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_CustomerManagementCore *CustomerManagementCoreTransactorSession) RenounceOwnership() (*types.Transaction, error) {
	return _CustomerManagementCore.Contract.RenounceOwnership(&_CustomerManagementCore.TransactOpts)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_CustomerManagementCore *CustomerManagementCoreTransactor) TransferOwnership(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _CustomerManagementCore.contract.Transact(opts, "transferOwnership", newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_CustomerManagementCore *CustomerManagementCoreSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _CustomerManagementCore.Contract.TransferOwnership(&_CustomerManagementCore.TransactOpts, newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_CustomerManagementCore *CustomerManagementCoreTransactorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _CustomerManagementCore.Contract.TransferOwnership(&_CustomerManagementCore.TransactOpts, newOwner)
}

// UpgradeToAndCall is a paid mutator transaction binding the contract method 0x4f1ef286.
//
// Solidity: function upgradeToAndCall(address newImplementation, bytes data) payable returns()
func (_CustomerManagementCore *CustomerManagementCoreTransactor) UpgradeToAndCall(opts *bind.TransactOpts, newImplementation common.Address, data []byte) (*types.Transaction, error) {
	return _CustomerManagementCore.contract.Transact(opts, "upgradeToAndCall", newImplementation, data)
}

// UpgradeToAndCall is a paid mutator transaction binding the contract method 0x4f1ef286.
//
// Solidity: function upgradeToAndCall(address newImplementation, bytes data) payable returns()
func (_CustomerManagementCore *CustomerManagementCoreSession) UpgradeToAndCall(newImplementation common.Address, data []byte) (*types.Transaction, error) {
	return _CustomerManagementCore.Contract.UpgradeToAndCall(&_CustomerManagementCore.TransactOpts, newImplementation, data)
}

// UpgradeToAndCall is a paid mutator transaction binding the contract method 0x4f1ef286.
//
// Solidity: function upgradeToAndCall(address newImplementation, bytes data) payable returns()
func (_CustomerManagementCore *CustomerManagementCoreTransactorSession) UpgradeToAndCall(newImplementation common.Address, data []byte) (*types.Transaction, error) {
	return _CustomerManagementCore.Contract.UpgradeToAndCall(&_CustomerManagementCore.TransactOpts, newImplementation, data)
}

// CustomerManagementCoreClientRegisteredIterator is returned from FilterClientRegistered and is used to iterate over the raw logs and unpacked data for ClientRegistered events raised by the CustomerManagementCore contract.
type CustomerManagementCoreClientRegisteredIterator struct {
	Event *CustomerManagementCoreClientRegistered // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *CustomerManagementCoreClientRegisteredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(CustomerManagementCoreClientRegistered)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(CustomerManagementCoreClientRegistered)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *CustomerManagementCoreClientRegisteredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *CustomerManagementCoreClientRegisteredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// CustomerManagementCoreClientRegistered represents a ClientRegistered event raised by the CustomerManagementCore contract.
type CustomerManagementCoreClientRegistered struct {
	ClientId *big.Int
	Name     string
	Age      *big.Int
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterClientRegistered is a free log retrieval operation binding the contract event 0xc4241fa8b2b4f002c6b10f7f933e9484aeec52065a1a639c9699964a42c24240.
//
// Solidity: event ClientRegistered(uint256 indexed clientId, string name, uint256 age)
func (_CustomerManagementCore *CustomerManagementCoreFilterer) FilterClientRegistered(opts *bind.FilterOpts, clientId []*big.Int) (*CustomerManagementCoreClientRegisteredIterator, error) {

	var clientIdRule []interface{}
	for _, clientIdItem := range clientId {
		clientIdRule = append(clientIdRule, clientIdItem)
	}

	logs, sub, err := _CustomerManagementCore.contract.FilterLogs(opts, "ClientRegistered", clientIdRule)
	if err != nil {
		return nil, err
	}
	return &CustomerManagementCoreClientRegisteredIterator{contract: _CustomerManagementCore.contract, event: "ClientRegistered", logs: logs, sub: sub}, nil
}

// WatchClientRegistered is a free log subscription operation binding the contract event 0xc4241fa8b2b4f002c6b10f7f933e9484aeec52065a1a639c9699964a42c24240.
//
// Solidity: event ClientRegistered(uint256 indexed clientId, string name, uint256 age)
func (_CustomerManagementCore *CustomerManagementCoreFilterer) WatchClientRegistered(opts *bind.WatchOpts, sink chan<- *CustomerManagementCoreClientRegistered, clientId []*big.Int) (event.Subscription, error) {

	var clientIdRule []interface{}
	for _, clientIdItem := range clientId {
		clientIdRule = append(clientIdRule, clientIdItem)
	}

	logs, sub, err := _CustomerManagementCore.contract.WatchLogs(opts, "ClientRegistered", clientIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(CustomerManagementCoreClientRegistered)
				if err := _CustomerManagementCore.contract.UnpackLog(event, "ClientRegistered", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseClientRegistered is a log parse operation binding the contract event 0xc4241fa8b2b4f002c6b10f7f933e9484aeec52065a1a639c9699964a42c24240.
//
// Solidity: event ClientRegistered(uint256 indexed clientId, string name, uint256 age)
func (_CustomerManagementCore *CustomerManagementCoreFilterer) ParseClientRegistered(log types.Log) (*CustomerManagementCoreClientRegistered, error) {
	event := new(CustomerManagementCoreClientRegistered)
	if err := _CustomerManagementCore.contract.UnpackLog(event, "ClientRegistered", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// CustomerManagementCoreInitializedIterator is returned from FilterInitialized and is used to iterate over the raw logs and unpacked data for Initialized events raised by the CustomerManagementCore contract.
type CustomerManagementCoreInitializedIterator struct {
	Event *CustomerManagementCoreInitialized // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *CustomerManagementCoreInitializedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(CustomerManagementCoreInitialized)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(CustomerManagementCoreInitialized)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *CustomerManagementCoreInitializedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *CustomerManagementCoreInitializedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// CustomerManagementCoreInitialized represents a Initialized event raised by the CustomerManagementCore contract.
type CustomerManagementCoreInitialized struct {
	Version uint64
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterInitialized is a free log retrieval operation binding the contract event 0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2.
//
// Solidity: event Initialized(uint64 version)
func (_CustomerManagementCore *CustomerManagementCoreFilterer) FilterInitialized(opts *bind.FilterOpts) (*CustomerManagementCoreInitializedIterator, error) {

	logs, sub, err := _CustomerManagementCore.contract.FilterLogs(opts, "Initialized")
	if err != nil {
		return nil, err
	}
	return &CustomerManagementCoreInitializedIterator{contract: _CustomerManagementCore.contract, event: "Initialized", logs: logs, sub: sub}, nil
}

// WatchInitialized is a free log subscription operation binding the contract event 0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2.
//
// Solidity: event Initialized(uint64 version)
func (_CustomerManagementCore *CustomerManagementCoreFilterer) WatchInitialized(opts *bind.WatchOpts, sink chan<- *CustomerManagementCoreInitialized) (event.Subscription, error) {

	logs, sub, err := _CustomerManagementCore.contract.WatchLogs(opts, "Initialized")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(CustomerManagementCoreInitialized)
				if err := _CustomerManagementCore.contract.UnpackLog(event, "Initialized", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseInitialized is a log parse operation binding the contract event 0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2.
//
// Solidity: event Initialized(uint64 version)
func (_CustomerManagementCore *CustomerManagementCoreFilterer) ParseInitialized(log types.Log) (*CustomerManagementCoreInitialized, error) {
	event := new(CustomerManagementCoreInitialized)
	if err := _CustomerManagementCore.contract.UnpackLog(event, "Initialized", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// CustomerManagementCoreOwnershipTransferredIterator is returned from FilterOwnershipTransferred and is used to iterate over the raw logs and unpacked data for OwnershipTransferred events raised by the CustomerManagementCore contract.
type CustomerManagementCoreOwnershipTransferredIterator struct {
	Event *CustomerManagementCoreOwnershipTransferred // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *CustomerManagementCoreOwnershipTransferredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(CustomerManagementCoreOwnershipTransferred)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(CustomerManagementCoreOwnershipTransferred)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *CustomerManagementCoreOwnershipTransferredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *CustomerManagementCoreOwnershipTransferredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// CustomerManagementCoreOwnershipTransferred represents a OwnershipTransferred event raised by the CustomerManagementCore contract.
type CustomerManagementCoreOwnershipTransferred struct {
	PreviousOwner common.Address
	NewOwner      common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterOwnershipTransferred is a free log retrieval operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_CustomerManagementCore *CustomerManagementCoreFilterer) FilterOwnershipTransferred(opts *bind.FilterOpts, previousOwner []common.Address, newOwner []common.Address) (*CustomerManagementCoreOwnershipTransferredIterator, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _CustomerManagementCore.contract.FilterLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return &CustomerManagementCoreOwnershipTransferredIterator{contract: _CustomerManagementCore.contract, event: "OwnershipTransferred", logs: logs, sub: sub}, nil
}

// WatchOwnershipTransferred is a free log subscription operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_CustomerManagementCore *CustomerManagementCoreFilterer) WatchOwnershipTransferred(opts *bind.WatchOpts, sink chan<- *CustomerManagementCoreOwnershipTransferred, previousOwner []common.Address, newOwner []common.Address) (event.Subscription, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _CustomerManagementCore.contract.WatchLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(CustomerManagementCoreOwnershipTransferred)
				if err := _CustomerManagementCore.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseOwnershipTransferred is a log parse operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_CustomerManagementCore *CustomerManagementCoreFilterer) ParseOwnershipTransferred(log types.Log) (*CustomerManagementCoreOwnershipTransferred, error) {
	event := new(CustomerManagementCoreOwnershipTransferred)
	if err := _CustomerManagementCore.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// CustomerManagementCoreUpgradedIterator is returned from FilterUpgraded and is used to iterate over the raw logs and unpacked data for Upgraded events raised by the CustomerManagementCore contract.
type CustomerManagementCoreUpgradedIterator struct {
	Event *CustomerManagementCoreUpgraded // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *CustomerManagementCoreUpgradedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(CustomerManagementCoreUpgraded)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(CustomerManagementCoreUpgraded)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *CustomerManagementCoreUpgradedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *CustomerManagementCoreUpgradedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// CustomerManagementCoreUpgraded represents a Upgraded event raised by the CustomerManagementCore contract.
type CustomerManagementCoreUpgraded struct {
	Implementation common.Address
	Raw            types.Log // Blockchain specific contextual infos
}

// FilterUpgraded is a free log retrieval operation binding the contract event 0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b.
//
// Solidity: event Upgraded(address indexed implementation)
func (_CustomerManagementCore *CustomerManagementCoreFilterer) FilterUpgraded(opts *bind.FilterOpts, implementation []common.Address) (*CustomerManagementCoreUpgradedIterator, error) {

	var implementationRule []interface{}
	for _, implementationItem := range implementation {
		implementationRule = append(implementationRule, implementationItem)
	}

	logs, sub, err := _CustomerManagementCore.contract.FilterLogs(opts, "Upgraded", implementationRule)
	if err != nil {
		return nil, err
	}
	return &CustomerManagementCoreUpgradedIterator{contract: _CustomerManagementCore.contract, event: "Upgraded", logs: logs, sub: sub}, nil
}

// WatchUpgraded is a free log subscription operation binding the contract event 0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b.
//
// Solidity: event Upgraded(address indexed implementation)
func (_CustomerManagementCore *CustomerManagementCoreFilterer) WatchUpgraded(opts *bind.WatchOpts, sink chan<- *CustomerManagementCoreUpgraded, implementation []common.Address) (event.Subscription, error) {

	var implementationRule []interface{}
	for _, implementationItem := range implementation {
		implementationRule = append(implementationRule, implementationItem)
	}

	logs, sub, err := _CustomerManagementCore.contract.WatchLogs(opts, "Upgraded", implementationRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(CustomerManagementCoreUpgraded)
				if err := _CustomerManagementCore.contract.UnpackLog(event, "Upgraded", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseUpgraded is a log parse operation binding the contract event 0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b.
//
// Solidity: event Upgraded(address indexed implementation)
func (_CustomerManagementCore *CustomerManagementCoreFilterer) ParseUpgraded(log types.Log) (*CustomerManagementCoreUpgraded, error) {
	event := new(CustomerManagementCoreUpgraded)
	if err := _CustomerManagementCore.contract.UnpackLog(event, "Upgraded", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
