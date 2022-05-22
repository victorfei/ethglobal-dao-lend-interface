import { PaymentToken } from "./common";
import { Button } from "@mui/material";
import { useState } from "react";
import { ethers } from "ethers";
import { PAYMENT_TOKEN_ADDRESSES } from "@src/constants/addresses";
import abis from "@src/abis";

interface LendingDetails {
  daoName: string;
  amount: number;
  paymentToken: PaymentToken;
  maturityDate: string;
  interestRate: number;
  address: string;
  remainingBorrowAmount: number;
}
export interface LendingFormProps {
  lendDetails: LendingDetails;
}

function calculateMaturedValue(amountLend: number) {
  return amountLend;
}

export const LendForm = ({ lendDetails }: LendingFormProps) => {
  const [amountLend, setAmountLend] = useState(0);

  const bondAbi = abis.bond;
  const erc20Abi = abis.erc20;

  const submitLend = async (lendDetails: LendingDetails) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        // Bonds have a decimal place of 6 so we need to covert. TODO Maybe fetch the decimal place in the future
        const convertedAmountLend = amountLend * 1000000;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const paymentTokenAddress = PAYMENT_TOKEN_ADDRESSES.USDC;
        const paymentTokenContract = new ethers.Contract(
          paymentTokenAddress,
          erc20Abi,
          signer
        );
        const bondContract = new ethers.Contract(
          lendDetails.address,
          bondAbi,
          signer
        );

        // TODO add check to see if allowance is already done
        const allowanceERC20Txn = await paymentTokenContract.approve(
          lendDetails.address,
          convertedAmountLend
        );

        const createBondTxn = await bondContract.purchaseBond(
          convertedAmountLend,
          {
            // TODO add gas price calulator to get dynamic prices
            gasPrice: ethers.utils.parseUnits("100", "gwei"),
            gasLimit: 500000,
          }
        );
        console.log("Mining...", createBondTxn.hash);
        console.log("Mining...erc", allowanceERC20Txn.hash);
        await allowanceERC20Txn.wait();
        await createBondTxn.wait();

        console.log(
          "Mined -- Success ",
          createBondTxn.hash + "Mined -- Success ERC20",
          allowanceERC20Txn.hash
        );
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-8/12 border-gray-400 border-2 py-4 pl-4  border-solid shadow-lg ">
      {" "}
      <div className="text-lg py-8">Lend to {lendDetails.daoName}</div>{" "}
      <div className="flex justify-center pr-36">
        <div className="pr-2">Max Borrow</div>
        <input
          className=""
          value={lendDetails.remainingBorrowAmount}
          readOnly={true}
        ></input>
        {lendDetails.paymentToken}
      </div>
      <div className="flex justify-center pr-36">
        <div className="pr-10">Amount</div>
        <input
          value={amountLend}
          onChange={(e) => setAmountLend(parseInt(e.target.value) || 0)}
        ></input>
        {lendDetails.paymentToken}
      </div>
      <div className="py-4">
        Upon maturity on {lendDetails.maturityDate}, you can redeem up to{" "}
        {calculateMaturedValue(amountLend)} bond tokens issued by{" "}
        {lendDetails.daoName}.
      </div>
      <div className="flex justify-center pr-20">
        <Button
          variant="outlined"
          className="text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-white hover:border-yellow-500	 hover:cursor-pointer w-36"
          onClick={() => submitLend(lendDetails)}
        >
          Lend
        </Button>{" "}
      </div>
    </div>
  );
};
