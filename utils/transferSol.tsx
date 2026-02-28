import {
  Connection,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  transact,
  Web3MobileWallet,
} from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { toByteArray } from "react-native-quick-base64";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const APP_IDENTITY = {
  name: "OpenPay",
  uri: "openpay://",
  icon: "favicon.ico",
};
export async function transferSol(
  recipientAddress: string,
  amountInSol: number,
): Promise<string | null> {
  const cachedToken = await AsyncStorage.getItem("mwa_auth_token");
  if (!cachedToken) {
    Alert.alert(
      "Wallet not connected",
      "Please connect your wallet before sending SOL.",
    );
    return null;
  }
  try {
    await transact(async (wallet: Web3MobileWallet) => {
      const authResult = await wallet.reauthorize({
        identity: APP_IDENTITY,
        auth_token: cachedToken,
      });

      const fromPubkey = new PublicKey(
        toByteArray(authResult.accounts[0].address),
      );
      const toPubkey = new PublicKey(recipientAddress);
      const lamports = Math.round(amountInSol * LAMPORTS_PER_SOL);
      if (lamports <= 0) {
        throw new Error("Amount must be greater than 0 SOL");
      }

      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();

      const instructions = [
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports,
        }),
      ];

      const messageV0 = new TransactionMessage({
        payerKey: fromPubkey,
        recentBlockhash: blockhash,
        instructions,
      }).compileToV0Message();

      const transaction = new VersionedTransaction(messageV0);

      const [signedTransaction] = await wallet.signTransactions({
        transactions: [transaction],
      });

      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize(),
      );

      const confirmation = await connection.confirmTransaction(
        { signature, blockhash, lastValidBlockHeight },
        "confirmed",
      );

      if (confirmation.value.err) {
        throw new Error("Transaction failed on-chain");
      }

      return signature;
    });
  } catch (error: any) {
    if (error.code === 4001) {
      Alert.alert("Cancelled", "Transaction was cancelled.");
    } else if (error.code === -32603) {
      Alert.alert(
        "Failed",
        "Transaction simulation failed. Check your balance.",
      );
    } else {
      Alert.alert("Error", error.message);
      console.log(error);
    }
    return null;
  }
}
