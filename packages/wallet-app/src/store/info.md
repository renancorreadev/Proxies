```
└── 📁wallet-app
    └── 📁.expo
        └── devices.json
        └── packager-info.json
        └── README.md
        └── settings.json
    └── 📁.github
        └── 📁ISSUE_TEMPLATE
            └── bug-report---.md
            └── feature-request---.md
    └── 📁.vscode
        └── settings.json
    └── 📁.yarn
        └── install-state.gz
    └── 📁assets
        └── adaptive-icon.png
        └── balance.gif
        └── favicon.png
        └── icon.png
        └── mascot_head.png
        └── networth.gif
        └── pin.svg
        └── qr-send.gif
        └── readme_banner_alt.png
        └── readme_banner.png
        └── send-alt.gif
        └── sharing_qr.gif
        └── splash.png
        └── wallet_create.gif
        └── wallet_import.gif
        └── wallet_management_alt.gif
    └── 📁src
        └── 📁app
            └── 📁(app)
                └── 📁accounts
                    └── account-modal.tsx
                    └── account-name-modal.tsx
                    └── accounts.tsx
                └── 📁camera
                    └── index.tsx
                └── 📁settings
                    └── settings-modal.tsx
                └── 📁token
                    └── 📁confirmation
                        └── index.tsx
                    └── 📁receive
                        └── [receive].tsx
                        └── receive-options.tsx
                    └── 📁send
                        └── [send].tsx
                        └── send-confirmation.tsx
                        └── send-options.tsx
                    └── [id].tsx
                └── _layout.tsx
                └── index.tsx
            └── 📁(wallet)
                └── 📁biometrics
                    └── index.tsx
                └── 📁seed
                    └── confirm-seed-phrase.tsx
                    └── seed-phrase.tsx
                    └── wallet-import-seed-phrase.tsx
                └── 📁setup
                    └── wallet-created-successfully.tsx
                    └── wallet-import-options.tsx
                    └── wallet-setup.tsx
            └── _layout.tsx
        └── 📁assets
            └── 📁images
                └── biometrics.png
                └── boost.png
                └── camera.png
                └── confirmation.png
                └── import_wallet.png
                └── mascot_head.png
                └── wallet_alt.png
                └── wallet_success.png
                └── wallet.png
            └── 📁svg
                └── check-mark.svg
                └── clear.svg
                └── close.svg
                └── confirm-send.svg
                └── copy.svg
                └── down-arrow.svg
                └── edit.svg
                └── ethereum_plain.svg
                └── ethereum.svg
                └── import-wallet.svg
                └── left-arrow.svg
                └── paste.svg
                └── phrase.svg
                └── qr-code-camera.svg
                └── qr-code-receive.svg
                └── qr-code.svg
                └── receive.svg
                └── right-arrow.svg
                └── send.svg
                └── settings.svg
                └── solana.svg
                └── wallet.svg
        └── 📁components
            └── 📁AnimatedSplashScreen
                └── AnimatedSplashScreen.tsx
            └── 📁Bubble
                └── Bubble.tsx
            └── 📁Button
                └── Button.tsx
            └── 📁CryptoInfoCard
                └── CryptoInfoCard.tsx
                └── CryptoInfoCardSkeleton.tsx
            └── 📁Header
                └── Header.tsx
            └── 📁InfoBanner
                └── InfoBanner.tsx
            └── 📁Layouts
                └── ModalLayout.tsx
            └── 📁Loader
                └── CleanArcSpinner.tsx
                └── DotLoader.tsx
            └── 📁PrimaryButton
                └── PrimaryButton.tsx
            └── 📁SendConfCard
                └── SendConfCard.tsx
            └── 📁Styles
                └── Errors.styles.tsx
                └── Gradient.tsx
                └── Layout.styles.tsx
                └── Text.styles.tsx
            └── 📁TokenInfoCard
                └── TokenInfoCard.tsx
        └── 📁config
            └── toast.tsx
        └── 📁constants
            └── crypto.ts
            └── price.ts
            └── routes.ts
            └── storage.ts
            └── tickers.ts
        └── 📁hooks
            └── redux.ts
            └── useStorageState.ts
        └── 📁services
            └── EthereumService.ts
            └── SolanaService.ts
        └── 📁store
            └── 📁selectors
                └── walletSelectors.ts
            └── biometricsSlice.ts
            └── ethereumSlice.ts
            └── index.ts
            └── priceSlice.ts
            └── solanaSlice.ts
            └── types.ts
        └── 📁styles
            └── theme.ts
        └── 📁types
            └── index.ts
        └── 📁utils
            └── authenticator.ts
            └── base64ToUint8Array.test.ts
            └── base64ToUint8Array.ts
            └── capitalizeFirstLetter.test.ts
            └── capitalizeFirstLetter.ts
            └── cryptoUtils.ts
            └── fetchCryptoPrices.ts
            └── formatDollars.ts
            └── identifyAddress.ts
            └── isCloseToBottom.ts
            └── placeholder.ts
            └── truncateBalance.ts
            └── truncateWalletAddress.test.ts
            └── truncateWalletAddress.ts
            └── uint8ArrayToBase64.test.ts
            └── uint8ArrayToBase64.ts
    └── .env
    └── .env.example
    └── .gitattributes
    └── .gitignore
    └── .svgrrc
    └── .yarnrc.yml
    └── app.json
    └── babel.config.js
    └── declarations.d.ts
    └── LICENSE.txt
    └── metro.config.js
    └── package.json
    └── prompt.md
    └── README.md
    └── tsconfig.json
    └── wallet-app.code-workspace
    └── yarn.lock
```


Segue abaixo os arquivos do redux: 

└── 📁store
    └── 📁selectors
        └── walletSelectors.ts
```ts
import { RootState } from "../index";

// Ethereum selectors
export const selectActiveEthereumIndex = (state: RootState) =>
  state.ethereum.activeIndex ?? 0;

export const selectActiveEthereumAddress = (state: RootState) => {
  const activeIndex = selectActiveEthereumIndex(state);
  return state.ethereum.addresses[activeIndex]?.address ?? "";
};

export const selectEthereumAddresses = (state: RootState) =>
  state.ethereum.addresses;

export const selectEthereumBalance = (state: RootState) => {
  const activeIndex = selectActiveEthereumIndex(state);
  return state.ethereum.addresses[activeIndex]?.balance ?? "0";
};

// Solana selectors
export const selectActiveSolanaIndex = (state: RootState) =>
  state.solana.activeIndex ?? 0;

export const selectActiveSolanaAddress = (state: RootState) => {
  const activeIndex = selectActiveSolanaIndex(state);
  return state.solana.addresses[activeIndex]?.address ?? "";
};

export const selectSolanaAddresses = (state: RootState) =>
  state.solana.addresses;

export const selectSolanaBalance = (state: RootState) => {
  const activeIndex = selectActiveSolanaIndex(state);
  return state.solana.addresses[activeIndex]?.balance ?? "0";
};

```

.biometricsSlice.ts 
```ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as LocalAuthentication from "expo-local-authentication";
import { RootState } from ".";

export const authenticate = createAsyncThunk<
  boolean,
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>("biometrics/authenticate", async (_, { rejectWithValue }) => {
  try {
    const hasBiometric = await LocalAuthentication.hasHardwareAsync();
    if (!hasBiometric) {
      return rejectWithValue(
        "Biometric authentication is not available on this device."
      );
    }
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to access the app.",
      fallbackLabel: "Use passcode instead?",
      disableDeviceFallback: true,
      cancelLabel: "Cancel",
    });

    return result.success;
  } catch (error) {
    console.error("Authentication error", error);
    return rejectWithValue("An error occurred during authentication.");
  }
});

export const isAuthEnrolled = createAsyncThunk<
  boolean,
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>("biometrics/isAuthEnrolled", async (_, { rejectWithValue }) => {
  try {
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      return rejectWithValue("No biometrics enrolled on this device.");
    }
    return isEnrolled;
  } catch (error) {
    console.error("Enrollment check error", error);
    return rejectWithValue(
      "An error occurred while checking biometric enrollment."
    );
  }
});

export interface InitialBiometricsState {
  biometricsEnabled: boolean;
  isEnrolled: boolean;
  errorMessage: string;
  status: "idle" | "loading" | "rejected";
}

const initialState: InitialBiometricsState = {
  biometricsEnabled: false,
  isEnrolled: false,
  errorMessage: "",
  status: "idle",
};

const biometricsSlice = createSlice({
  name: "biometrics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        authenticate.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          state.biometricsEnabled = action.payload;
          state.status = "idle";
        }
      )
      .addCase(authenticate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.status = "rejected";
        state.errorMessage = action.error.message || "Failed to authenticate.";
      })
      .addCase(
        isAuthEnrolled.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          state.isEnrolled = action.payload;
          state.status = "idle";
        }
      )
      .addCase(isAuthEnrolled.pending, (state) => {
        state.status = "loading";
      })
      .addCase(isAuthEnrolled.rejected, (state, action) => {
        state.status = "rejected";
        state.errorMessage =
          action.error.message || "Failed to check enrollment.";
      });
  },
});

export default biometricsSlice.reducer;

```

