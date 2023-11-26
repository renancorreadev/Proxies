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

// PointCoreMetaData contains all meta data concerning the PointCore contract.
var PointCoreMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"target\",\"type\":\"address\"}],\"name\":\"AddressEmptyCode\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"balance\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"needed\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"ERC1155InsufficientBalance\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"approver\",\"type\":\"address\"}],\"name\":\"ERC1155InvalidApprover\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"idsLength\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"valuesLength\",\"type\":\"uint256\"}],\"name\":\"ERC1155InvalidArrayLength\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"}],\"name\":\"ERC1155InvalidOperator\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"receiver\",\"type\":\"address\"}],\"name\":\"ERC1155InvalidReceiver\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"}],\"name\":\"ERC1155InvalidSender\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"ERC1155MissingApprovalForAll\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"implementation\",\"type\":\"address\"}],\"name\":\"ERC1967InvalidImplementation\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ERC1967NonPayable\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"FailedInnerCall\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"available\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"required\",\"type\":\"uint256\"}],\"name\":\"InsufficientPoints\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"}],\"name\":\"InvalidClientID\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidInitialization\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotInitializing\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"OwnableInvalidOwner\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"OwnableUnauthorizedAccount\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UUPSUnauthorizedCallContext\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"slot\",\"type\":\"bytes32\"}],\"name\":\"UUPSUnsupportedProxiableUUID\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"ApprovalForAll\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"newPoints\",\"type\":\"uint256\"}],\"name\":\"ClientPointsChanged\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"}],\"name\":\"ClientPointsReset\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"clientAddress\",\"type\":\"address\"}],\"name\":\"CustomerGoldBurned\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"clientAddress\",\"type\":\"address\"}],\"name\":\"CustomerGoldMinted\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"clientAddress\",\"type\":\"address\"}],\"name\":\"CustomerPremiumBurned\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"clientAddress\",\"type\":\"address\"}],\"name\":\"CustomerPremiumMinted\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"clientAddress\",\"type\":\"address\"}],\"name\":\"CustomerTitaniumBurned\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"clientAddress\",\"type\":\"address\"}],\"name\":\"CustomerTitaniumMinted\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"version\",\"type\":\"uint64\"}],\"name\":\"Initialized\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"points\",\"type\":\"uint256\"}],\"name\":\"PointsAdded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"points\",\"type\":\"uint256\"}],\"name\":\"PointsRemoved\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256[]\",\"name\":\"ids\",\"type\":\"uint256[]\"},{\"indexed\":false,\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"TransferBatch\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"TransferSingle\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"string\",\"name\":\"value\",\"type\":\"string\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"URI\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"implementation\",\"type\":\"address\"}],\"name\":\"Upgraded\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"CUSTOMER_GOLD\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"CUSTOMER_PREMIUM\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"CUSTOMER_TITANIUM\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"UPGRADE_INTERFACE_VERSION\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"points\",\"type\":\"uint256\"}],\"name\":\"addPoints\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address[]\",\"name\":\"accounts\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"ids\",\"type\":\"uint256[]\"}],\"name\":\"balanceOfBatch\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"burnToken\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"clientLevel\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"customerManagerInstance\",\"outputs\":[{\"internalType\":\"contractCustomerManagementCore\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"}],\"name\":\"getClientLevel\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"}],\"name\":\"getClientPoints\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getVersion\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_customerManagerInstanceAddress\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"uri\",\"type\":\"string\"}],\"name\":\"initialize\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"}],\"name\":\"isApprovedForAll\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"metadataURI\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"nftId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"mint\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"pointsForGold\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"pointsForPremium\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"pointsForTitanium\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"proxiableUUID\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"clientId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"points\",\"type\":\"uint256\"}],\"name\":\"removePoints\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256[]\",\"name\":\"ids\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"safeBatchTransferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"setApprovalForAll\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"premium\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"gold\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"titanium\",\"type\":\"uint256\"}],\"name\":\"setPointThresholds\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"tokenURI\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newImplementation\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"upgradeToAndCall\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"uri\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]",
}

// PointCoreABI is the input ABI used to generate the binding from.
// Deprecated: Use PointCoreMetaData.ABI instead.
var PointCoreABI = PointCoreMetaData.ABI

// PointCore is an auto generated Go binding around an Ethereum contract.
type PointCore struct {
	PointCoreCaller     // Read-only binding to the contract
	PointCoreTransactor // Write-only binding to the contract
	PointCoreFilterer   // Log filterer for contract events
}

// PointCoreCaller is an auto generated read-only Go binding around an Ethereum contract.
type PointCoreCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// PointCoreTransactor is an auto generated write-only Go binding around an Ethereum contract.
type PointCoreTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// PointCoreFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type PointCoreFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// PointCoreSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type PointCoreSession struct {
	Contract     *PointCore        // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// PointCoreCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type PointCoreCallerSession struct {
	Contract *PointCoreCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts    // Call options to use throughout this session
}

// PointCoreTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type PointCoreTransactorSession struct {
	Contract     *PointCoreTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts    // Transaction auth options to use throughout this session
}

// PointCoreRaw is an auto generated low-level Go binding around an Ethereum contract.
type PointCoreRaw struct {
	Contract *PointCore // Generic contract binding to access the raw methods on
}

// PointCoreCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type PointCoreCallerRaw struct {
	Contract *PointCoreCaller // Generic read-only contract binding to access the raw methods on
}

// PointCoreTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type PointCoreTransactorRaw struct {
	Contract *PointCoreTransactor // Generic write-only contract binding to access the raw methods on
}

