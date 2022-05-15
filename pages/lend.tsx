import LendingDetails from "../components/LendingDetails";
import LendingTable from "../components/LendingTable";
import { providers } from "ethers";
import React, { useEffect, useState } from "react";
import ConnectWallet from "../components/ui/ConnectWallet";
import { useWalletAuth } from "../lib/walletContext";

export interface LendingPageProps {}

export const LendingPage = ({}: LendingPageProps) => {
  const { connectWallet, checkIfWalletIsConnected, currentAccount } =
    useWalletAuth();

  const [amountLend, setAmountLend] = useState(0);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div>
      {/* Main Div ** Responsive Design Here*/}

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
          <LendingDetails
            amountLend={amountLend}
            setAmountLend={setAmountLend}
            daoName={"Test Name"}
            borrowToken={"USDC"}
            maxBorrow={12312}
            maturedValue={2342}
            maturityDate={"Monday"}
            lend={() => console.log("Lend Test")}
          />
        </div>
      </div>
      <div>
        <ConnectWallet
          connectWallet={connectWallet}
          connected={currentAccount.length > 0}
        />
      </div>
    </div>
  );
};

export default LendingPage;