ethereumSlice.ts
```ts
import "react-native-get-random-values";
import "@ethersproject/shims";

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import * as ethers from "ethers";
import { RootState } from "./index";
import ethService from "../services/EthereumService";

import { truncateBalance } from "../utils/truncateBalance";
import {
  GeneralStatus,
  AddressState,
  Transaction,
  TransactionConfirmation,
  ConfirmationState,
  WalletState,
} from "./types";

const CONFIRMATION_TIMEOUT = 60000;
const initialState: WalletState = {
  activeIndex: 0,
  addresses: [
    {
      accountName: "",
      derivationPath: "",
      address: "",
      publicKey: "",
      balance: 0,
      failedNetworkRequest: false,
      status: GeneralStatus.Idle,
      transactionConfirmations: [],
      transactionMetadata: {
        paginationKey: undefined,
        transactions: [],
      },
    },
  ],
};

export const fetchEthereumBalance = createAsyncThunk<
  string,
  string,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  "wallet/fetchEthereumBalance",
  async (address: ethers.AddressLike, { rejectWithValue }) => {
    try {
      const balance = await ethService.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error("error", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEthereumBalanceInterval = createAsyncThunk<
  string,
  string,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  "wallet/fetchEthereumBalanceInterval",
  async (address: ethers.AddressLike, { rejectWithValue }) => {
    try {
      const balance = await ethService.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error("error", error);
      return rejectWithValue(error.message);
    }
  }
);

export interface FetchTransactionsArg {
  address: string;
  paginationKey?: string[] | string;
}

export const fetchEthereumTransactions = createAsyncThunk(
  "wallet/fetchEthereumTransactions",
  async ({ address }: FetchTransactionsArg, { rejectWithValue }) => {
    try {
      const transactions = await ethService.fetchTransactions(address);
      return transactions;
    } catch (error) {
      console.error("error", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEthereumTransactionsInterval = createAsyncThunk(
  "wallet/fetchEthereumTransactionsInterval",
  async ({ address }: FetchTransactionsArg, { rejectWithValue }) => {
    try {
      const transactions = await ethService.fetchTransactions(address);
      return transactions;
    } catch (error) {
      console.error("error", error);
      return rejectWithValue(error.message);
    }
  }
);
interface EthTransactionArgs {
  address: ethers.AddressLike;
  privateKey: string;
  amount: string;
}

export const sendEthereumTransaction = createAsyncThunk(
  "ethereum/sendEthereumTransaction",
  async (
    { address, privateKey, amount }: EthTransactionArgs,
    { rejectWithValue }
  ) => {
    try {
      const response = await ethService.sendTransaction(
        address,
        privateKey,
        amount
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const confirmEthereumTransaction = createAsyncThunk(
  "wallet/confirmEthereumTransaction",
  async ({ txHash }: { txHash: string }, { rejectWithValue }) => {
    try {
      const confirmationPromise = ethService.confirmTransaction(txHash);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("Transaction confirmation timed out")),
          CONFIRMATION_TIMEOUT
        )
      );

      const confirmation = await Promise.race([
        confirmationPromise,
        timeoutPromise,
      ]);
      return { txHash, confirmation };
    } catch (error) {
      return rejectWithValue({ txHash, error: error.message });
    }
  }
);

export const ethereumSlice = createSlice({
  name: "ethereum",
  initialState,
  reducers: {
    saveEthereumAddresses: (state, action: PayloadAction<AddressState[]>) => {
      state.addresses = [...action.payload];
      state.activeIndex = 0;
    },
    depositEthereum: (state, action: PayloadAction<number>) => {
      state.addresses[state.activeIndex].balance += action.payload;
    },
    withdrawEthereum: (state, action: PayloadAction<number>) => {
      if (state.addresses[state.activeIndex].balance >= action.payload) {
        state.addresses[state.activeIndex].balance -= action.payload;
      } else {
        console.warn("Not enough Ethereum balance");
      }
    },
    addEthereumTransaction: (state, action: PayloadAction<Transaction>) => {
      state.addresses[state.activeIndex].transactionMetadata.transactions.push(
        action.payload
      );
    },
    updateEthereumBalance: (state, action: PayloadAction<string>) => {
      state.addresses[state.activeIndex].balance = parseFloat(action.payload);
    },
    updateEthereumAddresses: (state, action: PayloadAction<AddressState>) => {
      state.addresses.push(action.payload);
    },
    updateAccountName: (
      state,
      action: PayloadAction<{
        accountName: string;
        ethAddress: string;
      }>
    ) => {
      const ethAddressIndex = state.addresses.findIndex(
        (item) => item.address === action.payload.ethAddress
      );
      if (ethAddressIndex !== -1) {
        state.addresses[ethAddressIndex].accountName =
          action.payload.accountName;
      }
    },
    // TODO: Refactor. This is an tech debt from redux refactor
    setActiveEthereumAccount: (state, action: PayloadAction<number>) => {
      state.activeIndex = action.payload;
    },
    resetEthereumState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEthereumBalance.pending, (state) => {
        state.addresses[state.activeIndex].status = GeneralStatus.Loading;
      })
      .addCase(fetchEthereumBalance.fulfilled, (state, action) => {
        state.addresses[state.activeIndex].balance = parseFloat(
          truncateBalance(action.payload)
        );
        state.addresses[state.activeIndex].status = GeneralStatus.Idle;
      })
      .addCase(fetchEthereumBalance.rejected, (state, action) => {
        state.addresses[state.activeIndex].status = GeneralStatus.Failed;
        console.error("Failed to fetch balance:", action.payload);
      })
      .addCase(fetchEthereumBalanceInterval.fulfilled, (state, action) => {
        state.addresses[state.activeIndex].balance = parseFloat(
          truncateBalance(action.payload)
        );
        state.addresses[state.activeIndex].status = GeneralStatus.Idle;
      })
      .addCase(fetchEthereumBalanceInterval.rejected, (state, action) => {
        state.addresses[state.activeIndex].status = GeneralStatus.Failed;
        console.error("Failed to fetch balance:", action.payload);
      })
      .addCase(fetchEthereumTransactions.pending, (state) => {
        state.addresses[state.activeIndex].status = GeneralStatus.Loading;
      })
      .addCase(fetchEthereumTransactions.fulfilled, (state, action) => {
        if (action.payload) {
          state.addresses[state.activeIndex].failedNetworkRequest = false;
          state.addresses[state.activeIndex].transactionMetadata.transactions =
            action.payload.transferHistory;
          state.addresses[state.activeIndex].transactionMetadata.paginationKey =
            action.payload.paginationKey;
        } else {
          state.addresses[state.activeIndex].failedNetworkRequest = true;
        }
        state.addresses[state.activeIndex].status = GeneralStatus.Idle;
      })
      .addCase(fetchEthereumTransactions.rejected, (state, action) => {
        state.addresses[state.activeIndex].status = GeneralStatus.Failed;
        console.error("Failed to fetch transactions:", action.payload);
      })
      .addCase(fetchEthereumTransactionsInterval.fulfilled, (state, action) => {
        if (action.payload) {
          state.addresses[state.activeIndex].failedNetworkRequest = false;
          state.addresses[state.activeIndex].transactionMetadata.transactions =
            action.payload.transferHistory;
          state.addresses[state.activeIndex].transactionMetadata.paginationKey =
            action.payload.paginationKey;
        } else {
          state.addresses[state.activeIndex].failedNetworkRequest = true;
        }
        state.addresses[state.activeIndex].status = GeneralStatus.Idle;
      })
      .addCase(fetchEthereumTransactionsInterval.rejected, (state, action) => {
        state.addresses[state.activeIndex].status = GeneralStatus.Failed;
        console.error("Failed to fetch transactions:", action.payload);
      })
      .addCase(confirmEthereumTransaction.pending, (state, action) => {
        const { txHash } = action.meta.arg;
        const newConfirmation: TransactionConfirmation = {
          txHash,
          status: ConfirmationState.Pending,
        };
        state.addresses[state.activeIndex].transactionConfirmations.push(
          newConfirmation
        );
      })
      .addCase(confirmEthereumTransaction.fulfilled, (state, action) => {
        const { txHash, confirmation } = action.payload;
        const index = state.addresses[
          state.activeIndex
        ].transactionConfirmations.findIndex((tx) => tx.txHash === txHash);
        if (index !== -1) {
          state.addresses[state.activeIndex].transactionConfirmations[
            index
          ].status = confirmation
            ? ConfirmationState.Confirmed
            : ConfirmationState.Failed;
        }
      })
      .addCase(confirmEthereumTransaction.rejected, (state, action) => {
        const { txHash, error } = action.payload as any;
        const index = state.addresses[
          state.activeIndex
        ].transactionConfirmations.findIndex((tx: any) => tx.txHash === txHash);
        if (index !== -1) {
          state.addresses[state.activeIndex].transactionConfirmations[
            index
          ].status = ConfirmationState.Failed;
          state.addresses[state.activeIndex].transactionConfirmations[
            index
          ].error = error;
        }
      })
      .addCase(sendEthereumTransaction.pending, (state) => {
        state.addresses[state.activeIndex].status = GeneralStatus.Loading;
      })
      .addCase(sendEthereumTransaction.fulfilled, (state, action) => {
        state.addresses[state.activeIndex].status = GeneralStatus.Idle;

        state.addresses[state.activeIndex].transactionConfirmations.push({
          txHash: action.payload.hash,
          status: ConfirmationState.Pending,
        });
      })
      .addCase(sendEthereumTransaction.rejected, (state, action) => {
        state.addresses[state.activeIndex].status = GeneralStatus.Failed;
        console.error("Failed to send transaction:", action.payload);
      });
  },
});

export const {
  depositEthereum,
  withdrawEthereum,
  addEthereumTransaction,
  updateEthereumBalance,
  saveEthereumAddresses,
  resetEthereumState,
  setActiveEthereumAccount,
  updateEthereumAddresses,
  updateAccountName,
} = ethereumSlice.actions;

export default ethereumSlice.reducer;

```

index.ts
```ts
import "react-native-get-random-values";
import "@ethersproject/shims";

import { combineReducers } from "redux";
import {
  configureStore,
  Middleware,
  PayloadAction,
  ThunkAction,
  Action,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ethereumReducer from "./ethereumSlice";
import solanaReducer from "./solanaSlice";
import priceReduce from "./priceSlice";
import biometricsReducer from "./biometricsSlice";
import { formatEther } from "ethers";
import ethService from "../services/EthereumService";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  ethereum: ethereumReducer,
  solana: solanaReducer,
  price: priceReduce,
  biometrics: biometricsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const webSocketMiddleware: Middleware =
  (store) =>
  (next) =>
  (action: PayloadAction<string> | PayloadAction<number>) => {
    next(action);
    if (action.type === "wallet/saveEthereumAddress") {
      const state = store.getState();
      const { ethereum, activeIndex } = state.ethereum;
      ethService.getWebSocketProvider().on("block", async () => {
        const balance = await ethService
          .getWebSocketProvider()
          .getBalance(ethereum.addresses[activeIndex]);
        store.dispatch({
          type: "wallet/updateEthereumBalance",
          payload: formatEther(balance),
        });
      });

      return () => ethService.getWebSocketProvider().removeAllListeners();
    }
  };

export const clearPersistedState = async () => {
  try {
    await persistor.purge();
  } catch (error) {
    console.error("Failed to purge persistor:", error);
  }
};

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .prepend(listenerMiddleware.middleware)
      .concat(webSocketMiddleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

```

priceSlice.ts
```ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchCryptoPrices } from "../utils/fetchCryptoPrices";
import { FETCH_PRICES_INTERVAL } from "../constants/price";
import { GeneralStatus } from "./types";

export const fetchPrices = createAsyncThunk(
  "price/fetchPrices",
  async (_, { getState }: any) => {
    const { lastUpdated } = getState().price;
    const currentTime = new Date().getTime();

    if (currentTime - lastUpdated < FETCH_PRICES_INTERVAL) {
      const data = JSON.parse(await AsyncStorage.getItem("prices"));
      return data;
    }

    const data = await fetchCryptoPrices();
    await AsyncStorage.setItem("prices", JSON.stringify(data));
    return data;
  }
);

export interface CryptoPrices {
  ethereum: {
    usd: number;
  };
  solana: {
    usd: number;
  };
}

export interface PriceState {
  data: CryptoPrices;
  lastUpdated: number;
  status: GeneralStatus;
}

const initialState = {
  data: {
    ethereum: {
      usd: 0,
    },
    solana: {
      usd: 0,
    },
  },
  lastUpdated: 0,
  status: GeneralStatus.Idle,
};

const priceSlice = createSlice({
  name: "prices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.data = action.payload;
        state.lastUpdated = new Date().getTime();
        state.status = GeneralStatus.Success;
      })
      .addCase(fetchPrices.pending, (state) => {
        state.status = GeneralStatus.Loading;
      })
      .addCase(fetchPrices.rejected, (state) => {
        state.status = GeneralStatus.Failed;
      });
  },
});

export default priceSlice.reducer;

```

