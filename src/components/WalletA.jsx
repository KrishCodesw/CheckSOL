import React from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

const WalletA = () => {
  return (
    <div className="bg-gray-900 p-5 flex items-center justify-center">
      <ConnectionProvider endpoint={"https://api.devnet.solana.com/"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className="flex p-4 gap-4 bg-white rounded-lg shadow-lg max-w-md w-full justify-center items-center">
              <div className="flex flex-col justify-center items-center space-y-4 w-full">
                <WalletMultiButton className="w-full px-6 py-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition duration-300" />
                <WalletDisconnectButton className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300" />
              </div>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
};

export default WalletA;
