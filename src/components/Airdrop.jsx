import React, { useState } from "react";
import { useConnection, WalletProvider } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"; // Import PublicKey for validation

const Airdrop = () => {
  const { connection } = useConnection(); // Access the connection to the Solana network
  const [amount, setAmount] = useState(""); // Store the amount to be airdropped
  const [inputPublicKey, setInputPublicKey] = useState(""); // Store the user input for public key
  const [status, setStatus] = useState(""); // For showing status messages

  const handleAirdrop = async () => {
    let targetPublicKey = inputPublicKey;

    // Validate the public key entered by the user
    try {
      const parsedPublicKey = new PublicKey(targetPublicKey); // Attempt to parse the public key
      console.log("Public Key:", parsedPublicKey.toBase58());
    } catch (e) {
      setStatus("Invalid public key entered.");
      return;
    }

    // Ensure the amount is valid
    if (!amount || parseFloat(amount) <= 0) {
      setStatus("Please enter a valid amount!");
      return;
    }

    // Display status message to indicate request is being made
    setStatus(`Requesting airdrop of ${amount} SOL to ${targetPublicKey}...`);

    try {
      // Request the airdrop to the specified public key
      const signature = await connection.requestAirdrop(
        new PublicKey(targetPublicKey),
        parseFloat(amount) * LAMPORTS_PER_SOL // Convert SOL to lamports
      );

      // Confirm the transaction
      const confirmation = await connection.confirmTransaction(
        signature,
        "finalized"
      );

      if (confirmation.value.err) {
        setStatus("Airdrop failed, please try again later.");
      } else {
        setStatus(
          `Successfully airdropped ${amount} SOL to ${targetPublicKey}`
        );
      }
    } catch (error) {
      console.error("Airdrop failed:", error);
      setStatus("Airdrop failed, please try again later.");
    }
  };

  return (
    <WalletProvider>
      <div className="p-6 bg-gray-800 rounded-lg shadow-md max-w-md mx-auto text-white">
        <h2 className="text-center text-lg font-semibold mb-4">
          Solana Airdrop
        </h2>

        {/* Public Key Input */}
        <div className="mb-4">
          <input
            type="text"
            value={inputPublicKey}
            onChange={(e) => setInputPublicKey(e.target.value)} // Update input public key
            placeholder="Enter public key"
            className="w-full p-2 bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Amount Input */}
        <div className="mb-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)} // Update amount input
            placeholder="Enter amount of SOL"
            className="w-full p-2 bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Airdrop Button */}
        <div className="text-center">
          <button
            onClick={handleAirdrop}
            className="px-4 py-2 bg-teal-500 text-white font-medium rounded-md hover:bg-teal-600 transition duration-300"
          >
            Airdrop
          </button>
        </div>

        {/* Status Message */}
        {status && (
          <div className="mt-4 text-center text-sm text-gray-300">
            <p>{status}</p>
          </div>
        )}
      </div>
    </WalletProvider>
  );
};

export default Airdrop;
