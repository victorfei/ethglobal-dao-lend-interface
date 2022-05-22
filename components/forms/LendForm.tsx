import { BondDetails } from "./common";
import { Button } from "@mui/material";
import { useState } from "react";

export interface LendingFormProps {
  bondDetails: BondDetails;
  remainingBorrowAmount: number;
}

function submitLend(amountLend: number) {
  console.log(amountLend);
}

function calculateMaturedValue(amountLend: number) {
  return amountLend;
}

export const LendForm = ({
  remainingBorrowAmount,
  bondDetails,
}: LendingFormProps) => {
  const [amountLend, setAmountLend] = useState(0);

  //Commit Add
  return (
    <div className="w-8/12 border-gray-400 border-2 py-4 pl-4  border-solid shadow-lg ">
      {" "}
      <div className="text-lg py-8">Lend to {bondDetails.daoName}</div>{" "}
      <div className="flex justify-center pr-36">
        <div className="pr-2">Max Borrow</div>
        <input
          className=""
          value={remainingBorrowAmount}
          readOnly={true}
        ></input>
        {bondDetails.paymentToken}
      </div>
      <div className="flex justify-center pr-36">
        <div className="pr-10">Amount</div>
        <input
          value={amountLend}
          onChange={(e) => setAmountLend(parseInt(e.target.value) || 0)}
        ></input>
        {bondDetails.paymentToken}
      </div>
      <div className="py-4">
        Upon maturity on {bondDetails.maturityDate}, you can redeem up to{" "}
        {calculateMaturedValue(amountLend)} bond tokens issued by{" "}
        {bondDetails.daoName}.
      </div>
      <div className="flex justify-center pr-20">
        <Button
          variant="outlined"
          className="text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-white hover:border-yellow-500	 hover:cursor-pointer w-36"
          onClick={() => submitLend(amountLend)}
        >
          Lend
        </Button>{" "}
      </div>
    </div>
  );
};
