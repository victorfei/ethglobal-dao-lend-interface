import { useEffect } from "react";
import { BorrowForm } from "@src/components/forms/BorrowForm";
import ConnectWallet from "@src/components/ui/ConnectWallet";
import { useWalletAuth } from "@src/lib/walletContext";

export default function Borrow() {
  const { connectWallet, checkIfWalletIsConnected, currentAccount } =
    useWalletAuth();
  
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  
  return (
    <div className="grid grid-cols-1">
      <BorrowForm></BorrowForm>

      <ConnectWallet
          connectWallet={connectWallet}
          connected={currentAccount.length > 0}
        />
    </div>
  );
}
