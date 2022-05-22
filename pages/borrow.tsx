import React, { useEffect } from "react";
import { BorrowForm } from "@src/components/forms/BorrowForm";
import ConnectWallet from "@src/components/ui/ConnectWallet";
import { useWalletAuth } from "@src/lib/walletContext";
import { Web3Provider } from "@ethersproject/providers";
import { NavBar } from "@src/components/navbar/NavBar";

export default function Borrow() {
  return (
    <div className="flex flex-wrap justify-center ">
      <NavBar />
      <div className="shadow-xl rounded-xl py-14">
        {" "}
        <BorrowForm />
      </div>
    </div>
  );
}
