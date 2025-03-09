import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { WalletProvider } from "@solana/wallet-adapter-react";

const SendSOL = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!recipient || !amount) {
      setMessage("Please fill in all fields.");
      return;
    }

    setIsSending(true);
    setMessage("");

    try {
      // Establish connection with the Solana cluster
      const connection = new Connection(
        "https://api.mainnet-beta.solana.com",
        "confirmed"
      );

      // Validate recipient address
      const recipientPubKey = new PublicKey(recipient);

      // Get the sender's wallet (assumes wallet adapter is injected, e.g., Phantom)
      const senderWallet = window.solana;
      if (!senderWallet || !senderWallet.isConnected) {
        setMessage("Please connect your wallet.");
        setIsSending(false);
        return;
      }

      const senderPublicKey = new PublicKey(senderWallet.publicKey);

      // Create transaction to send SOL
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: senderPublicKey,
          toPubkey: recipientPubKey,
          lamports: Math.floor(parseFloat(amount) * 1e9), // Convert SOL to lamports
        })
      );

      // Request transaction signature from the user's wallet
      const { signature } =
        await senderWallet.signAndSendTransaction(transaction);

      // Confirm the transaction
      await connection.confirmTransaction(signature, "confirmed");

      setMessage(`Successfully sent ${amount} SOL to ${recipient}!`);
    } catch (error) {
      console.error("Transaction error:", error);
      setMessage("Failed to send SOL. Please check the details and try again.");
    } finally {
      setIsSending(false);
      setRecipient("");
      setAmount("");
    }
  };

  return (
    <WalletProvider>
      <motion.div
        className="flex justify-center items-center min-h-screen bg-gray-900 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-center mb-6 text-gray-900">
            Send SOL
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Recipient Wallet Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <input
              type="number"
              placeholder="Amount (SOL)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <button
              onClick={handleSend}
              className={`w-full px-4 py-2 rounded-md text-white font-semibold ${
                isSending
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-gray-900 hover:bg-gray-700"
              }`}
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send SOL"}
            </button>
            {message && (
              <p
                className={`text-center mt-4 ${
                  message.includes("Successfully")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
            x
          </div>
        </div>
      </motion.div>
    </WalletProvider>
  );
};

export default SendSOL;
