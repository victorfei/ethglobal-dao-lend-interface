import { useEffect, useState } from "react";
import { BorrowForm } from "@src/components/forms/BorrowForm";
import ConnectWallet from "@src/components/ui/ConnectWallet";
import { useWalletAuth } from "@src/lib/walletContext";
import abis from "../abis/index";
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";

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

  const contractAddress = "0xE75f21020d4665542D57A8EbFD848F56CcCCE3A6";
  /**
   * Create a variable here that references the abi content!
   */
  const contractABI = abis.bondFactory;
  const erc20Abi = abis.erc20;
  const createBond = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const erc20 = new ethers.Contract(
          "0xff795577d9ac8bd7d90ee22b6c1703490b6512fd",
          erc20Abi,
          signer
        );

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

        const allowanceERC20 = await erc20.approve(
          "0xE75f21020d4665542D57A8EbFD848F56CcCCE3A6",
          1000
        );

        const createBondTxn = await BondFactoryContract.createBond(
          "FET",
          "FET",
          1653924116,
          "0x075a36ba8846c6b6f53644fdd3bf17e5151789dc",
          "0xff795577d9ac8bd7d90ee22b6c1703490b6512fd",
          9,
          8,
          100,
          "daoTFE",
          {
            gasPrice: ethers.utils.parseUnits("100", "gwei"),
            gasLimit: 500000,
          }
        );

        console.log("Mining...", createBondTxn.hash);
        console.log("Mining...erc", allowanceERC20.hash);
        await allowanceERC20.wait();
        await createBondTxn.wait();

        console.log("Mined -- Success ", createBondTxn.hash);
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
