import React from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react"; // Correct imports
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import Bar from "./components/Bar";
import Navbar from "./components/Navbar";
import Description from "./components/Description";
import WalletA from "./components/WalletA";
import "@solana/wallet-adapter-react-ui/styles.css"; // Don't forget the styles!

const wallets = [
  // Add the wallets you want to support
  // new PhantomWalletAdapter(), // Example
  // new SolletWalletAdapter(), // Example
];

function App() {
  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Navbar />
          <Description />
          <WalletA />
          <Bar />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
