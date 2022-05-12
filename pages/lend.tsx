import { providers } from "ethers";
import React from "react";
import ConnectWallet from "../components/ui/ConnectWallet";

export interface LendingPageProps {}

export const LendingPage = ({}: LendingPageProps) => {
  return (
    <div>
      {/* Main Div ** Responsive Design Here*/}
      <div>
        <ConnectWallet />
      </div>
      <div>Lend</div>
      <div>DAO Table Details</div>
      <div>Extra Details and Graph Info</div>
    </div>
  );
};

export default LendingPageProps;
