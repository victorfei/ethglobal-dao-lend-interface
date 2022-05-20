import { BorrowForm } from "@src/components/forms/BorrowForm";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { LendingTable } from "../components/LendingTable";
import React, { useEffect, useState } from "react";
import ConnectWallet from "../components/ui/ConnectWallet";
import { useWalletAuth } from "../lib/walletContext";

export default function AllInOne() {
  // ---------------------------
  // Wallet related
  // ---------------------------
  const { connectWallet, checkIfWalletIsConnected, currentAccount } =
    useWalletAuth();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  // ---------------------------
  // For toggel button groups
  // ---------------------------
  const [mode, setMode] = useState<string | null>("lend");

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: string | null
  ) => {
    setMode(newMode);
  };

  return (
    <div className="grid grid-cols-1">
      <ToggleButtonGroup value={mode} exclusive onChange={handleModeChange}>
        <ToggleButton value="borrow">borrow</ToggleButton>
        <ToggleButton value="lend">lend</ToggleButton>
        <ToggleButton value="whitelist">whitelist</ToggleButton>
      </ToggleButtonGroup>

      <div>
        {mode == "borrow" && <BorrowForm></BorrowForm>}
        {mode == "lend" && <LendingTable></LendingTable>}
      </div>

      <div>
        <ConnectWallet
          connectWallet={connectWallet}
          connected={currentAccount.length > 0}
        />
      </div>
    </div>
  );
}
