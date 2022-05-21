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
    symbol: "lit",
  });

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const contractAddress = "0xE75f21020d4665542D57A8EbFD848F56CcCCE3A6";

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

        const allowanceERC20Txn = await erc20.approve(contractAddress, 1000);
        // string memory name,
        //       string memory symbol,
        //       uint256 maturity, (NEEDS TO BE IN BLOCK TIMESTAMP)
        //       address paymentToken, NEEDS TO POINT TO TOKEN ADDRESS
        //       address collateralToken, TO BE REMOVED
        //       uint256 collateralTokenAmount, TO BE REMOVED
        //       uint256 convertibleTokenAmount,
        //       uint256 bonds,
        //       string memory daoName
        //TO ACCEPT INTEREST RATE

        const createBondTxn = await BondFactoryContract.createBond(
          formDetails.symbol,
          formDetails.symbol,
          formDetails.maturityDate,
          formDetails.paymentToken,
          "0xff795577d9ac8bd7d90ee22b6c1703490b6512fd",
          9,
          8,
          100,
          formDetails.daoName,
          {
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
