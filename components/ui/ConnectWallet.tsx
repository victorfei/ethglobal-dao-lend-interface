import { providers, ethers } from "ethers";
import Web3Modal from "web3modal";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

export interface ConnectWalletProps {
  connectWallet: () => void;
  connected: boolean;
}

// docs.walletconnect.com/quick-start/dapps/web3-provider
const ConnectWalletButton = ({
  connectWallet,
  connected,
}: ConnectWalletProps) => {
  return (
    <div>
      {connected ? (
        <Button
          variant="contained"
          className="bg-black text-white rounded-xl hover:bg-black hover:text-white"
        >
          {" "}
          Wallet Connected
        </Button>
      ) : (
        <Button
          variant="outlined"
          className="text-black border-black hover:bg-black hover:text-white	 hover:cursor-pointer"
          onClick={() => connectWallet()}
        >
          {" "}
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
