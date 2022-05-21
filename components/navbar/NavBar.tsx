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
    <Container maxWidth="xl" className=" flex justify-between content-center ">
      <Image src={logoPng} alt="logo" width="160  " height="60" />
      <div className="flex py-2">
        <ConnectWallet
          connectWallet={connectWallet}
          connected={currentAccount.length > 0}
        />{" "}
      </div>
    </Container>
  );
};