solanaSlice.ts
```ts
import "react-native-get-random-values";
import "@ethersproject/shims";

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import solanaService from "../services/SolanaService";
import { truncateBalance } from "../utils/truncateBalance";
import {
  GeneralStatus,
  AddressState,
  Transaction,
  TransactionConfirmation,
  ConfirmationState,
  WalletState,
} from "./types";

const CONFIRMATION_TIMEOUT = 60000;
const initialState: WalletState = {
  activeIndex: 0,
  addresses: [
    {
      accountName: "",
      derivationPath: "",
      address: "",
      publicKey: "",
      balance: 0,
      failedNetworkRequest: false,
      status: GeneralStatus.Idle,
      transactionConfirmations: [],
      transactionMetadata: {
        paginationKey: undefined,
        transactions: [],
      },
    },
  ],
};

export interface FetchTransactionsArg {
  address: string;
  paginationKey?: string[] | string;
}

export const fetchSolanaTransactions = createAsyncThunk(
  "wallet/fetchSolanaTransactions",
  async (address: string, { rejectWithValue }): Promise<any> => {
    try {
      const transactions = await solanaService.getTransactionsByWallet(address);
      return transactions;
    } catch (error) {
      console.error("error", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSolanaTransactionsInterval = createAsyncThunk(
  "wallet/fetchSolanaTransactionsInterval",
  async (address: string, { rejectWithValue }): Promise<any> => {
    try {
      const transactions = await solanaService.getTransactionsByWallet(address);
      return transactions;
    } catch (error) {
      console.error("error", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSolanaBalance = createAsyncThunk(
  "wallet/fetchSolanaBalance",
  async (tokenAddress: string, { rejectWithValue }): Promise<any> => {
    try {
      const currentSolBalance = await solanaService.getBalance(tokenAddress);
      return currentSolBalance;
    } catch (error) {
      console.error("error", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSolanaBalanceInterval = createAsyncThunk(
  "wallet/fetchSolanaBalanceInterval",
  async (tokenAddress: string, { rejectWithValue }): Promise<any> => {
    try {
      const currentSolBalance = await solanaService.getBalance(tokenAddress);
      return currentSolBalance;
    } catch (error) {
      console.error("error", error);
      return rejectWithValue(error.message);
    }
  }
);

interface SolTransactionArgs {
  privateKey: Uint8Array;
  address: string;
  amount: string;
}

export const sendSolanaTransaction = createAsyncThunk(
  "solana/sendSolanaTransaction",
  async (
    { privateKey, address, amount }: SolTransactionArgs,
    { rejectWithValue }
  ) => {
    try {
      const response = await solanaService.sendTransaction(
        privateKey,
        address,
        parseFloat(amount)
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const confirmSolanaTransaction = createAsyncThunk(
  "wallet/confirmSolanaTransaction",
  async ({ txHash }: { txHash: string }, { rejectWithValue }) => {
    try {
      const confirmationPromise = solanaService.confirmTransaction(txHash);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("Transaction confirmation timed out")),
          CONFIRMATION_TIMEOUT
        )
      );

      const confirmation = await Promise.race([
        confirmationPromise,
        timeoutPromise,
      ]);
      return { txHash, confirmation };
    } catch (error) {
      return rejectWithValue({ txHash, error: error.message });
    }
  }
);

export const solanaSlice = createSlice({
  name: "solana",
  initialState,
  reducers: {
    saveSolanaAddresses: (state, action: PayloadAction<AddressState[]>) => {
      state.addresses = [...action.payload];
      state.activeIndex = 0;
    },
    depositSolana: (state, action: PayloadAction<number>) => {
      state.addresses[state.activeIndex].balance += action.payload;
    },
    withdrawSolana: (state, action: PayloadAction<number>) => {
      if (state.addresses[state.activeIndex].balance >= action.payload) {
        state.addresses[state.activeIndex].balance -= action.payload;
      } else {
        console.warn("Not enough Solana balance");
      }
    },
    addSolanaTransaction: (state, action: PayloadAction<Transaction>) => {
      state.addresses[state.activeIndex].transactionMetadata.transactions.push(
        action.payload
      );
    },
    updateSolanaBalance: (state, action: PayloadAction<number>) => {
      state.addresses[state.activeIndex].balance = action.payload;
    },
    updateSolanaAddresses: (state, action: PayloadAction<AddressState>) => {
      state.addresses.push(action.payload);
    },
    // TODO: Refactor. This is an tech debt from redux refactor
    updateSolanaAccountName: (
      state,
      action: PayloadAction<{
        accountName: string;
        solAddress: string;
      }>
    ) => {
      const solAddressIndex = state.addresses.findIndex(
        (item) => item.address === action.payload.solAddress
      );
      if (solAddressIndex !== -1) {
        state.addresses[solAddressIndex].accountName =
          action.payload.accountName;
      }
    },
    // TODO: Refactor. This is an tech debt from redux refactor
    setActiveSolanaAccount: (state, action: PayloadAction<number>) => {
      state.activeIndex = action.payload;
    },
    resetSolanaState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSolanaBalance.pending, (state) => {
        state.addresses[state.activeIndex].status = GeneralStatus.Loading;
      })
      .addCase(fetchSolanaBalance.fulfilled, (state, action) => {
        state.addresses[state.activeIndex].balance = parseFloat(
          truncateBalance(action.payload)
        );
        state.addresses[state.activeIndex].status = GeneralStatus.Idle;
      })
      .addCase(fetchSolanaBalance.rejected, (state, action) => {
        state.addresses[state.activeIndex].status = GeneralStatus.Failed;
        console.error("Failed to fetch balance:", action.payload);
      })
      .addCase(fetchSolanaBalanceInterval.fulfilled, (state, action) => {
        state.addresses[state.activeIndex].balance = parseFloat(
          truncateBalance(action.payload)
        );
        state.addresses[state.activeIndex].status = GeneralStatus.Idle;
      })
      .addCase(fetchSolanaBalanceInterval.rejected, (state, action) => {
        state.addresses[state.activeIndex].status = GeneralStatus.Failed;
        console.error("Failed to fetch balance:", action.payload);
      })
      .addCase(fetchSolanaTransactions.pending, (state) => {
        state.addresses[state.activeIndex].status = GeneralStatus.Loading;
      })
      .addCase(fetchSolanaTransactions.fulfilled, (state, action) => {
        if (action.payload) {
          state.addresses[state.activeIndex].failedNetworkRequest = false;
          state.addresses[state.activeIndex].transactionMetadata.transactions =
            action.payload;
        } else {
          state.addresses[state.activeIndex].failedNetworkRequest = true;
        }
        state.addresses[state.activeIndex].status = GeneralStatus.Idle;
      })
      .addCase(fetchSolanaTransactions.rejected, (state, action) => {
        state.addresses[state.activeIndex].status = GeneralStatus.Failed;
        console.error("Failed to fetch transactions:", action.payload);
      })
      .addCase(fetchSolanaTransactionsInterval.fulfilled, (state, action) => {
        if (action.payload) {
          state.addresses[state.activeIndex].failedNetworkRequest = false;
          state.addresses[state.activeIndex].transactionMetadata.transactions =
            action.payload;
        } else {
          state.addresses[state.activeIndex].failedNetworkRequest = true;
        }
        state.addresses[state.activeIndex].status = GeneralStatus.Idle;
      })
      .addCase(fetchSolanaTransactionsInterval.rejected, (state, action) => {
        state.addresses[state.activeIndex].status = GeneralStatus.Failed;
        console.error("Failed to fetch transactions:", action.payload);
      })
      .addCase(confirmSolanaTransaction.pending, (state, action) => {
        const { txHash } = action.meta.arg;
        const newConfirmation: TransactionConfirmation = {
          txHash,
          status: ConfirmationState.Pending,
        };
        state.addresses[state.activeIndex].transactionConfirmations.push(
          newConfirmation
        );
      })
      .addCase(confirmSolanaTransaction.fulfilled, (state, action) => {
        const { txHash, confirmation } = action.payload;
        const index = state.addresses[
          state.activeIndex
        ].transactionConfirmations.findIndex((tx) => tx.txHash === txHash);
        if (index !== -1) {
          state.addresses[state.activeIndex].transactionConfirmations[
            index
          ].status = confirmation
            ? ConfirmationState.Confirmed
            : ConfirmationState.Failed;
        }
      })
      .addCase(confirmSolanaTransaction.rejected, (state, action) => {
        const { txHash, error } = action.payload as any;
        const index = state.addresses[
          state.activeIndex
        ].transactionConfirmations.findIndex((tx: any) => tx.txHash === txHash);
        if (index !== -1) {
          state.addresses[state.activeIndex].transactionConfirmations[
            index
          ].status = ConfirmationState.Failed;
          state.addresses[state.activeIndex].transactionConfirmations[
            index
          ].error = error;
        }
      })
      .addCase(sendSolanaTransaction.pending, (state) => {
        state.addresses[state.activeIndex].status = GeneralStatus.Loading;
      })
      .addCase(sendSolanaTransaction.fulfilled, (state, action) => {
        state.addresses[state.activeIndex].status = GeneralStatus.Idle;

        state.addresses[state.activeIndex].transactionConfirmations.push({
          txHash: action.payload,
          status: ConfirmationState.Pending,
        });
      })
      .addCase(sendSolanaTransaction.rejected, (state, action) => {
        state.addresses[state.activeIndex].status = GeneralStatus.Failed;
        console.error("Failed to send Solana transaction:", action.payload);
      });
  },
});

export const {
  depositSolana,
  withdrawSolana,
  addSolanaTransaction,
  updateSolanaBalance,
  saveSolanaAddresses,
  resetSolanaState,
  setActiveSolanaAccount,
  updateSolanaAddresses,
  updateSolanaAccountName,
} = solanaSlice.actions;

export default solanaSlice.reducer;

```

types.ts
```ts
import { Chains } from "../types";

export enum GeneralStatus {
  Idle = "idle",
  Loading = "loading",
  Failed = "failed",
  Success = "success",
}

export enum ConfirmationState {
  Pending = "pending",
  Confirmed = "confirmed",
  Failed = "failed",
}

export interface AddressState {
  accountName: string;
  derivationPath: string;
  address: string;
  publicKey: string;
  balance: number;
  transactionMetadata?: TransactionMetadata;
  failedNetworkRequest: boolean;
  status: GeneralStatus;
  transactionConfirmations: TransactionConfirmation[];
}

export interface TransactionMetadata {
  paginationKey: undefined | string | string[];
  transactions: Transaction[];
}

export interface Transaction {
  uniqueId: string;
  from: string;
  to: string;
  hash: string;
  value: number;
  blockTime: number;
  asset: string;
  direction: string;
}

export interface FetchTransactionsArg {
  address: string;
  paginationKey?: string[] | string;
}

export interface TransactionConfirmation {
  txHash: string;
  status: ConfirmationState;
  error?: string;
}

export interface WalletState {
  activeIndex: number | null;
  addresses: AddressState[];
}

```


segue services

