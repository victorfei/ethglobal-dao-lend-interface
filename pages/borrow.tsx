import { useEffect } from "react";
import { BorrowForm } from "@src/components/forms/BorrowForm";
import ConnectWallet from "@src/components/ui/ConnectWallet";
import { useWalletAuth } from "@src/lib/walletContext";
import abis from "../abis/index";
import { ethers } from "ethers";
import { BOND_FACTORY_ADDRESS, COLLATERAL_TOKEN_ADDRESS, PAYMENT_TOKEN_ADDRESSES } from "@src/constants/addresses";
import { BondDetails } from "@src/components/forms/common";
import { Web3Provider } from "@ethersproject/providers";

const generateBondName = (bondDetails: BondDetails, maturityDate: number): string => {
  return `Bond ${bondDetails.daoName} ${maturityDate} ${bondDetails.paymentToken}`
};

const generateMaturityDate = async (provider: Web3Provider, bondDetails: BondDetails): Promise<number> => {
  const block = await provider.getBlock(await provider.getBlockNumber());
  return block.timestamp + Number(bondDetails.maturityDate);
};

export default function Borrow() {
  const { connectWallet, checkIfWalletIsConnected, currentAccount } =
    useWalletAuth();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);


  const bondFactoryAbi = abis.bondFactory;
  const erc20Abi = abis.erc20;

  const createBond = async (bondDetails: BondDetails) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const paymentTokenAddress = PAYMENT_TOKEN_ADDRESSES[bondDetails.paymentToken];
        const paymentTokenContract = new ethers.Contract(
          paymentTokenAddress,
          erc20Abi,
          signer
        );

        const bondFactoryContract = new ethers.Contract(
          BOND_FACTORY_ADDRESS,
          bondFactoryAbi,
          signer
        );

        // TODO add check to see if allowance is already done
        const allowanceERC20Txn = await paymentTokenContract.approve(BOND_FACTORY_ADDRESS, bondDetails.amount);
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
        const maturityDate = await generateMaturityDate(provider, bondDetails);
        const bondName = generateBondName(bondDetails, maturityDate);
        const createBondTxn = await bondFactoryContract.createBond(
          bondName,
          bondDetails.symbol,
          maturityDate,
          paymentTokenAddress,
          COLLATERAL_TOKEN_ADDRESS, 
          1000000000000,
          0,
          bondDetails.amount,
          bondDetails.daoName,
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
    <div className="grid grid-cols-1">
      <BorrowForm
        createBond={createBond}
      />

      <ConnectWallet
        connectWallet={connectWallet}
        connected={currentAccount.length > 0}
      />
    </div>
  );
}
