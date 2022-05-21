import Image from "next/image";
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
      <Image src={logoPng} alt="logo" width="300" height="40" />
      <div className="flex py-12">
        <ConnectWallet
          connectWallet={connectWallet}
          connected={currentAccount.length > 0}
        />{" "}
      </div>
    </Container>
  );
};
