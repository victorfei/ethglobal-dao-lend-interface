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
        <Button variant="contained"> Wallet Connected</Button>
      ) : (
        <Button variant="contained" onClick={() => connectWallet()}>
          {" "}
          Connect Wallet
        </Button>
      )}

      <div className="text-red-500"> hello </div>
    </div>
  );
};

export default ConnectWalletButton;
