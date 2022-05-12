import WalletConnectProvider from "@walletconnect/web3-provider";

//  Create WalletConnect Provider
export const providerOptions = new WalletConnectProvider({
  rpc: {
    1: process.env.ALCHEMY_URL_KEY,
  },
});
await provider.enable();

//  Enable session (triggers QR Code modal)