services/EthereumService.ts
```ts
import "react-native-get-random-values";
import "@ethersproject/shims";

import {
  Wallet,
  isAddress,
  JsonRpcProvider,
  WebSocketProvider,
  formatEther,
  parseEther,
  HDNodeWallet,
  Mnemonic,
  AddressLike,
} from "ethers";
import { validateMnemonic } from "bip39";
import { Alchemy, Network } from "alchemy-sdk";
import uuid from "react-native-uuid";
import { truncateBalance } from "../utils/truncateBalance";

interface ExtendedHDNodeWallet extends HDNodeWallet {
  derivationPath: string;
}

interface SendTransactionResponse {
  gasEstimate: string;
  totalCost: string;
  totalCostMinusGas: string;
  gasFee: bigint;
}

interface AssetTransferParams {
  fromBlock: string;
  excludeZeroValue: boolean;
  withMetadata: boolean;
  maxCount?: number;
  toAddress?: string;
  fromAddress?: string;
  pageKey?: string;
  category: string[];
}

class EthereumService {
  private provider: JsonRpcProvider;
  private webSocketProvider: WebSocketProvider;
  private alchemy: Alchemy;

  constructor(
    private apiKey: string,
    private ethUrl: string,
    private socketUrl: string,
    private environment: string
  ) {
    const network =
      environment === "production" ? Network.ETH_MAINNET : Network.ETH_SEPOLIA;
    this.provider = new JsonRpcProvider(ethUrl + apiKey);
    this.webSocketProvider = new WebSocketProvider(socketUrl + apiKey);
    this.alchemy = new Alchemy({
      apiKey: apiKey,
      network: network,
    });
  }

  async createWallet(): Promise<HDNodeWallet> {
    return new Promise((resolve, reject) => {
      try {
        const wallet = HDNodeWallet.createRandom();
        resolve(wallet);
      } catch (error) {
        reject(new Error("Failed to create wallet: " + error.message));
      }
    });
  }

  async restoreWalletFromPhrase(mnemonicPhrase: string): Promise<HDNodeWallet> {
    if (!mnemonicPhrase) {
      throw new Error("Mnemonic phrase cannot be empty.");
    }

    if (!validateMnemonic(mnemonicPhrase)) {
      throw new Error("Invalid mnemonic phrase ");
    }

    try {
      const ethWallet = HDNodeWallet.fromPhrase(mnemonicPhrase);
      return ethWallet;
    } catch (error) {
      throw new Error(
        "Failed to restore wallet from mnemonic: " + (error as Error).message
      );
    }
  }

  async derivePrivateKeysFromPhrase(
    mnemonicPhrase: string,
    derivationPath: string
  ) {
    if (!mnemonicPhrase) {
      throw new Error("Empty mnemonic phrase ");
    }

    if (!validateMnemonic(mnemonicPhrase)) {
      throw new Error("Invalid mnemonic phrase ");
    }

    const mnemonic = Mnemonic.fromPhrase(mnemonicPhrase);
    try {
      const ethWallet = HDNodeWallet.fromMnemonic(mnemonic, derivationPath);
      return ethWallet.privateKey;
    } catch (error) {
      throw new Error(
        "Failed to derive wallet from mnemonic: " + (error as Error).message
      );
    }
  }

  async createWalletByIndex(
    phrase: string,
    index: number = 0
    // TODO: Fix extending type
  ): Promise<any> {
    try {
      const mnemonic = Mnemonic.fromPhrase(phrase);
      const path = `m/44'/60'/0'/0/${index}`;
      const wallet = HDNodeWallet.fromMnemonic(mnemonic, path);
      return {
        ...wallet,
        derivationPath: path,
      };
    } catch (error) {
      throw new Error(
        "failed to create Ethereum wallet by index: " + (error as Error).message
      );
    }
  }

  async sendTransaction(
    toAddress: AddressLike,
    privateKey: string,
    value: string
  ): Promise<any> {
    const signer = new Wallet(privateKey, this.provider);
    const transaction = {
      to: toAddress,
      value: parseEther(value),
    };
    try {
      const response = await signer.sendTransaction(transaction);
      return response;
    } catch (error) {
      console.error("Failed to send transaction:", error);
      throw new Error("Failed to send transaction. Please try again later.");
    }
  }

  async calculateGasAndAmounts(
    toAddress: string,
    amount: string
  ): Promise<SendTransactionResponse> {
    const amountInWei = parseEther(amount.toString());
    const transaction = {
      to: toAddress,
      value: amountInWei,
    };
    try {
      // Estimate gas
      const gasEstimate = await this.provider.estimateGas(transaction);
      const gasFee = (await this.provider.getFeeData()).maxFeePerGas;
      const gasPrice = BigInt(gasEstimate) * BigInt(gasFee);

      // Calculate total cost
      const totalCost = amountInWei + gasPrice;
      const totalCostMinusGas = amountInWei - gasPrice;

      return {
        gasEstimate: formatEther(gasPrice),
        totalCost: formatEther(totalCost),
        totalCostMinusGas: formatEther(totalCostMinusGas),
        gasFee,
      };
    } catch (error) {
      console.error("Failed to calculate gas:", error);
      throw new Error("Unable to calculate gas. Please try again later.");
    }
  }

  async fetchTransactions(address: string, pageKeys?: string[]): Promise<any> {
    const paramsBuilder = (): AssetTransferParams => ({
      fromBlock: "0x0",
      excludeZeroValue: true,
      withMetadata: true,
      category: [
        "internal",
        "external",
        "erc20",
        "erc721",
        "erc1155",
        "specialnft",
      ],
    });

    const sentParams = paramsBuilder();
    const receivedParams = paramsBuilder();

    if (pageKeys && pageKeys.length === 2) {
      sentParams.pageKey = pageKeys[0];
      receivedParams.pageKey = pageKeys[1];
    }

    sentParams.fromAddress = address;
    receivedParams.toAddress = address;

    const sentTransfers = await this.alchemy.core.getAssetTransfers(
      // @ts-ignore
      sentParams
    );
    const receivedTransfers = await this.alchemy.core.getAssetTransfers(
      // @ts-ignore
      receivedParams
    );

    const transformTransfers = (txs: any, direction: any) =>
      txs.map((tx: any) => ({
        ...tx,
        uniqueId: uuid.v4(),
        value: parseFloat(truncateBalance(tx.value)),
        blockTime: new Date(tx.metadata.blockTimestamp).getTime() / 1000,
        direction,
      }));

    const allTransfers = [
      ...transformTransfers(sentTransfers.transfers, "sent"),
      ...transformTransfers(receivedTransfers.transfers, "received"),
    ].sort((a, b) => b.blockTime - a.blockTime);

    return {
      transferHistory: allTransfers,
      paginationKey: [sentTransfers.pageKey, receivedTransfers.pageKey],
    };
  }

  validateAddress(address: string): boolean {
    return isAddress(address);
  }

  async findNextUnusedWalletIndex(phrase: string, index: number = 0) {
    if (!phrase) {
      throw new Error("Empty mnemonic phrase ");
    }

    if (!validateMnemonic(phrase)) {
      throw new Error("Invalid mnemonic phrase ");
    }

    let currentIndex = index;
    const mnemonic = Mnemonic.fromPhrase(phrase);

    while (true) {
      const path = `m/44'/60'/0'/0/${currentIndex}`;
      const wallet = HDNodeWallet.fromMnemonic(mnemonic, path);

      const transactions = await this.fetchTransactions(wallet.address);
      if (transactions.transferHistory.length === 0) {
        break;
      }
      currentIndex += 1;
    }

    return currentIndex > 0 ? currentIndex + 1 : 0;
  }

  async importAllActiveAddresses(mnemonicPhrase: string, index?: number) {
    if (index) {
      const usedAddresses = await this.collectedUsedAddresses(
        mnemonicPhrase,
        index
      );
      return usedAddresses;
    } else {
      const unusedAddressIndex = await this.findNextUnusedWalletIndex(
        mnemonicPhrase
      );
      const usedAddresses = await this.collectedUsedAddresses(
        mnemonicPhrase,
        unusedAddressIndex
      );
      return usedAddresses;
    }
  }

  async collectedUsedAddresses(phrase: string, unusedIndex: number) {
    const startingIndex = unusedIndex > 0 ? unusedIndex - 1 : unusedIndex;
    const mnemonic = Mnemonic.fromPhrase(phrase);
    const addressesUsed = [];

    for (let i = 0; i <= startingIndex; i++) {
      const path = `m/44'/60'/0'/0/${i}`;
      const wallet = HDNodeWallet.fromMnemonic(mnemonic, path);
      const walletWithDetails = {
        ...wallet,
        derivationPath: path,
      };
      addressesUsed.push(walletWithDetails);
    }

    return addressesUsed;
  }

  async getBalance(address: AddressLike): Promise<bigint> {
    try {
      return this.provider.getBalance(address);
    } catch (err) {
      console.error("Error fetching balance:", err);
    }
  }

  async confirmTransaction(txHash: string): Promise<boolean> {
    try {
      const receipt = await this.provider.waitForTransaction(txHash);
      return receipt.status === 1;
    } catch (error) {
      console.error("Error confirming Ethereum transaction:", error);
      return false;
    }
  }

  getWebSocketProvider() {
    return this.webSocketProvider;
  }

  getProvider() {
    return this.provider;
  }
}

const ethService = new EthereumService(
  process.env.EXPO_PUBLIC_ALCHEMY_ETH_KEY,
  process.env.EXPO_PUBLIC_ALCHEMY_ETH_URL,
  process.env.EXPO_PUBLIC_ALCHEMY_SOCKET_URL,
  process.env.EXPO_PUBLIC_ENVIRONMENT
);

export default ethService;

