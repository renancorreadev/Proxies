import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  Keypair,
} from "@solana/web3.js";
import { TransactionObject } from "../types";

const { EXPO_PUBLIC_ALCHEMY_SOL_URL, EXPO_PUBLIC_ALCHEMY_SOL_API_KEY } =
  process.env;
const customRpcUrl =
  EXPO_PUBLIC_ALCHEMY_SOL_URL + EXPO_PUBLIC_ALCHEMY_SOL_API_KEY;
const connection = new Connection(customRpcUrl, "confirmed");

export const getSolanaBalance = async (publicKeyString: string) => {
  try {
    const publicKey = new PublicKey(publicKeyString);
    const balance = await connection.getBalance(publicKey);
    const solBalance = balance / 1e9;
    return solBalance;
  } catch (error) {
    console.error("Error fetching Solana balance:", error);
    throw error;
  }
};

const fetchTransactionsSequentially = async (signatures: any[]) => {
  const transactions = [];

  for (const signature of signatures) {
    try {
      const transaction = await connection.getParsedTransaction(
        signature.signature
      );
      transactions.push(transaction);
    } catch (error) {
      if (error.message.includes("429")) {
        console.log("Rate limit hit, slowing down requests");
        await new Promise((resolve) => setTimeout(resolve, 250));
      } else {
        console.error("Failed to fetch transaction:", error);
      }
    }
  }

  return transactions;
};

export const getTransactionsByWallet = async (
  walletAddress: string,
  beforeSignature?: string,
  limit = 50
) => {
  const publicKey = new PublicKey(walletAddress);
  let signatures: any;

  try {
    signatures = await connection.getSignaturesForAddress(publicKey, {
      before: beforeSignature,
      limit,
    });
  } catch (err) {
    console.error("Error fetching signatures:", err);
  }

  if (signatures) {
    try {
      const rawTransactions = await fetchTransactionsSequentially(signatures);

      const transactions = rawTransactions
        .map((tx: any) => extractTransactionDetails(tx, walletAddress))
        .sort((a, b) => b.blockTime - a.blockTime);
      return transactions;
    } catch (error) {
      console.error("Failed to process transactions:", error);
      return [];
    }
  }
};

export const validateSolanaAddress = async (addr: string) => {
  let publicKey: PublicKey;
  try {
    publicKey = new PublicKey(addr);
    return await PublicKey.isOnCurve(publicKey.toBytes());
  } catch (err) {
    return false;
  }
};

export const calculateSolanaTransactionFee = async (
  from: string,
  to: string,
  amount: number
) => {
  try {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: new PublicKey(from),
        toPubkey: new PublicKey(to),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );
    let recentBlockhash = (await connection.getLatestBlockhash("finalized"))
      .blockhash;
    transaction.recentBlockhash = recentBlockhash;
    transaction.feePayer = new PublicKey(from);

    const response = await connection.getFeeForMessage(
      transaction.compileMessage(),
      "confirmed"
    );
    return response.value;
  } catch (err) {
    console.error("Error fetching Solana transaction fee:", err);
    throw err;
  }
};

export const sendSolanaTransaction = async (
  secretKey: Uint8Array,
  to: string,
  amount: number
) => {
  try {
    const keyPair = Keypair.fromSecretKey(secretKey);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: new PublicKey(keyPair.publicKey.toString()),
        toPubkey: new PublicKey(to),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );
    let recentBlockhash = (await connection.getLatestBlockhash("finalized"))
      .blockhash;
    transaction.recentBlockhash = recentBlockhash;
    transaction.feePayer = new PublicKey(keyPair.publicKey.toString());

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      keyPair,
    ]);
    return signature;
  } catch (err) {
    console.error("Error sending Solana transaction:", err);
    throw err;
  }
};

export function extractTransactionDetails(
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
  const uniqueId = info.destination + info.source + hash;
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
