import LendingTable from "../components/LendingTable";
import React from "react";
import { LendForm } from "../components/forms/LendForm";

export interface LendingPageProps {}

export const LendingPage = ({}: LendingPageProps) => {
  return (
    <div>
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
          <LendForm
            bondDetails={{
              daoName: "Uniswap DAO",
              amount: 2000,
              paymentToken: "USDC",
              maturityDate: "1 Week",
              interestRate: 0.1,
            }}
            remainingBorrowAmount={10}
          />
        </div>
      </div>
    </div>
  );
};

export default LendingPage;
