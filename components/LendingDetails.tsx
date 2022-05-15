import { Button } from "@mui/material";
import React from "react";
import LendButton from "./ui/LendingButton";

export interface LendingDetailsProps {
  daoName: string;
  borrowToken: string;
  maxBorrow: number;
  amountLend: number;
  setAmountLend: (amountLend: number) => void;
  maturedValue: number;
  maturityDate: any;
  lend: () => void;
}

export const LendingDetails = ({
  daoName,
  borrowToken,
  maxBorrow,
  maturityDate,
  maturedValue,
  amountLend,
  setAmountLend,
  lend,
}: LendingDetailsProps) => {
  return (
    <div className="w-8/12 border-gray-400 border-2 py-4 pl-4  border-solid shadow-lg ">
      {" "}
      <div className="text-lg py-8">Lend to {daoName}</div>{" "}
      <div className="flex justify-center pr-36">
        <div className="pr-2">Max Borrow</div>
        <input className="" value={maxBorrow}></input>
        {borrowToken}
      </div>
      <div className="flex justify-center pr-36">
        <div className="pr-10">Amount</div>
        <input
          value={amountLend}
          onChange={(e) => setAmountLend(parseInt(e.target.value))}
        ></input>
        {borrowToken}
      </div>
      <div className="py-4">
        You will recieve 2400 bond tokens issued by {daoName}. Upon maturity on{" "}
        {maturityDate}, you can redeem up to {maturedValue}
      </div>
      <div className="flex justify-center pr-20">
        <Button
          variant="outlined"
          className="text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-white hover:border-yellow-500	 hover:cursor-pointer w-36"
          onClick={() => lend()}
        >
          Lend
        </Button>{" "}
      </div>
    </div>
  );
};

export default LendingDetails;