```

services/SolanaService.ts
```ts
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  Keypair,
  TransactionConfirmationStrategy,
} from "@solana/web3.js";
import uuid from "react-native-uuid";
import { validateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { TransactionObject } from "../types";

class SolanaService {
  private connection: Connection;
  constructor(private rpcUrl: string) {
    this.connection = new Connection(rpcUrl, "confirmed");
  }

  restoreWalletFromPhrase(mnemonicPhrase: string): Promise<Keypair> {
    return new Promise((resolve, reject) => {
      try {
        const seed = mnemonicToSeedSync(mnemonicPhrase, "");
        const path = `m/44'/501'/0'/0'`;
        const keypair = Keypair.fromSeed(
          derivePath(path, seed.toString("hex")).key
        );

        resolve(keypair);
      } catch (error) {
        reject(new Error("Failed to import solana wallet: " + error.message));
      }
    });
  }

  async createWalletByIndex(phrase: string, index: number = 0) {
    try {
      const seed = mnemonicToSeedSync(phrase, "");
      const path = `m/44'/501'/${index}'/0'`;
      const keypair = Keypair.fromSeed(
        derivePath(path, seed.toString("hex")).key
      );

      return {
        publicKey: keypair.publicKey.toBase58(),
        address: keypair.publicKey.toBase58(),
        derivationPath: path,
      };
    } catch (error) {
      throw new Error(
        "failed to create Solana wallet by index: " + (error as Error).message
      );
    }
  }

  async getBalance(publicKeyString: string) {
    try {
      const publicKey = new PublicKey(publicKeyString);
      const balance = await this.connection.getBalance(publicKey);
      const solBalance = balance / 1e9;
      return solBalance;
    } catch (error) {
      console.error("Error fetching Solana balance:", error);
      throw error;
    }
  }

  async #fetchTransactionsSequentially(signatures: any[]) {
    const transactions = [];

    for (const signature of signatures) {
      try {
        const transaction = await this.connection.getParsedTransaction(
          signature.signature
        );
        transactions.push(transaction);
      } catch (error) {
        if (error.message.includes("429")) {
          await new Promise((resolve) => setTimeout(resolve, 250));
        } else {
          console.error("Failed to fetch transaction:", error);
        }
      }
    }

    return transactions;
  }

  #extractTransactionDetails(
    transactionObject: TransactionObject,
    addressOfInterest: string
  ) {
    const transferInstruction =
      transactionObject.transaction.message.instructions.find(
        (instruction) =>
          instruction.parsed && instruction.parsed.type === "transfer"
      );

    if (!transferInstruction) {
      return;
    }

    const info = transferInstruction.parsed.info;
    let direction = "other";
    if (info.source === addressOfInterest) {
      direction = "sent";
    } else if (info.destination === addressOfInterest) {
      direction = "received";
    }

    const hash = transactionObject.transaction.message.recentBlockhash;
    const uniqueId = uuid.v4();
    const from = info.source;
    const to = info.destination;
    const amountSentLamports = info.lamports;
    const value = amountSentLamports / 1000000000;
    const blockTime = transactionObject.blockTime;

    return {
      uniqueId,
      from,
      to,
      hash,
      value,
      direction,
      blockTime,
      asset: "SOL",
    };
  }

  async getTransactionsByWallet(
    walletAddress: string,
    beforeSignature?: string,
    limit: number = 50
  ) {
    const publicKey = new PublicKey(walletAddress);
    let signatures: any;

    try {
      signatures = await this.connection.getSignaturesForAddress(publicKey, {
        before: beforeSignature,
        limit,
      });
    } catch (err) {
      console.error("Error fetching signatures:", err);
    }

    if (signatures) {
      try {
        const rawTransactions = await this.#fetchTransactionsSequentially(
          signatures
        );

        const transactions = rawTransactions
          .map((tx: any) => this.#extractTransactionDetails(tx, walletAddress))
          .sort((a, b) => b.blockTime - a.blockTime);
        return transactions;
      } catch (error) {
        console.error("Failed to process transactions:", error);
        return [];
      }
    }
  }

  async validateAddress(addr: string) {
    let publicKey: PublicKey;
    try {
      publicKey = new PublicKey(addr);
      return await PublicKey.isOnCurve(publicKey.toBytes());
    } catch (err) {
      return false;
    }
  }

  async calculateTransactionFee(from: string, to: string, amount: number) {
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(from),
          toPubkey: new PublicKey(to),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );
      let recentBlockhash = (
        await this.connection.getLatestBlockhash("finalized")
      ).blockhash;
      transaction.recentBlockhash = recentBlockhash;
      transaction.feePayer = new PublicKey(from);

      const response = await this.connection.getFeeForMessage(
        transaction.compileMessage(),
        "confirmed"
      );
      return response.value;
    } catch (err) {
      console.error("Error fetching Solana transaction fee:", err);
      throw err;
    }
  }

  async sendTransaction(secretKey: Uint8Array, to: string, amount: number) {
    try {
      const keyPair = Keypair.fromSecretKey(secretKey);
      const balance = await this.connection.getBalance(
        new PublicKey(keyPair.publicKey)
      );

      if (balance < amount * LAMPORTS_PER_SOL) {
        throw new Error("Insufficient funds for the transaction");
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(keyPair.publicKey.toString()),
          toPubkey: new PublicKey(to),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );
      let recentBlockhash = (
        await this.connection.getLatestBlockhash("finalized")
      ).blockhash;
      transaction.recentBlockhash = recentBlockhash;
      transaction.feePayer = new PublicKey(keyPair.publicKey.toString());

      const signature = await sendAndConfirmTransaction(
        this.connection,
        transaction,
        [keyPair]
      );
      return signature;
    } catch (err) {
      console.error("Error sending Solana transaction:", err);
      throw err;
    }
  }

  async derivePrivateKeysFromPhrase(mnemonicPhrase: string, path: string) {
    if (!mnemonicPhrase) {
      throw new Error("Empty mnemonic phrase ");
    }
    if (!validateMnemonic(mnemonicPhrase)) {
      throw new Error("Invalid mnemonic phrase ");
    }

    try {
      const seed = mnemonicToSeedSync(mnemonicPhrase, "");
      const keypair = Keypair.fromSeed(
        derivePath(path, seed.toString("hex")).key
      );

      return keypair.secretKey;
    } catch (error) {
      throw new Error(
        "Failed to derive wallet from mnemonic: " + (error as Error).message
      );
    }
  }

  async findNextUnusedWalletIndex(
    mnemonicPhrase: string,
    indexOffset: number = 0
  ) {
    if (!mnemonicPhrase) {
      throw new Error("Empty mnemonic phrase ");
    }

    if (!validateMnemonic(mnemonicPhrase)) {
      throw new Error("Invalid mnemonic phrase ");
    }

    const seed = mnemonicToSeedSync(mnemonicPhrase, "");
    let currentIndex = indexOffset;
    while (true) {
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const keypair = Keypair.fromSeed(
        derivePath(path, seed.toString("hex")).key
      );
      const publicKey = keypair.publicKey;
      const signatures = await this.connection.getSignaturesForAddress(
        publicKey,
        {
          limit: 1,
        }
      );

      if (signatures.length === 0) {
        break;
      }
      currentIndex += 1;
    }

    return currentIndex > 0 ? currentIndex + 1 : 0;
  }

  async collectedUsedAddresses(mnemonicPhrase: string, unusedIndex: number) {
    const startingIndex = unusedIndex > 0 ? unusedIndex - 1 : unusedIndex;
    const seed = mnemonicToSeedSync(mnemonicPhrase, "");
    const keyPairsUsed = [];

    for (let i = 0; i <= startingIndex; i++) {
      const path = `m/44'/501'/${i}'/0'`;
      const keypair = Keypair.fromSeed(
        derivePath(path, seed.toString("hex")).key
      );
      const normalizedKeyPair = {
        publicKey: keypair.publicKey.toBase58(),
      };
      const keypairWithDetails = {
        ...normalizedKeyPair,
        derivationPath: path,
      };
      keyPairsUsed.push(keypairWithDetails);
    }

    return keyPairsUsed;
  }

  async importAllActiveAddresses(mnemonicPhrase: string, offsetIndex?: number) {
    if (offsetIndex) {
      const usedAddresses = await this.collectedUsedAddresses(
        mnemonicPhrase,
        offsetIndex
      );
      return usedAddresses;
    } else {
      const unusedAddressIndex = await this.findNextUnusedWalletIndex(
        mnemonicPhrase
      );
      const usedAddresses = await this.collectedUsedAddresses(
        mnemonicPhrase,
        unusedAddressIndex
      );
      return usedAddresses;
    }
  }

  async confirmTransaction(signature: string): Promise<boolean> {
    try {
      const latestBlockhash = await this.connection.getLatestBlockhash();

      const strategy: TransactionConfirmationStrategy = {
        signature: signature,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      };

      const result = await this.connection.confirmTransaction(strategy);
      return result.value.err === null;
    } catch (error) {
      console.error("Error confirming Solana transaction:", error);
      return false;
    }
  }
}

const { EXPO_PUBLIC_ALCHEMY_SOL_URL, EXPO_PUBLIC_ALCHEMY_SOL_API_KEY } =
  process.env;
const customRpcUrl =
  EXPO_PUBLIC_ALCHEMY_SOL_URL + EXPO_PUBLIC_ALCHEMY_SOL_API_KEY;

const solanaService = new SolanaService(customRpcUrl);
export default solanaService;

```


hooks/redux.ts
```ts
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { GeneralStatus } from "../store/types";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useLoadingState = () => {
  const activeEthIndex = useSelector(
    (state: RootState) => state.ethereum.activeIndex
  );
  const activeSolIndex = useSelector(
    (state: RootState) => state.solana.activeIndex
  );

  const ethLoading = useSelector(
    (state: RootState) =>
      state.ethereum.addresses[activeEthIndex].status === GeneralStatus.Loading
  );
  const solLoading = useSelector(
    (state: RootState) =>
      state.solana.addresses[activeSolIndex].status === GeneralStatus.Loading
  );

  return ethLoading || solLoading;
};

```

hooks/useStorageState.ts
```ts
import { useState, useEffect, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import {
  generateKeyAndEncryptData,
  decryptDataWithKey,
  EncryptedData,
} from "../utils/cryptoUtils";

export async function removePhrase(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync("phrase");
  } catch (error) {
    console.error("Failed to remove the phrase securely.", error);
  }
}

export async function savePhrase(phrase: string): Promise<void> {
  try {
    const encryptedData = await generateKeyAndEncryptData(phrase);
    await SecureStore.setItemAsync("phrase", JSON.stringify(encryptedData));
    await SecureStore.setItemAsync("phraseKey", encryptedData.key);
  } catch (error) {
    console.error("Failed to save the phrase securely.", error);
    throw error;
  }
}

