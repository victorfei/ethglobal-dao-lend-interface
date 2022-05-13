import "../styles/globals.css";

import type { AppProps } from "next/app";
import { WalletAuthProvider } from "../lib/walletContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletAuthProvider>
      <Component {...pageProps} />
    </WalletAuthProvider>
  );
}

export default MyApp;
