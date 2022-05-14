import { providers } from "ethers";
import React, { useEffect, useState } from "react";
import ConnectWallet from "../components/ui/ConnectWallet";
import { useWalletAuth } from "../lib/walletContext";

export interface LendingPageProps {}

export const LendingPage = ({}: LendingPageProps) => {
  const { connectWallet, checkIfWalletIsConnected, currentAccount } =
    useWalletAuth();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <div>
      {/* Main Div ** Responsive Design Here*/}
      <div>
        <ConnectWallet connectWallet={connectWallet} connected={false} />
      </div>
      <div>Lend</div>
      <div>DAO Table Details</div>
      <div>Extra Details and Graph Info</div>
    </div>
  );
};

export default LendingPage;