export async function getPhrase(): Promise<string | null> {
  try {
    const encryptedDataString = await SecureStore.getItemAsync("phrase");
    const key = await SecureStore.getItemAsync("phraseKey");

    if (encryptedDataString && key) {
      const encryptedData: EncryptedData = JSON.parse(encryptedDataString);
      const phrase = await decryptDataWithKey(encryptedData, key);
      return JSON.parse(phrase);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to retrieve the phrase.", error);
    return null;
  }
}

export async function clearStorage(): Promise<void> {
  if (Platform.OS === "web") {
    try {
      localStorage.clear();
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    await SecureStore.deleteItemAsync("address");
    await SecureStore.deleteItemAsync("phrase");
    await SecureStore.deleteItemAsync("publicKey");
    await SecureStore.deleteItemAsync("privateKey");
    await SecureStore.deleteItemAsync("phraseKey");
  }
}

export async function phraseExists(): Promise<boolean> {
  const phrase = await SecureStore.getItemAsync("phrase");
  return phrase !== null;
}

type StorageValue = string | null;

export function useStorage(
  key: string
): [StorageValue, (value: string | null) => Promise<void>, boolean] {
  const [storageValue, setStorageValue] = useState<StorageValue>(null);
  const [loading, setLoading] = useState(true);

  const getStorageValue = useCallback(async () => {
    try {
      const value = await SecureStore.getItemAsync(key);
      setStorageValue(value ? JSON.parse(value) : null);
    } catch (error) {
      console.error(`Failed to get storage value for key "${key}":`, error);
      setStorageValue(null);
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => {
    getStorageValue();
  }, [getStorageValue]);

  const setStorageItem = useCallback(
    async (value: string | null) => {
      try {
        if (value === null) {
          await SecureStore.deleteItemAsync(key);
        } else {
          await SecureStore.setItemAsync(key, JSON.stringify(value));
        }
        setStorageValue(value);
      } catch (error) {
        console.error(`Failed to set storage value for key "${key}":`, error);
      }
    },
    [key]
  );

  return [storageValue, setStorageItem, loading];
}

```

constants/routes.ts
```ts
export interface Routes {
  home: string;
  walletSetup: string;
  walletCreatedSuccessfully: string;
  walletImportOptions: string;
  seedPhrase: string;
  confirmSeedPhrase: string;
  restoreSeedPhrase: string;
  walletImportSeedPhrase: string;
  biometrics: string;
  sendOptions: string;
  send: string;
  receiveOptions: string;
  ethDetails: string;
  solDetails: string;
  sendEth: string;
  sendSol: string;
  sendConfirmation: string;
  settings: string;
  camera: string;
  accounts: string;
  accountModal: string;
  accountNameModal: string;
  confirmation: string;
}

export const ROUTES: Routes = {
  home: "/",
  walletSetup: "(wallet)/setup/wallet-setup",
  walletCreatedSuccessfully: "(wallet)/setup/wallet-created-successfully",
  walletImportOptions: "(wallet)/setup/wallet-import-options",
  seedPhrase: "(wallet)/seed/seed-phrase",
  confirmSeedPhrase: "(wallet)/seed/confirm-seed-phrase",
  restoreSeedPhrase: "(wallet)/seed/restore-seed-phrase",
  walletImportSeedPhrase: "(wallet)/seed/wallet-import-seed-phrase",
  biometrics: "(wallet)/biometrics",
  sendOptions: "/token/send/send-options",
  send: "/token/send",
  receiveOptions: "/token/receive/receive-options",
  ethDetails: "/token/ethereum",
  solDetails: "/token/solana",
  sendEth: "/token/send/ethereum",
  sendSol: "/token/send/solana",
  sendConfirmation: "/token/send/send-confirmation",
  settings: "/(app)/settings/settings-modal",
  camera: "/(app)/camera",
  accounts: "/(app)/accounts/accounts",
  accountModal: "/(app)/accounts/account-modal",
  accountNameModal: "/(app)/accounts/account-name-modal",
  confirmation: "/(app)/token/confirmation",
};

```

app/_layout.tsx
```tsx
// Inject node globals into React Native global scope.
global.Buffer = require("buffer").Buffer;

// @ts-ignore
global.location = {
  protocol: "file:",
};

import "react-native-reanimated";
import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { Stack, router, useNavigation } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import styled, { ThemeProvider } from "styled-components/native";
import * as SplashScreen from "expo-splash-screen";
import { clearStorage } from "../hooks/useStorageState";
import Theme from "../styles/theme";
import { store, persistor, clearPersistedState } from "../store";
import { resetSolanaState } from "../store/solanaSlice";
import { resetEthereumState } from "../store/ethereumSlice";
import { ROUTES } from "../constants/routes";
import LeftIcon from "../assets/svg/left-arrow.svg";

SplashScreen.preventAutoHideAsync();

const IconTouchContainer = styled.TouchableOpacity`
  padding: 10px;
`;

export default function RootLayout() {
  const navigation = useNavigation();

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      resetSolanaState();
      resetEthereumState();
      clearStorage();
      clearPersistedState();
      router.replace(ROUTES.walletSetup);
    }
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={Theme}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="light" />
            <Stack
              screenOptions={{
                headerShown: false,
                headerTransparent: true,
                gestureEnabled: true,
                headerLeft: () => (
                  <IconTouchContainer onPress={goBack}>
                    <LeftIcon width={35} height={35} fill="#FFF" />
                  </IconTouchContainer>
                ),
              }}
            >
              <Stack.Screen
                name={ROUTES.walletSetup}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="(wallet)/seed/seed-phrase"
                options={{
                  title: "Seed Phrase",
                  headerShown: true,
                  headerTransparent: true,
                  headerTitleStyle: {
                    color: "transparent",
                  },
                }}
              />
              <Stack.Screen
                name="(wallet)/seed/confirm-seed-phrase"
                options={{
                  title: "Confirm Seed Phrase",
                  headerShown: true,
                  headerTransparent: true,
                  headerTitleStyle: {
                    color: "transparent",
                  },
                  headerLeft: () => (
                    <IconTouchContainer onPress={() => router.back()}>
                      <LeftIcon width={35} height={35} fill="#FFF" />
                    </IconTouchContainer>
                  ),
                }}
              />
              <Stack.Screen
                name="(wallet)/setup/wallet-created-successfully"
                options={{
                  title: "Confirm Seed Phrase",
                  headerShown: false,
                  headerTransparent: true,
                  headerTitleStyle: {
                    color: "transparent",
                  },
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="(wallet)/setup/wallet-import-options"
                options={{
                  title: "Confirm Seed Phrase",
                  headerShown: true,
                  headerTransparent: true,
                  headerTitleStyle: {
                    color: "transparent",
                  },
                  headerLeft: () => (
                    <IconTouchContainer onPress={() => router.back()}>
                      <LeftIcon width={35} height={35} fill="#FFF" />
                    </IconTouchContainer>
                  ),
                }}
              />
              <Stack.Screen
                name="(wallet)/seed/wallet-import-seed-phrase"
                options={{
                  title: "Confirm Seed Phrase",
                  headerShown: true,
                  headerTransparent: true,
                  headerTitleStyle: {
                    color: "transparent",
                  },
                  headerLeft: () => (
                    <IconTouchContainer onPress={() => router.back()}>
                      <LeftIcon width={35} height={35} fill="#FFF" />
                    </IconTouchContainer>
                  ),
                }}
              />
            </Stack>
          </GestureHandlerRootView>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

```

app/(wallet)/seed/wallet-import-seed-phrase.tsx
```tsx
import React, { useState } from "react";
import { Dimensions, Keyboard, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { useTheme } from "styled-components";
import ethService from "../../../services/EthereumService";
import solanaService from "../../../services/SolanaService";
import { ThemeType } from "../../../styles/theme";
import {
  saveSolanaAddresses,
  fetchSolanaBalance,
  fetchSolanaTransactions,
} from "../../../store/solanaSlice";
import {
  saveEthereumAddresses,
  fetchEthereumBalance,
  fetchEthereumTransactions,
} from "../../../store/ethereumSlice";
import { GeneralStatus } from "../../../store/types";
import type { AddressState } from "../../../store/types";
import type { AppDispatch } from "../../../store";
import Button from "../../../components/Button/Button";
import { ROUTES } from "../../../constants/routes";
import { savePhrase } from "../../../hooks/useStorageState";
import { Title, Subtitle } from "../../../components/Styles/Text.styles";
import {
  ErrorTextCenter,
  ErrorTextContainer,
} from "../../../components/Styles/Errors.styles";

interface SeedTextInputProps {
  theme: ThemeType;
  isInputFocused: boolean;
}

const isAndroid = Platform.OS === "android";

const SafeAreaContainer = styled(SafeAreaView)<{ theme: ThemeType }>`
  flex: 1;
  background-color: ${(props) => props.theme.colors.lightDark};
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.View<{ theme: ThemeType }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing.medium};
  margin-top: ${(props) => isAndroid && props.theme.spacing.huge};
`;

const TextContainer = styled.View<{ theme: ThemeType }>`
  margin-bottom: ${(props) => props.theme.spacing.huge};
`;

const ButtonContainer = styled.View<{ theme: ThemeType }>`
  padding-left: ${(props) => props.theme.spacing.large};
  padding-right: ${(props) => props.theme.spacing.large};
  padding-bottom: ${(props) => props.theme.spacing.large};
  padding-top: ${(props) => props.theme.spacing.small};
  width: 100%;
`;

const SeedTextInput = styled.TextInput<SeedTextInputProps>`
  justify-content: flex-start;
  padding: ${(props) => props.theme.spacing.large};
  margin: ${(props) => props.theme.spacing.large};
  background-color: ${(props) => props.theme.colors.dark};
  border-radius: ${(props) => props.theme.borderRadius.extraLarge};
  width: ${(Dimensions.get("window").width - 80).toFixed(0)}px;
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fonts.sizes.large};\
  font-family: ${(props) => props.theme.fonts.families.openRegular};
  border: 1px solid
    ${({ theme, isInputFocused }) =>
      isInputFocused ? theme.colors.primary : theme.colors.grey};
`;

const InfoContainer = styled.View<{ theme: ThemeType }>`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: rgba(136, 120, 244, 0.3);
  border: 2px solid rgba(136, 120, 244, 0.6);
  border-radius: ${(props) => props.theme.borderRadius.large};
  padding: ${(props) => props.theme.spacing.large};
  margin-bottom: ${(props) => props.theme.spacing.large};
`;

const InfoTitle = styled.Text<{ theme: ThemeType }>`
  font-family: ${(props) => props.theme.fonts.families.openBold};
  font-size: ${(props) => props.theme.fonts.sizes.large};
  color: ${(props) => props.theme.colors.white};
  margin-bottom: 5px;
`;

const InfoText = styled.Text<{ theme: ThemeType }>`
  font-family: ${(props) => props.theme.fonts.families.openRegular};
  font-size: ${(props) => props.theme.fonts.sizes.normal};
  color: ${(props) => props.theme.colors.white};
`;

const captionsArr: string[] = [
  "We're fetching your wallet details...",
  "Importing wallet securely...",
  "Syncing with the blockchain...",
];

const titleArr: string[] = [
  "Hang tight!",
  "This might take a minute.",
  "Almost there!",
];

export default function Page() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [textValue, setTextValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [captions, setCaptions] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isInputFocused, setInputFocused] = useState(false);

  const setCaptionsInterval = () => {
    setTitle(titleArr[0]);
    setCaptions(captionsArr[0]);
    let interval: NodeJS.Timeout = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * captionsArr.length);
      setTitle(titleArr[randomIndex]);
      setCaptions(captionsArr[randomIndex]);
    }, 8000);
    return () => {
      clearInterval(interval);
      setTitle("");
      setCaptions("");
    };
  };

  const handleVerifySeedPhrase = async () => {
    setLoading(true);
    const errorText =
      "Looks like the seed phrase is incorrect. Please try again.";
    const phraseTextValue = textValue.trimEnd();
    if (phraseTextValue.split(" ").length !== 12) {
      setError(errorText);
      setLoading(false);
      return;
    }

    const captionsInterval = setCaptionsInterval();
    setError("");
    try {
      // Logic is needed to find the crypto currency with the highest amount of accounts created
      // and using that index to create the same amount of addresses via hd wallets
      let highestIndex = 0;
      const unusedEthIndex = await ethService.findNextUnusedWalletIndex(
        phraseTextValue
      );

      const unusedSolIndex = await solanaService.findNextUnusedWalletIndex(
        phraseTextValue
      );

      highestIndex = Math.max(unusedEthIndex, unusedSolIndex);
      const importedEthWallets = await ethService.importAllActiveAddresses(
        phraseTextValue
      );

      const importedSolWallets = await solanaService.importAllActiveAddresses(
        phraseTextValue,
        highestIndex
      );

      const transformedActiveEthAddresses: AddressState[] =
        importedEthWallets.map((info, index) => {
          return {
            accountName: `Account ${index + 1}`,
            derivationPath: info.derivationPath,
            address: info.address,
            publicKey: info.publicKey,
            balance: 0,
            transactionMetadata: {
              paginationKey: undefined,
              transactions: [],
            },
            failedNetworkRequest: false,
            status: GeneralStatus.Idle,
            transactionConfirmations: [],
          };
        });

      const transformedActiveSolAddresses: AddressState[] =
        importedSolWallets.map((info, index) => {
          return {
            accountName: `Account ${index + 1}`,
            derivationPath: info.derivationPath,
            address: info.publicKey,
            publicKey: info.publicKey,
            balance: 0,
            transactionMetadata: {
              paginationKey: undefined,
              transactions: [],
            },
            failedNetworkRequest: false,
            status: GeneralStatus.Idle,
            transactionConfirmations: [],
          };
        });

      await savePhrase(JSON.stringify(phraseTextValue));

      dispatch(saveEthereumAddresses(transformedActiveEthAddresses));
      dispatch(fetchEthereumBalance(transformedActiveEthAddresses[0].address));
      dispatch(
        fetchEthereumTransactions({
          address: transformedActiveEthAddresses[0].address,
        })
      );

      dispatch(saveSolanaAddresses(transformedActiveSolAddresses));
      dispatch(fetchSolanaBalance(transformedActiveSolAddresses[0].address));
      dispatch(
        fetchSolanaTransactions(transformedActiveSolAddresses[0].address)
      );

      router.push({
        pathname: ROUTES.walletCreatedSuccessfully,
        params: { successState: "IMPORTED_WALLET" },
      });
    } catch (err) {
      setError("Failed to import wallet");
      console.error("Failed to import wallet", err);
      setLoading(false);
    } finally {
      captionsInterval();
    }
  };

  return (
    <SafeAreaContainer>
      <ScrollView contentContainerStyle={{ paddingVertical: 50 }}>
        <ContentContainer>
          <TextContainer>
            <Title>Secret Recovery Phrase</Title>
            <Subtitle>
              Start the process to restore your wallet by entering your 12 or
              24-word recovery phrase below.
            </Subtitle>
          </TextContainer>
          <SeedTextInput
            isInputFocused={isInputFocused}
            autoCapitalize="none"
            multiline
            returnKeyType="done"
            value={textValue}
            readOnly={false}
            onChangeText={setTextValue}
            placeholder="Enter your seed phrase"
            placeholderTextColor={theme.colors.grey}
            onFocus={() => setInputFocused(true)}
            onEndEditing={() => setInputFocused(false)}
            blurOnSubmit
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </ContentContainer>
      </ScrollView>
      {error && (
        <ErrorTextContainer>
          <ErrorTextCenter>{error}</ErrorTextCenter>
        </ErrorTextContainer>
      )}
      <ButtonContainer>
        {title !== "" && captions !== "" && (
          <InfoContainer>
            <InfoTitle>{title}</InfoTitle>
            <InfoText>{captions}</InfoText>
          </InfoContainer>
        )}
        <Button
          linearGradient={theme.colors.primaryLinearGradient}
          loading={loading}
          disabled={loading}
          color={theme.colors.white}
          backgroundColor={theme.colors.primary}
          onPress={handleVerifySeedPhrase}
          title="Verify seed phrase"
        />
      </ButtonContainer>
    </SafeAreaContainer>
  );
}
```


app/(wallet)/seed/wallet-import-seed-phrase.tsx
```tsx
import React, { useState } from "react";
import { Dimensions, Keyboard, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { useTheme } from "styled-components";
import ethService from "../../../services/EthereumService";
import solanaService from "../../../services/SolanaService";
import { ThemeType } from "../../../styles/theme";
import {
  saveSolanaAddresses,
  fetchSolanaBalance,
  fetchSolanaTransactions,
} from "../../../store/solanaSlice";
import {
  saveEthereumAddresses,
  fetchEthereumBalance,
  fetchEthereumTransactions,
} from "../../../store/ethereumSlice";
import { GeneralStatus } from "../../../store/types";
import type { AddressState } from "../../../store/types";
import type { AppDispatch } from "../../../store";
import Button from "../../../components/Button/Button";
import { ROUTES } from "../../../constants/routes";
import { savePhrase } from "../../../hooks/useStorageState";
import { Title, Subtitle } from "../../../components/Styles/Text.styles";
import {
  ErrorTextCenter,
  ErrorTextContainer,
} from "../../../components/Styles/Errors.styles";

interface SeedTextInputProps {
  theme: ThemeType;
  isInputFocused: boolean;
}

const isAndroid = Platform.OS === "android";

const SafeAreaContainer = styled(SafeAreaView)<{ theme: ThemeType }>`
  flex: 1;
  background-color: ${(props) => props.theme.colors.lightDark};
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.View<{ theme: ThemeType }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing.medium};
  margin-top: ${(props) => isAndroid && props.theme.spacing.huge};
`;

const TextContainer = styled.View<{ theme: ThemeType }>`
  margin-bottom: ${(props) => props.theme.spacing.huge};
`;

const ButtonContainer = styled.View<{ theme: ThemeType }>`
  padding-left: ${(props) => props.theme.spacing.large};
  padding-right: ${(props) => props.theme.spacing.large};
  padding-bottom: ${(props) => props.theme.spacing.large};
  padding-top: ${(props) => props.theme.spacing.small};
  width: 100%;
`;

const SeedTextInput = styled.TextInput<SeedTextInputProps>`
  justify-content: flex-start;
  padding: ${(props) => props.theme.spacing.large};
  margin: ${(props) => props.theme.spacing.large};
  background-color: ${(props) => props.theme.colors.dark};
  border-radius: ${(props) => props.theme.borderRadius.extraLarge};
  width: ${(Dimensions.get("window").width - 80).toFixed(0)}px;
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fonts.sizes.large};\
  font-family: ${(props) => props.theme.fonts.families.openRegular};
  border: 1px solid
    ${({ theme, isInputFocused }) =>
      isInputFocused ? theme.colors.primary : theme.colors.grey};
`;

const InfoContainer = styled.View<{ theme: ThemeType }>`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: rgba(136, 120, 244, 0.3);
  border: 2px solid rgba(136, 120, 244, 0.6);
  border-radius: ${(props) => props.theme.borderRadius.large};
  padding: ${(props) => props.theme.spacing.large};
  margin-bottom: ${(props) => props.theme.spacing.large};
`;

const InfoTitle = styled.Text<{ theme: ThemeType }>`
  font-family: ${(props) => props.theme.fonts.families.openBold};
  font-size: ${(props) => props.theme.fonts.sizes.large};
  color: ${(props) => props.theme.colors.white};
  margin-bottom: 5px;
`;

const InfoText = styled.Text<{ theme: ThemeType }>`
  font-family: ${(props) => props.theme.fonts.families.openRegular};
  font-size: ${(props) => props.theme.fonts.sizes.normal};
  color: ${(props) => props.theme.colors.white};
`;

const captionsArr: string[] = [
  "We're fetching your wallet details...",
  "Importing wallet securely...",
  "Syncing with the blockchain...",
];

const titleArr: string[] = [
  "Hang tight!",
  "This might take a minute.",
  "Almost there!",
];

export default function Page() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [textValue, setTextValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [captions, setCaptions] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isInputFocused, setInputFocused] = useState(false);

  const setCaptionsInterval = () => {
    setTitle(titleArr[0]);
    setCaptions(captionsArr[0]);
    let interval: NodeJS.Timeout = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * captionsArr.length);
      setTitle(titleArr[randomIndex]);
      setCaptions(captionsArr[randomIndex]);
    }, 8000);
    return () => {
      clearInterval(interval);
      setTitle("");
      setCaptions("");
    };
  };

  const handleVerifySeedPhrase = async () => {
    setLoading(true);
    const errorText =
      "Looks like the seed phrase is incorrect. Please try again.";
    const phraseTextValue = textValue.trimEnd();
    if (phraseTextValue.split(" ").length !== 12) {
      setError(errorText);
      setLoading(false);
      return;
    }

    const captionsInterval = setCaptionsInterval();
    setError("");
    try {
      // Logic is needed to find the crypto currency with the highest amount of accounts created
      // and using that index to create the same amount of addresses via hd wallets
      let highestIndex = 0;
      const unusedEthIndex = await ethService.findNextUnusedWalletIndex(
        phraseTextValue
      );

      const unusedSolIndex = await solanaService.findNextUnusedWalletIndex(
        phraseTextValue
      );

      highestIndex = Math.max(unusedEthIndex, unusedSolIndex);
      const importedEthWallets = await ethService.importAllActiveAddresses(
        phraseTextValue
      );

      const importedSolWallets = await solanaService.importAllActiveAddresses(
        phraseTextValue,
        highestIndex
      );

      const transformedActiveEthAddresses: AddressState[] =
        importedEthWallets.map((info, index) => {
          return {
            accountName: `Account ${index + 1}`,
            derivationPath: info.derivationPath,
            address: info.address,
            publicKey: info.publicKey,
            balance: 0,
            transactionMetadata: {
              paginationKey: undefined,
              transactions: [],
            },
            failedNetworkRequest: false,
            status: GeneralStatus.Idle,
            transactionConfirmations: [],
          };
        });

      const transformedActiveSolAddresses: AddressState[] =
        importedSolWallets.map((info, index) => {
          return {
            accountName: `Account ${index + 1}`,
            derivationPath: info.derivationPath,
            address: info.publicKey,
            publicKey: info.publicKey,
            balance: 0,
            transactionMetadata: {
              paginationKey: undefined,
              transactions: [],
            },
            failedNetworkRequest: false,
            status: GeneralStatus.Idle,
            transactionConfirmations: [],
          };
        });

      await savePhrase(JSON.stringify(phraseTextValue));

      dispatch(saveEthereumAddresses(transformedActiveEthAddresses));
      dispatch(fetchEthereumBalance(transformedActiveEthAddresses[0].address));
      dispatch(
        fetchEthereumTransactions({
          address: transformedActiveEthAddresses[0].address,
        })
      );

      dispatch(saveSolanaAddresses(transformedActiveSolAddresses));
      dispatch(fetchSolanaBalance(transformedActiveSolAddresses[0].address));
      dispatch(
        fetchSolanaTransactions(transformedActiveSolAddresses[0].address)
      );

      router.push({
        pathname: ROUTES.walletCreatedSuccessfully,
        params: { successState: "IMPORTED_WALLET" },
      });
    } catch (err) {
      setError("Failed to import wallet");
      console.error("Failed to import wallet", err);
      setLoading(false);
    } finally {
      captionsInterval();
    }
  };

  return (
    <SafeAreaContainer>
      <ScrollView contentContainerStyle={{ paddingVertical: 50 }}>
        <ContentContainer>
          <TextContainer>
            <Title>Secret Recovery Phrase</Title>
            <Subtitle>
              Start the process to restore your wallet by entering your 12 or
              24-word recovery phrase below.
            </Subtitle>
          </TextContainer>
          <SeedTextInput
            isInputFocused={isInputFocused}
            autoCapitalize="none"
            multiline
            returnKeyType="done"
            value={textValue}
            readOnly={false}
            onChangeText={setTextValue}
            placeholder="Enter your seed phrase"
            placeholderTextColor={theme.colors.grey}
            onFocus={() => setInputFocused(true)}
            onEndEditing={() => setInputFocused(false)}
            blurOnSubmit
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </ContentContainer>
      </ScrollView>
      {error && (
        <ErrorTextContainer>
          <ErrorTextCenter>{error}</ErrorTextCenter>
        </ErrorTextContainer>
      )}
      <ButtonContainer>
        {title !== "" && captions !== "" && (
          <InfoContainer>
            <InfoTitle>{title}</InfoTitle>
            <InfoText>{captions}</InfoText>
          </InfoContainer>
        )}
        <Button
          linearGradient={theme.colors.primaryLinearGradient}
          loading={loading}
          disabled={loading}
          color={theme.colors.white}
          backgroundColor={theme.colors.primary}
          onPress={handleVerifySeedPhrase}
          title="Verify seed phrase"
        />
      </ButtonContainer>
    </SafeAreaContainer>
  );
}

