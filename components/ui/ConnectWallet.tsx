import { providers, ethers } from "ethers";
import { instantiateWallet } from "../../lib/walletConnect";
import Web3Modal from "web3modal";
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import WalletConnectProvider from "@walletconnect/web3-provider";

export interface ConnectWalletProps {}

// docs.walletconnect.com/quick-start/dapps/web3-provider
const ConnectWalletButton = ({}: ConnectWalletProps) => {
  //   const ConnectWallet = async () => {
  //     const providerOptions = new WalletConnectProvider({
  //       rpc: {
  //         1: process.env.ALCHEMY_URL_KEY,
  //       },
  //     });

  //     const web3Modal = new Web3Modal({
  //       cacheProvider: true, // optional
  //       providerOptions, // required
  //     });

  //     const instance = await web3Modal.connect();

  //     const provider = new ethers.providers.Web3Provider(instance);
  //     const signer = provider.getSigner();
  //   };
  return (
    <div>
      <Button variant="contained" onClick={() => console.log("do nothing")}>
        {" "}
        Go to Lend
      </Button>
      <div className="text-red-500"> hello </div>
    </div>
  );
};

export default ConnectWalletButton;
