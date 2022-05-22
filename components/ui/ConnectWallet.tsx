import { providers, ethers } from "ethers";
import Web3Modal from "web3modal";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

export interface ConnectWalletProps {
  connectWallet: () => void;
  disconnectWallet: () => void;

  web3Provider: boolean;
}

const ConnectWalletButton = ({
  connectWallet,
  disconnectWallet,
  web3Provider,
}: ConnectWalletProps) => {
  return (
    <div>
      {web3Provider ? (
        <Button
          variant="outlined"
          className="text-black border-black hover:bg-black hover:text-white	 hover:cursor-pointer"
          onClick={() => disconnectWallet()}
        >
          {" "}
          Disconnect Wallet
        </Button>
      ) : (
        <Button
          variant="contained"
          className="bg-black text-white rounded-xl hover:bg-black hover:text-white"
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
