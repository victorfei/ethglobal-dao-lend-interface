import { providers, ethers } from "ethers";
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
          className="bg-yellow-500 text-white rounded-xl hover:bg-yellow-500 hover:text-white"
        >
          {" "}
          Wallet Connected
        </Button>
      ) : (
        <Button
          variant="outlined"
          className="text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-white	 hover:cursor-pointer"
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