```

src/(app)/index.tsx
```tsx
import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { View, RefreshControl, FlatList, Platform } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import styled, { useTheme } from "styled-components/native";
import { ROUTES } from "../../constants/routes";
import type { ThemeType } from "../../styles/theme";
import type { RootState, AppDispatch } from "../../store";
import { fetchPrices } from "../../store/priceSlice";
import {
  fetchEthereumBalance,
  fetchEthereumTransactions,
  fetchEthereumTransactionsInterval,
  fetchEthereumBalanceInterval,
} from "../../store/ethereumSlice";
import {
  fetchSolanaBalance,
  fetchSolanaTransactions,
  fetchSolanaTransactionsInterval,
  fetchSolanaBalanceInterval,
} from "../../store/solanaSlice";
import { useLoadingState } from "../../hooks/redux";
import { GeneralStatus } from "../../store/types";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { truncateWalletAddress } from "../../utils/truncateWalletAddress";
import { formatDollar, formatDollarRaw } from "../../utils/formatDollars";
import { placeholderArr } from "../../utils/placeholder";
import { useStorage } from "../../hooks/useStorageState";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SendIcon from "../../assets/svg/send.svg";
import ReceiveIcon from "../../assets/svg/receive.svg";
import CryptoInfoCard from "../../components/CryptoInfoCard/CryptoInfoCard";
import CryptoInfoCardSkeleton from "../../components/CryptoInfoCard/CryptoInfoCardSkeleton";
import SolanaIcon from "../../assets/svg/solana.svg";
import EthereumPlainIcon from "../../assets/svg/ethereum_plain.svg";
import EthereumIcon from "../../assets/svg/ethereum.svg";
import { FETCH_PRICES_INTERVAL } from "../../constants/price";
import { TICKERS } from "../../constants/tickers";
import { SafeAreaContainer } from "../../components/Styles/Layout.styles";
import InfoBanner from "../../components/InfoBanner/InfoBanner";
import { SNAP_POINTS } from "../../constants/storage";

const ContentContainer = styled.View<{ theme: ThemeType }>`
  flex: 1;
  justify-content: flex-start;
  padding: ${(props) => props.theme.spacing.medium};
  margin-top: ${(props) =>
    Platform.OS === "android" ? "40px" : props.theme.spacing.huge};
`;
const BalanceContainer = styled.View<{ theme: ThemeType }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing.huge};
`;

const BalanceText = styled.Text<{ theme: ThemeType }>`
  font-family: ${(props) => props.theme.fonts.families.openBold};
  font-size: ${(props) => props.theme.fonts.sizes.uberHuge};
  color: ${(props) => props.theme.fonts.colors.primary};
  text-align: center;
`;

const ActionContainer = styled.View<{ theme: ThemeType }>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing.medium};
`;

const CryptoInfoCardContainer = styled.View<{ theme: ThemeType }>`
  flex: 1;
  flex-direction: column;
  width: 100%;
`;

const CardView = styled.View<{ theme: ThemeType }>`
  margin-bottom: ${(props) => props.theme.spacing.medium};
  width: 100%;
`;

const SectionTitle = styled.Text<{ theme: ThemeType }>`
  font-family: ${(props) => props.theme.fonts.families.openBold};
  font-size: ${(props) => props.theme.fonts.sizes.header};
  color: ${(props) => props.theme.fonts.colors.primary};
  margin-bottom: ${(props) => props.theme.spacing.medium};
  margin-left: ${(props) => props.theme.spacing.small};
`;