// NewPointCore creates a new instance of PointCore, bound to a specific deployed contract.
func NewPointCore(address common.Address, backend bind.ContractBackend) (*PointCore, error) {
	contract, err := bindPointCore(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &PointCore{PointCoreCaller: PointCoreCaller{contract: contract}, PointCoreTransactor: PointCoreTransactor{contract: contract}, PointCoreFilterer: PointCoreFilterer{contract: contract}}, nil
}

// NewPointCoreCaller creates a new read-only instance of PointCore, bound to a specific deployed contract.
func NewPointCoreCaller(address common.Address, caller bind.ContractCaller) (*PointCoreCaller, error) {
	contract, err := bindPointCore(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &PointCoreCaller{contract: contract}, nil
}

// NewPointCoreTransactor creates a new write-only instance of PointCore, bound to a specific deployed contract.
func NewPointCoreTransactor(address common.Address, transactor bind.ContractTransactor) (*PointCoreTransactor, error) {
	contract, err := bindPointCore(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &PointCoreTransactor{contract: contract}, nil
}

// NewPointCoreFilterer creates a new log filterer instance of PointCore, bound to a specific deployed contract.
func NewPointCoreFilterer(address common.Address, filterer bind.ContractFilterer) (*PointCoreFilterer, error) {
	contract, err := bindPointCore(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &PointCoreFilterer{contract: contract}, nil
}

// bindPointCore binds a generic wrapper to an already deployed contract.
func bindPointCore(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := PointCoreMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_PointCore *PointCoreRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _PointCore.Contract.PointCoreCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_PointCore *PointCoreRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _PointCore.Contract.PointCoreTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_PointCore *PointCoreRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _PointCore.Contract.PointCoreTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_PointCore *PointCoreCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _PointCore.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_PointCore *PointCoreTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _PointCore.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_PointCore *PointCoreTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _PointCore.Contract.contract.Transact(opts, method, params...)
}

// CUSTOMERGOLD is a free data retrieval call binding the contract method 0xa49fa23c.
//
// Solidity: function CUSTOMER_GOLD() view returns(uint256)
func (_PointCore *PointCoreCaller) CUSTOMERGOLD(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _PointCore.contract.Call(opts, &out, "CUSTOMER_GOLD")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// CUSTOMERGOLD is a free data retrieval call binding the contract method 0xa49fa23c.
//
// Solidity: function CUSTOMER_GOLD() view returns(uint256)
func (_PointCore *PointCoreSession) CUSTOMERGOLD() (*big.Int, error) {
	return _PointCore.Contract.CUSTOMERGOLD(&_PointCore.CallOpts)
}

// CUSTOMERGOLD is a free data retrieval call binding the contract method 0xa49fa23c.
//
// Solidity: function CUSTOMER_GOLD() view returns(uint256)
func (_PointCore *PointCoreCallerSession) CUSTOMERGOLD() (*big.Int, error) {
	return _PointCore.Contract.CUSTOMERGOLD(&_PointCore.CallOpts)
}

// CUSTOMERPREMIUM is a free data retrieval call binding the contract method 0xbb7b1d8f.
//
// Solidity: function CUSTOMER_PREMIUM() view returns(uint256)
func (_PointCore *PointCoreCaller) CUSTOMERPREMIUM(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _PointCore.contract.Call(opts, &out, "CUSTOMER_PREMIUM")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// CUSTOMERPREMIUM is a free data retrieval call binding the contract method 0xbb7b1d8f.
//
// Solidity: function CUSTOMER_PREMIUM() view returns(uint256)
func (_PointCore *PointCoreSession) CUSTOMERPREMIUM() (*big.Int, error) {
	return _PointCore.Contract.CUSTOMERPREMIUM(&_PointCore.CallOpts)
}

// CUSTOMERPREMIUM is a free data retrieval call binding the contract method 0xbb7b1d8f.
//
// Solidity: function CUSTOMER_PREMIUM() view returns(uint256)
func (_PointCore *PointCoreCallerSession) CUSTOMERPREMIUM() (*big.Int, error) {
	return _PointCore.Contract.CUSTOMERPREMIUM(&_PointCore.CallOpts)
}

// CUSTOMERTITANIUM is a free data retrieval call binding the contract method 0xde29d16b.
//
// Solidity: function CUSTOMER_TITANIUM() view returns(uint256)
func (_PointCore *PointCoreCaller) CUSTOMERTITANIUM(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _PointCore.contract.Call(opts, &out, "CUSTOMER_TITANIUM")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// CUSTOMERTITANIUM is a free data retrieval call binding the contract method 0xde29d16b.
//
// Solidity: function CUSTOMER_TITANIUM() view returns(uint256)
func (_PointCore *PointCoreSession) CUSTOMERTITANIUM() (*big.Int, error) {
	return _PointCore.Contract.CUSTOMERTITANIUM(&_PointCore.CallOpts)
}

// CUSTOMERTITANIUM is a free data retrieval call binding the contract method 0xde29d16b.
//
// Solidity: function CUSTOMER_TITANIUM() view returns(uint256)
func (_PointCore *PointCoreCallerSession) CUSTOMERTITANIUM() (*big.Int, error) {
	return _PointCore.Contract.CUSTOMERTITANIUM(&_PointCore.CallOpts)
}

// UPGRADEINTERFACEVERSION is a free data retrieval call binding the contract method 0xad3cb1cc.
//
// Solidity: function UPGRADE_INTERFACE_VERSION() view returns(string)
func (_PointCore *PointCoreCaller) UPGRADEINTERFACEVERSION(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _PointCore.contract.Call(opts, &out, "UPGRADE_INTERFACE_VERSION")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// UPGRADEINTERFACEVERSION is a free data retrieval call binding the contract method 0xad3cb1cc.
//
// Solidity: function UPGRADE_INTERFACE_VERSION() view returns(string)
func (_PointCore *PointCoreSession) UPGRADEINTERFACEVERSION() (string, error) {
	return _PointCore.Contract.UPGRADEINTERFACEVERSION(&_PointCore.CallOpts)
}

// UPGRADEINTERFACEVERSION is a free data retrieval call binding the contract method 0xad3cb1cc.
//
// Solidity: function UPGRADE_INTERFACE_VERSION() view returns(string)
func (_PointCore *PointCoreCallerSession) UPGRADEINTERFACEVERSION() (string, error) {
	return _PointCore.Contract.UPGRADEINTERFACEVERSION(&_PointCore.CallOpts)
}

// BalanceOf is a free data retrieval call binding the contract method 0x00fdd58e.
//
// Solidity: function balanceOf(address account, uint256 id) view returns(uint256)
func (_PointCore *PointCoreCaller) BalanceOf(opts *bind.CallOpts, account common.Address, id *big.Int) (*big.Int, error) {
	var out []interface{}
	err := _PointCore.contract.Call(opts, &out, "balanceOf", account, id)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// BalanceOf is a free data retrieval call binding the contract method 0x00fdd58e.
//
// Solidity: function balanceOf(address account, uint256 id) view returns(uint256)
func (_PointCore *PointCoreSession) BalanceOf(account common.Address, id *big.Int) (*big.Int, error) {
	return _PointCore.Contract.BalanceOf(&_PointCore.CallOpts, account, id)
}

// BalanceOf is a free data retrieval call binding the contract method 0x00fdd58e.
//
// Solidity: function balanceOf(address account, uint256 id) view returns(uint256)
func (_PointCore *PointCoreCallerSession) BalanceOf(account common.Address, id *big.Int) (*big.Int, error) {
	return _PointCore.Contract.BalanceOf(&_PointCore.CallOpts, account, id)
}

// BalanceOfBatch is a free data retrieval call binding the contract method 0x4e1273f4.
//
// Solidity: function balanceOfBatch(address[] accounts, uint256[] ids) view returns(uint256[])
func (_PointCore *PointCoreCaller) BalanceOfBatch(opts *bind.CallOpts, accounts []common.Address, ids []*big.Int) ([]*big.Int, error) {
	var out []interface{}
	err := _PointCore.contract.Call(opts, &out, "balanceOfBatch", accounts, ids)

	if err != nil {
		return *new([]*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new([]*big.Int)).(*[]*big.Int)

	return out0, err

}

// BalanceOfBatch is a free data retrieval call binding the contract method 0x4e1273f4.
//
// Solidity: function balanceOfBatch(address[] accounts, uint256[] ids) view returns(uint256[])
func (_PointCore *PointCoreSession) BalanceOfBatch(accounts []common.Address, ids []*big.Int) ([]*big.Int, error) {
	return _PointCore.Contract.BalanceOfBatch(&_PointCore.CallOpts, accounts, ids)
}

// BalanceOfBatch is a free data retrieval call binding the contract method 0x4e1273f4.
//
// Solidity: function balanceOfBatch(address[] accounts, uint256[] ids) view returns(uint256[])
func (_PointCore *PointCoreCallerSession) BalanceOfBatch(accounts []common.Address, ids []*big.Int) ([]*big.Int, error) {
	return _PointCore.Contract.BalanceOfBatch(&_PointCore.CallOpts, accounts, ids)
}

// ClientLevel is a free data retrieval call binding the contract method 0x94d8b2ca.
//
// Solidity: function clientLevel(uint256 ) view returns(uint256)
func (_PointCore *PointCoreCaller) ClientLevel(opts *bind.CallOpts, arg0 *big.Int) (*big.Int, error) {
	var out []interface{}
	err := _PointCore.contract.Call(opts, &out, "clientLevel", arg0)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// ClientLevel is a free data retrieval call binding the contract method 0x94d8b2ca.
//
// Solidity: function clientLevel(uint256 ) view returns(uint256)
func (_PointCore *PointCoreSession) ClientLevel(arg0 *big.Int) (*big.Int, error) {
	return _PointCore.Contract.ClientLevel(&_PointCore.CallOpts, arg0)
}

// ClientLevel is a free data retrieval call binding the contract method 0x94d8b2ca.
//
// Solidity: function clientLevel(uint256 ) view returns(uint256)
func (_PointCore *PointCoreCallerSession) ClientLevel(arg0 *big.Int) (*big.Int, error) {
	return _PointCore.Contract.ClientLevel(&_PointCore.CallOpts, arg0)
}

// CustomerManagerInstance is a free data retrieval call binding the contract method 0xd7548786.
//
// Solidity: function customerManagerInstance() view returns(address)
func (_PointCore *PointCoreCaller) CustomerManagerInstance(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _PointCore.contract.Call(opts, &out, "customerManagerInstance")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// CustomerManagerInstance is a free data retrieval call binding the contract method 0xd7548786.
//
// Solidity: function customerManagerInstance() view returns(address)
func (_PointCore *PointCoreSession) CustomerManagerInstance() (common.Address, error) {
	return _PointCore.Contract.CustomerManagerInstance(&_PointCore.CallOpts)
}

// CustomerManagerInstance is a free data retrieval call binding the contract method 0xd7548786.
//
// Solidity: function customerManagerInstance() view returns(address)
func (_PointCore *PointCoreCallerSession) CustomerManagerInstance() (common.Address, error) {
	return _PointCore.Contract.CustomerManagerInstance(&_PointCore.CallOpts)
}

// GetClientLevel is a free data retrieval call binding the contract method 0xe921378d.
//
// Solidity: function getClientLevel(uint256 clientId) view returns(uint256)
func (_PointCore *PointCoreCaller) GetClientLevel(opts *bind.CallOpts, clientId *big.Int) (*big.Int, error) {
	var out []interface{}
	err := _PointCore.contract.Call(opts, &out, "getClientLevel", clientId)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// GetClientLevel is a free data retrieval call binding the contract method 0xe921378d.
//
// Solidity: function getClientLevel(uint256 clientId) view returns(uint256)
func (_PointCore *PointCoreSession) GetClientLevel(clientId *big.Int) (*big.Int, error) {
	return _PointCore.Contract.GetClientLevel(&_PointCore.CallOpts, clientId)
}

// GetClientLevel is a free data retrieval call binding the contract method 0xe921378d.
//
// Solidity: function getClientLevel(uint256 clientId) view returns(uint256)
func (_PointCore *PointCoreCallerSession) GetClientLevel(clientId *big.Int) (*big.Int, error) {
	return _PointCore.Contract.GetClientLevel(&_PointCore.CallOpts, clientId)
}

// GetClientPoints is a free data retrieval call binding the contract method 0x9a77667d.
//
// Solidity: function getClientPoints(uint256 clientId) view returns(uint256)
func (_PointCore *PointCoreCaller) GetClientPoints(opts *bind.CallOpts, clientId *big.Int) (*big.Int, error) {
	var out []interface{}
	err := _PointCore.contract.Call(opts, &out, "getClientPoints", clientId)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// GetClientPoints is a free data retrieval call binding the contract method 0x9a77667d.
//
// Solidity: function getClientPoints(uint256 clientId) view returns(uint256)
func (_PointCore *PointCoreSession) GetClientPoints(clientId *big.Int) (*big.Int, error) {
	return _PointCore.Contract.GetClientPoints(&_PointCore.CallOpts, clientId)
}

// GetClientPoints is a free data retrieval call binding the contract method 0x9a77667d.
//
// Solidity: function getClientPoints(uint256 clientId) view returns(uint256)
func (_PointCore *PointCoreCallerSession) GetClientPoints(clientId *big.Int) (*big.Int, error) {
	return _PointCore.Contract.GetClientPoints(&_PointCore.CallOpts, clientId)
}

// GetVersion is a free data retrieval call binding the contract method 0x0d8e6e2c.
//
// Solidity: function getVersion() pure returns(string)
func (_PointCore *PointCoreCaller) GetVersion(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _PointCore.contract.Call(opts, &out, "getVersion")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// GetVersion is a free data retrieval call binding the contract method 0x0d8e6e2c.
//
// Solidity: function getVersion() pure returns(string)
func (_PointCore *PointCoreSession) GetVersion() (string, error) {
	return _PointCore.Contract.GetVersion(&_PointCore.CallOpts)
}

// GetVersion is a free data retrieval call binding the contract method 0x0d8e6e2c.
//
// Solidity: function getVersion() pure returns(string)
func (_PointCore *PointCoreCallerSession) GetVersion() (string, error) {
	return _PointCore.Contract.GetVersion(&_PointCore.CallOpts)
}

// IsApprovedForAll is a free data retrieval call binding the contract method 0xe985e9c5.
//
// Solidity: function isApprovedForAll(address account, address operator) view returns(bool)
func (_PointCore *PointCoreCaller) IsApprovedForAll(opts *bind.CallOpts, account common.Address, operator common.Address) (bool, error) {
	var out []interface{}
	err := _PointCore.contract.Call(opts, &out, "isApprovedForAll", account, operator)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// IsApprovedForAll is a free data retrieval call binding the contract method 0xe985e9c5.
//
// Solidity: function isApprovedForAll(address account, address operator) view returns(bool)
func (_PointCore *PointCoreSession) IsApprovedForAll(account common.Address, operator common.Address) (bool, error) {
	return _PointCore.Contract.IsApprovedForAll(&_PointCore.CallOpts, account, operator)
}

// IsApprovedForAll is a free data retrieval call binding the contract method 0xe985e9c5.
//
// Solidity: function isApprovedForAll(address account, address operator) view returns(bool)
func (_PointCore *PointCoreCallerSession) IsApprovedForAll(account common.Address, operator common.Address) (bool, error) {
	return _PointCore.Contract.IsApprovedForAll(&_PointCore.CallOpts, account, operator)
}

// MetadataURI is a free data retrieval call binding the contract method 0x03ee438c.
//
// Solidity: function metadataURI() view returns(string)
func (_PointCore *PointCoreCaller) MetadataURI(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _PointCore.contract.Call(opts, &out, "metadataURI")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// MetadataURI is a free data retrieval call binding the contract method 0x03ee438c.
//
// Solidity: function metadataURI() view returns(string)
func (_PointCore *PointCoreSession) MetadataURI() (string, error) {
	return _PointCore.Contract.MetadataURI(&_PointCore.CallOpts)
}

// MetadataURI is a free data retrieval call binding the contract method 0x03ee438c.
//
// Solidity: function metadataURI() view returns(string)
func (_PointCore *PointCoreCallerSession) MetadataURI() (string, error) {
	return _PointCore.Contract.MetadataURI(&_PointCore.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_PointCore *PointCoreCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _PointCore.contract.Call(opts, &out, "owner")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_PointCore *PointCoreSession) Owner() (common.Address, error) {
	return _PointCore.Contract.Owner(&_PointCore.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_PointCore *PointCoreCallerSession) Owner() (common.Address, error) {
	return _PointCore.Contract.Owner(&_PointCore.CallOpts)
}

// PointsForGold is a free data retrieval call binding the contract method 0x5668f3f0.
//
// Solidity: function pointsForGold() view returns(uint256)
func (_PointCore *PointCoreCaller) PointsForGold(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _PointCore.contract.Call(opts, &out, "pointsForGold")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// PointsForGold is a free data retrieval call binding the contract method 0x5668f3f0.
//
// Solidity: function pointsForGold() view returns(uint256)
func (_PointCore *PointCoreSession) PointsForGold() (*big.Int, error) {
	return _PointCore.Contract.PointsForGold(&_PointCore.CallOpts)
}

// PointsForGold is a free data retrieval call binding the contract method 0x5668f3f0.
//
// Solidity: function pointsForGold() view returns(uint256)
func (_PointCore *PointCoreCallerSession) PointsForGold() (*big.Int, error) {
	return _PointCore.Contract.PointsForGold(&_PointCore.CallOpts)
}

// PointsForPremium is a free data retrieval call binding the contract method 0xd6d95a8d.
//
// Solidity: function pointsForPremium() view returns(uint256)
func (_PointCore *PointCoreCaller) PointsForPremium(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _PointCore.contract.Call(opts, &out, "pointsForPremium")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// PointsForPremium is a free data retrieval call binding the contract method 0xd6d95a8d.
//
// Solidity: function pointsForPremium() view returns(uint256)
func (_PointCore *PointCoreSession) PointsForPremium() (*big.Int, error) {
	return _PointCore.Contract.PointsForPremium(&_PointCore.CallOpts)
}

// PointsForPremium is a free data retrieval call binding the contract method 0xd6d95a8d.
//
// Solidity: function pointsForPremium() view returns(uint256)
func (_PointCore *PointCoreCallerSession) PointsForPremium() (*big.Int, error) {
	return _PointCore.Contract.PointsForPremium(&_PointCore.CallOpts)
}

// PointsForTitanium is a free data retrieval call binding the contract method 0x13581688.
//
// Solidity: function pointsForTitanium() view returns(uint256)
func (_PointCore *PointCoreCaller) PointsForTitanium(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _PointCore.contract.Call(opts, &out, "pointsForTitanium")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// PointsForTitanium is a free data retrieval call binding the contract method 0x13581688.
//
// Solidity: function pointsForTitanium() view returns(uint256)
func (_PointCore *PointCoreSession) PointsForTitanium() (*big.Int, error) {
	return _PointCore.Contract.PointsForTitanium(&_PointCore.CallOpts)
}

// PointsForTitanium is a free data retrieval call binding the contract method 0x13581688.
//
// Solidity: function pointsForTitanium() view returns(uint256)
func (_PointCore *PointCoreCallerSession) PointsForTitanium() (*big.Int, error) {
	return _PointCore.Contract.PointsForTitanium(&_PointCore.CallOpts)
}

// ProxiableUUID is a free data retrieval call binding the contract method 0x52d1902d.
//
// Solidity: function proxiableUUID() view returns(bytes32)
func (_PointCore *PointCoreCaller) ProxiableUUID(opts *bind.CallOpts) ([32]byte, error) {
	var out []interface{}
	err := _PointCore.contract.Call(opts, &out, "proxiableUUID")

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// ProxiableUUID is a free data retrieval call binding the contract method 0x52d1902d.
//
// Solidity: function proxiableUUID() view returns(bytes32)
func (_PointCore *PointCoreSession) ProxiableUUID() ([32]byte, error) {
	return _PointCore.Contract.ProxiableUUID(&_PointCore.CallOpts)
}

// ProxiableUUID is a free data retrieval call binding the contract method 0x52d1902d.
//
// Solidity: function proxiableUUID() view returns(bytes32)
func (_PointCore *PointCoreCallerSession) ProxiableUUID() ([32]byte, error) {
	return _PointCore.Contract.ProxiableUUID(&_PointCore.CallOpts)
}

// SupportsInterface is a free data retrieval call binding the contract method 0x01ffc9a7.
//
// Solidity: function supportsInterface(bytes4 interfaceId) view returns(bool)
func (_PointCore *PointCoreCaller) SupportsInterface(opts *bind.CallOpts, interfaceId [4]byte) (bool, error) {
	var out []interface{}
	err := _PointCore.contract.Call(opts, &out, "supportsInterface", interfaceId)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// SupportsInterface is a free data retrieval call binding the contract method 0x01ffc9a7.
//
// Solidity: function supportsInterface(bytes4 interfaceId) view returns(bool)
func (_PointCore *PointCoreSession) SupportsInterface(interfaceId [4]byte) (bool, error) {
	return _PointCore.Contract.SupportsInterface(&_PointCore.CallOpts, interfaceId)
}

// SupportsInterface is a free data retrieval call binding the contract method 0x01ffc9a7.
//
// Solidity: function supportsInterface(bytes4 interfaceId) view returns(bool)
func (_PointCore *PointCoreCallerSession) SupportsInterface(interfaceId [4]byte) (bool, error) {
	return _PointCore.Contract.SupportsInterface(&_PointCore.CallOpts, interfaceId)
}

// TokenURI is a free data retrieval call binding the contract method 0xc87b56dd.
//
// Solidity: function tokenURI(uint256 tokenId) view returns(string)
func (_PointCore *PointCoreCaller) TokenURI(opts *bind.CallOpts, tokenId *big.Int) (string, error) {
	var out []interface{}
	err := _PointCore.contract.Call(opts, &out, "tokenURI", tokenId)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// TokenURI is a free data retrieval call binding the contract method 0xc87b56dd.
//
// Solidity: function tokenURI(uint256 tokenId) view returns(string)
func (_PointCore *PointCoreSession) TokenURI(tokenId *big.Int) (string, error) {
	return _PointCore.Contract.TokenURI(&_PointCore.CallOpts, tokenId)
}

// TokenURI is a free data retrieval call binding the contract method 0xc87b56dd.
//
// Solidity: function tokenURI(uint256 tokenId) view returns(string)
func (_PointCore *PointCoreCallerSession) TokenURI(tokenId *big.Int) (string, error) {
	return _PointCore.Contract.TokenURI(&_PointCore.CallOpts, tokenId)
}

// Uri is a free data retrieval call binding the contract method 0x0e89341c.
//
// Solidity: function uri(uint256 ) view returns(string)
func (_PointCore *PointCoreCaller) Uri(opts *bind.CallOpts, arg0 *big.Int) (string, error) {
	var out []interface{}
	err := _PointCore.contract.Call(opts, &out, "uri", arg0)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Uri is a free data retrieval call binding the contract method 0x0e89341c.
//
// Solidity: function uri(uint256 ) view returns(string)
func (_PointCore *PointCoreSession) Uri(arg0 *big.Int) (string, error) {
	return _PointCore.Contract.Uri(&_PointCore.CallOpts, arg0)
}

// Uri is a free data retrieval call binding the contract method 0x0e89341c.
//
// Solidity: function uri(uint256 ) view returns(string)
func (_PointCore *PointCoreCallerSession) Uri(arg0 *big.Int) (string, error) {
	return _PointCore.Contract.Uri(&_PointCore.CallOpts, arg0)
}

// AddPoints is a paid mutator transaction binding the contract method 0xfe4651a0.
//
// Solidity: function addPoints(uint256 clientId, uint256 points) returns()
func (_PointCore *PointCoreTransactor) AddPoints(opts *bind.TransactOpts, clientId *big.Int, points *big.Int) (*types.Transaction, error) {
	return _PointCore.contract.Transact(opts, "addPoints", clientId, points)
}

// AddPoints is a paid mutator transaction binding the contract method 0xfe4651a0.
//
// Solidity: function addPoints(uint256 clientId, uint256 points) returns()
func (_PointCore *PointCoreSession) AddPoints(clientId *big.Int, points *big.Int) (*types.Transaction, error) {
	return _PointCore.Contract.AddPoints(&_PointCore.TransactOpts, clientId, points)
}

// AddPoints is a paid mutator transaction binding the contract method 0xfe4651a0.
//
// Solidity: function addPoints(uint256 clientId, uint256 points) returns()
func (_PointCore *PointCoreTransactorSession) AddPoints(clientId *big.Int, points *big.Int) (*types.Transaction, error) {
	return _PointCore.Contract.AddPoints(&_PointCore.TransactOpts, clientId, points)
}

// BurnToken is a paid mutator transaction binding the contract method 0xed8c5938.
//
// Solidity: function burnToken(address account, uint256 id, uint256 amount) returns()
func (_PointCore *PointCoreTransactor) BurnToken(opts *bind.TransactOpts, account common.Address, id *big.Int, amount *big.Int) (*types.Transaction, error) {
	return _PointCore.contract.Transact(opts, "burnToken", account, id, amount)
}

// BurnToken is a paid mutator transaction binding the contract method 0xed8c5938.
//
// Solidity: function burnToken(address account, uint256 id, uint256 amount) returns()
func (_PointCore *PointCoreSession) BurnToken(account common.Address, id *big.Int, amount *big.Int) (*types.Transaction, error) {
	return _PointCore.Contract.BurnToken(&_PointCore.TransactOpts, account, id, amount)
}

// BurnToken is a paid mutator transaction binding the contract method 0xed8c5938.
//
// Solidity: function burnToken(address account, uint256 id, uint256 amount) returns()
func (_PointCore *PointCoreTransactorSession) BurnToken(account common.Address, id *big.Int, amount *big.Int) (*types.Transaction, error) {
	return _PointCore.Contract.BurnToken(&_PointCore.TransactOpts, account, id, amount)
}

// Initialize is a paid mutator transaction binding the contract method 0xf399e22e.
//
// Solidity: function initialize(address _customerManagerInstanceAddress, string uri) returns()
func (_PointCore *PointCoreTransactor) Initialize(opts *bind.TransactOpts, _customerManagerInstanceAddress common.Address, uri string) (*types.Transaction, error) {
	return _PointCore.contract.Transact(opts, "initialize", _customerManagerInstanceAddress, uri)
}

// Initialize is a paid mutator transaction binding the contract method 0xf399e22e.
//
// Solidity: function initialize(address _customerManagerInstanceAddress, string uri) returns()
func (_PointCore *PointCoreSession) Initialize(_customerManagerInstanceAddress common.Address, uri string) (*types.Transaction, error) {
	return _PointCore.Contract.Initialize(&_PointCore.TransactOpts, _customerManagerInstanceAddress, uri)
}

// Initialize is a paid mutator transaction binding the contract method 0xf399e22e.
//
// Solidity: function initialize(address _customerManagerInstanceAddress, string uri) returns()
func (_PointCore *PointCoreTransactorSession) Initialize(_customerManagerInstanceAddress common.Address, uri string) (*types.Transaction, error) {
	return _PointCore.Contract.Initialize(&_PointCore.TransactOpts, _customerManagerInstanceAddress, uri)
}

// Mint is a paid mutator transaction binding the contract method 0x156e29f6.
//
// Solidity: function mint(address account, uint256 nftId, uint256 amount) returns()
func (_PointCore *PointCoreTransactor) Mint(opts *bind.TransactOpts, account common.Address, nftId *big.Int, amount *big.Int) (*types.Transaction, error) {
	return _PointCore.contract.Transact(opts, "mint", account, nftId, amount)
}

// Mint is a paid mutator transaction binding the contract method 0x156e29f6.
//
// Solidity: function mint(address account, uint256 nftId, uint256 amount) returns()
func (_PointCore *PointCoreSession) Mint(account common.Address, nftId *big.Int, amount *big.Int) (*types.Transaction, error) {
	return _PointCore.Contract.Mint(&_PointCore.TransactOpts, account, nftId, amount)
}

// Mint is a paid mutator transaction binding the contract method 0x156e29f6.
//
// Solidity: function mint(address account, uint256 nftId, uint256 amount) returns()
func (_PointCore *PointCoreTransactorSession) Mint(account common.Address, nftId *big.Int, amount *big.Int) (*types.Transaction, error) {
	return _PointCore.Contract.Mint(&_PointCore.TransactOpts, account, nftId, amount)
}

// RemovePoints is a paid mutator transaction binding the contract method 0xe0794800.
//
// Solidity: function removePoints(uint256 clientId, uint256 points) returns()
func (_PointCore *PointCoreTransactor) RemovePoints(opts *bind.TransactOpts, clientId *big.Int, points *big.Int) (*types.Transaction, error) {
	return _PointCore.contract.Transact(opts, "removePoints", clientId, points)
}

// RemovePoints is a paid mutator transaction binding the contract method 0xe0794800.
//
// Solidity: function removePoints(uint256 clientId, uint256 points) returns()
func (_PointCore *PointCoreSession) RemovePoints(clientId *big.Int, points *big.Int) (*types.Transaction, error) {
	return _PointCore.Contract.RemovePoints(&_PointCore.TransactOpts, clientId, points)
}

// RemovePoints is a paid mutator transaction binding the contract method 0xe0794800.
//
// Solidity: function removePoints(uint256 clientId, uint256 points) returns()
func (_PointCore *PointCoreTransactorSession) RemovePoints(clientId *big.Int, points *big.Int) (*types.Transaction, error) {
	return _PointCore.Contract.RemovePoints(&_PointCore.TransactOpts, clientId, points)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_PointCore *PointCoreTransactor) RenounceOwnership(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _PointCore.contract.Transact(opts, "renounceOwnership")
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_PointCore *PointCoreSession) RenounceOwnership() (*types.Transaction, error) {
	return _PointCore.Contract.RenounceOwnership(&_PointCore.TransactOpts)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_PointCore *PointCoreTransactorSession) RenounceOwnership() (*types.Transaction, error) {
	return _PointCore.Contract.RenounceOwnership(&_PointCore.TransactOpts)
}

// SafeBatchTransferFrom is a paid mutator transaction binding the contract method 0x2eb2c2d6.
//
// Solidity: function safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] values, bytes data) returns()
func (_PointCore *PointCoreTransactor) SafeBatchTransferFrom(opts *bind.TransactOpts, from common.Address, to common.Address, ids []*big.Int, values []*big.Int, data []byte) (*types.Transaction, error) {
	return _PointCore.contract.Transact(opts, "safeBatchTransferFrom", from, to, ids, values, data)
}

// SafeBatchTransferFrom is a paid mutator transaction binding the contract method 0x2eb2c2d6.
//
// Solidity: function safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] values, bytes data) returns()
func (_PointCore *PointCoreSession) SafeBatchTransferFrom(from common.Address, to common.Address, ids []*big.Int, values []*big.Int, data []byte) (*types.Transaction, error) {
	return _PointCore.Contract.SafeBatchTransferFrom(&_PointCore.TransactOpts, from, to, ids, values, data)
}

// SafeBatchTransferFrom is a paid mutator transaction binding the contract method 0x2eb2c2d6.
//
// Solidity: function safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] values, bytes data) returns()
func (_PointCore *PointCoreTransactorSession) SafeBatchTransferFrom(from common.Address, to common.Address, ids []*big.Int, values []*big.Int, data []byte) (*types.Transaction, error) {
	return _PointCore.Contract.SafeBatchTransferFrom(&_PointCore.TransactOpts, from, to, ids, values, data)
}

// SafeTransferFrom is a paid mutator transaction binding the contract method 0xf242432a.
//
// Solidity: function safeTransferFrom(address from, address to, uint256 id, uint256 value, bytes data) returns()
func (_PointCore *PointCoreTransactor) SafeTransferFrom(opts *bind.TransactOpts, from common.Address, to common.Address, id *big.Int, value *big.Int, data []byte) (*types.Transaction, error) {
	return _PointCore.contract.Transact(opts, "safeTransferFrom", from, to, id, value, data)
}

// SafeTransferFrom is a paid mutator transaction binding the contract method 0xf242432a.
//
// Solidity: function safeTransferFrom(address from, address to, uint256 id, uint256 value, bytes data) returns()
func (_PointCore *PointCoreSession) SafeTransferFrom(from common.Address, to common.Address, id *big.Int, value *big.Int, data []byte) (*types.Transaction, error) {
	return _PointCore.Contract.SafeTransferFrom(&_PointCore.TransactOpts, from, to, id, value, data)
}

// SafeTransferFrom is a paid mutator transaction binding the contract method 0xf242432a.
//
// Solidity: function safeTransferFrom(address from, address to, uint256 id, uint256 value, bytes data) returns()
func (_PointCore *PointCoreTransactorSession) SafeTransferFrom(from common.Address, to common.Address, id *big.Int, value *big.Int, data []byte) (*types.Transaction, error) {
	return _PointCore.Contract.SafeTransferFrom(&_PointCore.TransactOpts, from, to, id, value, data)
}

// SetApprovalForAll is a paid mutator transaction binding the contract method 0xa22cb465.
//
// Solidity: function setApprovalForAll(address operator, bool approved) returns()
func (_PointCore *PointCoreTransactor) SetApprovalForAll(opts *bind.TransactOpts, operator common.Address, approved bool) (*types.Transaction, error) {
	return _PointCore.contract.Transact(opts, "setApprovalForAll", operator, approved)
}

// SetApprovalForAll is a paid mutator transaction binding the contract method 0xa22cb465.
//
// Solidity: function setApprovalForAll(address operator, bool approved) returns()
func (_PointCore *PointCoreSession) SetApprovalForAll(operator common.Address, approved bool) (*types.Transaction, error) {
	return _PointCore.Contract.SetApprovalForAll(&_PointCore.TransactOpts, operator, approved)
}

// SetApprovalForAll is a paid mutator transaction binding the contract method 0xa22cb465.
//
// Solidity: function setApprovalForAll(address operator, bool approved) returns()
func (_PointCore *PointCoreTransactorSession) SetApprovalForAll(operator common.Address, approved bool) (*types.Transaction, error) {
	return _PointCore.Contract.SetApprovalForAll(&_PointCore.TransactOpts, operator, approved)
}

// SetPointThresholds is a paid mutator transaction binding the contract method 0x2fdd863a.
//
// Solidity: function setPointThresholds(uint256 premium, uint256 gold, uint256 titanium) returns()
func (_PointCore *PointCoreTransactor) SetPointThresholds(opts *bind.TransactOpts, premium *big.Int, gold *big.Int, titanium *big.Int) (*types.Transaction, error) {
	return _PointCore.contract.Transact(opts, "setPointThresholds", premium, gold, titanium)
}

// SetPointThresholds is a paid mutator transaction binding the contract method 0x2fdd863a.
//
// Solidity: function setPointThresholds(uint256 premium, uint256 gold, uint256 titanium) returns()
func (_PointCore *PointCoreSession) SetPointThresholds(premium *big.Int, gold *big.Int, titanium *big.Int) (*types.Transaction, error) {
	return _PointCore.Contract.SetPointThresholds(&_PointCore.TransactOpts, premium, gold, titanium)
}

// SetPointThresholds is a paid mutator transaction binding the contract method 0x2fdd863a.
//
// Solidity: function setPointThresholds(uint256 premium, uint256 gold, uint256 titanium) returns()
func (_PointCore *PointCoreTransactorSession) SetPointThresholds(premium *big.Int, gold *big.Int, titanium *big.Int) (*types.Transaction, error) {
	return _PointCore.Contract.SetPointThresholds(&_PointCore.TransactOpts, premium, gold, titanium)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_PointCore *PointCoreTransactor) TransferOwnership(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _PointCore.contract.Transact(opts, "transferOwnership", newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_PointCore *PointCoreSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _PointCore.Contract.TransferOwnership(&_PointCore.TransactOpts, newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_PointCore *PointCoreTransactorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _PointCore.Contract.TransferOwnership(&_PointCore.TransactOpts, newOwner)
}

// UpgradeToAndCall is a paid mutator transaction binding the contract method 0x4f1ef286.
//
// Solidity: function upgradeToAndCall(address newImplementation, bytes data) payable returns()
func (_PointCore *PointCoreTransactor) UpgradeToAndCall(opts *bind.TransactOpts, newImplementation common.Address, data []byte) (*types.Transaction, error) {
	return _PointCore.contract.Transact(opts, "upgradeToAndCall", newImplementation, data)
}

// UpgradeToAndCall is a paid mutator transaction binding the contract method 0x4f1ef286.
//
// Solidity: function upgradeToAndCall(address newImplementation, bytes data) payable returns()
func (_PointCore *PointCoreSession) UpgradeToAndCall(newImplementation common.Address, data []byte) (*types.Transaction, error) {
	return _PointCore.Contract.UpgradeToAndCall(&_PointCore.TransactOpts, newImplementation, data)
}

// UpgradeToAndCall is a paid mutator transaction binding the contract method 0x4f1ef286.
//
// Solidity: function upgradeToAndCall(address newImplementation, bytes data) payable returns()
func (_PointCore *PointCoreTransactorSession) UpgradeToAndCall(newImplementation common.Address, data []byte) (*types.Transaction, error) {
	return _PointCore.Contract.UpgradeToAndCall(&_PointCore.TransactOpts, newImplementation, data)
}

// PointCoreApprovalForAllIterator is returned from FilterApprovalForAll and is used to iterate over the raw logs and unpacked data for ApprovalForAll events raised by the PointCore contract.
type PointCoreApprovalForAllIterator struct {
	Event *PointCoreApprovalForAll // Event containing the contract specifics and raw log

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
func (it *PointCoreApprovalForAllIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PointCoreApprovalForAll)
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
		it.Event = new(PointCoreApprovalForAll)
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
func (it *PointCoreApprovalForAllIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PointCoreApprovalForAllIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PointCoreApprovalForAll represents a ApprovalForAll event raised by the PointCore contract.
type PointCoreApprovalForAll struct {
	Account  common.Address
	Operator common.Address
	Approved bool
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterApprovalForAll is a free log retrieval operation binding the contract event 0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31.
//
// Solidity: event ApprovalForAll(address indexed account, address indexed operator, bool approved)
func (_PointCore *PointCoreFilterer) FilterApprovalForAll(opts *bind.FilterOpts, account []common.Address, operator []common.Address) (*PointCoreApprovalForAllIterator, error) {

	var accountRule []interface{}
	for _, accountItem := range account {
		accountRule = append(accountRule, accountItem)
	}
	var operatorRule []interface{}
	for _, operatorItem := range operator {
		operatorRule = append(operatorRule, operatorItem)
	}

	logs, sub, err := _PointCore.contract.FilterLogs(opts, "ApprovalForAll", accountRule, operatorRule)
	if err != nil {
		return nil, err
	}
	return &PointCoreApprovalForAllIterator{contract: _PointCore.contract, event: "ApprovalForAll", logs: logs, sub: sub}, nil
}

// WatchApprovalForAll is a free log subscription operation binding the contract event 0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31.
//
// Solidity: event ApprovalForAll(address indexed account, address indexed operator, bool approved)
func (_PointCore *PointCoreFilterer) WatchApprovalForAll(opts *bind.WatchOpts, sink chan<- *PointCoreApprovalForAll, account []common.Address, operator []common.Address) (event.Subscription, error) {

	var accountRule []interface{}
	for _, accountItem := range account {
		accountRule = append(accountRule, accountItem)
	}
	var operatorRule []interface{}
	for _, operatorItem := range operator {
		operatorRule = append(operatorRule, operatorItem)
	}

	logs, sub, err := _PointCore.contract.WatchLogs(opts, "ApprovalForAll", accountRule, operatorRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PointCoreApprovalForAll)
				if err := _PointCore.contract.UnpackLog(event, "ApprovalForAll", log); err != nil {
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

// ParseApprovalForAll is a log parse operation binding the contract event 0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31.
//
// Solidity: event ApprovalForAll(address indexed account, address indexed operator, bool approved)
func (_PointCore *PointCoreFilterer) ParseApprovalForAll(log types.Log) (*PointCoreApprovalForAll, error) {
	event := new(PointCoreApprovalForAll)
	if err := _PointCore.contract.UnpackLog(event, "ApprovalForAll", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// PointCoreClientPointsChangedIterator is returned from FilterClientPointsChanged and is used to iterate over the raw logs and unpacked data for ClientPointsChanged events raised by the PointCore contract.
type PointCoreClientPointsChangedIterator struct {
	Event *PointCoreClientPointsChanged // Event containing the contract specifics and raw log

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
func (it *PointCoreClientPointsChangedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PointCoreClientPointsChanged)
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
		it.Event = new(PointCoreClientPointsChanged)
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
func (it *PointCoreClientPointsChangedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PointCoreClientPointsChangedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PointCoreClientPointsChanged represents a ClientPointsChanged event raised by the PointCore contract.
type PointCoreClientPointsChanged struct {
	ClientId  *big.Int
	NewPoints *big.Int
	Raw       types.Log // Blockchain specific contextual infos
}

// FilterClientPointsChanged is a free log retrieval operation binding the contract event 0x0cf50bca40d79209e58ddde2b955769f5c16088c126332b9f9a9e0bc9bdea372.
//
// Solidity: event ClientPointsChanged(uint256 indexed clientId, uint256 newPoints)
func (_PointCore *PointCoreFilterer) FilterClientPointsChanged(opts *bind.FilterOpts, clientId []*big.Int) (*PointCoreClientPointsChangedIterator, error) {

	var clientIdRule []interface{}
	for _, clientIdItem := range clientId {
		clientIdRule = append(clientIdRule, clientIdItem)
	}

	logs, sub, err := _PointCore.contract.FilterLogs(opts, "ClientPointsChanged", clientIdRule)
	if err != nil {
		return nil, err
	}
	return &PointCoreClientPointsChangedIterator{contract: _PointCore.contract, event: "ClientPointsChanged", logs: logs, sub: sub}, nil
}

// WatchClientPointsChanged is a free log subscription operation binding the contract event 0x0cf50bca40d79209e58ddde2b955769f5c16088c126332b9f9a9e0bc9bdea372.
//
// Solidity: event ClientPointsChanged(uint256 indexed clientId, uint256 newPoints)
func (_PointCore *PointCoreFilterer) WatchClientPointsChanged(opts *bind.WatchOpts, sink chan<- *PointCoreClientPointsChanged, clientId []*big.Int) (event.Subscription, error) {

	var clientIdRule []interface{}
	for _, clientIdItem := range clientId {
		clientIdRule = append(clientIdRule, clientIdItem)
	}

	logs, sub, err := _PointCore.contract.WatchLogs(opts, "ClientPointsChanged", clientIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PointCoreClientPointsChanged)
				if err := _PointCore.contract.UnpackLog(event, "ClientPointsChanged", log); err != nil {
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

// ParseClientPointsChanged is a log parse operation binding the contract event 0x0cf50bca40d79209e58ddde2b955769f5c16088c126332b9f9a9e0bc9bdea372.
//
// Solidity: event ClientPointsChanged(uint256 indexed clientId, uint256 newPoints)
func (_PointCore *PointCoreFilterer) ParseClientPointsChanged(log types.Log) (*PointCoreClientPointsChanged, error) {
	event := new(PointCoreClientPointsChanged)
	if err := _PointCore.contract.UnpackLog(event, "ClientPointsChanged", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// PointCoreClientPointsResetIterator is returned from FilterClientPointsReset and is used to iterate over the raw logs and unpacked data for ClientPointsReset events raised by the PointCore contract.
type PointCoreClientPointsResetIterator struct {
	Event *PointCoreClientPointsReset // Event containing the contract specifics and raw log

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
func (it *PointCoreClientPointsResetIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PointCoreClientPointsReset)
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
		it.Event = new(PointCoreClientPointsReset)
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
func (it *PointCoreClientPointsResetIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PointCoreClientPointsResetIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PointCoreClientPointsReset represents a ClientPointsReset event raised by the PointCore contract.
type PointCoreClientPointsReset struct {
	ClientId *big.Int
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterClientPointsReset is a free log retrieval operation binding the contract event 0x09b6ab8fcffe8fab88eb637bb05045f1625b604a9c141145089f589f69947b85.
//
// Solidity: event ClientPointsReset(uint256 indexed clientId)
func (_PointCore *PointCoreFilterer) FilterClientPointsReset(opts *bind.FilterOpts, clientId []*big.Int) (*PointCoreClientPointsResetIterator, error) {

	var clientIdRule []interface{}
	for _, clientIdItem := range clientId {
		clientIdRule = append(clientIdRule, clientIdItem)
	}

	logs, sub, err := _PointCore.contract.FilterLogs(opts, "ClientPointsReset", clientIdRule)
	if err != nil {
		return nil, err
	}
	return &PointCoreClientPointsResetIterator{contract: _PointCore.contract, event: "ClientPointsReset", logs: logs, sub: sub}, nil
}

// WatchClientPointsReset is a free log subscription operation binding the contract event 0x09b6ab8fcffe8fab88eb637bb05045f1625b604a9c141145089f589f69947b85.
//
// Solidity: event ClientPointsReset(uint256 indexed clientId)
func (_PointCore *PointCoreFilterer) WatchClientPointsReset(opts *bind.WatchOpts, sink chan<- *PointCoreClientPointsReset, clientId []*big.Int) (event.Subscription, error) {

	var clientIdRule []interface{}
	for _, clientIdItem := range clientId {
		clientIdRule = append(clientIdRule, clientIdItem)
	}

	logs, sub, err := _PointCore.contract.WatchLogs(opts, "ClientPointsReset", clientIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PointCoreClientPointsReset)
				if err := _PointCore.contract.UnpackLog(event, "ClientPointsReset", log); err != nil {
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

// ParseClientPointsReset is a log parse operation binding the contract event 0x09b6ab8fcffe8fab88eb637bb05045f1625b604a9c141145089f589f69947b85.
//
// Solidity: event ClientPointsReset(uint256 indexed clientId)
func (_PointCore *PointCoreFilterer) ParseClientPointsReset(log types.Log) (*PointCoreClientPointsReset, error) {
	event := new(PointCoreClientPointsReset)
	if err := _PointCore.contract.UnpackLog(event, "ClientPointsReset", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// PointCoreCustomerGoldBurnedIterator is returned from FilterCustomerGoldBurned and is used to iterate over the raw logs and unpacked data for CustomerGoldBurned events raised by the PointCore contract.
type PointCoreCustomerGoldBurnedIterator struct {
	Event *PointCoreCustomerGoldBurned // Event containing the contract specifics and raw log

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
func (it *PointCoreCustomerGoldBurnedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PointCoreCustomerGoldBurned)
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
		it.Event = new(PointCoreCustomerGoldBurned)
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
func (it *PointCoreCustomerGoldBurnedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PointCoreCustomerGoldBurnedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PointCoreCustomerGoldBurned represents a CustomerGoldBurned event raised by the PointCore contract.
type PointCoreCustomerGoldBurned struct {
	ClientId      *big.Int
	ClientAddress common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterCustomerGoldBurned is a free log retrieval operation binding the contract event 0xddce914db84a6bdbb58a5b60c983261219e5030e7998b25cd0b2330cc105b4c5.
//
// Solidity: event CustomerGoldBurned(uint256 indexed clientId, address clientAddress)
func (_PointCore *PointCoreFilterer) FilterCustomerGoldBurned(opts *bind.FilterOpts, clientId []*big.Int) (*PointCoreCustomerGoldBurnedIterator, error) {

	var clientIdRule []interface{}
	for _, clientIdItem := range clientId {
		clientIdRule = append(clientIdRule, clientIdItem)
	}

	logs, sub, err := _PointCore.contract.FilterLogs(opts, "CustomerGoldBurned", clientIdRule)
	if err != nil {
		return nil, err
	}
	return &PointCoreCustomerGoldBurnedIterator{contract: _PointCore.contract, event: "CustomerGoldBurned", logs: logs, sub: sub}, nil
}

// WatchCustomerGoldBurned is a free log subscription operation binding the contract event 0xddce914db84a6bdbb58a5b60c983261219e5030e7998b25cd0b2330cc105b4c5.
//
// Solidity: event CustomerGoldBurned(uint256 indexed clientId, address clientAddress)
func (_PointCore *PointCoreFilterer) WatchCustomerGoldBurned(opts *bind.WatchOpts, sink chan<- *PointCoreCustomerGoldBurned, clientId []*big.Int) (event.Subscription, error) {

	var clientIdRule []interface{}
	for _, clientIdItem := range clientId {
		clientIdRule = append(clientIdRule, clientIdItem)
	}

	logs, sub, err := _PointCore.contract.WatchLogs(opts, "CustomerGoldBurned", clientIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PointCoreCustomerGoldBurned)
				if err := _PointCore.contract.UnpackLog(event, "CustomerGoldBurned", log); err != nil {
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

// ParseCustomerGoldBurned is a log parse operation binding the contract event 0xddce914db84a6bdbb58a5b60c983261219e5030e7998b25cd0b2330cc105b4c5.
//
// Solidity: event CustomerGoldBurned(uint256 indexed clientId, address clientAddress)
func (_PointCore *PointCoreFilterer) ParseCustomerGoldBurned(log types.Log) (*PointCoreCustomerGoldBurned, error) {
	event := new(PointCoreCustomerGoldBurned)
	if err := _PointCore.contract.UnpackLog(event, "CustomerGoldBurned", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// PointCoreCustomerGoldMintedIterator is returned from FilterCustomerGoldMinted and is used to iterate over the raw logs and unpacked data for CustomerGoldMinted events raised by the PointCore contract.
type PointCoreCustomerGoldMintedIterator struct {
	Event *PointCoreCustomerGoldMinted // Event containing the contract specifics and raw log

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
func (it *PointCoreCustomerGoldMintedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PointCoreCustomerGoldMinted)
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
		it.Event = new(PointCoreCustomerGoldMinted)
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
func (it *PointCoreCustomerGoldMintedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PointCoreCustomerGoldMintedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PointCoreCustomerGoldMinted represents a CustomerGoldMinted event raised by the PointCore contract.
type PointCoreCustomerGoldMinted struct {
	ClientId      *big.Int
	ClientAddress common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterCustomerGoldMinted is a free log retrieval operation binding the contract event 0x43fc4850ce1c63dc0d1cce5b24f257f4902f7db319518a4a65eeff179e6e778a.
//
// Solidity: event CustomerGoldMinted(uint256 indexed clientId, address clientAddress)
func (_PointCore *PointCoreFilterer) FilterCustomerGoldMinted(opts *bind.FilterOpts, clientId []*big.Int) (*PointCoreCustomerGoldMintedIterator, error) {

	var clientIdRule []interface{}
	for _, clientIdItem := range clientId {
		clientIdRule = append(clientIdRule, clientIdItem)
	}

	logs, sub, err := _PointCore.contract.FilterLogs(opts, "CustomerGoldMinted", clientIdRule)
	if err != nil {
		return nil, err
	}
	return &PointCoreCustomerGoldMintedIterator{contract: _PointCore.contract, event: "CustomerGoldMinted", logs: logs, sub: sub}, nil
}

// WatchCustomerGoldMinted is a free log subscription operation binding the contract event 0x43fc4850ce1c63dc0d1cce5b24f257f4902f7db319518a4a65eeff179e6e778a.
//
// Solidity: event CustomerGoldMinted(uint256 indexed clientId, address clientAddress)
func (_PointCore *PointCoreFilterer) WatchCustomerGoldMinted(opts *bind.WatchOpts, sink chan<- *PointCoreCustomerGoldMinted, clientId []*big.Int) (event.Subscription, error) {

	var clientIdRule []interface{}
	for _, clientIdItem := range clientId {
		clientIdRule = append(clientIdRule, clientIdItem)
	}

	logs, sub, err := _PointCore.contract.WatchLogs(opts, "CustomerGoldMinted", clientIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PointCoreCustomerGoldMinted)
				if err := _PointCore.contract.UnpackLog(event, "CustomerGoldMinted", log); err != nil {
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

// ParseCustomerGoldMinted is a log parse operation binding the contract event 0x43fc4850ce1c63dc0d1cce5b24f257f4902f7db319518a4a65eeff179e6e778a.
//
// Solidity: event CustomerGoldMinted(uint256 indexed clientId, address clientAddress)
func (_PointCore *PointCoreFilterer) ParseCustomerGoldMinted(log types.Log) (*PointCoreCustomerGoldMinted, error) {
	event := new(PointCoreCustomerGoldMinted)
	if err := _PointCore.contract.UnpackLog(event, "CustomerGoldMinted", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// PointCoreCustomerPremiumBurnedIterator is returned from FilterCustomerPremiumBurned and is used to iterate over the raw logs and unpacked data for CustomerPremiumBurned events raised by the PointCore contract.
type PointCoreCustomerPremiumBurnedIterator struct {
	Event *PointCoreCustomerPremiumBurned // Event containing the contract specifics and raw log

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
func (it *PointCoreCustomerPremiumBurnedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PointCoreCustomerPremiumBurned)
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
		it.Event = new(PointCoreCustomerPremiumBurned)
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
func (it *PointCoreCustomerPremiumBurnedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PointCoreCustomerPremiumBurnedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PointCoreCustomerPremiumBurned represents a CustomerPremiumBurned event raised by the PointCore contract.
type PointCoreCustomerPremiumBurned struct {
	ClientId      *big.Int
	ClientAddress common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterCustomerPremiumBurned is a free log retrieval operation binding the contract event 0xe5d0b65c1535a04adf3a83fd5a8fa8a36e3d022c2a1f6e845823910159439cbe.
//
// Solidity: event CustomerPremiumBurned(uint256 indexed clientId, address clientAddress)
func (_PointCore *PointCoreFilterer) FilterCustomerPremiumBurned(opts *bind.FilterOpts, clientId []*big.Int) (*PointCoreCustomerPremiumBurnedIterator, error) {

	var clientIdRule []interface{}
	for _, clientIdItem := range clientId {
		clientIdRule = append(clientIdRule, clientIdItem)
	}

	logs, sub, err := _PointCore.contract.FilterLogs(opts, "CustomerPremiumBurned", clientIdRule)
	if err != nil {
		return nil, err
	}
	return &PointCoreCustomerPremiumBurnedIterator{contract: _PointCore.contract, event: "CustomerPremiumBurned", logs: logs, sub: sub}, nil
}

// WatchCustomerPremiumBurned is a free log subscription operation binding the contract event 0xe5d0b65c1535a04adf3a83fd5a8fa8a36e3d022c2a1f6e845823910159439cbe.
//
// Solidity: event CustomerPremiumBurned(uint256 indexed clientId, address clientAddress)
func (_PointCore *PointCoreFilterer) WatchCustomerPremiumBurned(opts *bind.WatchOpts, sink chan<- *PointCoreCustomerPremiumBurned, clientId []*big.Int) (event.Subscription, error) {

	var clientIdRule []interface{}
	for _, clientIdItem := range clientId {
		clientIdRule = append(clientIdRule, clientIdItem)
	}

	logs, sub, err := _PointCore.contract.WatchLogs(opts, "CustomerPremiumBurned", clientIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PointCoreCustomerPremiumBurned)
				if err := _PointCore.contract.UnpackLog(event, "CustomerPremiumBurned", log); err != nil {
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

// ParseCustomerPremiumBurned is a log parse operation binding the contract event 0xe5d0b65c1535a04adf3a83fd5a8fa8a36e3d022c2a1f6e845823910159439cbe.
//
// Solidity: event CustomerPremiumBurned(uint256 indexed clientId, address clientAddress)
func (_PointCore *PointCoreFilterer) ParseCustomerPremiumBurned(log types.Log) (*PointCoreCustomerPremiumBurned, error) {
	event := new(PointCoreCustomerPremiumBurned)
	if err := _PointCore.contract.UnpackLog(event, "CustomerPremiumBurned", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// PointCoreCustomerPremiumMintedIterator is returned from FilterCustomerPremiumMinted and is used to iterate over the raw logs and unpacked data for CustomerPremiumMinted events raised by the PointCore contract.
type PointCoreCustomerPremiumMintedIterator struct {
	Event *PointCoreCustomerPremiumMinted // Event containing the contract specifics and raw log

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
func (it *PointCoreCustomerPremiumMintedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PointCoreCustomerPremiumMinted)
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
		it.Event = new(PointCoreCustomerPremiumMinted)
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
func (it *PointCoreCustomerPremiumMintedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PointCoreCustomerPremiumMintedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PointCoreCustomerPremiumMinted represents a CustomerPremiumMinted event raised by the PointCore contract.
type PointCoreCustomerPremiumMinted struct {
	ClientId      *big.Int
	ClientAddress common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterCustomerPremiumMinted is a free log retrieval operation binding the contract event 0xd033dc0fc57b48ca3fa12d5d7abd5f9cdd9c2771503743f05c58af7fb5730290.
//
// Solidity: event CustomerPremiumMinted(uint256 indexed clientId, address clientAddress)
func (_PointCore *PointCoreFilterer) FilterCustomerPremiumMinted(opts *bind.FilterOpts, clientId []*big.Int) (*PointCoreCustomerPremiumMintedIterator, error) {

	var clientIdRule []interface{}
	for _, clientIdItem := range clientId {
		clientIdRule = append(clientIdRule, clientIdItem)
	}

	logs, sub, err := _PointCore.contract.FilterLogs(opts, "CustomerPremiumMinted", clientIdRule)
	if err != nil {
		return nil, err
	}
	return &PointCoreCustomerPremiumMintedIterator{contract: _PointCore.contract, event: "CustomerPremiumMinted", logs: logs, sub: sub}, nil
}

// WatchCustomerPremiumMinted is a free log subscription operation binding the contract event 0xd033dc0fc57b48ca3fa12d5d7abd5f9cdd9c2771503743f05c58af7fb5730290.
//
// Solidity: event CustomerPremiumMinted(uint256 indexed clientId, address clientAddress)
func (_PointCore *PointCoreFilterer) WatchCustomerPremiumMinted(opts *bind.WatchOpts, sink chan<- *PointCoreCustomerPremiumMinted, clientId []*big.Int) (event.Subscription, error) {

	var clientIdRule []interface{}
	for _, clientIdItem := range clientId {
		clientIdRule = append(clientIdRule, clientIdItem)
	}

	logs, sub, err := _PointCore.contract.WatchLogs(opts, "CustomerPremiumMinted", clientIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PointCoreCustomerPremiumMinted)
				if err := _PointCore.contract.UnpackLog(event, "CustomerPremiumMinted", log); err != nil {
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

// ParseCustomerPremiumMinted is a log parse operation binding the contract event 0xd033dc0fc57b48ca3fa12d5d7abd5f9cdd9c2771503743f05c58af7fb5730290.
//
// Solidity: event CustomerPremiumMinted(uint256 indexed clientId, address clientAddress)
func (_PointCore *PointCoreFilterer) ParseCustomerPremiumMinted(log types.Log) (*PointCoreCustomerPremiumMinted, error) {
	event := new(PointCoreCustomerPremiumMinted)
	if err := _PointCore.contract.UnpackLog(event, "CustomerPremiumMinted", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// PointCoreCustomerTitaniumBurnedIterator is returned from FilterCustomerTitaniumBurned and is used to iterate over the raw logs and unpacked data for CustomerTitaniumBurned events raised by the PointCore contract.
type PointCoreCustomerTitaniumBurnedIterator struct {
	Event *PointCoreCustomerTitaniumBurned // Event containing the contract specifics and raw log

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
func (it *PointCoreCustomerTitaniumBurnedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PointCoreCustomerTitaniumBurned)
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
		it.Event = new(PointCoreCustomerTitaniumBurned)
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
func (it *PointCoreCustomerTitaniumBurnedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PointCoreCustomerTitaniumBurnedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PointCoreCustomerTitaniumBurned represents a CustomerTitaniumBurned event raised by the PointCore contract.
type PointCoreCustomerTitaniumBurned struct {
	ClientId      *big.Int
	ClientAddress common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterCustomerTitaniumBurned is a free log retrieval operation binding the contract event 0x0fee4849772d8c321c8fa1009bf7503a06943d56b3e2544676a910c2fc9b8a31.
//
// Solidity: event CustomerTitaniumBurned(uint256 indexed clientId, address clientAddress)
func (_PointCore *PointCoreFilterer) FilterCustomerTitaniumBurned(opts *bind.FilterOpts, clientId []*big.Int) (*PointCoreCustomerTitaniumBurnedIterator, error) {

	var clientIdRule []interface{}
	for _, clientIdItem := range clientId {
		clientIdRule = append(clientIdRule, clientIdItem)
	}

	logs, sub, err := _PointCore.contract.FilterLogs(opts, "CustomerTitaniumBurned", clientIdRule)
	if err != nil {
		return nil, err
	}
	return &PointCoreCustomerTitaniumBurnedIterator{contract: _PointCore.contract, event: "CustomerTitaniumBurned", logs: logs, sub: sub}, nil
}

// WatchCustomerTitaniumBurned is a free log subscription operation binding the contract event 0x0fee4849772d8c321c8fa1009bf7503a06943d56b3e2544676a910c2fc9b8a31.
//
// Solidity: event CustomerTitaniumBurned(uint256 indexed clientId, address clientAddress)
func (_PointCore *PointCoreFilterer) WatchCustomerTitaniumBurned(opts *bind.WatchOpts, sink chan<- *PointCoreCustomerTitaniumBurned, clientId []*big.Int) (event.Subscription, error) {

	var clientIdRule []interface{}
	for _, clientIdItem := range clientId {
		clientIdRule = append(clientIdRule, clientIdItem)
	}

	logs, sub, err := _PointCore.contract.WatchLogs(opts, "CustomerTitaniumBurned", clientIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PointCoreCustomerTitaniumBurned)
				if err := _PointCore.contract.UnpackLog(event, "CustomerTitaniumBurned", log); err != nil {
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

// ParseCustomerTitaniumBurned is a log parse operation binding the contract event 0x0fee4849772d8c321c8fa1009bf7503a06943d56b3e2544676a910c2fc9b8a31.
//
// Solidity: event CustomerTitaniumBurned(uint256 indexed clientId, address clientAddress)
func (_PointCore *PointCoreFilterer) ParseCustomerTitaniumBurned(log types.Log) (*PointCoreCustomerTitaniumBurned, error) {
	event := new(PointCoreCustomerTitaniumBurned)
	if err := _PointCore.contract.UnpackLog(event, "CustomerTitaniumBurned", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// PointCoreCustomerTitaniumMintedIterator is returned from FilterCustomerTitaniumMinted and is used to iterate over the raw logs and unpacked data for CustomerTitaniumMinted events raised by the PointCore contract.
type PointCoreCustomerTitaniumMintedIterator struct {
	Event *PointCoreCustomerTitaniumMinted // Event containing the contract specifics and raw log

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
func (it *PointCoreCustomerTitaniumMintedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PointCoreCustomerTitaniumMinted)
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
		it.Event = new(PointCoreCustomerTitaniumMinted)
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
func (it *PointCoreCustomerTitaniumMintedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PointCoreCustomerTitaniumMintedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PointCoreCustomerTitaniumMinted represents a CustomerTitaniumMinted event raised by the PointCore contract.
type PointCoreCustomerTitaniumMinted struct {
	ClientId      *big.Int
	ClientAddress common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterCustomerTitaniumMinted is a free log retrieval operation binding the contract event 0x86fd7d1f5d70bd0ede2920e14777133ae135b452371f1b397eece7b74efb4d51.
//
// Solidity: event CustomerTitaniumMinted(uint256 indexed clientId, address clientAddress)
func (_PointCore *PointCoreFilterer) FilterCustomerTitaniumMinted(opts *bind.FilterOpts, clientId []*big.Int) (*PointCoreCustomerTitaniumMintedIterator, error) {

	var clientIdRule []interface{}
	for _, clientIdItem := range clientId {
		clientIdRule = append(clientIdRule, clientIdItem)
	}

	logs, sub, err := _PointCore.contract.FilterLogs(opts, "CustomerTitaniumMinted", clientIdRule)
	if err != nil {
		return nil, err
	}
	return &PointCoreCustomerTitaniumMintedIterator{contract: _PointCore.contract, event: "CustomerTitaniumMinted", logs: logs, sub: sub}, nil
}

// WatchCustomerTitaniumMinted is a free log subscription operation binding the contract event 0x86fd7d1f5d70bd0ede2920e14777133ae135b452371f1b397eece7b74efb4d51.
//
// Solidity: event CustomerTitaniumMinted(uint256 indexed clientId, address clientAddress)
func (_PointCore *PointCoreFilterer) WatchCustomerTitaniumMinted(opts *bind.WatchOpts, sink chan<- *PointCoreCustomerTitaniumMinted, clientId []*big.Int) (event.Subscription, error) {

	var clientIdRule []interface{}
	for _, clientIdItem := range clientId {
		clientIdRule = append(clientIdRule, clientIdItem)
	}

	logs, sub, err := _PointCore.contract.WatchLogs(opts, "CustomerTitaniumMinted", clientIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PointCoreCustomerTitaniumMinted)
				if err := _PointCore.contract.UnpackLog(event, "CustomerTitaniumMinted", log); err != nil {
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

// ParseCustomerTitaniumMinted is a log parse operation binding the contract event 0x86fd7d1f5d70bd0ede2920e14777133ae135b452371f1b397eece7b74efb4d51.
//
// Solidity: event CustomerTitaniumMinted(uint256 indexed clientId, address clientAddress)
func (_PointCore *PointCoreFilterer) ParseCustomerTitaniumMinted(log types.Log) (*PointCoreCustomerTitaniumMinted, error) {
	event := new(PointCoreCustomerTitaniumMinted)
	if err := _PointCore.contract.UnpackLog(event, "CustomerTitaniumMinted", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// PointCoreInitializedIterator is returned from FilterInitialized and is used to iterate over the raw logs and unpacked data for Initialized events raised by the PointCore contract.
type PointCoreInitializedIterator struct {
	Event *PointCoreInitialized // Event containing the contract specifics and raw log

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
func (it *PointCoreInitializedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PointCoreInitialized)
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
		it.Event = new(PointCoreInitialized)
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
func (it *PointCoreInitializedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PointCoreInitializedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PointCoreInitialized represents a Initialized event raised by the PointCore contract.
type PointCoreInitialized struct {
	Version uint64
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterInitialized is a free log retrieval operation binding the contract event 0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2.
//
// Solidity: event Initialized(uint64 version)
func (_PointCore *PointCoreFilterer) FilterInitialized(opts *bind.FilterOpts) (*PointCoreInitializedIterator, error) {

	logs, sub, err := _PointCore.contract.FilterLogs(opts, "Initialized")
	if err != nil {
		return nil, err
	}
	return &PointCoreInitializedIterator{contract: _PointCore.contract, event: "Initialized", logs: logs, sub: sub}, nil
}

// WatchInitialized is a free log subscription operation binding the contract event 0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2.
//
// Solidity: event Initialized(uint64 version)
func (_PointCore *PointCoreFilterer) WatchInitialized(opts *bind.WatchOpts, sink chan<- *PointCoreInitialized) (event.Subscription, error) {

	logs, sub, err := _PointCore.contract.WatchLogs(opts, "Initialized")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PointCoreInitialized)
				if err := _PointCore.contract.UnpackLog(event, "Initialized", log); err != nil {
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
func (_PointCore *PointCoreFilterer) ParseInitialized(log types.Log) (*PointCoreInitialized, error) {
	event := new(PointCoreInitialized)
	if err := _PointCore.contract.UnpackLog(event, "Initialized", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// PointCoreOwnershipTransferredIterator is returned from FilterOwnershipTransferred and is used to iterate over the raw logs and unpacked data for OwnershipTransferred events raised by the PointCore contract.
type PointCoreOwnershipTransferredIterator struct {
	Event *PointCoreOwnershipTransferred // Event containing the contract specifics and raw log

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
func (it *PointCoreOwnershipTransferredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PointCoreOwnershipTransferred)
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
		it.Event = new(PointCoreOwnershipTransferred)
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
func (it *PointCoreOwnershipTransferredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PointCoreOwnershipTransferredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PointCoreOwnershipTransferred represents a OwnershipTransferred event raised by the PointCore contract.
type PointCoreOwnershipTransferred struct {
	PreviousOwner common.Address
	NewOwner      common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterOwnershipTransferred is a free log retrieval operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_PointCore *PointCoreFilterer) FilterOwnershipTransferred(opts *bind.FilterOpts, previousOwner []common.Address, newOwner []common.Address) (*PointCoreOwnershipTransferredIterator, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _PointCore.contract.FilterLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return &PointCoreOwnershipTransferredIterator{contract: _PointCore.contract, event: "OwnershipTransferred", logs: logs, sub: sub}, nil
}

// WatchOwnershipTransferred is a free log subscription operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_PointCore *PointCoreFilterer) WatchOwnershipTransferred(opts *bind.WatchOpts, sink chan<- *PointCoreOwnershipTransferred, previousOwner []common.Address, newOwner []common.Address) (event.Subscription, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _PointCore.contract.WatchLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PointCoreOwnershipTransferred)
				if err := _PointCore.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
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
func (_PointCore *PointCoreFilterer) ParseOwnershipTransferred(log types.Log) (*PointCoreOwnershipTransferred, error) {
	event := new(PointCoreOwnershipTransferred)
	if err := _PointCore.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// PointCorePointsAddedIterator is returned from FilterPointsAdded and is used to iterate over the raw logs and unpacked data for PointsAdded events raised by the PointCore contract.
type PointCorePointsAddedIterator struct {
	Event *PointCorePointsAdded // Event containing the contract specifics and raw log

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
func (it *PointCorePointsAddedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PointCorePointsAdded)
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
		it.Event = new(PointCorePointsAdded)
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
func (it *PointCorePointsAddedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PointCorePointsAddedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PointCorePointsAdded represents a PointsAdded event raised by the PointCore contract.
type PointCorePointsAdded struct {
	ClientId *big.Int
	Points   *big.Int
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterPointsAdded is a free log retrieval operation binding the contract event 0xf54b9ab9e866899cf7486a617bf4f1e402300b8c2b16214e8f20f0d8ba03ca11.
//
// Solidity: event PointsAdded(uint256 indexed clientId, uint256 points)
func (_PointCore *PointCoreFilterer) FilterPointsAdded(opts *bind.FilterOpts, clientId []*big.Int) (*PointCorePointsAddedIterator, error) {

	var clientIdRule []interface{}
	for _, clientIdItem := range clientId {
		clientIdRule = append(clientIdRule, clientIdItem)
	}

	logs, sub, err := _PointCore.contract.FilterLogs(opts, "PointsAdded", clientIdRule)
	if err != nil {
		return nil, err
	}
	return &PointCorePointsAddedIterator{contract: _PointCore.contract, event: "PointsAdded", logs: logs, sub: sub}, nil
}

// WatchPointsAdded is a free log subscription operation binding the contract event 0xf54b9ab9e866899cf7486a617bf4f1e402300b8c2b16214e8f20f0d8ba03ca11.
//
// Solidity: event PointsAdded(uint256 indexed clientId, uint256 points)
func (_PointCore *PointCoreFilterer) WatchPointsAdded(opts *bind.WatchOpts, sink chan<- *PointCorePointsAdded, clientId []*big.Int) (event.Subscription, error) {

	var clientIdRule []interface{}
	for _, clientIdItem := range clientId {
		clientIdRule = append(clientIdRule, clientIdItem)
	}

	logs, sub, err := _PointCore.contract.WatchLogs(opts, "PointsAdded", clientIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PointCorePointsAdded)
				if err := _PointCore.contract.UnpackLog(event, "PointsAdded", log); err != nil {
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

// ParsePointsAdded is a log parse operation binding the contract event 0xf54b9ab9e866899cf7486a617bf4f1e402300b8c2b16214e8f20f0d8ba03ca11.
//
// Solidity: event PointsAdded(uint256 indexed clientId, uint256 points)
func (_PointCore *PointCoreFilterer) ParsePointsAdded(log types.Log) (*PointCorePointsAdded, error) {
	event := new(PointCorePointsAdded)
	if err := _PointCore.contract.UnpackLog(event, "PointsAdded", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// PointCorePointsRemovedIterator is returned from FilterPointsRemoved and is used to iterate over the raw logs and unpacked data for PointsRemoved events raised by the PointCore contract.
type PointCorePointsRemovedIterator struct {
	Event *PointCorePointsRemoved // Event containing the contract specifics and raw log

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
func (it *PointCorePointsRemovedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PointCorePointsRemoved)
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
		it.Event = new(PointCorePointsRemoved)
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
func (it *PointCorePointsRemovedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PointCorePointsRemovedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PointCorePointsRemoved represents a PointsRemoved event raised by the PointCore contract.
type PointCorePointsRemoved struct {
	ClientId *big.Int
	Points   *big.Int
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterPointsRemoved is a free log retrieval operation binding the contract event 0x3acfc90bc712f850a17e0c2eba0dfc3884c55e7f88d2cc44c097cbd3b1de778f.
//
// Solidity: event PointsRemoved(uint256 indexed clientId, uint256 points)
func (_PointCore *PointCoreFilterer) FilterPointsRemoved(opts *bind.FilterOpts, clientId []*big.Int) (*PointCorePointsRemovedIterator, error) {

	var clientIdRule []interface{}
	for _, clientIdItem := range clientId {
		clientIdRule = append(clientIdRule, clientIdItem)
	}

	logs, sub, err := _PointCore.contract.FilterLogs(opts, "PointsRemoved", clientIdRule)
	if err != nil {
		return nil, err
	}
	return &PointCorePointsRemovedIterator{contract: _PointCore.contract, event: "PointsRemoved", logs: logs, sub: sub}, nil
}

// WatchPointsRemoved is a free log subscription operation binding the contract event 0x3acfc90bc712f850a17e0c2eba0dfc3884c55e7f88d2cc44c097cbd3b1de778f.
//
// Solidity: event PointsRemoved(uint256 indexed clientId, uint256 points)
func (_PointCore *PointCoreFilterer) WatchPointsRemoved(opts *bind.WatchOpts, sink chan<- *PointCorePointsRemoved, clientId []*big.Int) (event.Subscription, error) {

	var clientIdRule []interface{}
	for _, clientIdItem := range clientId {
		clientIdRule = append(clientIdRule, clientIdItem)
	}

	logs, sub, err := _PointCore.contract.WatchLogs(opts, "PointsRemoved", clientIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PointCorePointsRemoved)
				if err := _PointCore.contract.UnpackLog(event, "PointsRemoved", log); err != nil {
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

// ParsePointsRemoved is a log parse operation binding the contract event 0x3acfc90bc712f850a17e0c2eba0dfc3884c55e7f88d2cc44c097cbd3b1de778f.
//
// Solidity: event PointsRemoved(uint256 indexed clientId, uint256 points)
func (_PointCore *PointCoreFilterer) ParsePointsRemoved(log types.Log) (*PointCorePointsRemoved, error) {
	event := new(PointCorePointsRemoved)
	if err := _PointCore.contract.UnpackLog(event, "PointsRemoved", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// PointCoreTransferBatchIterator is returned from FilterTransferBatch and is used to iterate over the raw logs and unpacked data for TransferBatch events raised by the PointCore contract.
type PointCoreTransferBatchIterator struct {
	Event *PointCoreTransferBatch // Event containing the contract specifics and raw log

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
func (it *PointCoreTransferBatchIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PointCoreTransferBatch)
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
		it.Event = new(PointCoreTransferBatch)
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
func (it *PointCoreTransferBatchIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PointCoreTransferBatchIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PointCoreTransferBatch represents a TransferBatch event raised by the PointCore contract.
type PointCoreTransferBatch struct {
	Operator common.Address
	From     common.Address
	To       common.Address
	Ids      []*big.Int
	Values   []*big.Int
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterTransferBatch is a free log retrieval operation binding the contract event 0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb.
//
// Solidity: event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)
func (_PointCore *PointCoreFilterer) FilterTransferBatch(opts *bind.FilterOpts, operator []common.Address, from []common.Address, to []common.Address) (*PointCoreTransferBatchIterator, error) {

	var operatorRule []interface{}
	for _, operatorItem := range operator {
		operatorRule = append(operatorRule, operatorItem)
	}
	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _PointCore.contract.FilterLogs(opts, "TransferBatch", operatorRule, fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &PointCoreTransferBatchIterator{contract: _PointCore.contract, event: "TransferBatch", logs: logs, sub: sub}, nil
}

// WatchTransferBatch is a free log subscription operation binding the contract event 0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb.
//
// Solidity: event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)
func (_PointCore *PointCoreFilterer) WatchTransferBatch(opts *bind.WatchOpts, sink chan<- *PointCoreTransferBatch, operator []common.Address, from []common.Address, to []common.Address) (event.Subscription, error) {

	var operatorRule []interface{}
	for _, operatorItem := range operator {
		operatorRule = append(operatorRule, operatorItem)
	}
	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _PointCore.contract.WatchLogs(opts, "TransferBatch", operatorRule, fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PointCoreTransferBatch)
				if err := _PointCore.contract.UnpackLog(event, "TransferBatch", log); err != nil {
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

// ParseTransferBatch is a log parse operation binding the contract event 0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb.
//
// Solidity: event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)
func (_PointCore *PointCoreFilterer) ParseTransferBatch(log types.Log) (*PointCoreTransferBatch, error) {
	event := new(PointCoreTransferBatch)
	if err := _PointCore.contract.UnpackLog(event, "TransferBatch", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// PointCoreTransferSingleIterator is returned from FilterTransferSingle and is used to iterate over the raw logs and unpacked data for TransferSingle events raised by the PointCore contract.
type PointCoreTransferSingleIterator struct {
	Event *PointCoreTransferSingle // Event containing the contract specifics and raw log

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
func (it *PointCoreTransferSingleIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PointCoreTransferSingle)
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
		it.Event = new(PointCoreTransferSingle)
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
func (it *PointCoreTransferSingleIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PointCoreTransferSingleIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PointCoreTransferSingle represents a TransferSingle event raised by the PointCore contract.
type PointCoreTransferSingle struct {
	Operator common.Address
	From     common.Address
	To       common.Address
	Id       *big.Int
	Value    *big.Int
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterTransferSingle is a free log retrieval operation binding the contract event 0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62.
//
// Solidity: event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)
func (_PointCore *PointCoreFilterer) FilterTransferSingle(opts *bind.FilterOpts, operator []common.Address, from []common.Address, to []common.Address) (*PointCoreTransferSingleIterator, error) {

	var operatorRule []interface{}
	for _, operatorItem := range operator {
		operatorRule = append(operatorRule, operatorItem)
	}
	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _PointCore.contract.FilterLogs(opts, "TransferSingle", operatorRule, fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &PointCoreTransferSingleIterator{contract: _PointCore.contract, event: "TransferSingle", logs: logs, sub: sub}, nil
}

// WatchTransferSingle is a free log subscription operation binding the contract event 0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62.
//
// Solidity: event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)
func (_PointCore *PointCoreFilterer) WatchTransferSingle(opts *bind.WatchOpts, sink chan<- *PointCoreTransferSingle, operator []common.Address, from []common.Address, to []common.Address) (event.Subscription, error) {

	var operatorRule []interface{}
	for _, operatorItem := range operator {
		operatorRule = append(operatorRule, operatorItem)
	}
	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _PointCore.contract.WatchLogs(opts, "TransferSingle", operatorRule, fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PointCoreTransferSingle)
				if err := _PointCore.contract.UnpackLog(event, "TransferSingle", log); err != nil {
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

// ParseTransferSingle is a log parse operation binding the contract event 0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62.
//
// Solidity: event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)
func (_PointCore *PointCoreFilterer) ParseTransferSingle(log types.Log) (*PointCoreTransferSingle, error) {
	event := new(PointCoreTransferSingle)
	if err := _PointCore.contract.UnpackLog(event, "TransferSingle", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// PointCoreURIIterator is returned from FilterURI and is used to iterate over the raw logs and unpacked data for URI events raised by the PointCore contract.
type PointCoreURIIterator struct {
	Event *PointCoreURI // Event containing the contract specifics and raw log

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
func (it *PointCoreURIIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PointCoreURI)
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
		it.Event = new(PointCoreURI)
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
func (it *PointCoreURIIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PointCoreURIIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PointCoreURI represents a URI event raised by the PointCore contract.
type PointCoreURI struct {
	Value string
	Id    *big.Int
	Raw   types.Log // Blockchain specific contextual infos
}

// FilterURI is a free log retrieval operation binding the contract event 0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b.
//
// Solidity: event URI(string value, uint256 indexed id)
func (_PointCore *PointCoreFilterer) FilterURI(opts *bind.FilterOpts, id []*big.Int) (*PointCoreURIIterator, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _PointCore.contract.FilterLogs(opts, "URI", idRule)
	if err != nil {
		return nil, err
	}
	return &PointCoreURIIterator{contract: _PointCore.contract, event: "URI", logs: logs, sub: sub}, nil
}

// WatchURI is a free log subscription operation binding the contract event 0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b.
//
// Solidity: event URI(string value, uint256 indexed id)
func (_PointCore *PointCoreFilterer) WatchURI(opts *bind.WatchOpts, sink chan<- *PointCoreURI, id []*big.Int) (event.Subscription, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _PointCore.contract.WatchLogs(opts, "URI", idRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PointCoreURI)
				if err := _PointCore.contract.UnpackLog(event, "URI", log); err != nil {
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

// ParseURI is a log parse operation binding the contract event 0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b.
//
// Solidity: event URI(string value, uint256 indexed id)
func (_PointCore *PointCoreFilterer) ParseURI(log types.Log) (*PointCoreURI, error) {
	event := new(PointCoreURI)
	if err := _PointCore.contract.UnpackLog(event, "URI", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// PointCoreUpgradedIterator is returned from FilterUpgraded and is used to iterate over the raw logs and unpacked data for Upgraded events raised by the PointCore contract.
type PointCoreUpgradedIterator struct {
	Event *PointCoreUpgraded // Event containing the contract specifics and raw log

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
func (it *PointCoreUpgradedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PointCoreUpgraded)
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
		it.Event = new(PointCoreUpgraded)
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
func (it *PointCoreUpgradedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PointCoreUpgradedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PointCoreUpgraded represents a Upgraded event raised by the PointCore contract.
type PointCoreUpgraded struct {
	Implementation common.Address
	Raw            types.Log // Blockchain specific contextual infos
}

// FilterUpgraded is a free log retrieval operation binding the contract event 0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b.
//
// Solidity: event Upgraded(address indexed implementation)
func (_PointCore *PointCoreFilterer) FilterUpgraded(opts *bind.FilterOpts, implementation []common.Address) (*PointCoreUpgradedIterator, error) {

	var implementationRule []interface{}
	for _, implementationItem := range implementation {
		implementationRule = append(implementationRule, implementationItem)
	}

	logs, sub, err := _PointCore.contract.FilterLogs(opts, "Upgraded", implementationRule)
	if err != nil {
		return nil, err
	}
	return &PointCoreUpgradedIterator{contract: _PointCore.contract, event: "Upgraded", logs: logs, sub: sub}, nil
}

// WatchUpgraded is a free log subscription operation binding the contract event 0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b.
//
// Solidity: event Upgraded(address indexed implementation)
func (_PointCore *PointCoreFilterer) WatchUpgraded(opts *bind.WatchOpts, sink chan<- *PointCoreUpgraded, implementation []common.Address) (event.Subscription, error) {

	var implementationRule []interface{}
	for _, implementationItem := range implementation {
		implementationRule = append(implementationRule, implementationItem)
	}

	logs, sub, err := _PointCore.contract.WatchLogs(opts, "Upgraded", implementationRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PointCoreUpgraded)
				if err := _PointCore.contract.UnpackLog(event, "Upgraded", log); err != nil {
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
func (_PointCore *PointCoreFilterer) ParseUpgraded(log types.Log) (*PointCoreUpgraded, error) {
	event := new(PointCoreUpgraded)
	if err := _PointCore.contract.UnpackLog(event, "Upgraded", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
