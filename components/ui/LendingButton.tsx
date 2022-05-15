import { providers, ethers } from "ethers";
import Web3Modal from "web3modal";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ArrowDownIcon } from "@heroicons/react/outline";

export interface LendButtonProps {
  lend: () => void;
}

// docs.walletconnect.com/quick-start/dapps/web3-provider
const LendButton = ({ lend }: LendButtonProps) => {
  return (
    <div>
      <Button
        variant="outlined"
        className="text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-white hover:border-yellow-500	 hover:cursor-pointer w-1/2"
        onClick={() => lend()}
      >
        Lend
      </Button>
    </div>
  );
};

export default LendButton;
