import React, { createContext, useContext, useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

const WalletContext = createContext();

export const useWalletContext = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const { publicKey, connected } = useWallet();
  const [walletPublicKey, setWalletPublicKey] = useState(null);

  useEffect(() => {
    if (connected) {
      setWalletPublicKey(publicKey);
    } else {
      setWalletPublicKey(null);
    }
  }, [connected, publicKey]);

  return (
    <WalletContext.Provider value={{ walletPublicKey, connected }}>
      {children}
    </WalletContext.Provider>
  );
};