const BottomSectionTitle = styled.Text<{ theme: ThemeType }>`
  font-family: ${(props) => props.theme.fonts.families.openBold};
  font-size: ${(props) => props.theme.fonts.sizes.title};
  color: ${(props) => props.theme.fonts.colors.primary};
  margin-bottom: ${(props) => props.theme.spacing.medium};
  margin-left: ${(props) => props.theme.spacing.huge};
`;

const DollarSign = styled.Text<{ theme: ThemeType }>`
  color: ${(props) => props.theme.colors.lightGrey};
  font-family: ${(props) => props.theme.fonts.families.openBold};
  font-size: ${(props) => props.theme.fonts.sizes.uberHuge};
  text-align: center;
`;

const BottomScrollView = styled(BottomSheetScrollView)<{ theme: ThemeType }>`
  padding: ${(props) => props.theme.spacing.tiny};
  padding-top: ${(props) => props.theme.spacing.small};
`;

const ErrorContainer = styled.View<{ theme: ThemeType }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgba(255, 0, 0, 0.3);
  border: 2px solid rgba(255, 0, 0, 0.4);
  border-radius: ${(props) => props.theme.borderRadius.large};
  height: 85px;
  padding: ${(props) => props.theme.spacing.medium};
`;

const ErrorText = styled.Text<{ theme: ThemeType }>`
  font-family: ${(props) => props.theme.fonts.families.openBold};
  font-size: ${(props) => props.theme.fonts.sizes.normal};
  color: ${(props) => props.theme.colors.white};
`;

export default function Index() {
  const dispatch = useDispatch<AppDispatch>();
  const sheetRef = useRef<BottomSheet>(null);
  const theme = useTheme();
  const isLoading = useLoadingState();

  const activeEthIndex = useSelector(
    (state: RootState) => state.ethereum.activeIndex
  );
  const ethWalletAddress = useSelector(
    (state: RootState) => state.ethereum.addresses[activeEthIndex].address
  );
  const ethBalance = useSelector(
    (state: RootState) => state.ethereum.addresses[activeEthIndex].balance
  );
  const ethTransactions = useSelector(
    (state: RootState) =>
      state.ethereum.addresses[activeEthIndex].transactionMetadata.transactions
  );
  const failedEthStatus = useSelector(
    (state: RootState) =>
      state.ethereum.addresses[activeEthIndex].status === GeneralStatus.Failed
  );
  const activeSolIndex = useSelector(
    (state: RootState) => state.solana.activeIndex
  );
  const solWalletAddress = useSelector(
    (state: RootState) => state.solana.addresses[activeSolIndex].address
  );
  const solBalance = useSelector(
    (state: RootState) => state.solana.addresses[activeSolIndex].balance
  );

  const solTransactions = useSelector(
    (state: RootState) =>
      state.solana.addresses[activeSolIndex].transactionMetadata.transactions
  );
  const failedSolStatus = useSelector(
    (state: RootState) =>
      state.solana.addresses[activeSolIndex].status === GeneralStatus.Failed
  );

  const snapPoints = useMemo(() => ["10%", "33%", "69%", "88%"], []);

  const prices = useSelector((state: RootState) => state.price.data);
  const solPrice = prices?.solana?.usd;
  const ethPrice = prices?.ethereum?.usd;

  const [refreshing, setRefreshing] = useState(false);
  const [usdBalance, setUsdBalance] = useState(0);
  const [solUsd, setSolUsd] = useState(0);
  const [ethUsd, setEthUsd] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [bottomSheetIndex, setBottomSheetIndex, bottomSheetIndexLoading] =
    useStorage(SNAP_POINTS);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(fetchPrices());
    fetchTokenBalances();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [dispatch, solWalletAddress, ethWalletAddress]);

  const fetchTokenBalances = useCallback(async () => {
    if (ethWalletAddress) {
      dispatch(fetchEthereumBalance(ethWalletAddress));
    }

    if (solWalletAddress) {
      dispatch(fetchSolanaBalance(solWalletAddress));
    }
  }, [ethBalance, solBalance, dispatch]);

  const fetchTokenBalancesInterval = useCallback(async () => {
    if (ethWalletAddress) {
      dispatch(fetchEthereumBalanceInterval(ethWalletAddress));
    }

    if (solWalletAddress) {
      dispatch(fetchSolanaBalanceInterval(solWalletAddress));
    }
  }, [ethBalance, solBalance, dispatch]);

  const updatePrices = () => {
    if (ethWalletAddress && solWalletAddress) {
      const ethUsd = ethPrice * ethBalance;
      const solUsd = solPrice * solBalance;

      setUsdBalance(ethUsd + solUsd);
      setEthUsd(ethUsd);
      setSolUsd(solUsd);
    }
  };

  const _handlePressButtonAsync = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  };

  const urlBuilder = (hash: string, asset: string) => {
    let url: string;
    if (asset.toLowerCase() === TICKERS.drex.toLowerCase()) {
      url = `https://sepolia.etherscan.io/tx/${hash}`;
    } else {
      url = `https://explorer.solana.com/?cluster=testnet/tx/${hash}`;
    }
    return url;
  };

  const renderItem = ({ item }) => {
    if (isLoading) {
      return <CryptoInfoCardSkeleton />;
    }
    const isSolana = item.asset.toLowerCase() === TICKERS.solana.toLowerCase();
    const isEthereum =
      item.asset.toLowerCase() === TICKERS.drex.toLowerCase();
    const Icon = isSolana ? SolanaIcon : EthereumPlainIcon;
    const sign = item.direction === "received" ? "+" : "-";
    if (isSolana) {
      const caption =
        item.direction === "received"
          ? `from ${truncateWalletAddress(item.from)}`
          : `To ${truncateWalletAddress(item.to)}`;
      return (
        <CryptoInfoCard
          onPress={() =>
            _handlePressButtonAsync(urlBuilder(item.hash, item.asset))
          }
          title={capitalizeFirstLetter(item.direction)}
          caption={caption}
          details={`${sign} ${item.value} ${item.asset}`}
          icon={<Icon width={35} height={35} fill={theme.colors.white} />}
        />
      );
    }

    if (isEthereum) {
      const caption =
        item.direction === "received"
          ? `from ${truncateWalletAddress(item.from)}`
          : `To ${truncateWalletAddress(item.to)}`;
      return (
        <CryptoInfoCard
          onPress={() =>
            _handlePressButtonAsync(urlBuilder(item.hash, item.asset))
          }
          title={capitalizeFirstLetter(item.direction)}
          caption={caption}
          details={`${sign} ${item.value} ${item.asset}`}
          icon={<Icon width={35} height={35} fill={theme.colors.white} />}
        />
      );
    }
  };

  const fetchTransactions = async () => {
    dispatch(fetchEthereumTransactions({ address: ethWalletAddress }));
    dispatch(fetchSolanaTransactions(solWalletAddress));
  };

  const fetchTransactionsInterval = async () => {
    dispatch(fetchEthereumTransactionsInterval({ address: ethWalletAddress }));
    dispatch(fetchSolanaTransactionsInterval(solWalletAddress));
  };

  const fetchBalanceAndPrice = async () => {
    await dispatch(fetchPrices());
    await fetchTokenBalances();
  };

  const fetchBalanceAndPriceInterval = async () => {
    await dispatch(fetchPrices());
    await fetchTokenBalancesInterval();
  };

  const fetchAndUpdatePrices = async () => {
    if (ethWalletAddress && solWalletAddress) {
      await fetchBalanceAndPrice();
      await fetchTransactions();
    }
  };

  const fetchAndUpdatePricesInternal = async () => {
    if (solBalance && ethBalance) {
      await fetchBalanceAndPriceInterval();
      await fetchTransactionsInterval();
    }
  };

  const handleSheetChange = (index: number) => {
    setBottomSheetIndex(JSON.stringify(index));
  };

  useEffect(() => {
    fetchAndUpdatePrices();
  }, [dispatch, ethWalletAddress, solWalletAddress]);

  useEffect(() => {
    const interval = setInterval(
      fetchAndUpdatePricesInternal,
      FETCH_PRICES_INTERVAL
    );

    return () => clearInterval(interval);
  }, [dispatch, ethWalletAddress, solWalletAddress]);

  useEffect(() => {
    updatePrices();
  }, [ethBalance, solBalance, ethWalletAddress, solWalletAddress]);

  useEffect(() => {
    // TODO: Sort these somewhere else
    const mergedAndSortedTransactions = [
      ...solTransactions,
      ...ethTransactions,
    ].sort((a, b) => b.blockTime - a.blockTime);
    setTransactions(mergedAndSortedTransactions);
  }, [solTransactions, ethTransactions, ethWalletAddress, solWalletAddress]);

  return (
    <SafeAreaContainer>
      <ContentContainer>
        <FlatList
          contentContainerStyle={{ gap: 10 }}
          data={isLoading ? placeholderArr(8) : transactions}
          renderItem={renderItem}
          keyExtractor={(item) => {
            return item.uniqueId;
          }}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          refreshControl={
            <RefreshControl
              tintColor="#fff"
              titleColor="#fff"
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          ListHeaderComponent={
            <>
              <BalanceContainer>
                <DollarSign>$</DollarSign>
                <BalanceText>{formatDollarRaw(usdBalance)}</BalanceText>
              </BalanceContainer>
              <ActionContainer>
                <PrimaryButton
                  icon={
                    <SendIcon
                      width={25}
                      height={25}
                      fill={theme.colors.primary}
                    />
                  }
                  onPress={() => router.push(ROUTES.sendOptions)}
                  btnText="Send"
                />
                <View style={{ width: 15 }} />
                <PrimaryButton
                  icon={
                    <ReceiveIcon
                      width={25}
                      height={25}
                      fill={theme.colors.primary}
                    />
                  }
                  onPress={() => router.push(ROUTES.receiveOptions)}
                  btnText="Receive"
                />
              </ActionContainer>
              <SectionTitle>Recent Activity</SectionTitle>
            </>
          }
          ListEmptyComponent={
            <>
              {failedEthStatus && failedSolStatus ? (
                <ErrorContainer>
                  <ErrorText>
                    There seems to be a network error, please try again later
                  </ErrorText>
                </ErrorContainer>
              ) : (
                <InfoBanner />
              )}
            </>
          }
        />
      </ContentContainer>
      {!bottomSheetIndexLoading && (
        <BottomSheet
          ref={sheetRef}
          index={bottomSheetIndex !== null ? parseInt(bottomSheetIndex) : 1}
          onChange={handleSheetChange}
          snapPoints={snapPoints}
          backgroundStyle={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: theme.colors.lightDark,
            opacity: 0.98,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,

            elevation: 24,
          }}
          handleIndicatorStyle={{
            backgroundColor: theme.colors.white,
          }}
          handleStyle={{
            marginTop: 6,
          }}
        >
          <BottomScrollView>
            <BottomSectionTitle>Assets</BottomSectionTitle>
            <CryptoInfoCardContainer>
              <CardView>
                <CryptoInfoCard
                  onPress={() => router.push(ROUTES.ethDetails)}
                  title="Ethereum"
                  caption={`${ethBalance} Drex`}
                  details={formatDollar(ethUsd)}
                  icon={
                    <EthereumIcon
                      width={35}
                      height={35}
                      fill={theme.colors.white}
                    />
                  }
                  hideBackground
                />
              </CardView>
              <CardView>
                <CryptoInfoCard
                  onPress={() => router.push(ROUTES.solDetails)}
                  title="Solana"
                  caption={`${solBalance} SOL`}
                  details={formatDollar(solUsd)}
                  icon={<SolanaIcon width={25} height={25} fill="#14F195" />}
                  hideBackground
                />
              </CardView>
            </CryptoInfoCardContainer>
          </BottomScrollView>
        </BottomSheet>
      )}
    </SafeAreaContainer>
  );
}

```

Preciso entender como esta implementado o redux no projeto
