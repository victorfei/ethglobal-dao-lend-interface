import { providers, ethers } from "ethers";
import { providerOptions } from "../../lib/walletConnect";
import Web3Modal from "web3modal";
import { useEffect } from "react";

export interface ConnectWalletProps {}

// docs.walletconnect.com/quick-start/dapps/web3-provider
export const ConnectWallet = ({}: ConnectWalletProps) => {
  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions, // required
  });
  useEffect(() => {
    const instance = await web3Modal.connect();
  });

  const provider = new ethers.providers.Web3Provider(instance);
  const signer = provider.getSigner();

  return <div></div>;
};

export default ConnectWallet;
