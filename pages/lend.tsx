import LendingDetails from "../components/LendingDetails";
import LendingTable from "../components/LendingTable";
import { providers } from "ethers";
import React, { useEffect, useState } from "react";
import ConnectWallet from "../components/ui/ConnectWallet";
import { useWalletAuth } from "../lib/walletContext";

export interface LendingPageProps {
  lendingTableValues: {};
}

export const LendingPage = ({ lendingTableValues }: LendingPageProps) => {
  const { connectWallet, checkIfWalletIsConnected, currentAccount } =
    useWalletAuth();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <div>
      {/* Main Div ** Responsive Design Here*/}
      <div>
        <ConnectWallet
          connectWallet={connectWallet}
          connected={currentAccount.length > 0}
        />
      </div>
      <div>
        <div>
          <LendingTable
            daoName="MakerDAO"
            borrowAmount={1000000}
            borrowToken="USDC"
            borrowMaturity={1}
            borrowInterestRate={123}
          />
        </div>
        <div className="py-2">
          <LendingDetails />
        </div>
      </div>
    </div>
  );
};

export default LendingPage;
