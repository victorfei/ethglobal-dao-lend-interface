import logoPng from "../../public/Logo_BONDFI.jpg";
import Container from "@mui/material/Container";
import ConnectWallet from "../ui/ConnectWallet";
import React, { useEffect, useState } from "react";
import { useWalletAuth } from "../../lib/walletContext";

export const NavBar = () => {
  // ---------------------------
  // Wallet related
  // ---------------------------
  const { connectWallet, checkIfWalletIsConnected, currentAccount } =
    useWalletAuth();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <Container maxWidth="xl" className=" flex justify-between content-center ">
      <img src="./Logo_BONDFI.jpg" alt="logo" width="180" height="80" />
      <div className="flex py-6">
        <ConnectWallet
          connectWallet={connectWallet}
          connected={currentAccount.length > 0}
        />{" "}
      </div>
    </Container>
  );
};
