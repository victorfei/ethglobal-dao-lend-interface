import { useEffect, useState } from "react";
import { BorrowForm } from "@src/components/forms/BorrowForm";
import ConnectWallet from "@src/components/ui/ConnectWallet";
import { useWalletAuth } from "@src/lib/walletContext";
import abis from "../abis/index";
import { ethers } from "ethers";

export default function Borrow() {
  const { connectWallet, checkIfWalletIsConnected, currentAccount } =
    useWalletAuth();

  const [formDetails, setFormDetails] = useState({
    amount: 0,
    interestRate: 0,
    daoName: "default",
    paymentToken: "Default",
    maturityDate: "420",
  });

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const contractAddress = "0x5e6455b99a9B7FEFacf4225466158dA7cf2f554e";
  /**
   * Create a variable here that references the abi content!
   */
  const contractABI = abis.bondFactory;

  const createBond = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const BondFactoryContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        //  string memory name,
        // string memory symbol,
        // uint256 maturity,
        // address paymentToken,
        // address collateralToken,
        // uint256 collateralTokenAmount,
        // uint256 convertibleTokenAmount,
        // uint256 bonds

        const createBondTxn = await BondFactoryContract.createBond(
          formDetails.daoName,
          "BS",
          formDetails.maturityDate,
          formDetails.paymentToken,
          "OxCollateralTokenAddr",
          1,
          1,
          formDetails.amount
        ).estimateGas({});
        console.log("Mining...", createBondTxn.hash);

        await createBondTxn.wait();
        console.log("Mined -- ", createBondTxn.hash);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1">
      {JSON.stringify(formDetails)}

      <BorrowForm
        formDetails={formDetails}
        setFormDetails={setFormDetails}
        createBond={createBond}
      />

      <ConnectWallet
        connectWallet={connectWallet}
        connected={currentAccount.length > 0}
      />
    </div>
  );
}
