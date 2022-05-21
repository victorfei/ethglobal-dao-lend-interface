import Image from "next/image";
import logoPng from "./Logo_BONDFI.jpg";
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
      <Container maxWidth="xl">
          <Image src={logoPng} alt="logo" />

          <ConnectWallet
            connectWallet={connectWallet}
            connected={currentAccount.length > 0}
          />
      </Container>
  );
};
